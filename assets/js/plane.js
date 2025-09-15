gsap.fromTo("#plane",
  {x: -200, y: 200, scaleX: 1}, // começa fora da tela à esquerda
  {
    x: window.innerWidth + 140, // atravessa até sumir na direita
    y: 150,
    duration: 6,
    ease: "power1.inOut",
    repeat: -1,   // loop infinito
    onRepeat: () => {
      // toda vez que repetir, reseta a posição na esquerda
      gsap.set("#plane", {x: -200});
    }
  }
);