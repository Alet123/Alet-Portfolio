// ──────────────────────────────────────────────
// THEME TOGGLE (Dark / Light Mode)
// ──────────────────────────────────────────────
const toggleBtn = document.getElementById('themeToggleBtn');
const statusText = document.getElementById('themeStatus');
const sparkleContainer = document.getElementById('toggleSparkle');
const root = document.documentElement;

function getTheme() {
    return root.getAttribute('data-theme') || 'dark';
}

function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    statusText.textContent = theme === 'light' ? 'Light' : 'Dark';
    statusText.className = 'theme-status ' + theme;
}

function toggleTheme() {
    const current = getTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
    createSparkles();
}

function createSparkles() {
    const rect = toggleBtn.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    for (let i = 0; i < 10; i++) {
        const span = document.createElement('span');
        const angle = Math.random() * Math.PI * 2;
        const dist = 15 + Math.random() * 35;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;
        span.style.setProperty('--tx', tx + 'px');
        span.style.setProperty('--ty', ty + 'px');
        span.style.left = cx + 'px';
        span.style.top = cy + 'px';
        span.style.width = (2 + Math.random() * 4) + 'px';
        span.style.height = span.style.width;
        span.style.animationDuration = (0.3 + Math.random() * 0.4) + 's';
        sparkleContainer.appendChild(span);
        setTimeout(() => span.remove(), 800);
    }
}

// Load saved theme
const saved = localStorage.getItem('portfolio-theme');
if (saved && (saved === 'light' || saved === 'dark')) {
    setTheme(saved);
} else {
    setTheme('dark');
}

// Event listeners
toggleBtn.addEventListener('click', toggleTheme);

// Keyboard shortcut: press 'T' to toggle
document.addEventListener('keydown', (e) => {
    if ((e.key === 't' || e.key === 'T') && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        toggleTheme();
    }
});

// ──────────────────────────────────────────────
// NAVBAR HAMBURGER
// ──────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('open');
    this.classList.toggle('active');
});

// Close nav when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
    });
});

// ──────────────────────────────────────────────
// WORK FILTERS
// ──────────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.dataset.filter;
        document.querySelectorAll('.work-card').forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ──────────────────────────────────────────────
// CLICKABLE WORK CARDS (Flipbooks + Instagram)
// ──────────────────────────────────────────────
document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('click', function(e) {
        const link = this.dataset.link;
        if (link) {
            window.open(link, '_blank');
        }
    });
});

// ──────────────────────────────────────────────
// COLOR BRUSHES (Accent Color)
// ──────────────────────────────────────────────
document.querySelectorAll('.theme-switchers .bx').forEach(icon => {
    icon.addEventListener('click', function() {
        const color = this.dataset.color;
        document.documentElement.style.setProperty('--accent', color);
        document.documentElement.style.setProperty('--accent-glow', color + '40');
        localStorage.setItem('portfolio-accent', color);
        this.style.transform = 'scale(1.4)';
        setTimeout(() => this.style.transform = 'scale(1)', 200);
    });
});

// Load saved accent color
const savedAccent = localStorage.getItem('portfolio-accent');
if (savedAccent) {
    document.documentElement.style.setProperty('--accent', savedAccent);
    document.documentElement.style.setProperty('--accent-glow', savedAccent + '40');
}

// ──────────────────────────────────────────────
// CONTACT FORM
// ──────────────────────────────────────────────
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value.trim();
    const email = this.querySelector('input[type="email"]').value.trim();
    const message = this.querySelector('textarea').value.trim();

    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    alert('Thank you, ' + name + '! Your message has been sent. I\'ll get back to you soon.');
    this.reset();
});

// ──────────────────────────────────────────────
// SMOOTH SCROLL FOR ANCHOR LINKS
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

console.log('🚀 Alet Jacob Portfolio — Fully functional with Instagram reels!');
