// === Animações scroll ===
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

// === Botão voltar ao topo ===
const btnTopo = document.getElementById("btn-topo");
if (btnTopo) {
  btnTopo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// === Corrigir links internos ===
window.addEventListener("load", () => {
  document.querySelectorAll("nav a").forEach(link => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      link.setAttribute("href", "index.html" + href);
    }
  });
});

// === Slider automático (padrão da home) ===
function initGenericSliders(selector) {
  document.querySelectorAll(selector).forEach(slider => {
    const imgs = slider.querySelectorAll("img");
    let idx = 0;

    function showSlide(i) {
      imgs.forEach((img, j) => {
        img.classList.toggle("is-active", j === i);
      });
    }

    showSlide(idx);
    setInterval(() => {
      idx = (idx + 1) % imgs.length;
      showSlide(idx);
    }, 4000); // troca a cada 4s
  });
}

// aplica aos sliders do voo a vela
window.addEventListener("DOMContentLoaded", () => {
  initGenericSliders(".slider");
});

// === Widget de clima (OpenWeather) ===
async function carregarClima() {
  const widget = document.getElementById("weather");
  if (!widget) return;

  let lat, lon;
  try {
    // tenta pegar localização do usuário
    const pos = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 })
    );
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
  } catch (e) {
    // fallback = Tatuí
    lat = -23.355;
    lon = -47.856;
  }

  const apiKey = "85eb4d6e6f1ebf7bd7a69ef0b58c8fa5"; // substitua pela sua chave da OpenWeather
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;

  try {
    const resp = await fetch(url);
    const data = await resp.json();

    if (resp.ok) {
widget.innerHTML = `
  <div class="weather-content">
    <h3>Clima em ${data.name}</h3>
    <div class="weather-main">
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
      <div>
        <div class="temp">${Math.round(data.main.temp)}°C</div>
        <div class="desc">${data.weather[0].description}</div>
      </div>
    </div>
    <div class="info">
      Sensação: ${Math.round(data.main.feels_like)}°C ·
      Umidade: ${data.main.humidity}%
    </div>
  </div>
`;



      // deixa o card clicável para abrir previsão completa
      widget.style.cursor = "pointer";
      widget.onclick = () => {
        window.open(`https://openweathermap.org/city/${data.id}`, "_blank");
      };
    } else {
      widget.innerHTML = `<h3>Clima em Tatuí</h3><p>Não foi possível carregar os dados do clima.</p>`;
    }
  } catch (err) {
    widget.innerHTML = `<h3>Clima em Tatuí</h3><p>Erro ao carregar clima.</p>`;
  }
}

document.addEventListener("DOMContentLoaded", carregarClima);
