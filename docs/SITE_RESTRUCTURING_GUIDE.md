# CollegeSera site restructuring guide

**Audience:** interns contributing to the site restructuring  
**Project:** `CollegeSera-Next`  
**Timebox:** 6–7 days  
**Design reference:** the approved CollegeSera screens in Google Stitch. Use Stitch as the visual source of truth for the work that has an approved screen; do not invent new page layouts where no design has been approved.
**Audit basis:** repository source/configuration inspected 22 Nov 2026; re-check paths and counts as branches change.

This guide describes the repository as it exists now and a safe way to improve it. Read [AGENTS.md](../AGENTS.md) and [ARCHITECTURE_CONVENTIONS.md](./ARCHITECTURE_CONVENTIONS.md) before changing code; their project-specific rules take precedence over generic examples here.

## 1. Goals and guardrails

- Improve page structure, responsive behavior, accessibility, and performance without changing established routes, SEO behavior, or college data semantics.
- Keep each change small enough to review. Do not rewrite the whole site or move many files just to match a preferred folder naming convention.
- Reuse the current services, types, URL parsing, SEO helpers, and local UI components. Do not add mock college data.
- Preserve visible behavior unless the task specifically asks to change it. Compare the same route at mobile and desktop widths before and after each UI change.
- Treat Google Stitch as a design reference, not as code to paste into the project. Map its approved layouts and tokens onto the existing Tailwind and shadcn-style components.
- Do not change dependencies or enable a new Next.js rendering mode as part of a visual refactor.

## 2. Current technology stack

Based on `package.json`, project configuration, and the application source:

| Area | Current project |
| --- | --- |
| Framework / routing | Next.js `16.4.6`, App Router |
| UI runtime | React and React DOM `19.3.0` |
| Language | TypeScript `5`, strict mode configured |
| Styling | Tailwind CSS `3.4.18`, PostCSS, project CSS utilities |
| Component primitives | Local shadcn-style components in `src/components/ui`, built on Radix UI |
| Class helpers | `clsx`, `tailwind-merge`, `class-variance-authority`; use the existing `cn` helper |
| Icons / animation | `lucide-react`, `framer-motion` |
| Data | Supabase JavaScript client, with data access grouped under `src/services` |
| Forms / validation | React Hook Form and Zod |
| Other client/data utilities | TanStack React Query, `next-themes` |
| Fonts | Inter and Plus Jakarta Sans loaded with `next/font/google` in the root layout |
| Quality tooling | ESLint 9 and the Next.js ESLint configuration |

Important details:

- The project uses **Tailwind 3**, not Tailwind 4. Keep changes compatible with `tailwind.config.ts`.
- “shadcn/ui” here means editable local component source in `src/components/ui`; it is not a separate runtime component library. Compose these components and their Radix primitives instead of adding a second UI kit.
- `tailwind.config.ts` also has a Poppins family entry, but the root layout currently loads Inter and Plus Jakarta Sans. Do not use Poppins expecting it to be loaded.
- The package manifest does not currently list `@clerk/nextjs`. Although authentication-related routes and project notes exist, verify the actual installed/auth integration with the project owner before changing auth dependencies or behavior.
- `docs/README.md` contains legacy Lovable/Vite setup text; use `package.json`, `src/`, and the two project-specific guides linked above to understand this Next.js app.

## 3. Folder and component boundaries

### Existing structure to build on

```text
src/
  app/
    (public)/                 Public route files and shared public layout
    (admin)/                  Admin route files
    (authentication)/         Authentication route files
    layout.tsx                Root HTML, fonts, global providers, metadata
    globals.css               Global tokens, base styles, utilities
  components/
    header-components/        Header navigation, branding, menus, actions
    layout/                   Shared Header.tsx and Footer.tsx
    shared/                   Cross-feature reusable components/providers
    ui/                       Local shadcn-style primitives
  data/                       Static constants and navigation data
  features/
    home/                     Homepage sections
    colleges/                 College listing and shared college UI/data
      details/                College detail tabs and tables
    search/                   College search UI and helpers
    articles/ exams/ ...      Other product domains
  hooks/                      Reusable React hooks
  lib/                        Infrastructure, SEO, Supabase, utilities
  services/                   Supabase/data-access functions
  types/                      Shared data and application types
  utils/                      Pure helpers, URL/search/security logic
```

### Where new work belongs

- **Route, metadata, request parameters:** `src/app/<route>/page.tsx`. Keep route files thin: validate route input, load the required data through a feature/service function, generate metadata, and compose the page.
- **Page-specific UI and domain behavior:** `src/features/<domain>/`. Keep college listing and detail components under `features/colleges`; avoid adding college-specific pieces to global `components/shared`.
- **Shared site chrome:** `src/components/layout/` and the existing `src/components/header-components/`. Keep global Header/Footer behavior here.
- **Reusable accessible primitives:** `src/components/ui/`. Prefer the existing Button, Card, Input, Select, Dialog, Tabs, Table, and other primitives where they fit.
- **Database access:** `src/services/`; database-backed UI must not duplicate Supabase queries in components.
- **SEO, shared infrastructure, and utilities:** `src/lib/` and `src/utils/` respectively. Keep pure transformations out of React components.

Do not reorganize these directories wholesale during the 7-day effort. Put each addition beside its closest existing counterpart and flag larger structural migrations for the project owner. The rule below is to centralize static content and reusable contracts, not to move component rendering logic out of its feature.

## 4. Required static-data and TypeScript rules

### Static data belongs under `src/data`

Move data out of a page/component when it is a stable content/configuration collection, for example:

- Navigation entries, menu labels/routes, category/filter options, tabs and aliases.
- Static cards, city/stream/statistic lists, default catalog examples, repeated search links.
- Lookup tables such as degree aliases, display labels, status choices, and sitemap options.
- Shared SEO/structured-data constants that do not depend on the current request.

Name files by domain, such as `src/data/homepage.ts`, `src/data/college-details.ts`, `src/data/search.ts`, `src/data/admin-navigation.ts`. Import data explicitly; avoid a giant `data.ts` barrel that makes ownership unclear.

Do **not** move these into `src/data`:

- State (`useState` values), filtered/sorted results, values derived from props or the request, or fetched database records.
- JSX trees, callbacks, React state setters, or values that are created to render one component. Keep presentation and event behavior next to the component.
- Per-request metadata/JSON-LD that uses the current slug, college, query, or request URL.

If a collection contains icons, store icon component references and type them as `LucideIcon`; render the icon in the component. Do not store prebuilt React elements in plain data. Keep arrays `as const` when their literal values define a union; otherwise use `satisfies readonly SomeType[]` or an explicit domain type.

Example:

```ts
// src/types/navigation.ts
export type MenuKey = "colleges" | "exams";

export interface NavigationItem {
  label: string;
  href: string;
  key: MenuKey;
}
```

```ts
// src/data/navigation.ts
import type { NavigationItem } from "@/types/navigation";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: "Colleges", href: "/colleges", key: "colleges" },
  { label: "Exams", href: "/exams", key: "exams" },
];
```

```tsx
// Component: presentation only
import { NAVIGATION_ITEMS } from "@/data/navigation";

{NAVIGATION_ITEMS.map((item) => (
  <Link key={item.href} href={item.href}>{item.label}</Link>
))}
```

### Types belong under `src/types`

- Every component/page prop contract that is shared, describes domain data, or is part of the task should be defined in a focused `src/types/<domain>.ts` file and imported with `import type`.
- Keep types cohesive: `types/navigation.ts`, `types/home.ts`, `types/college-details.ts`, `types/admin.ts`; avoid one huge global types file.
- For database entities, use or improve `src/types/database.ts`; do not create a second conflicting College/Article/Course model.
- Avoid `any`. Use the real domain type when known. Use `unknown` at untrusted boundaries, then validate/narrow before use. Do not silence types with `as any` or broad casts.
- Type event handlers, async results, state, callbacks, and mapped data through their source types. Prefer inference when it is already precise; do not add redundant annotations to every local variable.
- A component-only implementation detail can stay local if extracting it would create a circular import or couple unrelated modules. For this project’s refactor, move domain contracts and reusable component props to `src/types` and document any exception in the PR.
- Do not move shadcn/Radix primitive implementation types solely to satisfy a file-count rule. Preserve their current APIs; change them only when the component itself is in scope.

### Header is the reference pattern

The existing header has already been split into `components/layout/Header.tsx` plus focused components in `components/header-components/`. Continue the same separation for other complex sections:

1. Keep route composition/data fetching in a Server Component where possible.
2. Isolate stateful controls into small Client Components.
3. Extract stable lists/maps into `src/data`.
4. Put domain types/props in `src/types`.
5. Keep each component focused on rendering and interaction, not duplicated static configuration.

Before moving any existing data, search for all imports/usages, move it once, update every caller, and preserve ordering, labels, links, IDs, empty behavior, and URLs.

## 5. Header structure and example

The shared header is currently `src/components/layout/Header.tsx`. It is a Client Component because it currently uses menu/search state, router/pathname hooks, a scroll listener, and interactive search hooks. It composes existing pieces including `HeaderBrand`, `DesktopNavigation`, `HeaderDesktopActions`, `HeaderUtilityBar`, `MobileHeaderActions`, and `MobileNavigation`.

The header's conceptual composition is:

```tsx
// src/components/layout/Header.tsx
"use client";

export function Header({ colleges }: HeaderProps) {
  // Keep only state and handlers that are genuinely needed by the header.
  return (
    <header>
      <HeaderUtilityBar />
      <HeaderBrand onNavigate={closeMenus} />
      <DesktopNavigation {...desktopNavigationProps} />
      <HeaderSearch colleges={colleges} />
      <HeaderDesktopActions />
      <MobileNavigation {...mobileNavigationProps} />
    </header>
  );
}
```

This is a **shape example**, not a drop-in replacement: `HeaderSearch` is illustrative and search is currently composed inside `Header.tsx`. Refactor it into a separate file only if it reduces the client-side boundary or makes the code easier to maintain without changing search behavior. A child imported by a `"use client"` file is part of that client module graph.

Header rules:

1. Keep the public layout as the single place that renders the shared Header and Footer. Public pages should not render their own copies.
2. Keep links as `next/link`; use `next/navigation` for route hooks/navigation.
3. Keep mobile and desktop navigation states accessible: keyboard operation, clear button labels, correct focus behavior, and meaningful `aria-*` attributes.
4. Do not pass an unnecessarily large data payload through the header. The public layout currently loads college data for search and exam articles for the Footer. Measure the payload and investigate a narrower search-data strategy before changing this shared data flow.
5. Avoid adding more unrelated behavior to the Header client bundle. Static branding and display-only pieces should not need browser state.
6. Preserve sticky/fixed positioning, header height, breakpoints, theme behavior, search suggestions, and route-closing behavior unless the approved Stitch design explicitly changes them.

## 6. College listing page: recommended pattern

The `/colleges` family is handled by `src/app/(public)/colleges/[[...segments]]/page.tsx`. That route awaits the Next 16 `params` and `searchParams` promises, parses route segments, handles invalid routes with `notFound()`, generates metadata, and composes `features/colleges/CollegesView.tsx`. The listing view loads its data and passes it into the interactive `CollegesClient`.

Use the existing separation:

```text
app/(public)/colleges/[[...segments]]/page.tsx   Route params, metadata, 404
features/colleges/CollegesView.tsx               Server data loading and composition
features/colleges/CollegesClient.tsx             Interactive listing/filter UI
features/colleges/CollegeCard*.tsx               Reusable listing cards
features/colleges/CollegeFilters.tsx             Filter UI
features/colleges/collegeFilterUtils.ts          URL/filter transformations
features/colleges/collegesData.ts                Listing data access/orchestration
services/collegeService.ts                       Supabase access
```

When optimizing this page:

- Keep initial data loading on the server. Keep only the controls that require state or event handlers in Client Components.
- Use `collegeFilterUtils` and the existing URL parsing behavior; do not implement a second, slightly different filter parser.
- Preserve query-string filters, route-segment landing pages, pagination/filter state, canonical URLs, query-param `noindex` behavior, metadata, and JSON-LD.
- Check the data shape and fields needed by cards before narrowing Supabase selects. Verify filters and SEO routes against real records.
- Look for avoidable duplicate reads and overly broad queries. Use `Promise.all` for independent requests, and keep reusable query logic behind `features/colleges/collegesData.ts` or `services/`.
- Do not put an entire large listing into a client state store if the client only needs the visible page and filter options.
- Keep loading, empty, error, and invalid-route states intentional. An empty successful result should not mask a failed database request.
- Use semantic headings and landmarks; cards should use meaningful links and image alt text.

## 7. College detail page: recommended pattern

College detail routes live under `src/app/(public)/college/[slug]/`. The route validates the slug, gets the college data, calls `notFound()` for missing colleges, and supplies the selected view. The tab-specific UI is organized in `src/features/colleges/details/`; data/slug logic is in `collegeDetailData.ts`, with reusable tables and views alongside it.

Recommended responsibility split:

```text
app/(public)/college/[slug]/layout.tsx            Shared college shell/tabs
app/(public)/college/[slug]/page.tsx              Overview route, data validation, metadata
app/(public)/college/[slug]/[tab]/page.tsx        Tab aliases and not-found handling
features/colleges/details/collegeDetailData.ts    College lookup and metadata helpers
features/colleges/details/CollegeTabViews.tsx     Server-renderable detail views
features/colleges/details/*Table.tsx              Reusable detail sections
features/colleges/details/CollegeDetailClient.tsx Small interactive islands only
```

When refactoring detail pages:

- Preserve slug cleanup/legacy redirects, `notFound()`, tab aliases, canonical URLs, and per-tab metadata.
- Render the college name, overview, fee data, admission, placements, rankings, and facilities on the server where possible. Keep modal controls, sticky-tab pathname state, and other browser-dependent interactions in the smallest client island that can own them.
- Avoid duplicating one table or section for each tab if a shared component with typed props can render it.
- Use actual college data; do not introduce placeholder exams, testimonials, fees, rankings, or other claims as “temporary” content.
- Treat rich HTML as untrusted. Follow the project’s server-safe sanitization guidance in `ARCHITECTURE_CONVENTIONS.md`; do not import a browser-only sanitizer into a Server Component.
- Check long tables, mobile overflow, sticky tabs, fixed mobile action bars, empty datasets, and missing optional fields at narrow widths.

## 8. SSR, CSR, ISR, streaming, and PPR

These are related but different decisions:

| Mode | Use it for | Project guidance |
| --- | --- | --- |
| **Server Components / SSR** | Data-backed, SEO-sensitive content and request-specific output. | Default for routes and content. Fetch through the feature/service layer on the server; do not fetch your own Route Handler from a Server Component. |
| **Client Components / CSR interactivity** | State, effects, event handlers, browser APIs, and interactive controls. | Use `"use client"` only at the smallest sensible boundary. Do not convert a whole route to client rendering just to add one filter or modal. |
| **ISR** | Public content that can be served from a refreshed cached result rather than fetched afresh for every request. | Existing public pages commonly use `export const revalidate = 300` (5 minutes). Keep the current freshness behavior unless the owner approves a change. |
| **Dynamic rendering** | User/request-specific pages, such as admin or authenticated views, or a route whose query params intentionally drive database filtering. | Admin/auth are dynamic per project conventions. Reading `searchParams` in a page is request-specific; keep expensive data access behind feature/services. |
| **Streaming with Suspense** | A page has a useful shell while slower, independent server content loads. | Use a real, stable fallback and a boundary around the slow portion. Do not add boundaries only for appearance. |
| **PPR (Partial Prerendering)** | A static shell can be prerendered while request-time/dynamic portions stream separately. | **Not enabled in this project.** `next.config.ts` explicitly sets `cacheComponents: false`. Do not enable PPR/cache components during the restructuring without an owner-approved migration and a full compatibility review. |

For this installed Next.js version, the local Next documentation distinguishes the classic caching model from Cache Components. The project is on the classic model: public ISR uses route-level `revalidate`, while admin/auth pages remain dynamic. In the installed docs, Cache Components are enabled with `cacheComponents: true`, and the current model also asks for an explicit `partialPrefetching` setting. That is a deliberate platform change—not a page-level optimization toggle. If the owner later approves it, first read the matching installed docs under `node_modules/next/dist/docs/01-app/`, then test all routes, cache invalidation, Supabase freshness, and auth behavior.

Rendering decision for a new section:

1. Does it need a browser API, local state, or an event handler? If no, leave it server-rendered.
2. Does its initial content need live/request-specific data? Load it on the server, or use dynamic rendering where appropriate.
3. Is the public content safe to be a few minutes stale? Follow the existing ISR policy and verify invalidation/freshness assumptions.
4. Is only one part slow or dynamic? Consider a Suspense boundary only if there is a useful shell and a meaningful fallback.
5. Does someone propose PPR or `cacheComponents`? Stop and request owner approval; it is not current project configuration.

## 9. Typography and visual system

The canonical role-based classes are registered in `tailwind.config.ts` and documented in [TYPOGRAPHY_GUIDELINES.md](./TYPOGRAPHY_GUIDELINES.md). Use one role class that describes the text’s purpose; retain separate Tailwind classes for layout, color, spacing, border, and responsive arrangement.

| UI role | Utility | Family | Typical desktop size / weight |
| --- | --- | --- | --- |
| Hero title | `typography-hero-heading` | Plus Jakarta Sans | 48–56px / 800 |
| Page H1 | `typography-page-heading` | Plus Jakarta Sans | 36–44px / 700 |
| Section H2 | `typography-section-heading` | Plus Jakarta Sans | 28–32px / 700 |
| Subsection H3 | `typography-subsection-heading` | Plus Jakarta Sans | 22–24px / 650 |
| Card H4 | `typography-card-heading` | Plus Jakarta Sans | 18–20px / 600 |
| Small heading H5 | `typography-small-heading` | Plus Jakarta Sans | 16px / 600 |
| Navigation | `typography-nav-link` | Plus Jakarta Sans | 14px / 600 |
| Dropdown link/title | `typography-dropdown-link`, `typography-dropdown-section-title` | Inter / Plus Jakarta Sans | 14px / 500; 13px / 700 |
| Mega-menu description | `typography-mega-description` | Inter | 13px / 400 |
| Body copy | `typography-description` | Inter | 16px / 400, line-height 1.65 |
| Secondary/small copy | `typography-secondary-description`, `typography-small-description` | Inter | 14px / 400; 13px / 400 |
| Breadcrumb | `typography-breadcrumb` | Inter | 13px / 500 |
| Search text/result | `typography-search-placeholder`, `typography-search-result` | Inter | 14px / 400; 14px / 500 |
| Input label/placeholder | `typography-input-label`, `typography-input-placeholder` | Inter | 13px / 600; 14px / 400 |
| Buttons | `typography-primary-button`, `typography-secondary-button` | Plus Jakarta Sans | 14px / 600; 13px / 600 |
| Badge | `typography-badge` | Inter | 12px / 600 |
| Statistic | `typography-statistic` | Plus Jakarta Sans | 24–36px / 700 |
| Footer heading/link/copy | `typography-footer-heading`, `typography-footer-link`, `typography-footer-description` | Plus Jakarta Sans / Inter | 15px / 700; 13px / 400 |
| Tooltip | `typography-tooltip` | Inter | 12px / 400 |
| Table header/content | `typography-table-header`, `typography-table-content` | Plus Jakarta Sans / Inter | 13px / 600; 14px / 400 |
| Pagination/tab | `typography-pagination`, `typography-tab` | Inter / Plus Jakarta Sans | 13px / 600; 14px / 600 |
| Modal title/copy | `typography-modal-heading`, `typography-modal-description` | Plus Jakarta Sans / Inter | 22px / 700; 14px / 400 |

The role classes use smaller base sizes on narrow screens and scale at the 768px breakpoint. The homepage additionally has `.homepage-typography` defaults in `globals.css`; role classes take precedence for explicitly styled roles. Keep semantic elements meaningful (`h1`–`h6`, `label`, `button`, table elements). Avoid competing `text-*`, `font-*`, or `leading-*` classes on an element already using a typography role unless the exception is intentional and checked at mobile sizes.

Example:

```tsx
<section aria-labelledby="featured-colleges-title">
  <h2 id="featured-colleges-title" className="typography-section-heading">
    Featured colleges
  </h2>
  <p className="typography-description">
    Compare programs, fees, and admissions information.
  </p>
</section>
```

## 10. shadcn-style UI conventions

- Reuse the existing local primitives from `@/components/ui/*`. Check the component API before recreating a button, card, dialog, tabs, select, or table.
- Use `cn` from `@/lib/utils` to merge conditional classes and variants.
- Keep semantic behavior from Radix (keyboard interaction, focus management, labeling). Do not replace a Dialog/Select/Tabs primitive with a styled `div` and custom click handling.
- Add or change a local primitive only when the design requires a reusable behavior; keep the API aligned with existing components and avoid adding new dependencies for styling.
- Feature-specific compositions belong in `features/<domain>`; generic primitives belong in `components/ui`.
- Verify dark mode, keyboard focus, disabled/loading states, and mobile layouts when touching shared primitives.

## 11. Google Stitch handoff

For every page or section with an approved Stitch design:

1. Confirm which frame/state is the current approved design (desktop, tablet, mobile, empty/error states if supplied).
2. Compare the current implementation with the frame before editing. Record visual differences in the task/PR rather than silently redesigning adjacent areas.
3. Translate typography into the existing role classes, colors into current tokens/utilities where possible, and controls into existing local UI primitives.
4. Implement responsive behavior from the supplied frames; where a breakpoint or state is unspecified, preserve current behavior and ask the owner before inventing a major interaction.
5. Validate at the same viewport dimensions as the Stitch frame and check an adjacent narrow/wide size for overflow.
6. Include before/after screenshots in the PR when available. Do not claim a Stitch match if the reference screen was not accessible.

## 12. Seven-day intern execution plan

The inspected tree currently has 39 `src/app/**/*.tsx` files, 44 `src/components/**/*.tsx` files, and 49 `src/features/**/*.tsx` files. Counts are an inventory snapshot, not a target for moving every file. Route pages are grouped into public, admin, and authentication route segments. Feature UI is concentrated in colleges, home, admin, search, and the articles/exams/courses/programs domains.

Audit hotspots found during inspection:

- Header/navigation: keep `Header.tsx` orchestration small; centralize navigation data; type search/college props; avoid putting large college records in navigation.
- Homepage: Hero, Streams, Cities, Stats, Exams, and Popular Courses have stable display lists suitable for `src/data/homepage.ts` and typed home contracts.
- Discovery/catalog pages: search suggestions/pills, exam filters, and course catalog lists are configuration/data, not component-local literals.
- College detail: tabs/aliases, degree classification and labels, and related landing cards should be typed data; fetched college, course, fee, placement, and highlight values remain server/database data and must use domain types.
- Admin: navigation/status/filter options should be typed config; edited records and form values need explicit form/domain types; do not move mutable edit state into `src/data`.
- Other public, auth, and admin pages: preserve route-specific metadata, request params, authorization, error/empty states, and existing data sources. Avoid broad visual rewrites without a Stitch frame.

Work in small PRs by ownership, not one sweeping commit. Keep a route checklist and note which sections have been reviewed.

Keep the plan adaptable to the interns’ assignments; do not start all streams in parallel without an owner confirming file ownership.

| Day | Focus | Deliverable |
| --- | --- | --- |
| 1 | Read project conventions, run the owner-approved baseline, map all route families/components, compare assigned screens to Stitch, identify static data and untyped props. | Route/component inventory, owner-assigned file list, and baseline notes. |
| 2 | Shared layout, header, footer, search and navigation: extract static config, centralize types, check client boundaries. | Small PR with unchanged routes and keyboard/search regression checks. |
| 3 | Homepage sections and remaining public landing sections: extract static lists, type data, align with Stitch and typography. | Homepage-focused PR; verify every section at mobile and desktop. |
| 4 | College listing/directory: typed data, filters, cards, loading/empty/error states, URL and SEO behavior. | Listing-focused PR tested on representative real records and filter URLs. |
| 5 | College detail and other catalog pages: tab data, table/detail props, fees/courses and optional fields. | Detail/catalog PR covering tab aliases, mobile tables, and missing data. |
| 6 | Admin/auth/articles/exams/programs and shared UI audit: prioritize `any`, static options, accessible states; preserve authorization. | Domain PRs plus type/lint checks and route-specific regression notes. |
| 7 | Cross-route regression, fix review feedback, confirm no rendering/config drift, finish handoff. | Ready-to-merge PRs, evidence, and a concise list of remaining work/risks. |

### Page/component audit matrix

Use this matrix as the route-by-route review checklist. It is an inventory of current areas, not permission to change every design:

| Page or component area | Current code location | Required review |
| --- | --- | --- |
| Root shell and providers | `src/app/layout.tsx`, `src/app/providers.tsx`, `src/app/globals.css` | Fonts, metadata, global providers, client boundaries, tokens; do not casually change global behavior. |
| Public shell | `src/app/(public)/layout.tsx`, `src/components/layout/Header.tsx`, `Footer.tsx` | One shared shell, header/footer props typed, no duplicate chrome or oversized data props. |
| Homepage | `src/app/(public)/page.tsx`, `src/features/home/` | Sections, static collections in data modules, server-fetched featured data, responsive Stitch match. |
| College listings | `src/app/(public)/colleges/[[...segments]]/page.tsx`, `src/features/colleges/` | Catch-all URL parsing, filters, cards, query parameters, SEO/canonical, 404, loading/empty/error. |
| College directory | `src/app/(public)/college-directory/page.tsx`, `src/features/college-directory/` | Search fields, directory types, data source, empty/error state, mobile card layout. |
| College detail and tabs | `src/app/(public)/college/[slug]/`, `src/features/colleges/details/` | Slugs/aliases, metadata, shared layout, typed course/fee/highlight data, optional values and table overflow. |
| Articles | `src/app/(public)/articles/`, `src/features/articles/` | Listing/detail metadata, trusted HTML handling, categories, pagination and client interaction split. |
| Exams | `src/app/(public)/exams/`, `src/features/exams/` | Dynamic exam slug, server data, typed filter configuration, links and no-result behavior. |
| Courses/programs/scholarships | Corresponding public routes and `src/features/{courses,programs,scholarships}/` | Check whether displayed data is real or static; keep static choices typed and centralized, do not imply sample data is live. |
| Informational pages | `about-us`, `contact-us`, `privacy-policy`, `terms-and-conditions` public route folders | Semantic headings, links/forms, responsive layout, metadata and accessibility. |
| Admin | `src/app/(admin)/secure-portal/`, `src/features/admin/` | Preserve access controls and mutation semantics; type forms and errors; keep mutable edit state local. |
| Authentication | `src/app/(authentication)/auth/`, `src/features/auth/` | Preserve the current auth provider/route behavior; verify dependencies before changing it. |
| Shared components | `src/components/shared/` | Cross-domain reuse only; type props and errors; no feature-specific content leaking into shared code. |
| UI primitives | `src/components/ui/` | Keep Radix/shadcn APIs, keyboard support, focus behavior, and variants consistent. |
| Search | `src/features/search/`, `src/components/header-components/` | Search datasets in `src/data`, typed college/search values, small client surface, keyboard/focus behavior. |

For each assignment, record the route, source files, relevant data/types, design frame, baseline screenshot, and verification evidence. Before calling the audit complete, check each route group—not just the homepage and college listing.

## 14. Definition of done and verification

Before marking a page/section complete:

- [ ] Route and all intended route aliases still resolve; invalid slugs/segments still return 404.
- [ ] Public SEO metadata, canonical behavior, JSON-LD, and query-filter behavior remain correct.
- [ ] First render contains meaningful server-rendered content; only necessary controls hydrate on the client.
- [ ] Data comes from existing services and real records; errors are not disguised as successful empty results.
- [ ] Static content/options are in a focused `src/data` module; mutable/derived/fetched data was not extracted.
- [ ] Domain and reusable component prop types live in focused `src/types` modules and are imported with `import type`.
- [ ] No newly introduced `any`, unchecked cast, or type-only workaround hides invalid data.
- [ ] Loading, empty, error, and missing-optional-data states are understandable.
- [ ] Typography uses the defined role class where applicable; no accidental competing font/size utilities.
- [ ] Existing shadcn-style primitives are reused where applicable; keyboard/focus behavior works.
- [ ] Mobile and desktop match the approved Stitch references where supplied; no horizontal overflow or obscured fixed content.
- [ ] Images have appropriate alt text and sizing; links/buttons have accessible names and correct semantics.
- [ ] No unrelated files, dependencies, auth behavior, route behavior, or rendering configuration changed.
- [ ] The assigned verification command has been run and its actual result is included in the PR.

Follow `AGENTS.md` for environment and shared-worktree restrictions. In particular, it currently says not to run `npm install`, `next build`, or `next dev` in this shared directory. Coordinate the agreed checks with the project owner; the architecture guide provides a scoped TypeScript-check example. Do not report checks that were not run.

## 15. Useful project references

- [Project conventions](./ARCHITECTURE_CONVENTIONS.md)
- [Typography roles and usage rules](./TYPOGRAPHY_GUIDELINES.md)
- [App Router college listing](../src/app/(public)/colleges/[[...segments]]/page.tsx)
- [College listing composition](../src/features/colleges/CollegesView.tsx)
- [College detail route](../src/app/(public)/college/[slug]/page.tsx)
- [College detail views](../src/features/colleges/details/CollegeTabViews.tsx)
- [Public layout](../src/app/(public)/layout.tsx)
- [Header composition](../src/components/layout/Header.tsx)
- [Root fonts and providers](../src/app/layout.tsx)
- [Tailwind typography utilities](../tailwind.config.ts)
- [Global design tokens and homepage typography](../src/app/globals.css)
- [Current rendering configuration](../next.config.ts)
