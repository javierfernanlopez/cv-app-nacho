import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const profilePath = path.join(rootDir, 'data', 'profile.json');
const companiesPath = path.join(rootDir, 'data', 'companies.json');
const cvTplPath = path.join(rootDir, 'templates', 'cv-template.html');
const letterTplPath = path.join(rootDir, 'templates', 'cover-letter-template.html');
const letterPitchesPath = path.join(rootDir, 'templates', 'letter-templates.json');
const photoPath = path.join(rootDir, 'assets', 'foto.jpg');
const distDir = path.join(rootDir, 'dist');

// Read files
const profile = JSON.parse(fs.readFileSync(profilePath, 'utf-8'));
const companies = JSON.parse(fs.readFileSync(companiesPath, 'utf-8'));
const cvTemplate = fs.readFileSync(cvTplPath, 'utf-8');
const letterTemplate = fs.readFileSync(letterTplPath, 'utf-8');
const letterPitches = JSON.parse(fs.readFileSync(letterPitchesPath, 'utf-8'));

// Encode photo as base64 for self-contained HTML
let photoBase64 = '';
if (fs.existsSync(photoPath)) {
  const photoBuf = fs.readFileSync(photoPath);
  photoBase64 = `data:image/jpeg;base64,${photoBuf.toString('base64')}`;
}

// Clean and recreate distDir
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

function formatDateSpanish() {
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const now = new Date();
  return `${now.getDate()} de ${months[now.getMonth()]} de ${now.getFullYear()}`;
}

const currentDateStr = formatDateSpanish();

// Helper to render Experience for a role
function renderExperience(roleKey) {
  return profile.experience.map(exp => {
    let bullets = [];
    if (exp.highlights[roleKey]) {
      bullets = exp.highlights[roleKey];
    } else if (exp.highlights.all) {
      bullets = exp.highlights.all;
    } else {
      bullets = exp.highlights['area_manager_retail_ops'] || exp.highlights['business_operations_pm'] || [];
    }

    const bulletsHtml = bullets.map(b => `      <li>${b}</li>`).join('\n');
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
      <ul>
${bulletsHtml}
      </ul>
    </div>`;
  }).join('\n');
}

// Helper to render Education
function renderEducation() {
  return profile.education.map(edu => {
    return `
    <div class="item">
      <div class="item-header">
        <span>${edu.degree}</span>
        <span>${edu.period}</span>
      </div>
      <div class="item-subheader">
        <span>${edu.institution}</span>
        <span>${edu.location}</span>
      </div>
    </div>`;
  }).join('\n');
}

// Helper to render Skills
function renderSkills(roleKey) {
  const roleData = profile.roles[roleKey] || profile.roles['area_manager_retail_ops'];
  return roleData.skillsCategories.map(sc => {
    return `    <div class="skills-group">
      <strong>${sc.name}:</strong> ${sc.items}
    </div>`;
  }).join('\n');
}

// Helper to render Projects
function renderProjects(roleKey) {
  if (!profile.projects || profile.projects.length === 0) return '';
  const proj = profile.projects[0];
  const pointsHtml = (proj.points || []).map(p => `      <li>${p}</li>`).join('\n');
  return `
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
${pointsHtml}
      </ul>
    </div>
  </section>`;
}

console.log(`Generando paquetes personalizados para ${companies.length} empresas para ${profile.personal.name}...`);

const manifest = [];

companies.forEach(company => {
  const roleKey = company.defaultRole || 'area_manager_retail_ops';
  const roleData = profile.roles[roleKey] || profile.roles['area_manager_retail_ops'];
  const compDir = path.join(distDir, company.id);
  if (!fs.existsSync(compDir)) {
    fs.mkdirSync(compDir, { recursive: true });
  }

  // 1. Generate HTML CV
  const photoHtml = photoBase64 
    ? `<div class="header-photo"><img src="${photoBase64}" alt="${profile.personal.name}"></div>`
    : '';

  let cvHtml = cvTemplate
    .replace(/\{\{NAME\}\}/g, profile.personal.name)
    .replace(/\{\{ROLE_TITLE\}\}/g, roleData.title)
    .replace(/\{\{PHONE\}\}/g, profile.personal.phone)
    .replace(/\{\{EMAIL\}\}/g, profile.personal.email)
    .replace(/\{\{LOCATION\}\}/g, profile.personal.location)
    .replace(/\{\{LINKEDIN_URL\}\}/g, profile.personal.linkedin)
    .replace(/\{\{LINKEDIN_DISPLAY\}\}/g, profile.personal.linkedinDisplay)
    .replace(/\{\{PHOTO_HTML\}\}/g, photoHtml)
    .replace(/\{\{SUMMARY\}\}/g, roleData.summary)
    .replace(/\{\{EXPERIENCE_HTML\}\}/g, renderExperience(roleKey))
    .replace(/\{\{EDUCATION_HTML\}\}/g, renderEducation())
    .replace(/\{\{SKILLS_HTML\}\}/g, renderSkills(roleKey))
    .replace(/\{\{PROJECTS_HTML\}\}/g, renderProjects(roleKey));

  const cvFileName = `CV_Ignacio_Fernandez_${company.id}.html`;
  const cvHtmlPath = path.join(compDir, cvFileName);
  fs.writeFileSync(cvHtmlPath, cvHtml, 'utf-8');

  // Generate 1-page A4 PDF using Chrome Headless
  const cvPdfFileName = cvFileName.replace('.html', '.pdf');
  const cvPdfPath = path.join(compDir, cvPdfFileName);
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  if (fs.existsSync(chromePath)) {
    try {
      execSync(`"${chromePath}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${cvPdfPath}" "${cvHtmlPath}" 2>/dev/null`);
    } catch (e) {
      // ignore
    }
  }

  // 2. Generate Formal Cover Letter HTML
  const paragraphs = (company.naturalEmail || '').split('\n\n').filter(p => p.trim());
  const greeting = paragraphs[0] || `Estimado/a ${company.contactRoleName}:`;
  const bodyParagraphs = paragraphs.slice(1, -1);
  const letterBodyHtml = [
    `    <p>${greeting}</p>`,
    ...bodyParagraphs.map(p => `    <p>${p.replace(/\n/g, '<br>')}</p>`)
  ].join('\n');

  let letterHtml = letterTemplate
    .replace(/\{\{NAME\}\}/g, profile.personal.name)
    .replace(/\{\{ROLE_TITLE\}\}/g, roleData.title)
    .replace(/\{\{PHONE\}\}/g, profile.personal.phone)
    .replace(/\{\{EMAIL\}\}/g, profile.personal.email)
    .replace(/\{\{LOCATION\}\}/g, profile.personal.location)
    .replace(/\{\{LINKEDIN_URL\}\}/g, profile.personal.linkedin)
    .replace(/\{\{LINKEDIN_DISPLAY\}\}/g, profile.personal.linkedinDisplay)
    .replace(/\{\{CONTACT_TARGET_ROLE\}\}/g, company.contactRoleName)
    .replace(/\{\{COMPANY_NAME\}\}/g, company.name)
    .replace(/\{\{COMPANY_LOCATION\}\}/g, company.location)
    .replace(/\{\{COMPANY_CATEGORY\}\}/g, company.category)
    .replace(/\{\{CURRENT_DATE\}\}/g, currentDateStr)
    .replace(/\{\{VALUE_HOOK\}\}/g, company.valueHook || '')
    .replace(/\{\{LETTER_BODY\}\}/g, letterBodyHtml);

  const letterFileName = `Carta_Presentacion_${company.id}.html`;
  const letterHtmlPath = path.join(compDir, letterFileName);
  fs.writeFileSync(letterHtmlPath, letterHtml, 'utf-8');

  // Generate 1-page A4 PDF for Cover Letter
  const letterPdfFileName = `Carta_Presentacion_${company.id}.pdf`;
  const letterPdfPath = path.join(compDir, letterPdfFileName);
  if (fs.existsSync(chromePath)) {
    try {
      execSync(`"${chromePath}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${letterPdfPath}" "${letterHtmlPath}" 2>/dev/null`);
    } catch (e) {
      // ignore
    }
  }

  // 3. Generate Email Pitch (Plain Text) with Webmail compose links (Gmail Web & Outlook Web)
  const gmailComposeUrl = `https://mail.google.com/mail/?authuser=ignflopez@gmail.com&view=cm&fs=1&to=${encodeURIComponent(company.contactTarget)}&su=${encodeURIComponent(company.emailSubject)}&body=${encodeURIComponent(company.naturalEmail)}`;
  const outlookComposeUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(company.contactTarget)}&subject=${encodeURIComponent(company.emailSubject)}&body=${encodeURIComponent(company.naturalEmail)}`;

  const emailContent = `ASUNTO: ${company.emailSubject}
DESTINATARIO / CANAL: ${company.contactTarget} (${company.contactRoleName})

ENLACES DIRECTOS WEBMAIL (100% Correo Web - No requiere cliente de escritorio):
- GMAIL WEB (ignflopez@gmail.com):
  ${gmailComposeUrl}

- OUTLOOK / HOTMAIL WEB:
  ${outlookComposeUrl}

------------------------------------------------------------
CUERPO DEL MENSAJE (100% NATURAL / VOZ DE IGNACIO):
------------------------------------------------------------

${company.naturalEmail}
`;
  fs.writeFileSync(path.join(compDir, `Email_Pitch.txt`), emailContent, 'utf-8');

  // 4. Generate Strategy Cheat Sheet
  const strategyContent = `============================================================
ESTRATEGIA DE POSTULACIÓN: ${company.name.toUpperCase()}
============================================================
Candidato: Ignacio Fernández López
Prioridad: ${company.priority.toUpperCase()}
Subsector: ${company.category}
Ubicación: ${company.location}
Teléfono: ${company.phone}

CANAL PREFERENTE: ${company.channel === 'direct_email' ? 'CORREO DIRECTO (Máxima efectividad)' : 'PORTAL CORPORATIVO / ATS'}
DESTINO / FORMULARIO: ${company.contactTarget}
INTERLOCUTOR CLAVE: ${company.contactRoleName}

ROL ASIGNADO: ${roleData.title}
ASUNTO RECOMENDADO: ${company.emailSubject}

GANCHO DE VALOR DIFERENCIAL:
${company.valueHook}

DOCUMENTOS GENERADOS EN ESTA CARPETA:
- CV personalizado: ${cvFileName}
- CV en PDF (1 página A4): ${cvPdfFileName}
- Carta de presentación formal: ${letterFileName}
- Texto de Email / Pitch: Email_Pitch.txt

INSTRUCCIONES PARA ENVÍO VÍA CORREO WEB (SIN MAC):
${company.channel === 'direct_email' 
  ? `1. Abre Gmail Web con el enlace directo incluido en Email_Pitch.txt (o en el botón 'Enviar (Gmail)' del dashboard web).
2. Se abrirá una nueva ventana de redacción con el destinatario (${company.contactTarget}), asunto y texto ya rellenados.
3. Arrastra y adjunta el archivo '${cvPdfFileName}' a la ventana del correo.
4. Revisa y pulsa 'Enviar'.`
  : `1. Accede al enlace oficial de empleo: ${company.contactTarget}
2. Adjunta el archivo de CV en PDF ('${cvPdfFileName}').
3. Si el formulario incluye campo para carta de presentación o mensaje, copia el texto de Email_Pitch.txt.`}
============================================================
`;
  fs.writeFileSync(path.join(compDir, `Estrategia_Contacto.txt`), strategyContent, 'utf-8');

  manifest.push({
    id: company.id,
    name: company.name,
    category: company.category,
    priority: company.priority,
    channel: company.channel,
    contactTarget: company.contactTarget,
    roleTitle: roleData.title,
    cvPath: `${company.id}/${cvFileName}`,
    cvPdfPath: `${company.id}/${cvPdfFileName}`,
    letterPath: `${company.id}/${letterFileName}`,
    letterPdfPath: `${company.id}/${letterPdfFileName}`,
    pitchPath: `${company.id}/Email_Pitch.txt`,
    strategyPath: `${company.id}/Estrategia_Contacto.txt`
  });
});

// Generate Index in dist/index.html to easily browse all packs
const rowsHtml = manifest.map((item, idx) => {
  const badgeClass = item.priority === 'alta' ? 'badge-high' : 'badge-med';
  return `
    <tr>
      <td>${idx + 1}</td>
      <td><strong>${item.name}</strong><br><small style="color:#666;">${item.category}</small></td>
      <td><span class="badge ${badgeClass}">${item.priority.toUpperCase()}</span></td>
      <td>${item.roleTitle}</td>
      <td><code>${item.contactTarget}</code></td>
      <td class="actions">
        <a href="${item.cvPdfPath}" target="_blank" class="btn btn-cv">CV PDF</a>
        <a href="${item.letterPdfPath}" target="_blank" class="btn btn-letter">Carta PDF</a>
        <a href="${item.pitchPath}" target="_blank" class="btn btn-pitch">Email</a>
      </td>
    </tr>
  `;
}).join('\n');

const indexHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Directorio de Contactos Profesionales — Ignacio Fernández López</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; color: #1e293b; padding: 25px; margin: 0; }
    .container { max-width: 1200px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
    h1 { margin-top: 0; color: #0f172a; font-size: 24px; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; }
    p.subtitle { color: #64748b; margin-bottom: 25px; font-size: 15px; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px; }
    th, td { padding: 12px 14px; text-align: left; border-bottom: 1px solid #e2e8f0; }
    th { background: #f1f5f9; color: #334155; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; }
    tr:hover { background: #f8fafc; }
    .badge { padding: 3px 8px; border-radius: 9999px; font-size: 11px; font-weight: 700; display: inline-block; }
    .badge-high { background: #fee2e2; color: #991b1b; }
    .badge-med { background: #fef3c7; color: #92400e; }
    .actions { white-space: nowrap; }
    .btn { display: inline-block; padding: 5px 10px; border-radius: 6px; text-decoration: none; font-size: 12px; font-weight: 600; margin-right: 4px; }
    .btn-cv { background: #1a568c; color: #fff; }
    .btn-cv:hover { background: #13426b; }
    .btn-letter { background: #0284c7; color: #fff; }
    .btn-pitch { background: #059669; color: #fff; }
    .btn-strat { background: #64748b; color: #fff; }
    code { font-size: 12px; background: #f1f5f9; padding: 2px 5px; border-radius: 4px; }
  </style>
</head>
<body>
<div class="container">
  <h1>Directorio de Contactos Profesionales — Ignacio Fernández López</h1>
  <p class="subtitle">${companies.length} empresas clave en Málaga (Supermercados, Gran Distribución, Retail Multi-Tienda, Operaciones Corporativas y Gestión de Personas). Optimizado para envío directo vía móvil / Gmail.</p>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Empresa</th>
        <th>Prioridad</th>
        <th>Rol Adaptado</th>
        <th>Canal / Contacto</th>
        <th>Acciones Rápidas</th>
      </tr>
    </thead>
    <tbody>
      ${rowsHtml}
    </tbody>
  </table>
</div>
</body>
</html>`;

fs.writeFileSync(path.join(distDir, 'index.html'), indexHtml, 'utf-8');
console.log(`¡Compilación completada! ${companies.length} empresas generadas en ${distDir}`);
