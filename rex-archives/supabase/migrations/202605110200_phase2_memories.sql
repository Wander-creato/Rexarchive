-- Phase 2 schema for Rex-Archives
-- Run this in Supabase SQL editor or via CLI migration flow.

create extension if not exists pgcrypto;

create table if not exists public.memories (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid references auth.users (id) on delete set null,
  type text not null check (type in ('image', 'video', 'audio')),
  media_url text not null,
  thumbnail_url text,
  transcript text,
  user_text_testimonial text,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists memories_created_at_idx on public.memories (created_at desc);
create index if not exists memories_type_idx on public.memories (type);

alter table public.memories enable row level security;

drop policy if exists "Public read memories" on public.memories;
create policy "Public read memories"
on public.memories for select
to anon, authenticated
using (true);

drop policy if exists "Public insert memories" on public.memories;
create policy "Public insert memories"
on public.memories for insert
to anon, authenticated
with check (true);

insert into storage.buckets (id, name, public)
values ('vault', 'vault', true)
on conflict (id) do nothing;

drop policy if exists "Public read vault memories" on storage.objects;
create policy "Public read vault memories"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'vault');

drop policy if exists "Public upload vault memories" on storage.objects;
create policy "Public upload vault memories"
on storage.objects for insert
to anon, authenticated
with check (
  bucket_id = 'vault'
  and (storage.foldername(name))[1] = 'memories'
);
