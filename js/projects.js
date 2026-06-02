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
        approach: 'As Computer Vision Lead, I designed and built a full-stack video intelligence system that ingests multiple live streams and runs a hybrid model ensemble (YOLO, D-FINE, ReDetv2, PaddlePaddle) for detection and tracking. Pipelines run on Linux with NVIDIA DeepStream 8.0 and GStreamer, with CUDA-accelerated inference and Docker-based deployment.',
        impact: [
            'Automated detection and metadata generation across [confirm] simultaneous camera streams in production',
            'Reduced manual monitoring effort and latency between event and alert',
            'Hybrid ensemble improved detection robustness across varied scenes and lighting'
        ],
        tech: ['NVIDIA DeepStream', 'YOLO', 'D-FINE', 'ReDetv2', 'PaddlePaddle', 'Python', 'C++', 'CUDA', 'GStreamer', 'Docker']
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
        link: 'https://pipe-ia.com/login'
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
        tech: ['LangChain', 'LangGraph', 'Llama 3', 'Claude API', 'Agentic AI', 'Function Calling']
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
        tech: ['Python', 'CNN-LSTM', 'NLP', 'Pandas', 'Power BI', 'Time Series', 'yfinance']
    },
    xai: {
        status: 'Thesis',
        title: 'Explainable AI (XAI) — Thesis',
        problem: 'Reinforcement Learning agents behave like black boxes — it\'s hard to trust or debug decisions when you can\'t see why the network acts the way it does.',
        approach: 'Researching Explainable AI for RL using model distillation to approximate and interpret the policy, and analyzing neural activation patterns to understand the network\'s internal behavior and improve interpretability and trustworthiness.',
        impact: [
            'Develops techniques to interpret RL agents\' internal decision-making',
            'Uses model distillation to make complex policies explainable',
            'Aims to increase trust and debuggability of deep RL systems'
        ],
        tech: ['XAI', 'Reinforcement Learning', 'Deep Learning', 'Model Distillation', 'Python']
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
        tech: ['LlamaIndex', 'Gemini', 'Gradio', 'Hugging Face', 'RAG', 'NLP']
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
    const elLink = document.getElementById('case-link');

    let lastFocused = null;

    function openCase(key) {
        const data = CASE_STUDIES[key];
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

        if (data.link) {
            elLink.href = data.link;
            elLink.hidden = false;
        } else {
            elLink.hidden = true;
        }

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
        if (lastFocused) lastFocused.focus();
    }

    // Open on card click (ignore clicks on real links inside the card)
    document.querySelectorAll('.project-card[data-project]').forEach((card) => {
        card.classList.add('clickable');
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');

        card.addEventListener('click', (e) => {
            if (e.target.closest('a')) return; // let "Visit Platform" work normally
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
