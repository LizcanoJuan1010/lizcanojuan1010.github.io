/* ============================================
   Portfolio - Juan Lizcano Barbosa
   main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- JS class toggle for reveal fallback ---
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js');

    // --- Particles.js ---
    const isMobile = window.innerWidth < 768;
    particlesJS("particles-js", {
        particles: {
            number: { value: isMobile ? 40 : 70, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.3, random: false },
            size: { value: 2, random: true },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.2, width: 1 },
            move: { enable: true, speed: 1.5, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: !isMobile, mode: "grab" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 0.6 } },
                push: { particles_nb: 3 }
            }
        },
        retina_detect: true
    });

    // --- Navbar Scroll Effect ---
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- Active Nav Link Highlighting ---
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' });

    sections.forEach(section => sectionObserver.observe(section));

    // --- Typing Animation with Rotation (language-aware) ---
    const subtitle = document.getElementById('subtitle');
    const fallbackTitles = [
        "Data Scientist & AI Engineer",
        "Data Engineer",
        "Machine Learning Developer",
        "Database Architect",
        "NLP & Computer Vision Specialist"
    ];
    function getTitles() {
        return (window.I18N && window.I18N.pick(window.I18N.dyn.titles)) || fallbackTitles;
    }
    let titles = getTitles();
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    // Restart the rotation in the new language when the user toggles ES/EN.
    if (window.I18N) {
        window.I18N.onChange(() => {
            titles = getTitles();
            titleIndex = 0;
            charIndex = 0;
            isDeleting = false;
        });
    }

    function typeEffect() {
        const currentTitle = titles[titleIndex];

        if (!isDeleting) {
            subtitle.innerHTML = currentTitle.slice(0, charIndex + 1) + '<span class="typing-cursor"></span>';
            charIndex++;
            if (charIndex === currentTitle.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000); // Pause before deleting
                return;
            }
            setTimeout(typeEffect, 80);
        } else {
            subtitle.innerHTML = currentTitle.slice(0, charIndex) + '<span class="typing-cursor"></span>';
            charIndex--;
            if (charIndex < 0) {
                isDeleting = false;
                charIndex = 0;
                titleIndex = (titleIndex + 1) % titles.length;
                setTimeout(typeEffect, 400); // Pause before next title
                return;
            }
            setTimeout(typeEffect, 40);
        }
    }
    typeEffect();

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Scroll "write-in" text effects ---
    // Section titles type out with a caret; prose writes itself in word by
    // word. Each element animates once, on first scroll into view. A language
    // switch mid-animation cancels everything in flight (i18n.js rewrites the
    // text wholesale, so we must not touch it afterwards).
    const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!REDUCED_MOTION) {
        let epoch = 0;                 // bumped on language change
        const pending = new Set();     // cancel handles for in-flight animations

        window.addEventListener('i18n:change', () => {
            epoch++;
            pending.forEach((cancel) => cancel());
            pending.clear();
        });

        // h2: real typewriter with a blinking gold caret (~0.6s per title).
        function typeHeading(el) {
            el.classList.add('write-host');
            const full = el.textContent;
            const txt = document.createTextNode('');
            const caret = document.createElement('span');
            caret.className = 'type-caret';
            el.textContent = '';
            el.append(txt, caret);

            const step = Math.max(18, Math.min(60, 700 / full.length));
            let i = 0;
            const timer = setInterval(() => {
                i++;
                txt.nodeValue = full.slice(0, i);
                if (i >= full.length) {
                    clearInterval(timer);
                    setTimeout(() => {
                        pending.delete(cancel);
                        if (caret.parentNode) caret.remove();
                    }, 900);
                }
            }, step);
            const cancel = () => {
                clearInterval(timer);
                if (caret.parentNode) caret.remove();
            };
            pending.add(cancel);
        }

        // Prose: wrap each word in a span with a staggered blur-in, capped so
        // a whole block finishes in ~0.9s. Whitespace stays as text nodes so
        // wrapping and copy/paste behave. Once every word has landed the
        // element is flattened back to its original markup.
        function writeWords(el) {
            el.classList.add('write-host');
            const original = el.innerHTML;
            const startEpoch = epoch;

            const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
            const textNodes = [];
            while (walker.nextNode()) textNodes.push(walker.currentNode);

            const words = [];
            textNodes.forEach((node) => {
                if (!node.nodeValue.trim()) return;
                const frag = document.createDocumentFragment();
                node.nodeValue.split(/(\s+)/).forEach((part) => {
                    if (!part) return;
                    if (/^\s+$/.test(part)) {
                        frag.appendChild(document.createTextNode(part));
                        return;
                    }
                    const w = document.createElement('span');
                    w.className = 'write-word';
                    w.textContent = part;
                    frag.appendChild(w);
                    words.push(w);
                });
                node.parentNode.replaceChild(frag, node);
            });

            // Subtitles wait a beat so their section title leads the dance.
            const base = el.classList.contains('section-subtitle') ? 300 : 0;
            const step = Math.min(45, 900 / Math.max(words.length, 1));
            words.forEach((w, i) => {
                w.style.animationDelay = (base + i * step) + 'ms';
            });

            const total = base + words.length * step + 600;
            const restore = setTimeout(() => {
                pending.delete(cancel);
                if (epoch === startEpoch) el.innerHTML = original;
            }, total);
            const cancel = () => clearTimeout(restore);
            pending.add(cancel);
        }

        const typeTargets = document.querySelectorAll(
            '#about h2, #experience h2, #projects h2, #ai-chat h2, #vision-lab h2, #contact h2'
        );
        const writeTargets = document.querySelectorAll(
            '.section-subtitle, .intro-text, .timeline-content h3, .timeline-company, ' +
            '.timeline-content > p, .project-info h3, .project-info p, #contact .content-wrapper > p'
        );

        const fxObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                obs.unobserve(entry.target);
                if (entry.target.matches('h2')) typeHeading(entry.target);
                else writeWords(entry.target);
            });
        }, { threshold: 0.15 });

        typeTargets.forEach((el) => fxObserver.observe(el));
        writeTargets.forEach((el) => fxObserver.observe(el));
    }

    // --- About photo carousel: coverflow 3D ring ---
    // The fractional position `pos` is the single source of truth; each card is
    // painted straight to the DOM from its (folded) distance to the centre.
    const carousel = document.getElementById('about-carousel');
    if (carousel) {
        const frame = document.getElementById('coverflow-frame');
        const cards = Array.from(document.getElementById('coverflow-stage').children);
        const caption = document.getElementById('coverflow-caption');
        const dotsWrap = document.getElementById('carousel-dots');
        const count = cards.length;

        // Tuning: degrees of tilt, recession depth and opacity fade per step,
        // with a sub-linear falloff so far cards never fold shut.
        const ROTATE = 44, DEPTH = 0.6, FALLOFF = 0.56, FADE = 0.1, GAP = 0.05;

        let width = 0;          // measured card width; drives all distances
        let pos = 0;            // fractional card index at the centre
        let target = 0;         // where the current settle is headed
        let selected = -1;
        let raf = null;
        let drag = null;
        let autoTimer = null;

        const indexAt = (p) => ((Math.round(p) % count) + count) % count;

        function paint() {
            if (!width) return;
            const pitch = width * (1 + GAP);
            cards.forEach((card, i) => {
                // Fold the distance into the shorter way round the ring —
                // this is the whole looping mechanism, no cloned nodes.
                let offset = ((i - pos) % count + count) % count;
                if (offset > count / 2) offset -= count;

                const distance = Math.abs(offset);
                const ramp = Math.pow(distance, FALLOFF);
                const tilt = Math.min(ROTATE * ramp, 82) * Math.sign(offset);

                card.style.transform =
                    `translateX(calc(-50% + ${offset * pitch}px)) ` +
                    `translateZ(${-DEPTH * width * ramp}px) rotateY(${-tilt}deg)`;

                // A card teleports across the ring at half a turn out, so it
                // must fade to nothing just before that point.
                const edge = Math.min(1, Math.max(0, (count / 2 - distance) / 0.5));
                card.style.opacity = String(Math.max(0, 1 - FADE * distance) * edge);
                card.style.zIndex = String(100 - Math.round(distance));
            });
        }

        function setSelected(i) {
            if (i === selected) return;
            selected = i;
            Array.from(dotsWrap.children).forEach((d, k) => d.classList.toggle('active', k === i));
            if (caption) caption.textContent = cards[i].dataset.title || '';
        }

        function settle(t) {
            if (raf !== null) cancelAnimationFrame(raf);
            target = t;
            setSelected(indexAt(t));
            const step = () => {
                const remaining = target - pos;
                if (Math.abs(remaining) < 0.0004) {
                    pos = target;
                    paint();
                    raf = null;
                    return;
                }
                pos += remaining * 0.16; // exponential ease-out
                paint();
                raf = requestAnimationFrame(step);
            };
            raf = requestAnimationFrame(step);
        }

        // Take the shorter way round rather than unwinding the whole ring.
        const goTo = (i) => settle(i + Math.round((target - i) / count) * count);
        const nudge = (by) => settle(Math.round(target) + by);

        function restartAuto() {
            clearInterval(autoTimer);
            autoTimer = setInterval(() => nudge(1), 6000);
        }

        for (let i = 0; i < count; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', 'Photo ' + (i + 1));
            dot.addEventListener('click', () => { goTo(i); restartAuto(); });
            dotsWrap.appendChild(dot);
        }

        // Drag with velocity so a flick carries — capped at two cards.
        frame.addEventListener('pointerdown', (e) => {
            if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
            frame.setPointerCapture(e.pointerId);
            target = pos;
            drag = { id: e.pointerId, x: e.clientX, pos, v: 0, t: performance.now() };
            clearInterval(autoTimer);
        });
        frame.addEventListener('pointermove', (e) => {
            if (!drag || drag.id !== e.pointerId) return;
            const pitch = width * (1 + GAP);
            if (!pitch) return;
            const now = performance.now();
            const prev = pos;
            pos = drag.pos - (e.clientX - drag.x) / pitch;
            drag.v = ((pos - prev) / Math.max(now - drag.t, 1)) * 1000;
            drag.t = now;
            setSelected(indexAt(pos));
            paint();
        });
        const endDrag = (e) => {
            if (!drag || drag.id !== e.pointerId) return;
            const carried = Math.max(-2, Math.min(2, drag.v * 0.18));
            drag = null;
            settle(Math.round(pos + carried));
            restartAuto();
        };
        frame.addEventListener('pointerup', endDrag);
        frame.addEventListener('pointercancel', endDrag);

        frame.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') { e.preventDefault(); nudge(-1); restartAuto(); }
            else if (e.key === 'ArrowRight') { e.preventDefault(); nudge(1); restartAuto(); }
        });

        document.getElementById('carousel-prev').addEventListener('click', () => { nudge(-1); restartAuto(); });
        document.getElementById('carousel-next').addEventListener('click', () => { nudge(1); restartAuto(); });
        carousel.addEventListener('mouseenter', () => clearInterval(autoTimer));
        carousel.addEventListener('mouseleave', restartAuto);

        const measure = () => { width = cards[0].offsetWidth; paint(); };
        measure();
        setSelected(0);
        new ResizeObserver(measure).observe(frame);
        restartAuto();
    }

    // (Chat status & logic handled in js/chat.js)

    // --- Vanta.js Backgrounds ---
    if (typeof VANTA !== 'undefined') {
        // Hero: NET effect (connected nodes = AI/data network vibe)
        VANTA.NET({
            el: "#vanta-hero",
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            minHeight: 200,
            minWidth: 200,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0xd4a24e,
            backgroundColor: 0x1a1815,
            points: isMobile ? 8 : 14,
            maxDistance: isMobile ? 20 : 22,
            spacing: isMobile ? 18 : 16,
            showDots: true
        });

        // Contact: HALO effect (subtle elegant glow)
        VANTA.HALO({
            el: "#vanta-contact",
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            minHeight: 200,
            minWidth: 200,
            baseColor: 0xd4a24e,
            backgroundColor: 0x1a1815,
            amplitudeFactor: 1.5,
            size: isMobile ? 1.0 : 1.5
        });
    }

});
