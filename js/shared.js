/* ==============================================
   CATC Shared Functions
   Sidebar, Pagination, Navigation, i18n
   ============================================== */

/* --- Shared Translations (common across all pages) --- */
var sharedTranslations = {
    en: {
        'sidebar-title': 'Scenarios',
        'nav-scenarios': 'Scenarios',
        'nav-home': 'CATC Scenarios',
        'group-lineup': 'Line-Up vs ...',
        'group-cross': 'Cross or Enter vs ...',
        'group-takeoff': 'Take-Off vs ...',
        'group-land': 'Land vs ...',
        'group-ground': 'Ground Movement',
        'section-data': 'Data Required',
        'section-rule': 'General Rule',
        'section-alert': 'Alert Triggered',
        'section-exemptions': 'Exemptions to the Rule',
        'section-ref': 'Quick Reference',
        'rule-text': '<strong>Important:</strong> In each scenario, it is deemed that the <strong>first Clearance</strong> in the heading title is the one that has been input by the Controller first and the <strong>second Clearance triggers</strong> the alert.',
        'th-situation': 'Situation',
        'th-position': 'Position',
        'th-description': 'Description',
        'th-alert': 'Alert',
        'th-exemption': 'Exemption',
        'footer1': 'EUROCONTROL Specification for A-SMGCS Services &mdash; Edition 2.0 &mdash; Appendix B',
        'footer2': 'CATC (Conflicting ATC Clearances) Scenario Documentation',
        'index-title': 'CATC Scenario Documentation',
        'index-subtitle': 'Interactive documentation for CATC alerts defined in EUROCONTROL Specification for A-SMGCS Services v2.0, Appendix B',
        'index-progress': 'scenarios completed',
        'status-ready': 'Completed',
        'status-pending': 'Pending'
    },
    tr: {
        'sidebar-title': 'Senaryolar',
        'nav-scenarios': 'Senaryolar',
        'nav-home': 'CATC Senaryolar\u0131',
        'group-lineup': 'Line-Up vs ...',
        'group-cross': 'Cross or Enter vs ...',
        'group-takeoff': 'Take-Off vs ...',
        'group-land': 'Land vs ...',
        'group-ground': 'Yer Hareketi',
        'section-data': 'Gerekli Veriler',
        'section-rule': 'Genel Kural',
        'section-alert': 'Alarm Tetiklendi',
        'section-exemptions': 'Kural Muafiyetleri',
        'section-ref': 'H\u0131zl\u0131 Ba\u015fvuru',
        'rule-text': '<strong>\u00d6nemli:</strong> Her senaryoda, ba\u015fl\u0131ktaki <strong>ilk Clearance</strong> kontrol\u00f6r taraf\u0131ndan \u00f6nce girilmi\u015f olan talimatt\u0131r ve <strong>ikinci Clearance alarm\u0131 tetikler</strong>.',
        'th-situation': 'Durum',
        'th-position': 'Pozisyon',
        'th-description': 'A\u00e7\u0131klama',
        'th-alert': 'Alarm',
        'th-exemption': 'Muafiyet',
        'footer1': 'EUROCONTROL A-SMGCS Servisleri Spesifikasyonu &mdash; S\u00fcr\u00fcm 2.0 &mdash; Ek B',
        'footer2': 'CATC (\u00c7eli\u015fen ATC Talimatlar\u0131) Senaryo Dok\u00fcmantasyonu',
        'index-title': 'CATC Senaryo Dok\u00fcmantasyonu',
        'index-subtitle': 'EUROCONTROL A-SMGCS Servisleri v2.0 Spesifikasyonu, Ek B\'de tan\u0131mlanan CATC uyar\u0131lar\u0131 i\u00e7in interaktif dok\u00fcmantasyon',
        'index-progress': 'senaryo tamamland\u0131',
        'status-ready': 'Tamamland\u0131',
        'status-pending': 'Beklemede'
    }
};

var currentLang = 'en';

/* --- Build Sidebar --- */
function buildSidebar(scenarioId) {
    var root = document.getElementById('sidebar-root');
    if (!root) return;

    var currentGroup = '';
    var html = '<div class="sidebar-overlay" onclick="toggleSidebar()"></div>';
    html += '<aside class="sidebar" id="sidebar">';
    html += '<div class="sidebar-header">';
    html += '<h3 data-i18n="sidebar-title">Scenarios</h3>';
    html += '<button class="sidebar-close" onclick="toggleSidebar()">&times;</button>';
    html += '</div>';
    html += '<nav class="sidebar-body">';

    for (var i = 0; i < SCENARIOS.length; i++) {
        var s = SCENARIOS[i];
        var group = GROUPS.filter(function(g) { return g.key === s.group; })[0];

        if (s.group !== currentGroup) {
            currentGroup = s.group;
            html += '<div class="sidebar-group-title" data-i18n="' + group.i18nKey + '">' + group.label + '</div>';
        }

        var isActive = s.id === scenarioId;
        var isDisabled = !s.ready;
        var cls = 'sidebar-item';
        if (isActive) cls += ' active';
        else if (isDisabled) cls += ' disabled';

        html += '<a class="' + cls + '" href="' + s.file + '">';
        html += '<span class="sidebar-num">' + s.id + '</span> ';
        html += s.existing + ' vs ' + s.given;
        html += '</a>';
    }

    html += '</nav></aside>';
    root.innerHTML = html;
}

/* --- Build Pagination Bar --- */
function buildPaginationBar(scenarioId) {
    var root = document.getElementById('pagination-root');
    if (!root) return;

    var current = SCENARIOS.filter(function(s) { return s.id === scenarioId; })[0];
    var prevReady = findPrevReady(scenarioId);
    var nextReady = findNextReady(scenarioId);

    var html = '<div class="pagination-bar">';

    if (prevReady) {
        html += '<a class="page-arrow" href="' + prevReady.file + '" title="Previous">&lsaquo;</a>';
    } else {
        html += '<span class="page-arrow disabled">&lsaquo;</span>';
    }

    var currentGroup = '';
    for (var i = 0; i < SCENARIOS.length; i++) {
        var s = SCENARIOS[i];

        if (s.group !== currentGroup) {
            if (currentGroup !== '') {
                html += '<span class="page-separator"></span>';
            }
            currentGroup = s.group;
        }

        var cls = 'page-num';
        if (s.id === scenarioId) cls += ' active';
        else if (!s.ready) cls += ' disabled';

        if (s.ready && s.id !== scenarioId) {
            html += '<a class="' + cls + '" href="' + s.file + '">' + s.id + '</a>';
        } else {
            html += '<span class="' + cls + '">' + s.id + '</span>';
        }
    }

    if (nextReady) {
        html += '<a class="page-arrow" href="' + nextReady.file + '" title="Next">&rsaquo;</a>';
    } else {
        html += '<span class="page-arrow disabled">&rsaquo;</span>';
    }

    html += '</div>';
    root.innerHTML = html;
}

/* --- Build Nav Links (navbar + footer) --- */
function buildNavLinks(scenarioId) {
    var prevReady = findPrevReady(scenarioId);
    var nextReady = findNextReady(scenarioId);

    var badge = document.getElementById('scenario-badge');
    if (badge) {
        badge.setAttribute('data-i18n', 'nav-badge');
        badge.textContent = 'Scenario ' + scenarioId + ' / ' + TOTAL_SCENARIOS;
    }

    var navPrev = document.getElementById('nav-prev');
    if (navPrev) {
        if (prevReady) {
            navPrev.href = prevReady.file;
            navPrev.setAttribute('data-i18n', 'nav-prev');
            navPrev.innerHTML = '&larr; Prev';
            navPrev.classList.remove('disabled');
        } else {
            navPrev.removeAttribute('href');
            navPrev.classList.add('disabled');
            navPrev.setAttribute('data-i18n', 'nav-prev');
            navPrev.innerHTML = '&larr; Prev';
        }
    }

    var navNext = document.getElementById('nav-next');
    if (navNext) {
        if (nextReady) {
            navNext.href = nextReady.file;
            navNext.setAttribute('data-i18n', 'nav-next');
            navNext.innerHTML = 'Next &rarr;';
            navNext.classList.remove('disabled');
        } else {
            navNext.removeAttribute('href');
            navNext.classList.add('disabled');
            navNext.setAttribute('data-i18n', 'nav-next');
            navNext.innerHTML = 'Next &rarr;';
        }
    }

    var footerNav = document.getElementById('footer-nav-root');
    if (footerNav) {
        var html = '<div class="footer-nav">';
        if (prevReady) {
            html += '<a href="' + prevReady.file + '" data-i18n="btn-prev">&larr; ' + prevReady.existing + ' vs ' + prevReady.given + '</a>';
        } else {
            html += '<a class="disabled" data-i18n="btn-prev">&larr; Previous</a>';
        }
        if (nextReady) {
            html += '<a href="' + nextReady.file + '" data-i18n="btn-next">Next: ' + nextReady.existing + ' vs ' + nextReady.given + ' &rarr;</a>';
        } else {
            html += '<a class="disabled" data-i18n="btn-next">Next &rarr;</a>';
        }
        html += '</div>';
        footerNav.innerHTML = html;
    }
}

/* --- Language Switching --- */
function setLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    document.querySelectorAll('.lang-btn').forEach(function(btn) {
        btn.classList.toggle('active', btn.textContent === lang.toUpperCase());
    });

    var merged = mergeTranslations(lang);

    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        var key = el.getAttribute('data-i18n');
        if (merged[key] !== undefined) {
            el.innerHTML = merged[key];
        }
    });

    document.querySelectorAll('[data-svg-i18n]').forEach(function(el) {
        var key = el.getAttribute('data-svg-i18n');
        if (merged[key] !== undefined) {
            el.textContent = merged[key];
        }
    });

    if (typeof pageTooltips !== 'undefined') {
        document.querySelectorAll('.data-tag.av-term').forEach(function(el) {
            var tagText = merged[el.getAttribute('data-i18n')];
            if (tagText && pageTooltips[lang] && pageTooltips[lang][tagText]) {
                el.setAttribute('data-tooltip', pageTooltips[lang][tagText]);
            }
        });
    }

    updateDynamicTranslations(lang);

    try { localStorage.setItem('catc-lang', lang); } catch(e) {}
}

function mergeTranslations(lang) {
    var result = {};
    var shared = sharedTranslations[lang] || {};
    for (var k in shared) { result[k] = shared[k]; }

    if (typeof pageTranslations !== 'undefined') {
        var page = pageTranslations[lang] || {};
        for (var k2 in page) { result[k2] = page[k2]; }
    }
    return result;
}

function updateDynamicTranslations(lang) {
    var scenarioId = getScenarioId();
    if (!scenarioId) return;

    var badge = document.getElementById('scenario-badge');
    if (badge) {
        badge.textContent = (lang === 'tr' ? 'Senaryo ' : 'Scenario ') + scenarioId + ' / ' + TOTAL_SCENARIOS;
    }

    var prevReady = findPrevReady(scenarioId);
    var nextReady = findNextReady(scenarioId);

    var navPrev = document.getElementById('nav-prev');
    if (navPrev && navPrev.getAttribute('href')) {
        navPrev.innerHTML = lang === 'tr' ? '&larr; \u00d6nceki' : '&larr; Prev';
    }

    var navNext = document.getElementById('nav-next');
    if (navNext && navNext.getAttribute('href')) {
        navNext.innerHTML = lang === 'tr' ? 'Sonraki &rarr;' : 'Next &rarr;';
    }

    var footerNav = document.getElementById('footer-nav-root');
    if (footerNav) {
        var btnPrev = footerNav.querySelector('[data-i18n="btn-prev"]');
        if (btnPrev && prevReady) {
            btnPrev.innerHTML = (lang === 'tr' ? '&larr; ' : '&larr; ') + prevReady.existing + ' vs ' + prevReady.given;
        } else if (btnPrev) {
            btnPrev.innerHTML = lang === 'tr' ? '&larr; \u00d6nceki' : '&larr; Previous';
        }
        var btnNext = footerNav.querySelector('[data-i18n="btn-next"]');
        if (btnNext && nextReady) {
            btnNext.innerHTML = (lang === 'tr' ? 'Sonraki: ' : 'Next: ') + nextReady.existing + ' vs ' + nextReady.given + ' &rarr;';
        } else if (btnNext) {
            btnNext.innerHTML = lang === 'tr' ? 'Sonraki &rarr;' : 'Next &rarr;';
        }
    }
}

/* --- Sidebar Toggle --- */
function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var overlay = document.querySelector('.sidebar-overlay');
    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('open');
}

/* --- Helper: Find Previous/Next Ready Scenario --- */
function findPrevReady(scenarioId) {
    for (var i = scenarioId - 2; i >= 0; i--) {
        if (SCENARIOS[i].ready) return SCENARIOS[i];
    }
    return null;
}

function findNextReady(scenarioId) {
    for (var i = scenarioId; i < SCENARIOS.length; i++) {
        if (SCENARIOS[i].ready) return SCENARIOS[i];
    }
    return null;
}

/* --- Helper: Get Scenario ID from body --- */
function getScenarioId() {
    var body = document.body;
    return body ? parseInt(body.getAttribute('data-scenario'), 10) : null;
}

/* --- Keyboard Navigation --- */
function setupKeyboardNav(scenarioId) {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            var sidebar = document.getElementById('sidebar');
            var overlay = document.querySelector('.sidebar-overlay');
            if (sidebar) sidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('open');
            return;
        }

        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.key === 'ArrowLeft') {
            var prev = findPrevReady(scenarioId);
            if (prev) window.location.href = prev.file;
        } else if (e.key === 'ArrowRight') {
            var next = findNextReady(scenarioId);
            if (next) window.location.href = next.file;
        }
    });
}

/* --- Init Scenario Page --- */
function initScenario() {
    var scenarioId = getScenarioId();
    if (!scenarioId) return;

    buildSidebar(scenarioId);
    buildPaginationBar(scenarioId);
    buildNavLinks(scenarioId);
    setupKeyboardNav(scenarioId);

    restoreLang();
}

/* --- Init Index Page --- */
function initIndexPage() {
    var grid = document.getElementById('scenario-grid');
    if (!grid) return;

    var currentGroup = '';
    var html = '';

    for (var i = 0; i < SCENARIOS.length; i++) {
        var s = SCENARIOS[i];
        var group = GROUPS.filter(function(g) { return g.key === s.group; })[0];

        if (s.group !== currentGroup) {
            currentGroup = s.group;
            html += '<div class="group-header" data-i18n="' + group.i18nKey + '" style="grid-column: 1 / -1;">' + group.label + '</div>';
        }

        var cls = 'scenario-card';
        if (!s.ready) cls += ' disabled';

        var statusCls = s.ready ? 'ready' : 'pending';
        var statusKey = s.ready ? 'status-ready' : 'status-pending';
        var statusText = s.ready ? 'Completed' : 'Pending';

        if (s.ready) {
            html += '<a class="' + cls + '" href="' + s.file + '">';
        } else {
            html += '<div class="' + cls + '">';
        }

        html += '<span class="sc-num">' + s.id + '</span>';
        html += '<div class="sc-info">';
        html += '<div class="sc-title">' + s.existing + ' vs ' + s.given + '</div>';
        html += '<span class="sc-status ' + statusCls + '" data-i18n="' + statusKey + '">' + statusText + '</span>';
        html += '</div>';

        html += s.ready ? '</a>' : '</div>';
    }

    grid.innerHTML = html;

    var progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        var pct = Math.round((READY_COUNT / TOTAL_SCENARIOS) * 100);
        progressFill.style.width = pct + '%';
    }

    var progressLabel = document.getElementById('progress-label');
    if (progressLabel) {
        progressLabel.textContent = READY_COUNT + ' / ' + TOTAL_SCENARIOS;
    }

    buildSidebar(0);
    restoreLang();
}

/* --- Restore Saved Language --- */
function restoreLang() {
    try {
        var saved = localStorage.getItem('catc-lang');
        if (saved && sharedTranslations[saved]) {
            setLang(saved);
        }
    } catch(e) {}
}
