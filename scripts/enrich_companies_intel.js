import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const companies = JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'companies.json'), 'utf8'));

// Intelligence data dictionary mapped by company ID
const companyIntel = {
  // 1. SUPERMERCADOS Y GRAN DISTRIBUCIÓN
  maskom: {
    companyInfo: "Cadena de supermercados 100% malagueña fundada en 1978 por Sergio Cuberos. Cuenta con más de 55 establecimientos en Málaga capital, Costa del Sol y principales comarcas interiores. Factura más de 145 M€ y da empleo a más de 850 profesionales con sede y centro logístico en el P.I. Santa Teresa.",
    currentState: "En plena fase de renovación y modernización de salas de venta, optimización de costes logísticos y expansión selectiva en barrios de alta densidad y zonas costeras de Málaga para competir frente a las grandes cadenas nacionales.",
    whyIgnacioFits: "Ignacio aúna formación en ADE y Dirección Comercial (ESIC) con 5 años de hábito sobre el terreno en Savills. Aporta el perfil ideal para Area Manager / Gerente de Red: control analítico de mermas y cuentas de explotación por tienda, combinado con cercanía y liderazgo para motivar a los encargados de sala."
  },
  mercadona: {
    companyInfo: "Líder indiscutible de la distribución alimentaria en España con más de un 26% de cuota de mercado. Su bloque logístico de Antequera (Málaga) es una de sus plataformas más estratégicas, abasteciendo a más de 80 tiendas en la provincia y a todo el sur peninsular.",
    currentState: "Consolidación de su modelo de 'Tienda 8' (eficiencia energética, sección 'Listo para Comer' y digitalización de inventarios) y refuerzo de la automatización en el macrobloque logístico de Antequera.",
    whyIgnacioFits: "Mercadona busca perfiles universitarios en ADE con fuerte capacidad de liderazgo y toma de decisiones operativas. Los 5 años de Ignacio coordinando proyectos complejos, cumplimiento estricto de cronogramas y resolución de incidencias en campo encajan con su estándar de alta exigencia."
  },
  lidl: {
    companyInfo: "Segunda cadena de distribución de descuento en España. Su sede regional sur y plataforma logística en Antequera (con más de 65.000 m²) gestiona la operativa, aprovisionamiento y recursos de más de 120 supermercados en Andalucía.",
    currentState: "Plan estratégico de aperturas de tiendas de gran formato sostenible en la provincia de Málaga (Teatinos, Fuengirola, Marbella, Vélez-Málaga) y optimización de productividad horaria en salas de venta.",
    whyIgnacioFits: "El rol de Jefe/a de Zona (Area Manager) en Lidl requiere capacidad de supervisión de 4 a 6 tiendas, análisis diario de KPIs comerciales (ticket medio, roturas, mermas) y desarrollo de equipos. Ignacio combina solvencia cuantitativa en Excel con liderazgo de campo."
  },
  aldi: {
    companyInfo: "Cadena de origen alemán en máxima expansión en España. Su plataforma logística en Antequera (30.000 m²) es el motor clave para abastecer su rápida expansión en Andalucía y el arco mediterráneo.",
    currentState: "Crecimiento de doble dígito en aperturas en Málaga (Rincón de la Victoria, Mijas, Marbella, Churriana), compitiendo agresivamente por ganar cuota en supermercados de proximidad y marca propia.",
    whyIgnacioFits: "Aldi requiere mandos intermedios y gestores de red con alta capacidad analítica de negocio y dinamismo operativo. La formación de Ignacio en ADE + ESIC y su experiencia en auditoría operativa le permiten garantizar aperturas e implantación de estándares sin fisuras."
  },
  grupo_dia: {
    companyInfo: "Referente histórico en comercio de proximidad con una extensa red de tiendas de barrio en toda la provincia de Málaga, gestionadas tanto en régimen propio como a través de su potente modelo de franquicias.",
    currentState: "Culminación del relanzamiento de la marca ('Nueva DIA'), apostando por tiendas más luminosas, surtido de producto fresco y digitalización de la tarjeta Club DIA para elevar la rentabilidad por metro cuadrado.",
    whyIgnacioFits: "Ignacio encaja a la perfección en la supervisión de franquicias y tiendas propias: auditoría de estándares de imagen y reposición, seguimiento de cuentas de resultados y dinamización de franquiciados y encargados."
  },
  carrefour: {
    companyInfo: "Multinacional líder multiformato que opera en Málaga hipermercados de gran envergadura (Rosaleda, Los Patios, Rincón de la Victoria) y decenas de tiendas de conveniencia urbana (Carrefour Market y Carrefour Express).",
    currentState: "Fuerte foco en la franquicia urbana (Carrefour Express) en Málaga capital y en la optimización omnicanal (entrega express y Click&Collect) para fidelizar al consumidor local y turístico.",
    whyIgnacioFits: "Su doble postgrado en ESIC (Dirección Comercial) y Savills University, junto a su titulación en ADE, le aportan una visión integral de operaciones comerciales, gestión de inventarios y rentabilidad comercial de salas de venta."
  },
  coviran: {
    companyInfo: "Cooperativa de detallistas independientes líder en número de puntos de venta de barrio en Andalucía. Cuenta con plataforma de distribución propia y escuela de formación en Málaga.",
    currentState: "Modernización tecnológica del punto de venta cooperativo, implantación de modelos de eficiencia energética y captación de nuevos detallistas para garantizar el relevo generacional en la provincia.",
    whyIgnacioFits: "Ignacio destaca por su empatía interpersonal y habilidades comerciales, esenciales para asesorar y auditar a socios cooperativistas independientes, optimizando sus pedidos y gestión de mermas."
  },
  alcampo: {
    companyInfo: "Filial de Auchan que en Málaga opera grandes hipermercados y una extensa red de supermercados de proximidad incorporados tras la integración de la red de tiendas de Grupo DIA.",
    currentState: "Fase de consolidación y homogeneización de cultura de tienda, estandarización de procesos y optimización de márgenes en los supermercados urbanos adquiridos en la provincia de Málaga.",
    whyIgnacioFits: "Ignacio aporta orden metodológico, gestión del cambio y capacidad de análisis presupuestario para asegurar la rentabilidad de las tiendas y la correcta implantación de las directrices corporativas."
  },
  supercor: {
    companyInfo: "División de supermercados de alimentación de alta gama y proximidad del Grupo El Corte Inglés, con presencia destacada en las zonas residenciales prémium de Málaga capital y la Costa del Sol (Marbella, Puerto Banús, Mijas).",
    currentState: "Potenciación del surtido prémium gourmet, servicio de atención personalizada en frescos y refuerzo del servicio a residentes internacionales y visitantes de alto poder adquisitivo.",
    whyIgnacioFits: "Ignacio está acostumbrado al trato con clientes institucionales y de alto nivel en Savills. Aporta sensibilidad por el estándar de calidad, rigor en la imagen de tienda y control exhaustivo de costes."
  },
  dcoop: {
    companyInfo: "La mayor cooperativa agroalimentaria multisectorial del sur de Europa, con sede central global en Antequera (Málaga). Factura más de 1.200 M€ y agrupa a decenas de miles de agricultores y ganaderos.",
    currentState: "Digitalización de cadenas de suministro, consolidación de acuerdos de suministro a grandes cadenas de distribución internacional y optimización de operaciones industriales en sus plantas de envasado.",
    whyIgnacioFits: "Su formación en ADE y su experiencia en seguimiento presupuestario y project management le permiten encajar en puestos corporativos de operaciones, control de gestión o aprovisionamiento en la central de Antequera."
  },

  // 2. RETAIL MULTI-TIENDA Y GRANDES SUPERFICIES
  primor: {
    companyInfo: "Multinacional líder en perfumería, cosmética y belleza con sede central global en Málaga (P.I. Trévenez). Supera las 250 macrotiendas en España, Portugal e Italia, con fuerte expansión omnicanal.",
    currentState: "Apertura continua de 'flagship stores' experienciales de más de 1.000 m² en las principales arterias comerciales y centros comerciales, requiriendo supervisores de zona y coordinadores de operaciones centrales.",
    whyIgnacioFits: "Ignacio combina formación en Dirección Comercial (ESIC) con 5 años coordinando proyectos con 100% de cumplimiento en plazos. Aporta visión de rentabilidad por m², dinamismo para el retail de alta rotación y disponibilidad geográfica."
  },
  tiendanimal: {
    companyInfo: "Marca insignia del grupo IskayPet (Tiendanimal + Kiwoko), líder indiscutible del retail especializado en mascotas con sede corporativa en Málaga TechPark y más de 260 tiendas físicas.",
    currentState: "Integración logística y unificación de servicios omnicanal (clínicas veterinarias, peluquería y salas de venta), con aperturas en parques comerciales estratégicos de Málaga y Andalucía.",
    whyIgnacioFits: "Residente en Málaga, graduado en ADE y máster en ESIC, Ignacio ofrece experiencia contrastada en seguimiento de métricas operativas, control presupuestario y coordinación de personas en sedes multi-unidad."
  },
  mayoral: {
    companyInfo: "Multinacional malagueña de moda infantil con sede mundial en Málaga. Presente en más de 100 países con más de 250 tiendas propias y franquicias, además de sus nuevas marcas de adultos (Boston y Hug & Clau).",
    currentState: "Automatización total de su centro logístico de Málaga, expansión de sus marcas de moda joven y optimización de la rentabilidad de su red de tiendas propias en centros comerciales.",
    whyIgnacioFits: "Ignacio aporta doble perfil: rigor económico para analizar la viabilidad de aperturas comerciales y habilidad para coordinar cronogramas, auditorías y equipos de tienda."
  },
  leroy_merlin: {
    companyInfo: "Líder en acondicionamiento del hogar, bricolaje y construcción perteneciente al grupo Adeo. Cuenta con grandes centros en Málaga capital, Marbella y Mijas.",
    currentState: "Transformación hacia el modelo de plataforma omnicanal y servicios de instalación a domicilio, requiriendo Jefes de Sector y Responsables de Operaciones de Tienda.",
    whyIgnacioFits: "Su capacidad para liderar proyectos con alto rigor técnico en campo (Savills) y su dominio de análisis numérico le permiten dirigir equipos de sala, aprovisionamiento y atención a cliente."
  },
  decathlon: {
    companyInfo: "Referente en distribución deportiva con grandes centros en Málaga (Guadalmar y Campanillas) y Mijas, además de centros logísticos de distribución regional.",
    currentState: "Renovación global de marca, impulso a la economía circular (reparación y segunda vida) y digitalización de lineales con cobro automático RFID.",
    whyIgnacioFits: "Perfil dinámico, titulado en ADE y máster comercial, con capacidad innata para dinamizar personas, fijar objetivos de venta y gestionar la operativa integral de una gran superficie."
  },
  ikea: {
    companyInfo: "Multinacional sueca líder en mobiliario y diseño democrático. El centro IKEA Málaga (Plaza Mayor) es uno de los de mayor tráfico y facturación de Andalucía.",
    currentState: "Desarrollo de nuevos formatos urbanos de asesoramiento y planificación, junto a la optimización de los flujos de almacén y logística de última milla para la Costa del Sol.",
    whyIgnacioFits: "Ignacio destaca en la coordinación de procesos operativos, cumplimiento de estándares de seguridad y calidad, y resolución de problemas sobre el terreno."
  },
  mediamarkt: {
    companyInfo: "Líder en distribución de electrónica de consumo y electrodomésticos con tiendas en Málaga Vialia, Plaza Mayor y Marbella.",
    currentState: "Foco en la venta de soluciones y servicios (reparaciones, renting, instalación) frente al mero producto físico, exigiendo directores de operaciones y jefes de departamento de tienda.",
    whyIgnacioFits: "Ignacio aporta visión estratégica (ADE + ESIC) para maximizar márgenes comerciales y supervisar equipos de ventas y servicio posventa con foco en KPI."
  },
  isrg_sprinter: {
    companyInfo: "Iberian Sports Retail Group (JD Sports, Sprinter, Size?), grupo líder del retail deportivo con amplia red de tiendas en los principales centros comerciales de Málaga.",
    currentState: "Expansión agresiva de la marca JD Sports en Málaga y renovación integral del formato de tiendas Sprinter hacia experiencias deportivas interactivas.",
    whyIgnacioFits: "Ideal para roles de Area Manager o Store Manager: control de stock en tienda, gestión de rotación de producto textil/calzado y liderazgo de equipos jóvenes."
  },
  primark: {
    companyInfo: "Cadena de gran volumen y alta rotación en moda con megatiendas en Larios Centro (Málaga) y C.C. Miramar (Fuengirola).",
    currentState: "Optimización de eficiencia en sala de ventas ante cifras récord de afluencia, gestión masiva de personal de tienda y logística de reposición nocturna continua.",
    whyIgnacioFits: "Ignacio posee alta resistencia al trabajo exigente y experiencia coordinando flujos de trabajo en equipo. Aporta rigor en turnos, estándares y productividad horaria."
  },
  action: {
    companyInfo: "Cadena de descuento no alimentario de más rápido crecimiento en Europa (origen holandés), con un ritmo de aperturas imparable en España.",
    currentState: "Fase de expansión acelerada en la provincia de Málaga (Mijas, Coín, Antequera), necesitando directores de tienda y jefes de zona para abrir nuevos establecimientos.",
    whyIgnacioFits: "Ignacio encaja a la perfección con la filosofía pragmática de Action: procesos sencillos, control riguroso de costes, orden impecable en sala y liderazgo motivador de personal."
  },
  pepco: {
    companyInfo: "Cadena paneuropea de retail que combina moda infantil, hogar y bienes de consumo diario a precios asequibles, operando tiendas en centros comerciales de Málaga y costa.",
    currentState: "Crecimiento de red en Andalucía tras la integración de tiendas Dealz y apertura en parques de medianas de la provincia.",
    whyIgnacioFits: "Aporta agilidad para supervisar la operativa de tienda, gestión de mercancías y control de inventarios, sumado a su visión económica de rentabilidad por tienda."
  },
  bauhaus: {
    companyInfo: "Especialista alemán en bricolaje, construcción y jardín con un megacentro en el Parque Comercial Málaga Nostrum.",
    currentState: "Consolidación de su área para profesionales de la construcción ('Drive-In') y refuerzo de su surtido de sostenibilidad y climatización en la Costa del Sol.",
    whyIgnacioFits: "Su experiencia técnica de 5 años en Savills inspeccionando inmuebles e instalaciones le da una base sólida para dialogar tanto con particulares como con gremios de la construcción."
  },
  conforama: {
    companyInfo: "Cadena referente en equipamiento del hogar y mobiliario con tienda destacada en Málaga Nostrum.",
    currentState: "Optimización del área logística de entrega a domicilio y transformación digital del showroom de tienda.",
    whyIgnacioFits: "Ignacio aporta capacidad de control de almacén, supervisión del servicio posventa y liderazgo de equipos comerciales con objetivos de venta cruzada."
  },

  // 3. RESTAURACIÓN ORGANIZADA Y MULTI-UNIDAD
  rbi_burgerking: {
    companyInfo: "Restaurant Brands Iberia es el mayor grupo de restauración organizada de España (Burger King, Popeyes, Tim Hortons), con decenas de restaurantes en Málaga.",
    currentState: "Plan continuo de aperturas de nuevos locales 'Free-Standing' con Drive-Thru y digitalización de pedidos mediante kioscos y delivery propio.",
    whyIgnacioFits: "El puesto de Responsable de Operaciones de Zona exige auditoría continua de tiempos de servicio, control de costes de comida (food cost) y rotación laboral. Ignacio aporta disciplina y método analítico."
  },
  alsea: {
    companyInfo: "Operador de restauración multimarca líder en España y Latinoamérica (Starbucks, Domino's Pizza, Vips, Ginos, Foster's Hollywood) con amplia presencia en Málaga.",
    currentState: "Expansión de cafeterías Starbucks en zonas turísticas de Málaga y optimización de costes operacionales en su red de restaurantes de servicio a mesa.",
    whyIgnacioFits: "Ignacio aporta formación comercial de posgrado (ESIC) para fidelizar al cliente y experiencia en control presupuestario para asegurar la rentabilidad de cada unidad de negocio."
  },
  restalia: {
    companyInfo: "Multinacional española dueña de 100 Montaditos, TGB (The Good Burger) y Cervecería La Sureña, con fuerte presencia de franquicias en Málaga.",
    currentState: "Modernización de formatos comerciales, impulso a las terrazas urbanas y refuerzo de la supervisión de franquiciados para asegurar la uniformidad de marca.",
    whyIgnacioFits: "Capacidad contrastada para auditar establecimientos, interlocución comercial constructiva con inversores y franquiciados, y visión financiera del negocio."
  },
  mcdonalds: {
    companyInfo: "Líder global de restauración rápida con una red consolidada de restaurantes operados mayoritariamente por franquiciados locales en Málaga y Costa del Sol.",
    currentState: "Implantación del plan de sostenibilidad 'Happy Meal', servicio a mesa y digitalización de cocinas y pedidos móviles para reducir tiempos de espera.",
    whyIgnacioFits: "Ignacio encaja en roles de Supervisión de Operaciones y Franquicias: alto estándar de excelencia operativa, cumplimiento normativo y dinamización de equipos."
  },

  // 4. GRANDES SEDES CORPORATIVAS E INDUSTRIALES
  freepik: {
    companyInfo: "Multinacional tecnológica malagueña líder mundial en contenidos visuales y herramientas de diseño asistido por IA, con sede central en Málaga (Muelle Uno).",
    currentState: "Crecimiento internacional vertiginoso, integración de herramientas generativas de IA y ampliación continua de talento multicultural (más de 600 empleados).",
    whyIgnacioFits: "Ignacio encaja en el departamento de People & Talent o Business Operations: graduado en ADE, con experiencia en coordinación de personas, clima laboral y mentalidad analítica."
  },
  aertec: {
    companyInfo: "Consultora e ingeniería aeroespacial internacional con sede central en Málaga TechPark, especializada en aeropuertos, sistemas aeroespaciales y defensa.",
    currentState: "Liderazgo en proyectos de drones tácticos, digitalización de aeropuertos internacionales y gestión de grandes proyectos de ingeniería.",
    whyIgnacioFits: "Ignacio aporta 5 años de gestión de proyectos (PMO) con un récord de 100% de cumplimiento en plazos y presupuestos, aportando orden en cronogramas y asignación de recursos."
  },
  ubago: {
    companyInfo: "Multinacional agroalimentaria referente en conservas y ahumados de pescado con sede corporativa en Málaga TechPark y fábricas en varios países.",
    currentState: "Optimización de cadenas de suministro globales, acuerdos directos con supermercados líderes y refuerzo de la eficiencia operativa en sus sedes centrales.",
    whyIgnacioFits: "Su formación en ADE y dirección comercial le capacita para apoyar las operaciones corporativas, auditorías de calidad de proveedores y control presupuestario."
  },
  famadesa: {
    companyInfo: "Una de las mayores corporaciones agroalimentarias de Andalucía, con sede central en Campanillas (Málaga), exportando a más de 30 países.",
    currentState: "Inversiones millonarias en modernización industrial, economía circular y expansión de exportaciones a mercados asiáticos y europeos.",
    whyIgnacioFits: "Ignacio aporta capacidad analítica en costes, visión de negocio y gestión de personas para reforzar sus departamentos de operaciones y logística central."
  },
  safamotor: {
    companyInfo: "Grupo líder en distribución de automoción y movilidad en Málaga y Andalucía Oriental, con concesionarios oficiales de más de 12 marcas de primer nivel.",
    currentState: "Transición hacia el vehículo electrificado, gestión de flotas corporativas y digitalización del proceso de compra y posventa.",
    whyIgnacioFits: "Doble perfil de ADE y ESIC con experiencia en valoraciones patrimoniales y venta consultiva, ideal para la dirección de centros, postventa o control de flotas."
  },
  besoccer: {
    companyInfo: "Empresa tecnológica malagueña con sede en Málaga TechPark, creadora de la base de datos de fútbol más consultada del mundo y plataforma de medios deportivos.",
    currentState: "Desarrollo de herramientas de scouting con inteligencia artificial y acuerdos B2B con clubes de élite y federaciones de todo el mundo.",
    whyIgnacioFits: "Ignacio combina visión comercial, pasión por el deporte y formación analítica para roles de Business Development, gestión de alianzas y operaciones de equipo."
  },
  avanza_movilidad: {
    companyInfo: "Uno de los mayores operadores de movilidad y transporte urbano e interurbano de la Costa del Sol y Málaga, integrado en el grupo internacional Mobility ADO.",
    currentState: "Electrificación de la flota de autobuses, implantación de pago con tarjeta sin contacto y optimización de líneas de alta frecuencia en el corredor de la Costa del Sol.",
    whyIgnacioFits: "Ignacio cuenta con experiencia en supervisión operativa y cumplimiento de cronogramas estrictos, apto para la planificación de operaciones y gestión de turnos de personal."
  },
  frutas_montosa: {
    companyInfo: "Líder europeo en producción y maduración de aguacate y mango, así como salsas procesadas (guacamole), con sede en Vélez-Málaga y proveedor estratégico de Mercadona.",
    currentState: "Crecimiento de la demanda europea de producto fresco de origen nacional e inversiones en automatización y líneas de envasado rápido.",
    whyIgnacioFits: "Su capacidad de control de proyectos, análisis de mermas de producto y coordinación operativa se adaptan al ritmo exigente del sector agroalimentario de gran distribución."
  },

  // 5. CONSULTORÍA DE PERSONAS, TALENTO Y RRHH
  standby: {
    companyInfo: "Firma malagueña de referencia en consultoría de recursos humanos, selección directiva y Headhunting en Málaga y Andalucía con sede en Calle Larios.",
    currentState: "Alta demanda de mandos intermedios y directivos en Málaga por la llegada de multinacionales tecnológicas y corporaciones a la ciudad.",
    whyIgnacioFits: "Ignacio conoce a fondo el tejido empresarial de Málaga tras 5 años en Savills. Aporta empatía, capacidad de evaluación de competencias y rigor para liderar procesos de selección."
  },
  randstad: {
    companyInfo: "Líder mundial en servicios de recursos humanos y consultoría de talento, con delegación especializada de Randstad Professionals en Málaga.",
    currentState: "Crecimiento en la selección de perfiles cualificados de finanzas, operaciones, retail y perfiles técnicos para la creciente economía malagueña.",
    whyIgnacioFits: "Ignacio aporta doble titulación (ADE + ESIC) y lenguaje empresarial para dialogar de tú a tú con directores de recursos humanos y entender sus necesidades de contratación."
  },
  adecco: {
    companyInfo: "Grupo líder en soluciones de RRHH y selección ejecutiva (LHH) con fuerte presencia en Málaga capital y centros neurálgicos de Andalucía.",
    currentState: "Gestión de grandes planes de selección masiva para logística y retail en Málaga, complementado con búsqueda de mandos de gestión.",
    whyIgnacioFits: "Capacidad de organización masiva, seguimiento riguroso de expedientes y dinamismo para captar y fidelizar talento cualificado en la provincia."
  },
  manpower: {
    companyInfo: "Firma global de talento especializada en gestión flexible de personas y selección de perfiles ejecutivos a través de Experis.",
    currentState: "Desarrollo de proyectos de reclutamiento especializado en áreas de cadena de suministro, finanzas y operaciones corporativas.",
    whyIgnacioFits: "Ignacio ofrece experiencia en proyectos corporativos complejos y visión estratégica de cómo los recursos humanos impactan en la cuenta de resultados."
  },
  nortempo: {
    companyInfo: "Grupo empresarial gallego con implantación consolidada en Málaga, prestando servicios integrales de recursos humanos, formación y outsourcing.",
    currentState: "Expansión de servicios de selección y externalización operativa de procesos en empresas logísticas y de servicios de la Costa del Sol.",
    whyIgnacioFits: "Su conocimiento del mercado local y su capacidad de gestión operativa aportan agilidad y solvencia a los proyectos de selección y gestión laboral de la firma."
  },

  // 6. CONSULTORÍA DE NEGOCIO, ESTRATEGIA Y BIG 4
  auren: {
    companyInfo: "Firma multidisciplinar española de servicios profesionales (consultoría, auditoría, legal y personas) con sede histórica en Calle Larios de Málaga.",
    currentState: "Crecimiento en asesoramiento estratégico a medianas empresas andaluzas en planes de negocio, optimización de procesos y gobierno corporativo.",
    whyIgnacioFits: "Ignacio aúna 5 años en consultoría de negocio en Savills, doble máster de posgrado y excelente manejo de modelos financieros en Excel para incorporarse a su área de consultoría."
  },
  bdo: {
    companyInfo: "Una de las principales organizaciones mundiales de auditoría y consultoría de negocio con oficina representativa en Avenida de Andalucía (Málaga).",
    currentState: "Consolidación de su área de Advisory en Andalucía: apoyo en transacciones, valoración de activos y reestructuración empresarial.",
    whyIgnacioFits: "Ignacio cuenta con 5 años realizando valoraciones de carteras, flujos de caja y análisis de viabilidad, encajando de inmediato en su equipo de Advisory."
  },
  pwc_advisory: {
    companyInfo: "Big Four líder en servicios de asesoramiento estratégico y financiero. Su oficina de Málaga asesora en grandes transacciones corporativas y proyectos del sector público y privado.",
    currentState: "Liderazgo en mandatos de valoración y compraventa (M&A) derivados del dinamismo económico e inmobiliario de Málaga.",
    whyIgnacioFits: "Ignacio aporta disciplina de firma internacional (Savills), capacidad de síntesis en informes directivos y modelización cuantitativa contrastada."
  },
  deloitte_advisory: {
    companyInfo: "Firma líder global en consultoría estratégica, financiera y tecnológica con oficina central en Calle Marqués de Larios en Málaga.",
    currentState: "Refuerzo de sus divisiones de Financial Advisory y Real Estate para acompañar a inversores y grandes empresas en Andalucía.",
    whyIgnacioFits: "Su formación rigurosa en ADE (UMA) y Savills University le permite asumir trabajo en equipo en proyectos de alto nivel con plazos exigentes."
  },
  ey_strategy: {
    companyInfo: "Big Four de referencia con oficina en Alameda Principal de Málaga, especializada en Strategy and Transactions (SaT) y consultoría de negocio.",
    currentState: "Asesoramiento en proyectos de transformación sectorial, due diligence operativa y planes estratégicos de inversión en la Costa del Sol.",
    whyIgnacioFits: "Ignacio domina la interlocución técnica, análisis de comparables y elaboración de memorandos ejecutivos con solvencia matemática."
  },
  kpmg_deals: {
    companyInfo: "Big Four referente en asesoramiento financiero corporativo y Deal Advisory, con sede en Calle Larios de Málaga.",
    currentState: "Participación en las operaciones corporativas y patrimoniales más relevantes de la región andaluza.",
    whyIgnacioFits: "Aporta sólida base contable y financiera (ADE), capacidad analítica y experiencia directa elaborando dictámenes de valoración patrimonial."
  },
  babel_group: {
    companyInfo: "Consultora multinacional tecnológica con importante centro de operaciones en Málaga TechPark, especializada en transformación digital de grandes cuentas.",
    currentState: "Ampliación de su centro de Málaga y gestión de grandes proyectos de integración tecnológica y consultoría operativa.",
    whyIgnacioFits: "Ignacio destaca en Project Management (PMO): control de hitos, seguimiento de cronogramas y coordinación de equipos transversales."
  },

  // 7. REAL ESTATE, VALORACIONES Y PROMOTORAS PRIME
  cbre_malaga: {
    companyInfo: "Líder global indiscutible en servicios inmobiliarios y consultoría patrimonial, con oficina central en Calle Marqués de Larios de Málaga.",
    currentState: "Gestión de las mayores operaciones de inversión, asesoramiento en activos hoteleros, oficinas y valoraciones institucionales en la Costa del Sol.",
    whyIgnacioFits: "Ignacio proviene de Savills (competidor directo de CBRE), con 5 años de experiencia exacta en valoración y análisis de mercado en la misma plaza de Málaga. Curva de adaptación: cero días."
  },
  tinsa_malaga: {
    companyInfo: "Sociedad de tasación líder en España y Latinoamérica con delegación provincial en Calle Hilera (Málaga).",
    currentState: "Cifras récord de expedientes de valoración pericial y tasaciones hipotecarias impulsadas por el dinamismo de la compraventa en Málaga.",
    whyIgnacioFits: "5 años realizando dictámenes periciales, inspecciones físicas in situ y aplicación de normativa ECO/RICS en Savills. Productividad inmediata."
  },
  gloval_malaga: {
    companyInfo: "Firma de servicios integrales de valoración, ingeniería y consultoría inmobiliaria con delegación en Calle Larios (Málaga).",
    currentState: "Asesoramiento técnico y valoración de carteras singulares para fondos de inversión y banca en Andalucía.",
    whyIgnacioFits: "Ignacio aporta método analítico, dominio de Excel y conocimiento calle a calle de los comparables de mercado de Málaga y municipios costeros."
  },
  tecnitasa_malaga: {
    companyInfo: "Una de las sociedades de tasación independientes más consolidadas de España, con delegación en Alameda Principal de Málaga.",
    currentState: "Crecimiento en el segmento de valoraciones para grandes tenedores y promotores inmobiliarios en el sur de España.",
    whyIgnacioFits: "Aporta rigor técnico, agilidad en la entrega de informes y trato profesional con clientes corporativos."
  },
  euroval_malaga: {
    companyInfo: "Sociedad de tasación homologada por el Banco de España con delegación en Edificio Galaxia (Málaga).",
    currentState: "Refuerzo de su red pericial en la Costa del Sol para atender la alta demanda de informes de mercado.",
    whyIgnacioFits: "Experiencia directa en inspección y control de informes de valoración, con formación en ADE y consultoría estratégica."
  },
  gilmar_malaga: {
    companyInfo: "Consultora inmobiliaria prémium líder en el segmento de lujo residencial e inversiones, con oficinas en Málaga centro, Marbella, Estepona y Puerto Banús.",
    currentState: "Expansión en la captación de promociones exclusivas para inversores internacionales en el litoral malagueño.",
    whyIgnacioFits: "Ignacio cuenta con el Máster GESCO en Dirección Comercial (ESIC), inglés profesional B2 y 5 años en Savills valorando propiedades prémium. Perfil perfecto para captación y negociación."
  },
  colliers_malaga: {
    companyInfo: "Firma global de asesoramiento financiero y de inversión en Real Estate, con foco en hoteles, residencial y suelo en la Costa del Sol.",
    currentState: "Liderazgo en transacciones hoteleras e intermediación de activos singulares en Marbella y Málaga.",
    whyIgnacioFits: "Ignacio domina la modelización de flujos de caja (DCF), estudios de viabilidad y reporting a comités de inversión."
  },
  metrovacesa_malaga: {
    companyInfo: "Promotora inmobiliaria cotizada líder en España con delegación territorial en Calle Hilera (Málaga). Desarrolla proyectos emblemáticos como Málaga Towers.",
    currentState: "Mayor cartera de suelo en desarrollo en Málaga (Torre del Río, Teatinos, Costa del Sol), con miles de viviendas en comercialización y construcción.",
    whyIgnacioFits: "Ignacio realizó estudios de viabilidad comercial de promociones y seguimiento de oferta en Savills. Aporta valor directo en gestión de suelo y seguimiento de promociones."
  },
  aedas_homes_malaga: {
    companyInfo: "Promotora residencial de primer nivel cotizada en bolsa con delegación de la Costa del Sol en Calle Larios (Málaga).",
    currentState: "Liderazgo en promociones industrializadas y residenciales prémium en Estepona, Marbella, Fuengirola y Rincón de la Victoria.",
    whyIgnacioFits: "Su experiencia coordinando proyectos con 100% de cumplimiento en plazos y su formación en ADE y ESIC son idóneos para Project Management y gestión de promociones."
  },
  neinor_homes_malaga: {
    companyInfo: "Promotora líder del mercado residencial español con delegación de Andalucía Oriental en Paseo de Reding (Málaga).",
    currentState: "Desarrollo de proyectos de venta tradicional (Build to Sell) y vivienda en alquiler (Build to Rent) en Málaga y municipios limítrofes.",
    whyIgnacioFits: "Aporta capacidad de análisis de rentabilidades por proyecto, gestión de proveedores y visión comercial para el lanzamiento de nuevas promociones."
  },
  via_celere_malaga: {
    companyInfo: "Promotora inmobiliaria reconocida por su innovación y zonas comunes disruptivas, con delegación en Calle Hilera (Málaga).",
    currentState: "Consolidación de desarrollos residenciales sostenibles en Málaga y expansión selectiva de suelo en la Costa del Sol.",
    whyIgnacioFits: "Ignacio aúna análisis económico riguroso con orientación al cliente y gestión de cronogramas operativos sin desviaciones presupuestarias."
  }
};

// Merge intel into companies
let count = 0;
companies.forEach(company => {
  const intel = companyIntel[company.id];
  if (intel) {
    company.companyInfo = intel.companyInfo;
    company.currentState = intel.currentState;
    company.whyIgnacioFits = intel.whyIgnacioFits;
    count++;
  } else {
    company.companyInfo = `${company.name} es una empresa relevante en Málaga en el sector de ${company.category}, con centro operativo en ${company.location}.`;
    company.currentState = `Actualmente consolidando sus operaciones y actividad comercial en la provincia de Málaga y Andalucía.`;
    company.whyIgnacioFits = `Ignacio aporta 5 años de trayectoria corporativa en consultoría (Savills), formación superior en ADE y Dirección Comercial (ESIC), rigor analítico y capacidad para asumir responsabilidades operativas inmediatas.`;
  }
});

fs.writeFileSync(path.join(rootDir, 'data', 'companies.json'), JSON.stringify(companies, null, 2), 'utf-8');
console.log(`Enriched ${count} of ${companies.length} companies with intelligence data!`);
