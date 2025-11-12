// === 🌗 Theme Toggle ===
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme from localStorage
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) {
  body.setAttribute("data-theme", savedTheme);
  if (savedTheme === "light") themeToggle.checked = true;
}

// Toggle light/dark mode
themeToggle?.addEventListener("change", () => {
  const newTheme = themeToggle.checked ? "light" : "dark";
  body.classList.add("theme-transition");
  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("portfolio-theme", newTheme);
  accentPulse();
  setTimeout(() => body.classList.remove("theme-transition"), 600);
  if (window.AOS) AOS.refresh();
});

// === 🎨 Accent Colors ===
const savedAccent = localStorage.getItem("portfolio-accent");
if (savedAccent) {
  document.documentElement.style.setProperty("--accent", savedAccent);
}

function setAccent(color) {
  document.documentElement.style.setProperty("--accent", color);
  localStorage.setItem("portfolio-accent", color);
  accentPulse();
  if (window.AOS) AOS.refresh();
}

// Available accent themes
function set_color_purple() { setAccent("#a259ff"); }
function set_color_pink() { setAccent("#ff61d9"); }
function set_color_orange() { setAccent("#f97316"); }
function set_color_blue() { setAccent("#2196f3"); }
function set_color_bluegray() { setAccent("#546e7a"); }

// === ✨ Accent Pulse Animation ===
function accentPulse() {
  const flash = document.createElement("div");
  flash.className = "accent-flash";
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 700);
}

// Inject accent animation style dynamically
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

// === ⌨️ Typing Animation for Hero Intro ===
document.addEventListener("DOMContentLoaded", () => {
  const heroIntro = document.querySelector(".hero-intro");
  if (!heroIntro) return;

  const text = heroIntro.textContent.trim();
  heroIntro.textContent = "";
  heroIntro.style.opacity = "1";

  let index = 0;
  const speed = window.innerWidth < 600 ? 100 : 80;

  function typeLetter() {
    if (index < text.length) {
      heroIntro.textContent += text[index];
      index++;
      setTimeout(typeLetter, speed);
    }
  }

  setTimeout(typeLetter, 300);
});

// === 🌈 Animate Brush Icons on Click ===
document.querySelectorAll(".theme-switchers .bx").forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.style.transform = "scale(1.3)";
    setTimeout(() => (icon.style.transform = "scale(1)"), 200);
  });
});

// === 🌟 Scroll Reveal Animation for Sections (Intersection Observer) ===
const revealElements = document.querySelectorAll(
  ".education__card, .experience-card, .skill-card, .flipbook-card"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((el) => observer.observe(el));

// === 🧭 Smooth Scroll for Anchor Links ===
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      e.preventDefault();
      window.scrollTo({
        top: targetElement.offsetTop - 50,
        behavior: "smooth",
      });
    }
  });
});
