import { createRootRoute, HeadContent, Link, Outlet, Scripts } from '@tanstack/react-router'
import { Header } from '../components'
import stylesheet from '../style.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'South Park Debating' },
      { name: 'description', content: 'Tuesday night debates at South Park. Browse past motions and results, and meet this week’s debaters.' },
    ],
    links: [
      { rel: 'stylesheet', href: stylesheet },
      { rel: 'icon', href: `${import.meta.env.BASE_URL}favicon.ico`, sizes: 'any' },
      { rel: 'preload', href: `${import.meta.env.BASE_URL}fonts/society-book-italic.otf`, as: 'font', type: 'font/otf', crossOrigin: 'anonymous' },
      { rel: 'preload', href: `${import.meta.env.BASE_URL}fonts/season-sans-regular.woff2`, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
    ],
  }),
  component: Root,
  notFoundComponent: () => <main id="main" className="not-found"><h1>Debate not found</h1><Link to="/archive">Browse past debates</Link></main>,
})

function Root() {
  return <html lang="en"><head><HeadContent /></head><body>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="site-frame"><Header /><Outlet /></div>
    <Scripts />
  </body></html>
}
