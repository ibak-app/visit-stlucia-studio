/* ============================================================
   VISIT SAINT LUCIA — Core App JS
   visit.stlucia.studio
   Vanilla JS — no frameworks
   ============================================================ */

'use strict';

/* ---------- Accordion ---------- */
function initAccordions() {
  document.querySelectorAll('.accordion__header').forEach(btn => {
    btn.addEventListener('click', () => {
      const body = btn.nextElementSibling;
      const isOpen = btn.classList.contains('open');

      // Optional: close others in same parent
      const parent = btn.closest('.accordion-group');
      if (parent) {
        parent.querySelectorAll('.accordion__header.open').forEach(other => {
          if (other !== btn) {
            other.classList.remove('open');
            const otherBody = other.nextElementSibling;
            if (otherBody) {
              otherBody.classList.remove('open');
              otherBody.style.maxHeight = null;
            }
          }
        });
      }

      btn.classList.toggle('open', !isOpen);
      if (body) {
        body.classList.toggle('open', !isOpen);
      }
    });
  });
}

/* ---------- Hamburger / Mobile Nav ---------- */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ---------- Scroll Spy (Sidebar) ---------- */
function initScrollSpy() {
  const sidebarLinks = document.querySelectorAll('.sidebar__nav a[href^="#"]');
  if (!sidebarLinks.length) return;

  const sections = [];
  sidebarLinks.forEach(link => {
    const id = link.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) sections.push({ id, el, link });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sidebarLinks.forEach(l => l.classList.remove('active'));
        const active = sections.find(s => s.id === entry.target.id);
        if (active) active.link.classList.add('active');
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

  sections.forEach(({ el }) => observer.observe(el));
}

/* ---------- Back to Top ---------- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Active Nav Link ---------- */
function setActiveNav() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';

  document.querySelectorAll('.navbar__links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    if (
      href === page ||
      (page === '' && href === 'index.html') ||
      href.endsWith(page)
    ) {
      link.classList.add('active');
    }
  });
}

/* ---------- Smooth Scroll for anchor links ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ---------- Table Responsiveness ---------- */
function initTables() {
  document.querySelectorAll('table').forEach(table => {
    if (!table.parentElement.classList.contains('table-wrap')) {
      const wrap = document.createElement('div');
      wrap.classList.add('table-wrap');
      table.parentNode.insertBefore(wrap, table);
      wrap.appendChild(table);
    }
  });
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initAccordions();
  initMobileNav();
  initScrollSpy();
  initBackToTop();
  setActiveNav();
  initSmoothScroll();
  initTables();
});
