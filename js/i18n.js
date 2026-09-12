/* ============================================
   i18n — bilingual EN/ES toggle (no backend, no build step)
   --------------------------------------------
   English is the source of truth: it lives in index.html and is captured
   from the DOM on load. This file only holds the Spanish overrides (ES) plus
   shared data for the dynamic JS (typing titles, chat, vision, case studies).
   Switching language is instant and persisted in localStorage.
   window.I18N exposes { lang, t(), pick(), dyn } + an 'i18n:change' event.
   ============================================ */

/* ---- Static Spanish overrides (keyed by data-i18n) ---- */
const ES = {
    // Navigation
    'nav.home': 'Inicio',
    'nav.about': 'Sobre mí',
    'nav.experience': 'Experiencia',
    'nav.projects': 'Proyectos',
    'nav.certs': 'Certificaciones',
    'nav.chat': 'Chat IA',
    'nav.vision': 'Vision Lab',
    'nav.contact': 'Contacto',

    // Shared
    'cv.download': 'Descargar CV',

    // About
    'about.title': 'Sobre mí',
    'about.subtitle': 'Convirtiendo datos en decisiones, e ideas en sistemas inteligentes.',
    'about.intro': '¡Hola! Soy Juan, Científico de Datos e Ingeniero de IA. En septiembre de 2026 me gradué de la Pontificia Universidad Javeriana (Ciencia de Datos, cum laude) con el mejor promedio de la carrera — <em>Orden al Mérito Académico Javeriano</em> y Mención de Honor al Mejor Promedio Académico. Trabajo como Ingeniero de Datos e IA independiente — recientemente entregué un pipeline de datos para Alteon Insurance a través de Imuko — tras liderar Visión por Computador en Vigías de Colombia, y me apasiona entender a fondo cada problema antes de resolverlo con datos.',

    // Experience
    'exp.title': 'Experiencia',
    'exp.subtitle': 'Un historial de aportar valor en datos, IA e ingeniería.',
    'exp.d0': 'Jul 2026 — Presente',
    'exp.t0': 'Ingeniero de Datos e IA Freelance',
    'exp.p0': 'Ingeniería independiente de datos e IA para clientes. Encargo más reciente — a través de Imuko — construyendo un pipeline de datos para Alteon Insurance, entregado entre julio y agosto de 2026.',
    'exp.d1': 'Nov 2025 — Jul 2026',
    'exp.t1': 'Ingeniero de IA · Visión por Computador y LLM/RAG',
    'exp.p1': 'Lideré la parte de Visión por Computador de un sistema full-stack de inteligencia de video — un ensamble híbrido de modelos (YOLO, D-FINE, RT-DETRv2, PaddlePaddle) que automatiza la detección de eventos y la generación de metadatos desde cámaras en vivo — servido como APIs contenedorizadas (Docker, FastAPI / Flask) en AWS y Azure ML / Databricks, además de componentes NLP / LLM y RAG integrados en pipelines de datos con arquitectura Medallion.',
    'exp.d2': 'Jun 2025 — Nov 2025',
    'exp.t2': 'Administrador de Bases de Datos',
    'exp.p2': 'Desarrollé un esquema de base de datos SQL robusto y un modelo relacional para una nueva plataforma de salud pública dedicada al magisterio colombiano, garantizando integridad de datos, escalabilidad y soporte para el seguimiento longitudinal de salud.',
    'exp.d3': 'Feb 2024 — Jun 2025',
    'exp.t3': 'Científico de Datos Junior',
    'exp.p3': 'Diseñé e implementé dashboards automatizados para que los directivos monitorearan la salud organizacional y la eficiencia de los procesos, habilitando la toma de decisiones basada en datos en toda la organización.',
    'exp.d4': 'Feb 2024 — Jun 2025',
    'exp.t4': 'Analista',
    'exp.p4': 'Desarrollo de un pipeline integral de análisis de mercado en Python integrando metodologías fundamentales y cuantitativas. Uso de la API de yfinance para la extracción de datos financieros, implementación de NLP para análisis de sentimiento de mercado, cálculo de indicadores técnicos como EMA, e incorporación de lógica de gestión de riesgo para impulsar algoritmos de trading automatizado.',
    'exp.d5': 'Nov 2023 — Abr 2025',
    'exp.t5': 'Administrador de Bases de Datos',
    'exp.p5': 'Diseñé y estructuré conjuntos de datos complejos normalizando esquemas y desarrollando pipelines ETL robustos para el procesamiento analítico.',
    'exp.d6': 'Jul 2024 — Jul 2025',
    'exp.t6': 'Asistente Administrativo',
    'exp.p6': 'Optimicé la programación de cursos universitarios alineando los requerimientos de cada departamento con las necesidades de inscripción de los estudiantes.',
    'exp.d7': 'Ene 2024 — Jul 2024',
    'exp.t7': 'Tutor de Programación Avanzada',
    'exp.p7': 'Guiando a estudiantes a través de los pilares de la POO con Java, la mecánica de la lógica de programación y los detalles de la manipulación de punteros en C++.',

    // Education
    'edu.title': 'Educación',
    'edu.subtitle': 'Científico de Datos — Pontificia Universidad Javeriana, cum laude, mejor promedio de la carrera.',
    'edu.degree': 'Pregrado en Ciencia de Datos (Científico de Datos)',
    'edu.dates': '2023 — 2026 · Graduado el 10 de sep. de 2026',
    'edu.desc': 'Graduado cum laude con un promedio acumulado de 4.53 / 5.0 — el más alto de la Carrera de Ciencia de Datos. Tesis sobre interpretabilidad de modelos Transformer: mapeo de circuitos conceptuales en GPT-2 Medium mediante intervenciones causales que simulan afasia semántica.',
    'edu.h0': '<strong>Orden al Mérito Académico Javeriano</strong> (sep. 2026) — distinción de la universidad para los graduados con un destacado promedio ponderado acumulado final.',
    'edu.h0b': '<strong>Mención de Honor al Mejor Promedio Académico</strong> (sep. 2026) — mención de honor de la Facultad de Ciencias al mejor promedio acumulado de la Carrera de Ciencia de Datos.',
    'edu.h1': 'Beca Semestral por Excelencia Académica (2023-1) — el promedio acumulado más alto de la Carrera de Ciencia de Datos.',
    'edu.h2': 'Beca Bachiller Destacado — Pontificia Universidad Javeriana.',
    'edu.h3': 'Representante de la universidad en el Hackathon Internacional H4CKFOREDU (Universidad Pontificia de Salamanca, 2024); participante en el UN Datathon 2024.',
    'edu.g1': 'Diploma',
    'edu.g2': 'Acta de grado',
    'edu.g3': 'Orden al Mérito',
    'edu.g4': 'Mejor Promedio',
    'edu.more': 'Ver el diploma, el acta de grado y las distinciones completas',

    // Projects
    'proj.title': 'Proyectos Destacados',
    'proj.subtitle': 'El trabajo detrás de la experiencia — sistemas reales en producción e investigación.',
    'proj.stProd': 'En Producción',
    'proj.stDev': 'En Desarrollo',
    'proj.stActive': 'Activo',
    'proj.stThesis': 'Tesis',
    'proj.stDelivered': 'Entregado',
    'proj.stHack': 'Hackathon',
    'proj.stDemo': 'Demo',
    'proj.video': 'Video demo',
    'proj.caseCue': 'Ver caso de estudio',
    'proj.code': 'Código',
    'proj.demo': 'Demo en vivo',
    'proj.vigiasT': 'VIGIAS-IA: Analítica de Video en Tiempo Real',
    'proj.vigiasD': 'Sistema de inteligencia de video para seguridad donde lidero <strong>Visión por Computador</strong>: cámaras en vivo procesadas en tiempo real con un ensamble híbrido de modelos sobre NVIDIA DeepStream.',
    'proj.pipeT': 'PIPE-IA: IA Generativa para Análisis de Redes',
    'proj.pipeD': 'Plataforma de IA generativa (Condor AI) que convierte datos complejos de redes y territorio en insights estratégicos claros y accionables.',
    'proj.fiscalT': 'IA Generativa para Control Fiscal',
    'proj.fiscalD': 'IA generativa aplicada a la fiscalización: automatiza el análisis de datos financieros y regulatorios, detecta anomalías y genera reportes estructurados.',
    'proj.eaoaT': 'EAOA: Ecosistema de Operaciones Autónomas',
    'proj.eaoaD': 'Sistema multiagente que orquesta agentes de IA especializados — memoria persistente, function calling, flujos agénticos — para automatizar procesos de negocio de forma autónoma.',
    'proj.finT': 'Analítica Financiera y Predicción de Mercado',
    'proj.finD': 'Pipeline cuantitativo de mercado: sentimiento con NLP, indicadores técnicos y predicción de precios con CNN-LSTM alimentando trading automatizado con gestión de riesgo.',
    'proj.tequendamaT': 'Tequendama: Plataforma de Seguros con IA',
    'proj.tequendamaD': 'Asistente conversacional de seguros construido para el hackathon Colsubsidio 30X — chat web, voz en vivo y WhatsApp: perfila, cotiza, verifica identidad (KYC), cobra y emite la póliza sin intervención humana.',
    'proj.pulsoT': 'PULSO: Ruteo de Urgencias con IA',
    'proj.pulsoD': 'Construido en Platanus Hack 26 (Bogotá, track Emergencias): convierte el dictado de voz del paramédico en un caso clínico estructurado y lleva al paciente al hospital que sí puede recibirlo — por tiempo real de viaje y servicios habilitados, no solo por distancia.',
    'proj.voiceT': 'Agente de Voz con IA para Cobranza',
    'proj.voiceD': 'Agente de voz saliente en tiempo real para cobranza de tarjetas de crédito: voz a texto y texto a voz con Deepgram, un LLM como cerebro, guion conforme a la FDCPA, persistencia de llamadas y modo chat de respaldo.',
    'proj.xaiT': 'Tesis: Interpretabilidad de Modelos Transformer',
    'proj.xaiD': 'Trabajo de grado (Javeriana, 2026): mapeo de circuitos conceptuales en GPT-2 Medium con intervenciones causales — ablaciones y hooks que simulan afasia semántica — para entender cómo los Transformers representan el significado.',
    'proj.fomagT': 'Arquitectura de Base de Datos FOMAG',
    'proj.fomagD': 'Esquema SQL y modelo relacional para una plataforma nacional de salud pública del magisterio colombiano — construido para integridad, escala y seguimiento longitudinal.',
    'proj.ragT': 'Asistentes de IA con RAG',
    'proj.ragD': 'Asistentes de IA fundamentados en bases de conocimiento curadas para minimizar alucinaciones — incluido el chatbot RAG de este sitio.',

    // Certifications page (certificados.html)
    'certs.title': 'Título, Distinciones y Certificaciones',
    'certs.title2': 'Certificaciones y Cursos',
    'honors.title': 'Título y Distinciones Académicas',
    'honors.subtitle': 'Científico de Datos — título conferido por la Pontificia Universidad Javeriana el 10 de septiembre de 2026, junto con las dos máximas distinciones académicas de la universidad. Cada documento está firmado digitalmente y es verificable en el sitio de la universidad.',
    'honors.c1': 'Diploma — Científico de Datos (Pregrado en Ciencia de Datos)',
    'honors.n1': 'Título otorgado en nombre de la República de Colombia · Diploma N.º 227622 · Acta de Grado N.º 202609100500 · versiones en español y en latín.',
    'honors.d1': '10 de septiembre de 2026',
    'honors.v1': 'Diploma — español (PDF)',
    'honors.v2': 'Diploma — latín (PDF)',
    'honors.c2': 'Acta de Grado N.º 202609100500',
    'honors.n2': 'Registro oficial de la ceremonia de graduación celebrada en Bogotá, que certifica el título de Científico de Datos y el Diploma N.º 227622.',
    'honors.i3': 'Pontificia Universidad Javeriana · Rectoría',
    'honors.n3': 'Distinción de toda la universidad, firmada por el Rector, para los graduados que alcanzan un destacado promedio ponderado acumulado final (fijado por el Consejo de Facultad y aprobado por el Vicerrector Académico). Certificado e insignia digital Xertify.',
    'honors.v3': 'Certificado (PDF)',
    'honors.v4': 'Insignia digital (PDF)',
    'honors.n4': 'Mención de honor de la Facultad de Ciencias al mejor promedio acumulado de la Carrera de Ciencia de Datos (Acta de Consejo N.º 42 del 27 de julio de 2018). Insignia digital Xertify.',
    'certs.subtitle': 'Certificados, cursos y logros — los más recientes primero, cada uno con su PDF.',
    'certs.back': 'Volver al portafolio',
    'certs.soon': 'PDF próximamente',
    'certs.view': 'Ver certificado (PDF)',
    'certs.view4': 'Ver certificados (PDF, 4 páginas)',
    'certs.verify': 'Verificar en línea',
    'edu.cert2': 'Introducción al Machine Learning',
    'edu.cert3': 'Diseño y Fundamentos de Bases de Datos',
    'edu.cert4': 'Fundamentos Profesionales del Análisis de Datos',
    'edu.cert5': 'Hackathon Internacional H4CKFOREDU',
    'edu.cert7': 'Resolución de Problemas con Pensamiento Computacional',
    'edu.cert9': 'Ciberseguridad en el Trabajo',
    'edu.iss6': 'Naciones Unidas',
    'edu.cd1': 'Julio 2024',
    'edu.cd2': 'Mayo 2021',
    'edu.cd3': 'Septiembre 2024',
    'edu.cd4': 'Octubre 2023',
    'edu.cd5': 'Octubre 2024',
    'edu.cd6': 'Noviembre 2024',
    'edu.cd7': 'Mayo 2021',
    'edu.cd8': 'Agosto 2022',
    'edu.cd9': 'Agosto 2022',
    'edu.cert10': 'CS50: Introducción a Bases de Datos con SQL',
    'edu.cd11': 'Abril 2023',
    'edu.cert12': 'Especialización en Procesamiento de Lenguaje Natural',
    'edu.note12': 'Certificado Profesional · 4 cursos: Clasificación y Espacios Vectoriales · Modelos Probabilísticos · Modelos de Secuencia · Modelos de Atención',
    'edu.cd12': 'Septiembre 2026',
    'edu.cert13': 'Especialización en Machine Learning',
    'edu.note13': 'Certificado Profesional · 3 cursos: ML Supervisado (Regresión y Clasificación) · Algoritmos de Aprendizaje Avanzados · Aprendizaje No Supervisado, Recomendadores y Aprendizaje por Refuerzo',
    'edu.cd13': 'Agosto 2026',
    'edu.cert14': 'Machine Learning en Producción (MLOps)',
    'edu.note14': 'Certificado de curso firmado por Andrew Ng — el ciclo de vida completo de ML: alcance, datos, modelado y despliegue.',
    'edu.cert15': 'Construcción de Agentes de Voz con IA para Producción',
    'edu.iss16': 'Universidad de los Andes · Depto. de Ingeniería Industrial',
    'edu.cert16': 'Analytics Forum 2025 (novena edición)',
    'edu.cd16': 'Mayo 2025',
    'edu.cert17': 'Crack The Case: Consulteam Universitario Bogotá',
    'edu.note17': 'Reconocimiento por participación y compromiso destacados — primera edición, Bogotá (8 horas).',
    'edu.cd17': 'Mayo 2024',
    'edu.cert18': 'Entrenamiento Avanzado para Math Masters',
    'edu.note18': 'Tercer entrenamiento avanzado liderado por el programa de Matemáticas (8 horas).',
    'edu.cd18': 'Junio 2021',

    // AI Chat (static)
    'chat.title': 'Habla con mi IA',
    'chat.subtitle': 'Pregunta lo que quieras sobre mi experiencia, habilidades o proyectos — con tecnología de Gemini.',
    'chat.greeting': '¡Hola! Soy el asistente de IA de Juan. Pregúntame lo que quieras sobre su experiencia, habilidades o proyectos.',
    'chat.p1': '¿Quién eres?',
    'chat.p2': '¿Qué stack tecnológico usas?',
    'chat.p3': 'Cuéntame sobre tu experiencia en ML',

    // Vision Lab (static)
    'vision.panelTitle': 'Señales Faciales',
    'vision.hint': 'Activa la cámara para transmitir señales de blendshapes en vivo.',
    'vision.activate': 'Activar Cámara',
    'vision.privacy': 'Solo en tu dispositivo — tu cámara nunca sale de esta página',
    'vision.stop': 'Detener',
    'vision.waiting': '<span class="vision-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg></span> Esperando…',
    'vision.headIdle': 'Cabeza&nbsp;—',
    'vision.facesIdle': 'Caras&nbsp;0',

    // Contact
    'contact.title': 'Construyamos Algo Juntos',
    'contact.body': 'Siempre estoy abierto a conversar sobre nuevos proyectos, ideas creativas u oportunidades para ser parte de tu visión. Ya sea datos, IA o ingeniería — conectemos.',
    'contact.schedule': 'Agendar una Reunión',

    // Case study modal labels
    'case.challenge': 'El Reto',
    'case.approach': 'Mi Enfoque',
    'case.impact': 'Impacto y Resultados',

    // Footer
    'footer.copy': 'Hecho por Juan Lizcano — 2026'
};

/* ---- Attribute Spanish overrides (keyed by data-i18n-attr "attr:key") ---- */
const ATTR_ES = {
    'chat.placeholder': 'Pregúntame lo que quieras...',
    'edu.g1': 'Diploma — Científico de Datos',
    'edu.g2': 'Acta de Grado',
    'edu.g3': 'Orden al Mérito Académico Javeriano — insignia digital',
    'edu.g4': 'Mención de Honor al Mejor Promedio Académico — insignia digital'
};

/* ---- Page <head> metadata (per page, keyed by <body data-page>) ---- */
const META = {
    home: {
        en: {
            title: 'Juan Lizcano | Data Scientist & AI Engineer',
            desc: 'Portfolio of Juan Lizcano Barbosa — Data Scientist, AI Engineer, and Machine Learning Developer based in Colombia. Specializing in NLP, Computer Vision, and database architecture.'
        },
        es: {
            title: 'Juan Lizcano | Científico de Datos e Ingeniero de IA',
            desc: 'Portafolio de Juan Lizcano Barbosa — Científico de Datos, Ingeniero de IA y Desarrollador de Machine Learning en Colombia. Especializado en NLP, Visión por Computador y arquitectura de bases de datos.'
        }
    },
    certs: {
        en: {
            title: 'Degree, Honors & Certifications | Juan Lizcano',
            desc: 'Degree (Científico de Datos, Pontificia Universidad Javeriana), academic honors, certifications and courses of Juan Lizcano Barbosa.'
        },
        es: {
            title: 'Título, Distinciones y Certificaciones | Juan Lizcano',
            desc: 'Título (Científico de Datos, Pontificia Universidad Javeriana), distinciones académicas, certificaciones y cursos de Juan Lizcano Barbosa.'
        }
    }
};

/* ---- Shared data for the dynamic JS modules ---- */
const DYN = {
    // Hero rotating subtitle (js/main.js)
    titles: {
        en: [
            'Data Scientist & AI Engineer',
            'Data Engineer',
            'Machine Learning Developer',
            'Database Architect',
            'NLP & Computer Vision Specialist'
        ],
        es: [
            'Científico de Datos e Ingeniero de IA',
            'Ingeniero de Datos',
            'Desarrollador de Machine Learning',
            'Arquitecto de Bases de Datos',
            'Especialista en NLP y Visión por Computador'
        ]
    },

    // Chat status + error strings (js/chat.js)
    chat: {
        en: {
            connecting: 'Connecting...', online: 'Online', offline: 'Offline', error: 'Error',
            noReply: "Sorry, I couldn't generate a response. Try rephrasing your question.",
            notConfigured: "The AI assistant isn't configured yet. Set the proxy URL in js/chat-config.js. Meanwhile, feel free to reach Juan at juanjlb2005@gmail.com.",
            reachError: 'Hmm, I had trouble reaching the AI service. Please try again in a moment, or email Juan at juanjlb2005@gmail.com.'
        },
        es: {
            connecting: 'Conectando...', online: 'En línea', offline: 'Desconectado', error: 'Error',
            noReply: 'Lo siento, no pude generar una respuesta. Intenta reformular tu pregunta.',
            notConfigured: 'El asistente de IA aún no está configurado. Define la URL del proxy en js/chat-config.js. Mientras tanto, puedes escribir a Juan a juanjlb2005@gmail.com.',
            reachError: 'Mmm, tuve problemas para conectar con el servicio de IA. Inténtalo de nuevo en un momento, o escribe a Juan a juanjlb2005@gmail.com.'
        }
    },

    // Vision Lab dynamic strings (js/vision.js)
    vision: {
        en: {
            idle: 'Idle', loading: 'Loading…', requesting: 'Requesting camera…', live: 'Live', stopped: 'Stopped',
            errPerm: 'Camera permission denied.', errNoCam: 'No camera found on this device.',
            errGpu: 'GPU unavailable — try another browser.', errGeneric: 'Could not start the camera.',
            retry: 'tap "Activate Camera" to retry',
            head: 'Head', faces: 'Faces',
            boot: [
                '> initializing vision runtime…',
                '> loading WASM backend',
                '> fetching face_landmarker.task (3.7MB)',
                '> warming up GPU delegate',
                '> calibrating 478 landmarks',
                '> stream ready ✓'
            ],
            expr: { Happy: 'Happy', Surprised: 'Surprised', Angry: 'Angry', Sad: 'Sad', Wink: 'Wink', Neutral: 'Neutral' },
            bars: {
                'Smile': 'Smile', 'Jaw open': 'Jaw open', 'Brow up': 'Brow up', 'Eye wide': 'Eye wide',
                'Blink L': 'Blink L', 'Blink R': 'Blink R', 'Cheek puff': 'Cheek puff', 'Pucker': 'Pucker'
            }
        },
        es: {
            idle: 'Inactivo', loading: 'Cargando…', requesting: 'Solicitando cámara…', live: 'En vivo', stopped: 'Detenido',
            errPerm: 'Permiso de cámara denegado.', errNoCam: 'No se encontró cámara en este dispositivo.',
            errGpu: 'GPU no disponible — prueba otro navegador.', errGeneric: 'No se pudo iniciar la cámara.',
            retry: 'pulsa "Activar Cámara" para reintentar',
            head: 'Cabeza', faces: 'Caras',
            boot: [
                '> inicializando runtime de visión…',
                '> cargando backend WASM',
                '> descargando face_landmarker.task (3.7MB)',
                '> preparando GPU',
                '> calibrando 478 puntos',
                '> stream listo ✓'
            ],
            expr: { Happy: 'Feliz', Surprised: 'Sorprendido', Angry: 'Enojado', Sad: 'Triste', Wink: 'Guiño', Neutral: 'Neutral' },
            bars: {
                'Smile': 'Sonrisa', 'Jaw open': 'Boca abierta', 'Brow up': 'Ceja arriba', 'Eye wide': 'Ojos abiertos',
                'Blink L': 'Parpadeo I', 'Blink R': 'Parpadeo D', 'Cheek puff': 'Mejillas', 'Pucker': 'Labios'
            }
        }
    },

    // Spanish case studies (English lives in js/projects.js CASE_STUDIES)
    cases: {
        es: {
            vigias: {
                status: 'En Producción',
                title: 'VIGIAS-IA: Analítica de Video en Tiempo Real',
                problem: 'Las operaciones de seguridad dependían de personas vigilando decenas de cámaras en vivo de forma simultánea — una tarea agotadora y propensa a errores, donde eventos críticos (intrusiones, anomalías) se pasaban por alto fácilmente y los metadatos debían registrarse a mano.',
                approach: 'Como Líder de Visión por Computador, diseñé y construí un sistema full-stack de inteligencia de video que ingiere múltiples streams en vivo y ejecuta un ensamble híbrido de modelos (YOLO, D-FINE, RT-DETRv2, PaddlePaddle) para detección y seguimiento. Los pipelines corren en Linux con NVIDIA DeepStream 8.0 y GStreamer, con inferencia acelerada por CUDA y despliegue basado en Docker.',
                impact: [
                    'Detección automática y generación de metadatos en [confirm] cámaras simultáneas en producción',
                    'Redujo el esfuerzo de monitoreo manual y la latencia entre evento y alerta',
                    'El ensamble híbrido mejoró la robustez de detección en escenas e iluminación variadas'
                ]
            },
            'pipe-ia': {
                status: 'En Producción',
                title: 'PIPE-IA: IA Generativa para Análisis de Redes',
                problem: 'Los equipos estratégicos necesitaban darle sentido a datos relacionales grandes y desordenados — territorios, líderes y estructuras de base — pero las conexiones e insights estaban ocultos y eran difíciles de accionar en tiempo real.',
                approach: 'Construí una plataforma de IA generativa (Condor AI) que combina análisis de redes/territorio con razonamiento impulsado por LLMs. El sistema estructura los datos relacionales y usa modelos generativos para revelar patrones, resumir la estructura y convertir conexiones crudas en insight estratégico accionable a través de una interfaz operativa.',
                impact: [
                    'Convirtió datos relacionales complejos en insights claros y listos para decidir',
                    'Centralizó el seguimiento de territorio, líderes clave y estructura de base en una sola plataforma',
                    'Desplegado y accesible en producción en pipe-ia.com'
                ]
            },
            fiscal: {
                status: 'En Producción',
                title: 'IA Generativa para Control Fiscal',
                problem: 'La fiscalización implicaba revisar manualmente enormes volúmenes de datos financieros y regulatorios — lento, inconsistente y fácil de pasar por alto anomalías importantes para la transparencia y la rendición de cuentas.',
                approach: 'Apliqué modelos de IA generativa para automatizar el análisis de datos financieros y regulatorios. El sistema marca anomalías, extrae las señales relevantes con NLP y genera reportes estructurados, apoyando una toma de decisiones fiscal transparente y basada en datos.',
                impact: [
                    'Automatizó el análisis de grandes volúmenes de datos financieros/regulatorios',
                    'Reveló anomalías que apoyan un control fiscal transparente',
                    'Generó reportes estructurados para agilizar los flujos de fiscalización'
                ]
            },
            eaoa: {
                status: 'En Desarrollo',
                title: 'EAOA: Ecosistema de Operaciones Autónomas',
                problem: 'Las empresas pierden tiempo en procesos repetitivos de múltiples pasos que normalmente necesitan supervisión humana constante y no escalan.',
                approach: 'Diseño de un sistema multiagente que orquesta agentes de IA especializados con memoria persistente, function calling y flujos agénticos (LangChain, LangGraph, Llama 3, Claude API) para resolver problemas de negocio complejos de forma autónoma, con mínima intervención humana.',
                impact: [
                    'Apunta a la automatización de extremo a extremo de procesos de negocio complejos',
                    'Los agentes se coordinan con memoria compartida y llamadas a herramientas/funciones',
                    'Diseñado para operar sin supervisión humana constante'
                ]
            },
            tequendama: {
                status: 'Hackathon',
                title: 'Tequendama: Plataforma de Seguros con IA',
                problem: 'Comprar un seguro en LATAM todavía implica formularios, llamadas y un asesor humano. El reto del hackathon Colsubsidio 30X: llevar a una persona de "no sé qué seguro necesito" a "ya quedé asegurada" — de punta a punta y sin intervención humana.',
                approach: 'Construí Tequendama, un asistente conversacional que funciona por chat web, voz en vivo y WhatsApp, además de llamadas telefónicas salientes. Perfila al cliente, cotiza con tasas de cambio reales de 12 países de LATAM, cobra (Polar), verifica identidad (KYC con Didit), captura la firma electrónica y emite la póliza en PDF. Un "cerebro" en FastAPI (DeepSeek + herramientas) convive con un backend de dominio en NestJS/Prisma sobre PostgreSQL y Redis; la voz corre en Deepgram Voice Agent y ElevenLabs; y el gerente tiene un panel de KPIs con alertas, campañas con IA y reportes por correo.',
                impact: [
                    'Recorrido de seguros 100% autoservicio: perfilamiento → cotización → KYC → pago → emisión de póliza',
                    'Omnicanal: chat web, voz en vivo, WhatsApp y llamadas salientes sobre un mismo núcleo de IA',
                    'Entregado como monorepo contenedorizado (Docker / Railway) con video demo público'
                ]
            },
            pulso: {
                status: 'Hackathon',
                title: 'PULSO: Ruteo de Urgencias con IA',
                problem: 'En una emergencia crítica (infarto, ACV, politraumatismo) asignar la cama correcta en Colombia todavía toma ~45 minutos de llamadas telefónicas, y las ambulancias rebotan de IPS en IPS — el "paseo de la muerte" — porque nadie sabe en tiempo real quién tiene la cama y el especialista. El reporte manual de capacidad falla por diseño: el dataset oficial de ocupación diaria tiene una sola fecha viva.',
                approach: 'Construido en Platanus Hack 26 (Bogotá, track Emergencias, equipo de 4). PULSO convierte el dictado de voz del paramédico en un caso clínico estructurado con Claude (diagnóstico CIE-10 probable, nivel de triage, servicios obligatorios), filtra las IPS de urgencias de Bogotá desde el registro oficial REPS con un filtro duro de servicios y las puntúa en minutos — ETA con tráfico real más el costo esperado de un rechazo y la congestión inferida — antes de un handshake de un toque con el hospital receptor por Telegram, WhatsApp o consola web. Cada rechazo se vuelve el prior de la siguiente decisión: la red se entrena sola. Fui dueño de la PWA de campo (/campo: dictado → caso → ranking → despacho → navegación, con el cronómetro de hora dorada), del mapa y de los componentes compartidos, y además entregué el login y la sesión, la deduplicación de webhooks de WhatsApp, el token de servicio del módulo de voz, el constructor del resumen clínico FHIR R4 (RDA) y los catálogos de administración. Stack: Next.js, NestJS, FastAPI, PostgreSQL + PostGIS, Mapbox, Claude API, Twilio/WhatsApp.',
                impact: [
                    'Del dictado de voz al hospital receptor confirmado en menos de 90 segundos — la meta alrededor de la cual se construyó todo el producto',
                    'Ruteo por tiempo real de viaje y servicios habilitados (84 IPS de urgencias verificadas en Bogotá), no solo por distancia',
                    'Adopción sin fricción: el hospital solo pulsa Aceptar / Rechazar en el canal que ya usa; cada respuesta es una observación etiquetada',
                    'Demo en vivo desplegada en Render; monorepo de código abierto con el trabajo de todo el equipo'
                ]
            },
            voice: {
                status: 'Demo',
                title: 'Agente de Voz con IA para Cobranza',
                problem: 'La cobranza pre-charge-off de tarjetas de crédito depende de grandes call centers que siguen guiones estrictos de cumplimiento (FDCPA). Un agente de voz debe sostener una conversación natural en tiempo real, mantenerse dentro de la norma y dejar registro de cada llamada.',
                approach: 'Construí una demo de agente de voz saliente en vivo: Deepgram Voice Agent se encarga de voz a texto (nova-3) y texto a voz, un LLM compatible con OpenAI (DeepSeek, con respaldo en gpt-4o-mini) conduce la conversación con una persona conforme a la FDCPA, las llamadas se persisten con Prisma, y un modo chat con server-sent events permite que el evaluador haga de cliente. Frontend en React + Vite, backend en Node, desplegable en Render.',
                impact: [
                    'Pipeline de voz de extremo a extremo: STT → razonamiento LLM → TTS en tiempo real desde el navegador',
                    'Persona y guion conscientes del cumplimiento normativo para un escenario regulado de cobranza',
                    'Doble modo (voz y chat) con historial de llamadas y manejo de webhooks'
                ]
            },
            financial: {
                status: 'Activo',
                title: 'Analítica Financiera y Predicción de Mercado',
                problem: 'Las decisiones de trading discrecional son lentas, emocionales y difíciles de respaldar con backtesting, y combinar fundamentales con sentimiento y señales de precio de forma manual no escala.',
                approach: 'Construí un pipeline cuantitativo que integra métodos fundamentales y algorítmicos: yfinance para extracción de datos, NLP para sentimiento de mercado, indicadores técnicos (EMA) y modelos CNN-LSTM para predicción de precios — alimentando una lógica de trading automatizado con gestión de riesgo (órdenes límite, stop-loss).',
                impact: [
                    'Unificó fundamentales, sentimiento y técnicos en un solo pipeline automatizado',
                    'Modelos CNN-LSTM para predicción de precios con señales testeables',
                    'Lógica de gestión de riesgo (stop-loss, órdenes límite) integrada en la ejecución'
                ]
            },
            xai: {
                status: 'Tesis',
                title: 'Tesis: Interpretabilidad de Modelos Transformer',
                problem: 'Los grandes modelos de lenguaje representan el significado de formas que no podemos leer directamente. ¿Qué circuitos internos cargan un concepto y qué le pasa al comportamiento del modelo cuando se dañan? Sin ese mapa, la interpretabilidad y la confianza se quedan en la superficie.',
                approach: 'Trabajo de grado en Ciencia de Datos (Pontificia Universidad Javeriana, 2026 — tutor: Jorge Andrés Alvarado Valencia): "Mapeo de circuitos conceptuales: análisis de la representación en modelos Transformer mediante intervención causal simulando afasia semántica". Con hooks y ablaciones dirigidas sobre GPT-2 Medium, intervengo las activaciones para simular déficits tipo afasia semántica y mido cómo se degradan las representaciones conceptuales, mapeando qué componentes cargan qué conceptos.',
                impact: [
                    'Evidencia causal (no solo correlacional) de dónde viven los conceptos dentro de un Transformer',
                    'Herramientas reutilizables de intervención: hooks de activación, experimentos de ablación y notebooks de análisis',
                    'Conecta la neurociencia (afasia semántica) con la interpretabilidad mecanicista de los LLMs'
                ]
            },
            fomag: {
                status: 'Entregado',
                title: 'Arquitectura de Base de Datos FOMAG',
                problem: 'Una nueva plataforma nacional de salud pública para el magisterio de Colombia necesitaba una base de datos que garantizara integridad y escala mientras soportaba el seguimiento longitudinal de salud.',
                approach: 'Diseñé un esquema SQL robusto y un modelo relacional con normalización, gobernanza de datos y pipelines ETL (Databricks) para asegurar integridad, escalabilidad y un seguimiento longitudinal confiable en todo el sistema educativo nacional.',
                impact: [
                    'Entregó la base de datos relacional para una plataforma nacional de salud',
                    'Aseguró integridad y escalabilidad de datos para el seguimiento longitudinal',
                    'Estableció procesos de gobernanza y ETL para datos analíticos limpios'
                ]
            },
            rag: {
                status: 'Activo',
                title: 'Asistentes de IA con RAG',
                problem: 'Los LLMs generales alucinan y carecen de fundamento en conocimiento específico y privado — lo que los hace poco confiables para responder preguntas de dominio.',
                approach: 'Construí múltiples asistentes usando el framework de Generación Aumentada por Recuperación, fundamentando los LLMs en bases de conocimiento curadas (LlamaIndex, Gemini) para minimizar alucinaciones, con despliegues vía Gradio y Hugging Face Spaces.',
                impact: [
                    'Redujo las alucinaciones fundamentando las respuestas en bases de conocimiento curadas',
                    'Entregó múltiples asistentes desplegados, incluido un chatbot personal de portafolio',
                    'Patrón RAG reutilizable aplicado en distintos dominios'
                ]
            }
        }
    }
};

/* ============================================
   Engine
   ============================================ */
(function () {
    const STORE_KEY = 'site-lang';
    const stored = localStorage.getItem(STORE_KEY);
    let lang = stored || ((navigator.language || 'en').toLowerCase().startsWith('es') ? 'es' : 'en');

    const originals = new Map();      // el -> original innerHTML (English)
    const attrOriginals = new Map();  // el -> { attr: originalValue }

    function parseAttrSpec(spec) {
        // "placeholder:chat.placeholder" or "title:a,aria-label:b"
        return spec.split(',').map((pair) => {
            const idx = pair.indexOf(':');
            return { attr: pair.slice(0, idx).trim(), key: pair.slice(idx + 1).trim() };
        });
    }

    function collect() {
        document.querySelectorAll('[data-i18n]').forEach((el) => {
            originals.set(el, el.innerHTML);
        });
        document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
            const map = {};
            parseAttrSpec(el.getAttribute('data-i18n-attr')).forEach(({ attr }) => {
                map[attr] = el.getAttribute(attr);
            });
            attrOriginals.set(el, map);
        });
    }

    function apply() {
        const es = lang === 'es';

        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.getAttribute('data-i18n');
            if (es && ES[key] != null) el.innerHTML = ES[key];
            else if (originals.has(el)) el.innerHTML = originals.get(el);
        });

        document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
            const orig = attrOriginals.get(el) || {};
            parseAttrSpec(el.getAttribute('data-i18n-attr')).forEach(({ attr, key }) => {
                if (es && ATTR_ES[key] != null) el.setAttribute(attr, ATTR_ES[key]);
                else if (orig[attr] != null) el.setAttribute(attr, orig[attr]);
            });
        });

        // <head> metadata + <html lang>
        const page = META[document.body.dataset.page] || META.home;
        const meta = page[lang] || page.en;
        document.title = meta.title;
        const md = document.querySelector('meta[name="description"]');
        if (md) md.setAttribute('content', meta.desc);
        document.documentElement.lang = lang;

        updateToggle();
        window.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang } }));
    }

    function updateToggle() {
        document.querySelectorAll('.lang-opt').forEach((b) => {
            b.classList.toggle('active', b.dataset.lang === lang);
            b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
        });
    }

    function setLang(next) {
        if (next === lang) return;
        lang = next;
        localStorage.setItem(STORE_KEY, lang);
        apply();
    }

    // Public API for the dynamic JS modules.
    window.I18N = {
        get lang() { return lang; },
        t(en, es) { return lang === 'es' ? es : en; },
        pick(map) { return (map && map[lang] != null) ? map[lang] : (map ? map.en : undefined); },
        onChange(cb) {
            window.addEventListener('i18n:change', (e) => cb(e.detail.lang));
            return lang;
        },
        dyn: DYN
    };

    document.addEventListener('DOMContentLoaded', () => {
        collect();
        apply();
        document.querySelectorAll('.lang-opt').forEach((b) => {
            b.addEventListener('click', () => setLang(b.dataset.lang));
        });
    });
})();
