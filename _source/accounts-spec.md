# Tamago accounts, layer 1

Dan's brief, November 11, 2026: accounts and an admin console, with stubs for later roles. Dan's decisions came the same night (see "Decisions"). Layer 1 runs on a mock account service on the device. The real service, Supabase Auth with row-level security, plugs in later with no screen changes. Sign-up is by invite only, and invites stay off until Dan approves them. No external account has been made and no money spent.

## Supabase setup (for Dan)

Free tier throughout. Each step happens in a dashboard, so Claude can't do it for you.

1. **Make the project.** At supabase.com, sign in and choose **New project**. Use these settings:
   - **Name:** tamago.
   - **Region:** the one nearest you, for example US East.
   - **Database password:** a long generated one, saved in your password manager. Tamago never needs it.
   - **Plan:** Free.
2. **Turn on email sign-in, with public sign-up off.**
   - **Authentication → Sign In / Providers → Email:** turn **Email** on and keep **Confirm email** on (Dan: it stays on).
   - **Authentication → Sign In / Providers → User Signups:** turn **Allow new users to sign up** off, and leave it off for good. Sign-up is by invite only, and invites still work with this off.
3. **Set where reset links point.** Under **Authentication → URL Configuration**:
   - **Site URL:** `https://tamago-83f.pages.dev`
   - **Redirect URLs:** add `https://tamago-83f.pages.dev/account/reset`, `https://tamago-83f.pages.dev/account/invite`, `http://localhost:5180/account/reset` and `http://localhost:5180/account/invite`.
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

   Leave `VITE_INVITES` and `TAMAGO_INVITES` unset for now. When Dan approves sign-up, set both to `open` and redeploy; then the console's Create Invite works.

   The `VITE_` values are read when the site is built, so the next deploy picks them up. Ask Claude to push, or choose **Retry deployment** on the latest deploy. The server function reads the two `TAMAGO_SUPABASE_` values at request time.
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

- **sign_ins**: one row per sign-in, with the time and the device type (iPhone, iPad, Mac, Windows PC, Android Phone and so on, worked out from the browser; nothing more specific).
  - A user adds their own rows. Admins read every row.
- **invites**: one row per invite, with the email, role, who sent it, and when it was sent, accepted or withdrawn.
  - Only the server function (service role) creates or withdraws them. Admins read them, and the invitee marks their own as accepted.

The mock keeps the same shapes in an IndexedDB database on the device (`tamago-accounts-mock`). The signed-in account is held in localStorage (`tamago-auth-session`), and passwords are stored as SHA-256 hashes.

## Screens and how each role reaches them

The app works exactly as before with no account. Signing in is optional and never sits on the tree.

| Screen | Where | Who |
| --- | --- | --- |
| Account section | Settings, at the top | everyone, when accounts are on (see "Visibility" below) |
| Sign In | Account → Sign In; Profile and Backup → Sign In | signed out |
| Create Your Account | the invite link (`/account/invite`): screen name and password; the email is the invited one | someone holding an invite |
| Forgot Password | Sign In → "Forgot Password?" | signed out |
| Reset Password | the emailed link (`/account/reset`) | anyone holding the link |
| Profile | Account → Profile: email, screen name, Change Password, Sign Out | signed in |
| Which Progress to Keep? | after signing in, or opening a course, when this device and the account both have progress | signed in |
| Backup file | the Developer page (moved from Profile, Dan) | anyone with Developer on |
| Console, Users | `/admin`; Settings → Admin Console | admin |
| Console, Review | `/admin/review`; Settings → Review | reviewer, admin |
| Console, Contribute | `/admin/contribute`; Settings → Contribute | contributor, admin |

The console is its own small page at `/admin`, loaded without a course. A signed-out visitor is told to sign in from Settings. A learner is told the console is for staff. A reviewer or contributor who opens another section is sent to their own.

The Users section has:
- Invites: an email and a role, then Create Invite. Supabase emails the link; the mock shows it. Pending invites are listed and can be withdrawn. Off on the real service until Dan approves.
- a list with search by email or screen name, most recently active first;
- details for each user: email, screen name, role, account on or off, created, last active, progress per course, recent sign-ins (time and device type) and recent sessions (finished lessons);
- actions: Send Password Reset, Turn Account Off or On, and Role.

Turned-off accounts can't sign in.

**Visibility.** In mock mode, the Account section and console links show only while Developer is on, since the mock is for Dan's testing. With Supabase they show to everyone.

## Progress and accounts

- **The account has nothing yet:** this device's progress for the open course goes into the account, and a toast says "Progress Saved to Your Account".
- **The device has nothing** (a new phone, say): the account's copy comes onto the device, and the app reloads into it.
- **Both have progress** (Dan's decision): the learner is asked "Which Progress to Keep?", with both counts ("This device: 12 lessons · Account: 8 lessons", plus circles, words and the last lesson), and picks one. The pick replaces the other side; nothing is merged.
- **No needless asking:** each device remembers its last sync with each account (in localStorage). If only the device moved on since then, its copy goes up; if only the account did (lessons on another device), its copy comes down; only when both moved on is the learner asked. The rule is src/lib/auth/sync-rule.js, with tests.
- **Each language moves the first time it's opened while signed in.**
- **After each finished lesson:** a session row is added, and the account's copy is saved again a moment later, so a run of lessons saves once.
- **Signing out** keeps everything on the device. The toast says "Signed Out. Progress Stays on This Device".

## Flags and files

- `VITE_AUTH`, fixed at build time: `mock` (the default), `supabase` or `off`. The adapter not chosen is left out of the bundle; with mock, the Supabase library isn't shipped.
- There is no public sign-up, on any setting. `VITE_INVITES=open` (build) and `TAMAGO_INVITES=open` (server) turn invites on with Supabase, once Dan approves; until then Create Invite says invites are off. The mock has invites on, on the device only.
- **Code:**
  - src/lib/auth/config.js: modes, roles, who reaches what, device types, and shared checks.
  - src/lib/auth/index.js: `getAuth`, `useAuth`, progress sync, `settleSync` and `saveSoon`; src/lib/auth/sync-rule.js: when to upload, download or ask.
  - src/lib/auth/mock-demo.js: the mock's demo accounts, a marked test fixture (see "Security").
  - src/screens/ProgressChoice.jsx: Which Progress to Keep?; src/screens/Backup.jsx: the backup file, on the Developer page.
  - src/lib/auth/mock.js and src/lib/auth/supabase.js: the two adapters, with the same interface.
  - src/screens/Account.jsx and src/screens/Profile.jsx: the learner screens.
  - src/admin/AdminApp.jsx: the console.
  - server/admin-user.mjs and functions/api/admin-user.js: turning accounts off and on, and sending and withdrawing invites, using the service role.
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
  last_active_at timestamptz,
  -- The mock's demo accounts (@tamago.test) can never exist here: no profile, so no account.
  constraint no_demo_accounts check (email not ilike '%@tamago.test')
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
create table public.sign_ins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  at timestamptz not null default now(),
  device text not null default 'Other'
);
create index sign_ins_by_user on public.sign_ins (user_id, at desc);
create table public.invites (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  role text not null default 'learner' check (role in ('learner', 'contributor', 'reviewer', 'admin')),
  invited_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  accepted_at timestamptz,
  revoked_at timestamptz
);
create unique index invites_one_open_per_email on public.invites (lower(email)) where accepted_at is null and revoked_at is null;
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

-- Every new account gets a profile: the screen name from its metadata, the role from its invite (else learner).
create function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, screen_name, role)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'screen_name', ''),
    coalesce((select role from public.invites where lower(email) = lower(new.email) and revoked_at is null order by created_at desc limit 1), 'learner'));
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
alter table public.sign_ins enable row level security;
alter table public.invites enable row level security;
alter table public.comments enable row level security;
alter table public.reviews enable row level security;

create policy "profiles: own or admin read" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "profiles: own or admin update" on public.profiles for update using (id = auth.uid() or public.is_admin()) with check (id = auth.uid() or public.is_admin());
create policy "progress: own" on public.progress for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "progress: admin read" on public.progress for select using (public.is_admin());
create policy "sessions: own insert" on public.sessions for insert with check (user_id = auth.uid());
create policy "sessions: own or admin read" on public.sessions for select using (user_id = auth.uid() or public.is_admin());
create policy "sign_ins: own insert" on public.sign_ins for insert with check (user_id = auth.uid());
create policy "sign_ins: own or admin read" on public.sign_ins for select using (user_id = auth.uid() or public.is_admin());
create policy "invites: admin read" on public.invites for select using (public.is_admin());
create policy "invites: invitee accepts own" on public.invites for update using (lower(email) = lower(auth.jwt()->>'email')) with check (lower(email) = lower(auth.jwt()->>'email'));
```

## Decisions (Dan, November 11, 2026)

1. **Device and account both have progress:** ask the learner, showing both ("This device: 12 lessons · Account: 8 lessons"), and let them pick. Done.
2. **Signing out** keeps progress on the device. Done (unchanged).
3. **History:** keep sign-ins (date and device type) as well as finished lessons, and show both in the console. Done.
4. **Email confirmation** stays on. Setup step 2.
5. **The account's copy is not trimmed yet.** Each course's copy holds every answer ever given, so it grows with use. **For later:** once it gets large (a Supabase row comfortably holds a few MB), keep a summary of old answers and drop the answers themselves, or keep only the last few months of them.
6. **The backup file** moved to the Developer page. Done.
7. **Sign-up is invite only.** Admins create invites in the console. Invites stay off on the real service until Dan approves. Done.
8. **Another account's progress on the device is never merged** (November 12). The device remembers which account its progress belongs to: the last one it synced with (`tamago-owner:<course>` in localStorage; older devices fall back to their sync marker). Signing in to a different account asks "Start Fresh or Bring This Device's Progress?", and Start Fresh is the default (first, the main button). Start Fresh clears that course's progress from the device and takes the account's copy; the other account keeps its own. Bring makes the device's progress this account's: saved to the account if it has none, otherwise Which Progress to Keep asks, with both counts. Progress made before any sign-in belongs to no one, so decision 1 applies. Done (DeviceElsewhere.jsx).

## Security

- **The mock's demo password is not a secret.** GitGuardian flagged it (commit 3b04265, "Generic Password"): `src/lib/auth/config.js` line 20 (`MOCK_PASSWORD = '…'`) and `test/mobile-smoke.mjs` lines 258 and 259, which typed the demo email and password into the sign-in form. Both were the mock's shared demo phrase, which opens only the device-only demo accounts. The demo accounts now live in `src/lib/auth/mock-demo.js`, marked as a test fixture, with the phrase put together at runtime; the smoke test and unit tests take it from there, and the tests' made-up passwords are built at runtime too.
- **The mock never runs on the real service.** With `VITE_AUTH=supabase` the build doesn't include the mock or the demo accounts at all (checked: no `tamago.test` in that build). If it were reached anyway, `mock.js` refuses to start in a Supabase build. The demo accounts are made only in the mock's IndexedDB on one device; nothing creates them in Supabase, and the database refuses any `@tamago.test` email (`no_demo_accounts`).
- **Secret scanning before every push:** the pre-push hook runs gitleaks over the history being pushed, next to the smoke test (`npm run secrets`; `.gitleaks.toml` allows only the fake keys in the redaction tests). A scan of all 176 commits on November 11 found no real secret: no Anthropic key, no Supabase URL or key, no tokens, and no `.env` file ever committed.
