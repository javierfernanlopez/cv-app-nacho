// Guard against multiple executions if multiple script tags load
if (window.__CV_APP_LOADED__) {
  console.log('CV App ya cargado.');
} else {
  window.__CV_APP_LOADED__ = true;

// State management for Ignacio Fernández López
let state = {
  profile: null,
  companies: [],
  viewMode: 'dashboard', // 'dashboard' | 'detail'
  selectedCompanyId: 'maskom',
  activeRoleKey: 'area_manager_retail_ops',
  subTab: 'cv', // 'cv' | 'letter' | 'pitch'
  showPhoto: true,
  isEditing: false,
  filter: 'all',
  searchQuery: '',
  statuses: JSON.parse(localStorage.getItem('cv_app_ignacio_statuses') || '{}'),
  customCompanies: JSON.parse(localStorage.getItem('cv_app_ignacio_custom_companies') || '[]')
};

// DOM Elements - App & Dashboard
const dashboardHeader = document.getElementById('dashboardHeader');
const dashboardView = document.getElementById('dashboardView');
const detailView = document.getElementById('detailView');
const dashSearchInput = document.getElementById('dashSearchInput');
const filterPills = document.querySelectorAll('.pill-filter');
const companiesGrid = document.getElementById('companiesGrid');
const brandBtn = document.getElementById('brandBtn');

// DOM Elements - Metrics
const metricTotal = document.getElementById('metricTotal');
const metricSent = document.getElementById('metricSent');
const metricPending = document.getElementById('metricPending');
const metricHigh = document.getElementById('metricHigh');
const metricChannels = document.getElementById('metricChannels');

// DOM Elements - Detail
const backToDashBtn = document.getElementById('backToDashBtn');
const detailCompanyName = document.getElementById('detailCompanyName');
const detailPriorityBadge = document.getElementById('detailPriorityBadge');
const detailCompanyMeta = document.getElementById('detailCompanyMeta');
const detailStatusSelect = document.getElementById('detailStatusSelect');
const dispatchButtonsGroup = document.getElementById('dispatchButtonsGroup');
const detailDownloadAllBtn = document.getElementById('detailDownloadAllBtn');

// DOM Elements - Document Controls (above paper)
const docControlsBar = document.getElementById('docControlsBar');
const detailRoleSelect = document.getElementById('detailRoleSelect');
const detailEditToggleBtn = document.getElementById('detailEditToggleBtn');
const detailPrintBtn = document.getElementById('detailPrintBtn');
const navTabButtons = document.querySelectorAll('.nav-tab-btn');

// DOM Elements - Content Sheets
const paperView = document.getElementById('paperView');
const pitchView = document.getElementById('pitchView');
const toastEl = document.getElementById('toast');

// Bottom Nav DOM Elements
const mobileBottomNav = document.getElementById('mobileBottomNav');
const navBtnDashboard = document.getElementById('navBtnDashboard');
const navBtnAddOffer = document.getElementById('navBtnAddOffer');
const navBtnMetrics = document.getElementById('navBtnMetrics');
const navBtnAiSettings = document.getElementById('navBtnAiSettings');

// Add Offer Modal DOM Elements
const openAddOfferBtn = document.getElementById('openAddOfferBtn');
const addOfferModal = document.getElementById('addOfferModal');
const closeAddOfferModalBtn = document.getElementById('closeAddOfferModalBtn');
const cancelAddOfferBtn = document.getElementById('cancelAddOfferBtn');
const btnSubmitAddOffer = document.getElementById('btnSubmitAddOffer');
const btnAutoScanUrl = document.getElementById('btnAutoScanUrl');
const inputOfferUrl = document.getElementById('inputOfferUrl');
const inputOfferText = document.getElementById('inputOfferText');
const toggleAiConfigBtn = document.getElementById('toggleAiConfigBtn');
const aiConfigBody = document.getElementById('aiConfigBody');
const aiConfigChevron = document.getElementById('aiConfigChevron');
const geminiApiKeyInput = document.getElementById('geminiApiKeyInput');
const geminiModelSelect = document.getElementById('geminiModelSelect');
const apiStatusBadge = document.getElementById('apiStatusBadge');
const displayAiModel = document.getElementById('displayAiModel');
const aiScanProgress = document.getElementById('aiScanProgress');
const aiProgressText = document.getElementById('aiProgressText');

// Cloud Sync Endpoint (Multi-device persistent sync)
const CLOUD_SYNC_URL = 'https://api.restful-api.dev/objects/ff808181a09d98f701a0e4f51a0928e0';

// Load Data with Zero-Fail Fallback
async function init() {
  try {
    if (window.PROFILE_DATA && window.COMPANIES_DATA) {
      state.profile = window.PROFILE_DATA;
      state.companies = [...window.COMPANIES_DATA];
    } else {
      const [profileRes, companiesRes] = await Promise.all([
        fetch('/data/profile.json'),
        fetch('/data/companies.json')
      ]);
      state.profile = await profileRes.json();
      state.companies = await companiesRes.json();
    }

    if (window.DEFAULT_PHOTO_BASE64) {
      window.PHOTO_BASE64 = window.DEFAULT_PHOTO_BASE64;
    }

    // Merge custom added companies from localStorage
    const storedCustom = JSON.parse(localStorage.getItem('cv_app_ignacio_custom_companies') || '[]');
    if (Array.isArray(storedCustom) && storedCustom.length > 0) {
      state.customCompanies = storedCustom;
      storedCustom.forEach(cust => {
        if (!state.companies.some(c => c.id === cust.id)) {
          state.companies.unshift(cust);
        }
      });
    }

    // Default company
    const defaultComp = state.companies.find(c => c.id === state.selectedCompanyId) || state.companies[0];
    state.selectedCompanyId = defaultComp.id;
    state.activeRoleKey = defaultComp.defaultRole || 'area_manager_retail_ops';

    setupEventListeners();
    setupBottomNav();
    setupAddOfferModal();
    renderDashboard();

    // Cross-device cloud sync
    syncWithCloud();
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        syncWithCloud();
      }
    });

    // Check if URL has hash (e.g. #cbre)
    const hash = window.location.hash.replace('#', '');
    if (hash && state.companies.some(c => c.id === hash)) {
      openCompanyDetail(hash);
    }
  } catch (err) {
    console.error('Error inicializando la app:', err);
  }
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('show');
  setTimeout(() => toastEl.classList.remove('show'), 3500);
}

function setupEventListeners() {
  // Navigation
  brandBtn.addEventListener('click', showDashboard);
  backToDashBtn.addEventListener('click', showDashboard);

  // Search in Dashboard
  dashSearchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.toLowerCase().trim();
    renderDashboard();
  });

  // Filter Pills in Dashboard
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.filter = pill.dataset.filter;
      renderDashboard();
    });
  });

  // Detail Status Selector
  detailStatusSelect.addEventListener('change', (e) => {
    updateCompanyStatus(state.selectedCompanyId, e.target.value);
  });

  // Detail Nav Tabs (CV / Letter / Pitch)
  navTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      navTabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.subTab = btn.dataset.subtab;
      renderDetailWorkspace();
    });
  });

  // Detail Role Switcher
  detailRoleSelect.addEventListener('change', (e) => {
    state.activeRoleKey = e.target.value;
    renderDetailWorkspace();
  });

  // Inline Edit Toggle
  detailEditToggleBtn.addEventListener('click', () => {
    state.isEditing = !state.isEditing;
    paperView.contentEditable = state.isEditing ? 'true' : 'false';
    detailEditToggleBtn.style.background = state.isEditing ? 'var(--neo-green)' : '#FFFFFF';
    detailEditToggleBtn.style.color = state.isEditing ? '#FFFFFF' : 'var(--neo-text)';
    showToast(state.isEditing ? 'Modo edición activado: edita texto directamente en la hoja' : 'Modo edición desactivado');
  });

  // Print
  detailPrintBtn.addEventListener('click', () => {
    window.print();
  });

  // Download both CV and Cover Letter
  detailDownloadAllBtn.addEventListener('click', () => {
    const comp = getSelectedCompany();
    downloadCompanyCvAndLetter(comp);
  });

  // Keyboard shortcut: Esc to return to dashboard
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.viewMode === 'detail') {
      showDashboard();
    }
  });
}

function getSelectedCompany() {
  return state.companies.find(c => c.id === state.selectedCompanyId) || state.companies[0];
}

function updateCompanyStatus(companyId, status) {
  state.statuses[companyId] = status;
  localStorage.setItem('cv_app_ignacio_statuses', JSON.stringify(state.statuses));
  
  if (state.viewMode === 'dashboard') {
    renderDashboard();
  } else {
    detailStatusSelect.value = status;
    detailStatusSelect.setAttribute('data-val', status);
  }

  saveStatusToCloud(companyId, status);
}

// ============================================================
// CLOUD PERSISTENCE & CROSS-DEVICE SYNC
// ============================================================
async function saveStatusToCloud(companyId, status) {
  updateCloudSyncBadge('syncing');
  try {
    const payload = {
      name: "cv_app_ignacio_statuses",
      data: {
        ...state.statuses,
        _custom_companies: state.customCompanies
      }
    };
    await fetch(CLOUD_SYNC_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    updateCloudSyncBadge('synced');
  } catch (err) {
    console.warn('Error syncing status to cloud:', err);
    updateCloudSyncBadge('offline');
  }
}

async function syncWithCloud() {
  updateCloudSyncBadge('syncing');
  try {
    const res = await fetch(CLOUD_SYNC_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && typeof json.data === 'object') {
        let hasChanges = false;

        // Sync custom companies if stored in cloud
        if (Array.isArray(json.data._custom_companies)) {
          const cloudCustom = json.data._custom_companies;
          let localCustomUpdated = false;
          cloudCustom.forEach(cust => {
            if (!state.companies.some(c => c.id === cust.id)) {
              state.companies.unshift(cust);
              state.customCompanies.unshift(cust);
              localCustomUpdated = true;
              hasChanges = true;
            }
          });
          if (localCustomUpdated) {
            localStorage.setItem('cv_app_ignacio_custom_companies', JSON.stringify(state.customCompanies));
          }
        }

        // Sync application statuses
        for (const [compId, compData] of Object.entries(json.data)) {
          if (compId === '_custom_companies') continue;
          const cloudStatus = typeof compData === 'string' ? compData : (compData.status || 'Pendiente');
          if (state.statuses[compId] !== cloudStatus) {
            state.statuses[compId] = cloudStatus;
            hasChanges = true;
          }
        }
        if (hasChanges) {
          localStorage.setItem('cv_app_ignacio_statuses', JSON.stringify(state.statuses));
          if (state.viewMode === 'dashboard') {
            renderDashboard();
          } else {
            const comp = getSelectedCompany();
            const curStatus = state.statuses[comp.id] || 'Pendiente';
            detailStatusSelect.value = curStatus;
            detailStatusSelect.setAttribute('data-val', curStatus);
          }
        }
        updateCloudSyncBadge('synced');
        return;
      }
    }
    updateCloudSyncBadge('synced');
  } catch (err) {
    console.warn('Cloud sync read warning:', err);
    updateCloudSyncBadge('offline');
  }
}

function updateCloudSyncBadge(status) {
  const badge = document.getElementById('cloudSyncBadge');
  if (!badge) return;
  if (status === 'syncing') {
    badge.className = 'badge-sync syncing';
    badge.innerHTML = '🔄 Sincronizando...';
  } else if (status === 'synced') {
    badge.className = 'badge-sync';
    badge.innerHTML = '☁️ Nube sincronizada';
  } else {
    badge.className = 'badge-sync offline';
    badge.innerHTML = '💾 Guardado local';
  }
}

// ============================================================
// DASHBOARD LOGIC
// ============================================================
function showDashboard() {
  state.viewMode = 'dashboard';
  window.location.hash = '';
  dashboardHeader.style.display = 'flex';
  dashboardView.style.display = 'block';
  detailView.style.display = 'none';
  updateNavState('dashboard');
  renderDashboard();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderDashboard() {
  // Calculate Metrics
  const total = state.companies.length;
  let sentCount = 0;
  let highCount = 0;
  let directCount = 0;
  let portalCount = 0;

  state.companies.forEach(c => {
    const status = state.statuses[c.id] || 'Pendiente';
    if (status === 'Enviado') sentCount++;
    if (c.priority === 'alta') highCount++;
    if (c.channel === 'direct_email') directCount++;
    if (c.channel === 'portal') portalCount++;
  });

  metricTotal.textContent = total;
  metricSent.textContent = `${sentCount} / ${total}`;
  metricPending.textContent = total - sentCount;
  metricHigh.textContent = highCount;
  metricChannels.textContent = `${directCount} Directo / ${portalCount} Web`;
  const allPill = document.querySelector('.pill-filter[data-filter="all"]');
  if (allPill) allPill.textContent = `TODAS (${total})`;

  // Filter companies
  const filtered = state.companies.filter(c => {
    // Search
    const matchesQuery = !state.searchQuery || 
      c.name.toLowerCase().includes(state.searchQuery) ||
      c.category.toLowerCase().includes(state.searchQuery) ||
      c.location.toLowerCase().includes(state.searchQuery) ||
      c.contactRoleName.toLowerCase().includes(state.searchQuery) ||
      c.contactTarget.toLowerCase().includes(state.searchQuery);
    if (!matchesQuery) return false;

    // Pills
    const currentStatus = state.statuses[c.id] || 'Pendiente';
    if (state.filter === 'alta') return c.priority === 'alta';
    if (state.filter === 'direct_email') return c.channel === 'direct_email';
    if (state.filter === 'portal') return c.channel === 'portal';
    if (state.filter === 'Pendiente') return currentStatus === 'Pendiente';
    if (state.filter === 'Enviado') return currentStatus === 'Enviado';
    if (state.filter === 'En Proceso') return currentStatus === 'En Proceso' || currentStatus === 'Entrevista';

    return true;
  });

  // Render cards (Clean & compact, intelligence is viewed when clicking into the company)
  companiesGrid.innerHTML = filtered.map(comp => {
    const status = state.statuses[comp.id] || 'Pendiente';
    const roleData = state.profile.roles[comp.defaultRole || 'real_estate_valuation_advisory'] || state.profile.roles['area_manager_retail_ops'];
    const isDirect = comp.channel === 'direct_email';

    return `
      <div class="company-card-dash" data-comp-id="${comp.id}">
        <div>
          <div class="card-dash-top">
            <h3 class="card-dash-title">${comp.name}</h3>
            <div style="display: flex; align-items: center; gap: 4px;">
              <span class="badge-priority badge-${comp.priority}">${comp.priority.toUpperCase()}</span>
              ${comp.isCustom ? '<span class="badge-custom-offer">✨ IA</span>' : ''}
            </div>
          </div>

          <div class="card-dash-category">${comp.category}</div>

          <div class="card-dash-meta">
            <div class="card-meta-line">
              <strong>📍 Ubicación:</strong> <span>${comp.location}</span>
            </div>
            <div class="card-meta-line" style="flex-direction: column; align-items: flex-start; gap: 2px;">
              <strong>🎯 Rol Estratégico:</strong>
              <span class="badge-rec-role">⭐ ${roleData.title}</span>
            </div>
            <div class="card-meta-line" style="margin-top: 4px;">
              <strong>Canal:</strong> 
              <span class="card-meta-channel">
                ${isDirect ? `✉️ Email Directo (${comp.contactTarget})` : `🌐 Portal Web`}
              </span>
            </div>
          </div>
        </div>

        <div class="card-dash-footer">
          <select class="status-select" data-dash-status-id="${comp.id}" data-val="${status}" onclick="event.stopPropagation()">
            <option value="Pendiente" ${status === 'Pendiente' ? 'selected' : ''}>⏳ Pendiente</option>
            <option value="Enviado" ${status === 'Enviado' ? 'selected' : ''}>✅ Enviado</option>
            <option value="En Proceso" ${status === 'En Proceso' ? 'selected' : ''}>💬 En Proceso</option>
            <option value="Entrevista" ${status === 'Entrevista' ? 'selected' : ''}>🎉 Entrevista</option>
            <option value="Descartado" ${status === 'Descartado' ? 'selected' : ''}>✖️ Descartado</option>
          </select>

          <button class="btn-neo btn-neo-yellow" style="font-size: 11px; padding: 6px 11px;" data-open-comp="${comp.id}">
            👉 Ver Pack y Enviar
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Add click listeners to cards
  companiesGrid.querySelectorAll('.company-card-dash').forEach(card => {
    card.addEventListener('click', () => {
      openCompanyDetail(card.dataset.compId);
    });
  });

  // Add change listeners to status dropdowns
  companiesGrid.querySelectorAll('.status-select').forEach(sel => {
    sel.addEventListener('change', (e) => {
      updateCompanyStatus(e.target.dataset.dashStatusId, e.target.value);
    });
  });
}

// ============================================================
// DETAIL VIEW LOGIC
// ============================================================
function openCompanyDetail(companyId) {
  state.selectedCompanyId = companyId;
  state.viewMode = 'detail';
  window.location.hash = companyId;

  const comp = getSelectedCompany();
  state.activeRoleKey = comp.defaultRole || 'real_estate_valuation_advisory';

  // Populate Role Dropdown marking the RECOMMENDED role for this company
  populateRoleSelector(comp.defaultRole);

  // Unified Top Header Update
  detailCompanyName.textContent = comp.name;
  detailPriorityBadge.textContent = comp.priority.toUpperCase();
  detailPriorityBadge.className = `badge-priority badge-${comp.priority}`;
  detailCompanyMeta.innerHTML = `${comp.category} &bull; ${comp.location} &bull; ${comp.channel === 'direct_email' ? `✉️ ${comp.contactTarget}` : `🌐 Portal de empleo`}`;

  const status = state.statuses[comp.id] || 'Pendiente';
  detailStatusSelect.value = status;
  detailStatusSelect.setAttribute('data-val', status);

  // Show/Hide views
  dashboardHeader.style.display = 'none';
  dashboardView.style.display = 'none';
  detailView.style.display = 'flex';
  updateNavState('detail');

  // Render Strategic Briefing Card immediately visible at top of detail view
  renderCompanyBriefing(comp);

  // Render contextual dispatch buttons (Optimized for Webmail - No Mac required)
  renderDispatchButtons(comp);

  // Render current active subtab
  renderDetailWorkspace();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function populateRoleSelector(recommendedRoleKey) {
  const roleKeys = Object.keys(state.profile.roles || {});
  detailRoleSelect.innerHTML = roleKeys.map(key => {
    const roleData = state.profile.roles[key];
    const isRec = key === recommendedRoleKey;
    const isSelected = key === state.activeRoleKey;
    return `
      <option value="${key}" ${isSelected ? 'selected' : ''}>
        ${isRec ? '⭐ [RECOMENDADO] ' : ''}${roleData.title}
      </option>
    `;
  }).join('');
}

function renderDispatchButtons(comp) {
  const isDirect = comp.channel === 'direct_email';

  if (isDirect) {
    // Gmail dispatch button (native Gmail app on Android, webmail fallback on desktop)
    dispatchButtonsGroup.innerHTML = `
      <button id="gmailComposeBtn" class="btn-neo btn-neo-green" title="Abre directamente la app de Gmail con el destinatario, asunto y mensaje listos">
        🚀 Enviar (Gmail)
      </button>
    `;

    document.getElementById('gmailComposeBtn').addEventListener('click', () => {
      openGmail(comp);
    });
  } else {
    // Portal application button
    dispatchButtonsGroup.innerHTML = `
      <a href="${comp.contactTarget}" target="_blank" class="btn-neo btn-neo-green" title="Abrir portal oficial de empleo en nueva pestaña">
        🌐 Ir al Portal Web
      </a>
    `;
  }
}

function renderDetailWorkspace() {
  const comp = getSelectedCompany();

  // Control visibility of document controls strip
  if (state.subTab === 'pitch') {
    docControlsBar.style.display = 'none';
    paperView.style.display = 'none';
    pitchView.style.display = 'block';
    renderPitch(comp);
  } else {
    docControlsBar.style.display = 'flex';
    paperView.style.display = 'block';
    pitchView.style.display = 'none';

    if (state.subTab === 'cv') {
      renderCV(comp);
    } else if (state.subTab === 'letter') {
      renderLetter(comp);
    }
  }
}

// ============================================================
// STRATEGIC BRIEFING CARD (IMMEDIATELY VISIBLE ON DETAIL VIEW)
// ============================================================
function renderCompanyBriefing(company) {
  const briefingEl = document.getElementById('companyBriefingCard');
  if (!briefingEl) return;

  const isCustom = !!company.isCustom;

  briefingEl.innerHTML = `
    <div class="briefing-card-inner">
      <div class="briefing-top-bar">
        <div class="briefing-title-group">
          <span class="briefing-kicker">🏢 Radiografía y Posición Estratégica</span>
          <h3 class="briefing-name">${company.name}</h3>
        </div>
        <div class="briefing-meta-tags">
          <span class="badge-priority badge-${company.priority}">${company.priority.toUpperCase()}</span>
          ${isCustom ? '<span class="badge-custom-offer">✨ Oferta con IA</span>' : ''}
          <button id="toggleBriefingBodyBtn" class="btn-briefing-collapse" title="Minimizar / Expandir">
            <span id="briefingCollapseIcon">▲</span>
          </button>
        </div>
      </div>

      <div class="briefing-body" id="briefingBodyContent">
        <div class="briefing-grid-3">
          
          <!-- Pillar 1: Radiografía -->
          <div class="briefing-col briefing-col-profile">
            <div class="briefing-col-header">
              <span class="briefing-col-icon">🏢</span>
              <h4>Radiografía & Actividad</h4>
            </div>
            <p class="briefing-text">${company.companyInfo || 'Organización con operaciones activas y presencia en el mercado de Málaga y Andalucía.'}</p>
            <div class="briefing-quick-meta">
              <div><strong>📍 Ubicación:</strong> ${company.location}</div>
              <div><strong>👤 Interlocutor:</strong> ${company.contactRoleName || 'Dirección de Personas'}</div>
              <div><strong>📞 Contacto:</strong> ${company.phone || 'Centralita'}</div>
              <div><strong>✉️ Canal:</strong> ${company.channel === 'direct_email' ? `Email (${company.contactTarget})` : 'Portal Web'}</div>
            </div>
          </div>

          <!-- Pillar 2: Momento actual -->
          <div class="briefing-col briefing-col-state">
            <div class="briefing-col-header">
              <span class="briefing-col-icon">📈</span>
              <h4>Momento Actual en Málaga (2026)</h4>
            </div>
            <p class="briefing-text">${company.currentState || 'Fase de consolidación y expansión operativa en la provincia de Málaga.'}</p>
          </div>

          <!-- Pillar 3: Por qué encaja Ignacio -->
          <div class="briefing-col briefing-col-fit">
            <div class="briefing-col-header">
              <span class="briefing-col-icon">🎯</span>
              <h4>Por Qué Es Idónea Su Candidatura</h4>
            </div>
            <p class="briefing-text fit-highlight">${company.whyIgnacioFits || 'Alineación completa entre su formación superior en ADE + Dirección Comercial y 5 años de rigor analítico en Savills.'}</p>
            
            <div class="briefing-strengths-strip">
              <div class="strength-chip">🎓 <strong>ADE + GESCO</strong> (ESIC)</div>
              <div class="strength-chip">⏱️ <strong>5 Años Savills</strong> (Asset & Ops)</div>
              <div class="strength-chip">📊 <strong>Control P&L</strong> y Equipos</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  // Attach toggle
  const toggleBtn = document.getElementById('toggleBriefingBodyBtn');
  const bodyContent = document.getElementById('briefingBodyContent');
  const collapseIcon = document.getElementById('briefingCollapseIcon');
  if (toggleBtn && bodyContent) {
    toggleBtn.addEventListener('click', () => {
      const isHidden = bodyContent.style.display === 'none';
      bodyContent.style.display = isHidden ? 'block' : 'none';
      collapseIcon.textContent = isHidden ? '▲' : '▼';
    });
  }
}

function renderCV(company) {
  const profile = state.profile;
  const roleData = profile.roles[state.activeRoleKey] || profile.roles['area_manager_retail_ops'];

  const photoSrc = window.PHOTO_BASE64 || '/assets/foto.jpg';
  const photoHtml = state.showPhoto
    ? `<div class="header-photo"><img src="${photoSrc}" alt="${profile.personal.name}"></div>`
    : '';

  const experienceHtml = profile.experience.map(exp => {
    let bullets = [];
    if (exp.highlights[state.activeRoleKey]) {
      bullets = exp.highlights[state.activeRoleKey];
    } else if (exp.highlights.all) {
      bullets = exp.highlights.all;
    } else {
      bullets = exp.highlights['area_manager_retail_ops'] || exp.highlights['business_operations_pm'] || [];
    }
    const bulletsHtml = bullets.map(b => `<li>${b}</li>`).join('');
    return `
      <div class="item">
        <div class="item-header">
          <span>${exp.role}</span>
          <span>${exp.period}</span>
        </div>
        <div class="item-subheader">
          <span>${exp.company}</span>
          <span>${exp.location}</span>
        </div>
        <ul>${bulletsHtml}</ul>
      </div>
    `;
  }).join('');

  const educationHtml = profile.education.map(edu => `
    <div class="item">
      <div class="item-header">
        <span>${edu.degree}</span>
        <span>${edu.period}</span>
      </div>
      <div class="item-subheader">
        <span>${edu.institution}</span>
        <span>${edu.location}</span>
      </div>
    </div>
  `).join('');

  const skillsHtml = roleData.skillsCategories.map(sc => `
    <div class="skills-group">
      <strong>${sc.name}:</strong> ${sc.items}
    </div>
  `).join('');

  const proj = profile.projects && profile.projects.length > 0 ? profile.projects[0] : null;
  const projectsHtml = proj ? `
    <section>
      <h2>Proyectos & Iniciativas Destacadas</h2>
      <div class="item">
        <div class="item-header">
          <span>${proj.name}</span>
          <span>Savills</span>
        </div>
        <div class="item-subheader">
          <span>${proj.role}</span>
          <span>Málaga / Andalucía</span>
        </div>
        <ul>
          ${(proj.points || []).map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>
    </section>
  ` : '';

  paperView.innerHTML = `
    <header class="header">
      <div class="header-text">
        <h1>${profile.personal.name}</h1>
        <div class="role-title">${roleData.title}</div>
        <div class="contact-info">
          ${profile.personal.phone} &nbsp;|&nbsp; <a href="mailto:${profile.personal.email}">${profile.personal.email}</a> &nbsp;|&nbsp; ${profile.personal.location} &nbsp;|&nbsp; 
          <a href="${profile.personal.linkedin}" target="_blank">${profile.personal.linkedinDisplay}</a>
        </div>
      </div>
      ${photoHtml}
    </header>

    <section>
      <h2>Perfil Profesional</h2>
      <p class="summary">${company.tailoredSummary || roleData.summary}</p>
    </section>

    <section>
      <h2>Experiencia Laboral</h2>
      ${experienceHtml}
    </section>

    <section>
      <h2>Educación y Formación</h2>
      ${educationHtml}
    </section>

    <section>
      <h2>Habilidades, Competencias e Idiomas</h2>
      ${skillsHtml}
    </section>

    ${projectsHtml}
  `;
}

function renderLetter(company) {
  const profile = state.profile;
  const roleData = profile.roles[state.activeRoleKey] || profile.roles['area_manager_retail_ops'];
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const now = new Date();
  const dateStr = `${now.getDate()} de ${months[now.getMonth()]} de ${now.getFullYear()}`;

  const emailText = company.naturalEmail || '';
  const paragraphs = emailText.split('\n\n').filter(p => p.trim());
  const greeting = paragraphs[0] || 'Estimado/a Responsable de Selección:';
  const bodyParagraphs = paragraphs.length > 2 ? paragraphs.slice(1, -1) : (paragraphs.length > 1 ? [paragraphs[1]] : paragraphs);

  paperView.innerHTML = `
    <header class="header">
      <div class="header-text">
        <h1>${profile.personal.name}</h1>
        <div class="role-title">${roleData.title}</div>
        <div class="contact-info">
          ${profile.personal.phone} &nbsp;|&nbsp; <a href="mailto:${profile.personal.email}">${profile.personal.email}</a> &nbsp;|&nbsp; ${profile.personal.location} &nbsp;|&nbsp; 
          <a href="${profile.personal.linkedin}" target="_blank">${profile.personal.linkedinDisplay}</a>
        </div>
      </div>
    </header>

    <div class="recipient-block" style="margin-bottom: 16px; font-size: 9.2pt; color: #333; line-height: 1.4;">
      <strong>A la atención de:</strong> ${company.contactRoleName || 'Dirección de Personas'}<br>
      <strong>Empresa:</strong> ${company.name}<br>
      <strong>Ubicación:</strong> ${company.location}<br>
      <strong>Fecha:</strong> ${dateStr}
    </div>

    <div class="subject-line" style="font-weight: 700; color: #111; font-size: 10pt; margin-bottom: 14px; padding-bottom: 3px; border-bottom: 1px solid #e2e8f0;">
      Asunto: ${company.emailSubject || `Candidatura ${company.name} | Ignacio Fernández López`}
    </div>

    <div class="letter-body" style="line-height: 1.45; font-size: 9.3pt; color: #262626;">
      <p style="margin-bottom: 10px; font-weight: 600;">${greeting}</p>
      ${bodyParagraphs.map(p => `<p style="margin-bottom: 10px; text-align: justify;">${p.replace(/\n/g, '<br>')}</p>`).join('')}
    </div>

    <div class="signoff" style="margin-top: 20px; font-size: 9.3pt; color: #111; line-height: 1.45;">
      Un cordial saludo,<br><br>
      <strong>${profile.personal.name}</strong><br>
      ${profile.personal.phone} | <a href="mailto:${profile.personal.email}">${profile.personal.email}</a><br>
      <a href="${profile.personal.linkedin}">${profile.personal.linkedinDisplay}</a>
    </div>
  `;
}

function renderPitch(company) {
  const fullPitch = company.naturalEmail || '';

  pitchView.innerHTML = `
    <div class="pitch-header">
      <h3>Propuesta Personalizada: ${company.name}</h3>
      <div class="pitch-meta">
        <div class="pitch-meta-item"><strong>CANAL:</strong> ${company.channel === 'direct_email' ? '✉️ CORREO DIRECTO (Máxima efectividad)' : '🌐 PORTAL CORPORATIVO ATS'}</div>
        <div class="pitch-meta-item"><strong>DESTINATARIO:</strong> ${company.contactTarget} (${company.contactRoleName || 'Dirección de Personas'})</div>
        <div class="pitch-meta-item"><strong>TELÉFONO:</strong> ${company.phone || 'Centralita'}</div>
      </div>
    </div>

    <div class="pitch-field">
      <div class="field-label-row">
        <span class="field-label">Línea de Asunto Recomendada</span>
        <button id="copySubjectBtn" class="btn-neo btn-neo-yellow" style="padding: 4px 10px; font-size: 11px;">📋 Copiar Asunto</button>
      </div>
      <input type="text" id="subjectInput" class="pitch-input" value="${company.emailSubject || `Candidatura ${company.name} | Ignacio Fernández López`}" readonly>
    </div>

    <div class="pitch-field">
      <div class="field-label-row">
        <span class="field-label">Mensaje en tu voz natural (100% Humano y Directo)</span>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button id="copyPitchBtn" class="btn-neo btn-neo-green" style="font-size: 12px; padding: 6px 12px;">
            📋 Copiar Texto
          </button>
        </div>
      </div>
      <textarea id="emailPitchText" class="pitch-textarea">${fullPitch}</textarea>
    </div>

    <div class="pitch-field">
      <span class="field-label" style="display:block; margin-bottom: 8px;">Estrategia de Contacto (Vía Correo Web)</span>
      <div class="strategy-box">
        <strong>💡 Instrucciones de Envío para ${company.name}:</strong><br>
        ${company.channel === 'direct_email' 
          ? `Este contacto se realiza por correo directo a <code>${company.contactTarget}</code>.<br>
             1. Pulsa arriba en <strong>🚀 Enviar (Gmail)</strong>.<br>
             2. Se abrirá la app de Gmail con el destinatario, asunto y mensaje completados.<br>
             3. Adjunta el archivo PDF descargado y pulsa <strong>Enviar</strong>.` 
          : `Accede a la oferta pulsando arriba en <strong>🌐 Ir al Portal Web</strong>.<br>
             1. Pulsa en <strong>📥 Descargar</strong> o <strong>🖨️ Imprimir</strong> para tener tu CV listo.<br>
             2. Pulsa en <strong>📋 Copiar Texto</strong> para pegar la carta adaptada en el formulario web.`}
      </div>
    </div>
  `;

  document.getElementById('copySubjectBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(document.getElementById('subjectInput').value);
    showToast('Asunto copiado al portapapeles');
  });

  document.getElementById('copyPitchBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(document.getElementById('emailPitchText').value);
    showToast('Cuerpo del mensaje copiado al portapapeles');
  });
}

// ============================================================
// DOWNLOADS & GMAIL DISPATCH (CV + CARTA DE PRESENTACIÓN)
// ============================================================
function getAssetPath(relativePath) {
  const cleanRel = relativePath.replace(/^\//, '');
  if (window.location.pathname.includes('/src/')) {
    return '../' + cleanRel;
  }
  return './' + cleanRel;
}

function downloadCompanyCvOnly(company) {
  if (company.isCustom) {
    showToast(`Preparando PDF para ${company.name}... Usa "Guardar como PDF".`);
    window.print();
    return;
  }
  const cvPdf = `CV_Ignacio_Fernandez_${company.id}.pdf`;
  const link = document.createElement('a');
  link.href = getAssetPath(`dist/${company.id}/${cvPdf}`);
  link.download = cvPdf;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast(`Descargando CV (${cvPdf})...`);
}

function downloadCompanyCvAndLetter(company) {
  if (company.isCustom) {
    showToast(`Preparando PDF para ${company.name}... Usa "Guardar como PDF".`);
    window.print();
    return;
  }
  const cvPdf = `CV_Ignacio_Fernandez_${company.id}.pdf`;
  const letterPdf = `Carta_Presentacion_${company.id}.pdf`;

  // 1. Download CV PDF
  const link1 = document.createElement('a');
  link1.href = getAssetPath(`dist/${company.id}/${cvPdf}`);
  link1.download = cvPdf;
  document.body.appendChild(link1);
  link1.click();
  document.body.removeChild(link1);

  // 2. Download Letter PDF with slight delay for mobile browser compatibility
  setTimeout(() => {
    const link2 = document.createElement('a');
    link2.href = getAssetPath(`dist/${company.id}/${letterPdf}`);
    link2.download = letterPdf;
    document.body.appendChild(link2);
    link2.click();
    document.body.removeChild(link2);
  }, 350);

  showToast(`Descargando CV y Carta de Presentación de ${company.name}...`);
}

function openGmail(company) {
  const emailText = document.getElementById('emailPitchText')?.value || company.naturalEmail || '';
  const to = company.channel === 'direct_email' ? company.contactTarget : '';
  const subject = company.emailSubject || `Candidatura ${company.name} | Ignacio Fernández López`;

  if (company.isCustom) {
    showToast('Preparando envío por Gmail...');
  } else {
    downloadCompanyCvOnly(company);
  }
  updateCompanyStatus(company.id, 'Enviado');

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) {
    // Native Gmail App on Android triggered via mailto:
    window.location.href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailText)}`;
  } else {
    // Desktop Gmail Web compose tab
    const url = `https://mail.google.com/mail/?authuser=ignflopez@gmail.com&view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailText)}`;
    window.open(url, '_blank');
  }
  showToast('Abriendo Gmail con el mensaje personalizado...');
}

// ============================================================
// MOBILE BOTTOM NAVIGATION BAR
// ============================================================
function setupBottomNav() {
  if (navBtnDashboard) {
    navBtnDashboard.addEventListener('click', () => {
      showDashboard();
      updateNavState('dashboard');
    });
  }

  if (navBtnAddOffer) {
    navBtnAddOffer.addEventListener('click', () => {
      openAddOfferModal(false);
    });
  }

  if (navBtnMetrics) {
    navBtnMetrics.addEventListener('click', () => {
      if (state.viewMode !== 'dashboard') {
        showDashboard();
      }
      updateNavState('dashboard');
      const metricsEl = document.getElementById('metricsStrip');
      if (metricsEl) {
        metricsEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        metricsEl.style.transition = 'outline 0.3s ease';
        metricsEl.style.outline = '4px solid var(--neo-yellow)';
        setTimeout(() => { metricsEl.style.outline = 'none'; }, 1500);
      }
    });
  }

  if (navBtnAiSettings) {
    navBtnAiSettings.addEventListener('click', () => {
      openAddOfferModal(true);
    });
  }
}

function updateNavState(mode) {
  if (!navBtnDashboard) return;
  if (mode === 'dashboard') {
    navBtnDashboard.classList.add('active');
  } else {
    navBtnDashboard.classList.remove('active');
  }
}

// ============================================================
// ADD OFFER / LINKEDIN WITH GEMINI FLASH (MODELO 3.8 / FLASH)
// ============================================================
function setupAddOfferModal() {
  const savedApiKey = localStorage.getItem('gemini_api_key') || '';
  const savedModel = localStorage.getItem('gemini_model') || 'gemini-2.5-flash';

  if (geminiApiKeyInput) geminiApiKeyInput.value = savedApiKey;
  if (geminiModelSelect) geminiModelSelect.value = savedModel;
  updateAiStatusBadge();

  if (openAddOfferBtn) {
    openAddOfferBtn.addEventListener('click', () => openAddOfferModal(false));
  }

  if (closeAddOfferModalBtn) {
    closeAddOfferModalBtn.addEventListener('click', closeAddOfferModal);
  }

  if (cancelAddOfferBtn) {
    cancelAddOfferBtn.addEventListener('click', closeAddOfferModal);
  }

  if (addOfferModal) {
    addOfferModal.addEventListener('click', (e) => {
      if (e.target === addOfferModal) closeAddOfferModal();
    });
  }

  if (toggleAiConfigBtn) {
    toggleAiConfigBtn.addEventListener('click', () => {
      const isHidden = aiConfigBody.style.display === 'none';
      aiConfigBody.style.display = isHidden ? 'flex' : 'none';
      aiConfigChevron.textContent = isHidden ? '▲' : '▼';
    });
  }

  if (geminiApiKeyInput) {
    geminiApiKeyInput.addEventListener('input', (e) => {
      const key = e.target.value.trim();
      localStorage.setItem('gemini_api_key', key);
      updateAiStatusBadge();
    });
  }

  if (geminiModelSelect) {
    geminiModelSelect.addEventListener('change', (e) => {
      localStorage.setItem('gemini_model', e.target.value);
      updateAiStatusBadge();
    });
  }

  if (btnAutoScanUrl) {
    btnAutoScanUrl.addEventListener('click', handleAutoScanUrl);
  }

  if (btnSubmitAddOffer) {
    btnSubmitAddOffer.addEventListener('click', handleProcessAddOffer);
  }
}

function updateAiStatusBadge() {
  const key = localStorage.getItem('gemini_api_key') || '';
  const model = localStorage.getItem('gemini_model') || 'gemini-2.5-flash';

  if (displayAiModel) {
    displayAiModel.textContent = model.includes('3.8') ? 'Gemini 3.8 Flash' : 'Gemini 2.5 Flash';
  }

  if (apiStatusBadge) {
    if (key) {
      apiStatusBadge.textContent = '🔑 API Key lista';
      apiStatusBadge.style.color = '#15803d';
    } else {
      apiStatusBadge.textContent = '⚙️ Sin API Key (Modo Local)';
      apiStatusBadge.style.color = '#b45309';
    }
  }
}

function openAddOfferModal(openSettings = false) {
  if (!addOfferModal) return;
  addOfferModal.style.display = 'flex';
  if (openSettings && aiConfigBody) {
    aiConfigBody.style.display = 'flex';
    if (aiConfigChevron) aiConfigChevron.textContent = '▲';
    if (geminiApiKeyInput) geminiApiKeyInput.focus();
  } else {
    if (inputOfferUrl) inputOfferUrl.focus();
  }
}

function closeAddOfferModal() {
  if (!addOfferModal) return;
  addOfferModal.style.display = 'none';
  if (aiScanProgress) aiScanProgress.style.display = 'none';
  if (btnSubmitAddOffer) btnSubmitAddOffer.disabled = false;
}

async function handleAutoScanUrl() {
  const url = inputOfferUrl.value.trim();
  if (!url) {
    showToast('Por favor escribe o pega un enlace primero');
    return;
  }

  btnAutoScanUrl.disabled = true;
  btnAutoScanUrl.innerHTML = '⏳ Escaneando...';

  try {
    const jinaUrl = `https://r.jina.ai/${encodeURI(url)}`;
    const res = await fetch(jinaUrl, {
      headers: { 'Accept': 'text/plain' }
    });

    if (res.ok) {
      const text = await res.text();
      if (text.includes('LinkedIn: inicio de sesión') || text.includes('Sign In') || text.includes('authwall')) {
        showToast('LinkedIn requiere login. Copia el texto y pégalo abajo.');
        inputOfferText.placeholder = 'LinkedIn requiere login. Copia y pega aquí el texto de la vacante...';
        inputOfferText.focus();
      } else {
        inputOfferText.value = text.substring(0, 5000);
        showToast('✅ Información extraída de la vacante.');
      }
    } else {
      showToast('No se pudo acceder automáticamente al enlace. Copia el texto abajo.');
    }
  } catch (err) {
    console.warn('Auto-scan warning:', err);
    showToast('No se pudo leer el enlace directamente. Copia y pega el texto de la oferta.');
  } finally {
    btnAutoScanUrl.disabled = false;
    btnAutoScanUrl.innerHTML = '🔍 Auto-Escanear';
  }
}

async function handleProcessAddOffer() {
  const url = inputOfferUrl.value.trim();
  const text = inputOfferText.value.trim();

  if (!url && !text) {
    showToast('Por favor introduce un enlace de LinkedIn o el texto de la oferta');
    return;
  }

  aiScanProgress.style.display = 'flex';
  btnSubmitAddOffer.disabled = true;
  aiProgressText.textContent = 'Analizando requisitos de la oferta...';

  const apiKey = localStorage.getItem('gemini_api_key') || '';
  const model = localStorage.getItem('gemini_model') || 'gemini-2.5-flash';

  const contentToAnalyze = (text ? `Texto de la oferta:\n${text}\n\n` : '') + (url ? `Enlace de la oferta: ${url}` : '');

  let parsedResult = null;

  if (apiKey) {
    try {
      aiProgressText.textContent = `Analizando con ${model}...`;
      const geminiPrompt = `
Eres un Headhunter Senior y experto consultor de selección en España.
Tu tarea es analizar la siguiente oferta de empleo o empresa y adaptar minuciosamente la candidatura de Ignacio Fernández López (Nacho).

Perfil de Ignacio:
- Graduado en ADE (Universidad de Málaga)
- Máster GESCO en Dirección Comercial y Marketing (ESIC Business & Marketing School)
- Máster Savills University
- 5 años de experiencia consolidada en Savills Málaga (Consultoría, Valoraciones RICS/ECO masivas, Due Diligence, Project Management, Asset Management, Auditorías técnicas)
- Busca roles de responsabilidad y liderazgo en Málaga / Costa del Sol:
  * Gerente de Supermercados / Retail Operations / Area Manager (gestión de tiendas, P&L, control de mermas, equipos, logística)
  * Real Estate Valuation & Advisory
  * Responsable de Expansión & Localizaciones
  * Dirección de Operaciones & Servicios
  * Desarrollo de Negocio Proptech & RE
  * Análisis de Inversiones / Real Estate Capital Markets
  * Technical Property & Facility Manager

Oferta o empresa a analizar:
"""
${contentToAnalyze}
"""

Responde EXCLUSIVAMENTE con un JSON válido (sin backticks markdown ni texto fuera del JSON) con esta estructura exacta:
{
  "name": "Nombre exacto de la empresa",
  "category": "Sector o actividad de la empresa (ej: Supermercados & Gran Distribución / Real Estate / Logística / Proptech)",
  "location": "Ubicación (ej: Málaga / Costa del Sol / Híbrido)",
  "priority": "alta",
  "contactTarget": "email de contacto si aparece, o enlace de la oferta",
  "channel": "direct_email o portal",
  "companyInfo": "Radiografía clara y modelo de negocio de la empresa (2-3 frases concisas)",
  "currentState": "Momento actual, retos 2026, aperturas o contexto en Málaga (2 frases concisas)",
  "whyIgnacioFits": "Argumento de impacto de por qué Ignacio encaja al 100% en esta posición y empresa (3 frases con métricas y valor)",
  "defaultRole": "slug del rol: area_manager_retail_ops, real_estate_valuation_advisory, expansion_location_manager, operations_director_services, proptech_business_development, investment_analyst_capital_markets, technical_property_manager",
  "tailoredSummary": "Resumen ejecutivo para el CV de 3-4 líneas totalmente adaptado a los requisitos de esta oferta",
  "tailoredCoverLetter": "Estimado/a Responsable de Selección:\\n\\n[Párrafo 1: Motivación y alineación con la vacante...]\\n\\n[Párrafo 2: Logros cuantitativos en ADE + Savills Málaga aplicables al puesto...]\\n\\n[Párrafo 3: Por qué puedo aportar valor inmediato y propuesta de reunión...]\\n\\nUn cordial saludo,\\nIgnacio Fernández López"
}
`;

      let targetModel = model;
      if (targetModel.includes('3.8')) targetModel = 'gemini-2.5-flash';

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${apiKey}`;
      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: geminiPrompt }] }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: 'application/json'
          }
        })
      });

      if (!response.ok) {
        const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        const fbRes = await fetch(fallbackUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: geminiPrompt }] }],
            generationConfig: { temperature: 0.2, responseMimeType: 'application/json' }
          })
        });

        if (fbRes.ok) {
          const fbData = await fbRes.json();
          const rawText = fbData.candidates[0].content.parts[0].text;
          parsedResult = JSON.parse(rawText.replace(/```json/g, '').replace(/```/g, '').trim());
        } else {
          throw new Error('Error al conectar con la API de Gemini');
        }
      } else {
        const data = await response.json();
        const rawText = data.candidates[0].content.parts[0].text;
        parsedResult = JSON.parse(rawText.replace(/```json/g, '').replace(/```/g, '').trim());
      }
    } catch (err) {
      console.warn('Error en Gemini Flash, recurriendo a análisis inteligente heurístico:', err);
      showToast('Aviso: Error en API Key de Gemini. Se aplicó el Analizador Heurístico Integrado.');
      parsedResult = fallbackParseOffer(url, text);
    }
  } else {
    aiProgressText.textContent = 'Analizando con el Analizador Inteligente Local...';
    await new Promise(r => setTimeout(r, 600));
    parsedResult = fallbackParseOffer(url, text);
  }

  aiProgressText.textContent = 'Guardando candidatura y sincronizando en la nube...';

  // Build Company Object
  const safeName = parsedResult.name || 'Nueva Oferta';
  const slugId = 'custom-' + (safeName.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'oferta') + '-' + Date.now().toString(36).substr(-4);
  const newCompany = {
    id: slugId,
    name: safeName,
    category: parsedResult.category || 'Oportunidad Estratégica',
    priority: parsedResult.priority || 'alta',
    location: parsedResult.location || 'Málaga, España',
    phone: 'Centralita / LinkedIn',
    contactRoleName: 'Dirección de Personas / Selección',
    contactTarget: parsedResult.contactTarget || url || 'https://www.linkedin.com',
    channel: parsedResult.channel === 'direct_email' ? 'direct_email' : 'portal',
    defaultRole: parsedResult.defaultRole || 'area_manager_retail_ops',
    companyInfo: parsedResult.companyInfo,
    currentState: parsedResult.currentState,
    whyIgnacioFits: parsedResult.whyIgnacioFits,
    emailSubject: `Candidatura ${safeName} | Ignacio Fernández López (ADE + Savills)`,
    naturalEmail: parsedResult.tailoredCoverLetter || '',
    tailoredSummary: parsedResult.tailoredSummary || '',
    isCustom: true,
    createdAt: new Date().toISOString()
  };

  // Add to custom companies and state
  state.customCompanies.unshift(newCompany);
  state.companies.unshift(newCompany);
  state.statuses[newCompany.id] = 'Pendiente';

  localStorage.setItem('cv_app_ignacio_custom_companies', JSON.stringify(state.customCompanies));
  localStorage.setItem('cv_app_ignacio_statuses', JSON.stringify(state.statuses));

  // Sync with cloud
  saveStatusToCloud(newCompany.id, 'Pendiente');

  // Reset form
  inputOfferUrl.value = '';
  inputOfferText.value = '';
  closeAddOfferModal();

  // Open detail view
  renderDashboard();
  openCompanyDetail(newCompany.id);
  showToast(`✨ ¡Oferta "${newCompany.name}" analizada y guardada!`);
}

function fallbackParseOffer(url, text) {
  let companyName = "Empresa Estratégica";
  let category = "Retail & Supermercados";
  let defaultRole = 'area_manager_retail_ops';

  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length > 0) {
    companyName = lines[0].replace(/^(oferta|vacante|empleo|puesto):?/i, '').trim().substring(0, 45);
  }

  const lower = (text + ' ' + url).toLowerCase();
  if (lower.includes('supermercado') || lower.includes('tienda') || lower.includes('retail') || lower.includes('distribucion') || lower.includes('gerente')) {
    category = 'Supermercados & Gran Distribución';
    defaultRole = 'area_manager_retail_ops';
  } else if (lower.includes('valoracion') || lower.includes('tasacion') || lower.includes('rics') || lower.includes('eco')) {
    category = 'Valoraciones & Real Estate';
    defaultRole = 'real_estate_valuation_advisory';
  } else if (lower.includes('expansion') || lower.includes('locales') || lower.includes('franquicia')) {
    category = 'Expansión & Real Estate Comercial';
    defaultRole = 'expansion_location_manager';
  } else if (lower.includes('proptech') || lower.includes('saas') || lower.includes('crm') || lower.includes('software')) {
    category = 'Proptech & Nuevas Tecnologías';
    defaultRole = 'proptech_business_development';
  } else if (lower.includes('inversion') || lower.includes('capital') || lower.includes('financiero') || lower.includes('asset')) {
    category = 'Inversión & Capital Markets';
    defaultRole = 'investment_analyst_capital_markets';
  } else {
    category = 'Operaciones & Gestión';
    defaultRole = 'operations_director_services';
  }

  if (url) {
    try {
      const u = new URL(url);
      if (u.hostname.includes('linkedin.com')) {
        const parts = u.pathname.split('/').filter(Boolean);
        const compIdx = parts.indexOf('company');
        if (compIdx !== -1 && parts[compIdx + 1]) {
          companyName = parts[compIdx + 1].replace(/[-_]/g, ' ').toUpperCase();
        }
      } else {
        companyName = u.hostname.replace('www.', '').split('.')[0].toUpperCase();
      }
    } catch (e) {}
  }

  return {
    name: companyName,
    category: category,
    location: "Málaga / Costa del Sol",
    priority: "alta",
    contactTarget: url || "portal de empleo",
    channel: (url && url.includes('@')) ? 'direct_email' : 'portal',
    defaultRole: defaultRole,
    companyInfo: `Organización con actividad en el sector de ${category} con proyectos activos y requerimientos de gestión operativa en la provincia de Málaga.`,
    currentState: `Fase de consolidación de operaciones e implantación de objetivos estratégicos 2026 en el mercado malagueño.`,
    whyIgnacioFits: `Ignacio aporta doble titulación en ADE y Dirección Comercial (ESIC) sumada a 5 años de rigor corporativo en Savills Málaga gestionando activos, cuentas de resultados y equipos técnicos.`,
    tailoredSummary: `Profesional con 5 años de trayectoria en Savills Málaga, graduado en ADE y Máster en Dirección Comercial (ESIC). Especializado en optimización de operaciones, gestión de cuentas de resultados y liderazgo de equipos en entornos de alto rendimiento.`,
    tailoredCoverLetter: `Estimado/a Responsable de Selección de ${companyName}:\n\nLe escribo para presentarle mi candidatura para la posición en ${companyName}. Con 5 años de trayectoria corporativa en Savills Málaga y formación superior en ADE y Dirección Comercial (ESIC), he coordinado auditorías técnicas, optimización de cuentas de resultados y supervisión de equipos con un 100% de cumplimiento en plazos.\n\nMi objetivo actual es volcar este rigor analítico y capacidad organizativa en ${companyName}, garantizando control operativo y superación de objetivos desde el primer día.\n\nEstaré encantado de mantener una entrevista para detallar cómo puedo sumar valor a su equipo.\n\nUn cordial saludo,\nIgnacio Fernández López`
  };
}

// Start
init();
}
