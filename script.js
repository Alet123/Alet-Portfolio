// ──────────────────────────────────────────────
// PRELOADER
// ──────────────────────────────────────────────
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => preloader.classList.add('hidden'), 600);
});

// ──────────────────────────────────────────────
// CURSOR
// ──────────────────────────────────────────────
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');

let mouseX = 0,
    mouseY = 0;
let ringX = 0,
    ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

// ──────────────────────────────────────────────
// THEME TOGGLE
// ──────────────────────────────────────────────
const toggleBtn = document.getElementById('themeToggleBtn');
const statusText = document.getElementById('themeStatus');
const sparkleContainer = document.getElementById('toggleSparkle');
const root = document.documentElement;

function getCurrentTheme() {
    return root.getAttribute('data-theme') || 'dark';
}

function updateThemeUI(theme) {
    if (theme === 'light') {
        statusText.textContent = 'Light';
        statusText.className = 'theme-status light';
    } else {
        statusText.textContent = 'Dark';
        statusText.className = 'theme-status dark';
    }
    root.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    const checkbox = document.getElementById('themeToggle');
    if (checkbox) {
        checkbox.checked = (theme === 'light');
    }
}

function toggleTheme() {
    const current = getCurrentTheme();
    const newTheme = current === 'dark' ? 'light' : 'dark';
    updateThemeUI(newTheme);
    createSparkles();
    document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
}

function createSparkles() {
    const rect = toggleBtn.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const count = 12;
    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('span');
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
        const distance = 20 + Math.random() * 40;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        sparkle.style.setProperty('--tx', tx + 'px');
        sparkle.style.setProperty('--ty', ty + 'px');
        sparkle.style.left = cx + 'px';
        sparkle.style.top = cy + 'px';
        sparkle.style.width = (2 + Math.random() * 4) + 'px';
        sparkle.style.height = sparkle.style.width;
        sparkle.style.animationDuration = (0.4 + Math.random() * 0.4) + 's';
        sparkleContainer.appendChild(sparkle);
        setTimeout(() => {
            sparkle.remove();
        }, 800);
    }
}

toggleBtn.addEventListener('click', toggleTheme);

document.addEventListener('keydown', (e) => {
    if ((e.key === 't' || e.key === 'T') && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        toggleTheme();
    }
});

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
    updateThemeUI(savedTheme);
} else {
    updateThemeUI('dark');
}

const oldCheckbox = document.getElementById('themeToggle');
if (oldCheckbox) {
    oldCheckbox.addEventListener('change', function() {
        const theme = this.checked ? 'light' : 'dark';
        updateThemeUI(theme);
        createSparkles();
    });
    oldCheckbox.checked = (getCurrentTheme() === 'light');
}

// ──────────────────────────────────────────────
// NAVBAR
// ──────────────────────────────────────────────
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// ──────────────────────────────────────────────
// WORK FILTERS
// ──────────────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        workCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeUp 0.6s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ──────────────────────────────────────────────
// COLOR BRUSHES
// ──────────────────────────────────────────────
document.querySelectorAll('.theme-switchers .bx').forEach(icon => {
    icon.addEventListener('click', () => {
        const color = icon.getAttribute('data-color');
        document.documentElement.style.setProperty('--accent', color);
        document.documentElement.style.setProperty('--accent-dim', color + '80');
        document.documentElement.style.setProperty('--accent-glow', color + '40');
        localStorage.setItem('portfolio-accent', color);
        icon.style.transform = 'scale(1.3)';
        setTimeout(() => icon.style.transform = 'scale(1)', 200);
    });
});

const savedAccent = localStorage.getItem('portfolio-accent');
if (savedAccent) {
    document.documentElement.style.setProperty('--accent', savedAccent);
    document.documentElement.style.setProperty('--accent-dim', savedAccent + '80');
    document.documentElement.style.setProperty('--accent-glow', savedAccent + '40');
}

// ──────────────────────────────────────────────
// SMOOTH SCROLL
// ──────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// ──────────────────────────────────────────────
// CONTACT FORM
// ──────────────────────────────────────────────
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    alert('Thank you, ' + name + '! Your message has been sent. I\'ll get back to you soon.');
    e.target.reset();
});

// ──────────────────────────────────────────────
// MOUSE TRACKING FOR CARD SHINE
// ──────────────────────────────────────────────
document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
    });
});

console.log('🚀 Premium Portfolio — Fully Animated & Creative');
