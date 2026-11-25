/** Ampliação de imagens com <dialog>: qualquer botão com [data-lightbox="url"]. */
export function initLightbox() {
  const dialog = document.getElementById("lightbox");
  const triggers = document.querySelectorAll("[data-lightbox]");
  if (!dialog || !triggers.length || typeof dialog.showModal !== "function") return;

  const image = dialog.querySelector("img");
  let opener = null;

  const open = (trigger) => {
    opener = trigger;
    image.src = trigger.dataset.lightbox;
    image.alt = trigger.querySelector("img")?.alt ?? "";
    dialog.showModal();
  };

  triggers.forEach((trigger) => trigger.addEventListener("click", () => open(trigger)));

  dialog.querySelector("[data-close]").addEventListener("click", () => dialog.close());
  // Clique no fundo (fora da imagem) fecha.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    image.removeAttribute("src");
    opener?.focus();
  });
}
