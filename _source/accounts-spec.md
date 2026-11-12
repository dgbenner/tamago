# Tamago accounts, layer 1

Dan's brief, November 11, 2026: accounts and an admin console, with stubs for later roles. Layer 1 runs on a mock account service on the device. The real service, Supabase Auth with row-level security, plugs in later with no screen changes. Public sign-up stays off until Dan approves it. No external account has been made and no money spent.

## Supabase setup (for Dan)

Free tier throughout. Each step happens in a dashboard, so Claude can't do it for you.

1. **Make the project.** At supabase.com, sign in and choose **New project**. Use these settings:
   - **Name:** tamago.
   - **Region:** the one nearest you, for example US East.
   - **Database password:** a long generated one, saved in your password manager. Tamago never needs it.
   - **Plan:** Free.
2. **Turn on email sign-in, with public sign-up off.**
   - **Authentication → Sign In / Providers → Email:** turn **Email** on and keep **Confirm email** on.
   - **Authentication → Sign In / Providers → User Signups:** turn **Allow new users to sign up** off.
   - While it's off, you add accounts yourself with **Authentication → Users → Add user** (or **Invite**).
3. **Set where reset links point.** Under **Authentication → URL Configuration**:
   - **Site URL:** `https://tamago-83f.pages.dev`
   - **Redirect URLs:** add `https://tamago-83f.pages.dev/account/reset` and `http://localhost:5180/account/reset`.
4. **Make the tables.** Open **SQL Editor → New query**, paste the whole SQL block from the "Database" section below, and choose **Run**. It should end with "Success. No rows returned".
5. **Copy three values** from **Project Settings → API Keys** and **Project Settings → Data API**:
   - **Project URL**, which looks like `https://abcd1234.supabase.co`.
   - **anon / publishable key.** This key is public by design: row-level security is what keeps data private.
   - **service_role / secret key.** This one is private. It goes only into a Cloudflare secret, never into the code or a chat.
6. **Put them in Cloudflare.** Go to **Workers & Pages → tamago → Settings → Variables and Secrets**, choose the **Production** environment, and add:

   | Name | Type | Value |
   | --- | --- | --- |
   | `VITE_AUTH` | Text | `supabase` |
   | `VITE_SUPABASE_URL` | Text | the Project URL |
   | `VITE_SUPABASE_ANON_KEY` | Text | the anon / publishable key |
   | `TAMAGO_SUPABASE_URL` | Text | the Project URL again (for the server function) |
   | `TAMAGO_SUPABASE_SERVICE_ROLE_KEY` | **Secret** | the service_role / secret key |

   The three `VITE_` values are read when the site is built, so the next deploy picks them up. Ask Claude to push, or choose **Retry deployment** on the latest deploy. The server function reads the two `TAMAGO_SUPABASE_` values at request time.
7. **Make yourself admin.**
   - Under **Authentication → Users → Add user**, add your own email with a password.
   - Then in **SQL Editor**, run `update public.profiles set role = 'admin' where email = 'YOUR EMAIL';`
8. **Tell Claude.** Claude then runs the smoke test against the real service, which needs a test account you add the same way.

Later, not needed now:
- Supabase's built-in email sender allows only a few emails an hour, which is fine for testing. Before real users arrive, connect your own sender in **Authentication → Emails → SMTP Settings**. Resend's free tier, for example, costs nothing.
- Free projects pause after a week with no traffic. One click in the dashboard wakes them.

## Roles

| Role | Who | Reaches |
| --- | --- | --- |
| learner | everyone with an account; every new account starts here | the app, their Profile |
| contributor | people who suggest sentences, translations and fixes | Contribute (a placeholder for now) |
| reviewer | people who check flagged answers and contributions | Review (a placeholder for now) |
| admin | Dan, and anyone Dan promotes | the console's Users section, plus Review and Contribute |

Roles change only in the console (admins), or in the database. No one can change their own role, turn their own account off, or edit their own email through the app; a database trigger enforces this, not only the screens. An admin can't demote themselves from the console.

## Data model

Every table lives in Supabase's `public` schema, with row-level security on.

- **profiles**: one row per account, made automatically when an account is created.
  - Columns: `id` (the auth user), `email` (copied in), `screen_name`, `role`, `disabled`, `created_at`, `last_active_at`.
  - A user reads and edits their own row: screen name and last active only. Admins read and edit every row.
- **progress**: one row per account per course (`fr`, `es`, `de`).
  - `snapshot` is the whole of that course's device data, in the same format as the backup file (store.js `dumpAll`).
  - `summary` is the small part the console shows: lessons done, circles started, words met, last lesson.
  - A user reads and writes only their own rows. Admins read every row.
- **sessions**: one row per finished lesson, Brush-Up, checkpoint or review.
  - Columns: course, kind, circle, round, score, size, passed, started and finished times.
  - A user adds and reads their own rows. Admins read every row. Nobody edits or deletes from the app.
- **comments** and **reviews**: placeholder tables for a later layer, with row-level security on and no policies yet. Until then only the service role can touch them.

The mock keeps the same shapes in an IndexedDB database on the device (`tamago-accounts-mock`). The signed-in account is held in localStorage (`tamago-auth-session`), and passwords are stored as SHA-256 hashes.

## Screens and how each role reaches them

The app works exactly as before with no account. Signing in is optional and never sits on the tree.

| Screen | Where | Who |
| --- | --- | --- |
| Account section | Settings, at the top | everyone, when accounts are on (see "Visibility" below) |
| Sign In | Account → Sign In; Profile and Backup → Sign In | signed out |
| Sign Up | Sign In → "New Here? Create an Account" (only while sign-up is open) | signed out |
| Forgot Password | Sign In → "Forgot Password?" | signed out |
| Reset Password | the emailed link (`/account/reset`) | anyone holding the link |
| Profile | Account → Profile: email, screen name, Change Password, Sign Out, backup | signed in |
| Console, Users | `/admin`; Settings → Admin Console | admin |
| Console, Review | `/admin/review`; Settings → Review | reviewer, admin |
| Console, Contribute | `/admin/contribute`; Settings → Contribute | contributor, admin |

The console is its own small page at `/admin`, loaded without a course. A signed-out visitor is told to sign in from Settings. A learner is told the console is for staff. A reviewer or contributor who opens another section is sent to their own.

The Users section has:
- a list with search by email or screen name, most recently active first;
- details for each user: email, screen name, role, account on or off, created, last active, progress per course and recent sessions;
- actions: Send Password Reset, Turn Account Off or On, and Role.

Turned-off accounts can't sign in.

**Visibility.** In mock mode, the Account section and console links show only while Developer is on, since the mock is for Dan's testing. With Supabase they show to everyone.

## Progress and accounts

- **First sign-in:** this device's progress for the open course goes into the account, and a toast says "Progress Saved to Your Account".
- **A device with no progress** (a new phone, say): the account's copy comes onto the device, and the app reloads into it.
- **Both have progress:** the one with more lessons wins. This is a decision for Dan; see the open questions.
- **Each language moves the first time it's opened while signed in.**
- **After each finished lesson:** a session row is added, and the account's copy is saved again a moment later, so a run of lessons saves once.
- **Signing out** keeps everything on the device. The toast says "Signed Out. Progress Stays on This Device".

## Flags and files

- `VITE_AUTH`, fixed at build time: `mock` (the default), `supabase` or `off`. The adapter not chosen is left out of the bundle; with mock, the Supabase library isn't shipped.
- `VITE_SIGNUP=open` opens public sign-up on Supabase. Without it, the Sign Up screen says sign-up isn't open yet. Keep the Supabase dashboard switch (setup step 2) off as well.
- **Code:**
  - src/lib/auth/config.js: modes, roles, who reaches what, and shared checks.
  - src/lib/auth/index.js: `getAuth`, `useAuth`, progress sync and `saveSoon`.
  - src/lib/auth/mock.js and src/lib/auth/supabase.js: the two adapters, with the same interface.
  - src/screens/Account.jsx and src/screens/Profile.jsx: the learner screens.
  - src/admin/AdminApp.jsx: the console.
  - server/admin-user.mjs and functions/api/admin-user.js: turning accounts off and on, using the service role.
- **Tests:**
  - test/accounts.test.js covers the mock's flows and rules.
  - The mobile smoke test signs in as the mock admin, opens the user list, opens a user, and signs out.

## Database

Paste all of this into Supabase's SQL editor (setup step 4). Tested on November 11, 2026 in PGlite (Postgres 16) with stand-ins for Supabase's auth schema. In that run:

- A learner sees and edits only their own profile, and can't make themselves admin.
- A learner can't write another user's progress.
- An admin reads everything and changes roles, but can't demote themselves.
- The placeholder tables give nothing to a learner.
- Making yourself admin from the SQL editor (step 7) works.

It hasn't run on Supabase itself yet.

```sql
-- Tamago accounts, layer 1 (_source/accounts-spec.md)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  screen_name text not null default '',
  role text not null default 'learner' check (role in ('learner', 'contributor', 'reviewer', 'admin')),
  disabled boolean not null default false,
  created_at timestamptz not null default now(),
  last_active_at timestamptz
);
create table public.progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  course text not null check (course in ('fr', 'es', 'de')),
  snapshot jsonb not null,
  summary jsonb not null default '{}',
  saved_at timestamptz not null default now(),
  primary key (user_id, course)
);
create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course text not null,
  kind text not null default 'lesson',
  unit_id text, unit_title text, round int, score int, size int, passed boolean,
  started_at timestamptz,
  finished_at timestamptz not null default now()
);
create index sessions_by_user on public.sessions (user_id, finished_at desc);
-- Placeholders for a later layer: no policies yet, so only the service role can use them.
create table public.comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  target text not null, body text not null,
  created_at timestamptz not null default now()
);
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  reviewer_id uuid references auth.users(id) on delete set null,
  target text not null, verdict text, notes text,
  created_at timestamptz not null default now()
);

-- Is the caller an admin? (security definer, so policies can ask without recursion)
create function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
$$;

-- Every new account gets a profile, with the screen name from sign-up.
create function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, screen_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'screen_name', ''));
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- Role, account state and email change only by an admin; no self-demotion. Direct database access (the SQL editor,
-- the server's service role) has no signed-in user and passes; an API caller with no user can't reach a row anyway.
create function public.guard_profile() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null or coalesce(auth.jwt()->>'role', '') = 'service_role' then return new; end if;
  if not public.is_admin() and (new.role is distinct from old.role or new.disabled is distinct from old.disabled or new.email is distinct from old.email) then
    raise exception 'Only an admin can change role, account state or email';
  end if;
  if new.id = auth.uid() and old.role = 'admin' and new.role <> 'admin' then
    raise exception 'An admin cannot remove their own admin role';
  end if;
  return new;
end $$;
create trigger guard_profile before update on public.profiles for each row execute function public.guard_profile();

alter table public.profiles enable row level security;
alter table public.progress enable row level security;
alter table public.sessions enable row level security;
alter table public.comments enable row level security;
alter table public.reviews enable row level security;

create policy "profiles: own or admin read" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "profiles: own or admin update" on public.profiles for update using (id = auth.uid() or public.is_admin()) with check (id = auth.uid() or public.is_admin());
create policy "progress: own" on public.progress for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "progress: admin read" on public.progress for select using (public.is_admin());
create policy "sessions: own insert" on public.sessions for insert with check (user_id = auth.uid());
create policy "sessions: own or admin read" on public.sessions for select using (user_id = auth.uid() or public.is_admin());
```

## Open questions for Dan

1. **When the device and the account both have progress:** today the one with more lessons wins, silently. Should the learner be asked to choose instead?
2. **Signing out:** today the progress stays on the device. On a shared device, should signing out clear it instead?
3. **"Sessions":** these are learning sessions, one per finished lesson. Sign-in history (when, which device) isn't kept. Is that what the console should show?
4. **Email confirmation:** Supabase asks a new account to confirm its email before the first sign-in. Keep that on?
5. **Size of the account's copy:** each course's copy includes every answer ever given, so it grows with use. Is that fine, or should old answers be trimmed once a summary of them is kept?
6. **The Profile and Backup screen:** it now serves as the account Profile. Should the backup file stay on it once accounts are real, or move to the Developer page?
7. **Opening sign-up:** when, and to whom (invites only, or anyone)?
