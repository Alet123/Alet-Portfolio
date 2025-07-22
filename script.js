// script.js

// Toggle Light/Dark Theme
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) {
  body.setAttribute("data-theme", savedTheme);
  if (savedTheme === "light") themeToggle.checked = true;
}

// Toggle theme switcher
if (themeToggle) {
  themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
      body.setAttribute("data-theme", "light");
      localStorage.setItem("portfolio-theme", "light");
    } else {
      body.setAttribute("data-theme", "dark");
      localStorage.setItem("portfolio-theme", "dark");
    }
  });
}

// Theme color switchers (brush icons)
function set_color_purple() {
  document.documentElement.style.setProperty("--accent", "#a259ff");
}

function set_color_red() {
  document.documentElement.style.setProperty("--accent", "#ff6f61");
}

function set_color_green() {
  document.documentElement.style.setProperty("--accent", "#4caf50");
}

function set_color_orange() {
  document.documentElement.style.setProperty("--accent", "#ffa500");
}

function set_color_blue() {
  document.documentElement.style.setProperty("--accent", "#2196f3");
}

// Add any animation triggers or interaction here if needed
