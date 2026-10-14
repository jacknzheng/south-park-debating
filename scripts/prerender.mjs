import { mkdir, writeFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import server from '../dist/server/server.js'

// Render through Start's actual server handler without opening a listening port.
// The generated HTML retains Start's client scripts and hydration data.
const routes = ['/', '/archive', '/teams', '/topics']
for (const route of routes) {
  const response = await server.fetch(new Request(`http://localhost${route}`))
  if (response.status !== 200) throw new Error(`Prerender failed for ${route}: ${response.status}`)
  const destination = resolve('dist/client', `.${route}`, 'index.html')
  await mkdir(dirname(destination), { recursive: true })
  await writeFile(destination, await response.text())
  console.log(`Prerendered ${route}`)
}
