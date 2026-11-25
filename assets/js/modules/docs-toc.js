/** Página de documentos: índice gerado a partir dos títulos e barra de progresso de leitura. */
export function initDocsToc() {
  const article = document.querySelector(".document-content");
  const target = document.getElementById("docToc");

  if (article && target) {
    const headings = [...article.querySelectorAll("section > h3")];
    if (headings.length) {
      const list = document.createElement("ol");
      headings.forEach((heading, index) => {
        if (!heading.id) heading.id = `secao-${index + 1}`;
        // O número já faz parte do texto do título ("1. Objetivo..."): o <ol> não repete.
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent.replace(/^\d+\.\s*/, "");
        item.append(link);
        list.append(item);
      });
      target.append(list);
    }
  }

  const bar = document.getElementById("readProgress");
  if (bar && article) {
    const update = () => {
      const rect = article.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const done = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      bar.style.width = `${done * 100}%`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }
}
