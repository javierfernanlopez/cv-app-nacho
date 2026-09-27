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
  statuses: JSON.parse(localStorage.getItem('cv_app_ignacio_statuses') || '{}')
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

// Load Data with Zero-Fail Fallback
async function init() {
  try {
    if (window.PROFILE_DATA && window.COMPANIES_DATA) {
      state.profile = window.PROFILE_DATA;
      state.companies = window.COMPANIES_DATA;
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

    // Default company
    const defaultComp = state.companies.find(c => c.id === state.selectedCompanyId) || state.companies[0];
    state.selectedCompanyId = defaultComp.id;
    state.activeRoleKey = defaultComp.defaultRole || 'area_manager_retail_ops';

    setupEventListeners();
    renderDashboard();

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

  // Render cards
  companiesGrid.innerHTML = filtered.map(comp => {
    const status = state.statuses[comp.id] || 'Pendiente';
    const roleData = state.profile.roles[comp.defaultRole || 'real_estate_valuation_advisory'];
    const isDirect = comp.channel === 'direct_email';

    return `
      <div class="company-card-dash" data-comp-id="${comp.id}">
        <div>
          <div class="card-dash-top">
            <h3 class="card-dash-title">${comp.name}</h3>
            <span class="badge-priority badge-${comp.priority}">${comp.priority.toUpperCase()}</span>
          </div>

          <div class="card-dash-category">${comp.category}</div>

          <div class="card-dash-meta">
            <div class="card-meta-line">
              <strong>📍 Ubicación:</strong> <span>${comp.location}</span>
            </div>
            <div class="card-meta-line" style="flex-direction: column; align-items: flex-start; gap: 2px;">
              <strong>🎯 Rol Estratégico:</strong>
              <span class="badge-rec-role">⭐ Recomendado: ${roleData.title}</span>
            </div>
            <div class="card-meta-line" style="margin-top: 4px;">
              <strong>Canal:</strong> 
              <span class="card-meta-channel">
                ${isDirect ? `✉️ Email Directo (${comp.contactTarget})` : `🌐 Portal Web de Empleo`}
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
      <p class="summary">${roleData.summary}</p>
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

  const paragraphs = company.naturalEmail.split('\n\n').filter(p => p.trim());
  const bodyParagraphs = paragraphs.slice(1, -2);

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
      <strong>A la atención de:</strong> ${company.contactRoleName}<br>
      <strong>Empresa:</strong> ${company.name}<br>
      <strong>Ubicación:</strong> ${company.location}<br>
      <strong>Fecha:</strong> ${dateStr}
    </div>

    <div class="subject-line" style="font-weight: 700; color: #111; font-size: 10pt; margin-bottom: 14px; padding-bottom: 3px; border-bottom: 1px solid #e2e8f0;">
      Asunto: ${company.emailSubject}
    </div>

    <div class="letter-body" style="line-height: 1.45; font-size: 9.3pt; color: #262626;">
      <p style="margin-bottom: 10px; font-weight: 600;">${paragraphs[0] || 'Hola:'}</p>
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
  const fullPitch = company.naturalEmail;

  pitchView.innerHTML = `
    <div class="pitch-header">
      <h3>Propuesta Personalizada: ${company.name}</h3>
      <div class="pitch-meta">
        <div class="pitch-meta-item"><strong>CANAL:</strong> ${company.channel === 'direct_email' ? '✉️ CORREO DIRECTO (Máxima efectividad)' : '🌐 PORTAL CORPORATIVO ATS'}</div>
        <div class="pitch-meta-item"><strong>DESTINATARIO:</strong> ${company.contactTarget} (${company.contactRoleName})</div>
        <div class="pitch-meta-item"><strong>TELÉFONO:</strong> ${company.phone}</div>
      </div>
    </div>

    <div class="pitch-field">
      <div class="field-label-row">
        <span class="field-label">Línea de Asunto Recomendada</span>
        <button id="copySubjectBtn" class="btn-neo btn-neo-yellow" style="padding: 4px 10px; font-size: 11px;">📋 Copiar Asunto</button>
      </div>
      <input type="text" id="subjectInput" class="pitch-input" value="${company.emailSubject}" readonly>
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
             1. Pulsa arriba en <strong>🚀 Enviar (Gmail Web)</strong> o <strong>✉️ Outlook Web</strong>.<br>
             2. Se descargará automáticamente tu <strong>CV en PDF (1 pág A4)</strong> y se abrirá el correo web con el destinatario, asunto y texto completados.<br>
             3. Arrastra el archivo PDF descargado a la ventana del correo y pulsa <strong>Enviar</strong>.` 
          : `Accede al portal oficial de empleo pulsando arriba en <strong>🌐 Ir al Portal Web</strong>.<br>
             1. Pulsa en <strong>📥 Descargar PDF</strong> para tener tu CV listo.<br>
             2. Pulsa en <strong>📋 Copiar Mensaje</strong> para pegar la carta de presentación adaptada en el formulario web.`}
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
  const subject = company.emailSubject || '';

  // Solo descargar el CV en PDF (la carta no hace falta adjuntarla porque ya va redactada dentro del cuerpo del correo)
  downloadCompanyCvOnly(company);
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
  showToast('Abriendo Gmail y descargando el CV en PDF...');
}

// Start
init();
