# CATC Scenario Documentation

Interactive HTML documentation for **Conflicting ATC Clearances (CATC)** alerts defined in [EUROCONTROL Specification for A-SMGCS Services v2.0](https://www.eurocontrol.int/), Appendix B.

## Completion Status

| Group | Scenarios | Status |
|-------|-----------|--------|
| Line-Up vs ... | 01-04 | 4/4 |
| Cross or Enter vs ... | 05-08 | 4/4 |
| Take-Off vs ... | 09-12 | 4/4 |
| Land vs ... | 13-16 | 4/4 |
| Ground Movement | 17-22 | 0/6 |

**Total: 16 / 22 scenarios completed**

## Features

- 22 CATC scenario pages with interactive SVG diagrams
- Bilingual support (English / Turkish)
- Pagination bar for quick scenario navigation
- Keyboard shortcuts (Arrow Left/Right for prev/next, Escape to close sidebar)
- Responsive design for mobile and desktop
- GitHub Pages ready

## Project Structure

```
catc_scenarios/
├── css/main.css          # Shared stylesheet
├── js/scenarios.js       # Scenario metadata (single source of truth)
├── js/shared.js          # Shared functions (sidebar, pagination, i18n)
├── index.html            # Landing page with scenario grid
├── 404.html              # Custom 404 page
├── 01-lineup-vs-lineup.html
├── ...
└── 22-taxi-vs-cross.html
```

## Adding a New Scenario

1. Create the new HTML file following the template structure (see `CLAUDE.md`)
2. In `js/scenarios.js`, change the scenario's `ready: false` to `ready: true`
3. Done. Sidebar, pagination, and index page update automatically.

## Development

Open any HTML file directly in a browser, or serve with:

```bash
python3 -m http.server 8000
```

## Reference

EUROCONTROL Specification for A-SMGCS Services, Edition 2.0, Appendix B - Informative - Detailed Description of CATC Alerts
