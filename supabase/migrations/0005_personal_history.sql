-- 개인 기록을 계정에 묶는다.
--   · 로그인한 사용자의 라운드는 순위 조건과 상관없이 전부 저장한다 (기기 간 추이 동기화용)
--   · ranked = 순위표에 오를 수 있는 라운드인지 (코드: 7th 모드, 스케일: 전체 출제 범위)
--   · played_at = 기기에서 라운드를 끝낸 시각 (로컬 기록과 같은 라운드인지 맞춰 보는 열쇠)
alter table public.scores add column ranked boolean not null default true;
alter table public.scores add column played_at timestamptz not null default now()
  check (played_at <= now() + interval '1 day');
update public.scores set played_at = created_at;
create index scores_profile_played_idx on public.scores (profile_id, game, played_at desc);

drop view if exists public.leaderboard;
create view public.leaderboard with (security_invoker = true) as
select distinct on (s.game, s.profile_id)
  s.game, s.profile_id, p.nickname,
  round(s.duration_sec / s.correct, 2) as spc,
  s.cpm, s.accuracy, s.created_at
from public.scores s join public.profiles p on p.id = s.profile_id
where s.ranked and s.accuracy >= 0.9 and s.correct > 0
order by s.game, s.profile_id, (s.duration_sec / s.correct) asc, s.created_at asc;
grant select on public.leaderboard to anon, authenticated;
