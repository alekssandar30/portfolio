# Handoff — 2026-09-02 (wayfinder session E, closed)

> ⚠ Not gitignored — do not commit (agent-generated). `.wayfinder/` is ignored; this file is not.

## State

- Branch: `redesign/design-foundation`, **everything uncommitted**, awaiting Aleksandar's diff review. `pnpm build` clean: astro check 0 errors/0 warnings, 13 pages.
- Closed this session: **11 register domain** — `aleksandar-novakovic.dev` bought via Cloudflare Registrar (RDAP 404 → 200 same morning). Hosting decided: **Cloudflare Pages** over Vercel. `.com` not bought. Details in ticket 11's resolution.
- Code this session (small diff on top of session D's rebuild):
  - Domain consolidated: single source `astro.config.ts` (`SITE_URL` env → fallback). `src/lib/site.ts` `url` and `src/pages/robots.txt.ts` now read `import.meta.env.SITE`. Page-level `Astro.site ?? siteConfig.url` fallbacks left untouched.
  - Review decisions applied: row numbers removed from `ProjectRow.astro` (no `index` prop, grid columns tightened) and both callers; `CASE 00X` eyebrow on `work/[slug].astro` reduced to the industry label (`projectIndex` still drives sort order). Portrait stays circular — no square asset coming.
- **12 testimonials & logos closed as won't-do** (2026-09-02, Aleksandar's call): no testimonials, no logos; moved to the map's Out of scope.
- Open in `.wayfinder/`: only **10 social previews & launch** (task, unblocked; deploy step rewritten with the concrete Cloudflare Pages settings).

## Next actions

1. Aleksandar: review + commit the working tree (session D rebuild + this session's small diff).
2. Next wayfinder session: **10 launch** (OG PNG, favicon set, QA, Pages project + custom domain) — the only open ticket.
3. Cloudflare side, not yet done: no DNS records on the new zone; Pages project not created. Both are ticket 10 steps.

## Open questions

- Analytics: enable Cloudflare Web Analytics (cookieless, free) or ship with none? Still in the map's fog.

## Gotchas

- `pnpm dev`/`pnpm build` work natively on Windows; installed pnpm is 11.x despite `packageManager: pnpm@10`; `pnpm-workspace.yaml` must keep `packages: ["."]`. Check which pnpm the Cloudflare Pages build image picks.
- Astro logs transient "Duplicate id" glob-loader warnings on first content sync after edits — second sync is clean.
- Claude-in-Chrome blocked for localhost by org policy → Playwright script (`playwright-core` + system Chrome at `C:\Program Files\Google\Chrome\Application\chrome.exe`, headless; scratchpad `shoot.mjs` pattern against `pnpm preview`).
- AskUserQuestion "Other" free-text doesn't capture typed values — collect free text in plain chat.
- `src/data/services.ts` and `src/data/experience.ts` are unimported (pre-existing) — delete or wire up whenever convenient. README "Content TODOs" section is stale (email/LinkedIn/GitHub done in ticket 02).
- With `<ClientRouter />`, any new scroll-triggered JS must hook `astro:page-load`.
- Aleksandar edits files directly between sessions — always read current file state before editing.
