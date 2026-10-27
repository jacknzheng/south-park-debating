# South Park Debating

A TypeScript / React site built with **TanStack Start**, TanStack Router, and Vite. The design follows the supplied CFR screenshot and debate poster: this week's topic first, then image-led past debates, Adobe Caslon Pro headlines (the CFR education site's serif), Season Sans body text, square sections, and thin gray dividers.

## Run

Requires Node 22.18 or newer.

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:4173/south-park-debating/`. The development server supports live updates.

```sh
npm run build
npm run check
npm test
```

The build creates Start’s client and server bundles, then prerenders each route through the real Start server handler. This does not require a listening server. `dist/client/` can be deployed to static hosting that serves directory index files. `npm run preview` runs the production preview locally.

## Pages

- `/`: a call to vote on next week's topic, with its date and venue, then past debates with images.
- `/leaderboard`: individual wins totaled across past debates, with shared places for ties (1, 2, 2, 4). The old `/teams` address also shows the leaderboard.
- `/archive`: past debates as a CFR events-style list (date, category tag, motion, result, image), searchable. Link to one debate with `/archive#<id>`, e.g. `/archive#2026-10-06`.
- `/topics`: the topic poll for next week, plus a link to the Topics by week page in Notion.
- `/rules`: read the rules for definitions, opposition cases, speaker roles, and points of information.

## Update a week

Edit `src/debates.ts`. Add the newest entry first. Dates, teams, results, and the featured current week come from this file. Unknown dates remain explicit, and missing team assignments are never inferred.

## Topic poll

Topics and the poll's week live in `poll` in `src/debates.ts`. Each visitor picks up to two topics (one row per topic). Votes are stored in Supabase; a cookie (`voted_<week>`) stops a browser voting twice and unlocks the results. For a new poll, change `poll.week` and `poll.topics`.

The site needs two values, in `.env` locally and as GitHub repository **variables** for the deploy:

- `VITE_SUPABASE_URL`: the project URL, e.g. `https://abcd.supabase.co`
- `VITE_SUPABASE_KEY`: the **publishable** (anon) key. Never the secret/service_role key, because this one is visible to every visitor.

Run once in the Supabase SQL editor:

```sql
create table topic_votes (
  id bigint generated always as identity primary key,
  week date not null,
  topic text not null,
  created_at timestamptz not null default now()
);
alter table topic_votes enable row level security;
create policy "anyone can vote" on topic_votes for insert to anon with check (true);
create policy "anyone can see votes" on topic_votes for select to anon using (true);
```

## Offline design preview

After building, run `npm run export-preview`. Open `offline-preview/index.html` directly in a browser. This is a portable snapshot exported from TanStack Start’s rendered pages, with local assets and basic navigation. Run the development server to use and test the actual React application.

## Content assumptions

- Next debate: Tuesday, October 27, 2026, 6:00pm at South Park Commons; topic decided by the poll.
- Past debates: US-led world order (October 20; affirmative win), AI persuasion (October 13), AI judges and juries (October 6), AI referendums (September 22), AI disclosure (September 15).
- The October 20 debate uses the supplied Economist image URL directly.
- September 15 lists Jack Zheng and Sam Miserendino as recorded participants. Their team assignments were not supplied.

## Assets and hosting

The supplied poster is unchanged in `public/debate-poster.png`; `public/images/ai-judges.jpg` is its photograph cropped out. Each past debate's image is set by the `image` field in `src/debates.ts`. The header logo and `favicon.ico` come from the South Park Commons GitHub avatar (`public/spc-logo.jpg`). Season Sans (regular, semibold) is bundled under `public/fonts/` from the supplied local font files. Adobe Caslon Pro (regular, italic) and Season Sans Medium were copied from cfr.org/education; Adobe Caslon Pro is a licensed Adobe font.

This week's poster lives at a permanent link, https://jacknzheng.github.io/south-park-debating/poster.png, which other places embed. To update it, replace `public/poster.png` with a 1364 × 1634 PNG on white (no transparency) and push. If the file is missing or the wrong size, `npm test` fails and the deploy stops, so the last good poster stays live. `public/poster-fallback.png` is a plain white image of the same size: copy it over `poster.png` to blank the link on purpose.

The site is hosted on GitHub Pages at https://jacknzheng.github.io/south-park-debating/. `.github/workflows/deploy.yml` builds, tests and publishes `dist/client` on every push to `main`. Because the site lives under `/south-park-debating/`, `vite.config.ts` sets `base`, and code that references files in `public/` prefixes them with `import.meta.env.BASE_URL`.
