import { createFileRoute } from '@tanstack/react-router'
import { Leaderboard } from './leaderboard'

export const Route = createFileRoute('/teams')({
  head: () => ({ meta: [{ title: 'Leaderboard — South Park Debating' }] }),
  component: Leaderboard,
})
