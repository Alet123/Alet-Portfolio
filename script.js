// Modern Portfolio Script – Alet Jacob

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Saved theme
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) {
  body.setAttribute("data-theme", savedTheme);
  if (savedTheme === "light") themeToggle.checked = true;
}

themeToggle?.addEventListener("change", () => {
  const newTheme = themeToggle.checked ? "light" : "dark";
  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("portfolio-theme", newTheme);
  accentPulse();
});

// Accent Color Switchers
const savedAccent = localStorage.getItem("portfolio-accent");
if (savedAccent) {
  document.documentElement.style.setProperty("--accent", savedAccent);
}

function setAccent(color) {
  document.documentElement.style.setProperty("--accent", color);
  localStorage.setItem("portfolio-accent", color);
  accentPulse();
}

function set_color_purple() { setAccent("#a259ff"); }
function set_color_pink() { setAccent("#ff61d9"); }
function set_color_orange() { setAccent("#f97316"); }
function set_color_blue() { setAccent("#2196f3"); }
function set_color_bluegray() { setAccent("#546e7a"); }

// Accent Pulse Animation
function accentPulse() {
  const flash = document.createElement("div");
  flash.className = "accent-flash";
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 600);
}

const style = document.createElement("style");
style.textContent = `
  .accent-flash {
    position: fixed;
    inset: 0;
    background: var(--accent);
    opacity: 0.08;
    z-index: 9999;
    animation: accentFade 0.6s ease forwards;
    pointer-events: none;
  }
  @keyframes accentFade {
    from { opacity: 0.25; }
    to { opacity: 0; }
  }
`;
document.head.appendChild(style);
