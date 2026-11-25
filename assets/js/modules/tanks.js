/** Mock do painel: níveis dos tanques com pequenas variações simuladas (dados ilustrativos). */
const WARN_LEVEL = 20;
const TICK_MS = 2500;

export function initTanks() {
  const fills = document.querySelectorAll(".tank-fill");
  if (!fills.length) return;

  const setLevel = (fill, level) => {
    const card = fill.closest(".tank-card");
    fill.style.height = `${level}%`;
    card.classList.toggle("warn", level < WARN_LEVEL);
    const value = card.querySelector(".tank-value");
    if (value) value.textContent = `${Math.round(level)}%`;
  };

  requestAnimationFrame(() => fills.forEach((fill) => setLevel(fill, Number(fill.dataset.level))));

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const tick = () => {
    fills.forEach((fill) => {
      const base = Number(fill.dataset.level);
      const jitter = (Math.random() - 0.5) * 4; // ±2 pontos
      setLevel(fill, Math.min(100, Math.max(0, base + jitter)));
    });
  };

  // Só anima enquanto o painel está visível e a aba está ativa.
  const mock = document.querySelector(".dashboard-mock");
  let onScreen = true;
  let timer = null;
  const sync = () => {
    const shouldRun = onScreen && !document.hidden;
    if (shouldRun && !timer) timer = setInterval(tick, TICK_MS);
    if (!shouldRun && timer) { clearInterval(timer); timer = null; }
  };

  if (mock && "IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; sync(); }).observe(mock);
  }
  document.addEventListener("visibilitychange", sync);
  sync();
}
