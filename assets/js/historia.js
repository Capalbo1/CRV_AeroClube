// === Animações de entrada na rolagem ===
const elements = document.querySelectorAll('.animate-on-scroll');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));

// === Ver mais / Ver menos (com efeito suave) ===
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('toggle-more')) {
    e.preventDefault();
    const moreText = e.target.previousElementSibling;
    const expanded = moreText.classList.contains('show');

    if (expanded) {
      // recolher suavemente
      moreText.style.maxHeight = moreText.scrollHeight + "px"; // trava altura atual
      requestAnimationFrame(() => {
        moreText.classList.remove('show');
        moreText.style.maxHeight = null; // permite a animação suave ao recolher
      });
      e.target.textContent = "Ver mais";
    } else {
      // expandir suavemente
      moreText.classList.add('show');
      moreText.style.maxHeight = moreText.scrollHeight + "px";
      e.target.textContent = "Ver menos";
    }
  }
});

// === Botão voltar ao topo ===
const btnTopo = document.getElementById("btn-topo");
if (btnTopo) {
  btnTopo.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// === Corrigir links do menu em páginas internas ===
document.querySelectorAll("nav.menu a").forEach(link => {
  const href = link.getAttribute("href");
  if (href && href.startsWith("#")) {
    link.setAttribute("href", "index.html" + href);
  }
});
