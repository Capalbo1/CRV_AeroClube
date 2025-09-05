/* ========= HERO SLIDE ========= */

// imagens paisagem (desktop)
const HERO_SLIDES_DESKTOP = [
  "assets/img/img2.png",
  "assets/img/img4.png",
  "assets/img/img3.png",
  "assets/img/img7.png",
];

// imagens retrato (mobile)
const HERO_SLIDES_MOBILE = [
  "assets/img/imgfrota2.png",
  "assets/img/imgvoovela16.png",
  "assets/img/imgvoo3.png",
  "assets/img/imgvoovela20.png",
];

// usa retrato até 768px
const HERO_SLIDES = window.innerWidth <= 768 ? HERO_SLIDES_MOBILE : HERO_SLIDES_DESKTOP;

(function initHero(){
  const wrap = document.querySelector(".hero__slides");
  if(!wrap) return;

  // carrega os dois primeiros
  HERO_SLIDES.slice(0, 2).forEach((src, i) => {
    const pane = document.createElement("div");
    pane.className = "hero__slide" + (i === 0 ? " is-active" : "");
    const im = document.createElement("img");
    im.src = src;
    pane.appendChild(im);
    wrap.appendChild(pane);
  });

  // pré-carrega os demais
  HERO_SLIDES.slice(2).forEach(src => { const im = new Image(); im.src = src; });

  let idx = 0;
  setInterval(() => {
    const slides = wrap.querySelectorAll(".hero__slide");
    if (!slides.length) return;
    slides[idx].classList.remove("is-active");
    idx = (idx + 1) % HERO_SLIDES.length;

    if (!slides[idx]) {
      const pane = document.createElement("div");
      pane.className = "hero__slide";
      const im = document.createElement("img");
      im.src = HERO_SLIDES[idx];
      pane.appendChild(im);
      wrap.appendChild(pane);
    }
    wrap.querySelectorAll(".hero__slide")[idx].classList.add("is-active");
  }, 5200);
})();

/* ========= BEM-VINDO — slideshow da direita ========= */
(function initBemVindo(){
  const el = document.querySelector(".bv-slider");
  if(!el) return;
  const imgs = ["assets/img/img1.png","assets/img/img5.png","assets/img/img6.png"];
  imgs.forEach((src,i)=>{
    const im = document.createElement("img");
    im.src = src;
    if (i===0) im.classList.add("is-active");
    el.appendChild(im);
  });
  let i=0;
  setInterval(()=>{
    const list = el.querySelectorAll("img");
    if (!list.length) return;
    list[i].classList.remove("is-active");
    i = (i+1) % list.length;
    list[i].classList.add("is-active");
  }, 3600);
})();

/* ========= HISTÓRIA — slideshow à esquerda ========= */
(function initHistoria(){
  const el = document.querySelector(".hist-slider");
  if(!el) return;
  const imgs = ["assets/img/imghist1.png","assets/img/imghist2.png","assets/img/imghist3.png"];
  imgs.forEach((src,i)=>{
    const im = document.createElement("img");
    im.src = src;
    if(i===0) im.classList.add("is-active");
    el.appendChild(im);
  });
  let i=0;
  setInterval(()=>{
    const list = el.querySelectorAll("img");
    if (!list.length) return;
    list[i].classList.remove("is-active");
    i = (i+1)%list.length;
    list[i].classList.add("is-active");
  }, 3800);
})();

/* ========= INFRA — carrossel de cards ========= */
/* ========= INFRA — carrossel automático ========= */
(function initInfraCarousel(){
  const wrap = document.querySelector(".infra-carousel");
  if(!wrap) return;

  let scrollStep = 1; // velocidade
  let interval;

  function autoScroll(){
    wrap.scrollLeft += scrollStep;
    // reset no fim
    if (wrap.scrollLeft + wrap.clientWidth >= wrap.scrollWidth) {
      wrap.scrollLeft = 0;
    }
  }

  function start(){
    interval = setInterval(autoScroll, 30); // 30ms = ~suave
  }
  function stop(){
    clearInterval(interval);
  }

  start();
  wrap.addEventListener("mouseenter", stop);
  wrap.addEventListener("mouseleave", start);
})();


/* ========= ANIMAÇÕES DE ENTRADA ========= */
(function initAnimations(){
  const sections = Array.from(document.querySelectorAll("main .section, body > .section"))
    .filter(s => s.id !== "hero");

  const childSelectors = [
    ":scope > *",
    ".container > *",
    ".section__head", ".section__head *",
    ".card", ".vcard", ".hist-card", ".contact-card", ".map-card",
    ".grid-2 > *", ".hist-grid > *", ".contact-grid > *",
    ".contact-card__grid > *",
    ".infra-carousel > *", ".infra-card"
  ];

  const targets = new Set();

  sections.forEach(sec => {
    const isBlue = sec.classList.contains("section--blue");
    sec.classList.add("will-anim", isBlue ? "anim-left" : "anim-up");
    targets.add(sec);
    const kids = sec.querySelectorAll(childSelectors.join(","));
    kids.forEach(el => {
      el.classList.add("will-anim", isBlue ? "anim-left" : "anim-up");
      targets.add(el);
    });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in-view");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });

  targets.forEach(t => io.observe(t));
})();

/* ========= FRASES — digitação UMA VEZ ========= */
(function typingQuotesOnce(){
  function placeAndType({selector, insertAfter, text, speed=28, delay=300}) {
    const host = document.querySelector(selector);
    if (!host) return;

    const anchor = host.querySelector(insertAfter) || host.firstElementChild;

    const el = document.createElement('p');
    el.className = 'typing-quote';
    el.setAttribute('aria-live', 'polite');

    if (anchor && anchor.parentNode === host) {
      anchor.after(el);
    } else {
      host.appendChild(el);
    }

    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '▍';
    el.appendChild(cursor);

    let i = 0;
    function tick(){
      if (i < text.length) {
        const tn = (el.firstChild && el.firstChild.nodeType === 3)
          ? el.firstChild
          : el.insertBefore(document.createTextNode(""), cursor);
        tn.nodeValue = text.slice(0, ++i);
        setTimeout(tick, speed);
      } else {
        cursor.classList.add('done');
      }
    }
    setTimeout(tick, delay);
  }

  // 1) Bem-vindo
placeAndType({
  selector: '#type-quote',
  insertAfter: null, // não precisa jogar depois de nada
  text: '“Os céus estão abertos a todos; lá em cima há liberdade.” — Autor desconhecido'
});


  // ⚠️ Frase pré-rodapé NÃO é mais injetada via JS (está fixa no HTML)
})();

/* ========= SLIDERS GENÉRICOS ========= */
(function initGenericSliders(){
  function initSlider(sel, interval=4000){
    const el = document.querySelector(sel);
    if(!el) return;
    const imgs = el.querySelectorAll("img");
    if(!imgs.length) return;

    let i=0;
    setInterval(()=>{
      imgs[i].classList.remove("is-active");
      i = (i+1) % imgs.length;
      imgs[i].classList.add("is-active");
    }, interval);
  }

  initSlider(".sim-slider");
  initSlider(".visita-slider");
  initSlider(".voo-passeio-slider");
  initSlider(".piloto-slider");
})();
