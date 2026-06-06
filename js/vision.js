/* ============================================
   Vision Lab — on-device facial analysis (no backend)
   MediaPipe FaceLandmarker: 478 landmarks + 52 blendshapes + head pose.
   The model + WASM runtime load lazily from a CDN only when the user
   activates the camera, so the page stays fast. Video never leaves the tab.
   ============================================ */

const CFG = window.VISION_CONFIG;

// --- Elements ---
const el = (id) => document.getElementById(id);
const statusDot = el('vision-status-dot');
const statusText = el('vision-status-text');
const stage = el('vision-stage');
const video = el('vision-video');
const canvas = el('vision-canvas');
const fpsChip = el('vision-fps');
const stopBtn = el('vision-stop');
const overlay = el('vision-overlay');
const boot = el('vision-boot');
const toggleBtn = el('vision-toggle');
const barsHost = el('vision-bars');
const dominantEl = el('vision-dominant');
const headEl = el('vision-head');
const facesEl = el('vision-faces');

// Bail out gracefully if markup/config is missing.
if (CFG && stage && video && canvas && toggleBtn) {
    init();
}

function init() {
    const ctx = canvas.getContext('2d');

    // Module-level state
    let FaceLandmarkerCls = null;   // class ref after dynamic import
    let DrawingUtilsCls = null;
    let landmarker = null;          // model instance (created once)
    let drawer = null;              // DrawingUtils bound to ctx
    let stream = null;              // MediaStream (so we can stop tracks)
    let raf = 0;
    let running = false;
    let lastVideoTime = -1;

    // FPS smoothing
    let lastFrame = performance.now();
    let fps = 0;

    // --- Localized vision strings (falls back to English) ---
    const VFALLBACK = {
        idle: 'Idle', loading: 'Loading…', requesting: 'Requesting camera…', live: 'Live', stopped: 'Stopped',
        errPerm: 'Camera permission denied.', errNoCam: 'No camera found on this device.',
        errGpu: 'GPU unavailable — try another browser.', errGeneric: 'Could not start the camera.',
        retry: 'tap "Activate Camera" to retry', head: 'Head', faces: 'Faces',
        boot: CFG.BOOT_LINES || [], expr: {}, bars: {}
    };
    function V() {
        return (window.I18N && window.I18N.dyn.vision[window.I18N.lang]) || VFALLBACK;
    }

    // --- Status pill (key indexes the localized strings) ---
    let statusState = 'offline';
    let statusKey = 'idle';
    function setStatus(state, key) {
        statusState = state;
        statusKey = key;
        statusDot.classList.remove('online', 'offline');
        if (state) statusDot.classList.add(state);
        statusText.textContent = V()[key] || key;
    }
    setStatus('offline', 'idle');

    // --- Build the blendshape bars once ---
    const barRefs = [];
    function buildBars() {
        barsHost.innerHTML = '';
        barRefs.length = 0;
        const labels = V().bars;
        CFG.DISPLAY_BARS.forEach((spec) => {
            const row = document.createElement('div');
            row.className = 'vision-bar';
            row.innerHTML =
                `<span class="vision-bar-label">${labels[spec.label] || spec.label}</span>` +
                `<span class="vision-bar-track"><span class="vision-bar-fill"></span></span>` +
                `<span class="vision-bar-val">0%</span>`;
            barsHost.appendChild(row);
            barRefs.push({
                spec,
                labelEl: row.querySelector('.vision-bar-label'),
                fill: row.querySelector('.vision-bar-fill'),
                val: row.querySelector('.vision-bar-val')
            });
        });
    }

    // Re-label existing bars without rebuilding (used on language change).
    function relabelBars() {
        const labels = V().bars;
        barRefs.forEach((ref) => {
            ref.labelEl.textContent = labels[ref.spec.label] || ref.spec.label;
        });
    }

    // --- Boot sequence typing ---
    let bootTimer = 0;
    function playBoot() {
        boot.textContent = '';
        const lines = V().boot || [];
        let i = 0;
        clearInterval(bootTimer);
        bootTimer = setInterval(() => {
            if (i >= lines.length) { clearInterval(bootTimer); return; }
            boot.textContent += lines[i] + '\n';
            i++;
        }, 320);
    }

    // --- Lazy load + start ---
    async function start() {
        if (running) return;
        overlay.classList.add('loading');
        toggleBtn.disabled = true;
        playBoot();
        setStatus(null, 'loading');

        try {
            // 1) Load MediaPipe (ESM) + model once.
            if (!landmarker) {
                const vision = await import(`${CFG.CDN_BASE}/vision_bundle.mjs`);
                FaceLandmarkerCls = vision.FaceLandmarker;
                DrawingUtilsCls = vision.DrawingUtils;
                const fileset = await vision.FilesetResolver.forVisionTasks(`${CFG.CDN_BASE}/wasm`);
                landmarker = await FaceLandmarkerCls.createFromOptions(fileset, {
                    baseOptions: { modelAssetPath: CFG.MODEL_URL, delegate: CFG.DELEGATE },
                    runningMode: 'VIDEO',
                    numFaces: 1,
                    outputFaceBlendshapes: true,
                    outputFacialTransformationMatrixes: true
                });
                drawer = new DrawingUtilsCls(ctx);
                buildBars();
            }

            // 2) Camera.
            setStatus(null, 'requesting');
            stream = await navigator.mediaDevices.getUserMedia({
                video: { width: CFG.VIDEO_WIDTH, height: CFG.VIDEO_HEIGHT, facingMode: 'user' },
                audio: false
            });
            video.srcObject = stream;
            await video.play();

            // Match canvas buffer to the real frame size, and lock the stage to
            // the camera's true aspect ratio so the overlay aligns exactly
            // (a <canvas> ignores object-fit, so we avoid any cover-crop mismatch).
            canvas.width = video.videoWidth || CFG.VIDEO_WIDTH;
            canvas.height = video.videoHeight || CFG.VIDEO_HEIGHT;
            if (video.videoWidth && video.videoHeight) {
                stage.style.aspectRatio = `${video.videoWidth} / ${video.videoHeight}`;
            }

            running = true;
            stage.classList.add('live');
            overlay.classList.remove('loading');
            toggleBtn.disabled = false;
            setStatus('online', 'live');
            lastFrame = performance.now();
            loop();
        } catch (err) {
            console.error('[vision] start failed:', err);
            clearInterval(bootTimer);
            overlay.classList.remove('loading');
            toggleBtn.disabled = false;
            handleError(err);
        }
    }

    function handleError(err) {
        let key = 'errGeneric';
        if (err && err.name === 'NotAllowedError') key = 'errPerm';
        else if (err && err.name === 'NotFoundError') key = 'errNoCam';
        else if (err && /WebGL|GPU/i.test(String(err))) key = 'errGpu';
        setStatus('offline', key);
        boot.textContent = '! ' + (V()[key] || key) + '\n> ' + (V().retry || '');
    }

    // --- Stop & release ---
    function stop() {
        running = false;
        cancelAnimationFrame(raf);
        if (stream) {
            stream.getTracks().forEach((t) => t.stop());
            stream = null;
        }
        video.srcObject = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stage.classList.remove('live');
        setStatus('offline', 'stopped');
        boot.textContent = '';
    }

    // --- Per-frame loop ---
    function loop() {
        if (!running) return;
        if (video.currentTime !== lastVideoTime && video.readyState >= 2) {
            lastVideoTime = video.currentTime;
            const result = landmarker.detectForVideo(video, performance.now());
            render(result);
        }
        // FPS (exponential smoothing)
        const now = performance.now();
        const inst = 1000 / Math.max(1, now - lastFrame);
        lastFrame = now;
        fps = fps ? fps * 0.85 + inst * 0.15 : inst;
        fpsChip.textContent = `${Math.round(fps)} FPS`;

        raf = requestAnimationFrame(loop);
    }

    // --- Draw mesh + update telemetry ---
    function render(result) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const faces = result.faceLandmarks || [];
        facesEl.innerHTML = `${V().faces}&nbsp;${faces.length}`;

        if (faces.length) {
            drawMesh(faces[0]);
        }

        const shapes = result.faceBlendshapes && result.faceBlendshapes[0];
        if (shapes) {
            const map = {};
            shapes.categories.forEach((c) => { map[c.categoryName] = c.score; });
            updateBars(map);
            updateDominant(map);
        }

        const mtx = result.facialTransformationMatrixes && result.facialTransformationMatrixes[0];
        if (mtx) {
            const p = headPose(mtx.data);
            headEl.innerHTML =
                `${V().head}&nbsp;yaw&nbsp;${fmt(p.yaw)}&deg; pitch&nbsp;${fmt(p.pitch)}&deg; roll&nbsp;${fmt(p.roll)}&deg;`;
        }
    }

    const C = {
        tess: 'rgba(99, 102, 241, 0.22)',
        line: 'rgba(129, 140, 248, 0.9)',
        iris: 'rgba(56, 200, 120, 0.95)',
        oval: 'rgba(79, 70, 229, 0.85)'
    };

    function drawMesh(landmarks) {
        const F = FaceLandmarkerCls;
        // Fine triangular mesh (faint), then the salient features brighter.
        drawer.drawConnectors(landmarks, F.FACE_LANDMARKS_TESSELATION, { color: C.tess, lineWidth: 0.6 });
        drawer.drawConnectors(landmarks, F.FACE_LANDMARKS_FACE_OVAL, { color: C.oval, lineWidth: 1.6 });
        drawer.drawConnectors(landmarks, F.FACE_LANDMARKS_LIPS, { color: C.line, lineWidth: 1.4 });
        drawer.drawConnectors(landmarks, F.FACE_LANDMARKS_LEFT_EYE, { color: C.line, lineWidth: 1.2 });
        drawer.drawConnectors(landmarks, F.FACE_LANDMARKS_RIGHT_EYE, { color: C.line, lineWidth: 1.2 });
        drawer.drawConnectors(landmarks, F.FACE_LANDMARKS_LEFT_EYEBROW, { color: C.line, lineWidth: 1.2 });
        drawer.drawConnectors(landmarks, F.FACE_LANDMARKS_RIGHT_EYEBROW, { color: C.line, lineWidth: 1.2 });
        drawer.drawConnectors(landmarks, F.FACE_LANDMARKS_LEFT_IRIS, { color: C.iris, lineWidth: 1.6 });
        drawer.drawConnectors(landmarks, F.FACE_LANDMARKS_RIGHT_IRIS, { color: C.iris, lineWidth: 1.6 });
    }

    // --- Blendshape bars ---
    function pick(map, spec) {
        const vals = spec.keys.map((k) => map[k] || 0);
        if (spec.mode === 'avg') return vals.reduce((a, b) => a + b, 0) / vals.length;
        return Math.max(...vals);
    }
    function updateBars(map) {
        barRefs.forEach((ref) => {
            const v = pick(map, ref.spec);
            const pct = Math.round(v * 100);
            ref.fill.style.width = pct + '%';
            ref.val.textContent = pct + '%';
        });
    }

    // --- Derived dominant expression (weighted action-unit scoring) ---
    function updateDominant(map) {
        const g = (k) => map[k] || 0;
        const t = CFG.EXPR;
        const setDom = (emoji, label) => {
            dominantEl.innerHTML = `<span class="vision-emoji">${emoji}</span> ${label}`;
        };

        // Asymmetric blink is an unambiguous signal — handle it first.
        const blinkL = g('eyeBlinkLeft');
        const blinkR = g('eyeBlinkRight');
        if (Math.abs(blinkL - blinkR) > t.wink.diff && Math.max(blinkL, blinkR) > t.wink.min) {
            return setDom(t.emoji.Wink, 'Wink');
        }

        // Build the action-unit signals referenced by EXPR.scores.
        const sig = {
            smile:           (g('mouthSmileLeft') + g('mouthSmileRight')) / 2,
            jawOpen:         g('jawOpen'),
            browInnerUp:     g('browInnerUp'),
            browDown:        (g('browDownLeft') + g('browDownRight')) / 2,
            frown:           (g('mouthFrownLeft') + g('mouthFrownRight')) / 2,
            eyeWide:         (g('eyeWideLeft') + g('eyeWideRight')) / 2,
            noseSneer:       (g('noseSneerLeft') + g('noseSneerRight')) / 2,
            mouthPress:      (g('mouthPressLeft') + g('mouthPressRight')) / 2,
            mouthShrugLower: g('mouthShrugLower'),
            eyeSquint:       (g('eyeSquintLeft') + g('eyeSquintRight')) / 2
        };

        // Score each expression as a weighted sum; strongest above minScore wins.
        let best = 'Neutral', bestScore = t.minScore;
        for (const name in t.scores) {
            const weights = t.scores[name];
            let s = 0;
            for (const k in weights) s += (sig[k] || 0) * weights[k];
            if (s > bestScore) { bestScore = s; best = name; }
        }

        setDom(t.emoji[best] || '😐', (V().expr && V().expr[best]) || best);
    }

    // --- Head pose: approximate Euler angles from the 4x4 (column-major) ---
    function headPose(m) {
        // element (row r, col c) = m[c*4 + r]
        const r02 = m[8], r12 = m[9], r22 = m[10], r10 = m[1], r11 = m[5];
        const deg = 180 / Math.PI;
        return {
            yaw: Math.atan2(r02, r22) * deg,
            pitch: Math.atan2(-r12, Math.hypot(r02, r22)) * deg,
            roll: Math.atan2(r10, r11) * deg
        };
    }
    const fmt = (n) => (n >= 0 ? '+' : '') + n.toFixed(0);

    // --- Wiring ---
    toggleBtn.addEventListener('click', start);
    stopBtn.addEventListener('click', stop);

    // Re-localize live UI when the language toggles (status text + bar labels).
    // Idle dominant/head/faces text is handled by data-i18n in index.html.
    if (window.I18N) {
        window.I18N.onChange(() => {
            setStatus(statusState, statusKey);
            if (barRefs.length) relabelBars();
        });
    }

    // Pause inference when the tab is hidden; resume if it was live.
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && running) {
            cancelAnimationFrame(raf);
        } else if (!document.hidden && running) {
            lastFrame = performance.now();
            loop();
        }
    });

    // Release the camera if the user leaves the page.
    window.addEventListener('pagehide', () => { if (running) stop(); });
}
