/** Formulário de contato: validação por campo, máscara de telefone, contador e botões de plano. */

/**
 * Ponto de integração com o back-end.
 * Ainda não existe endpoint: a função apenas simula o envio. Para enviar de verdade,
 * troque o corpo por um fetch() ao serviço escolhido e lance um erro se a resposta falhar.
 * @param {Record<string, string>} _data
 */
async function submitContact(_data) {
  await new Promise((resolve) => setTimeout(resolve, 600));
}

const onlyDigits = (value) => value.replace(/\D/g, "");

function formatPhone(value) {
  const d = onlyDigits(value).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const status = document.getElementById("formStatus");
  const submit = form.querySelector('[type="submit"]');
  const spinner = submit.querySelector(".spinner-border");
  const label = submit.querySelector("[data-label]");
  const phone = form.elements.telefone;
  const message = form.elements.mensagem;
  const counter = form.querySelector("[data-counter]");

  const validateField = (field) => {
    if (field === phone) {
      const digits = onlyDigits(phone.value);
      phone.setCustomValidity(digits && digits.length < 10 ? "Telefone incompleto" : "");
    }
    const valid = field.checkValidity();
    const hasValue = field.type === "checkbox" ? field.checked : field.value.trim() !== "";
    field.classList.toggle("is-invalid", !valid);
    field.classList.toggle("is-valid", valid && hasValue && field.required);
    field.setAttribute("aria-invalid", String(!valid));
    return valid;
  };

  const fields = [...form.elements].filter((el) => el.willValidate);

  // Valida cada campo ao sair dele e, depois de tocado, a cada alteração.
  fields.forEach((field) => {
    field.addEventListener("blur", () => { field.dataset.touched = "1"; validateField(field); });
    const live = () => { if (field.dataset.touched) validateField(field); };
    field.addEventListener("input", live);
    field.addEventListener("change", live);
  });

  phone.addEventListener("input", () => { phone.value = formatPhone(phone.value); });
  message.addEventListener("input", () => { counter.textContent = String(message.value.length); });

  // Botões dos planos pré-selecionam o plano no formulário.
  const planSelect = form.elements.plano;
  document.querySelectorAll("[data-plan]").forEach((button) => {
    button.addEventListener("click", () => {
      planSelect.value = button.dataset.plan;
      planSelect.classList.remove("highlight-pulse");
      void planSelect.offsetWidth; // reinicia a animação
      planSelect.classList.add("highlight-pulse");
    });
  });

  const setStatus = (text, kind) => {
    status.innerHTML = "";
    if (!text) return;
    const box = document.createElement("div");
    box.className = `alert alert-${kind} mb-0`;
    box.textContent = text;
    status.append(box);
  };

  const setBusy = (busy) => {
    submit.disabled = busy;
    spinner.classList.toggle("d-none", !busy);
    label.textContent = busy ? "Enviando…" : "Enviar";
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus("");

    const results = fields.map((field) => { field.dataset.touched = "1"; return validateField(field); });
    if (results.includes(false)) {
      form.querySelector(".is-invalid")?.focus();
      return;
    }

    setBusy(true);
    try {
      await submitContact(Object.fromEntries(new FormData(form)));
      form.reset();
      fields.forEach((field) => {
        delete field.dataset.touched;
        field.classList.remove("is-valid", "is-invalid");
        field.removeAttribute("aria-invalid");
      });
      counter.textContent = "0";
      setStatus("Solicitação enviada com sucesso.", "success");
    } catch {
      setStatus("Não foi possível enviar agora. Tente novamente em instantes.", "danger");
    } finally {
      setBusy(false);
    }
  });
}
