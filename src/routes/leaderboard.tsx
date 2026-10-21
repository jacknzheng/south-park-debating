import { createFileRoute } from '@tanstack/react-router'
import { debates } from '../debates'
import { getLeaderboard } from '../leaderboard'

export const Route = createFileRoute('/leaderboard')({
  head: () => ({ meta: [{ title: 'Leaderboard — South Park Debating' }] }),
  component: Leaderboard,
})

export function Leaderboard() {
  const standings = getLeaderboard(debates)
  return <main id="main" className="list-page serif-heading">
    <h1>Leaderboard</h1>
    <p className="list-intro">Individual wins across all weeks.<span>Each recorded weekly win counts once. Tied debaters share the same place.</span></p>
    {standings.length > 0 ? <table className="leaderboard-table">
      <caption className="sr-only">Debaters ranked by total wins across all weeks</caption>
      <thead><tr><th scope="col">Place</th><th scope="col">Debater</th><th scope="col">Wins</th></tr></thead>
      <tbody>{standings.map(person => <tr key={person.name}>
        <td>{`${person.place}.`}</td>
        <th scope="row">{person.name}</th>
        <td>{person.wins}</td>
      </tr>)}</tbody>
    </table> : <div className="empty-state"><p>No wins recorded yet. Check back after the next debate.</p></div>}
  </main>
}
