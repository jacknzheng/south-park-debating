import { Link } from '@tanstack/react-router'

export function Header() {
  return <header className="site-header">
    <Link to="/" className="wordmark">
      <img src={`${import.meta.env.BASE_URL}spc-logo.jpg`} width="280" height="280" alt="South Park Commons" />
      <span>South Park Debating</span>
    </Link>
    <nav aria-label="Main navigation">
      <Link to="/" activeOptions={{ exact: true }}>Home</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      <Link to="/archive">Past debates</Link>
      <Link to="/topics">Topics</Link>
      <Link to="/rules">Rules</Link>
    </nav>
  </header>
}

