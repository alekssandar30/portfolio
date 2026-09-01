# Aleksandar Novakovic Portfolio

Static-first personal portfolio for Aleksandar Novakovic, full-stack software engineer and independent B2B contractor through mBIT Solutions.

## Architecture

- Astro owns routing, content and static rendering.
- TypeScript is strict.
- React is intentionally not installed yet; add it only when an interactive island is introduced.
- Tailwind CSS defines the visual system.
- Astro Content Collections model projects and notes.
- Cloudflare Pages is the intended initial hosting target.

Three.js is intentionally not implemented in the first pass. The brief requires an excellent static version before adding any WebGL enhancement.

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

## Cloudflare Pages

Build command:

```bash
pnpm build
```

Output directory:

```text
dist
```

Set `SITE_URL` to the final production domain before deployment.

## Content TODOs Before Publication

- Replace professional email placeholder.
- Add current LinkedIn URL.
- Add current GitHub URL.
- Confirm project publication boundaries for LineTracker, NCT, eHZZO and Swap.fm.
- Document safe details for Transkop, MAL.AI and Finrelay before publishing descriptions.
- Confirm final portfolio domain.
