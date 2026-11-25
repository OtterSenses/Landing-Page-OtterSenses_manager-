/** Preenche o ano corrente nos elementos [data-year]. */
export function initFooterYear() {
  const year = String(new Date().getFullYear());
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = year;
  });
}
