import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import portalImage from '../assets/images/portal_process.webp';

export const PortalAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Canvas-based mist & particle simulation spanning across the section
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      // Span canvas widely to the left to let mist flow across the steps
      const parentCard = canvas.closest('#process-card-container') || canvas.parentElement;
      const rect = parentCard ? parentCard.getBoundingClientRect() : null;
      
      const targetWidth = rect ? rect.width : (canvas.parentElement?.clientWidth || 700);
      const targetHeight = rect ? rect.height : (canvas.parentElement?.clientHeight || 450);

      canvas.width = targetWidth;
      canvas.height = targetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Sprites pré-renderizados: desenhar uma imagem é muito mais barato que criar
    // um gradiente radial por partícula a cada frame
    const makeSprite = (r: number, g: number, b: number, size: number, stops: [number, number][]) => {
      const sprite = document.createElement('canvas');
      sprite.width = sprite.height = size;
      const sctx = sprite.getContext('2d')!;
      const grad = sctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      stops.forEach(([offset, alpha]) => grad.addColorStop(offset, `rgba(${r}, ${g}, ${b}, ${alpha})`));
      sctx.fillStyle = grad;
      sctx.fillRect(0, 0, size, size);
      return sprite;
    };
    const mistStops: [number, number][] = [[0, 1], [0.45, 0.5], [1, 0]];
    const mistSprites = {
      cyan: makeSprite(0, 240, 255, 128, mistStops),
      sky: makeSprite(56, 189, 248, 128, mistStops),
    };
    const sparkStops: [number, number][] = [[0, 1], [0.3, 0.9], [0.5, 0.35], [1, 0]];
    const sparkSprites = {
      '#00f0ff': makeSprite(0, 240, 255, 32, sparkStops),
      '#ffffff': makeSprite(255, 255, 255, 32, sparkStops),
    };

    let portalCenter = { x: canvas.width * 0.78, y: canvas.height * 0.45 };
    const updatePortalCenter = () => {
      if (containerRef.current) {
        const portalRect = containerRef.current.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        portalCenter = {
          x: portalRect.left - canvasRect.left + portalRect.width * 0.505,
          y: portalRect.top - canvasRect.top + portalRect.height * 0.385,
        };
      }
    };
    updatePortalCenter();
    const handleResize = () => {
      resizeCanvas();
      updatePortalCenter();
    };
    window.removeEventListener('resize', resizeCanvas);
    window.addEventListener('resize', handleResize);

    // Mist particle class
    interface MistParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      maxAlpha: number;
      rotation: number;
      vRot: number;
      life: number;
      maxLife: number;
      scaleSpeed: number;
      sprite: HTMLCanvasElement;
      type: 'vortex' | 'ground' | 'ambient';
    }

    // Spark / Photon particle
    interface SparkParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      life: number;
      maxLife: number;
      sprite: HTMLCanvasElement;
    }

    const mistParticles: MistParticle[] = [];
    const sparkParticles: SparkParticle[] = [];

    // Calculate current portal center relative to the wide canvas
    const getPortalCenter = () => portalCenter;

    const createMist = (type: 'vortex' | 'ground' | 'ambient' = 'vortex'): MistParticle => {
      const center = getPortalCenter();
      let startX: number;
      let startY: number;
      let driftAngle: number;
      let speed: number;
      let maxAlpha: number;
      let maxRadius: number;
      let radius: number;
      let maxLife: number;

      if (type === 'ground') {
        // Neblina rasteira fluindo dos degraus
        startX = center.x + (Math.random() * 50 - 25);
        startY = center.y + 45 + Math.random() * 35;
        driftAngle = Math.PI * 0.98 + (Math.random() * 0.6 - 0.3); // Esquerda ampla
        speed = 0.6 + Math.random() * 0.9;
        radius = 25 + Math.random() * 30;
        maxRadius = 120 + Math.random() * 140;
        maxAlpha = 0.16 + Math.random() * 0.16;
        maxLife = 260 + Math.random() * 200;
      } else if (type === 'ambient') {
        // Neblina que se expande para o alto e se espalha
        startX = center.x + (Math.random() * 60 - 30);
        startY = center.y + (Math.random() * 40 - 20);
        driftAngle = Math.PI * 0.92 + (Math.random() * 1.0 - 0.5);
        speed = 0.5 + Math.random() * 0.8;
        radius = 30 + Math.random() * 35;
        maxRadius = 140 + Math.random() * 160;
        maxAlpha = 0.12 + Math.random() * 0.12;
        maxLife = 280 + Math.random() * 220;
      } else {
        // Neblina saindo diretamente do vórtice do anel do portal
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 24;
        startX = center.x + Math.cos(angle) * dist;
        startY = center.y + Math.sin(angle) * dist;
        driftAngle = Math.PI + (Math.random() * 1.2 - 0.6); // Billow para a esquerda
        speed = 0.7 + Math.random() * 1.1;
        radius = 18 + Math.random() * 22;
        maxRadius = 100 + Math.random() * 130;
        maxAlpha = 0.18 + Math.random() * 0.18;
        maxLife = 240 + Math.random() * 190;
      }

      const isCyan = Math.random() > 0.3;

      return {
        x: startX,
        y: startY,
        vx: Math.cos(driftAngle) * speed - 0.45,
        vy: Math.sin(driftAngle) * 0.35 + (Math.random() - 0.5) * 0.4,
        radius,
        maxRadius,
        alpha: 0,
        maxAlpha,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.009,
        life: 0,
        maxLife,
        scaleSpeed: 0.4 + Math.random() * 0.45,
        sprite: isCyan ? mistSprites.cyan : mistSprites.sky,
        type,
      };
    };

    const createSpark = (): SparkParticle => {
      const center = getPortalCenter();
      const angle = Math.random() * Math.PI * 2;
      const dist = 24 + Math.random() * 8; // Borda do anel
      const speed = 0.4 + Math.random() * 1.4;
      return {
        x: center.x + Math.cos(angle) * dist,
        y: center.y + Math.sin(angle) * dist,
        vx: (Math.random() - 0.75) * speed,
        vy: -0.4 - Math.random() * 0.9,
        size: 1 + Math.random() * 2.2,
        alpha: 0.9,
        life: 0,
        maxLife: 70 + Math.random() * 60,
        sprite: Math.random() > 0.35 ? sparkSprites['#00f0ff'] : sparkSprites['#ffffff'],
      };
    };

    // Pre-população inicial de partículas para efeito imediato
    for (let i = 0; i < 30; i++) {
      const type = i % 3 === 0 ? 'ground' : (i % 3 === 1 ? 'ambient' : 'vortex');
      const m = createMist(type);
      m.life = Math.random() * m.maxLife;
      m.radius += m.scaleSpeed * m.life * 0.5;
      m.x += m.vx * m.life * 0.7;
      m.y += m.vy * m.life * 0.7;
      mistParticles.push(m);
    }

    let frame = 0;
    let running = false;
    let isVisible = false;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = () => {
      if (!running) return;
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn frequente de neblina para volume denso e contínuo
      if (frame % 5 === 0 && mistParticles.length < 50) {
        const type = frame % 3 === 0 ? 'ground' : (frame % 3 === 1 ? 'ambient' : 'vortex');
        mistParticles.push(createMist(type));
      }

      // Spawn de partículas de energia
      if (frame % 4 === 0 && sparkParticles.length < 30) {
        sparkParticles.push(createSpark());
      }

      // Atualização e renderização da neblina
      for (let i = mistParticles.length - 1; i >= 0; i--) {
        const p = mistParticles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.radius = Math.min(p.maxRadius, p.radius + p.scaleSpeed);
        p.rotation += p.vRot;

        const progress = p.life / p.maxLife;
        if (progress < 0.18) {
          p.alpha = (progress / 0.18) * p.maxAlpha;
        } else {
          p.alpha = (1 - (progress - 0.18) / 0.82) * p.maxAlpha;
        }

        if (p.life >= p.maxLife || p.x < -150) {
          mistParticles.splice(i, 1);
          continue;
        }

        // Gradiente radial é simétrico: a rotação não muda o visual, então é dispensada
        ctx.globalAlpha = p.alpha;
        ctx.drawImage(p.sprite, p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2);
      }
      ctx.globalAlpha = 1;

      // Atualização e renderização das fagulhas
      for (let i = sparkParticles.length - 1; i >= 0; i--) {
        const s = sparkParticles[i];
        s.life++;
        s.x += s.vx;
        s.y += s.vy;
        s.alpha = Math.max(0, 1 - s.life / s.maxLife);

        if (s.life >= s.maxLife) {
          sparkParticles.splice(i, 1);
          continue;
        }

        // Sprite com halo embutido substitui o shadowBlur (muito caro no canvas)
        const glow = s.size * 4;
        ctx.globalAlpha = s.alpha;
        ctx.drawImage(s.sprite, s.x - glow, s.y - glow, glow * 2, glow * 2);
      }
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(render);
    };

    // Só anima enquanto o portal está visível e a aba está ativa
    const start = () => {
      if (running || prefersReducedMotion || document.hidden || !isVisible) return;
      running = true;
      updatePortalCenter();
      animationFrameId = requestAnimationFrame(render);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(animationFrameId);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) start();
        else stop();
      },
      { rootMargin: '100px 0px' }
    );
    observer.observe(canvas);

    const handleVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full flex items-center justify-center select-none">
      
      {/* 
        ========================================================================
        PORTAL BASE: Sem bordas duras, tamanho reduzido e fusão total
        ========================================================================
      */}
      <div 
        ref={containerRef}
        className="relative w-[210px] sm:w-[240px] lg:w-[260px] aspect-[4/5] flex items-center justify-center"
      >
        
        {/* Glow de fundo que se espalha para trás */}
        <div className="absolute inset-0 bg-radial from-sky-500/25 to-transparent to-65% rounded-full scale-125 pointer-events-none" />

        {/* Imagem do Portal 100% Sem Bordas com Vignette e Gradientes de Fusão */}
        <div 
          className="relative w-full h-full overflow-hidden"
          style={{
            maskImage: 'radial-gradient(ellipse 90% 90% at 50% 45%, black 45%, rgba(0,0,0,0.85) 65%, transparent 95%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 45%, black 45%, rgba(0,0,0,0.85) 65%, transparent 95%)',
          }}
        >
          <img
            src={portalImage}
            alt="Portal de Processo"
            className="w-full h-full object-cover object-center transform scale-[1.02]"
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
          />

          {/* Gradientes de Fusão Suaves sem Linhas ou Bordas */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#040816] via-transparent to-[#040816]/70 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030612] via-transparent to-[#050b18]/60 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060d1e]/80 via-transparent to-transparent h-12 pointer-events-none" />

          {/* ==================================================================== */}
          {/* ANEL NEON AZUL ANIMADO */}
          {/* ==================================================================== */}
          <div className="absolute top-[38.5%] left-[50.5%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center pointer-events-none">
            
            {/* Pulso de Aura Azul */}
            <motion.div
              animate={{
                scale: [0.9, 1.25, 0.9],
                opacity: [0.6, 0.95, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 bg-[#00b4d8]/40 blur-xl rounded-full"
            />

            {/* Anel Neon Central */}
            <motion.div
              animate={{
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-[2.5px] border-[#00f0ff] shadow-[0_0_22px_#00f0ff,0_0_45px_#00b4d8,inset_0_0_18px_#00f0ff] relative flex items-center justify-center bg-[#01081a]/50"
            >
              {/* Feixe Shimmer de rotação */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="w-full h-full rounded-full border-t-2 border-r-2 border-white/90"
              />

              {/* Núcleo de energia */}
              <motion.div
                animate={{
                  opacity: [0.35, 0.8, 0.35],
                  scale: [0.75, 1.15, 0.75],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute w-6 h-6 rounded-full bg-[#00f0ff]/40 blur-sm"
              />
            </motion.div>

          </div>

          {/* Feixe Vertical de Luz até os degraus */}
          <div className="absolute top-[48%] left-[50.5%] -translate-x-1/2 w-1 h-12 pointer-events-none">
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
                scaleY: [0.9, 1.1, 0.9],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-full h-full bg-gradient-to-b from-[#00f0ff] via-sky-300 to-transparent shadow-[0_0_10px_#00f0ff]"
            />
          </div>

          {/* Impacto de Luz nos Degraus */}
          <motion.div
            animate={{
              scale: [0.85, 1.2, 0.85],
              opacity: [0.55, 0.95, 0.55],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-[57%] left-[50.5%] -translate-x-1/2 w-6 h-3 bg-sky-300 blur-sm rounded-full pointer-events-none"
          />

          {/* Brilho nos degraus de pedra */}
          <motion.div
            animate={{
              opacity: [0.35, 0.75, 0.35],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-36 h-16 bg-sky-500/20 blur-xl rounded-full pointer-events-none"
          />

        </div>

      </div>

      {/* 
        ========================================================================
        CANVAS DE NEBLINA AMPLO
        Cobre toda a extensão horizontal do container para fluir pelo site
        ========================================================================
      */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
        }}
      />

    </div>
  );
};


