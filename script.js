/* =========================================================
   A'laa Hany — Portfolio interactions
   Vanilla JS, no dependencies.
   ========================================================= */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
    var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

    /* ---------------------------------------------------------
       0. Footer year
       --------------------------------------------------------- */
    var yearEl = $('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------------------------------------------------------
       1. Scroll progress + navbar state + back-to-top
       --------------------------------------------------------- */
    var navbar = $('#navbar');
    var progressBar = $('#progressBar');
    var toTop = $('#toTop');
    var ticking = false;

    function onScroll() {
        var y = window.scrollY || document.documentElement.scrollTop;
        var max = document.documentElement.scrollHeight - window.innerHeight;

        if (progressBar) {
            progressBar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
        }
        if (navbar) navbar.classList.toggle('scrolled', y > 30);
        if (toTop) toTop.classList.toggle('show', y > 500);

        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });
    onScroll();

    if (toTop) {
        toTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        });
    }

    /* ---------------------------------------------------------
       2. Mobile menu
       --------------------------------------------------------- */
    var navToggle = $('#navToggle');
    var navLinks = $('#navLinks');

    function setMenu(open) {
        if (!navToggle || !navLinks) return;
        navLinks.classList.toggle('open', open);
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        document.body.style.overflow = open ? 'hidden' : '';
    }

    if (navToggle) {
        navToggle.addEventListener('click', function () {
            setMenu(navToggle.getAttribute('aria-expanded') !== 'true');
        });
    }

    $$('#navLinks a').forEach(function (a) {
        a.addEventListener('click', function () { setMenu(false); });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setMenu(false);
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 860) setMenu(false);
    });

    /* ---------------------------------------------------------
       3. Scroll reveal (adds the visible class — never removes content)
       --------------------------------------------------------- */
    var revealEls = $$('.reveal');

    if ('IntersectionObserver' in window && !reduceMotion) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

        // Stagger siblings inside the same parent for a cascading feel.
        var groups = new Map();
        revealEls.forEach(function (el) {
            var parent = el.parentElement;
            var list = groups.get(parent) || [];
            list.push(el);
            groups.set(parent, list);
        });
        groups.forEach(function (list) {
            list.forEach(function (el, i) {
                el.style.setProperty('--d', Math.min(i * 90, 450) + 'ms');
            });
        });

        revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* ---------------------------------------------------------
       4. Scroll spy — highlight the section currently in view
       --------------------------------------------------------- */
    var sections = $$('main section[id]');
    var linkFor = {};
    $$('.nav-link').forEach(function (link) {
        linkFor[link.getAttribute('href').slice(1)] = link;
    });

    function setActive(id) {
        $$('.nav-link').forEach(function (l) { l.classList.remove('is-active'); });
        if (linkFor[id]) linkFor[id].classList.add('is-active');
    }

    if ('IntersectionObserver' in window && sections.length) {
        var spy = new IntersectionObserver(function (entries) {
            // Pick the most visible intersecting section.
            var best = null;
            entries.forEach(function (e) {
                if (e.isIntersecting && (!best || e.intersectionRatio > best.intersectionRatio)) best = e;
            });
            if (best) setActive(best.target.id);
        }, { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] });

        sections.forEach(function (s) { spy.observe(s); });
    }

    /* ---------------------------------------------------------
       5. Typewriter roles
       --------------------------------------------------------- */
    var typed = $('#typed');
    var roles = [
        'Front-End Web Developer',
        'HTML • CSS • JavaScript',
        'UI/UX Enthusiast',
        'AIS Student @ Cairo University'
    ];

    if (typed) {
        if (reduceMotion) {
            typed.textContent = roles[0];
            var caret = $('.caret');
            if (caret) caret.style.display = 'none';
        } else {
            var rIndex = 0, cIndex = 0, deleting = false;

            (function tick() {
                var word = roles[rIndex];
                cIndex += deleting ? -1 : 1;
                typed.textContent = word.slice(0, cIndex);

                var delay = deleting ? 40 : 85;

                if (!deleting && cIndex === word.length) {
                    deleting = true;
                    delay = 1800;
                } else if (deleting && cIndex === 0) {
                    deleting = false;
                    rIndex = (rIndex + 1) % roles.length;
                    delay = 350;
                }
                setTimeout(tick, delay);
            })();
        }
    }

    /* ---------------------------------------------------------
       6. Animated counters
       --------------------------------------------------------- */
    function countUp(el) {
        var target = parseInt(el.dataset.count, 10) || 0;
        if (reduceMotion) { el.textContent = String(target); return; }

        var duration = 1400;
        var start = performance.now();

        (function frame(now) {
            var p = Math.min((now - start) / duration, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = String(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(frame);
            else el.textContent = String(target);
        })(start);
    }

    /* ---------------------------------------------------------
       7. Language bars
       --------------------------------------------------------- */
    function fillBar(el) {
        el.style.width = (parseInt(el.dataset.fill, 10) || 0) + '%';
    }

    var onceTargets = $$('[data-count], [data-fill]');
    if ('IntersectionObserver' in window && onceTargets.length) {
        var onceObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (!e.isIntersecting) return;
                if (e.target.hasAttribute('data-count')) countUp(e.target);
                else fillBar(e.target);
                onceObserver.unobserve(e.target);
            });
        }, { threshold: 0.4 });
        onceTargets.forEach(function (el) { onceObserver.observe(el); });
    } else {
        onceTargets.forEach(function (el) {
            if (el.hasAttribute('data-count')) el.textContent = el.dataset.count;
            else fillBar(el);
        });
    }

    /* ---------------------------------------------------------
       8. 3D tilt on [data-tilt]
       --------------------------------------------------------- */
    if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        $$('[data-tilt]').forEach(function (el) {
            var max = parseFloat(el.dataset.tiltMax) || 8;

            el.addEventListener('pointermove', function (e) {
                var r = el.getBoundingClientRect();
                var px = (e.clientX - r.left) / r.width - 0.5;
                var py = (e.clientY - r.top) / r.height - 0.5;
                el.style.transform =
                    'perspective(900px) rotateY(' + (px * max) + 'deg) rotateX(' + (-py * max) + 'deg)';
            });

            el.addEventListener('pointerleave', function () {
                el.style.transform = '';
            });
        });

        /* ------- cursor glow ------- */
        var glow = $('#cursorGlow');
        if (glow) {
            var gx = window.innerWidth / 2, gy = window.innerHeight / 2;
            var cx = gx, cy = gy;

            window.addEventListener('pointermove', function (e) {
                gx = e.clientX;
                gy = e.clientY;
                glow.classList.add('on');
            }, { passive: true });

            (function loop() {
                cx += (gx - cx) * 0.09;
                cy += (gy - cy) * 0.09;
                glow.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)';
                requestAnimationFrame(loop);
            })();
        }
    }

    /* ---------------------------------------------------------
       9. Toast helper
       --------------------------------------------------------- */
    var toastEl = $('#toast');
    var toastTimer;

    function toast(msg) {
        if (!toastEl) return;
        toastEl.textContent = msg;
        toastEl.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
    }

    /* ---------------------------------------------------------
       10. Copy to clipboard
       --------------------------------------------------------- */
    $$('.copy-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var value = btn.dataset.copy || '';

            var done = function () {
                toast('Copied: ' + value);
                var icon = $('i', btn);
                if (icon) {
                    icon.className = 'fa-solid fa-check';
                    setTimeout(function () { icon.className = 'fa-regular fa-copy'; }, 1600);
                }
            };

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(value).then(done).catch(function () { toast(value); });
            } else {
                // Fallback for file:// and older browsers
                var ta = document.createElement('textarea');
                ta.value = value;
                ta.setAttribute('readonly', '');
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                try { document.execCommand('copy'); done(); } catch (err) { toast(value); }
                document.body.removeChild(ta);
            }
        });
    });

    /* ---------------------------------------------------------
       11. Contact form — validate, then open the user's mail client
       --------------------------------------------------------- */
    var form = $('#contactForm');

    if (form) {
        var note = $('#formNote');
        var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        function showError(name, message) {
            var input = $('#' + name);
            var msgEl = $('.error[data-for="' + name + '"]');
            if (input) input.parentElement.classList.toggle('invalid', Boolean(message));
            if (msgEl) msgEl.textContent = message || '';
            return !message;
        }

        function validate() {
            var name = $('#name').value.trim();
            var email = $('#email').value.trim();
            var message = $('#message').value.trim();

            var ok = true;
            ok = showError('name', name.length < 2 ? 'Please enter your name.' : '') && ok;
            ok = showError('email', !emailRe.test(email) ? 'Please enter a valid email address.' : '') && ok;
            ok = showError('message', message.length < 10 ? 'Message should be at least 10 characters.' : '') && ok;
            return ok ? { name: name, email: email, message: message } : null;
        }

        ['name', 'email', 'message'].forEach(function (id) {
            var el = $('#' + id);
            if (el) el.addEventListener('input', function () {
                if (el.parentElement.classList.contains('invalid')) validate();
            });
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var data = validate();

            if (!data) {
                if (note) note.textContent = 'Please fix the highlighted fields.';
                return;
            }

            var subject = encodeURIComponent('Portfolio enquiry from ' + data.name);
            var body = encodeURIComponent(
                data.message + '\n\n—\n' + data.name + '\n' + data.email
            );

            window.location.href = 'mailto:alaahany894@gmail.com?subject=' + subject + '&body=' + body;

            if (note) note.textContent = 'Opening your email app… if nothing happens, write to alaahany894@gmail.com';
            toast('Thanks, ' + data.name.split(' ')[0] + '!');
            form.reset();
        });
    }

    /* ---------------------------------------------------------
       12. Smooth anchor scrolling that accounts for the fixed navbar
       --------------------------------------------------------- */
    $$('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            var id = a.getAttribute('href');
            if (!id || id === '#') return;

            var target = document.getElementById(id.slice(1));
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
            history.replaceState(null, '', id);
        });
    });
})();
