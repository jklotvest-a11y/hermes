(function() {
    document.body.classList.add('is-loading');

    const tabs = document.querySelectorAll('.works-tab');
    const panels = document.querySelectorAll('.works-panel');
    const nav = document.querySelector('.site-nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.nav-links a');
    const loader = document.querySelector('.loader-screen');
    const pond = document.querySelector('#pond-canvas');
    const lightbox = document.querySelector('.image-lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxStage = document.querySelector('.lightbox-stage');
    const zoomTriggers = document.querySelectorAll('.zoom-trigger');
    let lightboxZoom = 1;

    const hideLoader = () => {
        if (!loader) return;
        loader.classList.add('is-hidden');
        document.body.classList.remove('is-loading');
        window.setTimeout(() => {
            loader.remove();
        }, 800);
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.addEventListener('load', () => {
        window.setTimeout(hideLoader, prefersReducedMotion ? 120 : 950);
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            panels.forEach(p => {
                if (p.dataset.panel === target) {
                    p.classList.add('active');
                } else {
                    p.classList.remove('active');
                }
            });
        });
    });

    if (nav && navToggle) {
        navToggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('nav-open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        window.addEventListener('scroll', () => {
            nav.classList.toggle('nav-scrolled', window.scrollY > 24);
        }, { passive: true });
    }

    if (lightbox && lightboxImage) {
        const setZoom = value => {
            lightboxZoom = Math.min(3, Math.max(1, value));
            lightboxImage.style.setProperty('--zoom', lightboxZoom.toFixed(2));
        };

        const openLightbox = trigger => {
            const src = trigger.dataset.zoomSrc || trigger.querySelector('img')?.src;
            const alt = trigger.querySelector('img')?.alt || '作品原型图';
            if (!src) return;
            lightboxImage.src = src;
            lightboxImage.alt = alt;
            setZoom(1);
            lightbox.classList.add('is-open');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.classList.add('lightbox-open');
        };

        const closeLightbox = () => {
            lightbox.classList.remove('is-open');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('lightbox-open');
        };

        zoomTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => openLightbox(trigger));
        });

        lightbox.addEventListener('click', event => {
            if (event.target === lightbox) closeLightbox();
        });

        lightbox.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);

        lightbox.querySelectorAll('[data-zoom-action]').forEach(button => {
            button.addEventListener('click', () => {
                const action = button.dataset.zoomAction;
                if (action === 'in') setZoom(lightboxZoom + 0.25);
                if (action === 'out') setZoom(lightboxZoom - 0.25);
                if (action === 'reset') setZoom(1);
            });
        });

        lightboxStage?.addEventListener('wheel', event => {
            event.preventDefault();
            setZoom(lightboxZoom + (event.deltaY < 0 ? 0.12 : -0.12));
        }, { passive: false });

        window.addEventListener('keydown', event => {
            if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
                closeLightbox();
            }
        });
    }

    if (pond) {
        const ctx = pond.getContext('2d');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const mouse = { x: 0.5, y: 0.5 };
        const redFish = {
            x: window.innerWidth * 0.72,
            y: window.innerHeight * 0.42,
            vx: 0,
            vy: 0,
            angle: 0
        };
        const fish = Array.from({ length: 9 }, (_, i) => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            speed: 0.35 + Math.random() * 0.45,
            angle: Math.random() * Math.PI * 2,
            turn: 0.006 + Math.random() * 0.01,
            size: 8 + Math.random() * 6,
            phase: Math.random() * Math.PI * 2,
            color: i % 2 ? 'rgba(93,132,153,0.38)' : 'rgba(138,175,196,0.38)'
        }));
        const pads = Array.from({ length: 14 }, (_, i) => ({
            x: (i * 193) % Math.max(window.innerWidth, 900),
            y: (i * 137) % Math.max(window.innerHeight, 700),
            r: 22 + (i % 4) * 8,
            phase: i * 0.72,
            alpha: 0.08 + (i % 3) * 0.035
        }));

        const resizePond = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            pond.width = Math.floor(window.innerWidth * dpr);
            pond.height = Math.floor(window.innerHeight * dpr);
            pond.style.width = `${window.innerWidth}px`;
            pond.style.height = `${window.innerHeight}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const headingTarget = () => {
            const headings = [...document.querySelectorAll('#hero .hero-greeting, section .section-heading')];
            const centerY = window.innerHeight * 0.36;
            let closest = headings[0];
            let best = Infinity;

            headings.forEach(heading => {
                const rect = heading.getBoundingClientRect();
                const distance = Math.abs(rect.top + rect.height / 2 - centerY);
                if (distance < best) {
                    closest = heading;
                    best = distance;
                }
            });

            const rect = closest.getBoundingClientRect();
            const x = Math.min(window.innerWidth - 42, Math.max(42, rect.left + rect.width + 32));
            const y = Math.min(window.innerHeight - 54, Math.max(54, rect.top + rect.height / 2));

            return {
                x: x + (mouse.x - 0.5) * 34,
                y: y + (mouse.y - 0.5) * 22
            };
        };

        const drawFish = (item, color, isRed = false) => {
            ctx.save();
            ctx.translate(item.x, item.y);
            ctx.rotate(item.angle);
            const size = isRed ? 14 : item.size;
            ctx.fillStyle = color;
            ctx.strokeStyle = isRed ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.38)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.ellipse(0, 0, size * 1.35, size * 0.62, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(-size * 1.18, 0);
            ctx.lineTo(-size * 2.05, -size * 0.55);
            ctx.lineTo(-size * 1.88, size * 0.55);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.arc(size * 0.72, -size * 0.15, size * 0.08, 0, Math.PI * 2);
            ctx.fillStyle = isRed ? 'rgba(255,255,255,0.86)' : 'rgba(44,62,80,0.25)';
            ctx.fill();
            ctx.restore();
        };

        const drawPad = (pad, t) => {
            const x = (pad.x + Math.sin(t * 0.0002 + pad.phase) * 18) % window.innerWidth;
            const y = (pad.y + Math.cos(t * 0.00018 + pad.phase) * 14) % window.innerHeight;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(Math.sin(t * 0.00018 + pad.phase) * 0.3);
            ctx.fillStyle = `rgba(101,123,109,${pad.alpha})`;
            ctx.beginPath();
            ctx.arc(0, 0, pad.r, 0.22, Math.PI * 1.9);
            ctx.lineTo(0, 0);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = `rgba(255,255,255,${pad.alpha + 0.05})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            if (pad.r > 38) {
                ctx.fillStyle = 'rgba(180,137,66,0.1)';
                ctx.beginPath();
                ctx.arc(5, -5, 3.5, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        };

        const animate = (t = 0) => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            ctx.clearRect(0, 0, w, h);

            const water = ctx.createLinearGradient(0, 0, w, h);
            water.addColorStop(0, 'rgba(255,255,255,0.04)');
            water.addColorStop(0.5, 'rgba(138,175,196,0.06)');
            water.addColorStop(1, 'rgba(255,255,255,0.02)');
            ctx.fillStyle = water;
            ctx.fillRect(0, 0, w, h);

            for (let i = 0; i < 4; i += 1) {
                ctx.strokeStyle = `rgba(138,175,196,${0.055 - i * 0.008})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                for (let x = -40; x <= w + 40; x += 28) {
                    const y = h * (0.18 + i * 0.2) + Math.sin(x * 0.018 + t * 0.0007 + i) * 10;
                    if (x === -40) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }

            pads.forEach(pad => drawPad(pad, t));

            fish.forEach((item, i) => {
                item.phase += 0.018;
                item.angle += Math.sin(t * 0.0006 + i) * item.turn;
                item.x += Math.cos(item.angle) * item.speed;
                item.y += Math.sin(item.angle) * item.speed + Math.sin(item.phase) * 0.08;
                if (item.x < -40) item.x = w + 40;
                if (item.x > w + 40) item.x = -40;
                if (item.y < -40) item.y = h + 40;
                if (item.y > h + 40) item.y = -40;
                drawFish(item, item.color);
            });

            const target = headingTarget();
            redFish.vx += (target.x - redFish.x) * 0.004;
            redFish.vy += (target.y - redFish.y) * 0.004;
            redFish.vx *= 0.92;
            redFish.vy *= 0.92;
            redFish.x += redFish.vx;
            redFish.y += redFish.vy;
            redFish.angle = Math.atan2(redFish.vy, redFish.vx || 0.001);

            ctx.beginPath();
            ctx.arc(redFish.x, redFish.y, 30 + Math.sin(t * 0.004) * 4, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(180,92,77,0.08)';
            ctx.lineWidth = 1;
            ctx.stroke();
            drawFish(redFish, 'rgba(184,92,77,0.88)', true);

            if (!prefersReducedMotion) requestAnimationFrame(animate);
        };

        resizePond();
        window.addEventListener('resize', resizePond);
        window.addEventListener('mousemove', event => {
            mouse.x = event.clientX / window.innerWidth;
            mouse.y = event.clientY / window.innerHeight;
        }, { passive: true });

        if (prefersReducedMotion) {
            animate(0);
        } else {
            requestAnimationFrame(animate);
        }
    }
})();
