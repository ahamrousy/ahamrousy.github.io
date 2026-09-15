/**
 * Scroll motion, modelled on Section AI's system (GSAP + ScrollTrigger):
 * blocks fade up 50px → 0 over 0.9s on power3.out when their top crosses 80%
 * of the viewport, once, with children staggered. Stats count up in view.
 *
 * Rebuilt on IntersectionObserver and CSS transitions — about 2 kB instead
 * of ~70 kB of GSAP, which would have cost the Lighthouse performance score.
 *
 * Progressive enhancement by construction: nothing is hidden in the HTML or
 * by CSS alone. This script only marks an element as pending when it is
 * below the fold at the moment it runs, so visitors without JavaScript,
 * search crawlers and AI engines always receive the complete page, and
 * nothing already on screen can blink out and back in.
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Blocks that reveal as one unit, or — for grids — child by child. */
const GROUPS = [
  'main .section-head',
  'main .grid',
  'main .prose',
  'main .faq',
  'main .spec',
  'main .wide-photo',
  'main .logo-marquee-wrap',
  'main .cta-band .container',
].join(',');

const STAGGER_MS = 80;
const DURATION_MS = 900;

const belowFold = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.9;

function revealOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        const items = (entry.target as HTMLElement & { _items?: HTMLElement[] })._items ?? [];
        items.forEach((item, i) => {
          item.classList.remove('motion-pending');
          item.classList.add('motion-in');
          // Hand the element back to its own hover transitions once it lands.
          window.setTimeout(() => {
            item.classList.remove('motion-in');
            item.style.removeProperty('--i');
          }, DURATION_MS + i * STAGGER_MS + 100);
        });
      }
    },
    // "top 80%" in ScrollTrigger terms.
    { rootMargin: '0px 0px -20% 0px' },
  );

  for (const group of document.querySelectorAll<HTMLElement>(GROUPS)) {
    if (group.closest('[data-reveal]') || !belowFold(group)) continue;
    group.setAttribute('data-reveal', '');
    const items = group.matches('.grid') ? ([...group.children] as HTMLElement[]) : [group];
    items.forEach((item, i) => {
      item.style.setProperty('--i', String(Math.min(i, 6)));
      item.classList.add('motion-pending');
    });
    (group as HTMLElement & { _items?: HTMLElement[] })._items = items;
    observer.observe(group);
  }
}

const FIRST_NUMBER = /\d+(?:\.\d+)?/;

/**
 * Counts the leading number of each stat up from zero, keeping its decimals
 * and everything after it: "4.8/5" runs 0.0 → 4.8 while "/5" stays put.
 *
 * A percentage split such as "70/30" is a ratio, not an amount, so it is
 * left still — "35/30" halfway through would read as nonsense.
 *
 * The real value sits in a visually hidden span throughout, so a screen
 * reader never hears "0".
 */
function countUpStats() {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        (entry.target as HTMLElement & { _run?: () => void })._run?.();
      }
    },
    { threshold: 0.6 },
  );

  for (const el of document.querySelectorAll<HTMLElement>('.stat__value')) {
    const final = el.textContent?.trim() ?? '';
    const match = final.match(FIRST_NUMBER);
    if (!match) continue;
    const split = final.match(/^(\d+)\s*\/\s*(\d+)$/);
    if (split && Number(split[1]) + Number(split[2]) === 100) continue;

    // Only count numbers the visitor has not already read.
    const stat = el.closest('.stat') ?? el;
    const unseen = belowFold(el) || parseFloat(getComputedStyle(stat).opacity) < 0.05;
    if (!unseen) continue;

    const target = parseFloat(match[0]);
    const decimals = (match[0].split('.')[1] ?? '').length;

    const shown = document.createElement('span');
    shown.setAttribute('aria-hidden', 'true');
    const spoken = document.createElement('span');
    spoken.className = 'visually-hidden';
    spoken.textContent = final;

    const paint = (progress: number) => {
      shown.textContent = final.replace(FIRST_NUMBER, (target * progress).toFixed(decimals));
    };
    paint(0);
    el.replaceChildren(shown, spoken);

    (el as HTMLElement & { _run?: () => void })._run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1200);
        paint(1 - Math.pow(1 - t, 3));
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = final;
      };
      requestAnimationFrame(tick);
    };
    observer.observe(el);
  }
}

/** Moving content must be pausable (WCAG 2.2.2) — hover alone is not enough. */
function marqueeToggles() {
  for (const btn of document.querySelectorAll<HTMLButtonElement>('.logo-marquee__toggle')) {
    const wrap = btn.closest('.logo-marquee-wrap');
    if (!wrap) continue;
    btn.hidden = false;
    btn.addEventListener('click', () => {
      const paused = wrap.classList.toggle('is-paused');
      btn.textContent = (paused ? btn.dataset.play : btn.dataset.pause) ?? '';
    });
  }
}

if (!reduceMotion && 'IntersectionObserver' in window) {
  revealOnScroll();
  countUpStats();
  marqueeToggles();
}
