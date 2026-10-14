import { createFileRoute, Link } from '@tanstack/react-router'
import { debates } from '../debates'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [current, lastWeek, ...older] = debates
  return <main id="main" className="front-page">
    <section className="this-week" aria-labelledby="this-week-title">
      <p className="label">This week</p>
      <h1 id="this-week-title"><Link to="/teams">{current.title}</Link></h1>
      <p className="this-week-meta">{`${current.dateLabel} · ${current.time} · ${current.venue}`}</p>
      <Link className="underlined-link" to="/teams">See the teams <span aria-hidden="true">→</span></Link>
    </section>
    <section className="editorial-grid" aria-label="Past debates">
      <article className="featured-debate">
        <Link to="/archive" hash={lastWeek.id} tabIndex={-1} aria-hidden="true"><img className="cover-image" src={import.meta.env.BASE_URL + lastWeek.image} alt="" /></Link>
        <div className="feature-caption">
          <div><p className="label">{`Last week · ${lastWeek.dateLabel}`}</p><h2><Link to="/archive" hash={lastWeek.id}>{lastWeek.title}</Link></h2></div>
          <dl className="feature-result">
            <dt>{lastWeek.result}</dt><dd>{lastWeek.winners?.join(', ')}</dd>
            <dt>{lastWeek.judges!.length > 1 ? 'Judges' : 'Judge'}</dt><dd>{lastWeek.judges!.join(', ')}</dd>
          </dl>
        </div>
      </article>
      <aside className="debate-sidebar" aria-label="Earlier debates">
        {older.map(debate => <article className="sidebar-story" key={debate.id}>
          <Link to="/archive" hash={debate.id} tabIndex={-1} aria-hidden="true"><img className="cover-image" src={import.meta.env.BASE_URL + debate.image} alt="" /></Link>
          <p className="label">{debate.dateLabel}{debate.format ? ` · ${debate.format}` : ''}</p>
          <h3><Link to="/archive" hash={debate.id}>{debate.title}</Link></h3>
          <p className="story-result">{debate.winners ? `${debate.result}: ${debate.winners.join(', ')}` : debate.result}</p>
        </article>)}
      </aside>
    </section>
  </main>
}
