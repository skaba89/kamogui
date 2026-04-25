create table if not exists investor_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text not null,
  phone text,
  country text,
  investment_range text,
  need text,
  score int,
  level text,
  created_at timestamptz default now()
);
alter table investor_leads enable row level security;
create policy "service_role_all" on investor_leads for all using (true) with check (true);
