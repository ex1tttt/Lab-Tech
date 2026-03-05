const themeToggle = document.getElementById('themeToggle');

const savedTheme = localStorage.getItem('labtech-theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('labtech-theme', next);
  updateNavbar();
});

const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

const navbar = document.querySelector('.navbar');

function updateNavbar() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  if (window.scrollY > 40) {
    navbar.style.background = isLight ? 'rgba(255,255,255,0.98)' : 'rgba(13,13,13,0.97)';
  } else {
    navbar.style.background = isLight ? 'rgba(255,255,255,0.92)' : 'rgba(13,13,13,0.9)';
  }
}

window.addEventListener('scroll', updateNavbar);

const revealEls = document.querySelectorAll(
  '.area-card, .info-card, .highlight-box, .benefit-list li, .outcome-item'
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity 0.55s ease ${i * 0.06}s, transform 0.55s ease ${i * 0.06}s`;
  observer.observe(el);
});
