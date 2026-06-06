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

    // --- Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

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

    // --- Counter Animation ---
    const counters = document.querySelectorAll('[data-count]');
    let countersAnimated = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    const suffix = counter.getAttribute('data-suffix') || '';
                    let current = 0;
                    const increment = target / 40;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        counter.textContent = Math.floor(current) + suffix;
                    }, 40);
                });
            }
        });
    }, { threshold: 0.5 });

    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) counterObserver.observe(statsBar);

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
            color: 0x4f46e5,
            backgroundColor: 0x0a0a0a,
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
            baseColor: 0x4f46e5,
            backgroundColor: 0x0a0a0a,
            amplitudeFactor: 1.5,
            size: isMobile ? 1.0 : 1.5
        });
    }

});
