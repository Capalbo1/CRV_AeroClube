// ===== CONFIG =====
const WHATSAPP = "55XXXXXXXXXXX"; // DDI+DDD+NÚMERO (só dígitos)

// ===== Helpers =====
function waLink(assunto) {
  const txt = `Olá! Vim pelo site do Aeroclube e gostaria de: ${assunto}.`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}`;
}

// Preencher links com data-wa
function hydrateWA() {
  document.querySelectorAll("[data-wa]").forEach(a => {
    const assunto = a.getAttribute("data-wa");
    a.href = waLink(assunto || "Falar com atendimento");
    a.target = "_blank";
    a.rel = "noopener";
  });
}

// Incluir header/footer
async function include(partial, sel) {
  const el = document.querySelector(sel);
  if (!el) return;
  const res = await fetch(partial);
  el.innerHTML = await res.text();
}

// Menu mobile + ano no rodapé
function wireGlobal() {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const nav = document.querySelector("[data-nav]");
  const burger = document.querySelector("[data-burger]");

  if (burger && nav) {
    // garante que o menu inicie fechado no mobile
    if (window.innerWidth <= 768) {
      nav.classList.remove("is-open");
    }

    burger.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        nav.classList.toggle("is-open");
      }
    });

    // ao clicar em um link, fecha o menu (apenas no mobile)
    nav.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          nav.classList.remove("is-open");
        }
      })
    );
  }

  hydrateWA();
}

// Boot
(async function () {
  await include("components/header.html", "#header-slot");
  await include("components/footer.html", "#footer-slot");
  wireGlobal();
})();
