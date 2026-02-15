# CATC Scenario Documentation - Standards

This folder contains interactive HTML documentation for each CATC scenario defined in EUROCONTROL Specification for A-SMGCS Services v2.0, Appendix B.

## Source of Truth

- **Reference:** `docs/eurocontrol-specification-a-smgcs-v-2-0.pdf`
- **Section:** Appendix B - Informative - Detailed Description of CATC Alerts
- **CATC Scenarios** start at page 91 of the PDF

## Project Architecture

```
catc_scenarios/
├── css/main.css              # All shared CSS (extracted from inline styles)
├── js/scenarios.js           # Scenario metadata array (single source of truth)
├── js/shared.js              # Shared functions: sidebar, pagination, i18n, nav
├── index.html                # Landing page with scenario grid
├── 404.html                  # Custom 404 page
├── 01-lineup-vs-lineup.html  # Scenario pages (content + page-specific translations only)
├── ...
└── 22-taxi-vs-cross.html
```

### Key Files

| File | Purpose |
|------|---------|
| `js/scenarios.js` | `SCENARIOS` array with id, file, existing, given, group, ready for all 22 scenarios |
| `js/shared.js` | `buildSidebar()`, `buildPaginationBar()`, `buildNavLinks()`, `setLang()`, `toggleSidebar()`, `initScenario()`, `initIndexPage()`, shared translations |
| `css/main.css` | All visual styles including pagination bar, index grid, responsive |

## File Naming Convention

```
{NN}-{existing}-vs-{given}.html
```

| Part | Rule | Example |
|------|------|---------|
| `NN` | Two-digit sequence number (01-22) | `07` |
| `existing` | First clearance type (lowercase, hyphenated) | `cross` |
| `given` | Second clearance type (lowercase, hyphenated) | `takeoff` |

**Examples:**
- `01-lineup-vs-lineup.html`
- `07-cross-vs-takeoff.html`
- `20-taxi-vs-taxi-converging.html`

## Scenario Order (Appendix B)

| # | Existing | Given | PDF Page | File |
|---|----------|-------|----------|------|
| 01 | Line-Up | Line-Up | 91 | `01-lineup-vs-lineup.html` |
| 02 | Line-Up | Cross or Enter | 91-92 | `02-lineup-vs-cross-or-enter.html` |
| 03 | Line-Up | Take-Off | 92 | `03-lineup-vs-takeoff.html` |
| 04 | Line-Up | Land | 92-93 | `04-lineup-vs-land.html` |
| 05 | Cross or Enter | Line-Up | 93 | `05-cross-vs-lineup.html` |
| 06 | Cross or Enter | Cross or Enter | 93-94 | `06-cross-vs-cross.html` |
| 07 | Cross or Enter | Take-Off | 94-95 | `07-cross-vs-takeoff.html` |
| 08 | Cross or Enter | Land | 94-95 | `08-cross-vs-land.html` |
| 09 | Take-Off | Line-Up | 95 | `09-takeoff-vs-lineup.html` |
| 10 | Take-Off | Cross or Enter | 95 | `10-takeoff-vs-cross.html` |
| 11 | Take-Off | Take-Off | 96-97 | `11-takeoff-vs-takeoff.html` |
| 12 | Take-Off | Land | 97-99 | `12-takeoff-vs-land.html` |
| 13 | Land | Line-Up | 100 | `13-land-vs-lineup.html` |
| 14 | Land | Cross or Enter | 100-101 | `14-land-vs-cross.html` |
| 15 | Land | Take-Off | 101-102 | `15-land-vs-takeoff.html` |
| 16 | Land | Land | 103-104 | `16-land-vs-land.html` |
| 17 | Push-Back | Push-Back | 105 | `17-pushback-vs-pushback.html` |
| 18 | Push-Back | Taxi | 105-106 | `18-pushback-vs-taxi.html` |
| 19 | Taxi | Push-Back | 106-107 | `19-taxi-vs-pushback.html` |
| 20 | Taxi | Taxi (Converging) | 108 | `20-taxi-vs-taxi-converging.html` |
| 21 | Taxi | Taxi (Deadlock) | 109 | `21-taxi-vs-taxi-deadlock.html` |
| 22 | Taxi | Cross | 110 | `22-taxi-vs-cross.html` |

## HTML Template Structure

Every scenario file follows this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CATC Scenario N - Existing vs Given</title>
    <link rel="stylesheet" href="css/main.css">
</head>
<body data-scenario="N">

<!-- 1. Sidebar placeholder (built dynamically by shared.js) -->
<div id="sidebar-root"></div>

<!-- 2. Navbar with sidebar toggle, home link, lang toggle, badge, prev/next -->
<nav class="navbar">
    <div style="display:flex; align-items:center; gap:0.8rem;">
        <button class="sidebar-toggle" onclick="toggleSidebar()">&#9776; <span class="sidebar-toggle-label" data-i18n="nav-scenarios">Scenarios</span></button>
        <a href="index.html" data-i18n="nav-home">CATC Scenarios</a>
    </div>
    <div class="nav-links">
        <div class="lang-toggle">
            <button class="lang-btn active" onclick="setLang('en')">EN</button>
            <button class="lang-btn" onclick="setLang('tr')">TR</button>
        </div>
        <span class="scenario-badge" id="scenario-badge">Scenario N / 22</span>
        <a id="nav-prev">&larr; Prev</a>
        <a id="nav-next">Next &rarr;</a>
    </div>
</nav>

<!-- 3. Pagination bar (built dynamically by shared.js) -->
<div id="pagination-root"></div>

<!-- 4. Hero section -->
<!-- 5. Container with: Data Required, General Rule, Alert Triggered, Exemptions, Quick Reference -->
<!-- 6. Footer nav placeholder -->
<div id="footer-nav-root"></div>

<!-- 7. Footer -->

<!-- 8. Scripts -->
<script src="js/scenarios.js"></script>
<script src="js/shared.js"></script>
<script>
var pageTranslations = { en: { /* page-specific keys */ }, tr: { /* page-specific keys */ } };
var pageTooltips = { en: { /* tooltip texts */ }, tr: { /* tooltip texts */ } };
initScenario();
</script>
</body>
</html>
```

## Sidebar Management

**Sidebar is built dynamically** from `js/scenarios.js`. No manual sidebar HTML maintenance needed.

### When Creating a New Scenario
1. Create the new HTML file using the template above
2. In `js/scenarios.js`, change the scenario's `ready: false` to `ready: true`
3. Done. Sidebar, pagination bar, and index page update automatically across all pages.

### Sidebar Groups
```
Line-Up vs ...        → Scenarios 1-4
Cross or Enter vs ... → Scenarios 5-8
Take-Off vs ...       → Scenarios 9-12
Land vs ...           → Scenarios 13-16
Ground Movement       → Scenarios 17-22
```

## Content Rules

### Fidelity to PDF
- Every **Alert triggered** situation from the PDF must appear as a numbered Situation card
- Every **Exemption to the rule** from the PDF must appear in the Exemptions section
- **Data required** tags must exactly match what the PDF lists
- Use the same **callsigns** as the PDF (e.g., CHECKER1, KLM789, BAW456)
- Do NOT add situations or exemptions that are not in the PDF

### Callsigns per Scenario (from PDF)
Use the callsigns that appear in the specific PDF scenario. Common ones:
- `KLM789`, `CHECKER1`, `IBE987`, `IBE789`, `AZA654`, `AFR123`, `DLH321`
- `BAW456`, `AFR321`, `KLM987`, `DLH123`, `TAY102Y`, `BAW2030`

## SVG Diagram Standards

### Colors
| Element | Color | Hex |
|---------|-------|-----|
| Existing clearance (first) | Green | `#00cc44` / `#00ff55` |
| Trigger clearance (second) | Red | `#ff4444` / `#ff6666` |
| Runway surface | Gray | `#555` |
| Grass/background | Dark green | `#2d4a2d` |
| Taxiway | Medium green | `#6b8a4a` |
| Holding point line | Yellow | `#ffcc00` |
| Runway center line | White 30% | `#fff` opacity 0.3 |
| Callsign label bg | Dark transparent | `rgba(0,0,0,0.7)` |
| Conflict marker | Red circle + `!` | `#ff4444` |

### Layout
- Canvas: `width="700" height="260"` (standard), extend height if needed
- Runway: horizontal, centered, `x=50 width=600 height=60`
- Runway labels: `05` (left) and `23` (right) as standard
- Holding points: taxiway rectangles with yellow stop line
- Aircraft: small arrow polygons (triangle shapes)
- Movement arrows: dashed lines with arrowhead polygons
- Conflict zone: red circle with `!` at intersection point
- Legend box: bottom-right, dark transparent background

### Aircraft Direction Convention
- Pointing UP (north): `points="0,-12 -5,8 0,4 5,8"` (heading into runway from south)
- Pointing DOWN (south): `points="0,12 -5,-8 0,-4 5,-8"` (heading into runway from north)
- Pointing RIGHT (east): along runway toward 23 end
- Pointing LEFT (west): along runway toward 05 end

## i18n (Internationalization)

### Architecture
- **Shared translations** are in `js/shared.js` (`sharedTranslations` object) - keys common to all pages
- **Page-specific translations** are in each HTML file (`pageTranslations` object) - keys unique to that scenario
- **Tooltips** are in each HTML file (`pageTooltips` object)
- `setLang()` in `shared.js` merges both objects, page-specific keys override shared ones
- Language persisted in `localStorage('catc-lang')`

### Shared Translation Keys (in shared.js)
`sidebar-title`, `nav-scenarios`, `nav-home`, `group-*`, `section-data`, `section-rule`, `section-alert`, `section-exemptions`, `section-ref`, `rule-text`, `th-situation`, `th-position`, `th-description`, `th-alert`, `th-exemption`, `footer1`, `footer2`, `index-title`, `index-subtitle`, `index-progress`, `status-ready`, `status-pending`

### Page-Specific Translation Keys (in each HTML file)
`nav-badge`, `nav-prev`, `nav-next`, `hero-subtitle`, `tag-*`, `sit{N}-*`, `exemption{N}`, `td-*`, `btn-prev`, `btn-next`, `svg-*`, `sub-*`

### Translation Keys Convention
| Category | Pattern | Example |
|----------|---------|---------|
| Navigation | `nav-*` | `nav-badge`, `nav-prev`, `nav-next` |
| Hero | `hero-subtitle` | - |
| Sections | `section-*` | `section-data`, `section-alert` |
| Data tags | `tag-*` | `tag-clearances`, `tag-runway` |
| Situations | `sit{N}-title`, `sit{N}-desc`, `sit{N}-diagram` | `sit1-title` |
| Exemptions | `exemption{N}` | `exemption1` |
| Table | `th-*`, `td-*` | `th-situation`, `td-desc1` |
| SVG | `svg-*` | `svg-hp-klm`, `svg-first` |
| Sidebar | `sidebar-title`, `group-*` | `group-lineup` |
| Footer | `footer1`, `footer2` | - |

## Navigation

### Pagination Bar
Built dynamically by `buildPaginationBar()` in `shared.js`. Shows 22 numbered circles grouped by scenario group, with separators between groups. Active page highlighted, disabled pages grayed out.

### Keyboard Shortcuts
- `Arrow Left` / `Arrow Right`: Navigate to previous/next ready scenario
- `Escape`: Close sidebar

### Footer Nav
Built dynamically by `buildNavLinks()` in `shared.js`. Shows previous/next scenario names.

## Checklist Before Completing a Scenario

- [ ] Content matches PDF exactly (situations, exemptions, data required, callsigns)
- [ ] SVG diagram accurately represents the scenario
- [ ] EN translations complete (in `pageTranslations`)
- [ ] TR translations complete (in `pageTranslations`)
- [ ] `pageTooltips` object includes all data tag tooltips
- [ ] `data-scenario="N"` attribute on `<body>` is correct
- [ ] `js/scenarios.js` updated: `ready: true` for this scenario
- [ ] Scenario badge number in pageTranslations matches
