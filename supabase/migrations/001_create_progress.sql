create table public.progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  topic_slug text not null,
  section text not null check (section in ('explain', 'demo', 'exercise')),
  completed boolean default false not null,
  score integer,
  completed_at timestamptz,
  created_at timestamptz default now() not null,
  unique(user_id, topic_slug, section)
);

alter table public.progress enable row level security;

create policy "Users can read own progress" on public.progress
  for select using (auth.uid() = user_id);

create policy "Users can insert own progress" on public.progress
  for insert with check (auth.uid() = user_id);

create policy "Users can update own progress" on public.progress
  for update using (auth.uid() = user_id);
