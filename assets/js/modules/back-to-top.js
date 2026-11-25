/** Botão flutuante "voltar ao topo", exibido após rolar a página. */
export function initBackToTop() {
  const button = document.getElementById("backTop");
  if (!button) return;

  const onScroll = () => button.classList.toggle("visible", window.scrollY > 600);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0 });
    document.getElementById("inicio")?.setAttribute("tabindex", "-1");
    document.getElementById("inicio")?.focus({ preventScroll: true });
  });
}
