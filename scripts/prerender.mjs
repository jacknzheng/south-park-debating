import { mkdir, writeFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import server from '../dist/server/server.js'

// Render through Start's actual server handler without opening a listening port.
// The generated HTML retains Start's client scripts and hydration data.
// Routes are requested under the GitHub Pages base path (see vite.config.ts) and written without it.
const base = '/south-park-debating'
const routes = ['/', '/archive', '/leaderboard', '/teams', '/topics']
for (const route of routes) {
  const response = await server.fetch(new Request(`http://localhost${base}${route}`))
  if (response.status !== 200) throw new Error(`Prerender failed for ${route}: ${response.status}`)
  const destination = resolve('dist/client', `.${route}`, 'index.html')
  await mkdir(dirname(destination), { recursive: true })
  await writeFile(destination, await response.text())
  console.log(`Prerendered ${route}`)
}
// GitHub Pages serves 404.html for any unknown address.
const missing = await server.fetch(new Request(`http://localhost${base}/404`))
if (missing.status !== 404) throw new Error(`Expected a 404 page, got ${missing.status}`)
await writeFile('dist/client/404.html', await missing.text())
console.log('Prerendered 404.html')
