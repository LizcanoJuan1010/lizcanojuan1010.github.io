/* ============================================
   Chat — Gemini-powered assistant (no backend)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('chat-form');
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const messages = document.getElementById('chat-messages');
    const promptsBar = document.getElementById('chat-prompts');
    const statusDot = document.getElementById('chat-status-dot');
    const statusText = document.getElementById('chat-status-text');

    if (!form || !messages || typeof CHAT_CONFIG === 'undefined') return;

    // Conversation history sent to the API (excludes the system prompt).
    const history = [];

    const keyMissing =
        !CHAT_CONFIG.GEMINI_API_KEY ||
        CHAT_CONFIG.GEMINI_API_KEY === 'PASTE_YOUR_GEMINI_API_KEY_HERE';

    // --- Status indicator ---
    function setStatus(state, text) {
        statusDot.classList.remove('online', 'offline');
        if (state) statusDot.classList.add(state);
        statusText.textContent = text;
    }
    setStatus(keyMissing ? 'offline' : 'online', keyMissing ? 'Offline' : 'Online');

    // --- Render a message bubble ---
    function addMessage(text, sender) {
        const wrap = document.createElement('div');
        wrap.className = `chat-msg ${sender}`;
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.textContent = text;
        wrap.appendChild(bubble);
        messages.appendChild(wrap);
        messages.scrollTop = messages.scrollHeight;
        return bubble;
    }

    // --- Typing indicator ---
    function addTyping() {
        const wrap = document.createElement('div');
        wrap.className = 'chat-msg bot';
        wrap.innerHTML =
            '<div class="chat-bubble typing"><span></span><span></span><span></span></div>';
        messages.appendChild(wrap);
        messages.scrollTop = messages.scrollHeight;
        return wrap;
    }

    function setLoading(loading) {
        input.disabled = loading;
        sendBtn.disabled = loading;
    }

    // --- Call Gemini REST API directly from the browser ---
    async function askGemini(userText) {
        const url =
            `https://generativelanguage.googleapis.com/v1beta/models/` +
            `${CHAT_CONFIG.MODEL}:generateContent?key=${CHAT_CONFIG.GEMINI_API_KEY}`;

        history.push({ role: 'user', parts: [{ text: userText }] });

        const body = {
            systemInstruction: { parts: [{ text: CHAT_CONFIG.SYSTEM_PROMPT }] },
            contents: history,
            generationConfig: { temperature: 0.6, maxOutputTokens: 600 }
        };

        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            const err = await res.text();
            throw new Error(`HTTP ${res.status}: ${err}`);
        }

        const data = await res.json();
        const reply =
            data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
            "Sorry, I couldn't generate a response. Try rephrasing your question.";

        history.push({ role: 'model', parts: [{ text: reply }] });
        return reply;
    }

    // --- Submit handler ---
    async function handleSend(text) {
        const userText = text.trim();
        if (!userText) return;

        addMessage(userText, 'user');
        input.value = '';

        if (keyMissing) {
            addMessage(
                "⚠️ The AI assistant isn't configured yet. Add a Gemini API key in js/chat-config.js. Meanwhile, feel free to reach Juan at juanjlb2005@gmail.com.",
                'bot'
            );
            return;
        }

        setLoading(true);
        const typing = addTyping();

        try {
            const reply = await askGemini(userText);
            typing.remove();
            addMessage(reply, 'bot');
            setStatus('online', 'Online');
        } catch (e) {
            console.error(e);
            typing.remove();
            addMessage(
                "Hmm, I had trouble reaching the AI service. Please try again in a moment, or email Juan at juanjlb2005@gmail.com.",
                'bot'
            );
            setStatus('offline', 'Error');
        } finally {
            setLoading(false);
            input.focus();
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSend(input.value);
    });

    // --- Suggested prompt chips become clickable ---
    if (promptsBar) {
        promptsBar.querySelectorAll('.chat-prompt-chip').forEach((chip) => {
            chip.style.cursor = 'pointer';
            chip.addEventListener('click', () => handleSend(chip.textContent));
        });
    }
});
