/** Marca no menu a seção visível (aria-current + .active) sem depender do scrollspy do Bootstrap. */
export function initScrollSpy() {
  const links = [...document.querySelectorAll('#menu .nav-link[href^="#"]')];
  if (!links.length || !("IntersectionObserver" in window)) return;

  const byId = new Map();
  links.forEach((link) => {
    const section = document.getElementById(link.hash.slice(1));
    if (section) byId.set(section.id, link);
  });

  const setActive = (id) => {
    links.forEach((link) => {
      const active = byId.get(id) === link;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  };

  // A "faixa ativa" é uma linha fina no meio da janela de visualização.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -54% 0px" }
  );
  // Observa todas as seções (inclusive as fora do menu) para limpar o destaque ao passar por elas.
  document.querySelectorAll("main section[id], header[id]").forEach((el) => observer.observe(el));

  // No topo da página nenhum item fica ativo.
  window.addEventListener(
    "scroll",
    () => { if (window.scrollY < 80) setActive(""); },
    { passive: true }
  );
}
