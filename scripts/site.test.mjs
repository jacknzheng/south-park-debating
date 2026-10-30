import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import { debates, poll } from '../src/debates.ts'
import { getLeaderboard } from '../src/leaderboard.ts'
import server from '../dist/server/server.js'

const htmlFor = async path => {
  const response = await server.fetch(new Request(`http://localhost/south-park-debating${path}`))
  assert.equal(response.status, 200, path)
  return response.text()
}

test('home leads with the vote, then five featured debates with images', async () => {
  const html = await htmlFor('/')
  assert.match(html, /class="this-week"/)
  assert.match(html, /Have a say in next week’s debating topics/)
  assert.match(html, /href="\/south-park-debating\/topics" class="outline-button"/)
  assert.match(html, /Tuesday, November 3 · 6:00pm · South Park Commons/)
  assert.match(html, /Featured debate topics/)
  assert.match(html, /THP a US-led world order to a multipolar world\./)
  assert.match(html, /undisclosed persuasion/)
  assert.match(html, /Judge<\/dt><dd>Karina Qian/)
  assert.match(html, /Affirmative won<\/dt><dd>Laura Bocek, Akshit Tyagi, Ryan Tsang/)
  assert.match(html, /Affirmative won: Aaquib Syed, Karina Qian, Allan Fang/)
  assert.equal((html.match(/class="cover-image"/g) || []).length, 5)
  assert.match(html, /src="\/south-park-debating\/spc-logo.jpg"/)
  assert.match(html, /href="\/south-park-debating\/leaderboard"/)
  assert.match(html, /href="\/south-park-debating\/archive#2026-10-20"/)
  assert.ok(html.includes('src="https://www.economist.com/content-assets/images/20251025_CND001.jpg"'))
  assert.match(html, /type="module"/)
  assert.doesNotMatch(html, /Big questions|Better conversations|dna-art|invitation|#\/weeks/)
})

test('leaderboard totals individual wins and repeats places for ties', async () => {
  const expected = [
    { name: 'Aaquib Syed', wins: 2, place: 1 },
    { name: 'Allan Fang', wins: 2, place: 1 },
    { name: 'Sam Miserendino', wins: 2, place: 1 },
    { name: 'Akshit Tyagi', wins: 1, place: 4 },
    { name: 'Albert Su', wins: 1, place: 4 },
    { name: 'Jack Zheng', wins: 1, place: 4 },
    { name: 'Jeremy Ornstein', wins: 1, place: 4 },
    { name: 'Karina Qian', wins: 1, place: 4 },
    { name: 'Laura Bocek', wins: 1, place: 4 },
    { name: 'Ryan Tsang', wins: 1, place: 4 },
    { name: 'Seth Morton', wins: 1, place: 4 },
  ]
  assert.deepEqual(getLeaderboard(debates), expected)
  for (const route of ['/leaderboard', '/teams']) {
    const html = await htmlFor(route)
    assert.match(html, /<h1>Leaderboard<\/h1>/)
    const rows = [...html.matchAll(/<tr><td>(\d+)\.<\/td><th scope="row">([^<]+)<\/th><td>(\d+)<\/td><\/tr>/g)]
      .map(([, place, name, wins]) => ({ name, wins: Number(wins), place: Number(place) }))
    assert.deepEqual(rows, expected)
  }
})

test('only recorded past wins count, once per person per week', () => {
  const week = debates[1]
  assert.deepEqual(getLeaderboard([
    { ...week, winners: ['Alex', 'Alex', 'Blair'] },
    { ...week, id: 'another-week', winners: ['Blair'] },
    { ...week, status: 'upcoming', winners: ['Alex', 'Casey'] },
    { ...week, winners: undefined, participants: ['Casey'] },
  ]), [
    { name: 'Blair', wins: 2, place: 1 },
    { name: 'Alex', wins: 1, place: 2 },
  ])
  assert.deepEqual(getLeaderboard([]), [])
})

test('past debates page lists all five with dates, results and images', async () => {
  const html = await htmlFor('/archive')
  assert.equal((html.match(/class="list-row"/g) || []).length, 5)
  for (const id of ['2026-10-20', '2026-10-13', '2026-10-06', '2026-09-22', '2026-09-15']) assert.match(html, new RegExp(`id="${id}"`))
  assert.ok(html.includes('THP a US-led world order to a multipolar world.'))
  assert.ok(html.includes('Affirmative won: Laura Bocek, Akshit Tyagi, Ryan Tsang'))
  assert.ok(html.includes('Judge: Karina Qian'))
  assert.ok(html.includes('src="https://www.economist.com/content-assets/images/20251025_CND001.jpg"'))
  for (const text of ['Opposition won', 'Seth Morton', 'Karina Qian', 'Judges: Sam Miserendino, Laura Bocek, Jack Zheng', 'September 22, 2026']) assert.ok(html.includes(text), text)
  assert.equal((html.match(/class="cover-image"/g) || []).length, 5)
  assert.match(html, /type="search"/)
})

test('topics page shows the poll and links to the Notion topics list', async () => {
  const html = await htmlFor('/topics')
  for (const topic of poll.topics) assert.ok(html.includes(topic.replace('&', '&amp;')), topic)
  assert.equal((html.match(/type="checkbox"/g) || []).length, poll.topics.length)
  assert.match(html, /Tuesday, November 3/)
  assert.match(html, /href="https:\/\/app\.notion\.com\/p\/jacknzheng\/Topics-by-week-/)
  assert.match(html, /target="_blank"/)
})

test('unknown page returns a real 404 with a recovery link', async () => {
  const response = await server.fetch(new Request('http://localhost/south-park-debating/does-not-exist'))
  assert.equal(response.status, 404)
  assert.match(await response.text(), /Browse past debates/)
})

test('every prerendered page uses the GitHub Pages base path and its files exist', async () => {
  for (const route of ['/', '/archive', '/leaderboard', '/teams', '/topics', '/rules']) {
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

// /poster.png is a permanent link used elsewhere; a failing test blocks the deploy so the last good poster stays live.
test('poster supports standard or double resolution and fallback keeps standard size', async () => {
  for (const file of ['poster.png', 'poster-fallback.png']) {
    const png = await readFile(`dist/client/${file}`)
    assert.equal(png.subarray(1, 4).toString(), 'PNG', `${file} is not a PNG`)
    const dimensions = [png.readUInt32BE(16), png.readUInt32BE(20)]
    const allowed = file === 'poster.png' ? [[1364, 1634], [2728, 3268]] : [[1364, 1634]]
    assert.ok(allowed.some(([width, height]) => dimensions[0] === width && dimensions[1] === height), `${file} has unsupported dimensions: ${dimensions.join('x')}`)
  }
})
