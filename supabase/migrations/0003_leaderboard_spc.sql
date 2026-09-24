-- 순위 단위를 SPC(정답 하나당 걸린 초)로 바꾼다. 낮을수록 좋다.
-- 점수 테이블은 그대로 두고(정답 수·걸린 시간이 원본), 뷰만 다시 만든다:
-- 계정별 최고 기록 = 정확도 90% 이상 라운드 중 SPC가 가장 작은 것.

drop view if exists public.leaderboard;

create view public.leaderboard
with (security_invoker = true) as
select distinct on (s.game, s.profile_id)
  s.game,
  s.profile_id,
  p.nickname,
  round(s.duration_sec / s.correct, 2) as spc,
  s.cpm,
  s.accuracy,
  s.created_at
from public.scores s
join public.profiles p on p.id = s.profile_id
where s.accuracy >= 0.9 and s.correct > 0
order by s.game, s.profile_id, (s.duration_sec / s.correct) asc, s.created_at asc;

grant select on public.leaderboard to anon, authenticated;
