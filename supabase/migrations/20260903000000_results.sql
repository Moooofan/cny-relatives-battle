-- 《過年大戰三姑六婆》 optional global result collection / leaderboards.
-- See README.md「Supabase（選用）」. Anonymous inserts only; no client can
-- ever SELECT the base table — all reads go through the security-definer
-- functions below, which return only the aggregate/public-safe columns.

create table if not exists public.results (
  result_code    text primary key,
  client_id      uuid not null,
  life_id        text,
  life_code      text not null,
  mode           text not null check (mode in ('random', 'daily', 'story', 'gauntlet')),
  score          int not null,
  rank           int not null,
  rank_title     text not null,
  ending_id      text,
  won            boolean not null,
  bosses_defeated int not null,
  turns          int not null,
  max_combo      int not null,
  hp_left        int not null,
  seed           text not null,
  boss_ids       text[] not null default '{}',
  daily_date     date,
  log            jsonb not null default '[]',
  app_version    text,
  created_at     timestamptz not null default now()
);

create index if not exists results_mode_score_idx on public.results (mode, score desc);
create index if not exists results_life_code_idx on public.results (life_code);
create index if not exists results_daily_date_idx on public.results (daily_date);
create index if not exists results_created_at_idx on public.results (created_at desc);

alter table public.results enable row level security;

-- No select policy is defined on purpose: every read goes through the
-- security-definer functions below instead of the base table.
drop policy if exists anon_insert on public.results;
create policy anon_insert on public.results
  for insert
  to anon, authenticated
  with check (
    char_length(result_code) between 8 and 12
    and turns between 1 and 200
    and score between -1000 and 5000
  );

-- ---------------------------------------------------------------------------
-- Read-only, cheap security-definer functions. Each is STABLE (no writes)
-- and pins search_path so it can't be hijacked by a session-local schema.
-- ---------------------------------------------------------------------------

create or replace function public.leaderboard(p_mode text, p_limit int default 50)
returns table (
  result_code     text,
  life_code       text,
  life_id         text,
  score           int,
  rank_title      text,
  won             boolean,
  bosses_defeated int,
  turns           int,
  created_at      timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select result_code, life_code, life_id, score, rank_title, won, bosses_defeated, turns, created_at
  from public.results
  where mode = p_mode
  order by score desc
  limit least(greatest(coalesce(p_limit, 50), 1), 100);
$$;

grant execute on function public.leaderboard(text, int) to anon, authenticated;

create or replace function public.daily_leaderboard(p_date date, p_limit int default 50)
returns table (
  result_code     text,
  life_code       text,
  life_id         text,
  score           int,
  rank_title      text,
  won             boolean,
  bosses_defeated int,
  turns           int,
  created_at      timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select result_code, life_code, life_id, score, rank_title, won, bosses_defeated, turns, created_at
  from public.results
  where mode = 'daily' and daily_date = p_date
  order by score desc
  limit least(greatest(coalesce(p_limit, 50), 1), 100);
$$;

grant execute on function public.daily_leaderboard(date, int) to anon, authenticated;

create or replace function public.life_stats()
returns table (
  life_code text,
  runs      bigint,
  avg_score numeric,
  win_rate  numeric
)
language sql
stable
security definer
set search_path = public
as $$
  select
    life_code,
    count(*) as runs,
    round(avg(score)::numeric, 1) as avg_score,
    round((count(*) filter (where won))::numeric / count(*)::numeric, 3) as win_rate
  from public.results
  group by life_code
  order by avg_score desc;
$$;

grant execute on function public.life_stats() to anon, authenticated;

create or replace function public.boss_stats()
returns table (
  boss_id    text,
  encounters bigint
)
language sql
stable
security definer
set search_path = public
as $$
  select b.boss_id, count(*) as encounters
  from public.results r, unnest(r.boss_ids) as b(boss_id)
  group by b.boss_id
  order by encounters desc;
$$;

grant execute on function public.boss_stats() to anon, authenticated;

create or replace function public.question_stats()
returns table (
  question_id   text,
  asked         bigint,
  perfect_rate  numeric,
  landmine_rate numeric
)
language sql
stable
security definer
set search_path = public
as $$
  select
    entry ->> 'question_id' as question_id,
    count(*) as asked,
    round((count(*) filter (where entry ->> 'archetype' = 'perfect'))::numeric / count(*)::numeric, 3) as perfect_rate,
    round((count(*) filter (where entry ->> 'archetype' = 'landmine'))::numeric / count(*)::numeric, 3) as landmine_rate
  from public.results r, jsonb_array_elements(r.log) as entry
  where entry ->> 'question_id' is not null
  group by entry ->> 'question_id'
  order by asked desc;
$$;

grant execute on function public.question_stats() to anon, authenticated;

create or replace function public.global_counts()
returns table (
  total_runs       bigint,
  runs_today       bigint,
  distinct_clients bigint
)
language sql
stable
security definer
set search_path = public
as $$
  select
    count(*) as total_runs,
    count(*) filter (
      where (created_at at time zone 'Asia/Taipei')::date = (now() at time zone 'Asia/Taipei')::date
    ) as runs_today,
    count(distinct client_id) as distinct_clients
  from public.results;
$$;

grant execute on function public.global_counts() to anon, authenticated;
