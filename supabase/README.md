# EDU Platform Supabase Backend

This folder contains the backend migration for the Student learning/assessment, scheduling, attendance, grades, notifications, messaging, payments, certificates and referral foundations.

## Apply it

1. Open the Supabase project used by this app.
2. Open **SQL Editor**.
3. Create a new query.
4. Paste the contents of `migrations/20260814230000_student_platform_backend.sql`.
5. Run it once.
6. In **Table Editor**, confirm the new tables exist.
7. In **Authentication → Users**, make sure the users already have matching rows in `public.profiles` and the correct `public.user_roles` record.

No demo rows are inserted.

## Storage

Assignment uploads and certificate files require Storage buckets and policies. Do not create a public bucket for private student submissions. The frontend should use signed URLs when the storage integration is added.

## Payments

The `orders` and `payments` tables store transaction state. A real payment gateway must update these records from a trusted server/webhook. Never mark a payment as paid from the browser.
