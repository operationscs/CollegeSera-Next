# CollegeSera Next.js rebuild – shared conventions (READ FIRST)

Source (READ-ONLY reference, never modify): `d:\CollegeSera-Vite-Original\COLLEGESERA-main\`
Target: `d:\CollegeSera-Next\` (Next.js 16.4.6 App Router, React 19.3, TS strict, Tailwind **3.4** + daisyUI config kept, shadcn/Radix ui).
`AGENTS.md` warns Next 16 differs from training data: check `node_modules/next/dist/docs/01-app/` before using any API
(e.g. `params`/`searchParams` are **Promises** → `await`; `middleware` is now `src/proxy.ts`; `LayoutProps<'/'>`/`PageProps<'/route'>` helpers exist; `cacheComponents` is **false** here).

## Hard rules
- Do NOT run `npm install` / `next build` / `next dev` (shared dir, parallel agents). If you need a package, message the coordinator. Type-check with `npx.cmd tsc --noEmit -p . 2>&1 | Select-String "<your paths>"` and ignore errors in files you don't own.
- Only create/edit files you own (listed in your brief). Shared files already exist – import, don't rewrite. If a shared file needs a change, message the coordinator.
- Use PowerShell. `npm`→`npm.cmd`, `npx`→`npx.cmd`.
- No react-router, no react-helmet, no `import.meta.env`, no `@/lib/supabaseClient`. Use `next/link`, `next/navigation`, `next/image` (plain `<img>` OK where original used it for remote URLs – keep visual output identical).
- Keep ORIGINAL UI pixel-identical: copy JSX + Tailwind classes verbatim; only change the plumbing (routing, data fetching, metadata, client/server split).
- Server Components by default. Add `"use client"` only where needed (state, effects, events, browser APIs, Radix interactive wrappers). Initial data → fetch in the Server Component (call `@/services/*` directly; never fetch your own Route Handler from a Server Component). Replace `useQuery`/`useEffect` initial fetching with server fetching and pass props to small client islands.
- Do not blindly delete useful hooks: interactive filters, search overlay, modals etc. stay client components.
- No mock data. Real Supabase tables/RPCs exactly as the original.
- Public ISR: `export const revalidate = 300;` (adjust sensibly) on public pages. Admin/auth are dynamic.
- Pages that depend on `searchParams` are dynamic automatically – that is fine for filter pages, but still put heavy data fetching behind the `@/services` layer.
- Invalid URLs must return real 404 via `notFound()`.
- Metadata: use `generateMetadata` + `buildSeoMetadata()` from `@/lib/seo/metadata` (port of SEO.tsx incl. sitemap_entries overrides, canonical, OG/Twitter, noindex when query params). JSON-LD via `<JsonLd data=.../>` from `@/components/shared/JsonLd`.
- Env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `NEXT_PUBLIC_SITE_URL`. Constants in `@/lib/site`.

## Existing foundation (already written)
- `src/lib/supabase/client.ts` → `supabase`, `getSupabaseClient(token?)`, `createClerkSupabaseClient(token)` (isomorphic, anon key).
- `src/lib/utils.ts` → `cn`. `src/lib/site.ts`, `src/lib/seo/metadata.ts` (server-only), `src/components/shared/JsonLd.tsx`, `src/components/shared/FloatingContact.tsx`.
- `src/services/*.ts` – ported originals (collegeService, articleService, programService, userService, crmService, advertisementService, analyticsService, collegeDirectoryService). Owners may modify their own (see briefs).
- `src/types/*`, `src/utils/*` (collegeSearch, collegeUrl, security, securityUtils, prediction algos…), `src/data/*`, `src/hooks/{use-mobile,use-toast,useSession}`, `src/components/ui/*` (only the shadcn components the app actually uses; "use client" already added where needed).
- `src/app/layout.tsx` (fonts, GA, Organization JSON-LD, Toaster/Tooltip providers, FloatingContact), `src/app/globals.css`, `src/proxy.ts` (Clerk gate for /secure-portal + /auth only).
- `utils/securityUtils.ts` uses `dompurify` (browser only). For server rendering use `sanitize-html` (installed) – owner of articles/college detail should add a server-safe sanitizer in `src/lib/security/sanitize.ts`-style module if needed.

## Layout contract
- `src/app/(public)/layout.tsx` (owned by agent "shell") renders: `<BookingProvider><Header/>{children}<Footer/></BookingProvider>`.
  Pages inside `(public)` MUST NOT render Header/Footer themselves. Pages that originally opened the booking modal via `onBookingClick` use `useBooking()` from `@/components/shared/BookingProvider` (`{ openBooking(): void }`).
- `(admin)` group → `src/app/(admin)/secure-portal/layout.tsx` (ClerkProvider + QueryClientProvider + admin chrome). `(authentication)` group → `/auth` with ClerkProvider. Public pages do not use Clerk.

## Folder map
```
src/app/(public)/...        routes (thin: fetch + metadata + compose)
src/features/<domain>/      domain components (components/, client islands, helpers)
src/components/{layout,navigation,shared,ui}/   reusable presentation
src/services/               data access (supabase)  src/lib/ infra  src/utils/ pure helpers
```
Original → new component home: Header/Footer/Mobile nav/search → `components/layout`, `components/navigation`, `features/search`; home sections → `features/home`; college cards/filters/SEO content → `features/colleges`; detail tables → `features/colleges/details`; admin pages → `features/admin`.

## Route map (all must exist; original used React Router)
| Original | Next |
|---|---|
| `/` | `(public)/page.tsx` |
| `/colleges` | `(public)/colleges/page.tsx` |
| `/colleges/location/:location`, `/colleges/state/:state`, `/colleges/:type`, `/colleges/:p1/:p2`, `/colleges/:category/:section/:slug` (and `:p1/:p2/:courseSlug`) | `(public)/colleges/[[...segments]]/page.tsx` (one optional catch-all handling ALL of those; reuse the original `parseCollegeUrlFilters` logic with param names mapped from segments) |
| `/:category/:subSlug`, `/:seoSlug` (SEO landing pages rendered by Colleges.tsx; everything else → NotFound) | `(public)/[...seo]/page.tsx` fallback catch-all **with a strict whitelist/validation** so unknown URLs call `notFound()` (HTTP 404). Specific routes always win over the catch-all. |
| `/college/:slug` + `overview, courses-fees, courses, courses-and-fees, admission(s), placement(s), rankings, ranking, facilities, facility, news-articles, news, news-and-articles` | `(public)/college/[slug]/layout.tsx` + `page.tsx` + `[tab]/page.tsx` (tab aliases map to one canonical component; unknown tab → 404) |
| `/college-directory` | `(public)/college-directory` |
| `/about-us /contact-us /privacy-policy /terms-and-conditions /courses /programs /scholarship` | `(public)/<name>/page.tsx` |
| `/articles`, `/articles/:slug` | `(public)/articles`, `(public)/articles/[slug]` |
| `/exams`, `/exams/:examSlug` | `(public)/exams/[[...examSlug]]` or `exams/page.tsx`+`exams/[examSlug]/page.tsx` |
| `/auth` | `(authentication)/auth/[[...rest]]/page.tsx` |
| `/secure-portal` (+`leads, colleges, colleges/new, colleges/edit/:slug, analytics, seo, settings, articles, articles/new, articles/edit/:id, scholarships`) | `(admin)/secure-portal/...` |
| `/seo-admin` | redirect → `/secure-portal/seo` (already in next.config.ts) |
| `*`, `/404` | `src/app/not-found.tsx` |
| sitemap.xml / robots.txt / llms.txt | `app/sitemap.ts`, `app/robots.ts`, `public/llms*.txt` (agent "seo") |

## Report back
When done send the coordinator a SHORT message: files created, deviations, anything unverified or blocked. Do not claim verification you didn't run.
