/* ============================================
   Vision Lab — config (no backend, runs in the browser)
   Tunables for the on-device MediaPipe FaceLandmarker demo.
   Edit values here without touching the logic in js/vision.js.
   ============================================ */

window.VISION_CONFIG = {
    // MediaPipe Tasks Vision — pinned version (ESM bundle + matching WASM runtime).
    VERSION: '0.10.35',
    CDN_BASE: 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35',

    // Pre-trained face model (~3.7 MB, fetched lazily on first activation).
    // Self-host this file in the repo if you want zero third-party dependency.
    MODEL_URL: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',

    // 'GPU' (WebGL) is far faster; we fall back to 'CPU' automatically if it fails.
    DELEGATE: 'GPU',

    // Capture resolution requested from the webcam.
    VIDEO_WIDTH: 640,
    VIDEO_HEIGHT: 480,

    // Fake "AI booting" console lines shown over the camera while loading.
    BOOT_LINES: [
        '> initializing vision runtime…',
        '> loading WASM backend',
        '> fetching face_landmarker.task (3.7MB)',
        '> warming up GPU delegate',
        '> calibrating 478 landmarks',
        '> stream ready ✓'
    ],

    // Which blendshapes get a live bar (kept short so it stays readable).
    // mode 'avg' averages the listed keys; default takes the max.
    DISPLAY_BARS: [
        { label: 'Smile',      keys: ['mouthSmileLeft', 'mouthSmileRight'], mode: 'avg' },
        { label: 'Jaw open',   keys: ['jawOpen'] },
        { label: 'Brow up',    keys: ['browInnerUp'] },
        { label: 'Eye wide',   keys: ['eyeWideLeft', 'eyeWideRight'], mode: 'avg' },
        { label: 'Blink L',    keys: ['eyeBlinkLeft'] },
        { label: 'Blink R',    keys: ['eyeBlinkRight'] },
        { label: 'Cheek puff', keys: ['cheekPuff'] },
        { label: 'Pucker',     keys: ['mouthPucker'] }
    ],

    // Derived "dominant expression" readout.
    // Each expression scores a weighted sum of facial action units (built from
    // blendshapes); the strongest above `minScore` wins, else Neutral.
    // Bump a weight to make that emotion trigger more easily.
    EXPR: {
        minScore: 0.25,
        wink: { diff: 0.50, min: 0.55 },
        scores: {
            Happy:     { smile: 1.0 },
            Surprised: { browInnerUp: 0.5, eyeWide: 0.2, jawOpen: 0.3 },
            Angry:     { browDown: 0.6, noseSneer: 0.2, mouthPress: 0.1, eyeSquint: 0.1 },
            Sad:       { frown: 0.7, browInnerUp: 0.25, mouthShrugLower: 0.2 }
        },
        // Inline SVG face icons (stroke follows the accent color via currentColor).
        icons: {
            Happy:     '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
            Surprised: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="15.5" r="1.5"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
            Angry:     '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M16 16.5s-1.5-2-4-2-4 2-4 2"/><line x1="7.5" y1="8" x2="10" y2="9"/><line x1="16.5" y1="8" x2="14" y2="9"/></svg>',
            Sad:       '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M16 16.5s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
            Wink:      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="8" y1="9" x2="10" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
            Neutral:   '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="15" x2="16" y2="15"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>'
        }
    }
};
