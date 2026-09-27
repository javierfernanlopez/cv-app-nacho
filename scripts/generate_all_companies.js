import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Read existing 42 companies
const existing = JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'companies.json'), 'utf8'));

const additional16 = [
  // ============================================================
  // CATEGORÍA 6 (Cont.): BIG 4 Y CONSULTORÍA DE NEGOCIO / TECH EN MÁLAGA
  // ============================================================
  {
    id: "pwc_advisory",
    name: "PwC Deals & Advisory (Málaga)",
    category: "Big Four — Consultoría Estratégica, Deals & Transacciones",
    location: "Calle Marqués de Larios, 4, 29005 Málaga / Plaza de la Solidaridad, 7",
    phone: "+34 952 07 05 00",
    channel: "direct_email",
    contactTarget: "espana_seleccion@pwc.com",
    contactRoleName: "Socio Director de Deals & Advisory — PwC Málaga",
    defaultRole: "strategic_consulting_business",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Deals & Consultoría de Negocio",
    priority: "alta",
    naturalEmail: `Estimado equipo directivo de PwC Deals & Advisory Málaga:

Me pongo en contacto con vosotros para presentar mi candidatura de cara a vuestra práctica de Deals, Advisory o Consultoría de Negocio en Málaga.

Soy Graduado en ADE por la Universidad de Málaga (con estancia Erasmus en Lisboa), Máster en Consultoría Estratégica por Savills University y Máster en Dirección de Marketing y Gestión Comercial (GESCO) por ESIC.

Durante los últimos 5 años he trabajado en consultoría corporativa en Savills en Málaga, donde he liderado proyectos de valoración de carteras, elaboración de modelos financieros de flujos de caja descontados (DCF), dictámenes periciales y análisis de viabilidad para fondos institucionales y promotores.

PwC cuenta con una sólida presencia de asesoramiento financiero y transacciones en Málaga. Aporto metodología rigurosa de análisis, solvencia cuantitativa y experiencia contrastada coordinando proyectos y defendiendo informes ante comités directivos.

Adjunto mi CV en PDF para vuestra consideración y quedo a vuestra disposición para mantener una conversación.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "PwC Deals asesora en las principales transacciones y valoraciones corporativas del sur de España. Mi experiencia de 5 años en Savills elaborando modelos financieros, valoraciones complejas y análisis de mercado aporta solvencia inmediata a vuestro equipo de advisory en Málaga."
  },
  {
    id: "deloitte_advisory",
    name: "Deloitte Advisory & Consulting (Málaga)",
    category: "Big Four — Consultoría de Negocio, Estrategia & Financial Advisory",
    location: "Calle Marqués de Larios, 4, 4ª planta, 29005 Málaga",
    phone: "+34 952 22 84 00",
    channel: "direct_email",
    contactTarget: "candidaturas_malaga@deloitte.es",
    contactRoleName: "Socio de Financial Advisory & Strategy — Deloitte Málaga",
    defaultRole: "strategic_consulting_business",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Financial Advisory & Consultoría",
    priority: "alta",
    naturalEmail: `Hola, equipo directivo de Deloitte Málaga:

Os escribo para presentar mi perfil profesional de cara a oportunidades en las áreas de Financial Advisory, Consultoría de Negocio o Real Estate en vuestra oficina de Calle Larios en Málaga.

Graduado en ADE por la Universidad de Málaga (Erasmus en Lisboa), cuento con doble titulación de máster: Consultoría Estratégica por Savills University y GESCO por ESIC. Durante los últimos 5 años en Savills he coordinado proyectos de valoración de carteras de inversión, análisis de viabilidad y reporting directivo en Excel y PowerPoint para grandes cuentas.

Deloitte es un referente indiscutible en consultoría de negocio en Málaga. Aporto capacidad analítica avanzada, rigor en la entrega y hábito de trabajo con clientes corporativos de primer orden.

Os adjunto mi CV en PDF y quedo a vuestra disposición para comentar posibles vías de colaboración.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "La práctica de Advisory de Deloitte en Málaga lidera proyectos estratégicos y de transformación para el tejido empresarial andaluz. Mi perfil analítico en ADE y 5 años de modelización financiera en consultoría corporativa ofrecen un encaje óptimo para vuestro equipo."
  },
  {
    id: "ey_strategy",
    name: "EY Strategy and Transactions / Consulting (Málaga)",
    category: "Big Four — Estrategia, Transacciones & Consultoría",
    location: "Alameda Principal, 47, 29001 Málaga",
    phone: "+34 952 12 18 00",
    channel: "direct_email",
    contactTarget: "seleccion_ey_sur@es.ey.com",
    contactRoleName: "Dirección de Strategy & Transactions — EY Málaga",
    defaultRole: "strategic_consulting_business",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Strategy and Transactions / Consultoría",
    priority: "alta",
    naturalEmail: `Estimado equipo directivo de EY Málaga:

Me dirijo a vosotros para compartir mi trayectoria y presentar mi candidatura para vuestra división de Strategy and Transactions (SaT) o Consultoría en vuestra oficina de Alameda Principal en Málaga.

Graduado en ADE por la UMA, cursé el Máster en Consultoría Estratégica en Savills University y el Máster GESCO en ESIC. En mis 5 años de experiencia en Savills he desarrollado modelos financieros, estudios de mercado cuantitativos y valoraciones integrales de carteras de inversión, asegurando entregas rigurosas en plazos críticos.

EY destaca por su liderazgo en asesoramiento estratégico y transaccional en Andalucía. Mi combinación de visión de negocio, solvencia técnica y orientación a resultados me permite integrarme de forma inmediata y productiva en vuestros equipos.

Adjunto mi currículum en PDF para vuestra valoración y quedo a vuestra total disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "EY Strategy and Transactions en Málaga acompaña a corporaciones e inversores en adquisiciones, valoraciones y reestructuraciones. Mis 5 años de solvencia contrastada en Savills modelando activos y analizando mercados aportan valor directo e inmediato a la oficina."
  },
  {
    id: "kpmg_deals",
    name: "KPMG Deal Advisory & Strategy (Málaga)",
    category: "Big Four — Deal Advisory, Estrategia & Finanzas Corporativas",
    location: "Calle Marqués de Larios, 3, 29005 Málaga",
    phone: "+34 952 06 14 00",
    channel: "direct_email",
    contactTarget: "seleccion_sur@kpmg.es",
    contactRoleName: "Socio Director de Deal Advisory — KPMG Málaga",
    defaultRole: "strategic_consulting_business",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Deal Advisory & Consultoría de Negocio",
    priority: "alta",
    naturalEmail: `Hola, equipo de KPMG Málaga:

Me pongo en contacto con vosotros para presentar mi candidatura de cara a vuestra área de Deal Advisory, Strategy o Consultoría en vuestra oficina de Calle Larios en Málaga.

Soy Graduado en ADE por la Universidad de Málaga (estancia Erasmus en Lisboa), Máster por Savills University y Máster GESCO por ESIC. Durante los últimos 5 años he trabajado como consultor en Savills en Málaga, responsabilizándome de valoraciones patrimoniales, modelización financiera en Excel y estudios de viabilidad y mercado para clientes institucionales.

KPMG es un referente de prestigio en Deal Advisory en la región. Aporto disciplina metodológica, solvencia en el análisis de estados financieros y carteras, y gran capacidad para trabajar en proyectos exigentes orientados al cliente.

Os adjunto mi CV en PDF para vuestra consideración y quedo a vuestra disposición para una entrevista.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "KPMG Deal Advisory en Málaga ofrece asesoramiento financiero y estratégico de primer nivel. Mi trayectoria de 5 años en consultoría corporativa en Savills, con dominio de modelado y reporting ejecutivo, encaja con el estándar de excelencia de la firma."
  },
  {
    id: "babel_group",
    name: "Babel Sistemas de Información (Málaga TechPark)",
    category: "Consultora Tecnológica & Transformación de Negocio — Sede Málaga TechPark",
    location: "Málaga TechPark, Calle Severo Ochoa, 37, 29590 Campanillas, Málaga",
    phone: "+34 951 01 02 00",
    channel: "direct_email",
    contactTarget: "talento.malaga@babelgroup.com",
    contactRoleName: "Dirección de Personas, Talento y Operaciones — Babel Málaga",
    defaultRole: "business_operations_pm",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Business Operations & Project Management",
    priority: "media",
    naturalEmail: `Estimado equipo de Talento de Babel Málaga:

Os escribo para presentar mi perfil profesional de cara a posiciones de Project Manager, Gestión de Operaciones o Consultoría de Negocio en vuestro centro de Málaga TechPark.

Soy Graduado en ADE por la Universidad de Málaga, Máster en Consultoría Estratégica por Savills University y Máster GESCO por ESIC. En mis 5 años de trayectoria corporativa he coordinado proyectos transversales, gestionado cronogramas de entrega con 100% de cumplimiento y elaborado cuadros de mando operativos y de seguimiento presupuestario.

Babel es una de las consultoras de mayor crecimiento y reconocimiento en el parque tecnológico de Málaga. Aporto capacidad organizativa, gestión eficaz de interlocutores y solvencia para liderar el seguimiento de proyectos complejos.

Adjunto mi CV en PDF y quedo a vuestra completa disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Babel en Málaga TechPark gestiona grandes proyectos de transformación digital y servicios corporativos. Mi formación en ADE y 5 años liderando cronogramas y control de proyectos aportan rigor y solidez a vuestra oficina de gestión."
  },

  // ============================================================
  // CATEGORÍA 7: REAL ESTATE, VALORACIONES Y PROMOTORAS PRIME EN MÁLAGA
  // ============================================================
  {
    id: "cbre_malaga",
    name: "CBRE Real Estate (Oficina Málaga)",
    category: "Líder Global de Consultoría Inmobiliaria & Valoraciones — Delegación Málaga",
    location: "Calle Marqués de Larios, 1, 3ª planta, 29005 Málaga",
    phone: "+34 952 21 00 20",
    channel: "direct_email",
    contactTarget: "cbre.malaga@cbre.com",
    contactRoleName: "Dirección de Oficina y Consultoría — CBRE Málaga",
    defaultRole: "real_estate_valuation_advisory",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Consultor Valoraciones y Advisory (5 años Savills)",
    priority: "alta",
    naturalEmail: `Estimado equipo directivo de CBRE Málaga:

Os escribo directamente para presentar mi candidatura de cara a vuestro equipo de Valuation & Advisory Services o Consultoría Estratégica en la oficina de Calle Larios en Málaga.

Cuento con 5 años de trayectoria profesional en Savills en Málaga, donde actualmente ejerzo como Consultor en Valoraciones, coordinando y ejecutando proyectos periciales y de tasación de carteras de inicio a fin: desde la inspección física in situ y la comprobación de comparables de mercado hasta el modelado financiero en Excel y la entrega a clientes institucionales y corporativos.

Soy Graduado en ADE por la Universidad de Málaga (Erasmus en Lisboa), Máster en Consultoría Estratégica por Savills University y Máster en Dirección de Marketing y Gestión Comercial (GESCO) por ESIC. Conozco a fondo el mercado inmobiliario de la Costa del Sol y Andalucía.

CBRE lidera el asesoramiento inmobiliario global. Mi experiencia directa en firma competidora de primer nivel me permite incorporarme de inmediato sin curva de aprendizaje técnica.

Adjunto mi CV en PDF para vuestra consideración y quedo a vuestra disposición para mantener una conversación.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "CBRE en Málaga lidera grandes mandatos de valoración y asesoramiento patrimonial. Mis 5 años de experiencia técnica directa en Savills en la misma plaza garantizan productividad inmediata y conocimiento exhaustivo del mercado local."
  },
  {
    id: "tinsa_malaga",
    name: "Tinsa Tasaciones Inmobiliarias (Delegación Málaga)",
    category: "Líder Nacional en Valoración y Tasación Inmobiliaria — Delegación Málaga",
    location: "Calle Hilera, 8, Edificio Scala 2000, 29007 Málaga",
    phone: "+34 952 28 85 00",
    channel: "direct_email",
    contactTarget: "malaga@tinsa.com",
    contactRoleName: "Delegado Provincial y Responsable de Red Técnica — Tinsa Málaga",
    defaultRole: "real_estate_valuation_advisory",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Consultor de Valoraciones (5 años Savills Málaga)",
    priority: "alta",
    naturalEmail: `Hola, equipo directivo de Tinsa Málaga:

Me pongo en contacto con vosotros para presentar mi perfil profesional de cara a posiciones de Consultor Técnico de Valoraciones o Gestión de Red en vuestra delegación de Calle Hilera en Málaga.

Durante los últimos 5 años he trabajado en el departamento de Valoraciones de Savills en Málaga, participando en la tasación y modelado financiero de carteras residenciales, terciarias y singulares, así como en inspecciones de campo exhaustivas y análisis normativo de mercado.

Soy Graduado en ADE por la UMA, Máster por Savills University y Máster GESCO por ESIC. Domino la normativa de valoración ECO/RICS, la prospección de comparables y el control riguroso de expedientes periciales.

Tinsa es la referencia histórica indiscutible en tasación en España. Aporto metodología contrastada, agilidad en la gestión de expedientes y amplio conocimiento territorial de la provincia de Málaga.

Os adjunto mi currículum en PDF y quedo a vuestra disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Tinsa gestiona el mayor volumen de valoraciones homologadas de Málaga y Costa del Sol. Mi experiencia de 5 años en Savills realizando dictámenes periciales e inspecciones aporta solvencia inmediata y capacidad para asumir altas cargas de trabajo."
  },
  {
    id: "gloval_malaga",
    name: "Gloval Valuation & Advisory (Delegación Málaga)",
    category: "Servicios Integrales de Valoración, Ingeniería y Consultoría Inmobiliaria — Málaga",
    location: "Calle Marqués de Larios, 10, 29005 Málaga",
    phone: "+34 952 22 41 84",
    channel: "direct_email",
    contactTarget: "delegacion.malaga@gloval.es",
    contactRoleName: "Dirección de Delegación — Gloval Málaga",
    defaultRole: "real_estate_valuation_advisory",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Valuation & Advisory (5 años Savills)",
    priority: "alta",
    naturalEmail: `Estimado equipo directivo de Gloval Málaga:

Me dirijo a vosotros para compartir mi trayectoria profesional y presentar mi candidatura para vuestro equipo de Valuation & Advisory en vuestra delegación de Calle Larios en Málaga.

Cuento con 5 años de experiencia en Savills Málaga, especializándome en consultoría pericial y valoración de carteras inmobiliarias para fondos, entidades financieras y patrimonios privados. Conozco con detalle el tejido inmobiliario de Málaga capital y la Costa del Sol.

Graduado en ADE por la Universidad de Málaga, completé mi formación con el Máster en Consultoría Estratégica en Savills University y el Máster GESCO en ESIC.

Gloval se distingue por su enfoque riguroso y multidisciplinar en valoración y consultoría inmobiliaria. Mi perfil analítico, hábito de trabajo en campo y capacidad de síntesis ejecutiva me permiten sumar valor de forma inmediata a vuestra delegación.

Adjunto mi CV en PDF para vuestra revisión y quedo a vuestra disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Gloval ofrece soluciones integrales de valoración y consultoría técnica a grandes tenedores y promotores. Mis 5 años en Savills coordinando informes periciales y modelando carteras ofrecen un encaje exacto con las necesidades de vuestra oficina en Málaga."
  },
  {
    id: "tecnitasa_malaga",
    name: "Tecnitasa (Delegación Málaga)",
    category: "Sociedad de Tasación Homologada e Informes Técnicos — Delegación Málaga",
    location: "Alameda Principal, 19, 29001 Málaga",
    phone: "+34 952 21 82 25",
    channel: "direct_email",
    contactTarget: "malaga@tecnitasa.com",
    contactRoleName: "Delegado Provincial y Control de Valoraciones — Tecnitasa Málaga",
    defaultRole: "real_estate_valuation_advisory",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Consultor Valoraciones y Tasaciones",
    priority: "alta",
    naturalEmail: `Hola, equipo directivo de Tecnitasa Málaga:

Os contacto para presentar mi candidatura de cara a vuestra delegación en Alameda Principal en Málaga, en el área de consultoría pericial, control de valoraciones y gestión técnica.

Graduado en ADE por la Universidad de Málaga, cuento con 5 años de trayectoria profesional en Savills en Málaga, donde he gestionado proyectos periciales de tasación, inspecciones sobre el terreno y análisis comparativo de mercado, complementado con doble formación de máster (Savills University y ESIC).

Tecnitasa es una de las principales sociedades de tasación homologadas independientes de España. Aporto conocimiento del mercado de Málaga y Costa del Sol, rigor en la aplicación de metodologías de valoración y capacidad contrastada para resolver expedientes con rapidez y precisión.

Os adjunto mi CV en PDF y quedo a vuestra disposición para una entrevista.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Tecnitasa Málaga es referente en informes periciales y tasaciones hipotecarias y de mercado. Mi bagaje de 5 años en consultoría de valoraciones en Savills aporta solvencia técnica inmediata y agilidad en la gestión de expedientes."
  },
  {
    id: "euroval_malaga",
    name: "Euroval (Delegación Málaga)",
    category: "Sociedad de Tasación y Consultoría Inmobiliaria Homologada — Delegación Málaga",
    location: "Calle Compositor Lehmberg Ruiz, 10, Edificio Galaxia, 29007 Málaga",
    phone: "+34 952 30 73 50",
    channel: "direct_email",
    contactTarget: "malaga@euroval.com",
    contactRoleName: "Dirección de Delegación — Euroval Málaga",
    defaultRole: "real_estate_valuation_advisory",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Tasaciones y Consultoría de Negocio",
    priority: "media",
    naturalEmail: `Estimado equipo directivo de Euroval Málaga:

Me pongo en contacto con vosotros para presentar mi perfil profesional de cara a vuestro equipo de tasación y consultoría inmobiliaria en Málaga.

Soy Graduado en ADE por la UMA, Máster por Savills University y Máster GESCO por ESIC. Durante los últimos 5 años en Savills Málaga he coordinado proyectos de valoración de activos residenciales y comerciales, inspeccionando activos in situ y elaborando informes técnicos y financieros para entidades financieras e inversores.

Euroval destaca por su rigor técnico y cobertura nacional. Aporto dinamismo, conocimiento práctico del mercado local de Málaga y dominio de las herramientas analíticas para la estimación de valores de mercado y liquidación.

Adjunto mi CV en PDF para vuestra consideración y quedo a vuestra disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Euroval presta servicios periciales y de consultoría inmobiliaria en toda la provincia de Málaga. Mi experiencia técnica de 5 años en Savills garantiza informes de calidad y riguroso cumplimiento de plazos."
  },
  {
    id: "gilmar_malaga",
    name: "Gilmar Real Estate (Oficinas Málaga Capital y Costa del Sol)",
    category: "Consultora Inmobiliaria Líder en Residencial Premium e Inversiones — Málaga",
    location: "Calle Cortina del Muelle, 13, 29015 Málaga / Oficinas en Marbella, Estepona y Puerto Banús",
    phone: "+34 951 23 33 33",
    channel: "direct_email",
    contactTarget: "malaga@gilmar.es",
    contactRoleName: "Dirección Comercial y Expansión — Gilmar Málaga",
    defaultRole: "business_development_expansion",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Expansión Comercial y Consultoría Inmobiliaria",
    priority: "alta",
    naturalEmail: `Hola, equipo directivo de Gilmar Málaga:

Os escribo para presentar mi candidatura de cara a vuestro equipo comercial, de inversiones o expansión en Málaga capital y la Costa del Sol.

Cuento con 5 años de trayectoria profesional en Savills en Málaga, donde he realizado prospección y análisis de mercado (Market Research), valoración de activos residenciales y terciarios de alto nivel y trato con inversores corporativos y particulares.

Soy Graduado en ADE por la UMA y cuento con el Máster en Dirección de Marketing y Gestión Comercial (GESCO) por ESIC, además del Máster en Consultoría Estratégica por Savills University. Cuento con inglés B2 (Cambridge First Certificate) y experiencia internacional Erasmus en Lisboa.

Gilmar es el gran líder de intermediación e inversiones inmobiliarias exclusivas en la Costa del Sol. Aporto visión comercial analítica, solvencia técnica para la captación y negociación, y orientación a cierre de acuerdos.

Os adjunto mi CV en PDF y quedo a vuestra disposición para mantener una conversación.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/` ,
    valueHook: "Gilmar gestiona las operaciones residenciales y de inversión más destacadas de la Costa del Sol. Mi formación en ADE + GESCO en ESIC junto a 5 años en Savills valorando activos e investigando el mercado aportan un perfil muy completo de captación, análisis y cierre comercial."
  },
  {
    id: "colliers_malaga",
    name: "Colliers International (Delegación Málaga & Costa del Sol)",
    category: "Consultoría Inmobiliaria Global, Asesoramiento de Inversión & Hoteles — Málaga",
    location: "Calle Marqués de Larios, 4, 29005 Málaga",
    phone: "+34 952 60 88 50",
    channel: "direct_email",
    contactTarget: "info.spain@colliers.com",
    contactRoleName: "Dirección de Inversiones y Advisory — Colliers Málaga",
    defaultRole: "strategic_consulting_business",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Consultor Advisory e Inversiones (5 años Savills)",
    priority: "alta",
    naturalEmail: `Estimado equipo directivo de Colliers Málaga:

Me pongo en contacto con vosotros para presentar mi perfil profesional de cara a posiciones de Consultor de Negocio, Advisory o Inversiones en vuestra oficina de Calle Larios en Málaga.

Durante los últimos 5 años he trabajado en consultoría corporativa en Savills en Málaga, especializándome en valoración pericial de activos singulares, estudios de mercado y modelización financiera para fondos institucionales y propietarios corporativos.

Graduado en ADE por la Universidad de Málaga (Erasmus en Lisboa), Máster por Savills University y Máster GESCO por ESIC. Cuento con un profundo conocimiento de las dinámicas del mercado de inversión inmobiliaria y hotelera en la Costa del Sol.

Colliers es referente global en transacciones de alto valor añadido. Aporto método analítico riguroso, solvencia técnica y agilidad en la entrega de memorandos y dictámenes periciales.

Adjunto mi CV en PDF para vuestra consideración y quedo a vuestra disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Colliers lidera operaciones de inversión hotelera, residencial y terciaria en la Costa del Sol. Mi experiencia técnica directa en Savills elaborando modelos financieros y análisis de viabilidad aporta valor inmediato a vuestro equipo de Málaga."
  },
  {
    id: "metrovacesa_malaga",
    name: "Metrovacesa (Delegación Andalucía Oriental / Málaga)",
    category: "Promotora Inmobiliaria Cotizada Líder en España — Delegación Málaga",
    location: "Calle Hilera, 8, Edificio Scala 2000, 29007 Málaga",
    phone: "+34 952 07 10 00",
    channel: "direct_email",
    contactTarget: "rrhh@metrovacesa.com",
    contactRoleName: "Dirección Territorial Andalucía Oriental — Metrovacesa Málaga",
    defaultRole: "business_development_expansion",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Expansión Comercial, Suelo y Gestión de Promociones",
    priority: "alta",
    naturalEmail: `Hola, equipo directivo de Metrovacesa Málaga:

Os escribo para presentar mi candidatura de cara a vuestra delegación territorial de Andalucía Oriental en Málaga, para áreas de Gestión de Suelo, Expansión Comercial o Desarrollo de Negocio.

Graduado en ADE por la Universidad de Málaga, cuento con doble titulación de máster (Consultoría Estratégica por Savills University y Dirección Comercial GESCO por ESIC). Durante los últimos 5 años en Savills en Málaga he realizado estudios de viabilidad de suelo, análisis comparativo de precios de venta, seguimiento de absorción de oferta y valoraciones patrimoniales.

Metrovacesa es una de las grandes promotoras cotizadas con mayor volumen de desarrollos emblemáticos en Málaga capital y la Costa del Sol. Mi perfil aúna análisis numérico riguroso con visión comercial y conocimiento urbanístico del mercado local.

Os adjunto mi currículum en PDF y quedo a vuestra disposición para una entrevista.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Metrovacesa cuenta con una de las mayores carteras de suelo y promociones activas en Málaga (Málaga Towers, Teatinos, etc.). Mis 5 años en Savills realizando estudios de viabilidad y análisis de mercado aportan una base sólida para la gestión de proyectos y captación de suelo."
  },
  {
    id: "aedas_homes_malaga",
    name: "AEDAS Homes (Delegación Costa del Sol / Málaga)",
    category: "Promotora Residencial Cotizada de Primer Nivel — Delegación Málaga",
    location: "Calle Marqués de Larios, 4, 29005 Málaga",
    phone: "+34 951 56 00 00",
    channel: "direct_email",
    contactTarget: "talento@aedashomes.com",
    contactRoleName: "Dirección Territorial Costa del Sol — AEDAS Homes Málaga",
    defaultRole: "business_operations_pm",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Project Management, Suelo y Gestión Comercial",
    priority: "alta",
    naturalEmail: `Estimado equipo directivo de AEDAS Homes Málaga:

Me dirijo a vosotros para presentar mi perfil profesional de cara a posiciones de Project Manager, Gestión de Suelo o Desarrollo de Negocio en vuestra delegación de Calle Larios en Málaga.

Soy Graduado en ADE por la UMA, Máster por Savills University y Máster GESCO en ESIC. En mis 5 años en Savills he coordinado proyectos de valoración de promociones, cronogramas de entrega con 100% de cumplimiento en plazo y análisis de rentabilidad financiera en Excel.

AEDAS Homes lidera la promoción residencial de calidad e industrialización en la Costa del Sol. Aporto rigor organizativo, capacidad de interlocución con agentes del sector y control presupuestario exhaustivo.

Adjunto mi CV en PDF para vuestra consideración y quedo a vuestra disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "AEDAS Homes destaca por su dinamismo en promociones residenciales prémium en Málaga y Costa del Sol. Mi doble perfil en ADE y ESIC junto a 5 años en Savills garantizan rigor en el seguimiento presupuestario y viabilidad de proyectos."
  },
  {
    id: "neinor_homes_malaga",
    name: "Neinor Homes (Delegación Andalucía Oriental)",
    category: "Promotora Residencial Líder en España — Delegación Málaga",
    location: "Paseo de Reding, 43, 29016 Málaga",
    phone: "+34 952 12 00 50",
    channel: "direct_email",
    contactTarget: "seleccion@neinorhomes.com",
    contactRoleName: "Dirección Territorial Andalucía Oriental — Neinor Homes Málaga",
    defaultRole: "business_development_expansion",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Expansión, Suelo y Operaciones Inmobiliarias",
    priority: "alta",
    naturalEmail: `Hola, equipo directivo de Neinor Homes Málaga:

Os contacto para compartir mi trayectoria profesional y presentar mi candidatura de cara a vuestra delegación de Paseo de Reding en Málaga, en áreas de Expansión, Suelo o Gestión Operativa de Proyectos.

Graduado en ADE por la Universidad de Málaga (Erasmus Lisboa), cursé el Máster en Consultoría Estratégica en Savills University y el Máster GESCO en ESIC. Durante 5 años en Savills en Málaga me he responsabilizado de la valoración de carteras, estudios de viabilidad comercial y prospección sectorial en Andalucía.

Neinor Homes lidera el mercado promotor residencial con un enfoque innovador y sostenible. Aporto solvencia analítica en Excel, capacidad para coordinar equipos y proveedores, y profundo conocimiento del territorio andaluz.

Os adjunto mi CV en PDF y quedo a vuestra disposición para ampliar cualquier información.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Neinor Homes cuenta con proyectos residenciales de gran escala en Málaga y Costa del Sol. Mi trayectoria analítica en Savills me capacita para evaluar oportunidades de suelo, analizar rentabilidades y gestionar proyectos con eficacia."
  },
  {
    id: "via_celere_malaga",
    name: "Vía Célere (Delegación Málaga)",
    category: "Promotora Residencial Innovadora — Delegación Málaga",
    location: "Calle Hilera, 10, 29007 Málaga",
    phone: "+34 951 98 00 20",
    channel: "direct_email",
    contactTarget: "talento@viacelere.com",
    contactRoleName: "Dirección Territorial Sur — Vía Célere Málaga",
    defaultRole: "business_operations_pm",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Project Management y Operaciones Inmobiliarias",
    priority: "alta",
    naturalEmail: `Estimado equipo directivo de Vía Célere Málaga:

Me pongo en contacto con vosotros para presentar mi candidatura de cara a vuestro equipo territorial en Calle Hilera en Málaga, en posiciones de Gestión de Operaciones, Project Management o Desarrollo de Negocio.

Soy Graduado en ADE por la UMA (Erasmus Lisboa), Máster por Savills University y Máster GESCO por ESIC. Durante los últimos 5 años en consultoría corporativa en Savills he coordinado proyectos complejos con estricto control de plazos, supervisado activos en campo y elaborado análisis económico-financieros.

Vía Célere es una promotora referente en industrialización e innovación residencial. Aporto solvencia metodológica, capacidad de gestión operativa y visión comercial para sumar al desarrollo de vuestras promociones en Málaga.

Adjunto mi CV en PDF y quedo a vuestra completa disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Vía Célere impulsa la vanguardia de la edificación residencial en Málaga. Mi perfil en ADE, máster en consultoría y dirección comercial y 5 años en Savills ofrecen una base sólida para la gestión operativa y viabilidad de proyectos."
  }
];

// Combine unique by id
const allCompanies = [...existing];
for (const comp of additional16) {
  const idx = allCompanies.findIndex(c => c.id === comp.id);
  if (idx >= 0) {
    allCompanies[idx] = comp;
  } else {
    allCompanies.push(comp);
  }
}

fs.writeFileSync(path.join(rootDir, 'data', 'companies.json'), JSON.stringify(allCompanies, null, 2), 'utf-8');
console.log(`Saved ${allCompanies.length} companies to data/companies.json`);
