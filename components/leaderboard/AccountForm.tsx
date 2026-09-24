'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { HCAPTCHA_SITE_KEY, PASSWORD_MIN, hasSession, join, login } from '@/lib/leaderboard/client'

type Mode = 'join' | 'login'

interface Props {
  /** 폼을 구분하는 id 접두사 (한 화면에 둘 이상 있을 수 있다) */
  id: string
  defaultMode?: Mode
  /** 가입 버튼 문구 — 결과 화면에서는 "기록 올리기" */
  joinLabel?: string
  onDone?: () => void
}

// 닉네임 + 비밀번호 두 칸. 가입과 로그인이 같은 모양이고 위 탭으로만 바꾼다.
export default function AccountForm({ id, defaultMode = 'join', joinLabel, onDone }: Props) {
  const t = useTranslations('account')
  const tErr = useTranslations('errors')
  const [mode, setMode] = useState<Mode>(defaultMode)
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  // 캡차 위젯은 입력칸에 들어올 때만 불러온다
  const [captchaOn, setCaptchaOn] = useState(false)
  const captchaRef = useRef<HCaptcha>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    // 게스트 세션을 새로 만들 때만 사람 확인이 필요하다
    let captchaToken: string | undefined
    if (HCAPTCHA_SITE_KEY && !(await hasSession())) {
      setCaptchaOn(true)
      setBusy(true)
      for (let i = 0; i < 40 && !captchaRef.current?.isReady(); i++) {
        await new Promise((r) => setTimeout(r, 200))
      }
      setBusy(false)
      if (!captchaRef.current?.isReady()) {
        setMessage(t('captchaLoad'))
        return
      }
      try {
        captchaToken = (await captchaRef.current.execute({ async: true })).response
      } catch (err) {
        const code = typeof err === 'string' ? err : err instanceof Error ? err.message : ''
        setMessage(
          code === 'challenge-closed'
            ? t('captchaClosed')
            : window.location.hostname === 'localhost'
            ? t('captchaLocalhost')
            : t('captchaFailed')
        )
        return
      }
    }

    setBusy(true)
    const res = await (mode === 'join' ? join : login)(nickname, password, captchaToken)
    setBusy(false)
    captchaRef.current?.resetCaptcha()
    if (!res.ok) {
      setMessage(tErr(res.code, { min: PASSWORD_MIN }))
      return
    }
    setNickname('')
    setPassword('')
    onDone?.()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2 text-left">
      <div className="flex border border-ink font-mono text-[11px] uppercase" role="tablist" aria-label={t('tabsAria')}>
        {(['join', 'login'] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => {
              setMode(m)
              setMessage(null)
            }}
            className={`flex-1 py-1.5 transition-colors duration-100 ${m === 'login' ? 'border-l border-ink' : ''} ${
              mode === m ? 'bg-ink text-ink-inv' : 'bg-paper-bright text-ink hover:bg-gray'
            }`}
          >
            {m === 'join' ? t('tabJoin') : t('tabLogin')}
          </button>
        ))}
      </div>

      <div className="border border-ink">
        <label htmlFor={`${id}-nick`} className="sr-only">{t('nickname')}</label>
        <input
          id={`${id}-nick`}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onFocus={() => setCaptchaOn(true)}
          minLength={2}
          maxLength={12}
          required
          autoComplete="username"
          placeholder={t('nicknamePh')}
          className="block w-full bg-paper-bright px-3 py-2 font-sans text-sm normal-case text-ink outline-none placeholder:text-ink-quiet focus-visible:bg-blue"
        />
        <label htmlFor={`${id}-pw`} className="sr-only">{t('password')}</label>
        <input
          id={`${id}-pw`}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={PASSWORD_MIN}
          maxLength={72}
          required
          autoComplete={mode === 'join' ? 'new-password' : 'current-password'}
          placeholder={t('passwordPh', { min: PASSWORD_MIN })}
          className="block w-full border-t border-ink bg-paper-bright px-3 py-2 font-sans text-sm normal-case text-ink outline-none placeholder:text-ink-quiet focus-visible:bg-blue"
        />
        <button
          type="submit"
          disabled={busy}
          className="block w-full border-t border-ink bg-ink py-2.5 font-mono text-[11px] uppercase text-ink-inv transition-colors duration-100 hover:bg-pink hover:text-ink disabled:opacity-40"
        >
          {busy ? '…' : mode === 'join' ? `${joinLabel ?? t('join')} →` : `${t('login')} →`}
        </button>
      </div>

      <p className="font-mono text-[11px] normal-case leading-snug text-ink-faint">
        {mode === 'join' ? t('joinNote') : t('loginNote')}
      </p>

      {message && (
        <p role="alert" className="border border-ink bg-no px-3 py-2 font-sans text-xs normal-case text-ink">
          {message}
        </p>
      )}

      {captchaOn && HCAPTCHA_SITE_KEY && <HCaptcha ref={captchaRef} sitekey={HCAPTCHA_SITE_KEY} size="invisible" />}
    </form>
  )
}
