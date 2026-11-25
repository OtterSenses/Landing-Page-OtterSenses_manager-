/** Navbar: fundo ao rolar e menu mobile (fecha ao clicar em link, Esc ou clique fora). */
export function initNavbar() {
  const navbar = document.getElementById("navbar");
  const menu = document.getElementById("menu");
  if (!navbar || !menu) return;

  const toggler = navbar.querySelector(".navbar-toggler");
  const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const closeMenu = () => {
    if (menu.classList.contains("show")) {
      window.bootstrap?.Collapse.getOrCreateInstance(menu).hide();
    }
  };

  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("show")) {
      closeMenu();
      toggler?.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (menu.classList.contains("show") && !navbar.contains(event.target)) closeMenu();
  });
}
