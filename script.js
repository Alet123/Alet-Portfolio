// Theme Toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  toggle.addEventListener('change', () => {
    root.setAttribute('data-theme', toggle.checked ? 'light' : 'dark');
  });
});
