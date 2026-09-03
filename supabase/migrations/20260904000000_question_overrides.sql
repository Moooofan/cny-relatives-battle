-- 《過年大戰三姑六婆》 admin question-bank editing (owner-only, static site).
-- See README.md「後台編輯」. The site has no server, so the owner's edits are
-- stored here as overrides and applied on top of the bundled content at
-- runtime (src/lib/contentOverrides.ts). Both tables are locked down with RLS
-- and NO direct policies — every read/write goes through the security-definer
-- functions below, the same pattern as 20260903000000_results.sql.

-- ---------------------------------------------------------------------------
-- admin_config: single-row-per-key config store. Currently only holds the
-- admin passcode. Unreadable by anon directly (no select policy) — checked
-- only via admin_check().
-- ---------------------------------------------------------------------------

create table if not exists public.admin_config (
  key   text primary key,
  value text not null
);

alter table public.admin_config enable row level security;
-- No policies on purpose: nobody can select/insert/update/delete this table
-- directly, anon or authenticated. All access is through admin_check() and
-- (indirectly) the admin_* mutation functions below.

-- Seed the owner's current passcode so existing behaviour keeps working.
-- To change it later, run in the Supabase SQL editor:
--   update public.admin_config set value = 'new-passcode' where key = 'admin_passcode';
insert into public.admin_config (key, value)
values ('admin_passcode', 'sangu2026')
on conflict (key) do nothing;

-- ---------------------------------------------------------------------------
-- question_overrides: owner edits to the bundled question bank, plus
-- owner-authored custom questions. Readable by everyone via
-- question_overrides_all() (it's public game content, not sensitive), but
-- only mutable through the admin_* functions below, each gated on the
-- passcode via admin_check().
-- ---------------------------------------------------------------------------

create table if not exists public.question_overrides (
  question_id text primary key,
  data        jsonb not null,
  deleted     boolean not null default false,
  updated_at  timestamptz not null default now()
);

alter table public.question_overrides enable row level security;
-- No direct policies: reads go through question_overrides_all(), writes
-- through admin_upsert_question / admin_delete_question / admin_restore_question.

-- ---------------------------------------------------------------------------
-- Security-definer functions. Each pins search_path so it can't be hijacked
-- by a session-local schema. The three admin_* mutators all re-check the
-- passcode server-side on every call — the client-held key
-- (sessionStorage `dzsg:admin-key`) is just a bearer token for it.
-- ---------------------------------------------------------------------------

create or replace function public.admin_check(p_key text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_config
    where key = 'admin_passcode' and value = p_key
  );
$$;

grant execute on function public.admin_check(text) to anon, authenticated;

create or replace function public.question_overrides_all()
returns setof public.question_overrides
language sql
stable
security definer
set search_path = public
as $$
  select * from public.question_overrides;
$$;

grant execute on function public.question_overrides_all() to anon, authenticated;

-- 12 topics from src/content/types.ts Topic — kept in sync manually since
-- Postgres has no shared enum with the TypeScript union.
create or replace function public._admin_valid_topic(p_topic text)
returns boolean
language sql
immutable
as $$
  select p_topic in (
    'marriage', 'kids', 'salary_job', 'housing', 'comparison', 'appearance',
    'education', 'politics', 'elder_health', 'food_push', 'red_envelope', 'religion'
  );
$$;

-- 8 boss ids from src/content/types.ts BossId — kept in sync manually.
create or replace function public._admin_valid_boss(p_boss text)
returns boolean
language sql
immutable
as $$
  select p_boss in (
    'xiao-biaodi', 'neighbor-chen', 'biaojie', 'dabo',
    'guzhang', 'sanjiuma', 'ama', 'sangu'
  );
$$;

create or replace function public.admin_upsert_question(p_key text, p_question_id text, p_data jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_boss_id text;
  v_text_len int;
begin
  if not public.admin_check(p_key) then
    raise exception 'invalid admin key';
  end if;

  if p_data ->> 'id' is distinct from p_question_id then
    raise exception 'question_overrides: data.id (%) must match p_question_id (%)', p_data ->> 'id', p_question_id;
  end if;

  if jsonb_array_length(p_data -> 'options') is distinct from 8 then
    raise exception 'question_overrides: options must have exactly 8 entries';
  end if;

  v_text_len := char_length(p_data ->> 'text');
  if v_text_len is null or v_text_len < 1 or v_text_len > 32 then
    raise exception 'question_overrides: text must be 1..32 characters';
  end if;

  if not public._admin_valid_topic(p_data ->> 'topic') then
    raise exception 'question_overrides: invalid topic "%"', p_data ->> 'topic';
  end if;

  v_boss_id := p_data ->> 'bossId';
  if v_boss_id is not null and not public._admin_valid_boss(v_boss_id) then
    raise exception 'question_overrides: invalid bossId "%"', v_boss_id;
  end if;

  insert into public.question_overrides (question_id, data, deleted, updated_at)
  values (p_question_id, p_data, false, now())
  on conflict (question_id)
  do update set data = excluded.data, deleted = false, updated_at = now();
end;
$$;

grant execute on function public.admin_upsert_question(text, text, jsonb) to anon, authenticated;

-- Soft delete: for a bundled id this hides the bundled question at runtime;
-- for a custom (owner-authored) id it also hides it. admin_restore_question
-- undoes this for bundled ids by removing the row entirely.
create or replace function public.admin_delete_question(p_key text, p_question_id text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.admin_check(p_key) then
    raise exception 'invalid admin key';
  end if;

  insert into public.question_overrides (question_id, data, deleted, updated_at)
  values (p_question_id, jsonb_build_object('id', p_question_id), true, now())
  on conflict (question_id)
  do update set deleted = true, updated_at = now();
end;
$$;

grant execute on function public.admin_delete_question(text, text) to anon, authenticated;

-- Removes the override row entirely so the bundled version of a question
-- (or, for a custom id, nothing at all) is what ships again.
create or replace function public.admin_restore_question(p_key text, p_question_id text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.admin_check(p_key) then
    raise exception 'invalid admin key';
  end if;

  delete from public.question_overrides where question_id = p_question_id;
end;
$$;

grant execute on function public.admin_restore_question(text, text) to anon, authenticated;
