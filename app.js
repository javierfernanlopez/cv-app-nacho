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
  subTab: 'cv', // 'cv' | 'letter'
  showPhoto: true,
  isEditing: false,
  filter: 'Pendiente',
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
const detailDiscardBtn = document.getElementById('detailDiscardBtn');
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
const toastEl = document.getElementById('toast');

// Bottom Nav DOM Elements (3 Views: Pendientes | Añadir | Solicitados)
const mobileBottomNav = document.getElementById('mobileBottomNav');
const navBtnPending = document.getElementById('navBtnPending');
const navBtnAddOffer = document.getElementById('navBtnAddOffer');
const navBtnSent = document.getElementById('navBtnSent');
const navPendingBadge = document.getElementById('navPendingBadge');
const navSentBadge = document.getElementById('navSentBadge');

// Add Offer Modal DOM Elements
const addOfferModal = document.getElementById('addOfferModal');
const closeAddOfferModalBtn = document.getElementById('closeAddOfferModalBtn');
const cancelAddOfferBtn = document.getElementById('cancelAddOfferBtn');
const btnSubmitAddOffer = document.getElementById('btnSubmitAddOffer');
const btnAutoScanUrl = document.getElementById('btnAutoScanUrl');
const inputOfferUrl = document.getElementById('inputOfferUrl');
const inputOfferCompany = document.getElementById('inputOfferCompany');
const inputOfferRole = document.getElementById('inputOfferRole');
const inputOfferText = document.getElementById('inputOfferText');
const aiScanProgress = document.getElementById('aiScanProgress');
const aiProgressText = document.getElementById('aiProgressText');

// Offer Description Card in Detail View
const companyOfferDescCard = document.getElementById('companyOfferDescCard');
const offerDescCardRole = document.getElementById('offerDescCardRole');
const offerDescTextContent = document.getElementById('offerDescTextContent');
const toggleOfferDescBtn = document.getElementById('toggleOfferDescBtn');
const offerDescCollapseIcon = document.getElementById('offerDescCollapseIcon');
const offerDescBodyContent = document.getElementById('offerDescBodyContent');

// Permanent Gemini AI Configuration
const DEFAULT_GEMINI_API_KEY = (typeof atob === 'function') 
  ? atob('QVEuQWI4Uk42SUpDSDdiTVRHQzNUdjVnQ1haQmxCd21GbGZ6TjlRdmVqcnhLMEhxSFVBZUE=')
  : Buffer.from('QVEuQWI4Uk42SUpDSDdiTVRHQzNUdjVnQ1haQmxCd21GbGZ6TjlRdmVqcnhLMEhxSFVBZUE=', 'base64').toString('utf-8');

// Resilient AI Model Pipeline: Prioritizes active, high-quota models with instant fallback
const AI_GENERATION_MODELS = [
  'gemini-3.6-flash',
  'gemini-3.1-flash-lite',
  'gemini-3.8-flash',
  'gemini-3.7-flash',
  'gemini-3.5-flash',
  'gemini-flash-latest'
];

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
      if (state.filter === 'Pendiente') updateNavState('pending');
      else if (state.filter === 'Enviado') updateNavState('sent');
      else updateNavState('none');
      renderDashboard();
    });
  });

  // Detail Status Selector
  detailStatusSelect.addEventListener('change', (e) => {
    updateCompanyStatus(state.selectedCompanyId, e.target.value);
  });

  // Detail Nav Tabs (CV / Letter)
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

  // Discard Button in Detail View
  if (detailDiscardBtn) {
    detailDiscardBtn.addEventListener('click', toggleDiscardCurrentCompany);
  }

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
    updateDiscardButtonState(status);
  }

  saveStatusToCloud(companyId, status);
}

function toggleDiscardCurrentCompany() {
  const comp = getSelectedCompany();
  if (!comp) return;
  const currentStatus = state.statuses[comp.id] || 'Pendiente';
  const newStatus = currentStatus === 'Descartado' ? 'Pendiente' : 'Descartado';
  updateCompanyStatus(comp.id, newStatus);
  showToast(newStatus === 'Descartado' ? 'Candidatura marcada como Descartada' : 'Candidatura reactivada como Pendiente');
}

function updateDiscardButtonState(status) {
  if (!detailDiscardBtn) return;
  if (status === 'Descartado') {
    detailDiscardBtn.innerHTML = '<span class="material-symbols-outlined">undo</span> Reactivar';
    detailDiscardBtn.className = 'btn-neo btn-neo-yellow is-discarded';
    detailDiscardBtn.title = 'Reactivar esta candidatura (marcar como Pendiente)';
  } else {
    detailDiscardBtn.innerHTML = '<span class="material-symbols-outlined">cancel</span> Descartar';
    detailDiscardBtn.className = 'btn-neo btn-neo-pink';
    detailDiscardBtn.title = 'Descartar esta candidatura';
  }
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
    badge.innerHTML = '<span class="material-symbols-outlined spin-icon" style="font-size: 13px;">sync</span> Sincronizando...';
  } else if (status === 'synced') {
    badge.className = 'badge-sync';
    badge.innerHTML = '<span class="material-symbols-outlined" style="font-size: 13px;">cloud_done</span> Nube sincronizada';
  } else {
    badge.className = 'badge-sync offline';
    badge.innerHTML = '<span class="material-symbols-outlined" style="font-size: 13px;">cloud_off</span> Guardado local';
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
  if (state.filter === 'Enviado') {
    updateNavState('sent');
  } else if (state.filter === 'Pendiente') {
    updateNavState('pending');
  } else {
    updateNavState('none');
  }
  renderDashboard();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderDashboard() {
  // Calculate Metrics
  const total = state.companies.length;
  let sentCount = 0;
  let discardedCount = 0;
  let highCount = 0;
  let directCount = 0;
  let portalCount = 0;

  state.companies.forEach(c => {
    const status = state.statuses[c.id] || 'Pendiente';
    if (status === 'Enviado') sentCount++;
    if (status === 'Descartado') discardedCount++;
    if (c.priority === 'alta' && status !== 'Descartado') highCount++;
    if (c.channel === 'direct_email') directCount++;
    if (c.channel === 'portal') portalCount++;
  });

  const pendingCount = Math.max(0, total - sentCount - discardedCount);
  metricTotal.textContent = total;
  metricSent.textContent = `${sentCount} / ${total}`;
  metricPending.textContent = pendingCount;
  metricHigh.textContent = highCount;
  metricChannels.textContent = `${directCount} Directo / ${portalCount} Web`;
  const allPill = document.querySelector('.pill-filter[data-filter="all"]');
  if (allPill) allPill.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px;">apps</span> TODAS (${total})`;

  const discardedPill = document.querySelector('.pill-filter[data-filter="Descartado"]');
  if (discardedPill) discardedPill.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px;">cancel</span> DESCARTADAS (${discardedCount})`;

  // Update Bottom Navbar badges and active status
  if (navPendingBadge) navPendingBadge.textContent = pendingCount;
  if (navSentBadge) navSentBadge.textContent = sentCount;
  if (state.filter === 'Pendiente') {
    updateNavState('pending');
  } else if (state.filter === 'Enviado') {
    updateNavState('sent');
  } else {
    updateNavState('none');
  }

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
    if (state.filter === 'alta') return c.priority === 'alta' && currentStatus !== 'Descartado';
    if (state.filter === 'direct_email') return c.channel === 'direct_email' && currentStatus !== 'Descartado';
    if (state.filter === 'portal') return c.channel === 'portal' && currentStatus !== 'Descartado';
    if (state.filter === 'Pendiente') return currentStatus === 'Pendiente';
    if (state.filter === 'Enviado') return currentStatus === 'Enviado';
    if (state.filter === 'En Proceso') return currentStatus === 'En Proceso' || currentStatus === 'Entrevista';
    if (state.filter === 'Descartado') return currentStatus === 'Descartado';

    return true;
  });

  // Render cards (Clean & compact, intelligence is viewed when clicking into the company)
  companiesGrid.innerHTML = filtered.map(comp => {
    const status = state.statuses[comp.id] || 'Pendiente';
    const roleData = state.profile.roles[comp.defaultRole || 'real_estate_valuation_advisory'] || state.profile.roles['area_manager_retail_ops'];
    const isDirect = comp.channel === 'direct_email';

    return `
      <div class="company-card-dash ${status === 'Descartado' ? 'card-is-discarded' : ''}" data-comp-id="${comp.id}">
        <div>
          <div class="card-dash-top">
            <h3 class="card-dash-title">${comp.name}</h3>
            <div style="display: flex; align-items: center; gap: 4px;">
              <span class="badge-priority badge-${comp.priority}">${comp.priority.toUpperCase()}</span>
              ${comp.isCustom ? '<span class="badge-custom-offer"><span class="material-symbols-outlined" style="font-size: 11px;">auto_awesome</span> IA</span>' : ''}
              ${status === 'Descartado' ? '<span class="badge-priority" style="background:#fee2e2; color:#991b1b; border-color:#f87171;">DESCARTADA</span>' : ''}
            </div>
          </div>

          <div class="card-dash-category">${comp.category}</div>

          <div class="card-dash-meta">
            <div class="card-meta-line">
              <strong><span class="material-symbols-outlined" style="font-size: 13px;">location_on</span> Ubicación:</strong> <span>${comp.location}</span>
            </div>
            <div class="card-meta-line" style="flex-direction: column; align-items: flex-start; gap: 2px;">
              <strong><span class="material-symbols-outlined" style="font-size: 13px;">work</span> Rol Estratégico:</strong>
              <span class="badge-rec-role">[Recomendado] ${roleData.title}</span>
            </div>
            <div class="card-meta-line" style="margin-top: 4px;">
              <strong>Canal:</strong> 
              <span class="card-meta-channel">
                ${isDirect ? `<span class="material-symbols-outlined" style="font-size: 13px;">mail</span> Email Directo (${comp.contactTarget})` : `<span class="material-symbols-outlined" style="font-size: 13px;">language</span> Portal Web`}
              </span>
            </div>
          </div>
        </div>

        <div class="card-dash-footer">
          <select class="status-select" data-dash-status-id="${comp.id}" data-val="${status}" onclick="event.stopPropagation()">
            <option value="Pendiente" ${status === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
            <option value="Enviado" ${status === 'Enviado' ? 'selected' : ''}>Enviado</option>
            <option value="En Proceso" ${status === 'En Proceso' ? 'selected' : ''}>En Proceso</option>
            <option value="Entrevista" ${status === 'Entrevista' ? 'selected' : ''}>Entrevista</option>
            <option value="Descartado" ${status === 'Descartado' ? 'selected' : ''}>Descartado</option>
          </select>

          <div class="card-dash-actions">
            <button class="btn-neo ${status === 'Descartado' ? 'btn-dash-restore' : 'btn-dash-discard'}" data-dash-discard="${comp.id}" title="${status === 'Descartado' ? 'Reactivar oferta' : 'Descartar oferta'}" onclick="event.stopPropagation()">
              <span class="material-symbols-outlined" style="font-size: 13px;">${status === 'Descartado' ? 'undo' : 'cancel'}</span>
              <span>${status === 'Descartado' ? 'Reactivar' : 'Descartar'}</span>
            </button>

            <button class="btn-neo btn-neo-yellow" style="font-size: 11px; padding: 6px 11px;" data-open-comp="${comp.id}">
              <span class="material-symbols-outlined" style="font-size: 13px;">visibility</span> Ver Pack
            </button>
          </div>
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

  // Add click listeners for discard buttons on cards
  companiesGrid.querySelectorAll('[data-dash-discard]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const compId = btn.dataset.dashDiscard;
      const curStatus = state.statuses[compId] || 'Pendiente';
      const newStatus = curStatus === 'Descartado' ? 'Pendiente' : 'Descartado';
      updateCompanyStatus(compId, newStatus);
      showToast(newStatus === 'Descartado' ? 'Candidatura marcada como Descartada' : 'Candidatura reactivada como Pendiente');
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
  detailCompanyMeta.innerHTML = `${comp.category} &bull; ${comp.location} &bull; ${comp.channel === 'direct_email' ? `<span class="material-symbols-outlined" style="font-size: 13px;">mail</span> ${comp.contactTarget}` : `<span class="material-symbols-outlined" style="font-size: 13px;">language</span> Portal de empleo`}`;

  const status = state.statuses[comp.id] || 'Pendiente';
  detailStatusSelect.value = status;
  detailStatusSelect.setAttribute('data-val', status);
  updateDiscardButtonState(status);

  // Show/Hide views
  dashboardHeader.style.display = 'none';
  dashboardView.style.display = 'none';
  detailView.style.display = 'flex';
  updateNavState('detail');

  // Render Strategic Briefing Card immediately visible at top of detail view
  renderCompanyBriefing(comp);
  renderCompanyOfferDesc(comp);

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
        ${isRec ? '[RECOMENDADO] ' : ''}${roleData.title}
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
        <span class="material-symbols-outlined" style="font-size: 14px;">send</span> Enviar (Gmail)
      </button>
    `;

    document.getElementById('gmailComposeBtn').addEventListener('click', () => {
      openGmail(comp);
    });
  } else {
    // Portal application button
    dispatchButtonsGroup.innerHTML = `
      <a href="${comp.contactTarget}" target="_blank" class="btn-neo btn-neo-green" title="Abrir portal oficial de empleo en nueva pestaña">
        <span class="material-symbols-outlined" style="font-size: 14px;">open_in_new</span> Ir al Portal Web
      </a>
    `;
  }
}

function renderDetailWorkspace() {
  const comp = getSelectedCompany();

  docControlsBar.style.display = 'flex';
  paperView.style.display = 'block';

  if (state.subTab === 'letter') {
    renderLetter(comp);
  } else {
    renderCV(comp);
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
          <span class="briefing-kicker"><span class="material-symbols-outlined" style="font-size: 15px;">domain</span> Radiografía y Posición Estratégica</span>
          <h3 class="briefing-name">${company.name}</h3>
        </div>
        <div class="briefing-meta-tags">
          <span class="badge-priority badge-${company.priority}">${company.priority.toUpperCase()}</span>
          ${isCustom ? '<span class="badge-custom-offer"><span class="material-symbols-outlined" style="font-size: 11px;">auto_awesome</span> Oferta adaptada</span>' : ''}
          <button id="toggleBriefingBodyBtn" class="btn-briefing-collapse" title="Minimizar / Expandir">
            <span id="briefingCollapseIcon" class="material-symbols-outlined" style="font-size: 16px;">expand_less</span>
          </button>
        </div>
      </div>

      <div class="briefing-body" id="briefingBodyContent">
        <div class="briefing-grid-3">
          
          <!-- Pillar 1: Radiografía -->
          <div class="briefing-col briefing-col-profile">
            <div class="briefing-col-header">
              <span class="briefing-col-icon"><span class="material-symbols-outlined" style="font-size: 16px;">domain</span></span>
              <h4>Radiografía & Actividad</h4>
            </div>
            <p class="briefing-text">${company.companyInfo || 'Organización con operaciones activas y presencia en el mercado de Málaga y Andalucía.'}</p>
            <div class="briefing-quick-meta">
              <div><strong><span class="material-symbols-outlined" style="font-size: 13px;">location_on</span> Ubicación:</strong> ${company.location}</div>
              <div><strong><span class="material-symbols-outlined" style="font-size: 13px;">person</span> Interlocutor:</strong> ${company.contactRoleName || 'Dirección de Personas'}</div>
              <div><strong><span class="material-symbols-outlined" style="font-size: 13px;">phone</span> Contacto:</strong> ${company.phone || 'Centralita'}</div>
              <div><strong><span class="material-symbols-outlined" style="font-size: 13px;">mail</span> Canal:</strong> ${company.channel === 'direct_email' ? `Email (${company.contactTarget})` : 'Portal Web'}</div>
            </div>
          </div>

          <!-- Pillar 2: Momento actual -->
          <div class="briefing-col briefing-col-state">
            <div class="briefing-col-header">
              <span class="briefing-col-icon"><span class="material-symbols-outlined" style="font-size: 16px;">trending_up</span></span>
              <h4>Momento Actual en Málaga (2026)</h4>
            </div>
            <p class="briefing-text">${company.currentState || 'Fase de consolidación y expansión operativa en la provincia de Málaga.'}</p>
          </div>

          <!-- Pillar 3: Por qué encaja Ignacio -->
          <div class="briefing-col briefing-col-fit">
            <div class="briefing-col-header">
              <span class="briefing-col-icon"><span class="material-symbols-outlined" style="font-size: 16px;">ads_click</span></span>
              <h4>Por Qué Es Idónea Su Candidatura</h4>
            </div>
            <p class="briefing-text fit-highlight">${company.whyIgnacioFits || 'Alineación completa entre su formación superior en ADE + Dirección Comercial y 5 años de rigor analítico en Savills.'}</p>
            
            <div class="briefing-strengths-strip">
              <div class="strength-chip"><span class="material-symbols-outlined" style="font-size: 12px;">school</span> <strong>ADE + GESCO</strong> (ESIC)</div>
              <div class="strength-chip"><span class="material-symbols-outlined" style="font-size: 12px;">history</span> <strong>5 Años Savills</strong> (Asset & Ops)</div>
              <div class="strength-chip"><span class="material-symbols-outlined" style="font-size: 12px;">analytics</span> <strong>Control P&L</strong> y Equipos</div>
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
      collapseIcon.textContent = isHidden ? 'expand_less' : 'expand_more';
    });
  }
}

// ============================================================
// JOB VACANCY DESCRIPTION & REQUIREMENTS CARD
// ============================================================
function renderCompanyOfferDesc(company) {
  const cardEl = document.getElementById('companyOfferDescCard');
  if (!cardEl) return;

  const desc = company.offerDescription || '';
  if (!desc || desc.trim().length === 0) {
    cardEl.style.display = 'none';
    return;
  }

  cardEl.style.display = 'block';
  const roleEl = document.getElementById('offerDescCardRole');
  if (roleEl) {
    roleEl.textContent = company.roleName ? `${company.roleName} — ${company.name}` : `Descripción de la Oferta — ${company.name}`;
  }

  const textEl = document.getElementById('offerDescTextContent');
  if (textEl) {
    textEl.textContent = desc;
  }

  const toggleBtn = document.getElementById('toggleOfferDescBtn');
  const bodyEl = document.getElementById('offerDescBodyContent');
  const iconEl = document.getElementById('offerDescCollapseIcon');

  if (toggleBtn && bodyEl && iconEl) {
    toggleBtn.onclick = () => {
      const isHidden = bodyEl.style.display === 'none';
      bodyEl.style.display = isHidden ? 'block' : 'none';
      iconEl.textContent = isHidden ? 'expand_less' : 'expand_more';
    };
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
  const emailText = company.naturalEmail || company.tailoredCoverLetter || '';
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
// MOBILE BOTTOM NAVIGATION BAR (PENDIENTES | AÑADIR | SOLICITADOS)
// ============================================================
function setupBottomNav() {
  if (navBtnPending) {
    navBtnPending.addEventListener('click', () => {
      state.filter = 'Pendiente';
      filterPills.forEach(p => {
        p.classList.toggle('active', p.dataset.filter === 'Pendiente');
      });
      if (state.viewMode !== 'dashboard') {
        showDashboard();
      } else {
        renderDashboard();
      }
      updateNavState('pending');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (navBtnAddOffer) {
    navBtnAddOffer.addEventListener('click', () => {
      openAddOfferModal(false);
    });
  }

  if (navBtnSent) {
    navBtnSent.addEventListener('click', () => {
      state.filter = 'Enviado';
      filterPills.forEach(p => {
        p.classList.toggle('active', p.dataset.filter === 'Enviado');
      });
      if (state.viewMode !== 'dashboard') {
        showDashboard();
      } else {
        renderDashboard();
      }
      updateNavState('sent');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

function updateNavState(mode) {
  if (navBtnPending) navBtnPending.classList.toggle('active', mode === 'pending');
  if (navBtnSent) navBtnSent.classList.toggle('active', mode === 'sent');
}

// ============================================================
// ADD OFFER / LINKEDIN WITH AI (MODELO GEMINI FLASH)
// ============================================================
function setupAddOfferModal() {
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

  if (btnAutoScanUrl) {
    btnAutoScanUrl.addEventListener('click', handleAutoScanUrl);
  }

  if (inputOfferUrl) {
    const handleUrlChange = () => {
      const u = inputOfferUrl.value.trim();
      if (!u) return;
      const meta = parseOfferUrlMetadata(u);
      if (inputOfferCompany && !inputOfferCompany.value && meta.company) {
        inputOfferCompany.value = meta.company;
      }
      if (inputOfferRole && !inputOfferRole.value && meta.role) {
        inputOfferRole.value = meta.role;
      }
    };
    inputOfferUrl.addEventListener('input', handleUrlChange);
    inputOfferUrl.addEventListener('paste', () => setTimeout(handleUrlChange, 60));
  }

  if (btnSubmitAddOffer) {
    btnSubmitAddOffer.addEventListener('click', handleProcessAddOffer);
  }
}

function openAddOfferModal() {
  if (!addOfferModal) return;
  addOfferModal.style.display = 'flex';
  if (inputOfferUrl) inputOfferUrl.focus();
}

function closeAddOfferModal() {
  if (!addOfferModal) return;
  addOfferModal.style.display = 'none';
  if (aiScanProgress) aiScanProgress.style.display = 'none';
  if (btnSubmitAddOffer) btnSubmitAddOffer.disabled = false;
}

// Extract rich metadata from LinkedIn and other job URLs
function parseOfferUrlMetadata(url) {
  let company = '';
  let role = '';
  let location = '';
  let jobId = '';

  if (!url) return { company, role, location, jobId };

  try {
    const u = new URL(url);
    const pathname = decodeURIComponent(u.pathname);
    
    // Match LinkedIn job view URLs: /jobs/view/slug-at-company-12345 or /jobs/view/12345
    const jobMatch = pathname.match(/\/jobs\/view\/(?:([^\/]+)-)?(\d+)/i) || pathname.match(/\/jobs\/view\/([^\/?#]+)/i);
    if (jobMatch) {
      if (jobMatch[2]) jobId = jobMatch[2];
      const slug = jobMatch[1] || jobMatch[0].replace(/\/jobs\/view\//, '');
      
      if (slug && slug.includes('-at-')) {
        const [rolePart, companyPart] = slug.split('-at-');
        role = rolePart.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).trim();
        company = companyPart.replace(/-\d+$/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).trim();
      } else if (slug && !/^\d+$/.test(slug)) {
        role = slug.replace(/-\d+$/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).trim();
      }
    }

    // Match /company/company-name
    const compMatch = pathname.match(/\/company\/([^\/?#]+)/i);
    if (compMatch && !company) {
      company = compMatch[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).trim();
    }

    // Location detection
    const fullText = (role + ' ' + pathname).toLowerCase();
    if (fullText.includes('malaga') || fullText.includes('málaga')) {
      location = 'Málaga, España';
    } else if (fullText.includes('costa del sol')) {
      location = 'Costa del Sol / Málaga';
    } else if (fullText.includes('marbella')) {
      location = 'Marbella / Costa del Sol';
    } else if (fullText.includes('antequera')) {
      location = 'Antequera / Málaga';
    } else if (fullText.includes('remoto') || fullText.includes('remote')) {
      location = 'Remoto / Málaga';
    } else if (!location) {
      location = 'Málaga, España';
    }
  } catch (e) {
    console.warn('URL parsing notice:', e);
  }

  return { company, role, location, jobId };
}

// Scrape job offer contents via proxy with timeout
async function extractOfferFromUrl(url) {
  const meta = parseOfferUrlMetadata(url);
  let scrapedText = '';

  if (!url) return { meta, scrapedText };

  try {
    const jinaUrl = `https://r.jina.ai/${encodeURI(url)}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(jinaUrl, {
      headers: { 'Accept': 'text/plain' },
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (res.ok) {
      const text = await res.text();
      // Ensure it's not a generic authwall or login prompt
      if (!text.includes('LinkedIn: inicio de sesión') && !text.includes('Sign In') && !text.includes('authwall') && text.trim().length > 100) {
        scrapedText = text.substring(0, 6000);
      }
    }
  } catch (e) {
    console.warn('URL scrape info:', e.message);
  }

  return { meta, scrapedText };
}

// Generic multi-model caller (attempts primary model, then falls back seamlessly with timeout)
async function requestGeminiModels(models, promptText, onProgress, stepLabel) {
  const apiKey = DEFAULT_GEMINI_API_KEY;
  let lastError = null;

  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    try {
      if (onProgress && stepLabel) {
        onProgress(stepLabel);
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(12000),
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: 'application/json'
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const rawText = data.candidates?.[0]?.content?.parts?.map(p => p.text).join('') || '';
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
        throw new Error('Respuesta JSON no detectada');
      }

      const errText = await res.text().catch(() => '');
      lastError = new Error(`API error ${res.status}: ${errText}`);
      continue;
    } catch (err) {
      lastError = err;
      continue;
    }
  }

  throw lastError || new Error('No se pudo conectar con el servicio tras varios intentos.');
}

async function handleAutoScanUrl() {
  const url = inputOfferUrl ? inputOfferUrl.value.trim() : '';
  if (!url) {
    showToast('Por favor escribe o pega un enlace primero');
    return;
  }

  btnAutoScanUrl.disabled = true;
  btnAutoScanUrl.innerHTML = '<span class="material-symbols-outlined spin-icon" style="font-size: 14px;">sync</span> Escaneando...';

  try {
    const { meta, scrapedText } = await extractOfferFromUrl(url);
    if (meta.company && inputOfferCompany && !inputOfferCompany.value) {
      inputOfferCompany.value = meta.company;
    }
    if (meta.role && inputOfferRole && !inputOfferRole.value) {
      inputOfferRole.value = meta.role;
    }
    if (scrapedText) {
      if (inputOfferText) inputOfferText.value = scrapedText;
      showToast('Información extraída de la vacante.');
    } else {
      let infoMsg = 'Enlace listo.';
      if (meta.company || meta.role) {
        infoMsg = `Detectado: ${meta.role || ''} ${meta.company ? 'en ' + meta.company : ''}`.trim();
      }
      showToast(infoMsg);
      if (inputOfferText && !inputOfferText.value) {
        inputOfferText.placeholder = 'Enlace analizado. Pulsa "Analizar y Crear Candidatura" o añade notas opcionales aquí.';
      }
    }
  } catch (err) {
    console.warn('Auto-scan notice:', err);
    showToast('Enlace listo para procesar.');
  } finally {
    btnAutoScanUrl.disabled = false;
    btnAutoScanUrl.innerHTML = '<span class="material-symbols-outlined" style="font-size: 14px;">search</span> Escanear';
  }
}

async function handleProcessAddOffer() {
  const url = inputOfferUrl ? inputOfferUrl.value.trim() : '';
  const text = inputOfferText ? inputOfferText.value.trim() : '';
  const userCompany = inputOfferCompany ? inputOfferCompany.value.trim() : '';
  const userRole = inputOfferRole ? inputOfferRole.value.trim() : '';

  if (!url && !text && !userCompany) {
    showToast('Por favor introduce un enlace, el nombre de la empresa o el texto de la vacante');
    return;
  }

  aiScanProgress.style.display = 'flex';
  btnSubmitAddOffer.disabled = true;
  aiProgressText.textContent = 'Analizando vacante y preparando candidatura...';

  const { meta, scrapedText } = await extractOfferFromUrl(url);
  const finalDescription = (text || scrapedText || '').trim();
  const detectedCompany = userCompany || meta.company || '';
  const detectedRole = userRole || meta.role || '';

  const promptContent = [
    url ? `Enlace de la oferta: ${url}` : '',
    detectedCompany ? `Nombre de la empresa indicado: ${detectedCompany}` : '',
    detectedRole ? `Puesto o vacante indicado: ${detectedRole}` : '',
    meta.location ? `Ubicación detectada: ${meta.location}` : '',
    finalDescription ? `Descripción / Requisitos de la vacante:\n${finalDescription}` : ''
  ].filter(Boolean).join('\n\n');

  let parsedResult = null;

  try {
    const consolidatedPrompt = `
Eres un Headhunter Senior y Director de Selección de alto nivel en España.
Tu tarea es analizar la siguiente oportunidad de empleo y redactar una adaptación de candidatura de máximo impacto para Ignacio Fernández López (Nacho).

DATOS DISPONIBLES DE LA VACANTE:
${promptContent}

PERFIL PROFESIONAL DE IGNACIO FERNÁNDEZ LÓPEZ:
- Formación: Graduado en Administración y Dirección de Empresas (ADE) por la Universidad de Málaga; Máster GESCO en Dirección Comercial y Marketing por ESIC Business & Marketing School; Savills University.
- Trayectoria: 5 años consolidado en Savills Málaga (consultora inmobiliaria multinacional).
- Competencias y logros demostrables:
  * Coordinación de auditorías técnicas (Technical Due Diligence) y urbanísticas de activos comerciales, industriales y residenciales en Málaga y Costa del Sol.
  * Supervisión y optimización de cuentas de resultados (P&L), presupuestos de CAPEX/OPEX y seguimiento riguroso de KPIs con 100% de cumplimiento en plazos y presupuestos.
  * Project Management y dirección operativa de servicios e inmuebles, interlocución de alto nivel con contratistas, fondos de inversión y propiedad.
  * Análisis de viabilidad técnico-económica, prospección de ubicaciones estratégicas, valoraciones inmobiliarias (metodología ECO y RICS) y negociación de contratos de arrendamiento y compraventa.
  * Máximo rigor analítico, gestión organizativa impecable y orientación a rentabilidad e impacto medible desde el primer día.

DIRECTRICES OBLIGATORIAS:
1. Extrae el nombre exacto de la empresa${detectedCompany ? ` (Usa obligatoriamente "${detectedCompany}")` : ''}. NUNCA uses nombres genéricos ficticios como "Empresa Estratégica".
2. Extrae el puesto o rol exacto${detectedRole ? ` (Usa "${detectedRole}")` : ''}.
3. Redacta una Carta de Presentación de 3 párrafos de alto impacto dirigida a la empresa y puesto concretos, con tono ejecutivo, seguro, persuasivo y formal. Menciona con naturalidad los 5 años en Savills Málaga y cómo su experiencia en ADE + ESIC genera valor inmediato en los retos concretos de este puesto.
4. Redacta un Resumen Ejecutivo ATS para el CV (3-4 líneas) totalmente orientado a las palabras clave y requisitos de esta oferta destacando su bagaje en Savills Málaga.
5. Redacta el encaje estratégico (whyIgnacioFits) en 3 frases contundentes.

Responde EXCLUSIVAMENTE con un JSON válido con esta estructura:
{
  "name": "${detectedCompany || 'Nombre exacto de la empresa'}",
  "category": "Sector de la empresa (ej: Supermercados & Gran Distribución / Real Estate / Logística / Proptech / Operaciones)",
  "location": "${meta.location || 'Málaga / Costa del Sol'}",
  "priority": "alta",
  "contactTarget": "${url || 'portal de empleo'}",
  "channel": "${(url && url.includes('@')) ? 'direct_email' : 'portal'}",
  "companyInfo": "Radiografía y modelo de negocio de la empresa (2 frases concisas y fundamentadas)",
  "currentState": "Momento actual, retos 2026, plan de crecimiento o contexto en Málaga (2 frases concisas)",
  "roleName": "${detectedRole || 'Puesto o vacante'}",
  "keyRequirements": "Requisitos clave y funciones principales de la vacante",
  "defaultRole": "area_manager_retail_ops",
  "whyIgnacioFits": "Argumento de por qué Ignacio encaja al 100%: combinación de ADE + Savills Málaga, conocimiento de suelo y locales en Costa del Sol, rigor en Due Diligence, operaciones y negociación (3 frases)",
  "tailoredSummary": "Resumen ejecutivo ATS de 3-4 líneas totalmente adaptado a los requisitos.",
  "tailoredCoverLetter": "Estimado/a Responsable de Selección de [Empresa]:\\n\\n[Párrafo 1: Candidatura para el puesto y alineación estratégica...]\\n\\n[Párrafo 2: Logros cuantitativos en Savills Málaga y formación ADE/ESIC aplicables a las responsabilidades...]\\n\\n[Párrafo 3: Por qué puedo aportar valor inmediato y propuesta de entrevista...]\\n\\nUn cordial saludo,\\nIgnacio Fernández López"
}
`;

    parsedResult = await requestGeminiModels(
      AI_GENERATION_MODELS,
      consolidatedPrompt,
      (msg) => { aiProgressText.textContent = msg; },
      'Analizando oferta y adaptando candidatura...'
    );
  } catch (err) {
    console.warn('AI execution note, aplicando analizador integrado:', err);
    parsedResult = fallbackParseOffer(url, finalDescription, {
      company: detectedCompany,
      role: detectedRole,
      location: meta.location
    });
  }

  aiProgressText.textContent = 'Guardando candidatura y sincronizando...';

  // Build Company Object
  const safeName = parsedResult.name || detectedCompany || meta.company || 'Nueva Oferta';
  const roleTitle = parsedResult.roleName || detectedRole || meta.role || '';
  const offerDesc = finalDescription || parsedResult.keyRequirements || '';
  const slugId = 'custom-' + (safeName.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'oferta') + '-' + Date.now().toString(36).substr(-4);

  const newCompany = {
    id: slugId,
    name: safeName,
    roleName: roleTitle,
    offerDescription: offerDesc,
    category: parsedResult.category || 'Oportunidad Estratégica',
    priority: parsedResult.priority || 'alta',
    location: parsedResult.location || meta.location || 'Málaga, España',
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
  if (inputOfferUrl) inputOfferUrl.value = '';
  if (inputOfferCompany) inputOfferCompany.value = '';
  if (inputOfferRole) inputOfferRole.value = '';
  if (inputOfferText) inputOfferText.value = '';
  closeAddOfferModal();

  // Open detail view
  renderDashboard();
  openCompanyDetail(newCompany.id);
  showToast(`Candidatura "${newCompany.name}" analizada y guardada.`);
}

function fallbackParseOffer(url, text, meta = {}) {
  let companyName = meta.company || "";
  let roleName = meta.role || "";
  let category = "Supermercados & Gran Distribución";
  let defaultRole = 'area_manager_retail_ops';

  const lines = (text || '').split('\n').map(l => l.trim()).filter(Boolean);
  if (!companyName && lines.length > 0) {
    const firstLine = lines[0].replace(/^(oferta|vacante|empleo|puesto):?/i, '').trim();
    if (firstLine.includes(' - ')) {
      const parts = firstLine.split(' - ');
      roleName = roleName || parts[0].trim();
      companyName = parts[1].trim();
    } else if (firstLine.length < 50) {
      companyName = firstLine;
    }
  }
  if (!companyName) {
    companyName = "Empresa Candidata";
  }

  const lower = ((text || '') + ' ' + (url || '') + ' ' + roleName).toLowerCase();
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

  const displayRole = roleName || 'la posición ofertada';

  return {
    name: companyName,
    roleName: roleName,
    category: category,
    location: meta.location || "Málaga / Costa del Sol",
    priority: "alta",
    contactTarget: url || "portal de empleo",
    channel: (url && url.includes('@')) ? 'direct_email' : 'portal',
    defaultRole: defaultRole,
    companyInfo: `Organización con actividad en ${category} con proyectos activos y requerimientos de gestión operativa en la provincia de Málaga.`,
    currentState: `Fase de consolidación de operaciones e implantación de objetivos estratégicos 2026 en el mercado malagueño.`,
    whyIgnacioFits: `Ignacio aporta doble titulación en ADE y Dirección Comercial (ESIC) sumada a 5 años de rigor corporativo en Savills Málaga gestionando activos, cuentas de resultados y equipos técnicos.`,
    tailoredSummary: `Profesional con 5 años de trayectoria en Savills Málaga, graduado en ADE y Máster en Dirección Comercial (ESIC). Especializado en optimización de operaciones, gestión de cuentas de resultados y liderazgo de proyectos en entornos de alto rendimiento.`,
    tailoredCoverLetter: `Estimado/a Responsable de Selección de ${companyName}:\n\nLe escribo para presentarle mi candidatura para ${displayRole.startsWith('la') ? displayRole : 'la posición de ' + displayRole} en ${companyName}. Con 5 años de trayectoria corporativa en Savills Málaga y formación superior en ADE y Dirección Comercial (ESIC), he coordinado auditorías técnicas, optimización de cuentas de resultados y supervisión de proyectos con un 100% de cumplimiento en plazos y objetivos.\n\nMi propósito es volcar este rigor operativo, capacidad organizativa y conocimiento de mercado en ${companyName}, garantizando control de gestión y valor tangible desde el primer día.\n\nEstaré encantado de mantener una entrevista para detallar cómo puedo sumar valor a su equipo.\n\nUn cordial saludo,\nIgnacio Fernández López`
  };
}

// Start
init();
}
