import type { Debate } from './debates'

export function getLeaderboard(debates: Debate[]) {
  const wins = new Map<string, number>()
  for (const debate of debates) {
    if (debate.status !== 'past') continue
    for (const name of new Set(debate.winners ?? [])) {
      wins.set(name, (wins.get(name) ?? 0) + 1)
    }
  }

  const standings = [...wins].map(([name, wins]) => ({ name, wins }))
    .sort((a, b) => b.wins - a.wins || a.name.localeCompare(b.name, 'en'))
  let place = 0
  return standings.map((person, index) => {
    if (index === 0 || person.wins !== standings[index - 1].wins) place = index + 1
    return { ...person, place }
  })
}
