## Quick context for AI coding agents

This is a Next.js (app router) portfolio project located under `src/`.
Key folders:
- `src/app/` — Next 16 app routes and pages (root layout at `src/app/layout.jsx`, home at `src/app/page.jsx`).
- `src/components/` — React components. Shared UI primitives live in `src/components/ui/`. Portfolio-specific UI lives in `src/components/portfolio/`.
- `src/models/` — Mongoose models (e.g. `user.model.js`).
- `src/api/` and `src/app/api/` — server endpoints for auth/portfolio features.
- `src/lib/`, `src/utils/` — small helpers (e.g. `cn`, mailer, token helpers).
- `src/db/` — DB and Redis connection helpers (`config.js`).

Why this structure matters
- App-router Next 16: server/client components distinction applies. Files under `src/app` are route-level. Keep server-only code (DB access, secrets) in API routes or server components.
- Aliased imports: `@/` maps to `./src/*` (see `jsconfig.json`). Use that when adding imports.

Important integration points (examples)
- Database: `src/db/config.js` uses `mongoose` and an optional Upstash Redis client. Env vars come from `src/imports/import.js`.
  - Env names: `DATABASE_URL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`.
- Auth model: `src/models/user.model.js` — user schema fields include `verifytoken`, `forgotpasswordtoken`, `isverified`, `isAdmin`.
- Email flows: `src/utils/mailer.js` uses `nodemailer` + `@react-email/render` with templates in `src/template/`.
  - Env names: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SENDER_EMAIL`, `TOKEN_SECRET`, `DOMAIN_URL` (used when composing links).
- Tokens: JWTs are created/verified in `src/utils/tokendata.js` and elsewhere; some token flows also use bcrypt-hashed tokens stored on the user document.

Dev / build / lint commands
- Start dev server: `npm run dev` (package.json: `next dev`).
- Build: `npm run build` → `next build`.
- Start production: `npm run start` → `next start`.
- Lint: `npm run lint` (eslint). Use the repo's ESLint config files.

Project-specific conventions
- Keep secrets and runtime-only code out of client components. Any file that imports `process.env` or `mongoose` should be server-only (API route or server component).
- Use `@/` alias for imports. Example: `import Auth from "@/models/user.model";` (used throughout).
- UI primitives live in `src/components/ui/` (shadcn-style components). When adding a new component, follow the existing folder/component naming and export patterns.
- Portfolio content is composed in `src/components/portfolio/PortfolioContent.jsx` (main page composition). Prefer editing/adding pieces there for layout-level changes.

When adding endpoints
- Put HTTP handlers in `src/app/api/...` (Next app-router API routes) or `src/pages/api/...` if following pages router—this project uses `src/app/api/`.
- Use `src/db/config.js` helpers to ensure DB/Redis are connected. Call `connectionDb()` at server startup in API handlers or in a server component before DB access.

Files to inspect for concrete examples
- `src/db/config.js` — DB + Redis connection patterns (retry/backoff, optional Redis if env missing).
- `src/imports/import.js` — canonical env var names and `.env` loading.
- `src/utils/mailer.js` — how verification/reset emails are composed and sent.
- `src/models/user.model.js` — auth fields and model naming.
- `src/components/ui/` — component primitives and class merging helper `src/lib/utils.js` (`cn` wrapper around `clsx` + `tailwind-merge`).

Notes for code generation and edits
- Prefer server components for code that touches models / secrets. Avoid sending secret values to client bundles.
- Reuse existing UI primitives (`src/components/ui/*`) instead of creating ad-hoc elements for consistency.
- Keep token expiry and hashing patterns consistent with existing code (bcrypt for verify tokens, JWT for reset tokens).
- There are no test folders or test runner configured—do not assume a test framework.

If you need more context
- Start by opening `src/app/page.jsx` and `src/components/portfolio/PortfolioContent.jsx` to see how pages are composed.
- Look at `jsconfig.json` to keep import aliases consistent.

If anything in this doc is unclear or you want more examples (e.g., a sample API patch), tell me which area to expand and I'll update this file.

----
Generated/updated by repo assistant on inspection of codebase.
