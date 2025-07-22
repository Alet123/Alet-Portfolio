document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");
  const html = document.documentElement;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    html.setAttribute("data-theme", "light");
    toggle.checked = true;
  }

  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      html.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      html.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  });
});
