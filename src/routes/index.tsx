import { createFileRoute, Link } from '@tanstack/react-router'
import { debates } from '../debates'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [current, lastWeek, ...older] = debates
  const imageSrc = (image?: string) => image?.startsWith('https://') ? image : import.meta.env.BASE_URL + image
  return <main id="main" className="front-page">
    <section className="this-week" aria-labelledby="this-week-title">
      <h1 id="this-week-title">Have a say in next week’s debating topics</h1>
      <p className="this-week-meta">{`${current.dateLabel} · ${current.time} · ${current.venue}`}</p>
      <Link className="outline-button" to="/topics">Cast your vote</Link>
    </section>
    <section className="featured" aria-labelledby="featured-title">
      <h2 id="featured-title" className="featured-title">Featured debate topics</h2>
      <div className="featured-grid">
        {/* Each title link stretches over its whole article, so the image is clickable too. */}
        <article className="featured-main">
          <img className="cover-image" src={imageSrc(lastWeek.image)} alt="" />
          <div className="featured-main-heading">
            <h3><Link to="/archive" hash={lastWeek.id}>{lastWeek.title}</Link></h3>
          </div>
          <dl className="featured-result">
            <dt>{lastWeek.result}</dt><dd>{lastWeek.winners?.join(', ')}</dd>
            <dt>{lastWeek.judges!.length > 1 ? 'Judges' : 'Judge'}</dt><dd>{lastWeek.judges!.join(', ')}</dd>
          </dl>
        </article>
        <ul className="featured-list">
          {older.slice(0, 4).map(debate => <li key={debate.id}>
            <article className="featured-item">
              <div>
                <h3><Link to="/archive" hash={debate.id}>{debate.title}</Link></h3>
                <p className="featured-category">{debate.winners ? `${debate.result}: ${debate.winners.join(', ')}` : debate.result}</p>
              </div>
              <img className="cover-image" src={imageSrc(debate.image)} alt="" />
            </article>
          </li>)}
        </ul>
      </div>
    </section>
  </main>
}
