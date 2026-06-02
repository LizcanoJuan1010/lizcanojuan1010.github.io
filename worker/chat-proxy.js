/* ============================================
   Cloudflare Worker — Gemini chat proxy
   --------------------------------------------
   Keeps the Gemini API key SECRET (it never reaches the browser).
   The portfolio's frontend calls this Worker; the Worker adds the
   key and forwards the request to the Gemini API.

   DEPLOY (free):
   1) Create a free account at https://dash.cloudflare.com
   2) Workers & Pages → Create → Worker → name it (e.g. juan-chat) → Deploy.
   3) Edit code → paste THIS file → Deploy.
   4) Settings → Variables and Secrets → Add → type "Secret":
        Name:  GEMINI_API_KEY
        Value: <your Gemini API key>      (this stays private)
   5) Copy the Worker URL (https://juan-chat.<you>.workers.dev)
      and paste it into js/chat-config.js → CHAT_PROXY_URL.
   ============================================ */

const ALLOWED_ORIGINS = [
    "https://lizcanojuan1010.github.io",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
];

export default {
    async fetch(request, env) {
        const origin = request.headers.get("Origin") || "";
        const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : "";

        // CORS preflight
        if (request.method === "OPTIONS") {
            return new Response(null, { headers: cors(allowOrigin) });
        }
        if (request.method !== "POST") {
            return json({ error: "Method not allowed" }, 405, allowOrigin);
        }
        // Only allow calls coming from the portfolio
        if (!allowOrigin) {
            return json({ error: "Origin not allowed" }, 403, "");
        }
        if (!env.GEMINI_API_KEY) {
            return json({ error: "Server missing GEMINI_API_KEY secret" }, 500, allowOrigin);
        }

        let body;
        try {
            body = await request.json();
        } catch {
            return json({ error: "Invalid JSON" }, 400, allowOrigin);
        }

        // Sanitize model name; default to the cheapest model
        const model = String(body.model || "gemini-2.5-flash-lite").replace(/[^a-zA-Z0-9.\-]/g, "");

        const url =
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent` +
            `?key=${env.GEMINI_API_KEY}`;

        const upstream = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                systemInstruction: body.systemInstruction,
                contents: body.contents,
                generationConfig: body.generationConfig || {
                    temperature: 0.6,
                    maxOutputTokens: 600,
                },
            }),
        });

        const data = await upstream.text();
        return new Response(data, {
            status: upstream.status,
            headers: { "Content-Type": "application/json", ...cors(allowOrigin) },
        });
    },
};

function cors(origin) {
    return {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };
}

function json(obj, status, origin) {
    return new Response(JSON.stringify(obj), {
        status,
        headers: { "Content-Type": "application/json", ...cors(origin) },
    });
}
