# CollegeSera Supabase SQL & Migrations Reference

All original SQL scripts and migrations are preserved verbatim here. Do **not** run destructive scripts against a live production database without reviewing them first.

## Recommended Apply Order (Fresh Database Setup)

1. **Core College / Course / Placement / Ranking / Fee Schema**
   - Base tables (`colleges`, `courses`, `placements`, `rankings`, `admission_process`, `fee_structures`, `fee_components`, `branches`, `cutoffdata`, `programs`) live in your existing Supabase project.
   - `migrations/add_courses_specialization.sql` — Adds `specialization` column to `courses` and updates RPCs (`get_degree_summary_for_college`, `get_courses_and_fees_for_degree`).
   - `sql/add_brochure_column.sql` — Adds `brochure_file` column to `colleges`.

2. **Articles & Editorial Content**
   - `sql/create_articles_table.sql` — Creates `articles` table.
   - `sql/add_college_id_to_articles.sql` — Adds `college_id` foreign key to `articles`.

3. **CRM, Leads & Public Submission RPC**
   - `sql/crm_tables.sql` — Creates `crm_contacts`, `crm_leads`, `crm_interactions`.
   - `sql/rpc_submit_lead.sql` — Creates `submit_lead(...)` `SECURITY DEFINER` RPC used by the public booking modal, scholarship form, and server actions.

4. **Monetization & Ad Placements**
   - `sql/monetization_schema.sql` — Creates `ad_placements` / monetization tables.
   - `sql/update_ad_placements.sql` — Updates placement areas and priorities.

5. **SEO & Sitemap Management**
   - `migrations/create_sitemap_entries.sql` — Creates `sitemap_entries` table (used by both `/sitemap.xml` and dynamic `seo_title` / `seo_description` / `og_image` overrides).
   - `migrations/add_seo_columns_to_sitemap_entries.sql` — Adds `seo_title`, `seo_description`, `og_image` columns.
   - `migrations/create_sitemap_overrides.sql` — Legacy/supplementary sitemap overrides table.

6. **Row-Level Security (RLS) Policies**
   - `sql/rls_policies.sql` — Baseline RLS policies.
   - `sql/secure_rls.sql` — Hardened RLS policies (supersedes `sql/fix_rls.sql`).
   - `sql/fix_colleges_rls.sql` — College-specific RLS adjustments for Clerk JWT (`template: 'supabase'`).
   - `sql/fix_dashboard_access.sql` — Admin portal read/write access policies.
   - *(Note: `sql/fix_rls.sql` is an older permissive fix superseded by `secure_rls.sql`.)*

7. **Content & Data Patch Scripts (`sql/insert_*.sql`, `sql/update_*.sql`, `sql/remove_shiksha_images.sql`)**
   - One-off data seed/update scripts for specific colleges (Firebird, KCT Business School, PSGIM, Coimbatore MBA colleges, logos, scholarship notes, TNEA 2026 / Autonomous / Top 10 MBA articles). Apply only as needed.
