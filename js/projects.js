/* ============================================
   Case Study Modals
   --------------------------------------------
   Content drafted from the project descriptions.
   Impact figures marked "[confirm]" — replace with
   Juan's real numbers when available.
   ============================================ */

const CASE_STUDIES = {
    vigias: {
        status: 'In Production',
        title: 'VIGIAS-IA: Real-Time Video Analytics',
        problem: 'Security operations relied on humans watching dozens of live camera feeds simultaneously — a fatiguing, error-prone task where critical events (intrusions, anomalies) were easily missed and metadata had to be logged by hand.',
        approach: 'As Computer Vision Lead, I designed and built a full-stack video intelligence system that ingests multiple live streams and runs a hybrid model ensemble (YOLO, D-FINE, RT-DETRv2, PaddlePaddle) for detection and tracking. Pipelines run on Linux with NVIDIA DeepStream 8.0 and GStreamer, with CUDA-accelerated inference and Docker-based deployment.',
        impact: [
            'Automated detection and metadata generation across [confirm] simultaneous camera streams in production',
            'Reduced manual monitoring effort and latency between event and alert',
            'Hybrid ensemble improved detection robustness across varied scenes and lighting'
        ],
        tech: ['NVIDIA DeepStream', 'YOLO', 'D-FINE', 'RT-DETRv2', 'PaddlePaddle', 'Python', 'C++', 'CUDA', 'GStreamer', 'Docker'],
        links: [
            { url: 'https://landing.ars-intelligence.com/laboratorio', type: 'site' }
        ]
    },
    'pipe-ia': {
        status: 'In Production',
        title: 'PIPE-IA: Generative AI for Network Analysis',
        problem: 'Strategic teams needed to make sense of large, messy relational data — territories, leaders, and base structures — but the connections and insights were buried and hard to act on in real time.',
        approach: 'Built a generative-AI platform (Condor AI) that combines network/territory analysis with LLM-powered reasoning. The system structures relational data and uses generative models to surface patterns, summarize structure, and turn raw connections into actionable strategic insight through an operational interface.',
        impact: [
            'Turned complex relational data into clear, decision-ready insights',
            'Centralized tracking of territory, key leaders, and base structure in one platform',
            'Deployed and accessible in production at pipe-ia.com'
        ],
        tech: ['Generative AI', 'LLMs', 'Network Analysis', 'Python', 'Data Analytics'],
        links: [{ url: 'https://github.com/LizcanoJuan1010/Plataforma-Multiagente-Brand24-', type: 'repo' }]
    },
    fiscal: {
        status: 'In Production',
        title: 'Generative AI for Fiscal Control',
        problem: 'Fiscal oversight meant manually reviewing huge volumes of financial and regulatory data — slow, inconsistent, and easy to miss anomalies that matter for transparency and accountability.',
        approach: 'Applied generative-AI models to automate the analysis of financial and regulatory data. The system flags anomalies, extracts the relevant signals with NLP, and generates structured reports, supporting transparent, data-driven fiscal decision-making.',
        impact: [
            'Automated analysis of large volumes of financial/regulatory data',
            'Surfaced anomalies that support transparent fiscal control',
            'Generated structured reports to speed up oversight workflows'
        ],
        tech: ['Generative AI', 'LLMs', 'NLP', 'Fiscal Control', 'Python']
    },
    eaoa: {
        status: 'In Development',
        title: 'EAOA: Autonomous Operations Ecosystem',
        problem: 'Enterprises waste time on repetitive, multi-step processes that normally need constant human supervision and don\'t scale.',
        approach: 'Designing a multi-agent system that orchestrates specialized AI agents with persistent memory, function calling, and agentic workflows (LangChain, LangGraph, Llama 3, Claude API) to solve complex business problems autonomously, with minimal human intervention.',
        impact: [
            'Targets end-to-end automation of complex business processes',
            'Agents coordinate with shared memory and tool/function calling',
            'Designed to operate without constant human supervision'
        ],
        tech: ['LangChain', 'LangGraph', 'Llama 3', 'Claude API', 'Agentic AI', 'Function Calling'],
        links: [{ url: 'https://github.com/LizcanoJuan1010/EAOA', type: 'repo' }]
    },
    tequendama: {
        status: 'Hackathon',
        title: 'Tequendama: AI Insurance Platform',
        problem: 'Buying insurance in LATAM still means forms, calls and a human agent. The Colsubsidio 30X hackathon challenge: take a customer from "I don\'t know which insurance I need" to "I\'m covered" — end to end, with no human in the loop.',
        approach: 'Built Tequendama, a conversational assistant that works over web chat, live voice and WhatsApp, plus outbound phone calls. It profiles the customer, quotes with real FX rates for 12 LATAM countries, collects payment (Polar), verifies identity (KYC with Didit), captures an e-signature and issues the policy PDF. A FastAPI "brain" (DeepSeek + tools) sits next to a NestJS/Prisma domain backend on PostgreSQL and Redis; voice runs on Deepgram Voice Agent and ElevenLabs; managers get a KPI dashboard with alerts, AI campaigns and email reports.',
        impact: [
            'Full self-service insurance journey: profiling → quote → KYC → payment → policy issuance',
            'Omnichannel: web chat, live voice, WhatsApp and outbound phone calls on one AI core',
            'Delivered as a containerized monorepo (Docker / Railway) with a public demo video'
        ],
        tech: ['FastAPI', 'NestJS', 'React 19', 'PostgreSQL', 'Redis', 'Deepgram', 'ElevenLabs', 'LLM Agents', 'Docker'],
        links: [
            { url: 'https://tequendama.saltoangel.co/', type: 'site' },
            { url: 'https://github.com/LizcanoJuan1010/AI_Seguros', type: 'repo' },
            { url: 'https://www.youtube.com/watch?v=3NxcX0nJfu4', type: 'video' }
        ]
    },
    pulso: {
        status: 'Hackathon',
        title: 'PULSO: AI Emergency Routing',
        problem: 'In a critical emergency (heart attack, stroke, major trauma) assigning the right hospital bed in Colombia still takes ~45 minutes of phone calls, and ambulances bounce from hospital to hospital — the "paseo de la muerte" — because nobody knows in real time who has the bed and the specialist. Manual capacity reporting fails by design: the official daily occupancy dataset has a single live date.',
        approach: 'Built at Platanus Hack 26 (Bogotá, Emergencies track, team of 4). PULSO turns the paramedic\'s voice dictation into a structured clinical case with Claude (probable ICD-10 diagnosis, triage level, mandatory services), filters Bogotá\'s emergency providers from the official REPS registry with a hard services filter, and scores them in minutes — ETA with live traffic plus the expected cost of a rejection and inferred congestion — before a one-tap handshake with the receiving hospital over Telegram, WhatsApp or the web console. Every rejection becomes the prior of the next decision, so the network trains itself. I owned the field PWA (/campo: dictation → case → ranking → dispatch → navigation, with the golden-hour timer), the map and shared components, and also shipped the login/session flow, WhatsApp webhook de-duplication, the service token for the voice service, the FHIR R4 clinical-summary (RDA) builder and the admin catalogs. Stack: Next.js, NestJS, FastAPI, PostgreSQL + PostGIS, Mapbox, Claude API, Twilio/WhatsApp.',
        impact: [
            'From voice dictation to a confirmed receiving hospital in under 90 seconds — the target the whole product is built around',
            'Routing by real travel time and enabled services (84 verified emergency providers in Bogotá), not by distance alone',
            'Zero-friction adoption: hospitals only press Accept / Reject on the channel they already use; every answer is a labeled observation',
            'Live demo deployed on Render; open-source monorepo with the whole team\'s work'
        ],
        tech: ['Next.js', 'NestJS', 'FastAPI', 'PostgreSQL', 'PostGIS', 'Mapbox', 'Claude API', 'FHIR R4', 'WhatsApp / Twilio', 'Docker'],
        links: [
            { url: 'https://pulso-frontend.onrender.com/', type: 'site' },
            { url: 'https://github.com/platanus-hack/platanus-hack-26-co-team-6', type: 'repo' }
        ]
    },
    voice: {
        status: 'Demo',
        title: 'AI Voice Agent for Collections',
        problem: 'Pre-charge-off credit-card collections depend on large call centers following strict compliance scripts (FDCPA). A voice agent has to hold a natural real-time conversation, stay compliant and keep a record of every call.',
        approach: 'Built a live outbound voice agent demo: Deepgram Voice Agent handles speech-to-text (nova-3) and text-to-speech, an OpenAI-compatible LLM (DeepSeek, with a gpt-4o-mini fallback) drives the conversation with an FDCPA-compliant persona, calls are persisted through Prisma, and a chat mode with server-sent events lets evaluators play the customer. React + Vite frontend, Node backend, deployable to Render.',
        impact: [
            'End-to-end voice pipeline: STT → LLM reasoning → TTS in real time from the browser',
            'Compliance-aware persona and script for a regulated collections scenario',
            'Dual mode (voice and chat) with call history and webhook handling'
        ],
        tech: ['Deepgram', 'LLMs', 'TypeScript', 'Node.js', 'React', 'Prisma', 'SSE', 'Voice AI'],
        links: [{ url: 'https://github.com/LizcanoJuan1010/demo-voice-agent', type: 'repo' }]
    },
    financial: {
        status: 'Active',
        title: 'Financial Analytics & Market Prediction',
        problem: 'Discretionary trading decisions are slow, emotional, and hard to back-test, and combining fundamentals with sentiment and price signals manually doesn\'t scale.',
        approach: 'Built a quantitative pipeline integrating fundamental and algorithmic methods: yfinance for data extraction, NLP for market sentiment, technical indicators (EMA), and CNN-LSTM models for price prediction — feeding automated trading logic with risk management (limit orders, stop-loss).',
        impact: [
            'Unified fundamentals, sentiment, and technicals into one automated pipeline',
            'CNN-LSTM models for price prediction with back-testable signals',
            'Risk management logic (stop-loss, limit orders) built into execution'
        ],
        tech: ['Python', 'CNN-LSTM', 'NLP', 'Pandas', 'Power BI', 'Time Series', 'yfinance'],
        links: [{ url: 'https://github.com/LizcanoJuan1010/TESLA-ANALYSIS', type: 'repo' }]
    },
    xai: {
        status: 'Thesis',
        title: 'Thesis: Interpretability of Transformer Models',
        problem: 'Large language models represent meaning in ways we can\'t read directly. Which internal circuits carry a concept, and what happens to the model\'s behaviour when they are damaged? Without that map, interpretability and trust stay superficial.',
        approach: 'B.S. thesis in Data Science (Pontificia Universidad Javeriana, 2026 — tutor: Jorge Andrés Alvarado Valencia): "Mapping conceptual circuits — analyzing representation in Transformer models through causal intervention simulating semantic aphasia". Using hooks and targeted ablations on GPT-2 Medium, I intervene on activations to simulate semantic-aphasia-like deficits and measure how conceptual representations degrade, mapping which components carry which concepts.',
        impact: [
            'Causal (not just correlational) evidence of where concepts live inside a Transformer',
            'Reusable intervention tooling: activation hooks, ablation experiments and analysis notebooks',
            'Bridges neuroscience (semantic aphasia) and mechanistic interpretability of LLMs'
        ],
        tech: ['Mechanistic Interpretability', 'GPT-2 Medium', 'PyTorch', 'Causal Intervention', 'Ablation', 'XAI', 'Python'],
        links: [
            { url: 'https://github.com/LizcanoJuan1010/Experiment', type: 'repo' },
            { url: 'https://github.com/LizcanoJuan1010/Proyecto_de_grado_-analisis_ablacion_gpt2_medium', type: 'repo', label: { en: 'Preliminary ablation analysis (GitHub)', es: 'Análisis preliminar de ablación (GitHub)' } }
        ]
    },
    fomag: {
        status: 'Delivered',
        title: 'FOMAG Database Architecture',
        problem: 'A new national public-health platform for Colombia\'s teaching workforce needed a data foundation that could guarantee integrity and scale while supporting longitudinal health tracking.',
        approach: 'Designed a robust SQL schema and relational model with normalization, data governance, and ETL pipelines (Databricks) to ensure integrity, scalability, and reliable longitudinal tracking across the national education system.',
        impact: [
            'Delivered the relational data foundation for a national health platform',
            'Ensured data integrity and scalability for longitudinal tracking',
            'Established governance and ETL processes for clean analytical data'
        ],
        tech: ['SQL', 'Data Modeling', 'Databricks', 'Data Governance', 'ETL']
    },
    rag: {
        status: 'Active',
        title: 'RAG-Powered AI Assistants',
        problem: 'General LLMs hallucinate and lack grounding in specific, private knowledge — making them unreliable for answering domain-specific questions.',
        approach: 'Built multiple assistants using the Retrieval-Augmented Generation framework, grounding LLMs on curated knowledge bases (LlamaIndex, Gemini) to minimize hallucination, with deployments via Gradio and Hugging Face Spaces.',
        impact: [
            'Reduced hallucination by grounding answers in curated knowledge bases',
            'Delivered multiple deployed assistants, including a personal portfolio chatbot',
            'Reusable RAG pattern applied across different domains'
        ],
        tech: ['LlamaIndex', 'Gemini', 'Gradio', 'Hugging Face', 'RAG', 'NLP'],
        links: [{ url: 'https://github.com/LizcanoJuan1010/Corrective-RAG-Server-in-Flask', type: 'repo' }]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('case-modal');
    if (!modal) return;

    const elStatus = document.getElementById('case-modal-status');
    const elTitle = document.getElementById('case-modal-title');
    const elProblem = document.getElementById('case-problem');
    const elApproach = document.getElementById('case-approach');
    const elImpact = document.getElementById('case-impact');
    const elTags = document.getElementById('case-tags');
    const elLinks = document.getElementById('case-links');

    let lastFocused = null;
    let currentKey = null;

    // Merge the English base with the Spanish overrides when ES is active.
    function localized(key) {
        const en = CASE_STUDIES[key];
        if (!en) return null;
        const lang = window.I18N ? window.I18N.lang : 'en';
        const es = lang === 'es' && window.I18N.dyn.cases.es[key];
        return es ? Object.assign({}, en, es) : en;
    }

    function fillCase(data) {
        if (!data) return;
        elStatus.textContent = data.status || '';
        elTitle.textContent = data.title;
        elProblem.textContent = data.problem;
        elApproach.textContent = data.approach;

        elImpact.innerHTML = '';
        (data.impact || []).forEach((point) => {
            const li = document.createElement('li');
            li.textContent = point;
            elImpact.appendChild(li);
        });

        elTags.innerHTML = '';
        (data.tech || []).forEach((tag) => {
            const span = document.createElement('span');
            span.className = 'project-tag';
            span.textContent = tag;
            elTags.appendChild(span);
        });

        // External links (repo / live site), localized on the fly.
        if (elLinks) {
            elLinks.innerHTML = '';
            const t = window.I18N ? window.I18N.t.bind(window.I18N) : (en) => en;
            (data.links || []).forEach((l) => {
                const a = document.createElement('a');
                a.className = 'case-modal-link';
                a.href = l.url;
                a.target = '_blank';
                a.rel = 'noopener';
                if (l.label) {
                    a.textContent = window.I18N ? window.I18N.pick(l.label) : l.label.en;
                } else if (l.type === 'site') {
                    a.textContent = t('Visit live site', 'Ver sitio en vivo');
                } else if (l.type === 'video') {
                    a.textContent = t('Watch demo video', 'Ver video demo');
                } else {
                    a.textContent = t('View repository on GitHub', 'Ver repositorio en GitHub');
                }
                elLinks.appendChild(a);
            });
        }
    }

    function openCase(key) {
        const data = localized(key);
        if (!data) return;
        currentKey = key;
        fillCase(data);

        lastFocused = document.activeElement;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        modal.querySelector('.case-modal-close').focus();
    }

    function closeCase() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        currentKey = null;
        if (lastFocused) lastFocused.focus();
    }

    // Re-render an open modal in the newly selected language.
    if (window.I18N) {
        window.I18N.onChange(() => {
            if (currentKey && modal.classList.contains('open')) fillCase(localized(currentKey));
        });
    }

    // Open on card click (ignore clicks on real links inside the card)
    document.querySelectorAll('.project-card[data-project]').forEach((card) => {
        card.classList.add('clickable');
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');

        card.addEventListener('click', (e) => {
            if (e.target.closest('a')) return; // let any real link inside the card work normally
            openCase(card.dataset.project);
        });
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openCase(card.dataset.project);
            }
        });
    });

    // Close handlers
    modal.querySelectorAll('[data-close]').forEach((el) =>
        el.addEventListener('click', closeCase)
    );
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeCase();
    });
});
