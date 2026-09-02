# Handoff — 2026-09-02 (wayfinder session F, ticket 10 in progress)

> ⚠ Agent-generated. Tracked since `e61c1d9` by accident; either `.gitignore` + `git rm --cached` it, or accept it as tracked. `.wayfinder/` is ignored.

## State

- Branch: **`launch/social-previews`** off `main` (`4e40f8f`, PR #1 merged the redesign). **Everything uncommitted**, awaiting Aleksandar's diff review. `pnpm build` clean: 0 errors/0 warnings, 13 pages.
- Ticket **10 social previews & launch**: code half done this session, deploy half in progress (HITL). Hosting is **Cloudflare Workers static assets**, not Pages — ticket 11's decision drifted at project-creation time; same account/zone, functionally equivalent for a static site. Details in the ticket's Progress section.
  - `public/og.png` static 1200×630 card, generator `scripts/og/` (`pnpm og`). `og.svg` deleted.
  - Favicon set: `favicon.svg` redrawn ("A." mark), `favicon.ico`, `apple-touch-icon.png`, `theme-color`; generator `scripts/icons.mjs` (`pnpm icons`).
  - Head: og:image dims/alt, site_name, locale, twitter alt.
  - A11y fixes from Lighthouse: `--faint` → `#7a8578`, header wordmark `aria-label` removed. Lighthouse 100/100/100/100 on home, work/linetracker, contact.
  - New devDeps: `playwright-core`, `sharp` (pinned `^0.34.5` to match Astro).
- Ticket **12 testimonials & logos**: closed won't-do (Aleksandar's call). Map: Out of scope.

## Next actions

1. Aleksandar: review + commit this branch, PR to `main`.
2. **Cloudflare Workers (HITL)** — the Git-connected project Aleksandar created is a *Worker* (static assets), not Pages; first deploy failed because wrangler auto-ran `astro add cloudflare` (SSR) with no config in the repo. Fix: committed `wrangler.jsonc` (`assets.directory: ./dist`, no `main`). Dry-run verified locally (41 assets, no script). Project settings → Build:
   - Build command `pnpm build`, deploy command `npx wrangler deploy`, root `/`. Non-production branches: `npx wrangler versions upload` (or leave blank).
   - Build variable: `SITE_URL=https://aleksandar-novakovic.dev`. Build image picks pnpm 10 from `packageManager`; lockfile is v9.
   - Custom domains: Settings → Domains & Routes → add `aleksandar-novakovic.dev` and `www.aleksandar-novakovic.dev` (DNS records created on the existing zone).
   - Redirect `www` → apex: zone → Rules → Redirect Rules → single redirect, hostname `www.aleksandar-novakovic.dev`, 301 to `https://aleksandar-novakovic.dev${uri}`. Workers static assets `_redirects` cannot match hosts.
   - `public/_headers` is honored by Workers static assets as-is. No 404 page exists (`src/pages/404.astro`) — assets return a bare 404; add one post-launch if wanted.
   - Optional: Web Analytics → add site, paste the beacon snippet into `BaseLayout.astro` `<head>` (settles the analytics fog item).
3. After first deploy: validate `https://aleksandar-novakovic.dev/` on opengraph.xyz + LinkedIn Post Inspector, check `/og.png`, `/favicon.ico`, `/sitemap-index.xml`, `/robots.txt` resolve. Then close ticket 10 and update the map.

## Open questions

- Analytics: Cloudflare Web Analytics or none? Still in the map's fog.
- Should `HANDOFF.md` stay tracked?

## Gotchas

- `pnpm add` in this repo needs `-w` (workspace root) because of `pnpm-workspace.yaml`. Installed pnpm resolves to 10.0.0 via `packageManager` now.
- `pnpm og` needs Google Chrome at the default Windows path (playwright-core `channel: "chrome"`); no browser download. Both generators are one-offs — rerun only when the card/mark changes; the PNGs are committed.
- Full-page Playwright screenshots show sections below the fold empty — scroll reveals never fire without scrolling. Not a bug.
- Claude-in-Chrome blocked for localhost by org policy → Playwright (`playwright-core` + system Chrome headless) against `pnpm preview --host 127.0.0.1`. Lighthouse via `npx lighthouse@latest` works the same way.
- Astro logs transient "Duplicate id" glob-loader warnings on first content sync after edits — second sync is clean.
- AskUserQuestion "Other" free-text doesn't capture typed values — collect free text in plain chat.
- `src/data/services.ts` and `src/data/experience.ts` are unimported (pre-existing). README "Content TODOs" section is stale (email/LinkedIn/GitHub/domain all done).
- With `<ClientRouter />`, any new scroll-triggered JS must hook `astro:page-load`.
- Aleksandar edits files directly between sessions — always read current file state before editing.
