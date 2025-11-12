// === 🌗 Theme Toggle ===
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) {
  body.setAttribute("data-theme", savedTheme);
  if (savedTheme === "light") themeToggle.checked = true;
}

// Toggle Light/Dark mode
themeToggle?.addEventListener("change", () => {
  const newTheme = themeToggle.checked ? "light" : "dark";
  body.classList.add("theme-transition");
  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("portfolio-theme", newTheme);
  accentPulse();
  setTimeout(() => body.classList.remove("theme-transition"), 600);
  setTimeout(() => AOS.refreshHard(), 700);
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
}

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
  setTimeout(() => flash.remove(), 600);
}

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
  function typeLetter() {
    if (index < text.length) {
      heroIntro.textContent += text[index];
      index++;
      setTimeout(typeLetter, 80);
    }
  }
  setTimeout(typeLetter, 300);
});

// === 🪄 Sequential Fade Animations (Skills & Experience) ===
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.2,
  };

  const revealOnScroll = (entries, observer) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }, i * 100);
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(revealOnScroll, observerOptions);
  document.querySelectorAll(".skill-card, .experience-card").forEach(el => {
    observer.observe(el);
  });
});

// === ⬆️ Scroll-to-Top Button ===
const scrollBtn = document.createElement("button");
scrollBtn.innerHTML = `<i class="bx bx-up-arrow-alt"></i>`;
scrollBtn.className = "scroll-top";
document.body.appendChild(scrollBtn);

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollBtn.classList.add("visible");
  } else {
    scrollBtn.classList.remove("visible");
  }
});

// Inject Scroll Button Style
const scrollBtnStyle = document.createElement("style");
scrollBtnStyle.textContent = `
  .scroll-top {
    position: fixed;
    bottom: 4.5rem;
    right: 1.5rem;
    background: var(--accent);
    border: none;
    border-radius: 50%;
    color: #fff;
    font-size: 1.6rem;
    padding: 0.8rem;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transform: translateY(80px);
    opacity: 0;
    transition: all 0.4s ease;
    z-index: 999;
  }
  .scroll-top.visible {
    transform: translateY(0);
    opacity: 1;
  }
  .scroll-top:hover {
    transform: translateY(-6px);
    background: #ff5b4e;
  }
`;
document.head.appendChild(scrollBtnStyle);
