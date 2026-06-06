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
    'nav.skills': 'Habilidades',
    'nav.experience': 'Experiencia',
    'nav.projects': 'Proyectos',
    'nav.education': 'Educación',
    'nav.chat': 'Chat IA',
    'nav.vision': 'Vision Lab',
    'nav.contact': 'Contacto',

    // Shared
    'cv.download': 'Descargar CV',

    // About
    'about.title': 'Sobre mí',
    'about.subtitle': 'Convirtiendo datos en decisiones, e ideas en sistemas inteligentes.',
    'about.intro': '¡Hola! Soy Juan, un Científico de Datos altamente motivado y orientado a resultados. Me gradué en Ciencia de Datos de la Pontificia Universidad Javeriana y actualmente curso una Maestría en Inteligencia Artificial. Combino una sólida experiencia técnica con una verdadera pasión por aprovechar los datos para resolver problemas complejos de formas innovadoras. Actualmente trabajo como Ingeniero MLOps y Líder de Visión por Computador, especializándome en construir sistemas de IA full-stack — desde pipelines de visión por computador hasta soluciones de IA generativa.',
    'about.philTitle': 'Mi Filosofía',
    'about.philBody': 'Mi filosofía central es simple pero poderosa: todo se puede aprender. Los retos no son obstáculos — son oportunidades para crecer. Valoro profundamente el trabajo en equipo porque la colaboración crea sinergias que nos permiten superar las limitaciones individuales. Antes de entrar en cualquier proyecto, siempre priorizo entender el negocio a fondo — yendo más allá de lo obvio para captar la esencia de lo que realmente hay que resolver.',
    'about.beyondTitle': 'Más allá de la Tecnología',
    'about.beyondBody': 'Fuera de la tecnología, me apasiona equilibrar mente y cuerpo — el gimnasio y la actividad física son parte esencial de mi rutina. Disfruto leer libros de filosofía, buscando entender mejor el mundo y mi lugar en él. Mantengo una curiosidad insaciable por las últimas tendencias tecnológicas, explorando cómo pueden mejorar la productividad diaria. Me defino como profundamente curioso y enérgico, con un deseo constante de explorar, aprender y evolucionar.',

    // Stats
    'stat.years': 'Años de Experiencia',
    'stat.roles': 'Roles Profesionales',
    'stat.models': 'Modelos de IA Desplegados',
    'stat.streams': 'Cámaras en Producción',
    'stat.certs': 'Certificaciones',

    // Skills
    'skills.title': 'Habilidades Técnicas',
    'skills.subtitle': 'Un conjunto de herramientas versátil para construir soluciones basadas en datos.',
    'skills.programming': 'Programación',
    'skills.data': 'Datos y Analítica',
    'skills.ai': 'IA y Machine Learning',
    'skills.tools': 'Herramientas y Plataformas',
    'skills.soft': 'Habilidades Blandas',
    'skills.languages': 'Idiomas',
    'skills.spanish': 'Español (Nativo)',
    'skills.english': 'Inglés (C1)',
    'skills.critical': 'Pensamiento Crítico',
    'skills.teamwork': 'Trabajo en Equipo',
    'skills.problem': 'Resolución de Problemas',
    'skills.leadership': 'Liderazgo',

    // Experience
    'exp.title': 'Experiencia',
    'exp.subtitle': 'Un historial de aportar valor en datos, IA e ingeniería.',
    'exp.d1': 'Nov 2025 — Presente',
    'exp.t1': 'Ingeniero MLOps y Líder de Visión por Computador',
    'exp.p1': 'Como Líder de Visión por Computador, impulso el desarrollo de un sistema full-stack de inteligencia de video que utiliza un enfoque de modelos híbridos (YOLO, D-FINE, ReDetv2 y PaddlePaddle) para automatizar la detección de eventos y la generación de metadatos a partir de cámaras en vivo.',
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

    // Projects
    'proj.title': 'Proyectos Destacados',
    'proj.subtitle': 'Soluciones del mundo real construidas con datos e inteligencia.',
    'proj.stProd': 'En Producción',
    'proj.stDev': 'En Desarrollo',
    'proj.stActive': 'Activo',
    'proj.stThesis': 'Tesis',
    'proj.stDelivered': 'Entregado',
    'proj.caseCue': 'Ver caso de estudio',
    'proj.vigiasT': 'VIGIAS-IA: Analítica de Video en Tiempo Real',
    'proj.vigiasD': 'Sistema full-stack de inteligencia de video para seguridad y vigilancia, donde me desempeño como <strong>Líder de Visión por Computador</strong>. Procesa múltiples cámaras en vivo en tiempo real usando un enfoque de modelos híbridos (YOLO, D-FINE, ReDetv2, PaddlePaddle) para detección de anomalías e intrusiones. Desplegado en Linux con NVIDIA DeepStream 8.0 y pipelines de GStreamer.',
    'proj.pipeT': 'PIPE-IA: IA Generativa para Análisis de Redes',
    'proj.pipeD': 'Plataforma de IA generativa (Condor AI) para análisis de redes y territorio — un sistema analítico y operativo para el seguimiento de territorio, líderes clave y estructura de base. Aprovecha modelos generativos para convertir datos relacionales complejos en insights estratégicos accionables.',
    'proj.fiscalT': 'IA Generativa para Control Fiscal',
    'proj.fiscalD': 'Modelos de IA generativa aplicados a la fiscalización y el control. Automatiza el análisis de grandes volúmenes de datos financieros y regulatorios, detectando anomalías y generando reportes estructurados para apoyar una toma de decisiones fiscal transparente y basada en datos.',
    'proj.eaoaT': 'EAOA: Ecosistema de Operaciones Autónomas',
    'proj.eaoaD': 'Sistema multiagente diseñado para la automatización de procesos empresariales sin supervisión humana constante. Orquesta agentes de IA especializados con memoria persistente, function calling y flujos agénticos para resolver problemas de negocio complejos de forma autónoma.',
    'proj.finT': 'Analítica Financiera y Predicción de Mercado',
    'proj.finD': 'Pipeline cuantitativo de análisis de mercado que integra metodologías fundamentales y algorítmicas. Usa la API de yfinance para extracción de datos, NLP para análisis de sentimiento, modelos CNN-LSTM para predicción de precios, y trading automatizado con lógica de gestión de riesgo que incluye órdenes límite y umbrales de stop-loss.',
    'proj.xaiT': 'IA Explicable (XAI) — Tesis',
    'proj.xaiD': 'Investigación sobre IA Explicable aplicada al Aprendizaje por Refuerzo. Desarrollo de técnicas de destilación de modelos para entender el funcionamiento interno de las redes neuronales en RL — analizando patrones de activación neuronal para una mayor interpretabilidad y confiabilidad del modelo.',
    'proj.fomagT': 'Arquitectura de Base de Datos FOMAG',
    'proj.fomagD': 'Esquema de base de datos SQL robusto y modelo relacional para una nueva plataforma de salud pública dedicada al magisterio de Colombia. Garantizó integridad de datos, escalabilidad y soporte para el seguimiento longitudinal de salud en todo el sistema educativo nacional.',
    'proj.ragT': 'Asistentes de IA con RAG',
    'proj.ragD': 'Múltiples asistentes de IA construidos con el framework de Generación Aumentada por Recuperación (RAG). LLMs fundamentados en bases de conocimiento específicas para minimizar las alucinaciones. Incluye el chatbot RAG personal desplegado en este portafolio vía Hugging Face Spaces.',

    // Education
    'edu.title': 'Educación y Certificaciones',
    'edu.subtitle': 'El aprendizaje continuo como principio fundamental.',
    'edu.degree1': 'Maestría en Inteligencia Artificial',
    'edu.inst1': 'Maestría — En Curso',
    'edu.date1': '2026 — Presente',
    'edu.desc1': 'Estudios de posgrado avanzados en Inteligencia Artificial, profundizando en deep learning, IA generativa y sistemas inteligentes — sobre una sólida base en ciencia de datos.',
    'edu.badgeProgress': 'En Curso',
    'edu.badgeGenAI': 'IA Generativa',
    'edu.degree2': 'Pregrado en Ciencia de Datos',
    'edu.date2': '2023 — 2026 · Graduado',
    'edu.desc2': 'Programa integral que abarca estadística, machine learning, bases de datos, programación e IA aplicada. Construí una base sólida para convertir datos en insights accionables.',
    'edu.badgeGpa': 'Mejor Promedio del Programa',
    'edu.badgeScholarship': 'Beca de Excelencia Académica',
    'edu.certsTitle': 'Certificaciones y Logros',
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
    'edu.cd4': 'Agosto 2024',
    'edu.cd5': 'Octubre 2024',
    'edu.cd6': 'Noviembre 2024',
    'edu.cd7': 'Mayo 2021',
    'edu.cd8': 'Agosto 2022',
    'edu.cd9': 'Agosto 2022',

    // AI Chat (static)
    'chat.title': 'Habla con mi IA',
    'chat.subtitle': 'Pregunta lo que quieras sobre mi experiencia, habilidades o proyectos — con tecnología de Gemini.',
    'chat.greeting': '¡Hola! Soy el asistente de IA de Juan. Pregúntame lo que quieras sobre su experiencia, habilidades o proyectos. 🤖',
    'chat.p1': '¿Quién eres?',
    'chat.p2': '¿Qué stack tecnológico usas?',
    'chat.p3': 'Cuéntame sobre tu experiencia en ML',

    // Vision Lab (static)
    'vision.panelTitle': 'Señales Faciales',
    'vision.hint': 'Activa la cámara para transmitir señales de blendshapes en vivo.',
    'vision.activate': 'Activar Cámara',
    'vision.privacy': 'Solo en tu dispositivo — tu cámara nunca sale de esta página',
    'vision.stop': 'Detener',
    'vision.waiting': '<span class="vision-emoji">🛈</span> Esperando…',
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
    'footer.copy': 'Hecho por Juan Lizcano — 2025'
};

/* ---- Attribute Spanish overrides (keyed by data-i18n-attr "attr:key") ---- */
const ATTR_ES = {
    'chat.placeholder': 'Pregúntame lo que quieras...'
};

/* ---- Page <head> metadata ---- */
const META = {
    en: {
        title: 'Juan Lizcano | Data Scientist & AI Engineer',
        desc: 'Portfolio of Juan Lizcano Barbosa — Data Scientist, AI Engineer, and Machine Learning Developer based in Colombia. Specializing in NLP, Computer Vision, and database architecture.'
    },
    es: {
        title: 'Juan Lizcano | Científico de Datos e Ingeniero de IA',
        desc: 'Portafolio de Juan Lizcano Barbosa — Científico de Datos, Ingeniero de IA y Desarrollador de Machine Learning en Colombia. Especializado en NLP, Visión por Computador y arquitectura de bases de datos.'
    }
};

/* ---- Shared data for the dynamic JS modules ---- */
const DYN = {
    // Hero rotating subtitle (js/main.js)
    titles: {
        en: [
            'Data Scientist & AI Engineer',
            'Machine Learning Developer',
            'Database Architect',
            'NLP & Computer Vision Specialist'
        ],
        es: [
            'Científico de Datos e Ingeniero de IA',
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
            notConfigured: "⚠️ The AI assistant isn't configured yet. Set the proxy URL in js/chat-config.js. Meanwhile, feel free to reach Juan at juanjlb2005@gmail.com.",
            reachError: 'Hmm, I had trouble reaching the AI service. Please try again in a moment, or email Juan at juanjlb2005@gmail.com.'
        },
        es: {
            connecting: 'Conectando...', online: 'En línea', offline: 'Desconectado', error: 'Error',
            noReply: 'Lo siento, no pude generar una respuesta. Intenta reformular tu pregunta.',
            notConfigured: '⚠️ El asistente de IA aún no está configurado. Define la URL del proxy en js/chat-config.js. Mientras tanto, puedes escribir a Juan a juanjlb2005@gmail.com.',
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
                approach: 'Como Líder de Visión por Computador, diseñé y construí un sistema full-stack de inteligencia de video que ingiere múltiples streams en vivo y ejecuta un ensamble híbrido de modelos (YOLO, D-FINE, ReDetv2, PaddlePaddle) para detección y seguimiento. Los pipelines corren en Linux con NVIDIA DeepStream 8.0 y GStreamer, con inferencia acelerada por CUDA y despliegue basado en Docker.',
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
                title: 'IA Explicable (XAI) — Tesis',
                problem: 'Los agentes de Aprendizaje por Refuerzo se comportan como cajas negras — es difícil confiar o depurar sus decisiones cuando no se puede ver por qué la red actúa como lo hace.',
                approach: 'Investigando IA Explicable para RL usando destilación de modelos para aproximar e interpretar la política, y analizando patrones de activación neuronal para entender el comportamiento interno de la red y mejorar su interpretabilidad y confiabilidad.',
                impact: [
                    'Desarrolla técnicas para interpretar la toma de decisiones interna de agentes de RL',
                    'Usa destilación de modelos para hacer explicables políticas complejas',
                    'Busca aumentar la confianza y la depurabilidad de los sistemas de RL profundo'
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
        const meta = META[lang] || META.en;
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
