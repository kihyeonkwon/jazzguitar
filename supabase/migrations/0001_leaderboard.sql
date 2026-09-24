-- 재즈 구구단 리더보드
-- 게스트(익명 로그인) + 닉네임으로 바로 참여, 나중에 Google 등으로 계정 연결.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nickname text not null
    check (char_length(nickname) between 2 and 12)
    check (nickname !~ '[[:cntrl:]<>]'),
  created_at timestamptz not null default now()
);

create unique index profiles_nickname_lower_key on public.profiles (lower(nickname));

create table public.scores (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  game text not null check (game in ('degree-id', 'chord-construction', 'scale-construction')),
  correct smallint not null,
  total smallint not null,
  duration_sec numeric(6, 1) not null check (duration_sec between 5 and 3600),
  cpm numeric(5, 1) generated always as (round(correct / duration_sec * 60, 1)) stored,
  accuracy numeric(3, 2) generated always as (round(correct::numeric / total, 2)) stored,
  created_at timestamptz not null default now(),
  check (correct between 0 and total),
  -- 라운드 길이는 게임마다 고정: 도수 20문제, 코드·스케일 10문제
  check (total = case when game = 'degree-id' then 20 else 10 end),
  -- 사람이 낼 수 없는 속도는 거른다 (문제당 0.5초 미만)
  check (duration_sec >= total * 0.5)
);

create index scores_game_cpm_idx on public.scores (game, cpm desc);
create index scores_user_idx on public.scores (user_id);

alter table public.profiles enable row level security;
alter table public.scores enable row level security;

create policy "profiles are public" on public.profiles
  for select to anon, authenticated using (true);

create policy "create own profile" on public.profiles
  for insert to authenticated with check ((select auth.uid()) = id);

create policy "rename own profile" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy "scores are public" on public.scores
  for select to anon, authenticated using (true);

create policy "submit own score" on public.scores
  for insert to authenticated with check ((select auth.uid()) = user_id);

-- 게임별 · 사람별 최고 기록. 정확도 90% 이상 라운드만 순위에 든다.
create view public.leaderboard
with (security_invoker = true) as
select distinct on (s.game, s.user_id)
  s.game,
  s.user_id,
  p.nickname,
  s.cpm,
  s.accuracy,
  s.created_at
from public.scores s
join public.profiles p on p.id = s.user_id
where s.accuracy >= 0.9
order by s.game, s.user_id, s.cpm desc, s.created_at asc;

grant select on public.leaderboard to anon, authenticated;
