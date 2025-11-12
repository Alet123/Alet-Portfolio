// ===========================
// Modern Portfolio Script
// ===========================

// Theme Toggle (Light / Dark)
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme on startup
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) {
  body.setAttribute("data-theme", savedTheme);
  if (savedTheme === "light") themeToggle.checked = true;
}

// Toggle theme switch
themeToggle?.addEventListener("change", () => {
  const newTheme = themeToggle.checked ? "light" : "dark";
  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("portfolio-theme", newTheme);
  animateAccentFlash(); // subtle glow when theme changes
});

// ===========================
// Accent Color Switchers
// ===========================

// Load saved accent color
const savedAccent = localStorage.getItem("portfolio-accent");
if (savedAccent) {
  document.documentElement.style.setProperty("--accent", savedAccent);
}

// Unified accent color setter
function setAccent(color) {
  document.documentElement.style.setProperty("--accent", color);
  localStorage.setItem("portfolio-accent", color);
  animateAccentFlash();
}

// Accent color functions (for icon click)
function set_color_purple() { setAccent("#a259ff"); }
function set_color_pink() { setAccent("#ff61d9"); }
function set_color_orange() { setAccent("#f97316"); }
function set_color_blue() { setAccent("#2196f3"); }
function set_color_bluegray() { setAccent("#546e7a"); }

// ===========================
// Small Interactive Animation
// ===========================

function animateAccentFlash() {
  const flash = document.createElement("div");
  flash.className = "accent-flash";
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 600);
}

// Add floating accent pulse when theme changes
const style = document.createElement("style");
style.textContent = `
  .accent-flash {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: var(--accent);
    opacity: 0.1;
    z-index: 9999;
    animation: accentFade 0.6s ease forwards;
    pointer-events: none;
  }
  @keyframes accentFade {
    from { opacity: 0.3; }
    to { opacity: 0; }
  }
`;
document.head.appendChild(style);
