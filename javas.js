
  // --------- LÓGICA DA CORTINA ----------
  const curtain = document.getElementById('curtain');
  const hideCurtain = () => {
    curtain.classList.add('hidden');
    // remove do DOM após o fade
    setTimeout(() => curtain.remove(), 700);
  };
  curtain.addEventListener('click', hideCurtain);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') hideCurtain();
  });

 
  // fator de suavização (0 < ease < 1) – mais baixo = movimento mais suave/lento
  const ease = 0.15;

  // rastro opcional (defina para false se não quiser)
  const showTrail = true;
  let lastTrailTime = 0;

  // captura a posição do mouse
  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  }, { passive: true });

  // também posiciona alvo no toque (mobile)
  window.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    targetX = t.clientX;
    targetY = t.clientY;
  }, { passive: true });

  // animação contínua com requestAnimationFrame
  function animate() {
    // "lerp": aproxima a posição atual do alvo
    catX += (targetX - catX) * ease;
    catY += (targetY - catY) * ease;

    // calcula o ângulo para "virar" o gatinho na direção do movimento
    const angle = Math.atan2(targetY - catY, targetX - catX) * 180 / Math.PI;

    // aplica a transformação
    cat.style.transform = translate($,{catX},px, $,{catY},px); rotate($,{angle},deg);

    // rastro: solta um coraçãozinho às vezes
    const now = performance.now();
    if (showTrail && now - lastTrailTime > 90 && (Math.hypot(targetX - catX, targetY - catY) > 8)) {
      lastTrailTime = now;
      const trail = document.createElement('div');
      trail.className = 'trail';
      trail.textContent = '💖';
      trail.style.left = catX + 'px';
      trail.style.top = catY + 'px';
      document.body.appendChild(trail);
      setTimeout(() => trail.remove(), 650);
    }

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  // reposiciona ao redimensionar a janela
  window.addEventListener('resize', () => {
    catX = window.innerWidth / 2;
    catY = window.innerHeight / 2;
    targetX = catX;
    targetY = catY;
  });

  // acessibilidade básica: descrever quando a cortina some (opcional)
  curtain.addEventListener('transitionend', () => {
    // Poderia focar algo do conteúdo aqui, se necessário
  });