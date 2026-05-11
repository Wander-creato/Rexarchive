create extension if not exists pgcrypto;

create table if not exists public.memories (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  type text check (type in ('photo', 'video', 'audio')),
  url text,
  title text,
  description text,
  category text default 'Patrimoine'
);

grant usage on schema public to anon, authenticated;
grant select, insert on table public.memories to anon, authenticated;

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
values ('archives', 'archives', true)
on conflict (id) do nothing;

drop policy if exists "Public read archives memories" on storage.objects;
create policy "Public read archives memories"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'archives');

drop policy if exists "Public upload archives memories" on storage.objects;
create policy "Public upload archives memories"
on storage.objects for insert
to anon, authenticated
with check (
  bucket_id = 'archives'
  and (storage.foldername(name))[1] = 'memories'
);
