'use client'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { GameType } from '@/lib/train/games'

// 리더보드 서버 연결. 환경변수가 없으면 null → UI는 "offline"으로 표시하고 게임은 그대로 동작한다.
//
// 계정 모델 (supabase/migrations/0002_nickname_password.sql):
//   · 브라우저는 Supabase 익명 로그인으로 게스트 세션만 만든다 (이메일 없음).
//   · 계정은 닉네임 + 비밀번호. 가입·로그인은 DB 함수(join_account / login_account)가 처리하고,
//     이 게스트 세션을 그 계정에 연결한다. 다른 기기에서도 같은 닉네임·비밀번호로 이어진다.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

let client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_KEY) return null
  if (!client) client = createClient(SUPABASE_URL, SUPABASE_KEY)
  return client
}

export const LEADERBOARD_ENABLED = Boolean(SUPABASE_URL && SUPABASE_KEY)

/** hCaptcha 사이트 키(공개 값). Supabase Attack Protection이 켜져 있으면 게스트 세션을 만들 때 필요하다. */
export const HCAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY ?? ''

export const PASSWORD_MIN = 4

export const LEADERBOARD_EVENT = 'gugudan:leaderboard'
/** 헤더의 계정 패널을 열어 달라는 신호 (detail: 'join' | 'login') */
export const OPEN_ACCOUNT_EVENT = 'gugudan:open-account'

export function openAccount(mode: 'join' | 'login' = 'join'): void {
  window.dispatchEvent(new CustomEvent(OPEN_ACCOUNT_EVENT, { detail: mode }))
}
const PENDING_KEY = 'gugudan:pending-scores'
// 마지막으로 확인한 로그인 계정 — 오프라인일 때 getMe()가 이 값으로 답한다
const ME_KEY = 'gugudan:me'

export interface RoundInput {
  correct: number
  total: number
  durationSec: number
}

export interface LeaderboardRow {
  game: GameType
  profile_id: string
  nickname: string
  /** 정답 하나에 걸린 초 — 낮을수록 빠르다 */
  spc: number
  cpm: number
  accuracy: number
  created_at: string
}

export interface Me {
  profileId: string
  nickname: string
}

/** 화면에서 errors.<code> 메시지로 번역해 보여준다 */
export type ErrorCode =
  | 'bad_nickname'
  | 'bad_password'
  | 'nickname_taken'
  | 'bad_credentials'
  | 'locked'
  | 'not_signed_in'
  | 'captcha_failed'
  | 'connect_failed'
  | 'offline'
  | 'generic'

export type AuthResult = { ok: true } | { ok: false; code: ErrorCode }

function emit(): void {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(LEADERBOARD_EVENT))
}

// ── 로그인 전에 끝난 라운드는 잠시 보관했다가 가입·로그인 직후 올린다 ──

type Pending = RoundInput & { game: GameType }

function readPending(): Pending[] {
  try {
    return JSON.parse(localStorage.getItem(PENDING_KEY) ?? '[]') as Pending[]
  } catch {
    return []
  }
}

function writePending(list: Pending[]): void {
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify(list.slice(-5)))
  } catch {
    // 저장 실패는 무시 — 다음 라운드부터 올라간다
  }
}

export function pendingCount(): number {
  return typeof window === 'undefined' ? 0 : readPending().length
}

// ── 세션 · 계정 ──

/** 게스트 세션이 이미 있는지 (없으면 가입·로그인 때 캡차가 필요하다) */
export async function hasSession(): Promise<boolean> {
  const sb = getSupabase()
  if (!sb) return false
  return Boolean((await sb.auth.getSession()).data.session)
}

/** 지금 이 브라우저가 로그인해 있는 계정 */
export async function getMe(): Promise<Me | null> {
  const sb = getSupabase()
  if (!sb) return null
  const { data: session } = await sb.auth.getSession()
  const userId = session.session?.user.id
  if (!userId) return null

  const { data: link, error } = await sb.from('devices').select('profile_id').eq('user_id', userId).maybeSingle()
  // 네트워크가 끊겼으면 마지막으로 확인한 계정을 그대로 믿는다 (지하철에서도 내 이름은 보여야 한다)
  if (error) return readCachedMe(userId)
  if (!link) {
    writeCachedMe(null)
    return null
  }
  const { data: profile } = await sb.from('profiles').select('nickname').eq('id', link.profile_id).maybeSingle()
  const me = profile ? { profileId: link.profile_id, nickname: profile.nickname } : null
  writeCachedMe(me ? { userId, ...me } : null)
  return me
}

function readCachedMe(userId: string): Me | null {
  try {
    const raw = localStorage.getItem(ME_KEY)
    if (!raw) return null
    const cached = JSON.parse(raw) as Me & { userId: string }
    return cached.userId === userId ? { profileId: cached.profileId, nickname: cached.nickname } : null
  } catch {
    return null
  }
}

function writeCachedMe(me: (Me & { userId: string }) | null): void {
  try {
    if (me) localStorage.setItem(ME_KEY, JSON.stringify(me))
    else localStorage.removeItem(ME_KEY)
  } catch {
    // 무시
  }
}

async function ensureGuestSession(captchaToken?: string): Promise<ErrorCode | null> {
  const sb = getSupabase()
  if (!sb) return 'offline'
  if ((await sb.auth.getSession()).data.session) return null

  const { error } = await sb.auth.signInAnonymously(captchaToken ? { options: { captchaToken } } : undefined)
  if (!error) return null
  return error.code === 'captcha_failed' ? 'captcha_failed' : 'connect_failed'
}

// DB 함수가 던지는 예외 이름 (supabase/migrations/0002_nickname_password.sql)
const DB_ERRORS: ErrorCode[] = ['bad_nickname', 'bad_password', 'nickname_taken', 'bad_credentials', 'locked', 'not_signed_in']

function toCode(message: string | undefined): ErrorCode {
  return DB_ERRORS.find((k) => message?.includes(k)) ?? 'generic'
}

/** 가입: 닉네임 + 비밀번호. captchaToken은 게스트 세션을 새로 만들 때만 쓰인다. */
export async function join(nickname: string, password: string, captchaToken?: string): Promise<AuthResult> {
  const name = nickname.trim()
  if (name.length < 2 || name.length > 12) return { ok: false, code: 'bad_nickname' }
  if (password.length < PASSWORD_MIN) return { ok: false, code: 'bad_password' }

  const sessionError = await ensureGuestSession(captchaToken)
  if (sessionError) return { ok: false, code: sessionError }

  const { error } = await getSupabase()!.rpc('join_account', { p_nickname: name, p_password: password })
  if (error) return { ok: false, code: toCode(error.message) }

  await flushPending()
  emit()
  return { ok: true }
}

/** 로그인: 다른 기기·브라우저에서 같은 계정으로 이어 가기. */
export async function login(nickname: string, password: string, captchaToken?: string): Promise<AuthResult> {
  const sessionError = await ensureGuestSession(captchaToken)
  if (sessionError) return { ok: false, code: sessionError }

  const { data, error } = await getSupabase()!.rpc('login_account', {
    p_nickname: nickname.trim(),
    p_password: password,
  })
  if (error) return { ok: false, code: toCode(error.message) }
  // 비밀번호가 틀리면 함수가 null을 돌려준다 (실패 횟수를 기록해야 해서 예외를 쓰지 않는다)
  if (!data) return { ok: false, code: 'bad_credentials' }

  await flushPending()
  emit()
  return { ok: true }
}

/** 로그아웃: 이 브라우저와 계정의 연결만 끊는다. 기록은 계정에 남는다. */
export async function logout(): Promise<void> {
  const sb = getSupabase()
  if (!sb) return
  await sb.rpc('logout_account')
  writeCachedMe(null)
  emit()
}

// ── 점수 ──

// 'retry' 는 네트워크가 끊긴 경우 — 보관해 두었다가 연결되면 다시 올린다.
// 'drop' 은 서버가 거절한 경우(규칙 위반 등) — 다시 보내도 소용없다.
async function insertScore(profileId: string, game: GameType, round: RoundInput): Promise<'ok' | 'retry' | 'drop'> {
  const sb = getSupabase()
  if (!sb) return 'retry'
  const { error } = await sb.from('scores').insert({
    profile_id: profileId,
    game,
    correct: round.correct,
    total: round.total,
    duration_sec: Math.round(round.durationSec * 10) / 10,
  })
  if (!error) return 'ok'
  // PostgREST·Postgres 오류에는 코드가 있고, fetch 실패에는 없다
  return error.code ? 'drop' : 'retry'
}

/** 보관해 둔 라운드를 올린다. 가입·로그인 직후와 네트워크가 돌아왔을 때 부른다. */
export async function flushPending(): Promise<void> {
  const list = readPending()
  if (list.length === 0) return
  const me = await getMe()
  if (!me) return
  const rest: Pending[] = []
  let uploaded = false
  for (const p of list) {
    const r = await insertScore(me.profileId, p.game, p)
    if (r === 'retry') rest.push(p)
    if (r === 'ok') uploaded = true
  }
  writePending(rest)
  if (uploaded) emit()
}

/** 라운드가 끝날 때마다 호출. 로그인돼 있으면 바로 올리고, 못 올리면(오프라인·미로그인) 보관한다. */
export async function submitRound(game: GameType, round: RoundInput): Promise<void> {
  if (!LEADERBOARD_ENABLED) return
  const me = await getMe()
  const r = me ? await insertScore(me.profileId, game, round) : 'retry'
  if (r === 'retry') writePending([...readPending(), { game, ...round }])
  emit()
}

export async function fetchTop(game: GameType, limit = 10): Promise<LeaderboardRow[]> {
  const sb = getSupabase()
  if (!sb) return []
  const { data } = await sb
    .from('leaderboard')
    .select('game,profile_id,nickname,spc,cpm,accuracy,created_at')
    .eq('game', game)
    .order('spc', { ascending: true })
    .order('created_at', { ascending: true })
    .limit(limit)
  return (data ?? []) as LeaderboardRow[]
}

export interface Standing {
  rank: number
  /** 이 게임 순위표에 오른 사람 수 */
  total: number
  /** 상위 몇 %인지 (1~100, 올림) */
  topPercent: number
}

function standing(rank: number, total: number): Standing {
  return { rank, total, topPercent: Math.min(100, Math.max(1, Math.ceil((rank / total) * 100))) }
}

async function countPlayers(game: GameType): Promise<number> {
  const sb = getSupabase()
  if (!sb) return 0
  const { count } = await sb
    .from('leaderboard')
    .select('profile_id', { count: 'exact', head: true })
    .eq('game', game)
  return count ?? 0
}

export async function fetchMyBest(game: GameType, profileId: string): Promise<(Standing & { spc: number }) | null> {
  const sb = getSupabase()
  if (!sb) return null
  const { data: mine } = await sb
    .from('leaderboard')
    .select('spc')
    .eq('game', game)
    .eq('profile_id', profileId)
    .maybeSingle()
  if (!mine) return null
  const { count } = await sb
    .from('leaderboard')
    .select('profile_id', { count: 'exact', head: true })
    .eq('game', game)
    .lt('spc', mine.spc)
  const players = await countPlayers(game)
  return { spc: Number(mine.spc), ...standing((count ?? 0) + 1, Math.max(players, 1)) }
}

/** 이 SPC면 지금 순위표에서 어디쯤인지 (아직 올리지 않은 기록의 예상 순위 — 나까지 포함해 센다) */
export async function fetchRankFor(game: GameType, spc: number): Promise<Standing | null> {
  const sb = getSupabase()
  if (!sb) return null
  const { count, error } = await sb
    .from('leaderboard')
    .select('profile_id', { count: 'exact', head: true })
    .eq('game', game)
    .lt('spc', spc)
  if (error) return null
  return standing((count ?? 0) + 1, (await countPlayers(game)) + 1)
}
