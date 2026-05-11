drop table if exists public.memories;

create table memories (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  type text, -- 'photo', 'video', 'audio'
  url text,
  title text,
  description text,
  category text
);

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
