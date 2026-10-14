import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import { debates } from '../src/debates.ts'
import server from '../dist/server/server.js'

const htmlFor = async path => {
  const response = await server.fetch(new Request(`http://localhost${path}`))
  assert.equal(response.status, 200, path)
  return response.text()
}

test('home leads with this week, then past debates with images', async () => {
  const html = await htmlFor('/')
  assert.match(html, /class="this-week"/)
  assert.match(html, /Genetic engineering &amp; transhumanism/)
  assert.match(html, /Tuesday, October 13 · 6:00pm · South Park Commons/)
  assert.match(html, /class="editorial-grid"/)
  assert.match(html, /Should we replace human judges/)
  assert.equal((html.match(/class="cover-image"/g) || []).length, 3)
  assert.match(html, /src="\/spc-logo.jpg"/)
  assert.match(html, /href="\/teams"/)
  assert.match(html, /href="\/archive#2026-10-06"/)
  assert.match(html, /type="module"/)
  assert.doesNotMatch(html, /Big questions|Better conversations|dna-art|invitation|#\/weeks/)
})

test('teams page shows this week\'s ten debaters, four teams and tentative judge', async () => {
  const html = await htmlFor('/teams')
  assert.match(html, /October 13/)
  for (const team of debates[0].teams) for (const name of team.members) assert.ok(html.includes(name), name)
  assert.equal((html.match(/class="list-row team-row"/g) || []).length, 4)
  assert.match(html, /tentative/)
  assert.match(html, /Places open/)
})

test('past debates page lists all three with dates, results and images', async () => {
  const html = await htmlFor('/archive')
  assert.equal((html.match(/class="list-row"/g) || []).length, 3)
  for (const id of ['2026-10-06', '2026-09-22', '2026-09-15']) assert.match(html, new RegExp(`id="${id}"`))
  for (const text of ['Opposition won', 'Seth Morton', 'Aaquib Syed', 'September 22, 2026', '3v3']) assert.ok(html.includes(text), text)
  assert.equal((html.match(/class="cover-image"/g) || []).length, 3)
  assert.match(html, /type="search"/)
})

test('topics page links to the Notion topics list', async () => {
  const html = await htmlFor('/topics')
  assert.match(html, /href="https:\/\/app\.notion\.com\/p\/jacknzheng\/Topics-by-week-/)
  assert.match(html, /target="_blank"/)
})

test('unknown page returns a real 404 with a recovery link', async () => {
  const response = await server.fetch(new Request('http://localhost/does-not-exist'))
  assert.equal(response.status, 404)
  assert.match(await response.text(), /Browse past debates/)
})

test('every prerendered route and its referenced assets exist', async () => {
  for (const route of ['/', '/archive', '/teams', '/topics']) {
    const html = await readFile(`dist/client${route === '/' ? '' : route}/index.html`, 'utf8')
    assert.match(html, /id="main"/)
    for (const match of html.matchAll(/(?:src|href)="(\/(?:assets|fonts)\/[^"?]+|\/images\/[^"?]+|\/favicon\.ico|\/spc-logo\.jpg)"/g)) assert.ok((await stat(`dist/client${match[1]}`)).isFile(), match[1])
  }
})
