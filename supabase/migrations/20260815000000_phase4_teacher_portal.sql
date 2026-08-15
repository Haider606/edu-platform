-- PHASE 4 — Teacher Portal additive backend requirements
-- Safe migration: creates only missing Phase 4 tables/policies.
-- It does NOT drop tables, users, roles, or existing policies.
-- Review in Supabase SQL Editor before applying.

-- 1) Teachers must be able to read enrollments belonging to their own courses.
create policy "teachers read own course enrollments"
on public.enrollments for select
using (
  exists (
    select 1 from public.courses c
    where c.id = enrollments.course_id and c.instructor_id = auth.uid()
  )
  or public.has_role('Manager') or public.has_role('Admin')
);

-- 2) Teachers need to see profiles of students enrolled in their courses.
create policy "teachers read own course student profiles"
on public.profiles for select
using (
  id = auth.uid()
  or exists (
    select 1
    from public.enrollments e
    join public.courses c on c.id = e.course_id
    where e.student_id = profiles.id
      and c.instructor_id = auth.uid()
  )
  or public.has_role('Manager') or public.has_role('Admin')
);

-- 3) Assignment review write access.
create policy "teachers update own assignment submissions"
on public.assignment_submissions for update
using (
  exists (
    select 1 from public.assignments a
    where a.id = assignment_submissions.assignment_id
      and a.teacher_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.assignments a
    where a.id = assignment_submissions.assignment_id
      and a.teacher_id = auth.uid()
  )
);

-- 4) Teacher grade management.
create policy "teachers insert own course grades"
on public.grades for insert
with check (
  exists (
    select 1 from public.courses c
    where c.id = grades.course_id and c.instructor_id = auth.uid()
  )
);

create policy "teachers update own course grades"
on public.grades for update
using (
  exists (
    select 1 from public.courses c
    where c.id = grades.course_id and c.instructor_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.courses c
    where c.id = grades.course_id and c.instructor_id = auth.uid()
  )
);

-- 5) Teacher attendance management.
create policy "teachers insert own class attendance"
on public.attendance for insert
with check (
  exists (
    select 1 from public.class_schedules cs
    where cs.id = attendance.class_id and cs.teacher_id = auth.uid()
  )
);

create policy "teachers update own class attendance"
on public.attendance for update
using (
  exists (
    select 1 from public.class_schedules cs
    where cs.id = attendance.class_id and cs.teacher_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.class_schedules cs
    where cs.id = attendance.class_id and cs.teacher_id = auth.uid()
  )
);

-- 6) Teacher-managed study materials.
create policy "teachers manage own course materials"
on public.study_materials for all
using (
  exists (
    select 1 from public.courses c
    where c.id = study_materials.course_id and c.instructor_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.courses c
    where c.id = study_materials.course_id and c.instructor_id = auth.uid()
  )
);

-- 7) Announcements (not present in the supplied student migration).
create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  title text not null,
  message text not null,
  audience text not null default 'course',
  status text not null default 'published' check (status in ('draft','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.announcements enable row level security;

create policy "teachers manage own announcements"
on public.announcements for all
using (author_id = auth.uid() or public.has_role('Manager') or public.has_role('Admin'))
with check (author_id = auth.uid() or public.has_role('Manager') or public.has_role('Admin'));

create policy "students read published course announcements"
on public.announcements for select
using (
  status = 'published'
  and (
    exists (
      select 1 from public.enrollments e
      where e.student_id = auth.uid()
        and e.course_id = announcements.course_id
        and e.status in ('active','completed')
    )
    or author_id = auth.uid()
    or public.has_role('Manager') or public.has_role('Admin')
  )
);

-- 8) Daily teacher reports.
create table if not exists public.teacher_daily_reports (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.profiles(id) on delete cascade,
  report_date date not null,
  classes_conducted integer not null default 0 check (classes_conducted >= 0),
  topics_covered text,
  students_attended integer not null default 0 check (students_attended >= 0),
  assignments_checked integer not null default 0 check (assignments_checked >= 0),
  issues text,
  additional_notes text,
  created_at timestamptz not null default now()
);
create index if not exists idx_teacher_daily_reports_teacher_date
on public.teacher_daily_reports(teacher_id, report_date desc);
alter table public.teacher_daily_reports enable row level security;

create policy "teachers manage own daily reports"
on public.teacher_daily_reports for all
using (teacher_id = auth.uid() or public.has_role('Manager') or public.has_role('Admin'))
with check (teacher_id = auth.uid() or public.has_role('Manager') or public.has_role('Admin'));

-- 9) Internship opportunities. This is intentionally read-only for teachers.
create table if not exists public.internships (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  position text not null,
  skills text,
  duration text,
  deadline date,
  description text,
  apply_url text,
  status text not null default 'open' check (status in ('open','closed','draft')),
  created_at timestamptz not null default now()
);
alter table public.internships enable row level security;

create policy "authenticated users read open internships"
on public.internships for select
using (status = 'open' or public.has_role('Manager') or public.has_role('Admin'));

-- Optional Storage setup for teacher-uploaded files.
-- Only run this section if you want real uploads from the browser:
-- insert into storage.buckets (id,name,public)
-- values ('teacher-materials','teacher-materials',false)
-- on conflict (id) do nothing;
--
-- Then add Storage RLS policies that restrict object ownership/paths
-- to authenticated teachers. Do not make the bucket public merely
-- to simplify uploads.
