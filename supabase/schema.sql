create extension if not exists "pgcrypto";

create type invite_status as enum ('pending', 'accepted', 'revoked', 'expired');
create type walk_status as enum ('idea', 'gathering_interest', 'critical_mass', 'cleared_for_takeoff', 'completed', 'cancelled');
create type interest_status as enum ('interested', 'maybe', 'requested', 'approved', 'waitlisted', 'declined', 'withdrawn');

create table public.authorized_emails (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  added_by_admin_id uuid references auth.users(id),
  created_at timestamptz not null default now(),
  used_at timestamptz,
  user_id uuid references auth.users(id),
  constraint authorized_emails_lowercase check (email = lower(email))
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  name text not null,
  age_range text not null,
  location_status text not null,
  city_region text,
  country text,
  latitude numeric,
  longitude numeric,
  location_visibility text not null default 'Hidden',
  bio text,
  preferred_contact_method text not null default 'email',
  phone_number text,
  whatsapp_number text,
  telegram_handle text,
  contact_notes text,
  is_admin boolean not null default false,
  is_disabled boolean not null default false,
  onboarded_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_lowercase_email check (email = lower(email))
);

create table public.invites (
  id uuid primary key default gen_random_uuid(),
  invite_code text not null unique,
  inviter_user_id uuid not null references public.profiles(id),
  recipient_email text not null,
  status invite_status not null default 'pending',
  created_at timestamptz not null default now(),
  accepted_at timestamptz,
  expires_at timestamptz not null,
  constraint invites_lowercase_recipient check (recipient_email = lower(recipient_email))
);

create table public.user_invite_credits (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  credits_available integer not null default 0,
  credits_used integer not null default 0,
  updated_at timestamptz not null default now()
);

create table public.user_availability (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  open_to_join_walks boolean not null default false,
  status text not null,
  availability_label text,
  availability_start_date date,
  availability_end_date date,
  preferred_location_mode text,
  preferred_regions text[],
  max_travel_distance text,
  walking_comfort_level text,
  topics_of_interest text[],
  notes text,
  visible_in_directory boolean not null default false,
  updated_at timestamptz not null default now()
);

create table public.walks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  organizer_user_id uuid not null references public.profiles(id),
  status walk_status not null default 'idea',
  location_mode text not null default 'tbd',
  location_label text,
  latitude numeric,
  longitude numeric,
  date_mode text not null default 'tbd',
  start_date date,
  end_date date,
  date_label text,
  estimated_duration_days integer,
  max_participants integer not null default 8,
  minimum_participants_for_takeoff integer not null default 5,
  theme text,
  short_summary text not null,
  full_description text not null,
  organizer_framework text not null,
  daily_rhythm text,
  conversation_structure text,
  participant_expectations text,
  general_outline text,
  daily_mileage_estimate text,
  difficulty text,
  lodging_concept text,
  estimated_cost_range text,
  planning_document_url text,
  planning_document_visible_after_takeoff boolean not null default true,
  organizer_commitment_level text not null default 'Concept',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.walk_participants (
  id uuid primary key default gen_random_uuid(),
  walk_id uuid not null references public.walks(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  status interest_status not null default 'interested',
  note text,
  preferred_contact_method_for_walk text not null default 'email',
  may_organizer_contact boolean not null default false,
  share_optional_contact_with_organizer boolean not null default false,
  dietary_accessibility_notes text,
  mileage_comfort text,
  willing_to_help_organize boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  approved_at timestamptz,
  approved_by_user_id uuid references public.profiles(id),
  unique (walk_id, user_id)
);

create table public.walk_ai_drafts (
  id uuid primary key default gen_random_uuid(),
  organizer_user_id uuid not null references public.profiles(id),
  input_json jsonb not null,
  output_json jsonb not null,
  created_at timestamptz not null default now(),
  accepted_into_walk_id uuid references public.walks(id),
  status text not null default 'draft'
);

alter table public.authorized_emails enable row level security;
alter table public.profiles enable row level security;
alter table public.invites enable row level security;
alter table public.user_invite_credits enable row level security;
alter table public.user_availability enable row level security;
alter table public.walks enable row level security;
alter table public.walk_participants enable row level security;
alter table public.walk_ai_drafts enable row level security;

create or replace function public.is_admin()
returns boolean language sql security definer set search_path = public as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

create or replace function public.is_approved_member()
returns boolean language sql security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and onboarded_at is not null and is_disabled = false
  );
$$;

create policy "members can read directory-safe profiles" on public.profiles for select using (public.is_approved_member() or id = auth.uid() or public.is_admin());
create policy "users update own profile" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy "admins manage authorized emails" on public.authorized_emails for all using (public.is_admin()) with check (public.is_admin());
create policy "members view own invite credits" on public.user_invite_credits for select using (user_id = auth.uid() or public.is_admin());
create policy "users manage own availability" on public.user_availability for all using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());
create policy "members read visible availability" on public.user_availability for select using (public.is_approved_member() and visible_in_directory = true);
create policy "members read walks" on public.walks for select using (public.is_approved_member());
create policy "members create walks" on public.walks for insert with check (public.is_approved_member() and organizer_user_id = auth.uid());
create policy "organizer or admin edits walks" on public.walks for update using (organizer_user_id = auth.uid() or public.is_admin()) with check (organizer_user_id = auth.uid() or public.is_admin());
create policy "members read walk participation" on public.walk_participants for select using (public.is_approved_member());
create policy "users express own interest" on public.walk_participants for insert with check (public.is_approved_member() and user_id = auth.uid());
create policy "organizer admin approves participation" on public.walk_participants for update using (user_id = auth.uid() or public.is_admin() or exists (select 1 from public.walks where walks.id = walk_id and walks.organizer_user_id = auth.uid())) with check (user_id = auth.uid() or public.is_admin() or exists (select 1 from public.walks where walks.id = walk_id and walks.organizer_user_id = auth.uid()));
create policy "organizers manage ai drafts" on public.walk_ai_drafts for all using (organizer_user_id = auth.uid() or public.is_admin()) with check (organizer_user_id = auth.uid() or public.is_admin());

create view public.open_to_join_directory as
select p.id, p.name, p.location_status, p.city_region, p.country, p.location_visibility, p.bio, a.status, a.availability_label, a.preferred_location_mode, a.preferred_regions, a.walking_comfort_level, a.topics_of_interest, a.notes
from public.profiles p
join public.user_availability a on a.user_id = p.id
where a.visible_in_directory = true
  and a.status in ('Ready to Join', 'Interested', 'Maybe', 'Organizing')
  and p.is_disabled = false;
