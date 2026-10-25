'use strict';

function initializeMenu() {
  const navigation = document.querySelector('.navigation');
  const button = document.querySelector('.menu-toggle');
  const links = document.querySelector('#navigation-links');
  if (!navigation || !button || !links) return;

  function closeMenu() {
    button.setAttribute('aria-expanded', 'false');
    links.classList.remove('is-open');
  }

  navigation.classList.add('is-enhanced');
  button.hidden = false;
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    links.classList.toggle('is-open', open);
  });
  links.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || button.getAttribute('aria-expanded') !== 'true') return;
    closeMenu();
    button.focus();
  });
  document.addEventListener('click', (event) => {
    if (!navigation.contains(event.target)) closeMenu();
  });
  window.matchMedia('(min-width: 861px)').addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });
}

function initializeReadingState() {
  const progress = document.querySelector('.reading-progress');
  const links = Array.from(document.querySelectorAll('.navigation-links a[href^="#"]'));
  const sections = links.map((link) => document.getElementById(link.hash.slice(1))).filter(Boolean);
  let scheduled = false;

  function update() {
    const available = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.value = available > 0 ? Math.min(100, (window.scrollY / available) * 100) : 0;
    let activeId = '';
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= 155) activeId = section.id;
    }
    if (available > 0 && window.scrollY >= available - 8) activeId = sections.at(-1)?.id ?? '';
    for (const link of links) {
      if (link.hash === `#${activeId}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    scheduled = false;
  }

  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(update);
  }

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate, { once: true });
  update();
}

function initializeReveals() {
  if (!('IntersectionObserver' in window)) return;
  const elements = Array.from(document.querySelectorAll('[data-reveal]'));
  let observer;

  function show(element) {
    element.classList.add('reveal-visible');
    observer?.unobserve(element);
  }

  try {
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) show(entry.target);
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    for (const element of elements) {
      const bounds = element.getBoundingClientRect();
      // Una visita por ancla conserva visible el contenido que ya quedó atrás.
      if (bounds.top < window.innerHeight) continue;
      element.classList.add('reveal-pending');
      observer.observe(element);
    }
  } catch {
    observer?.disconnect();
    for (const element of elements) element.classList.remove('reveal-pending');
    return;
  }

  document.addEventListener('focusin', (event) => {
    if (!(event.target instanceof Element)) return;
    const element = event.target.closest('[data-reveal]');
    if (element) show(element);
  });
  window.addEventListener('beforeprint', () => {
    for (const element of elements) show(element);
  });
}

initializeMenu();
initializeReadingState();
initializeReveals();

const year = document.querySelector('[data-current-year]');
if (year) year.textContent = String(new Date().getFullYear());
