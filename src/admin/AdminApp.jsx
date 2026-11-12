import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../lib/auth/index.js'
import { ROLES, can } from '../lib/auth/config.js'
import { LogoInline } from '../screens/Logo.jsx'

// The console (accounts layer 1, Dan, 2026-11-11; _source/accounts-spec.md), its own small app at /admin, loaded
// without the course. Sections by role: Users (admins: invites, since sign-up is invite only; list with search,
// details, password reset, turn off or on, role, recent sign-ins and sessions), Review (reviewers and admins) and Contribute (contributors and admins), both placeholders
// until their work is built. Everyone else is told it's for staff, with a way back to Tamago.
const SECTIONS = [
  { path: '/admin', label: 'Users', allowed: can.users },
  { path: '/admin/review', label: 'Review', allowed: can.review },
  { path: '/admin/contribute', label: 'Contribute', allowed: can.contribute },
]
const COURSE_NAMES = { fr: 'French', es: 'Spanish', de: 'German' }
const when = (iso) => (iso ? new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : 'Never')
const ROLE_NAMES = { learner: 'Learner', contributor: 'Contributor', reviewer: 'Reviewer', admin: 'Admin' }

function Shell({ user, auth, children, path }) {
  return (
    <div className="min-h-dvh bg-bg text-ink">
      <header className="sticky top-0 z-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-b-2 border-line bg-bg px-4 py-3">
        <a href="/" className="flex items-center gap-2 font-semibold" aria-label="Back to Tamago"><LogoInline className="h-7 w-auto" /></a>
        <span className="text-sm text-muted">Console{auth?.mode === 'mock' ? ' · Mock Accounts' : ''}</span>
        {user && <nav className="flex gap-1" aria-label="Console sections">
          {SECTIONS.filter((s) => s.allowed(user)).map((s) => (
            <a key={s.path} href={s.path} aria-current={s.path === path ? 'page' : undefined}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${s.path === path ? 'bg-ink text-bg' : 'hover:bg-surface'}`}>{s.label}</a>
          ))}
        </nav>}
        {user && <span className="ml-auto flex items-center gap-3 text-sm">{user.screen_name} · {ROLE_NAMES[user.role]}
          <button onClick={async () => { await auth.signOut(); location.href = '/' }} className="underline">Sign Out</button></span>}
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  )
}

function Placeholder({ title, children }) {
  return (
    <section className="flex flex-col gap-3">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="max-w-prose text-muted">{children}</p>
      <p className="max-w-prose rounded-xl border-2 border-dashed border-line p-4 text-sm text-muted">A placeholder: nothing to do here yet.</p>
    </section>
  )
}

function Users({ auth, me }) {
  const [q, setQ] = useState('')
  const [list, setList] = useState(null)
  const [picked, setPicked] = useState(null)
  const [error, setError] = useState('')
  const load = (query = q) => auth.admin.listUsers({ q: query }).then(setList).catch((e) => setError(e.message))
  useEffect(() => { const t = setTimeout(() => load(q), 150); return () => clearTimeout(t) }, [q])
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <section className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold">Users</h1>
        <Invites auth={auth} onChanged={() => load()} />
        <input type="search" aria-label="Search Users" placeholder="Search by Email or Screen Name" value={q} onChange={(e) => setQ(e.target.value)}
          className="min-h-11 rounded-xl border-2 border-field bg-surface px-3 text-base" />
        {error && <p role="alert" className="text-sm text-wrong">{error}</p>}
        {list && <p className="text-sm text-muted" role="status">{list.length} {list.length === 1 ? 'User' : 'Users'}</p>}
        <ul className="flex flex-col gap-1" data-user-list>
          {(list ?? []).map((u) => (
            <li key={u.id}>
              <button onClick={() => setPicked(u.id)} aria-pressed={picked === u.id}
                className={`flex w-full items-center justify-between gap-3 rounded-xl border-2 px-3 py-2 text-left ${picked === u.id ? 'border-ink' : 'border-line'} ${u.disabled ? 'border-dashed' : ''}`}>
                <span className="min-w-0">
                  <span className="block truncate font-medium">{u.screen_name}</span>
                  <span className="block truncate text-sm text-muted">{u.email}</span>
                </span>
                <span className="shrink-0 text-right text-xs text-muted">{ROLE_NAMES[u.role]}{u.disabled ? ' · Off' : ''}<br />{when(u.last_active_at)}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
      {picked ? <UserDetails key={picked} auth={auth} me={me} id={picked} onChanged={() => load()} /> : <p className="text-muted lg:pt-12">Pick a user to see details.</p>}
    </div>
  )
}

// Invites (Dan, 2026-11-11): sign-up is invite only. An admin enters an email (and a role); Supabase emails the link,
// the mock shows it. Pending invites are listed and can be withdrawn. Off on the real service until Dan approves.
function Invites({ auth, onChanged }) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('learner')
  const [list, setList] = useState([])
  const [note, setNote] = useState({ kind: '', text: '', link: null })
  const load = () => auth.admin.listInvites().then(setList).catch(() => {})
  useEffect(() => { load() }, [])
  const create = async (e) => {
    e.preventDefault()
    try { const inv = await auth.admin.createInvite({ email, role }); setEmail(''); setNote({ kind: 'ok', text: `Invite made for ${inv.email}.`, link: inv.link }); load(); onChanged() } catch (err) { setNote({ kind: 'error', text: err.message, link: null }) }
  }
  const pending = list.filter((x) => !x.accepted_at)
  return (
    <section className="flex flex-col gap-3 rounded-xl border-2 border-line p-4" aria-labelledby="invites-heading" data-invites>
      <h2 id="invites-heading" className="text-lg font-semibold">Invites</h2>
      {!auth.invitesOpen ? <p className="text-sm text-muted">Sign-up is by invite only, and invites are off until Dan approves them.</p> : (
        <form onSubmit={create} className="flex flex-wrap items-end gap-2">
          <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm"><span className="font-medium">Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="min-h-11 rounded-xl border-2 border-field bg-surface px-3 text-base" /></label>
          <label className="flex flex-col gap-1 text-sm"><span className="font-medium">Role</span>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="min-h-11 rounded-xl border-2 border-field bg-surface px-3 text-base">
              {ROLES.map((r) => <option key={r} value={r}>{ROLE_NAMES[r]}</option>)}
            </select></label>
          <button type="submit" className="btn-secondary">Create Invite</button>
        </form>
      )}
      {note.text && <p role={note.kind === 'error' ? 'alert' : 'status'} className={`text-sm ${note.kind === 'error' ? 'text-wrong' : ''}`}>{note.text}
        {note.link && <> Mock email link: <a className="underline break-all" href={note.link}>{note.link}</a></>}</p>}
      {pending.length > 0 && <ul className="flex flex-col gap-1 text-sm">
        {pending.map((x) => (
          <li key={x.code} className="flex items-center justify-between gap-2">
            <span className="min-w-0 truncate">{x.email} · {ROLE_NAMES[x.role] ?? 'Learner'} · sent {when(x.created_at)}</span>
            <button onClick={async () => { await auth.admin.withdrawInvite(x.code); load() }} className="shrink-0 underline">Withdraw</button>
          </li>
        ))}
      </ul>}
    </section>
  )
}

function UserDetails({ auth, me, id, onChanged }) {
  const [u, setU] = useState(null)
  const [sessions, setSessions] = useState([])
  const [signIns, setSignIns] = useState([])
  const [note, setNote] = useState({ kind: '', text: '', link: null })
  const heading = useRef(null)
  const load = async () => { setU(await auth.admin.getUser(id)); setSessions(await auth.admin.sessions(id)); setSignIns(await auth.admin.signIns(id)) }
  useEffect(() => { load().then(() => heading.current?.focus()).catch((e) => setNote({ kind: 'error', text: e.message })) }, [id])
  const act = async (fn, ok) => {
    try { const r = await fn(); setNote({ kind: 'ok', text: ok, link: r?.link ?? null }); await load(); onChanged() } catch (e) { setNote({ kind: 'error', text: e.message, link: null }) }
  }
  if (!u) return <p className="text-muted">Loading…</p>
  const self = u.id === me.id
  return (
    <section className="flex flex-col gap-5" aria-labelledby="user-heading" data-user-details>
      <div>
        <h2 id="user-heading" ref={heading} tabIndex={-1} className="text-xl font-semibold focus:outline-none">{u.screen_name}</h2>
        <p className="text-muted">{u.email}</p>
      </div>
      <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
        <dt className="text-muted">Role</dt><dd>{ROLE_NAMES[u.role]}</dd>
        <dt className="text-muted">Account</dt><dd>{u.disabled ? 'Off' : 'On'}</dd>
        <dt className="text-muted">Created</dt><dd>{when(u.created_at)}</dd>
        <dt className="text-muted">Last Active</dt><dd>{when(u.last_active_at)}</dd>
      </dl>
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Progress</h3>
        {u.progress.length ? (
          <table className="w-full text-sm">
            <thead><tr className="text-left text-muted"><th className="font-medium">Course</th><th className="font-medium">Lessons</th><th className="font-medium">Circles</th><th className="font-medium">Words</th><th className="font-medium">Saved</th></tr></thead>
            <tbody>{u.progress.map((p) => <tr key={p.course}><td>{COURSE_NAMES[p.course] ?? p.course}</td><td>{p.lessons_done ?? 0}</td><td>{p.circles_started ?? 0}</td><td>{p.words_met ?? 0}</td><td>{when(p.updated_at)}</td></tr>)}</tbody>
          </table>
        ) : <p className="text-sm text-muted">No progress saved to the account yet.</p>}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Actions</h3>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => act(() => auth.admin.sendPasswordReset(u.id), 'Password reset sent.')} className="btn-secondary">Send Password Reset</button>
          <button disabled={self} onClick={() => act(() => auth.admin.setDisabled(u.id, !u.disabled), u.disabled ? 'Account turned on.' : 'Account turned off.')} className="btn-secondary">{u.disabled ? 'Turn Account On' : 'Turn Account Off'}</button>
          <label className="flex items-center gap-2 text-sm"><span className="font-medium">Role</span>
            <select value={u.role} disabled={self} onChange={(e) => act(() => auth.admin.setRole(u.id, e.target.value), 'Role changed.')} aria-label="Role"
              className="min-h-11 rounded-xl border-2 border-field bg-surface px-3 text-base">
              {ROLES.map((r) => <option key={r} value={r}>{ROLE_NAMES[r]}</option>)}
            </select>
          </label>
        </div>
        {self && <p className="text-sm text-muted">Your own account can’t be turned off or lose its admin role here.</p>}
        {note.text && <p role={note.kind === 'error' ? 'alert' : 'status'} className={`text-sm ${note.kind === 'error' ? 'text-wrong' : ''}`}>{note.text}
          {note.link && auth.mode === 'mock' && <> Mock email link: <a className="underline" href={note.link}>{note.link}</a></>}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Recent Sign-Ins</h3>
        {signIns.length ? (
          <table className="w-full text-sm" data-sign-ins>
            <thead><tr className="text-left text-muted"><th className="font-medium">When</th><th className="font-medium">Device</th></tr></thead>
            <tbody>{signIns.map((x) => <tr key={x.id}><td>{when(x.at)}</td><td>{x.device}</td></tr>)}</tbody>
          </table>
        ) : <p className="text-sm text-muted">No sign-ins yet.</p>}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Recent Sessions</h3>
        {sessions.length ? (
          <table className="w-full text-sm" data-sessions>
            <thead><tr className="text-left text-muted"><th className="font-medium">Finished</th><th className="font-medium">Course</th><th className="font-medium">Circle</th><th className="font-medium">Round</th><th className="font-medium">Score</th></tr></thead>
            <tbody>{sessions.map((s) => <tr key={s.id}><td>{when(s.finished_at)}</td><td>{COURSE_NAMES[s.course] ?? s.course}</td><td>{s.unit_title ?? s.kind}</td><td>{s.round ?? ''}</td><td>{s.score} of {s.size}{s.passed ? '' : ' (repeat)'}</td></tr>)}</tbody>
          </table>
        ) : <p className="text-sm text-muted">No sessions yet.</p>}
      </div>
    </section>
  )
}

export default function AdminApp() {
  const { ready, user, auth } = useAuth()
  const path = location.pathname.replace(/\/+$/, '') || '/admin'
  useEffect(() => { document.title = `${SECTIONS.find((s) => s.path === path)?.label ?? 'Console'} · Tamago Console` }, [path])
  if (!ready) return <Shell path={path}><p className="text-muted">Loading…</p></Shell>
  if (!auth) return <Shell path={path}><p>Accounts are off in this build.</p></Shell>
  if (!user) return <Shell auth={auth} path={path}><p>Sign in from Tamago’s Settings first, then come back here.</p><a href="/" className="btn-secondary mt-4 inline-block">Back to Tamago</a></Shell>
  const section = SECTIONS.find((s) => s.path === path) ?? SECTIONS[0]
  if (!can.console(user) || !section.allowed(user)) {
    const other = SECTIONS.find((s) => s.allowed(user))
    return <Shell user={user} auth={auth} path={path}><p>{other ? `This area isn’t part of your role. ` : 'The console is for staff accounts.'}</p>
      {other ? <a href={other.path} className="btn-secondary mt-4 inline-block">Go to {other.label}</a> : <a href="/" className="btn-secondary mt-4 inline-block">Back to Tamago</a>}</Shell>
  }
  return (
    <Shell user={user} auth={auth} path={path}>
      {section.label === 'Users' && <Users auth={auth} me={user} />}
      {section.label === 'Review' && <Placeholder title="Review">Where reviewers will check flagged answers and contributed sentences. Comments and review queues come in a later layer.</Placeholder>}
      {section.label === 'Contribute' && <Placeholder title="Contribute">Where contributors will suggest sentences, translations and fixes. Comments and review queues come in a later layer.</Placeholder>}
    </Shell>
  )
}
