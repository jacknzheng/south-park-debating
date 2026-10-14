import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState, type SubmitEvent } from 'react'
import { debates, poll } from '../debates'

export const Route = createFileRoute('/topics')({
  head: () => ({ meta: [{ title: 'Topics — South Park Debating' }] }),
  component: Topics,
})

// Votes live in a Supabase table (see README). The publishable key can only add and read votes.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const votedCookie = `voted_${poll.week}`

function Topics() {
  const nextDebate = debates.find(debate => debate.id === poll.week)
  const [choices, setChoices] = useState<string[]>([])
  const [voted, setVoted] = useState(false)
  const [counts, setCounts] = useState<Record<string, number> | null>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle')

  // Cookies only exist in the browser, so check after the page loads.
  useEffect(() => { setVoted(document.cookie.split('; ').some(c => c.startsWith(`${votedCookie}=`))) }, [])

  useEffect(() => {
    if (!voted || !supabaseUrl) return
    fetch(`${supabaseUrl}/rest/v1/topic_votes?select=topic&week=eq.${poll.week}`, { headers: { apikey: supabaseKey } })
      .then(response => response.json())
      .then((rows: { topic: string }[]) => setCounts(Object.fromEntries(poll.topics.map(topic => [topic, rows.filter(row => row.topic === topic).length]))))
      .catch(() => setStatus('error'))
  }, [voted])

  async function vote(event: SubmitEvent) {
    event.preventDefault()
    setStatus('sending')
    const response = await fetch(`${supabaseUrl}/rest/v1/topic_votes`, {
      method: 'POST',
      headers: { apikey: supabaseKey, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify(choices.map(topic => ({ week: poll.week, topic }))),
    }).catch(() => null)
    if (!response?.ok) return setStatus('error')
    document.cookie = `${votedCookie}=1; max-age=${60 * 60 * 24 * 60}; path=${import.meta.env.BASE_URL}; SameSite=Lax`
    setStatus('idle')
    setVoted(true)
  }

  const total = counts ? Object.values(counts).reduce((sum, n) => sum + n, 0) : 0
  const top = counts ? Math.max(...Object.values(counts)) : 0

  return <main id="main" className="list-page">
    <h1>Topics</h1>
    <p className="list-intro">Vote on next week’s topic<span>{nextDebate?.dateLabel}</span></p>
    <div className="list-count"><p>{poll.topics.length} topics</p><p className="list-meta">{voted ? `${total} votes so far` : 'Pick up to two. Results show after you vote.'}</p></div>

    {!voted && <form className="poll" onSubmit={vote}>
      {poll.topics.map(topic => <label className="poll-option" key={topic}>
        <input type="checkbox" name="topic" value={topic} checked={choices.includes(topic)} disabled={choices.length === 2 && !choices.includes(topic)} onChange={() => setChoices(choices.includes(topic) ? choices.filter(c => c !== topic) : [...choices, topic])} />
        <span>{topic}</span>
      </label>)}
      <button className="pill-button" disabled={choices.length === 0 || status === 'sending' || !supabaseUrl}>{status === 'sending' ? 'Sending…' : 'Vote'}</button>
      {!supabaseUrl && <p className="list-meta">Voting opens soon.</p>}
      {status === 'error' && <p className="list-meta" role="alert">Your vote didn’t go through. Please try again.</p>}
    </form>}

    {voted && !counts && <p className="empty-state">{status === 'error' ? 'Couldn’t load the results. Refresh to try again.' : 'Loading results…'}</p>}
    {counts && <ol className="poll">
      {[...poll.topics].sort((a, b) => counts[b] - counts[a]).map(topic => <li className="poll-result" key={topic}>
        <p>{topic}{counts[topic] === top && top > 0 && <span className="tag">Leading</span>}</p>
        <div className="poll-bar"><span style={{ width: `${total ? (counts[topic] / total) * 100 : 0}%` }} /></div>
        <p className="list-meta">{`${counts[topic]} ${counts[topic] === 1 ? 'vote' : 'votes'}`}</p>
      </li>)}
    </ol>}

    <p className="topics-reading">Motions and reading for each week’s debate are kept in Notion. <a className="underlined-link" href="https://app.notion.com/p/jacknzheng/Topics-by-week-3e4e66b3353280f7a12de8125a3a40a1?source=copy_link" target="_blank" rel="noopener noreferrer">Topics by week <span aria-hidden="true">↗</span></a></p>
  </main>
}
