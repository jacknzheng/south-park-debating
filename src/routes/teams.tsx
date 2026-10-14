import { createFileRoute } from '@tanstack/react-router'
import { debates } from '../debates'

export const Route = createFileRoute('/teams')({
  head: () => ({ meta: [{ title: 'Teams — South Park Debating' }] }),
  component: Teams,
})

function Teams() {
  const debate = debates[0]
  const teams = debate.teams ?? []
  return <main id="main" className="list-page">
    <h1>Teams</h1>
    <p className="list-intro">{debate.title}<span>{new Date(`${debate.date}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' })}</span></p>
    <div className="list-count"><p>{teams.length} teams</p>{debate.judges && <p className="list-meta">{debate.judges.length > 1 ? 'Judges' : 'Judge'}: {debate.judges.join(', ')}{debate.judgeTentative && ' (tentative)'}</p>}</div>
    {teams.map(team => <article className="list-row team-row" key={team.name}>
      <p className="list-date">{team.name}</p>
      <div>
        {team.open && <p className="tag">Places open</p>}
        <h2>{team.members.join(', ')}</h2>
      </div>
    </article>)}
    {teams.length === 0 && <div className="empty-state"><p>Teams haven’t been picked yet. Check back before Tuesday.</p></div>}
  </main>
}
