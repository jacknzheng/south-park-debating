import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/topics')({
  head: () => ({ meta: [{ title: 'Topics — South Park Debating' }] }),
  component: Topics,
})

function Topics() {
  return <main id="main" className="list-page">
    <h1>Topics</h1>
    <p className="list-intro">Motions and reading for each week’s debate, kept in Notion.</p>
    <a className="pill-button" href="https://app.notion.com/p/jacknzheng/Topics-by-week-3e4e66b3353280f7a12de8125a3a40a1?source=copy_link" target="_blank" rel="noopener noreferrer">Topics by week <span aria-hidden="true">↗</span></a>
  </main>
}
