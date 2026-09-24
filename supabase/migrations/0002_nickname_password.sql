-- 닉네임 + 비밀번호만으로 가입·로그인.
--
-- Supabase Auth의 비밀번호 로그인은 이메일이 필수라서 쓰지 않는다. 대신:
--   · 브라우저는 익명 로그인(게스트 세션)만 한다.
--   · 계정(profile)은 닉네임 + bcrypt 비밀번호 해시로 여기서 직접 관리한다.
--   · devices 가 "이 게스트 세션은 이 계정으로 로그인한 상태"를 기록한다.
--     → 다른 기기에서도 같은 닉네임·비밀번호로 로그인하면 같은 계정에 연결된다.
--
-- 0001에서 만든 테이블은 비어 있는 상태에서 다시 만든다.

drop view if exists public.leaderboard;
drop table if exists public.scores;
drop table if exists public.profiles;

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  nickname text not null
    check (char_length(nickname) between 2 and 12)
    check (nickname !~ '[[:cntrl:]<>]'),
  password_hash text not null,
  failed_attempts smallint not null default 0,
  locked_until timestamptz,
  created_at timestamptz not null default now()
);

create unique index profiles_nickname_lower_key on public.profiles (lower(nickname));

-- 게스트 세션(auth.users) ↔ 계정 연결. 한 세션은 한 계정에만 로그인한다.
create table public.devices (
  user_id uuid primary key references auth.users (id) on delete cascade,
  profile_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now()
);

create index devices_profile_idx on public.devices (profile_id);

create table public.scores (
  id bigint generated always as identity primary key,
  profile_id uuid not null references public.profiles (id) on delete cascade,
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
create index scores_profile_idx on public.scores (profile_id);

alter table public.profiles enable row level security;
alter table public.devices enable row level security;
alter table public.scores enable row level security;

-- 비밀번호 해시·잠금 정보는 API로 절대 읽히지 않게 컬럼 단위로 막는다.
revoke all on public.profiles from anon, authenticated;
grant select (id, nickname, created_at) on public.profiles to anon, authenticated;

create policy "profiles are public" on public.profiles
  for select to anon, authenticated using (true);

-- devices: 자기 연결만 볼 수 있다. 만들고 지우는 것은 아래 함수로만.
revoke all on public.devices from anon, authenticated;
grant select on public.devices to authenticated;

create policy "see own device link" on public.devices
  for select to authenticated using ((select auth.uid()) = user_id);

create policy "scores are public" on public.scores
  for select to anon, authenticated using (true);

create policy "submit score for own account" on public.scores
  for insert to authenticated
  with check (
    exists (
      select 1 from public.devices d
      where d.user_id = (select auth.uid()) and d.profile_id = scores.profile_id
    )
  );

-- 게임별 · 계정별 최고 기록. 정확도 90% 이상 라운드만 순위에 든다.
create view public.leaderboard
with (security_invoker = true) as
select distinct on (s.game, s.profile_id)
  s.game,
  s.profile_id,
  p.nickname,
  s.cpm,
  s.accuracy,
  s.created_at
from public.scores s
join public.profiles p on p.id = s.profile_id
where s.accuracy >= 0.9
order by s.game, s.profile_id, s.cpm desc, s.created_at asc;

grant select on public.leaderboard to anon, authenticated;

-- ── 가입 ──────────────────────────────────────────────────────────
create function public.join_account(p_nickname text, p_password text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := auth.uid();
  v_name text := btrim(p_nickname);
  v_profile uuid;
begin
  if v_uid is null then
    raise exception 'not_signed_in' using errcode = 'P0001';
  end if;
  if char_length(v_name) < 2 or char_length(v_name) > 12 then
    raise exception 'bad_nickname' using errcode = 'P0001';
  end if;
  if char_length(p_password) < 4 or char_length(p_password) > 72 then
    raise exception 'bad_password' using errcode = 'P0001';
  end if;
  if exists (select 1 from public.profiles where lower(nickname) = lower(v_name)) then
    raise exception 'nickname_taken' using errcode = 'P0001';
  end if;

  insert into public.profiles (nickname, password_hash)
  values (v_name, extensions.crypt(p_password, extensions.gen_salt('bf', 10)))
  returning id into v_profile;

  insert into public.devices (user_id, profile_id)
  values (v_uid, v_profile)
  on conflict (user_id) do update set profile_id = excluded.profile_id, created_at = now();

  return v_profile;
end;
$$;

-- ── 로그인 ────────────────────────────────────────────────────────
-- 5번 틀리면 5분 잠근다. 닉네임이 없을 때와 비밀번호가 틀릴 때 같은 오류를 낸다.
create function public.login_account(p_nickname text, p_password text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := auth.uid();
  v_profile public.profiles%rowtype;
begin
  if v_uid is null then
    raise exception 'not_signed_in' using errcode = 'P0001';
  end if;

  select * into v_profile
  from public.profiles
  where lower(nickname) = lower(btrim(p_nickname))
  for update;

  if not found then
    -- 닉네임이 없어도 해시 계산 시간을 비슷하게 맞춘다
    perform extensions.crypt(coalesce(p_password, ''), extensions.gen_salt('bf', 10));
    raise exception 'bad_credentials' using errcode = 'P0001';
  end if;

  if v_profile.locked_until is not null and v_profile.locked_until > now() then
    raise exception 'locked' using errcode = 'P0001';
  end if;

  if v_profile.password_hash <> extensions.crypt(coalesce(p_password, ''), v_profile.password_hash) then
    update public.profiles
    set failed_attempts = case when failed_attempts + 1 >= 5 then 0 else failed_attempts + 1 end,
        locked_until = case when failed_attempts + 1 >= 5 then now() + interval '5 minutes' else null end
    where id = v_profile.id;
    -- 실패 횟수는 남겨야 하므로 예외 대신 null을 돌려준다 (예외는 위 update까지 되돌린다)
    return null;
  end if;

  update public.profiles set failed_attempts = 0, locked_until = null where id = v_profile.id;

  insert into public.devices (user_id, profile_id)
  values (v_uid, v_profile.id)
  on conflict (user_id) do update set profile_id = excluded.profile_id, created_at = now();

  return v_profile.id;
end;
$$;

-- ── 로그아웃 ──────────────────────────────────────────────────────
create function public.logout_account()
returns void
language sql
security definer
set search_path = ''
as $$
  delete from public.devices where user_id = auth.uid();
$$;

revoke all on function public.join_account(text, text) from public, anon;
revoke all on function public.login_account(text, text) from public, anon;
revoke all on function public.logout_account() from public, anon;
grant execute on function public.join_account(text, text) to authenticated;
grant execute on function public.login_account(text, text) to authenticated;
grant execute on function public.logout_account() to authenticated;
