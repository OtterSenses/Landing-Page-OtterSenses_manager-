/* OtterSenses Manager — Landing Page (JavaScript puro) */
(function () {
  "use strict";

  // Ano no rodapé
  document.getElementById("ano").textContent = new Date().getFullYear();

  // Navbar com fundo ao rolar
  const navbar = document.getElementById("navbar");
  const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Fecha o menu mobile ao clicar em um link
  const menu = document.getElementById("menu");
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  // Animação de entrada das seções
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("revealed"));
  }

  // Mock do painel: preenche os tanques e simula pequenas variações de leitura
  const tanks = document.querySelectorAll(".tank-fill");
  const setLevel = (fill, level) => {
    fill.style.height = level + "%";
    const value = fill.closest(".tank-card").querySelector(".tank-value");
    if (value) value.textContent = Math.round(level) + "%";
  };
  requestAnimationFrame(() => tanks.forEach((t) => setLevel(t, Number(t.dataset.level))));

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    setInterval(() => {
      tanks.forEach((t) => {
        const base = Number(t.dataset.level);
        const jitter = (Math.random() - 0.5) * 4; // ±2 pontos
        setLevel(t, Math.min(100, Math.max(0, base + jitter)));
      });
    }, 2500);
  }

  // Botões dos planos pré-selecionam o plano no formulário
  const planoSelect = document.getElementById("plano");
  document.querySelectorAll("[data-plan]").forEach((btn) => {
    btn.addEventListener("click", () => { planoSelect.value = btn.dataset.plan; });
  });

  // Formulário de contato
  // Ainda não há back-end: a validação é feita aqui e os dados não são enviados.
  // Para enviar de verdade, troque o bloco marcado abaixo por um fetch() para o endpoint escolhido.
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      form.querySelector(":invalid").focus();
      return;
    }

    // --- ponto de integração com o back-end ---
    // const dados = Object.fromEntries(new FormData(form));
    // await fetch("/api/contato", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dados) });

    form.reset();
    form.classList.remove("was-validated");
    success.classList.remove("d-none");
    setTimeout(() => success.classList.add("d-none"), 6000);
  });
})();
