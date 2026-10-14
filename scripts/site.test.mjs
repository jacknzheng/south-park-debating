import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import { debates, poll } from '../src/debates.ts'
import server from '../dist/server/server.js'

const htmlFor = async path => {
  const response = await server.fetch(new Request(`http://localhost/south-park-debating${path}`))
  assert.equal(response.status, 200, path)
  return response.text()
}

test('home leads with this week, then past debates with images', async () => {
  const html = await htmlFor('/')
  assert.match(html, /class="this-week"/)
  assert.match(html, /Vote on next week’s topic/)
  assert.match(html, /href="\/south-park-debating\/topics"/)
  assert.match(html, /Tuesday, October 20 · 6:00pm · South Park Commons/)
  assert.match(html, /class="editorial-grid"/)
  assert.match(html, /undisclosed persuasion/)
  assert.match(html, /Judges<\/dt>/)
  assert.equal((html.match(/class="cover-image"/g) || []).length, 4)
  assert.match(html, /src="\/south-park-debating\/spc-logo.jpg"/)
  assert.match(html, /href="\/south-park-debating\/teams"/)
  assert.match(html, /href="\/south-park-debating\/archive#2026-10-13"/)
  assert.match(html, /type="module"/)
  assert.doesNotMatch(html, /Big questions|Better conversations|dna-art|invitation|#\/weeks/)
})

test('teams page shows next week\'s debate and says teams are not picked yet', async () => {
  const html = await htmlFor('/teams')
  assert.match(html, /October 20/)
  assert.match(html, /Topic up for vote/)
  assert.match(html, /Teams haven’t been picked yet/)
})

test('past debates page lists all four with dates, results and images', async () => {
  const html = await htmlFor('/archive')
  assert.equal((html.match(/class="list-row"/g) || []).length, 4)
  for (const id of ['2026-10-13', '2026-10-06', '2026-09-22', '2026-09-15']) assert.match(html, new RegExp(`id="${id}"`))
  for (const text of ['Opposition won', 'Seth Morton', 'Karina Qian', 'Judges: Sam Miserendino, Laura Bocek, Jack Zheng', 'September 22, 2026', '3v3']) assert.ok(html.includes(text), text)
  assert.equal((html.match(/class="cover-image"/g) || []).length, 4)
  assert.match(html, /type="search"/)
})

test('topics page shows the poll and links to the Notion topics list', async () => {
  const html = await htmlFor('/topics')
  for (const topic of poll.topics) assert.ok(html.includes(topic.replace('&', '&amp;')), topic)
  assert.equal((html.match(/type="radio"/g) || []).length, 6)
  assert.match(html, /Tuesday, October 20/)
  assert.match(html, /href="https:\/\/app\.notion\.com\/p\/jacknzheng\/Topics-by-week-/)
  assert.match(html, /target="_blank"/)
})

test('unknown page returns a real 404 with a recovery link', async () => {
  const response = await server.fetch(new Request('http://localhost/south-park-debating/does-not-exist'))
  assert.equal(response.status, 404)
  assert.match(await response.text(), /Browse past debates/)
})

test('every prerendered page uses the GitHub Pages base path and its files exist', async () => {
  for (const route of ['/', '/archive', '/teams', '/topics']) {
    const html = await readFile(`dist/client${route === '/' ? '' : route}/index.html`, 'utf8')
    assert.match(html, /id="main"/)
    for (const [, url] of html.matchAll(/(?:src|href)="(\/[^"#?]*)/g)) {
      assert.ok(url.startsWith('/south-park-debating/'), `${route}: ${url} is missing the base path`)
      const file = url.slice('/south-park-debating'.length)
      if (/\.\w+$/.test(file)) assert.ok((await stat(`dist/client${file}`)).isFile(), url)
    }
  }
  assert.ok((await stat('dist/client/404.html')).isFile())
})
