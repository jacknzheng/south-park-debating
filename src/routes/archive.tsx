import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { debates } from '../debates'

export const Route = createFileRoute('/archive')({
  head: () => ({ meta: [{ title: 'Past debates — South Park Debating' }] }),
  component: Archive,
})

function Archive() {
  const [query, setQuery] = useState('')
  const past = debates.filter(debate => debate.status === 'past')
  const results = past.filter(debate => [debate.title, debate.dateLabel, debate.category, ...(debate.judges ?? []), ...(debate.winners ?? []), ...(debate.participants ?? [])].join(' ').toLowerCase().includes(query.trim().toLowerCase()))
  return <main id="main" className="list-page">
    <h1>Past debates</h1>
    <div className="list-count"><p>{past.length} debates</p><label className="search"><span className="sr-only">Search motions or debaters</span><input type="search" placeholder="Search motions or debaters" value={query} onChange={event => setQuery(event.target.value)} /></label></div>
    <div aria-live="polite">
      {results.map(debate => <article className="list-row" id={debate.id} key={debate.id}>
        <p className="list-date">{debate.dateLabel}{debate.format && <span>{debate.format}</span>}</p>
        <div>
          <p className="tag">{debate.category}</p>
          <h2>{debate.title}</h2>
          <p className="list-meta">{debate.winners ? `${debate.result}: ${debate.winners.join(', ')}` : debate.result}{debate.judges && <span>{`${debate.judges.length > 1 ? 'Judges' : 'Judge'}: ${debate.judges.join(', ')}`}</span>}</p>
        </div>
        {debate.image && <img className="cover-image" src={debate.image.startsWith('https://') ? debate.image : import.meta.env.BASE_URL + debate.image} alt="" />}
      </article>)}
      {results.length === 0 && <div className="empty-state"><p>No debates match “{query}”.</p><button onClick={() => setQuery('')}>Clear search</button></div>}
    </div>
  </main>
}
