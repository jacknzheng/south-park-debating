# South Park Debating

A TypeScript / React site built with **TanStack Start**, TanStack Router, and Vite. The design follows the supplied CFR screenshot and debate poster: this week's topic first, then image-led past debates, italic Society headlines, Season Sans body text, square sections, and thin gray dividers.

## Run

Requires Node 22.18 or newer.

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:4173`. The development server supports live updates.

```sh
npm run build
npm run check
npm test
```

The build creates Start’s client and server bundles, then prerenders each route through the real Start server handler. This does not require a listening server. `dist/client/` can be deployed to static hosting that serves directory index files. `npm run preview` runs the production preview locally.

## Pages

- `/`: this week's topic, date and venue up top, then past debates with images.
- `/teams`: this week's preliminary teams and judge.
- `/archive`: past debates as a CFR events-style list (date, category tag, motion, result, image), searchable. Link to one debate with `/archive#<id>`, e.g. `/archive#2026-10-06`.
- `/topics`: links out to the Topics by week page in Notion.

## Update a week

Edit `src/debates.ts`. Add the newest entry first. Dates, teams, results, and the featured current week come from this file. Unknown dates remain explicit, and missing team assignments are never inferred.

## Offline design preview

After building, run `npm run export-preview`. Open `offline-preview/index.html` directly in a browser. This is a portable snapshot exported from TanStack Start’s rendered pages, with local assets and basic navigation. Run the development server to use and test the actual React application.

## Content assumptions

- The current roster is for Tuesday, October 13, 2026, 6:00pm at South Park Commons: genetic engineering and transhumanism.
- Past debates: AI judges and juries (October 6), AI referendums (September 22), AI disclosure (September 15).
- September 15 lists Jack Zheng and Sam Miserendino as recorded participants. Their team assignments were not supplied.
- This week’s Jeffrey Cheng invitation is tentative; Team 4 remains incomplete.

## Assets and hosting

The supplied poster is unchanged in `public/debate-poster.png`; `public/images/ai-judges.jpg` is its photograph cropped out. Each past debate's image is set by the `image` field in `src/debates.ts`. The header logo and `favicon.ico` come from the South Park Commons GitHub avatar (`public/spc-logo.jpg`). Society Book Italic and Season Sans are bundled under `public/fonts/` from the supplied local font files.

`.openai/hosting.json` preserves the existing private Site identity. Publication still requires access to that Site’s source repository; the current shell cannot reach it. No public deployment is claimed.
