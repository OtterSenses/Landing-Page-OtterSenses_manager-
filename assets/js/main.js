/* OtterSenses Manager — ponto de entrada da landing page */
import { initFooterYear } from "./modules/footer.js";
import { initNavbar } from "./modules/navbar.js";
import { initScrollSpy } from "./modules/scrollspy.js";
import { initBackToTop } from "./modules/back-to-top.js";
import { initReveal } from "./modules/reveal.js";
import { initTanks } from "./modules/tanks.js";
import { initLightbox } from "./modules/lightbox.js";
import { initContactForm } from "./modules/contact-form.js";

window.__osReady = true;

initFooterYear();
initNavbar();
initScrollSpy();
initBackToTop();
initReveal();
initTanks();
initLightbox();
initContactForm();
