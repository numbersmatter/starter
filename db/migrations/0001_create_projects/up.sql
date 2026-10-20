create table projects (
  id text primary key not null,
  name text not null check (length(trim(name)) > 0),
  description text not null default '',
  status text not null default 'planned' check (status in ('planned', 'active', 'done')),
  created_at integer not null,
  updated_at integer not null
);
