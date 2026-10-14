import { Link } from '@tanstack/react-router'

export function Header() {
  return <header className="site-header">
    <Link to="/" className="wordmark">
      <img src="/spc-logo.jpg" width="280" height="280" alt="South Park Commons" />
      <span>South Park Debating</span>
    </Link>
    <nav aria-label="Main navigation">
      <Link to="/" activeOptions={{ exact: true }}>Home</Link>
      <Link to="/teams">Teams</Link>
      <Link to="/archive">Past debates</Link>
      <Link to="/topics">Topics</Link>
    </nav>
  </header>
}

