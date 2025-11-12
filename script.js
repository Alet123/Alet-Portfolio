// === 🌗 THEME TOGGLE ===
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme from localStorage
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) {
  body.setAttribute("data-theme", savedTheme);
  if (savedTheme === "light") themeToggle.checked = true;
}

// Toggle between light/dark mode
themeToggle?.addEventListener("change", () => {
  const newTheme = themeToggle.checked ? "light" : "dark";
  body.classList.add("theme-transition");
  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("portfolio-theme", newTheme);
  accentPulse();
  setTimeout(() => body.classList.remove("theme-transition"), 600);
});

// === 🎨 ACCENT COLORS ===
const savedAccent = localStorage.getItem("portfolio-accent");
if (savedAccent) {
  document.documentElement.style.setProperty("--accent", savedAccent);
}

// Set accent color dynamically
function setAccent(color) {
  document.documentElement.style.setProperty("--accent", color);
  localStorage.setItem("portfolio-accent", color);
  accentPulse();
}

// Available accent themes
function set_color_purple() {
  setAccent("#a259ff");
}
function set_color_pink() {
  setAccent("#ff61d9");
}
function set_color_orange() {
  setAccent("#f97316");
}
function set_color_blue() {
  setAccent("#2196f3");
}
function set_color_bluegray() {
  setAccent("#546e7a");
}

// === ✨ ACCENT PULSE ANIMATION ===
function accentPulse() {
  const flash = document.createElement("div");
  flash.className = "accent-flash";
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 600);
}

// Inject pulse style
const style = document.createElement("style");
style.textContent = `
  body.theme-transition {
    transition: background 0.6s ease, color 0.6s ease;
  }

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

// === ⌨️ HERO TYPING ANIMATION ===
document.addEventListener("DOMContentLoaded", () => {
  const heroIntro = document.querySelector(".hero-intro");
  if (!heroIntro) return;

  const text = heroIntro.textContent.trim();
  heroIntro.textContent = "";
  heroIntro.style.opacity = "1";

  let index = 0;
  function typeLetter() {
    if (index < text.length) {
      heroIntro.textContent += text[index];
      index++;
      setTimeout(typeLetter, 80);
    }
  }

  setTimeout(typeLetter, 300);
});

// === 💬 SMOOTH SCROLL OFFSET FIX ===
// Prevent blank sections when clicking anchor links (#contact, etc.)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 50;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

// === 🪄 AOS INIT (Backup) ===
// Ensures AOS re-initializes after theme or color change
if (window.AOS) {
  AOS.init({ duration: 1000, once: true });
}
