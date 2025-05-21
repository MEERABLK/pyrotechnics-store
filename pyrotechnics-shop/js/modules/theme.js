export function theme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  document.querySelectorAll(".theme-switch").forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedTheme = btn.getAttribute("data-theme");
      document.documentElement.setAttribute("data-theme", selectedTheme);
    
      localStorage.setItem("theme", selectedTheme);
    });
  });
}
