import { cp, mkdir, readFile, writeFile } from 'node:fs/promises'

// Export the actual prerendered Start HTML for review where servers are blocked.
// This is a design snapshot; the source application uses React and Start routing.
const routes = ['/', '/archive', '/leaderboard', '/teams', '/topics', '/rules']
const filename = route => route === '/' ? 'index.html' : `${route.slice(1)}.html`
await mkdir('offline-preview', { recursive: true })
await cp('public', 'offline-preview/assets', { recursive: true })
const interactions = `<script>
document.querySelector('.search input')?.addEventListener('input', event => {
  const query = event.target.value.toLowerCase().trim();
  const rows = [...document.querySelectorAll('.list-row')];
  for (const row of rows) row.hidden = !row.textContent.toLowerCase().includes(query);
  let empty = document.querySelector('.preview-empty');
  if (!empty) { empty = document.createElement('p'); empty.className = 'preview-empty'; empty.textContent = 'No matching debates. Try another name or motion.'; document.querySelector('.archive-list').append(empty); }
  empty.hidden = rows.some(row => !row.hidden);
});
</script>`
for (const route of routes) {
  let html = (await readFile(`dist/client${route === '/' ? '' : route}/index.html`, 'utf8')).replaceAll('"/south-park-debating/', '"/')
  const cssPath = html.match(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/)?.[1]
  if (!cssPath) throw new Error(`Missing stylesheet for ${route}`)
  const css = (await readFile(`dist/client${cssPath}`, 'utf8')).replaceAll('/south-park-debating/fonts/', 'assets/fonts/') + '[hidden]{display:none!important}.preview-empty{padding:35px 0;color:#74726f}'
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<link\b[^>]*rel="(?:stylesheet|modulepreload|preload)"[^>]*>/gi, '')
    .replace(/(?:href|src)="(\/[^"#]*)"/g, (attribute, path) => attribute.replace(path, routes.includes(path) ? filename(path) : `assets${path}`))
    .replace('</head>', `<style>${css}</style></head>`)
    .replace('</body>', `${interactions}</body>`)
  await writeFile(`offline-preview/${filename(route)}`, html)
}
// Keep the previous preview link useful by pointing it at the redesigned export.
await writeFile('preview.html', '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=offline-preview/index.html"><title>South Park Debating</title></head><body><a href="offline-preview/index.html">Open the redesigned website</a></body></html>')
console.log('Exported all TanStack-rendered pages to offline-preview/index.html')
