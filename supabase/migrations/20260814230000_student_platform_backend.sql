-- EDU Platform: Student learning, assessment, scheduling, payments,
-- certificates and referrals backend foundation.
-- Run this migration in Supabase SQL Editor or via Supabase CLI.
-- No demo/fake rows are inserted.

create extension if not exists pgcrypto;

-- ---------- Helpers ----------
create or replace function public.has_role(role_name text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles ur
    join public.roles r on r.id = ur.role_id
    where ur.user_id = auth.uid()
      and lower(r.name) = lower(role_name)
  );
$$;

grant execute on function public.has_role(text) to authenticated;

-- ---------- Courses ----------
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  description text,
  thumbnail text,
  instructor_id uuid references public.profiles(id) on delete set null,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  price numeric(12,2) not null default 0 check (price >= 0),
  duration_hours numeric(8,2) check (duration_hours is null or duration_hours >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'active' check (status in ('pending','active','completed','cancelled')),
  progress numeric(5,2) not null default 0 check (progress between 0 and 100),
  enrolled_at timestamptz not null default now(),
  completed_at timestamptz,
  unique(course_id, student_id)
);

create table if not exists public.course_modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.course_modules(id) on delete cascade,
  title text not null,
  description text,
  content text,
  video_url text,
  duration_minutes integer check (duration_minutes is null or duration_minutes >= 0),
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  completed boolean not null default false,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique(lesson_id, student_id)
);

-- ---------- Assignments ----------
create table if not exists public.assignments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  teacher_id uuid references public.profiles(id) on delete set null,
  title text not null,
  description text,
  instructions text,
  due_at timestamptz,
  max_marks numeric(8,2) not null default 100 check (max_marks >= 0),
  status text not null default 'published' check (status in ('draft','published','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.assignment_submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  submission_text text,
  file_path text,
  submitted_at timestamptz not null default now(),
  status text not null default 'submitted' check (status in ('draft','submitted','graded','returned','late')),
  marks numeric(8,2),
  feedback text,
  graded_at timestamptz,
  unique(assignment_id, student_id)
);

create table if not exists public.study_materials (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  type text not null check (type in ('PDF','Slides','Notes','Resources','Assignments')),
  description text,
  file_path text,
  file_size bigint,
  created_at timestamptz not null default now()
);

-- ---------- Classes / attendance ----------
create table if not exists public.class_schedules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  teacher_id uuid references public.profiles(id) on delete set null,
  title text not null,
  description text,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  meeting_url text,
  recording_url text,
  status text not null default 'scheduled' check (status in ('scheduled','live','completed','cancelled')),
  created_at timestamptz not null default now(),
  check (ends_at > starts_at)
);

create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.class_schedules(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  status text not null check (status in ('present','absent','late','excused')),
  marked_at timestamptz not null default now(),
  unique(class_id, student_id)
);

create table if not exists public.grades (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  assignment_id uuid references public.assignments(id) on delete set null,
  title text not null,
  marks numeric(8,2),
  max_marks numeric(8,2),
  feedback text,
  graded_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------- Notifications / messaging ----------
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  message text not null,
  type text not null default 'general',
  action_url text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.profiles(id) on delete cascade,
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  subject text,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------- Payments / orders ----------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid references public.courses(id) on delete set null,
  amount numeric(12,2) not null check (amount >= 0),
  currency text not null default 'PKR',
  status text not null default 'pending' check (status in ('pending','paid','failed','refunded','cancelled')),
  provider text,
  provider_reference text,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  amount numeric(12,2) not null check (amount >= 0),
  currency text not null default 'PKR',
  status text not null default 'pending' check (status in ('pending','paid','failed','refunded')),
  provider text,
  provider_reference text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

-- ---------- Certificates ----------
create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  certificate_number text not null unique,
  issued_at timestamptz not null default now(),
  file_path text,
  verification_code text not null unique,
  unique(student_id, course_id)
);

-- ---------- Referrals ----------
create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid not null references public.profiles(id) on delete cascade,
  referred_user_id uuid references public.profiles(id) on delete set null,
  referral_code text not null unique,
  status text not null default 'pending' check (status in ('pending','qualified','rewarded','cancelled')),
  reward_amount numeric(12,2) not null default 0 check (reward_amount >= 0),
  created_at timestamptz not null default now(),
  qualified_at timestamptz,
  rewarded_at timestamptz
);

-- ---------- Indexes ----------
create index if not exists idx_enrollments_student on public.enrollments(student_id);
create index if not exists idx_enrollments_course on public.enrollments(course_id);
create index if not exists idx_assignments_course on public.assignments(course_id);
create index if not exists idx_submissions_student on public.assignment_submissions(student_id);
create index if not exists idx_class_schedules_course on public.class_schedules(course_id);
create index if not exists idx_attendance_student on public.attendance(student_id);
create index if not exists idx_grades_student on public.grades(student_id);
create index if not exists idx_notifications_user on public.notifications(user_id, created_at desc);
create index if not exists idx_messages_recipient on public.messages(recipient_id, created_at desc);
create index if not exists idx_orders_student on public.orders(student_id, created_at desc);
create index if not exists idx_payments_student on public.payments(student_id, created_at desc);
create index if not exists idx_certificates_student on public.certificates(student_id);
create index if not exists idx_referrals_referrer on public.referrals(referrer_id);

-- ---------- RLS ----------

do $$
declare t text;
begin
  foreach t in array array[
    'courses','enrollments','course_modules','lessons','lesson_progress',
    'assignments','assignment_submissions','study_materials','class_schedules',
    'attendance','grades','notifications','messages','orders','payments',
    'certificates','referrals'
  ] loop
    execute format('alter table public.%I enable row level security', t);
  end loop;
end $$;

-- Publicly visible published course catalog; management policies are role based.
drop policy if exists "published courses are public" on public.courses;
create policy "published courses are public" on public.courses
for select using (status = 'published' or auth.uid() is not null and (instructor_id = auth.uid() or public.has_role('Manager') or public.has_role('Admin')));

drop policy if exists "students read own enrollments" on public.enrollments;
create policy "students read own enrollments" on public.enrollments for select using (student_id = auth.uid() or public.has_role('Manager') or public.has_role('Admin'));

drop policy if exists "students read enrolled modules" on public.course_modules;
create policy "students read enrolled modules" on public.course_modules for select using (
  exists (select 1 from public.enrollments e where e.course_id = course_modules.course_id and e.student_id = auth.uid() and e.status in ('active','completed'))
  or public.has_role('Teacher') or public.has_role('Manager') or public.has_role('Admin')
);

drop policy if exists "students read lessons in enrolled courses" on public.lessons;
create policy "students read lessons in enrolled courses" on public.lessons for select using (
  exists (
    select 1 from public.course_modules m
    join public.enrollments e on e.course_id = m.course_id
    where m.id = lessons.module_id and e.student_id = auth.uid() and e.status in ('active','completed')
  ) or public.has_role('Teacher') or public.has_role('Manager') or public.has_role('Admin')
);

drop policy if exists "students manage own lesson progress" on public.lesson_progress;
create policy "students manage own lesson progress" on public.lesson_progress for all using (student_id = auth.uid()) with check (student_id = auth.uid());

drop policy if exists "students read assignments for enrolled courses" on public.assignments;
create policy "students read assignments for enrolled courses" on public.assignments for select using (
  exists (select 1 from public.enrollments e where e.course_id = assignments.course_id and e.student_id = auth.uid() and e.status in ('active','completed'))
  or teacher_id = auth.uid() or public.has_role('Manager') or public.has_role('Admin')
);

drop policy if exists "students manage own submissions" on public.assignment_submissions;
create policy "students manage own submissions" on public.assignment_submissions for all using (student_id = auth.uid()) with check (student_id = auth.uid());

drop policy if exists "teachers review submissions" on public.assignment_submissions;
create policy "teachers review submissions" on public.assignment_submissions for select using (
  exists (select 1 from public.assignments a where a.id = assignment_submissions.assignment_id and a.teacher_id = auth.uid())
  or public.has_role('Manager') or public.has_role('Admin')
);

drop policy if exists "students read course materials" on public.study_materials;
create policy "students read course materials" on public.study_materials for select using (
  exists (select 1 from public.enrollments e where e.course_id = study_materials.course_id and e.student_id = auth.uid() and e.status in ('active','completed'))
  or public.has_role('Teacher') or public.has_role('Manager') or public.has_role('Admin')
);

drop policy if exists "students read class schedules" on public.class_schedules;
create policy "students read class schedules" on public.class_schedules for select using (
  exists (select 1 from public.enrollments e where e.course_id = class_schedules.course_id and e.student_id = auth.uid() and e.status in ('active','completed'))
  or teacher_id = auth.uid() or public.has_role('Manager') or public.has_role('Admin')
);

drop policy if exists "students read own attendance" on public.attendance;
create policy "students read own attendance" on public.attendance for select using (student_id = auth.uid() or public.has_role('Teacher') or public.has_role('Manager') or public.has_role('Admin'));

drop policy if exists "students read own grades" on public.grades;
create policy "students read own grades" on public.grades for select using (student_id = auth.uid() or public.has_role('Teacher') or public.has_role('Manager') or public.has_role('Admin'));

drop policy if exists "users read own notifications" on public.notifications;
create policy "users read own notifications" on public.notifications for select using (user_id = auth.uid());
drop policy if exists "users update own notifications" on public.notifications;
create policy "users update own notifications" on public.notifications for update using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "users read their messages" on public.messages;
create policy "users read their messages" on public.messages for select using (sender_id = auth.uid() or recipient_id = auth.uid());
drop policy if exists "users send messages" on public.messages;
create policy "users send messages" on public.messages for insert with check (sender_id = auth.uid());
drop policy if exists "users update received messages" on public.messages;
create policy "users update received messages" on public.messages for update using (recipient_id = auth.uid()) with check (recipient_id = auth.uid());

drop policy if exists "students read own orders" on public.orders;
create policy "students read own orders" on public.orders for select using (student_id = auth.uid() or public.has_role('Manager') or public.has_role('Admin'));
drop policy if exists "students read own payments" on public.payments;
create policy "students read own payments" on public.payments for select using (student_id = auth.uid() or public.has_role('Manager') or public.has_role('Admin'));

drop policy if exists "students read own certificates" on public.certificates;
create policy "students read own certificates" on public.certificates for select using (student_id = auth.uid() or public.has_role('Manager') or public.has_role('Admin'));

drop policy if exists "users read own referrals" on public.referrals;
create policy "users read own referrals" on public.referrals for select using (referrer_id = auth.uid() or referred_user_id = auth.uid() or public.has_role('Manager') or public.has_role('Admin'));

-- Management policies for content creation/update. Students never receive these rights.

drop policy if exists "teachers manage their courses" on public.courses;
create policy "teachers manage their courses" on public.courses for all using (
  instructor_id = auth.uid() or public.has_role('Manager') or public.has_role('Admin')
) with check (instructor_id = auth.uid() or public.has_role('Manager') or public.has_role('Admin'));

drop policy if exists "teachers manage assignments" on public.assignments;
create policy "teachers manage assignments" on public.assignments for all using (
  teacher_id = auth.uid() or public.has_role('Manager') or public.has_role('Admin')
) with check (teacher_id = auth.uid() or public.has_role('Manager') or public.has_role('Admin'));

-- Enrollment creation is intentionally restricted to managers/admins. Payment confirmation
-- should be performed by a trusted server/webhook, never by a browser using the anon key.
drop policy if exists "management manage enrollments" on public.enrollments;
create policy "management manage enrollments" on public.enrollments for all using (public.has_role('Manager') or public.has_role('Admin')) with check (public.has_role('Manager') or public.has_role('Admin'));

-- Updated-at trigger.
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists courses_set_updated_at on public.courses;
create trigger courses_set_updated_at before update on public.courses for each row execute function public.set_updated_at();
drop trigger if exists assignments_set_updated_at on public.assignments;
create trigger assignments_set_updated_at before update on public.assignments for each row execute function public.set_updated_at();
