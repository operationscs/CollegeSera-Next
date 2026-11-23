# CollegeSera typography system

Use the role-based classes below to keep typography consistent across pages and components. They are registered as custom utilities by the Tailwind plugin in `tailwind.config.ts`, so Tailwind CSS IntelliSense can suggest them in class names. They use the Inter and Plus Jakarta Sans font variables loaded by the root layout.

## Rules

1. Keep semantic HTML meaningful: use the correct heading level, `label`, `button`, and table elements. A typography class changes presentation, not document meaning.
2. Choose one class that matches the text's UI role. For example, use `typography-card-heading` for a card title and `typography-description` for its explanatory copy.
3. Keep layout, color, spacing, borders, and other visual styles in the component's existing classes. Typography classes own font family, size, weight, and line height where defined.
4. Do not add a competing Tailwind `font-*`, `text-*`, or `leading-*` utility to the same element unless an intentional exception is needed.
5. Apply placeholder classes directly to the `<input>` or `<textarea>`. They style both the control's text and its placeholder.
6. Use the role classes on any page or component. They are global; the `.homepage-typography` wrapper only provides default typography for homepage content without a role class.
7. Prefer the narrowest matching role. Use `typography-footer-link` for a footer link, rather than a generic description class.
8. If completions do not appear after changing the Tailwind config, run **Tailwind CSS: Restart Language Server** from the VS Code Command Palette.

## Role classes

| UI role | Class | Font | Weight | Desktop size |
| --- | --- | --- | ---: | ---: |
| Hero heading | `typography-hero-heading` | Plus Jakarta Sans | 800 | 48–56px |
| Page heading (H1) | `typography-page-heading` | Plus Jakarta Sans | 700 | 36–44px |
| Section heading (H2) | `typography-section-heading` | Plus Jakarta Sans | 700 | 28–32px |
| Subsection heading (H3) | `typography-subsection-heading` | Plus Jakarta Sans | 650 | 22–24px |
| Card heading (H4) | `typography-card-heading` | Plus Jakarta Sans | 600 | 18–20px |
| Small heading (H5) | `typography-small-heading` | Plus Jakarta Sans | 600 | 16px |
| Navigation link | `typography-nav-link` | Plus Jakarta Sans | 600 | 14px |
| Dropdown menu link | `typography-dropdown-link` | Inter | 500 | 14px |
| Dropdown section title | `typography-dropdown-section-title` | Plus Jakarta Sans | 700 | 13px |
| Mega menu description | `typography-mega-description` | Inter | 400 | 13px |
| Body description | `typography-description` | Inter | 400 | 15–16px |
| Secondary description | `typography-secondary-description` | Inter | 400 | 14px |
| Small description | `typography-small-description` | Inter | 400 | 12–13px |
| Breadcrumb | `typography-breadcrumb` | Inter | 500 | 12–13px |
| Search placeholder | `typography-search-placeholder` | Inter | 400 | 14px |
| Search result | `typography-search-result` | Inter | 500 | 14px |
| Input label | `typography-input-label` | Inter | 600 | 13px |
| Input placeholder | `typography-input-placeholder` | Inter | 400 | 14px |
| Primary button | `typography-primary-button` | Plus Jakarta Sans | 600 | 14px |
| Secondary button | `typography-secondary-button` | Plus Jakarta Sans | 600 | 13px |
| Badge or tag | `typography-badge` | Inter | 600 | 11–12px |
| Statistic or number | `typography-statistic` | Plus Jakarta Sans | 700 | 24–36px |
| Footer heading | `typography-footer-heading` | Plus Jakarta Sans | 700 | 15px |
| Footer link | `typography-footer-link` | Inter | 400 | 13px |
| Footer description | `typography-footer-description` | Inter | 400 | 13px |
| Tooltip | `typography-tooltip` | Inter | 400 | 12px |
| Table header | `typography-table-header` | Plus Jakarta Sans | 600 | 13px |
| Table content | `typography-table-content` | Inter | 400 | 14px |
| Pagination | `typography-pagination` | Inter | 600 | 13px |
| Tab | `typography-tab` | Plus Jakarta Sans | 600 | 14px |
| Modal heading | `typography-modal-heading` | Plus Jakarta Sans | 700 | 22px |
| Modal description | `typography-modal-description` | Inter | 400 | 14px |

Heading, statistic, and hero classes scale down on smaller screens and use the listed sizes at desktop breakpoints.

## Examples

```tsx
<article>
  <h3 className="typography-card-heading">Engineering programs</h3>
  <p className="typography-description">
    Compare programs, fees, and admissions information.
  </p>
</article>

<label className="typography-input-label" htmlFor="college-search">
  Search colleges
</label>
<input
  id="college-search"
  className="typography-search-placeholder"
  placeholder="Enter a college name"
/>

<button className="typography-primary-button">Explore colleges</button>
```
