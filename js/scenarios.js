/* ==============================================
   CATC Scenario Metadata - Single Source of Truth
   ============================================== */

var SCENARIOS = [
    { id: 1,  file: '01-lineup-vs-lineup.html',         existing: 'Line-Up',       given: 'Line-Up',       group: 'lineup',  ready: true },
    { id: 2,  file: '02-lineup-vs-cross-or-enter.html',  existing: 'Line-Up',       given: 'Cross/Enter',   group: 'lineup',  ready: true },
    { id: 3,  file: '03-lineup-vs-takeoff.html',         existing: 'Line-Up',       given: 'Take-Off',      group: 'lineup',  ready: true },
    { id: 4,  file: '04-lineup-vs-land.html',            existing: 'Line-Up',       given: 'Land',          group: 'lineup',  ready: true },
    { id: 5,  file: '05-cross-vs-lineup.html',           existing: 'Cross/Enter',   given: 'Line-Up',       group: 'cross',   ready: true },
    { id: 6,  file: '06-cross-vs-cross.html',            existing: 'Cross/Enter',   given: 'Cross/Enter',   group: 'cross',   ready: true },
    { id: 7,  file: '07-cross-vs-takeoff.html',          existing: 'Cross/Enter',   given: 'Take-Off',      group: 'cross',   ready: true },
    { id: 8,  file: '08-cross-vs-land.html',             existing: 'Cross/Enter',   given: 'Land',          group: 'cross',   ready: true },
    { id: 9,  file: '09-takeoff-vs-lineup.html',         existing: 'Take-Off',      given: 'Line-Up',       group: 'takeoff', ready: true },
    { id: 10, file: '10-takeoff-vs-cross.html',          existing: 'Take-Off',      given: 'Cross/Enter',   group: 'takeoff', ready: true },
    { id: 11, file: '11-takeoff-vs-takeoff.html',        existing: 'Take-Off',      given: 'Take-Off',      group: 'takeoff', ready: true },
    { id: 12, file: '12-takeoff-vs-land.html',           existing: 'Take-Off',      given: 'Land',          group: 'takeoff', ready: false },
    { id: 13, file: '13-land-vs-lineup.html',            existing: 'Land',          given: 'Line-Up',       group: 'land',    ready: false },
    { id: 14, file: '14-land-vs-cross.html',             existing: 'Land',          given: 'Cross/Enter',   group: 'land',    ready: false },
    { id: 15, file: '15-land-vs-takeoff.html',           existing: 'Land',          given: 'Take-Off',      group: 'land',    ready: false },
    { id: 16, file: '16-land-vs-land.html',              existing: 'Land',          given: 'Land',          group: 'land',    ready: false },
    { id: 17, file: '17-pushback-vs-pushback.html',      existing: 'Push-Back',     given: 'Push-Back',     group: 'ground',  ready: false },
    { id: 18, file: '18-pushback-vs-taxi.html',          existing: 'Push-Back',     given: 'Taxi',          group: 'ground',  ready: false },
    { id: 19, file: '19-taxi-vs-pushback.html',          existing: 'Taxi',          given: 'Push-Back',     group: 'ground',  ready: false },
    { id: 20, file: '20-taxi-vs-taxi-converging.html',   existing: 'Taxi',          given: 'Taxi (Conv.)',  group: 'ground',  ready: false },
    { id: 21, file: '21-taxi-vs-taxi-deadlock.html',     existing: 'Taxi',          given: 'Taxi (Dead.)',  group: 'ground',  ready: false },
    { id: 22, file: '22-taxi-vs-cross.html',             existing: 'Taxi',          given: 'Cross',         group: 'ground',  ready: false }
];

var GROUPS = [
    { key: 'lineup',  i18nKey: 'group-lineup',  label: 'Line-Up vs ...',       trLabel: 'Line-Up vs ...' },
    { key: 'cross',   i18nKey: 'group-cross',   label: 'Cross or Enter vs ...', trLabel: 'Cross or Enter vs ...' },
    { key: 'takeoff', i18nKey: 'group-takeoff', label: 'Take-Off vs ...',      trLabel: 'Take-Off vs ...' },
    { key: 'land',    i18nKey: 'group-land',    label: 'Land vs ...',          trLabel: 'Land vs ...' },
    { key: 'ground',  i18nKey: 'group-ground',  label: 'Ground Movement',     trLabel: 'Yer Hareketi' }
];

var TOTAL_SCENARIOS = SCENARIOS.length;
var READY_COUNT = SCENARIOS.filter(function(s) { return s.ready; }).length;
