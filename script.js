// Scroll progress bar
const progress = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const s = document.documentElement.scrollTop;
  const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progress.style.width = (s / h * 100) + '%';
});

// Reveal chapters on scroll
const chapters = document.querySelectorAll('.chapter');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.04 });
chapters.forEach(c => revealObs.observe(c));

// Stagger card entrance
chapters.forEach(ch => {
  ch.querySelectorAll('.card').forEach((card, i) => {
    card.style.transitionDelay = (i * 0.06) + 's';
  });
});

// Active nav highlighting
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.chapter');
const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navItems.forEach(n => {
        n.classList.remove('active');
        if (n.getAttribute('href') === '#' + e.target.id) n.classList.add('active');
      });
    }
  });
}, { rootMargin: '-25% 0px -65% 0px' });
sections.forEach(s => navObs.observe(s));

// Smooth scroll nav
navItems.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(item.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Randomize LED blink timing
document.querySelectorAll('.led').forEach(led => {
  led.style.animationDelay = (Math.random() * 2) + 's';
});
