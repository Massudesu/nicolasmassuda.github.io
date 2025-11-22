
  // LÓGICA DA CORTINA 
  const curtain = document.getElementById('curtain');
  const hideCurtain = () => {
    curtain.classList.add('hidden');

    setTimeout(() => curtain.remove(), 700);
  };
  curtain.addEventListener('click', hideCurtain);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') hideCurtain();
  });

 

  const ease = 0.15;


  const showTrail = true;
  let lastTrailTime = 0;


  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    targetX = t.clientX;
    targetY = t.clientY;
  }, { passive: true });

  function animate() {

    catX += (targetX - catX) * ease;
    catY += (targetY - catY) * ease;

  
    const angle = Math.atan2(targetY - catY, targetX - catX) * 180 / Math.PI;

    cat.style.transform = translate($,{catX},px, $,{catY},px); rotate($,{angle},deg);


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

  window.addEventListener('resize', () => {
    catX = window.innerWidth / 2;
    catY = window.innerHeight / 2;
    targetX = catX;
    targetY = catY;
  });


  curtain.addEventListener('transitionend', () => {
  
  });
  document.querySelectorAll('.imagens').forEach(image => {
    image.addEventListener('click', () => {
      image.style.backgroundColor = image.style.backgroundColor === 'rgb(255, 99, 71)' ? '#000000ff' : 'rgb(255, 99, 71)';
    });
  });
