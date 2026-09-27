import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const companies = [
  // ============================================================
  // CATEGORÍA 1: SUPERMERCADOS Y GRAN DISTRIBUCIÓN EN MÁLAGA
  // ============================================================
  {
    id: "maskom",
    name: "Maskom Supermercados (Sede Central Málaga)",
    category: "Cadena de Supermercados Líder en Málaga (Más de 55 tiendas)",
    location: "Polígono Industrial Santa Teresa, Calle Torre del Mar, 37, 29004 Málaga",
    phone: "+34 952 24 38 00",
    channel: "direct_email",
    contactTarget: "seleccion@maskom.es",
    contactRoleName: "Dirección de Recursos Humanos y Operaciones de Red — Maskom Supermercados",
    defaultRole: "area_manager_retail_ops",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Gerente de Zona / Operaciones de Tienda (ADE + Savills)",
    priority: "alta",
    naturalEmail: `Estimado equipo directivo de Maskom Supermercados:

Me pongo en contacto con vosotros para presentar mi candidatura de cara a posiciones de Gerencia de Zona (Area Manager), Responsable de Red de Tiendas o Gestión Operativa en vuestra estructura central de Málaga.

Soy Graduado en Administración y Dirección de Empresas (ADE) por la Universidad de Málaga (con estancia internacional Erasmus en Lisboa), Máster en Dirección de Marketing y Gestión Comercial (GESCO) por ESIC y Máster por Savills University. 

Durante los últimos 5 años he trabajado en consultoría corporativa en Savills en Málaga, donde mi día a día ha consistido en coordinar equipos sobre el terreno, supervisar cronogramas operativos con un 100% de cumplimiento en plazos, auditar exhaustivamente activos e instalaciones en campo y controlar cuentas de costes y presupuestos con alto rigor numérico en Excel.

Maskom es la cadena de supermercados malagueña por antonomasia, con más de 55 puntos de venta en la provincia. Mi combinación de visión analítica y comercial, hábito de trabajo en campo y capacidad para coordinar y motivar equipos me permite asumir con solvencia la supervisión de tiendas, control de mermas, cumplimiento de estándares de sala de ventas y optimización de la rentabilidad de cada supermercado. Cuento con carné de conducir y plena disponibilidad para desplazarme por la provincia.

Adjunto mi CV en PDF para vuestra consideración y quedo a vuestra completa disposición para mantener una entrevista cuando lo consideréis oportuno.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Maskom es la cadena malagueña de supermercados por excelencia, con más de 55 puntos de venta en la provincia. Mi perfil combina formación en ADE y Dirección Comercial (ESIC) con 5 años de experiencia sobre el terreno supervisando operaciones, auditorías de calidad y coordinación de equipos. Aporto solvencia inmediata para la gerencia de zona, control de estándares de tienda, reducción de mermas y dinamización de equipos en vuestra red de supermercados en Málaga."
  },
  {
    id: "mercadona",
    name: "Mercadona (Dirección y Bloque Logístico Antequera / Málaga)",
    category: "Líder Nacional de Supermercados — Dirección y Bloque Logístico Málaga",
    location: "Calle Castilla La Mancha, 217, 29200 Antequera, Málaga / Red de Tiendas provincia de Málaga",
    phone: "+34 952 70 77 27",
    channel: "portal",
    contactTarget: "https://www.mercadona.es/es/trabaja-con-nosotros",
    contactRoleName: "Departamento de Selección y Gestión de Tiendas — Bloque Logístico y Red Málaga",
    defaultRole: "area_manager_retail_ops",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Coordinador / Gerente de Tiendas en Málaga (ADE + Savills)",
    priority: "alta",
    naturalEmail: `Hola, equipo de Selección de Mercadona:

Os escribo para presentar mi perfil profesional de cara a posiciones de Gerente de Zona, Coordinador de Tiendas o Responsable de Operaciones en la provincia de Málaga.

Cuento con titulación en Administración y Dirección de Empresas (ADE) por la Universidad de Málaga (con estancia Erasmus en Lisboa), Máster GESCO en ESIC y Máster por Savills University. En los últimos 5 años en Savills en Málaga he liderado la supervisión de proyectos de inicio a fin, coordinando equipos de trabajo sobre el terreno, planificando calendarios y asegurando un control presupuestario riguroso.

El modelo de calidad total de Mercadona y su liderazgo en la provincia de Málaga exige gestores con rigor analítico, liderazgo cercano de equipos y capacidad de ejecución en el punto de venta. Cuento con carné de conducir, plena movilidad por la provincia y alta motivación para volcar mi experiencia en la excelencia operativa de vuestra red de supermercados.

Os adjunto mi currículum en PDF y quedo a vuestra completa disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "El modelo de calidad total de Mercadona y su liderazgo indiscutible en la provincia de Málaga, respaldado por su gran bloque logístico de Antequera, requiere perfiles con sólida disciplina analítica (ADE), rigor operativo y liderazgo cercano. Mi experiencia de 5 años gestionando cronogramas, auditorías técnicas de instalaciones y balance de cargas operativas encaja plenamente con la figura de Gerente de Zona / Responsable de Tiendas."
  },
  {
    id: "lidl",
    name: "Lidl Supermercados (Dirección Regional Sur & Plataforma Antequera)",
    category: "Gran Distribución & Supermercados — Dirección Regional y Plataforma Antequera/Málaga",
    location: "Parque Empresarial de Antequera, 29200 Antequera, Málaga / Red de Supermercados Málaga",
    phone: "+34 900 95 83 11",
    channel: "portal",
    contactTarget: "https://empleo.lidl.es",
    contactRoleName: "Dirección Regional Sur / Dpto. Selección Jefes de Ventas (Area Managers)",
    defaultRole: "area_manager_retail_ops",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Jefe/a de Ventas (Area Manager) Lidl Málaga",
    priority: "alta",
    naturalEmail: `Hola, equipo de Selección de Lidl España:

Me dirijo a vosotros para presentar mi candidatura al puesto de Jefe/a de Ventas (Area Manager) en la delegación regional de Málaga y Andalucía Sur.

Soy Graduado en ADE por la Universidad de Málaga (con programa Erasmus en Lisboa), Máster en Dirección Comercial (GESCO) por ESIC y Máster por Savills University. Cuento con 5 años de experiencia profesional en consultoría corporativa en Savills en Málaga, donde he coordinado equipos de trabajo multidisciplinares, auditado centros e instalaciones sobre el terreno y gestionado cuentas económicas con estricto control de plazos y rentabilidad.

La responsabilidad del Area Manager en Lidl —liderando de 4 a 6 tiendas, gestionando equipos de 80-100 personas, optimizando la cuenta de resultados de cada centro y garantizando la estricta aplicación de los estándares de frescura y eficiencia— encaja con mi perfil: formación económico-comercial sólida, capacidad de liderazgo, rigor cuantitativo y hábito de trabajo dinámico en campo. Dispongo de carné B y total movilidad en la provincia.

Adjunto mi currículum en PDF y quedo a vuestra disposición para participar en vuestro proceso de selección.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "La posición de Jefe/a de Ventas (Area Manager) en Lidl —gestionando de 4 a 6 tiendas, sus cuentas de explotación y sus equipos— encaja a la perfección con mi perfil: Licenciatura en ADE, Máster en Gestión Comercial (ESIC), experiencia en gestión de proyectos exigentes sobre el terreno y hábito de supervisión rigurosa de KPIs y estándares de calidad en la provincia de Málaga."
  },
  {
    id: "aldi",
    name: "Aldi Supermercados (Plataforma Logística y Delegación Málaga)",
    category: "Supermercados de Descuento — Plataforma Logística y Delegación Málaga",
    location: "Polígono Industrial de Antequera, 29200 Antequera, Málaga / Red de Tiendas Málaga",
    phone: "+34 900 90 24 66",
    channel: "portal",
    contactTarget: "https://empleo.aldi.es",
    contactRoleName: "Responsable de Selección y Personas / Dirección de Zona Sur Aldi",
    defaultRole: "area_manager_retail_ops",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Responsable de Zona / Area Manager Aldi Málaga",
    priority: "alta",
    naturalEmail: `Estimado equipo de Selección de Aldi:

Os escribo para manifestar mi interés en incorporarme a Aldi como Responsable de Zona (Area Manager) en la provincia de Málaga.

Tengo titulación en ADE por la Universidad de Málaga (con estancia Erasmus en Lisboa), Máster GESCO en ESIC y Máster por Savills University. A lo largo de mis 5 años de trayectoria en Savills en Málaga he asumido la gestión de proyectos de principio a fin: asignación de cargas operativas, auditorías técnicas in situ, control presupuestario y resolución ágil de incidencias.

El ambicioso plan de expansión de Aldi en Málaga y la Costa del Sol, respaldado por vuestra plataforma de Antequera, demanda profesionales capaces de liderar varias tiendas, maximizar sus ventas, auditar la experiencia de compra y motivar a los encargados de tienda. Cuento con carné B, movilidad provincial y gran motivación por el sector retail.

Adjunto mi CV en PDF y quedo a vuestra disposición para ampliar detalles de mi candidatura.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Conozco la fuerte fase de expansión de Aldi en la provincia de Málaga y el papel neurálgico de vuestra plataforma logística de Antequera. Como titulado en ADE y postgrado en ESIC, cuento con la visión analítica, liderazgo de equipos y agilidad operativa en campo necesarias para asumir con éxito la posición de Responsable de Zona / Area Manager en vuestra red de tiendas."
  },
  {
    id: "grupo_dia",
    name: "Grupo DIA (Dirección Regional y Red de Supermercados Málaga)",
    category: "Cadena de Supermercados de Proximidad & Franquicias — Delegación Málaga",
    location: "Delegación Regional Andalucía Sur, Málaga / Red de Tiendas provincia de Málaga",
    phone: "+34 91 398 54 00",
    channel: "portal",
    contactTarget: "https://diacorporate.com/empleo/",
    contactRoleName: "Dirección de Operaciones Regional & Supervisión de Franquicias DIA Málaga",
    defaultRole: "area_manager_retail_ops",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Gerente de Zona / Gestión de Red DIA Málaga",
    priority: "alta",
    naturalEmail: `Hola, equipo de Personas de Grupo DIA:

Me pongo en contacto con vosotros para presentar mi candidatura de cara a la Gerencia de Zona, Supervisión de Red de Tiendas o Franquicias en Málaga.

Graduado en ADE por la UMA (con estancia internacional en Lisboa), Máster GESCO por ESIC y Máster por Savills University. En mis 5 años en consultoría en Savills he coordinado equipos sobre el terreno, supervisado cronogramas de hitos críticos y controlado balances de costes con alto rigor analítico.

La transformación y foco de DIA en el supermercado de proximidad en los barrios de Málaga exige un seguimiento exhaustivo de la cuenta de explotación de cada tienda, gestión eficiente de mermas y un acompañamiento cercano a los equipos de tienda y franquiciados. Cuento con carné B y disponibilidad inmediata.

Os adjunto mi currículum en PDF para vuestra valoración y quedo a vuestra disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "La cercanía al barrio y la gestión de tiendas propias y franquiciadas de DIA en la provincia de Málaga requiere una supervisión rigurosa de la cuenta de explotación, control de surtido y motivación constante de los equipos de tienda. Mi trayectoria de 5 años en gestión de operaciones y análisis financiero aporta el rigor necesario para maximizar la rentabilidad de zona."
  },
  {
    id: "carrefour",
    name: "Carrefour España (Dirección Regional Andalucía / Hipermercados, Market y Express)",
    category: "Gran Distribución Multiformato (Hipermercados, Market y Express) — Málaga",
    location: "Avda. de Andalucía s/n (Alameda) / Avda. Manuel Agustín Heredia, Málaga",
    phone: "+34 91 490 89 00",
    channel: "portal",
    contactTarget: "https://www.carrefour.es/trabaja-en-carrefour/",
    contactRoleName: "Dirección Regional de Recursos Humanos y Operaciones — Carrefour Andalucía Sur",
    defaultRole: "area_manager_retail_ops",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Responsable de Red / Operaciones de Tienda Carrefour",
    priority: "alta",
    naturalEmail: `Estimado equipo de Recursos Humanos de Carrefour:

Os escribo para trasladar mi interés en colaborar en vuestras áreas de Gestión de Tiendas, Responsable de Red Carrefour Express o Dirección de Centro en la provincia de Málaga.

Soy Graduado en ADE por la Universidad de Málaga (con Erasmus en Lisboa), Máster GESCO en Dirección Comercial por ESIC y Máster por Savills University. Durante 5 años en Savills he liderado la coordinación de equipos en proyectos sobre el terreno, la auditoría técnica de instalaciones y el control cuantitativo de cuentas presupuestarias.

La gran presencia multiformato de Carrefour en Málaga (Hipermercados, Carrefour Market y la expansión continua de franquicias Express) requiere gestores de red con visión integral de negocio, rigor en márgenes y capacidad de liderazgo en sala de ventas.

Adjunto mi CV en PDF y quedo a vuestra entera disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "El ecosistema multiformato de Carrefour en Málaga (Hipermercados, Market y la expansión de la red de proximidad Express) exige perfiles comerciales y analíticos capaces de liderar la operativa de tienda, auditar la experiencia de cliente y optimizar márgenes y mermas. Mi perfil ADE + ESIC con 5 años de gestión en campo responde a este reto."
  },
  {
    id: "coviran",
    name: "Covirán (Plataforma Logística y Red de Supermercados Málaga)",
    category: "Cooperativa de Distribución Alimentaria & Supermercados — Plataforma Málaga",
    location: "Plataforma de Distribución Málaga / Casabermeja, 29160 Málaga",
    phone: "+34 958 80 83 00",
    channel: "portal",
    contactTarget: "https://career.coviran.com",
    contactRoleName: "Dirección de Operaciones y Red de Supermercados — Covirán Málaga",
    defaultRole: "area_manager_retail_ops",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Coordinador de Puntos de Venta y Operaciones Covirán",
    priority: "media",
    naturalEmail: `Hola, equipo de Selección de Covirán:

Me pongo en contacto con vosotros para presentar mi perfil para funciones de Coordinación de Puntos de Venta, Gestión de Red de Supermercados u Operaciones en la provincia de Málaga.

Graduado en ADE por la Universidad de Málaga, Máster en Dirección Comercial por ESIC y Máster por Savills University. Cuento con 5 años de trayectoria profesional coordinando equipos sobre el terreno, auditorías de centros y seguimiento económico de cuentas de resultados.

La capilaridad de Covirán en la provincia de Málaga requiere profesionales que apoyen a los socios en la gestión eficiente de sus tiendas, asegurando estándares de surtido, rentabilidad y frescura. Dispongo de carné B y movilidad por la provincia.

Adjunto mi CV para vuestra consideración y quedo a vuestra disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "La capilaridad de Covirán en la provincia de Málaga y su modelo de cooperativa de detallistas requiere profesionales con alta capacidad de interlocución, rigor en la cadena de suministro y asesoramiento operativo continuo a los gerentes de tienda para elevar la competitividad del punto de venta."
  },
  {
    id: "alcampo",
    name: "Alcampo (Hipermercados y Supermercados Málaga)",
    category: "Hipermercados y Supermercados de Alimentación — Málaga",
    location: "Centro Comercial La Trocha / Centros Alcampo en Málaga y Costa del Sol",
    phone: "+34 91 730 66 66",
    channel: "portal",
    contactTarget: "https://alcampocorporativo.es/trabaja-con-nosotros/",
    contactRoleName: "Dirección de Recursos Humanos y Dirección de Centro — Alcampo Málaga",
    defaultRole: "store_operations_manager",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Responsable de Comercio / Operaciones de Centro",
    priority: "media",
    naturalEmail: `Estimado equipo de Recursos Humanos de Alcampo:

Os escribo para presentar mi perfil profesional de cara a puestos de Responsable de Comercio, Dirección de Operaciones o Gestión de Sección en vuestros centros de la provincia de Málaga.

Soy Graduado en ADE por la UMA (con Erasmus en Lisboa), Máster GESCO por ESIC y Máster por Savills University. He trabajado 5 años en consultoría en Savills coordinando equipos, gestionando calendarios operativos y auditando la correcta ejecución de proyectos en campo bajo estrictos criterios de calidad.

El compromiso de Alcampo con el comercio de cercanía y los productos locales en Málaga requiere responsables de comercio y operaciones orientados al cliente, con solvencia en control presupuestario y dinamización de equipos en sala de ventas.

Adjunto mi CV en PDF para vuestra consideración y quedo a vuestra completa disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "El compromiso de Alcampo con el comercio de cercanía y los productos locales en Málaga requiere responsables de comercio y operaciones orientados al cliente, con solvencia en control presupuestario y dinamización de equipos en sala de ventas."
  },
  {
    id: "supercor",
    name: "Supercor / El Corte Inglés (Red de Supermercados Málaga y Costa del Sol)",
    category: "Supermercados de Calidad y Proximidad — Grupo El Corte Inglés Málaga",
    location: "Calle Hilera, 8, 29007 Málaga / Puerto Banús / Mijas",
    phone: "+34 952 07 65 00",
    channel: "portal",
    contactTarget: "https://empleo.elcorteingles.es",
    contactRoleName: "Dirección de Supermercados Supercor y Alimentación — Delegación Málaga",
    defaultRole: "store_operations_manager",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Dirección de Supermercado / Gerencia de Tienda",
    priority: "media",
    naturalEmail: `Hola, equipo de Selección de El Corte Inglés / Supercor:

Me dirijo a vosotros para compartir mi trayectoria profesional y manifestar mi interés en la Dirección de Supermercados Supercor o Gestión de Operaciones en la provincia de Málaga.

Graduado en ADE por la UMA, Máster GESCO en ESIC y Máster en Savills University. Cuento con 5 años de trayectoria profesional gestionando equipos sobre el terreno, controlando presupuestos y asegurando el cumplimiento de altos estándares de servicio.

El posicionamiento premium y la exigencia de calidad en la red de Supercor en Málaga y la Costa del Sol precisa de responsables de tienda con solvencia en gestión de personas, control de mermas y orientación al cliente.

Os adjunto mi currículum en PDF y quedo a vuestra disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "La excelencia en atención al cliente, la selección de producto fresco y el estándar de calidad de Supercor en Málaga y la Costa del Sol precisan de una dirección de tienda rigurosa, atenta al detalle y con experiencia en gestión de equipos y cuentas de explotación."
  },
  {
    id: "dcoop",
    name: "Dcoop (Sede Central Antequera, Málaga)",
    category: "Mayor Cooperativa Agroalimentaria & Distribución — Sede Central Antequera",
    location: "Carretera de Córdoba, s/n, 29200 Antequera, Málaga",
    phone: "+34 952 84 14 51",
    channel: "direct_email",
    contactTarget: "rrhh@dcoop.es",
    contactRoleName: "Dirección Corporativa de Operaciones y Gestión de Personas — Dcoop Antequera",
    defaultRole: "business_operations_pm",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Operaciones, Gestión y Control de Negocio (ADE + Savills)",
    priority: "alta",
    naturalEmail: `Estimado equipo directivo de Dcoop:

Me dirijo a vosotros para presentar mi candidatura de cara a vuestras áreas de Operaciones, Gestión de Procesos o Control de Gestión en vuestra sede central de Antequera.

Soy Graduado en ADE por la Universidad de Málaga (con formación Erasmus en Lisboa), Máster GESCO por ESIC y Máster por Savills University. En mis 5 años en Savills he coordinado proyectos de principio a fin: asignación de cargas de trabajo a equipos, auditorías in situ de instalaciones y modelado financiero de rentabilidad en Excel.

Dcoop es el mayor grupo agroalimentario del sur de España y un motor económico de la provincia de Málaga. Mi perfil combina rigor analítico cuantitativo, capacidad de organización de equipos y vocación operativa sobre el terreno para sumar valor a vuestra operativa diaria.

Adjunto mi CV en PDF para vuestra valoración y quedo a vuestra entera disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Dcoop es el gigante agroalimentario de referencia con sede central en la provincia de Málaga. Mi titulación en ADE por la UMA, Máster GESCO (ESIC) y 5 años de coordinación de proyectos y control cuantitativo me permiten aportar solvencia técnica en operaciones comerciales, control de gestión y proyectos corporativos."
  },

  // ============================================================
  // CATEGORÍA 2: RETAIL MULTI-TIENDA Y GRANDES SUPERFICIES MÁLAGA
  // ============================================================
  {
    id: "primor",
    name: "Perfumerías Primor (Sede Central Global en Málaga)",
    category: "Sede Central Global en Málaga — Cadena Líder de Retail y Belleza (Más de 250 tiendas)",
    location: "Calle Trébol, 4, Polígono Industrial San Luis / Parcemasa, 29006 Málaga",
    phone: "+34 952 04 07 42",
    channel: "direct_email",
    contactTarget: "cvprimor@primor.eu",
    contactRoleName: "Dirección de Operaciones Retail y Gestión de Tiendas — Perfumerías Primor Málaga",
    defaultRole: "area_manager_retail_ops",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Coordinación de Tiendas / Operaciones Retail (Sede Málaga)",
    priority: "alta",
    naturalEmail: `Estimado equipo directivo de Perfumerías Primor:

Me pongo en contacto con vosotros para presentar mi candidatura para vuestra área de Operaciones Retail, Coordinación de Tiendas (Area Manager) o Expansión en vuestra sede central de Málaga.

Soy Graduado en Administración y Dirección de Empresas por la Universidad de Málaga (Erasmus en Lisboa), Máster GESCO en Dirección Comercial y Marketing por ESIC y Máster por Savills University. Durante los últimos 5 años he trabajado en consultoría corporativa en Savills en Málaga, liderando la coordinación operativa de proyectos, auditorías técnicas sobre el terreno, gestión presupuestaria y supervisión de cargas de trabajo de equipos.

Primor es el mayor referente del retail malagueño a escala nacional e internacional. Con más de 250 puntos de venta, asegurar la estandarización operativa, la correcta gestión de personal de tienda, el control de inventario y la resolución rápida de contingencias en los locales exige capacidad de gestión en campo y rigor en datos, cualidades consolidadas en mi trayectoria. Cuento con carné B y movilidad total.

Adjunto mi currículum en PDF para vuestra consideración y quedo a vuestra completa disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Primor es el caso de éxito de retail más destacado nacido y gestionado desde Málaga. Con más de 250 tiendas en España y Portugal, la coordinación de operaciones de tienda, auditoría de surtido, gestión de personal de tienda y apertura de nuevos locales requiere rigor y capacidad de acción rápida sobre el terreno. Mi perfil ADE + ESIC con 5 años de gestión en campo y trato continuo con equipos me posiciona como un activo de valor para vuestra dirección de red."
  },
  {
    id: "tiendanimal",
    name: "Tiendanimal / Kiwoko (IskayPet) (Sede Central Málaga TechPark)",
    category: "Sede Central Corporativa en Málaga TechPark — Líder de Retail Especializado (250+ tiendas)",
    location: "Calle Severo Ochoa, 16, Málaga TechPark, 29590 Campanillas, Málaga",
    phone: "+34 900 84 46 68",
    channel: "direct_email",
    contactTarget: "atencionalcliente@tiendanimal.es",
    contactRoleName: "Retail Operations Director & Talent Acquisition Lead — IskayPet Málaga TechPark",
    defaultRole: "area_manager_retail_ops",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Retail Operations / Area Manager (Sede Málaga TechPark)",
    priority: "alta",
    naturalEmail: `Hola, equipo directivo de IskayPet / Tiendanimal:

Os escribo para presentar mi perfil profesional de cara a posiciones de Retail Area Manager, Operaciones de Red de Tiendas o Business Operations en vuestra sede central de Málaga TechPark.

Soy Graduado en ADE por la Universidad de Málaga (con estancia Erasmus en Lisboa), Máster GESCO en Dirección Comercial por ESIC y Máster por Savills University. A lo largo de mis 5 años de trayectoria profesional en Savills en Málaga he asumido la coordinación operativa de proyectos en campo, supervisión de cronogramas, auditoría de instalaciones y seguimiento de presupuestos.

El liderazgo de IskayPet como grupo referente del cuidado de mascotas en España y su red de más de 250 tiendas precisa de gestores operativos con visión analítica de cuenta de resultados (P&L), capacidad de auditoría en tienda y liderazgo motivador de equipos.

Os adjunto mi currículum en PDF y quedo a vuestra disposición para mantener una conversación inicial.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Conozco el liderazgo de IskayPet desde vuestra sede central en Málaga TechPark gestionando la red nacional de Tiendanimal y Kiwoko. Como titulado en ADE y Máster GESCO (ESIC), aporto experiencia en supervisión operativa de inicio a fin, control presupuestario y motivación de equipos, idóneo para la posición de Area Manager o Retail Operations."
  },
  {
    id: "mayoral",
    name: "Mayoral Moda Infantil (Sede Central Málaga)",
    category: "Sede Central Global en Málaga — Multinacional Retail y Confección (Red de Tiendas Propia y Franquicias)",
    location: "Calle La Orotava, 118, 29006 Málaga",
    phone: "+34 952 04 52 04",
    channel: "direct_email",
    contactTarget: "sales@mayoral.com",
    contactRoleName: "Dirección de Retail, Operaciones de Tienda y Personas — Mayoral Málaga",
    defaultRole: "area_manager_retail_ops",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Operaciones Retail / Coordinación de Tiendas (Mayoral Málaga)",
    priority: "alta",
    naturalEmail: `Estimado equipo directivo de Mayoral:

Me dirijo a vosotros para compartir mi trayectoria profesional y manifestar mi interés en colaborar en vuestras áreas corporativas de Operaciones Retail, Coordinación de Red de Tiendas o Gestión de Personas en vuestra sede central de Calle La Orotava en Málaga.

Graduado en ADE por la UMA (Erasmus en Lisboa), Máster GESCO por ESIC y Máster por Savills University. En mis 5 años en consultoría en Savills he coordinado proyectos de inicio a fin: planificación de cronogramas de hitos críticos, balance de cargas de trabajo de equipos, control de costes y presupuestos, y resolución ágil de contingencias sobre el terreno.

Mayoral es el referente indiscutible del tejido empresarial y retail malagueño a escala global. Mi perfil híbrido en gestión operativa de proyectos, coordinación de personal y análisis comercial me permite contribuir a la eficiencia operativa de la red de tiendas, auditoría de estándares comerciales y cumplimiento de objetivos de negocio.

Adjunto mi CV en PDF para vuestra consideración y quedo a vuestra completa disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Mayoral gestiona una extensa red global de tiendas comerciales Mayoral y Boston desde su sede de Calle La Orotava en Málaga. Mi perfil híbrido en gestión operativa de proyectos, coordinación de personal y análisis comercial me permite contribuir a la eficiencia de la red de tiendas, control de stocks y estándares visuales y comerciales."
  },
  {
    id: "leroy_merlin",
    name: "Leroy Merlin (Centros Málaga y Marbella)",
    category: "Gran Distribución de Bricolaje, Hogar y Construcción — Centros Málaga y Costa del Sol",
    location: "Parque Comercial Plaza Mayor / Marbella, 29004 Málaga",
    phone: "+34 952 17 64 00",
    channel: "portal",
    contactTarget: "https://empleo.leroymerlin.es",
    contactRoleName: "Dirección de Tienda y Recursos Humanos — Leroy Merlin Málaga",
    defaultRole: "store_operations_manager",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Jefe/a de Sector / Operaciones Leroy Merlin Málaga",
    priority: "alta",
    naturalEmail: `Hola, equipo de Recursos Humanos de Leroy Merlin:

Os escribo para presentar mi candidatura de cara a posiciones de Jefe/a de Sector, Responsable de Operaciones o Dirección de Tienda en la provincia de Málaga.

Soy Graduado en ADE por la UMA, Máster GESCO en ESIC y Máster en Savills University. Cuento con 5 años de trayectoria en consultoría corporativa en Savills en Málaga, donde he gestionado proyectos sobre el terreno, coordinado equipos de trabajo, controlado presupuestos y supervisado instalaciones bajo rigurosos protocolos de calidad.

La figura de Jefe/a de Sector en Leroy Merlin —liderando la cuenta de explotación de la sección, gestionando stocks y guiando a un equipo comercial hacia la excelencia de servicio— encaja plenamente con mi formación y disciplina de gestión.

Os adjunto mi currículum en PDF y quedo a vuestra disposición para participar en vuestros procesos de selección.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "La posición de Jefe/a de Sector o Responsable de Operaciones en Leroy Merlin Málaga —liderando equipos comerciales, gestionando la cuenta de explotación de la sección y asegurando la disponibilidad de stock— encaja directamente con mi base en ADE, rigor analítico y solvencia en resolución de incidencias en campo."
  },
  {
    id: "decathlon",
    name: "Decathlon (Centros Málaga Guadalmar y Mijas)",
    category: "Líder en Distribución Deportiva — Centros Málaga Guadalmar y Mijas",
    location: "Calle Manuel Ramos Andrade s/n (Guadalmar), 29004 Málaga",
    phone: "+34 952 24 37 00",
    channel: "portal",
    contactTarget: "https://trabajaconnosotros.decathlon.es",
    contactRoleName: "Líder de Operaciones y Personas / Dirección de Tienda — Decathlon Málaga",
    defaultRole: "store_operations_manager",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Responsable de Sección / Operaciones Decathlon Málaga",
    priority: "alta",
    naturalEmail: `Hola, equipo de Decathlon Málaga:

Me pongo en contacto con vosotros para presentar mi perfil para puestos de Responsable de Sección / Operaciones o Dirección de Tienda en vuestros centros de Málaga.

Graduado en ADE por la Universidad de Málaga (con Erasmus en Lisboa), Máster GESCO por ESIC y Máster por Savills University. En mis 5 años de trayectoria profesional he desarrollado una fuerte capacidad organizativa: planificación de turnos y cargas de trabajo, control presupuestario de expedientes y resolución ágil de problemas en campo.

Decathlon destaca por empoderar a sus responsables en la toma de decisiones comerciales y en la gestión de sus equipos. Aporto solvencia analítica, dinamismo, liderazgo de personas y compromiso con la satisfacción de cliente.

Adjunto mi currículum en PDF y quedo a vuestra entera disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Decathlon es pionera en otorgar autonomía y responsabilidad sobre la cuenta de explotación a sus líderes de sección y tienda. Mi formación en ADE (UMA) y Máster GESCO (ESIC), junto a mi experiencia coordinando proyectos y equipos con plenas garantías en Savills, me capacita para dirigir la operativa y el dinamismo comercial en Málaga."
  },
  {
    id: "ikea",
    name: "IKEA Málaga (Parque Comercial Plaza Mayor)",
    category: "Líder de Mobiliario y Retail del Hogar — Centro IKEA Málaga",
    location: "Avda. Velázquez, 389 (Plaza Mayor), 29004 Málaga",
    phone: "+34 900 40 09 22",
    channel: "portal",
    contactTarget: "https://www.ikea.com/es/es/this-is-ikea/work-with-us/",
    contactRoleName: "People & Culture Manager / Operations Unit Leader — IKEA Málaga",
    defaultRole: "store_operations_manager",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Unit Leader / Operaciones y Negocio IKEA Málaga",
    priority: "alta",
    naturalEmail: `Estimado equipo de People & Culture de IKEA Málaga:

Os escribo para presentar mi perfil profesional de cara a posiciones de liderazgo de operaciones, gestión de flujos de cliente o coordinación de áreas en la tienda de IKEA Málaga.

Soy Graduado en ADE por la UMA (Erasmus en Lisboa), Máster GESCO en ESIC y Máster por Savills University. Con 5 años de experiencia en consultoría corporativa en Savills en Málaga, he coordinado equipos de trabajo, gestionado calendarios operativos y asegurado el cumplimiento riguroso de procedimientos técnicos y económicos.

La escala operativa de IKEA en Málaga demanda perfiles con visión analítica, rigor organizativo y liderazgo cercano para coordinar equipos de tienda y optimizar la experiencia de visita.

Adjunto mi CV en PDF y quedo a vuestra disposición para mantener una entrevista.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "La escala operativa de IKEA Málaga exige una planificación exhaustiva de flujos de clientes, balance de turnos de trabajo y coordinación interdepartamental constante. Aporto formación en ADE, visión estratégica y 5 años de gestión rigurosa de cronogramas y personas sobre el terreno."
  },
  {
    id: "mediamarkt",
    name: "MediaMarkt (Málaga Vialia, Plaza Mayor, Marbella)",
    category: "Líder en Electrónica de Consumo y Retail Omnicanal — Málaga",
    location: "C.C. Vialia Estación María Zambrano / Plaza Mayor, Málaga",
    phone: "+34 952 04 88 00",
    channel: "portal",
    contactTarget: "https://empleo.mediamarkt.es",
    contactRoleName: "Head of Sales & Operations / People Lead — MediaMarkt Málaga",
    defaultRole: "store_operations_manager",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Department Manager / Sales & Operations MediaMarkt",
    priority: "media",
    naturalEmail: `Hola, equipo de MediaMarkt Málaga:

Me dirijo a vosotros para compartir mi trayectoria profesional y presentar mi candidatura para puestos de Department Manager o Responsable de Operaciones y Ventas en vuestras tiendas de Málaga.

Tengo formación en ADE por la UMA, Máster GESCO por ESIC y Máster por Savills University. Cuento con 5 años de experiencia profesional coordinando proyectos sobre el terreno, supervisando cargas de trabajo, controlando presupuestos en Excel y resolviendo contingencias operativas con rapidez.

El dinamismo del modelo omnicanal de MediaMarkt requiere responsables que dominen la cuenta de explotación de su departamento, lideren al equipo comercial hacia objetivos y aseguren una óptima gestión del stock.

Os adjunto mi currículum en PDF y quedo a vuestra disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "El retail omnicanal de MediaMarkt en centros clave de Málaga demanda responsables de operaciones capaces de sincronizar venta física y digital, gestionar equipos orientados a objetivos y velar por la rentabilidad y control de inventarios."
  },
  {
    id: "isrg_sprinter",
    name: "Sprinter / JD Sports (ISRG) (Red de Tiendas Málaga)",
    category: "Grupo Líder de Retail Deportivo — Red de Tiendas Málaga",
    location: "Centros Comerciales Larios Centro, Vialia, Plaza Mayor, Málaga",
    phone: "+34 966 64 00 00",
    channel: "portal",
    contactTarget: "https://isrg.jobs.net/es-ES/",
    contactRoleName: "Area Manager Andalucía / People Partner — ISRG Sprinter Málaga",
    defaultRole: "area_manager_retail_ops",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Area Manager / Store Manager ISRG Málaga",
    priority: "alta",
    naturalEmail: `Hola, equipo de Selección de Iberian Sports Retail Group (Sprinter / JD Sports):

Os escribo para presentar mi candidatura de cara a posiciones de Area Manager o Store Manager en la provincia de Málaga.

Soy Graduado en ADE por la Universidad de Málaga (con estancia internacional en Lisboa), Máster GESCO en Dirección Comercial por ESIC y Máster por Savills University. A lo largo de 5 años en consultoría en Savills he coordinado equipos de trabajo en campo, auditado instalaciones y supervisado presupuestos con rigor analítico.

Con múltiples tiendas de Sprinter y JD Sports operando a pleno rendimiento en la provincia de Málaga, la posición de Area Manager o Store Manager requiere supervisión constante de ventas por metro cuadrado, rotación de producto y liderazgo dinámico de equipos. Cuento con carné B y disponibilidad para viajar por la provincia.

Adjunto mi CV en PDF para vuestra valoración y quedo a vuestra disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Con múltiples tiendas de Sprinter y JD Sports operando a pleno rendimiento en la provincia de Málaga, la posición de Area Manager o Store Manager requiere supervisión constante de ventas por metro cuadrado, rotación de producto y liderazgo dinámico de equipos jóvenes."
  },
  {
    id: "primark",
    name: "Primark (Centros Larios Centro y Miramar Fuengirola)",
    category: "Gran Distribución de Moda — Centros Larios Centro y Fuengirola",
    location: "Centro Comercial Larios Centro, Avda. de la Aurora, 25, 29002 Málaga",
    phone: "+34 952 36 84 00",
    channel: "portal",
    contactTarget: "https://es.primark.com/careers",
    contactRoleName: "People & Culture Lead / Store Operations Manager — Primark Larios Málaga",
    defaultRole: "store_operations_manager",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Department Manager / Retail Operations Primark",
    priority: "media",
    naturalEmail: `Estimado equipo de Selección de Primark Málaga:

Os escribo para presentar mi perfil para puestos de Department Manager, Responsable de Operaciones de Tienda o Gestión de Personas en vuestros centros de Málaga.

Soy Graduado en ADE por la UMA (Erasmus en Lisboa), Máster GESCO en ESIC y Máster por Savills University. En mis 5 años en Savills he gestionado equipos de trabajo, organizado calendarios operativos y auditado procedimientos con alto rigor.

Primor y Primark en Larios Centro representan dos de los motores comerciales con mayor afluencia de Málaga. Mi experiencia en gestionar cargas de trabajo operativas bajo exigencia y mi formación económico-comercial me permiten aportar valor inmediato en la gestión de sala de ventas y personas.

Adjunto mi CV en PDF y quedo a vuestra disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Primark Larios Centro es uno de los motores comerciales con mayor tráfico de personas de Andalucía. Mi formación en ADE y postgrado en ESIC, combinada con el hábito de gestionar cargas operativas de trabajo bajo presión, me permite liderar con éxito equipos y operativas de alta exigencia."
  },
  {
    id: "action",
    name: "Action España (Red de Tiendas en Expansión en Málaga)",
    category: "Cadena de Retail de Crecimiento Rápido — Red Málaga",
    location: "Parques Comerciales en Málaga capital y provincia",
    phone: "+34 91 903 00 00",
    channel: "portal",
    contactTarget: "https://es.action.jobs/",
    contactRoleName: "Regional Operations Manager / Selección de Responsables de Tienda Action",
    defaultRole: "area_manager_retail_ops",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Area Manager / Responsable de Tienda Action Málaga",
    priority: "alta",
    naturalEmail: `Hola, equipo de Selección de Action España:

Me pongo en contacto con vosotros para presentar mi candidatura de cara a vuestra fuerte expansión en la provincia de Málaga, en posiciones de Responsable de Tienda o Area Manager.

Graduado en ADE por la UMA (Erasmus Lisboa), Máster GESCO en ESIC y Máster en Savills University. Con 5 años de trayectoria profesional en Savills en Málaga, he coordinado proyectos sobre el terreno, supervisado equipos, auditado el cumplimiento de procedimientos operativos y gestionado presupuestos.

El modelo de descuento y alta rotación de Action requiere gestores con capacidad analítica (ADE), agilidad en reposición y rigor en estándares de tienda. Dispongo de carné B y total movilidad.

Adjunto mi CV en PDF para vuestra consideración y quedo a vuestra entera disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Action es la cadena de tiendas de descuento no alimentario que más rápido se expande en Europa y en la provincia de Málaga. Buscáis gestores con visión de negocio (ADE), liderazgo cercano y capacidad para garantizar la estricta implantación de procedimientos operativos de tienda."
  },
  {
    id: "pepco",
    name: "Pepco / Dealz (Red de Tiendas provincia de Málaga)",
    category: "Cadena de Retail y Variedad — Expansión en la Provincia de Málaga",
    location: "Centros Comerciales Málaga Plaza, Rincón de la Victoria, Fuengirola, Marbella",
    phone: "+34 91 187 65 00",
    channel: "portal",
    contactTarget: "https://pepco.es/empleo/",
    contactRoleName: "Area Manager Andalucía / Dpto. Selección Retail Pepco",
    defaultRole: "area_manager_retail_ops",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Area Manager / Responsable de Zona Pepco Málaga",
    priority: "media",
    naturalEmail: `Hola, equipo de Pepco España:

Os escribo para manifestar mi interés en la posición de Area Manager o Responsable de Zona para vuestra red de tiendas en la provincia de Málaga.

Soy Graduado en ADE por la UMA, Máster GESCO por ESIC y Máster por Savills University. Cuento con 5 años de experiencia en coordinación de proyectos en campo, auditorías técnicas in situ y seguimiento de presupuestos y cronogramas.

La fuerte implantación de Pepco en Málaga exige perfiles con capacidad de supervisar múltiples unidades, auditar visual merchandising y stock, y motivar a los encargados de tienda hacia los objetivos de facturación. Dispongo de carné B y disponibilidad inmediata.

Adjunto mi currículum en PDF y quedo a vuestra disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "La fuerte implantación de Pepco en Málaga requiere perfiles multi-tienda que auditen el cumplimiento de estándares comerciales, gestionen la reposición masiva y lideren al equipo humano hacia la consecución de objetivos comerciales."
  },
  {
    id: "bauhaus",
    name: "Bauhaus Málaga (Parque Comercial Málaga Nostrum)",
    category: "Gran Superficie de Bricolaje, Construcción y Jardín — Málaga Nostrum",
    location: "Parque Comercial Málaga Nostrum, Calle Jaén, 29004 Málaga",
    phone: "+34 952 04 80 00",
    channel: "portal",
    contactTarget: "https://www.bauhaus.es/empleo",
    contactRoleName: "Dirección de Centro y Jefatura de Operaciones — Bauhaus Málaga",
    defaultRole: "store_operations_manager",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Jefe/a de Sector / Operaciones Bauhaus Málaga",
    priority: "media",
    naturalEmail: `Estimado equipo de Selección de Bauhaus Málaga:

Me dirijo a vosotros para presentar mi perfil profesional para puestos de Jefe/a de Sector, Operaciones de Centro o Dirección Comercial en vuestro centro de Málaga Nostrum.

Graduado en ADE por la UMA (Erasmus Lisboa), Máster GESCO en ESIC y Máster por Savills University. En mis 5 años en Savills he coordinado equipos de trabajo en campo, auditado instalaciones y controlado costes operativos con solvencia en Excel.

La gestión de un centro de gran dimensión como Bauhaus Málaga demanda perfiles con sólida comprensión financiera, rigor en inventarios y capacidad probada en resolución ágil de incidencias sobre el terreno.

Adjunto mi CV en PDF para vuestra valoración y quedo a vuestra disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "La gestión de un centro de gran dimensión como Bauhaus Málaga demanda perfiles con sólida comprensión financiera, rigor en inventarios y capacidad probada en resolución ágil de incidencias sobre el terreno."
  },
  {
    id: "conforama",
    name: "Conforama Málaga (Parque Comercial Málaga Nostrum)",
    category: "Equipamiento del Hogar y Mueble — Parque Comercial Málaga Nostrum",
    location: "Calle Jaén, 1, 29004 Málaga",
    phone: "+34 952 24 39 00",
    channel: "portal",
    contactTarget: "https://empleo.conforama.es/",
    contactRoleName: "Dirección de Tienda y Operaciones — Conforama Málaga",
    defaultRole: "store_operations_manager",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Responsable de Operaciones y Tienda Conforama",
    priority: "media",
    naturalEmail: `Hola, equipo de Conforama Málaga:

Os escribo para presentar mi candidatura de cara a la Dirección de Tienda, Jefatura de Sección o Responsable de Operaciones en vuestro centro de Málaga Nostrum.

Soy Graduado en ADE por la UMA, Máster GESCO por ESIC y Máster por Savills University. Durante 5 años en consultoría en Savills he gestionado equipos, asegurado el cumplimiento de cronogramas y controlado presupuestos de operación.

La coordinación entre sala de ventas, almacén y atención al cliente en Conforama requiere gestores con capacidad resolutiva y disciplina organizativa.

Adjunto mi CV en PDF y quedo a vuestra completa disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "La optimización del showroom, la coordinación del servicio de entrega y almacén y el liderazgo de la fuerza de ventas en Conforama Málaga se benefician de un profesional con doble postgrado en gestión y marketing y solvencia operativa demostrada."
  },

  // ============================================================
  // CATEGORÍA 3: RESTAURACIÓN ORGANIZADA Y MULTI-UNIDAD MÁLAGA
  // ============================================================
  {
    id: "rbi_burgerking",
    name: "Restaurant Brands Iberia (Burger King / Popeyes / Tim Hortons)",
    category: "Grupo Líder de Restauración Organizada — Supervisión de Red Málaga",
    location: "Delegación Operativa Andalucía Sur / Red de Restaurantes provincia de Málaga",
    phone: "+34 91 540 16 26",
    channel: "portal",
    contactTarget: "https://www.rbiberia.com/talento/",
    contactRoleName: "District Manager / Operations Director Andalucía — Restaurant Brands Iberia",
    defaultRole: "area_manager_retail_ops",
    emailSubject: "Candidatura profesional | Ignacio Fernández — District Manager / Supervisor de Zona RBI Málaga",
    priority: "alta",
    naturalEmail: `Estimado equipo de Personas y Operaciones de Restaurant Brands Iberia:

Os escribo para presentar mi perfil para la posición de District Manager (Supervisor de Zona) en la provincia de Málaga.

Soy Graduado en ADE por la Universidad de Málaga (con Erasmus en Lisboa), Máster GESCO en Dirección Comercial por ESIC y Máster por Savills University. En mis 5 años de trayectoria profesional en Savills en Málaga he coordinado equipos de trabajo sobre el terreno, planificado cargas operativas, auditado centros y supervisado cuentas presupuestarias con alto rigor.

El rol de District Manager en RBI —supervisando de 5 a 8 restaurantes, garantizando la calidad y velocidad de servicio, auditando cuentas de explotación (P&L) y desarrollando a los gerentes de local— encaja con mi perfil analítico, capacidad de liderazgo en campo y hábito de supervisión de estándares. Cuento con carné B y disponibilidad para desplazarme por la provincia.

Adjunto mi currículum en PDF y quedo a vuestra disposición para participar en el proceso de selección.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "El rol de District Manager o Supervisor de Operaciones en RBI —gestionando una agrupación de 5 a 8 restaurantes, sus auditorías de servicio y sus cuentas de explotación— demanda rigor en procedimientos, control de costes y liderazgo motivador de equipos. Mi base ADE + ESIC con 5 años de gestión en campo encaja directamente con este reto."
  },
  {
    id: "alsea",
    name: "Alsea Iberia (Domino's Pizza, Starbucks, Vips) (Red Málaga)",
    category: "Operador Líder de Restauración Multimarca — Red de Tiendas Málaga",
    location: "Red de Establecimientos Málaga y Costa del Sol",
    phone: "+34 91 382 98 00",
    channel: "portal",
    contactTarget: "https://empleo.alsea.net/",
    contactRoleName: "Area Manager / Talent Partner Andalucía — Alsea Iberia",
    defaultRole: "area_manager_retail_ops",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Area Manager / Supervisor de Operaciones Alsea Málaga",
    priority: "media",
    naturalEmail: `Hola, equipo de Talento de Alsea Iberia:

Me pongo en contacto con vosotros para presentar mi candidatura como Area Manager / Supervisor de Operaciones para vuestras marcas (Starbucks, Domino's Pizza, Vips) en Málaga y la Costa del Sol.

Graduado en ADE por la UMA, Máster GESCO en ESIC y Máster por Savills University. Cuento con 5 años de experiencia en coordinación operativa de equipos, auditorías in situ de locales y control presupuestario riguroso.

Supervisar múltiples unidades de restauración organizada requiere velar por la uniformidad de estándares, asegurar la rentabilidad de cada tienda y capacitar a los equipos de local. Dispongo de carné B y total movilidad.

Adjunto mi CV en PDF y quedo a vuestra disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "La supervisión de múltiples unidades de Starbucks, Domino's o Vips en la provincia de Málaga requiere asegurar la uniformidad en los estándares de marca, auditar cuentas de pérdidas y ganancias de cada local y coordinar equipos de tienda."
  },
  {
    id: "restalia",
    name: "Grupo Restalia (100 Montaditos, TGB, La Sureña)",
    category: "Multinacional de Franquicias de Restauración — Delegación Málaga",
    location: "Red de Franquicias y Locales en Málaga y provincia",
    phone: "+34 91 351 90 00",
    channel: "portal",
    contactTarget: "https://gruporestalia.com/trabaja-con-nosotros/",
    contactRoleName: "Dirección de Franquicias y Supervisión Operativa — Restalia Málaga",
    defaultRole: "area_manager_retail_ops",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Supervisor de Franquicias / Operaciones de Zona",
    priority: "media",
    naturalEmail: `Hola, equipo de Franquicias de Grupo Restalia:

Os escribo para presentar mi perfil para posiciones de Supervisión de Zona y Asesoría Operativa a Franquiciados en la provincia de Málaga.

Soy Graduado en ADE por la UMA (Erasmus Lisboa), Máster GESCO por ESIC y Máster por Savills University. En mis 5 años en consultoría en Savills he desarrollado una sólida disciplina en control de cuentas, seguimiento de plazos y trato continuo con clientes corporativos.

Asesorar y auditar a los franquiciados de 100 Montaditos y TGB en Málaga sobre control de costes, calidad de servicio y dinamización de ventas requiere cercanía y solvencia analítica.

Adjunto mi CV en PDF y quedo a vuestra disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Supervisar una red de franquicias y asesorar a los gestores de cada local sobre control de costes, calidad de servicio y dinamización de ventas en la provincia de Málaga."
  },
  {
    id: "mcdonalds",
    name: "McDonald's España (División Operaciones y Franquicias Málaga)",
    category: "Restauración Rápida & Franquicias — Supervisión de Operaciones Málaga",
    location: "Oficina de Operaciones Málaga / Red de Restaurantes provincia de Málaga",
    phone: "+34 91 566 41 00",
    channel: "portal",
    contactTarget: "https://mcdonalds.es/empleo",
    contactRoleName: "Operations Consultant / Supervisor de Red — McDonald's Málaga",
    defaultRole: "area_manager_retail_ops",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Operations Consultant / Supervisor de Restaurantes",
    priority: "media",
    naturalEmail: `Estimado equipo de Operaciones de McDonald's España:

Me pongo en contacto con vosotros para presentar mi candidatura de cara al rol de Operations Consultant (Supervisor de Restaurantes) en la zona de Málaga.

Graduado en ADE por la Universidad de Málaga, Máster GESCO por ESIC y Máster por Savills University. Cuento con 5 años de trayectoria profesional en consultoría en Savills coordinando equipos, realizando auditorías de instalaciones sobre el terreno y gestionando cuentas presupuestarias.

La excelencia operativa de McDonald's precisa de consultores que auditen la experiencia de cliente, optimicen tiempos y refuercen la rentabilidad de cada unidad junto a los franquiciados. Cuento con carné B y movilidad.

Adjunto mi CV en PDF para vuestra consideración y quedo a vuestra disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "La excelencia operativa y los rigurosos estándares de McDonald's en sus restaurantes de Málaga requieren consultores de operaciones que auditen la experiencia de cliente, optimicen tiempos y refuercen la rentabilidad de cada unidad."
  },

  // ============================================================
  // CATEGORÍA 4: GRANDES SEDES CORPORATIVAS E INDUSTRIAS MÁLAGA
  // ============================================================
  {
    id: "freepik",
    name: "Freepik Company (Sede Central Málaga)",
    category: "Multinacional Tecnológica Líder — People & Business Operations",
    location: "Calle Molina Lario, 13, 29015 Málaga",
    phone: "+34 951 55 05 50",
    channel: "direct_email",
    contactTarget: "jobs@freepik.com",
    contactRoleName: "People & Talent Operations Lead — Freepik Company Málaga",
    defaultRole: "people_talent_management",
    emailSubject: "Candidatura profesional | Ignacio Fernández — People & Business Operations (Sede Málaga)",
    priority: "alta",
    naturalEmail: `Hola, equipo de People & Talent de Freepik Company:

Os escribo para presentar mi perfil profesional de cara a oportunidades en vuestras áreas de People Operations, Gestión del Talento o Business Operations en vuestra sede central de Calle Molina Lario en Málaga.

Soy Graduado en ADE por la Universidad de Málaga (con estancia internacional Erasmus en Lisboa), Máster en Consultoría Estratégica (Savills University) y Máster GESCO (ESIC). En los últimos 5 años en Savills en Málaga he coordinado equipos multidisciplinares, planificado cargas operativas, participado en el onboarding de consultores y gestionado relaciones continuadas con responsables de área.

Conozco la cultura ágil de Freepik y su ritmo de crecimiento global desde Málaga. Mi perfil combina rigor analítico, gestión cercana de personas y experiencia en optimización de flujos de trabajo, ideal para reforzar vuestra operativa interna.

Os adjunto mi CV en PDF y quedo a vuestra completa disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Freepik representa la cúspide del talento tecnológico e internacional con sede central en el centro de Málaga. Mi experiencia en coordinación de personas, planificación de cargas operativas y base sólida en ADE y Dirección Comercial aporta capacidad organizativa y rigor para dar soporte a vuestra escala."
  },
  {
    id: "aertec",
    name: "Aertec Solutions (Sede Central Málaga TechPark)",
    category: "Consultoría & Ingeniería Internacional — Project Management & Personas",
    location: "Calle Juan López Peñalver, 17, Málaga TechPark, 29590 Campanillas, Málaga",
    phone: "+34 951 01 02 00",
    channel: "direct_email",
    contactTarget: "info@aertecsolutions.com",
    contactRoleName: "Dirección de Personas y Operaciones Corporativas — Aertec Solutions",
    defaultRole: "business_operations_pm",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Business Operations & Project Management",
    priority: "alta",
    naturalEmail: `Estimado equipo directivo de Aertec Solutions:

Me pongo en contacto con vosotros para presentar mi candidatura de cara a vuestras áreas de Gestión de Proyectos (Project Management), Operaciones Corporativas o Gestión de Personas en vuestra sede central de Málaga TechPark.

Graduado en ADE por la UMA, Máster por Savills University y Máster GESCO por ESIC. Durante los últimos 5 años he trabajado en consultoría corporativa en Savills en Málaga, gestionando expedientes complejos de inicio a fin: cumplimiento de cronogramas, balance de recursos y control presupuestario riguroso.

Aertec es un referente internacional en tecnología y consultoría con base malagueña. Aporto método, rigor en el seguimiento de hitos y orientación a resultados para integrarme con solvencia en vuestra estructura operativa.

Adjunto mi CV en PDF para vuestra consideración y quedo a vuestra disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Aertec Solutions compite internacionalmente en proyectos de alta complejidad desde Málaga TechPark. Mi formación en ADE y postgrados directivos, unida a 5 años de gestión integral de proyectos y control de cronogramas, me permite integrarme con agilidad en vuestra oficina de gestión operativa."
  },
  {
    id: "ubago",
    name: "Ubago Group (Sede Central Málaga TechPark)",
    category: "Multinacional Agroalimentaria — Dirección de Operaciones & Personas",
    location: "Calle Charles Darwin, 3, Málaga TechPark, 29590 Campanillas, Málaga",
    phone: "+34 952 02 85 00",
    channel: "direct_email",
    contactTarget: "ubago@ubagogroup.com",
    contactRoleName: "Dirección de Recursos Humanos y Operaciones — Ubago Group Málaga",
    defaultRole: "business_operations_pm",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Operaciones Corporativas y Gestión de Negocio",
    priority: "alta",
    naturalEmail: `Hola, equipo directivo de Ubago Group:

Os escribo para presentar mi perfil profesional de cara a posiciones en vuestras direcciones de Operaciones, Cadena de Suministro o Gestión de Personas en vuestra sede de Málaga TechPark.

Soy Graduado en ADE por la UMA (Erasmus Lisboa), Máster GESCO por ESIC y Máster por Savills University. En mis 5 años en consultoría en Savills he coordinado proyectos de principio a fin, auditado procesos en campo y controlado presupuestos operativos con rigor cuantitativo.

Ubago es líder internacional en conservas y ahumados de alta calidad con sede en Málaga. Aporto capacidad analítica, gestión de equipos y rigor en la ejecución para dar soporte a vuestra operativa industrial y de distribución.

Adjunto mi currículum en PDF y quedo a vuestra completa disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "La dimensión industrial e internacional de Ubago Group desde Málaga TechPark requiere profesionales con rigor cuantitativo, visión de procesos y solvencia en la gestión de equipos sobre el terreno para asegurar la máxima eficiencia."
  },
  {
    id: "famadesa",
    name: "Famadesa (Sede Central Campanillas, Málaga)",
    category: "Gran Corporación Agroalimentaria — Operaciones, Personas y Negocio",
    location: "Carretera Santa Rosalía Maqueda, 29590 Campanillas, Málaga",
    phone: "+34 952 43 10 00",
    channel: "direct_email",
    contactTarget: "info@famadesa.es",
    contactRoleName: "Dirección de Recursos Humanos y Organización — Famadesa Málaga",
    defaultRole: "business_operations_pm",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Gestión Operativa, Procesos y Negocio",
    priority: "alta",
    naturalEmail: `Estimado equipo directivo de Famadesa:

Me dirijo a vosotros para compartir mi trayectoria y presentar mi candidatura de cara a vuestros departamentos de Operaciones, Logística y Distribución o Gestión de Personas en vuestra sede central de Campanillas.

Graduado en ADE por la UMA (Erasmus en Lisboa), Máster GESCO en ESIC y Máster por Savills University. Durante 5 años en consultoría corporativa en Savills en Málaga he planificado cronogramas, coordinado cargas de trabajo de equipos y controlado costes presupuestarios con máximo rigor.

Famadesa es un pilar fundamental de la industria agroalimentaria malagueña. Aporto compromiso, conocimiento del tejido empresarial local y solvencia en gestión operativa para integrarme con valor en vuestro equipo.

Adjunto mi CV en PDF para vuestra consideración y quedo a vuestra entera disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Famadesa es una de las empresas con mayor facturación y volumen de empleo de la provincia de Málaga. Mi experiencia en coordinación de equipos, control de costes y supervisión de procedimientos operativos sobre el terreno aporta valor directo a vuestra estructura central."
  },
  {
    id: "safamotor",
    name: "Grupo Safamotor (Sede Central Málaga)",
    category: "Grupo Líder de Distribución & Movilidad — Operaciones & Personas",
    location: "Avenida Velázquez, 468, 29004 Málaga",
    phone: "+34 952 24 64 00",
    channel: "direct_email",
    contactTarget: "rrhh@safamotor.com",
    contactRoleName: "Dirección de Personas y Operaciones — Grupo Safamotor Málaga",
    defaultRole: "business_operations_pm",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Operaciones de Red, Calidad y Gestión de Personas",
    priority: "alta",
    naturalEmail: `Hola, equipo directivo de Grupo Safamotor:

Os escribo para presentar mi perfil profesional de cara a posiciones de Gestión Operativa de Red de Concesionarios, Dirección de Calidad y Procesos o Recursos Humanos en vuestra sede central de Avenida Velázquez en Málaga.

Soy Graduado en ADE por la Universidad de Málaga, Máster GESCO por ESIC y Máster por Savills University. En mis 5 años de trayectoria profesional he coordinado proyectos sobre el terreno, auditado centros e instalaciones y controlado cuentas de costes con estricto seguimiento de acuerdos de servicio.

Safamotor es el grupo líder en distribución de movilidad en la provincia de Málaga. Mi perfil combina visión comercial y financiera con solvencia en supervisión de puntos de venta y motivación de equipos.

Os adjunto mi CV en PDF y quedo a vuestra completa disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "La gestión y supervisión de la amplia red de concesionarios de Safamotor en Málaga requiere perfiles con visión analítica de ventas, control de rentabilidad de taller y exposición, y estandarización de procesos de atención al cliente."
  },
  {
    id: "besoccer",
    name: "BeSoccer / Resultados de Fútbol (Sede Málaga TechPark)",
    category: "Multinacional Tecnológica & Media — Business Development & People",
    location: "Calle Severo Ochoa, 12, Málaga TechPark, 29590 Campanillas, Málaga",
    phone: "+34 951 10 01 23",
    channel: "direct_email",
    contactTarget: "rrhh@besoccer.com",
    contactRoleName: "Dirección de Personas y Operaciones — BeSoccer Málaga",
    defaultRole: "people_talent_management",
    emailSubject: "Candidatura profesional | Ignacio Fernández — People & Business Operations",
    priority: "alta",
    naturalEmail: `Hola, equipo de BeSoccer:

Me pongo en contacto con vosotros para presentar mi perfil para vuestras áreas de Gestión de Personas (People), Operaciones o Desarrollo de Negocio en vuestra sede de Málaga TechPark.

Graduado en ADE por la UMA (Erasmus Lisboa), Máster en Consultoría Estratégica por Savills University y Máster GESCO por ESIC. Durante 5 años en consultoría corporativa en Savills en Málaga he coordinado equipos multidisciplinares, planificado cargas de trabajo y gestionado relaciones B2B continuadas.

BeSoccer es uno de los mayores éxitos tecnológicos de Málaga. Cuento con capacidad de gestión, orientación a resultados y habilidad para optimizar dinámicas de equipo en entornos dinámicos.

Adjunto mi CV en PDF y quedo a vuestra disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "El liderazgo mundial de BeSoccer en datos y aplicaciones deportivas desde Málaga TechPark exige una organización interna sólida y una gestión de talento que acompañe su expansión internacional."
  },
  {
    id: "avanza_movilidad",
    name: "Avanza / Alsa Movilidad Málaga (Centro Operativo)",
    category: "Operador de Movilidad y Transporte — Centro Operativo Málaga",
    location: "Paseo de los Tilos s/n / Polígono El Viso, 29006 Málaga",
    phone: "+34 952 35 00 61",
    channel: "portal",
    contactTarget: "https://empleo.avanzagrupo.com/",
    contactRoleName: "Jefatura de Operaciones y Tráfico / Personas — Avanza Málaga",
    defaultRole: "business_operations_pm",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Jefatura de Operaciones y Tráfico / Gestión de Flotas",
    priority: "media",
    naturalEmail: `Estimado equipo de Recursos Humanos de Avanza Málaga:

Os escribo para presentar mi candidatura de cara a la Jefatura de Operaciones, Planificación de Servicios o Gestión de Personas en vuestro centro operativo de Málaga.

Soy Graduado en ADE por la UMA, Máster GESCO por ESIC y Máster por Savills University. En mis 5 años de trayectoria en consultoría he gestionado cronogramas de servicios críticos, balance de cargas de trabajo y resolución ágil de contingencias sobre el terreno.

La operativa de transporte de pasajeros en Málaga exige rigor analítico, coordinación de turnos y cumplimiento estricto de horarios y niveles de servicio.

Adjunto mi CV en PDF para vuestra valoración y quedo a vuestra disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Gestión de turnos de conductores, planificación de servicios y control estricto de cronogramas en el transporte metropolitano de Málaga."
  },
  {
    id: "frutas_montosa",
    name: "Frutas Montosa (Vélez-Málaga - Distribución Supermercados)",
    category: "Líder en Distribución Hortofrutícola para Supermercados — Málaga",
    location: "Finca El Molino s/n, 29792 Vélez-Málaga, Málaga",
    phone: "+34 952 50 15 00",
    channel: "direct_email",
    contactTarget: "rrhh@frutasmontosa.com",
    contactRoleName: "Dirección de Operaciones, Cadena de Suministro y Recursos Humanos — Frutas Montosa",
    defaultRole: "business_operations_pm",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Operaciones de Gran Distribución y Logística",
    priority: "alta",
    naturalEmail: `Hola, equipo directivo de Frutas Montosa:

Me pongo en contacto con vosotros para presentar mi candidatura de cara a vuestras áreas de Dirección de Operaciones, Cadena de Suministro o Gestión de Personas en vuestras instalaciones centrales de la Axarquía malagueña.

Graduado en ADE por la UMA (Erasmus Lisboa), Máster GESCO por ESIC y Máster en Savills University. En mis 5 años en consultoría en Savills he coordinado proyectos de inicio a fin: asignación de cargas de trabajo a equipos, auditorías in situ de instalaciones y modelado financiero de rentabilidad en Excel.

Montosa es el interproveedor clave de aguacate, mango y procesados para las mayores cadenas de supermercados europeas y españolas. Mi perfil combina rigor analítico cuantitativo, capacidad de organización de equipos y vocación operativa sobre el terreno para sumar valor a vuestra operativa diaria.

Adjunto mi CV en PDF para vuestra valoración y quedo a vuestra entera disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Proveedor clave de las principales cadenas de supermercados europeas y españolas (aguacate, mango, guacamole). Dirección de operaciones de gran distribución, logística y gestión de turnos de planta."
  },

  // ============================================================
  // CATEGORÍA 5: CONSULTORÍA DE PERSONAS, SELECCIÓN Y ESTRATEGIA
  // ============================================================
  {
    id: "standby",
    name: "Standby Consultores (Málaga Centro)",
    category: "Consultoría de Personas, Executive Search & Selección Directiva",
    location: "Calle Strachan, 4, 3º, 29015 Málaga",
    phone: "+34 952 22 41 84",
    channel: "direct_email",
    contactTarget: "info@standby.es",
    contactRoleName: "Dirección de Consultoría & Selección / Equipo Standby",
    defaultRole: "people_talent_management",
    emailSubject: "Presentación profesional | Ignacio Fernández — Consultoría de Personas y Gestión de Negocio",
    priority: "alta",
    naturalEmail: `Estimado equipo de Standby Consultores:

Os escribo para presentarme y compartir con vosotros mi perfil profesional, conocedor de vuestro indiscutible liderazgo en consultoría de selección, executive search y desarrollo organizativo desde vuestra sede de Calle Strachan en Málaga.

Durante los últimos 5 años he desarrollado mi carrera en Savills en Málaga, donde he coordinado equipos de trabajo multidisciplinares, planificado la asignación y balance de cargas operativas y gestionado la interlocución directa con directores de área y clientes corporativos de primer nivel. Esta experiencia me ha aportado una visión integral de las dinámicas empresariales, levantamiento riguroso de necesidades de puesto y gestión del capital humano orientado al alto rendimiento.

A nivel formativo soy Graduado en ADE por la Universidad de Málaga (con estancia internacional Erasmus en Lisboa), y cuento con el Máster en Consultoría Estratégica por Savills University y el Máster GESCO en ESIC.

Considero que mi combinación de rigor analítico, capacidad de interlocución B2B y comprensión del tejido empresarial andaluz encaja de manera natural con la labor de consultoría de selección y asesoramiento en personas que desarrolláis en Standby.

Os adjunto mi currículum en PDF y quedo a vuestra completa disposición para mantener una conversación inicial.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Standby es la firma líder indiscutible en búsqueda de directivos y consultoría de personas con sede central en Málaga. Mi perfil combina la formación de base en ADE y doble postgrado directivo con 5 años de trato directo con directores de área, planificación de cargas de trabajo y habituación a interlocución corporativa de alto nivel."
  },
  {
    id: "randstad",
    name: "Randstad Professionals (Málaga)",
    category: "Consultoría de Recursos Humanos, Talento & Selección Especializada",
    location: "Avda. Manuel Agustín Heredia, 18, 29001 Málaga",
    phone: "+34 952 06 00 20",
    channel: "direct_email",
    contactTarget: "malaga@randstad.es",
    contactRoleName: "Dirección de Oficina Málaga / División Professionals & Corporate",
    defaultRole: "people_talent_management",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Consultoría de Selección, Retail y Operaciones",
    priority: "alta",
    naturalEmail: `Hola, equipo de Randstad Professionals Málaga:

Me pongo en contacto con vosotros para presentar mi perfil profesional de cara a vuestra división especializada en selección de mandos intermedios y consultoría de talento en Málaga.

Soy Graduado en ADE por la Universidad de Málaga (con estancia Erasmus en Lisboa), Máster en Consultoría Estratégica (Savills University) y Máster GESCO (ESIC). En los últimos 5 años en Savills en Málaga he liderado la coordinación de proyectos corporativos, supervisando calendarios, organizando cargas de trabajo de consultores e interlocutando con clientes de alta exigencia.

Conozco vuestro posicionamiento en la selección de perfiles de Retail, Gran Distribución y Operaciones en Málaga. Mi conocimiento del tejido empresarial andaluz y mi capacidad de evaluación técnica y competencial me permiten integrarme con éxito en vuestra división.

Os adjunto mi currículum en PDF y quedo a vuestra completa disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "La división Professionals de Randstad en Málaga lidera la captación de mandos intermedios y directivos en retail y operaciones. Mi experiencia coordinando equipos y comprendiendo las estructuras organizativas me capacita para evaluar candidatos con criterio empresarial."
  },
  {
    id: "adecco",
    name: "Adecco / LHH (Málaga Centro)",
    category: "Consultoría de Selección, Executive Search & Transformación de RRHH",
    location: "Calle Hilera, 8, 29007 Málaga",
    phone: "+34 952 07 10 50",
    channel: "direct_email",
    contactTarget: "adecco.malaga@adecco.com",
    contactRoleName: "Dirección de Consultoría y Selección Málaga — Adecco / LHH",
    defaultRole: "people_talent_management",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Consultoría de Talento, Retail y Operaciones",
    priority: "alta",
    naturalEmail: `Estimado equipo de Adecco y LHH Málaga:

Os escribo para compartir mi trayectoria profesional y manifestar mi interés en colaborar en vuestras áreas de Selección Especializada, Consultoría de Personas o División de Gran Distribución en Málaga.

Tengo titulación en ADE por la Universidad de Málaga (con formación Erasmus en Lisboa), Máster GESCO en ESIC y Máster en Savills University. Cuento con 5 años de trayectoria corporativa en Savills en Málaga, donde he coordinado equipos de trabajo, establecido cronogramas y gestionado la interlocución con responsables de negocio.

Mi combinación de rigor analítico, cercanía personal y visión de negocio encaja con vuestro enfoque de consultoría y gestión de capital humano.

Adjunto mi CV en PDF para vuestra consideración y quedo a vuestra entera disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Adecco y LHH en Málaga gestionan procesos de atracción de talento para los principales grupos de distribución y retail. Mi doble formación de postgrado y trayectoria de 5 años en coordinación operativa me permiten conectar con solvencia técnica con candidatos y clientes."
  },
  {
    id: "manpower",
    name: "ManpowerGroup / Experis (Málaga)",
    category: "Soluciones Globales de Talento, People Management & Selección",
    location: "Calle Cuarteles, 39, 29002 Málaga",
    phone: "+34 952 36 33 00",
    channel: "direct_email",
    contactTarget: "malaga@manpower.es",
    contactRoleName: "Consultor de Selección & Gestión de Talento — ManpowerGroup Málaga",
    defaultRole: "people_talent_management",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Soluciones de Talento y Gestión de Negocio",
    priority: "media",
    naturalEmail: `Hola, equipo de ManpowerGroup / Experis Málaga:

Me pongo en contacto con vosotros para presentar mi perfil profesional de cara a oportunidades en consultoría de selección, gestión del talento u operaciones en vuestra oficina de Málaga.

Soy Graduado en ADE por la UMA, Máster GESCO en ESIC y Máster por Savills University. En mis 5 años de experiencia en Savills he coordinado equipos de trabajo sobre el terreno, planificado cargas operativas y asegurado el cumplimiento de estrictos acuerdos de servicio con clientes corporativos.

Aporto visión analítica, rigor organizativo y capacidad de interlocución B2B para integrarme con valor en vuestro equipo de Málaga.

Os adjunto mi currículum en PDF y quedo a vuestra entera disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "La presencia consolidada de ManpowerGroup y Experis en Málaga en la gestión de talento para operaciones y corporaciones se alinea con mi perfil multidisciplinar en ADE, marketing comercial y coordinación operativa."
  },
  {
    id: "nortempo",
    name: "Grupo Nortempo (Málaga)",
    category: "Consultoría Integral de Recursos Humanos & Selección",
    location: "Calle Hilera, 10, 29007 Málaga",
    phone: "+34 952 30 75 00",
    channel: "direct_email",
    contactTarget: "malaga@nortempo.com",
    contactRoleName: "Responsable de Oficina Málaga / Área de Selección — Nortempo",
    defaultRole: "people_talent_management",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Consultoría de Selección y Gestión de Personas",
    priority: "media",
    naturalEmail: `Hola, equipo de Grupo Nortempo Málaga:

Os escribo para presentar mi candidatura para vuestra división de selección de personal y consultoría de personas en Málaga.

Graduado en ADE por la Universidad de Málaga (con estancia internacional en Lisboa), Máster GESCO en ESIC y Máster por Savills University. Durante 5 años en Savills he coordinado equipos de trabajo, gestionado la asignación de recursos y supervisado procedimientos con un 100% de cumplimiento en plazos.

Aporto rigor analítico, dinamismo y experiencia en trato directo con empresas y profesionales del tejido andaluz.

Adjunto mi CV en PDF para vuestra consideración y quedo a vuestra disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "Nortempo en Málaga da servicio de selección y capital humano a empresas de logística, retail y servicios. Mi formación en ADE y postgrados me permite identificar necesidades de puesto y evaluar perfiles con rapidez y criterio."
  },
  {
    id: "auren",
    name: "Auren Consultoría (Málaga Centro)",
    category: "Consultoría Multidisciplinar — Estrategia, Personas y Negocio",
    location: "Calle Marqués de Larios, 4, 3º, 29005 Málaga",
    phone: "+34 952 21 00 23",
    channel: "direct_email",
    contactTarget: "malaga@auren.es",
    contactRoleName: "Socio Director de Consultoría de Negocio y Personas — Auren Málaga",
    defaultRole: "strategic_consulting_business",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Consultoría de Negocio y Estrategia",
    priority: "alta",
    naturalEmail: `Estimado equipo directivo de Auren Málaga:

Me dirijo a vosotros para compartir mi trayectoria y presentar mi candidatura de cara a vuestra división de Consultoría de Negocio, Estrategia o Personas en vuestra oficina de Calle Marqués de Larios.

Soy Graduado en ADE por la Universidad de Málaga (Erasmus Lisboa), Máster en Consultoría Estratégica por Savills University y Máster GESCO en ESIC. En mis 5 años de trayectoria corporativa he coordinado proyectos de inicio a fin, elaborado informes de diagnóstico de alto nivel y modelado escenarios financieros en Excel para órganos de decisión.

Auren es una de las firmas multidisciplinares más reputadas de Málaga. Mi perfil combina método cuantitativo, visión global de negocio y solvencia en la interlocución con comités directivos.

Adjunto mi CV en PDF para vuestra valoración y quedo a vuestra entera disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "La oficina de Auren en Calle Larios ofrece consultoría de estrategia, procesos y personas a las principales medianas y grandes empresas andaluzas. Mi doble titulación de máster y 5 años de elaboración de dictámenes analíticos aportan valor directo a vuestros equipos de consultoría."
  },
  {
    id: "bdo",
    name: "BDO España (Oficina Málaga)",
    category: "Firma Global de Consultoría de Negocio, Estrategia & Advisory",
    location: "Avenida de Andalucía, 7, 29002 Málaga",
    phone: "+34 952 22 25 00",
    channel: "direct_email",
    contactTarget: "es-bdo-malaga@bdo.es",
    contactRoleName: "Dirección de Consultoría y Advisory — BDO España Málaga",
    defaultRole: "strategic_consulting_business",
    emailSubject: "Candidatura profesional | Ignacio Fernández — Business Advisory & Consultoría de Negocio",
    priority: "alta",
    naturalEmail: `Hola, equipo directivo de BDO Málaga:

Os escribo para presentar mi perfil profesional de cara a vuestra práctica de Consultoría de Negocio, Advisory o Estrategia en vuestra oficina de Avenida de Andalucía en Málaga.

Graduado en ADE por la UMA (Erasmus Lisboa), Máster en Consultoría Estratégica por Savills University y Máster GESCO por ESIC. Durante los últimos 5 años he trabajado en consultoría corporativa en Savills en Málaga, desarrollando modelos financieros complejos, dictámenes periciales y asesoramiento analítico para clientes institucionales.

BDO destaca por su solvencia en asesoramiento empresarial en Málaga. Aporto rigor numérico, capacidad de síntesis ejecutiva y hábito en el trato con directores generales y comités de inversión.

Os adjunto mi currículum en PDF y quedo a vuestra disposición.

Un cordial saludo,
Ignacio Fernández López
+34 644 321 664 | ignflopez@gmail.com
LinkedIn: https://www.linkedin.com/in/ignacio-fernandezlopez/`,
    valueHook: "El equipo de Advisory de BDO en Málaga asesora a corporaciones e inversores en eficiencia operativa, planes de negocio y valoración. Mi formación cuantitativa y experiencia en consultoría corporativa me permiten integrarme de forma inmediata en proyectos de alto nivel."
  }
];

fs.writeFileSync(path.join(rootDir, 'data', 'companies.json'), JSON.stringify(companies, null, 2), 'utf-8');
console.log(`data/companies.json saved successfully with ${companies.length} companies!`);
