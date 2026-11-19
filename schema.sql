-- RPF_MIS REMERA starter schema (PostgreSQL / Supabase)
-- Apply only in a private project. Review and enable RLS policies before production.

create extension if not exists pgcrypto;

create table if not exists public.app_users (
  id uuid primary key references auth.users(id) on delete cascade,
  names text not null,
  username text unique not null,
  role text not null check (role in ('primary_holder','secondary_holder')),
  approval_status text not null default 'pending' check (approval_status in ('pending','approved','suspended')),
  created_at timestamptz not null default now()
);

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  member_id text unique not null,
  registration_number bigint unique not null,
  names text not null,
  national_id text unique,
  telephone text,
  email text,
  date_of_birth date,
  nationality text,
  gender text,
  marital_status text,
  province text,
  district text,
  sector text,
  cell text,
  village text,
  education_level text,
  occupation text,
  membership_category text,
  membership_status text not null default 'active',
  legacy_record boolean not null default false,
  needs_review boolean not null default false,
  source_import_batch uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint national_id_format check (national_id is null or national_id ~ '^[0-9]{16}$'),
  constraint telephone_format check (telephone is null or telephone ~ '^[0-9]{10}$')
);

create table if not exists public.import_batches (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  imported_by uuid references public.app_users(id),
  status text not null default 'staged' check (status in ('staged','validated','committed','rejected')),
  total_rows integer not null default 0,
  accepted_rows integer not null default 0,
  rejected_rows integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.members
  add constraint members_import_batch_fk
  foreign key (source_import_batch) references public.import_batches(id);

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.app_users(id),
  action text not null,
  entity_type text,
  entity_id text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists members_cell_village_idx on public.members(cell, village);
create index if not exists members_names_idx on public.members using gin (to_tsvector('simple', names));
create index if not exists members_registration_number_idx on public.members(registration_number);

-- Location reference values supplied for this project.
create table if not exists public.location_cells (
  cell_name text primary key,
  sector_name text not null default 'Remera',
  district_name text not null default 'Gasabo',
  province_name text not null default 'Kigali City'
);
insert into public.location_cells(cell_name) values
 ('Rukiri I'),('Rukiri II'),('Nyabisindu'),('Nyarutarama')
on conflict do nothing;

-- IMPORTANT:
-- Enable RLS on every table and add policies based on authenticated app_users.role.
-- Do not deploy with unrestricted policies. Keep service-role credentials server-side.
-- Provision the primary holder using a trusted server-side process; do not store a password here.
