-- 출시 초기에 순위표가 비어 보이지 않도록 넣는 더미 계정을 구분한다.
-- is_seed 는 API 컬럼 권한에 포함하지 않으므로 밖에서는 보이지 않는다.
-- 실제 사용자가 충분히 모이면:  delete from public.profiles where is_seed;
alter table public.profiles add column is_seed boolean not null default false;
