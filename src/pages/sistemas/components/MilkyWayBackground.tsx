import React, { useEffect, useRef } from 'react';
import { runCanvasLoop, getGlowSprite } from '../lib/canvasLoop';
import milkyWayCoreImage from '../assets/images/milky_way_core.webp';
import milkyWayDeepSpaceImage from '../assets/images/milky_way_deep_space.webp';

interface MilkyWayBackgroundProps {
  variant?: 'core' | 'deep-space' | 'nebula' | 'constellation';
  density?: 'dense' | 'normal' | 'light';
  showShootingStars?: boolean;
  showConstellations?: boolean;
  showCoordinates?: boolean;
  coordinates?: string;
  className?: string;
  imageOpacity?: number;
  glowIntensity?: 'high' | 'medium' | 'subtle';
}

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  color: string;
  isSpectralMajor?: boolean;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
  color: string;
}

export const MilkyWayBackground: React.FC<MilkyWayBackgroundProps> = ({
  variant = 'core',
  density = 'normal',
  showShootingStars = true,
  showConstellations = true,
  showCoordinates = false,
  coordinates = 'RA 17h 45.6m | DEC -29° 00′ // DEEP SPACE MATRIX',
  className = '',
  imageOpacity = 0.4,
  glowIntensity = 'medium',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Pick background image based on variant
  const bgImage = variant === 'core' || variant === 'constellation' 
    ? milkyWayCoreImage 
    : milkyWayDeepSpaceImage;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    // Astronomical star spectral colors: O (deep blue), B (cyan-blue), A (pure white), F (yellow-white), K/M (warm gold/amber)
    const starColors = [
      '#ffffff', // Class A
      '#e0f2fe', // Class B
      '#a5f3fc', // Class O/B (Cyan)
      '#38bdf8', // Deep Cyan/Sky
      '#93c5fd', // Sapphire
      '#fed7aa', // Warm Amber (Giant)
    ];

    interface DrawStar extends Star {
      sprite: HTMLCanvasElement;
      drawSize: number;
    }

    let stars: DrawStar[] = [];
    // As estrelas não se movem: os pares da constelação são calculados uma vez só
    let constellationPairs: [DrawStar, DrawStar, number][] = [];

    const initStars = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      stars = [];
      const densityDivisor = density === 'dense' ? 3800 : density === 'light' ? 9000 : 5500;
      const starCount = Math.min(450, Math.floor((width * height) / densityDivisor));

      for (let i = 0; i < starCount; i++) {
        const isMajor = Math.random() < 0.08;
        const baseAlpha = isMajor ? Math.random() * 0.4 + 0.6 : Math.random() * 0.5 + 0.2;
        const radius = isMajor ? Math.random() * 1.6 + 1.2 : Math.random() * 0.9 + 0.35;
        const color = starColors[Math.floor(Math.random() * starColors.length)];
        const glow = isMajor ? 8 : radius > 1 ? 3 : 0;
        const sprite = getGlowSprite(color, glow);
        // o núcleo sólido do sprite ocupa uma fração do raio; escala para bater com o raio da estrela
        const coreFraction = glow ? Math.max(0.12, 0.5 - glow * 0.04) : 0.5;

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          alpha: baseAlpha,
          baseAlpha,
          twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
          color,
          isSpectralMajor: isMajor,
          sprite,
          drawSize: (radius / coreFraction) * 2,
        });
      }

      constellationPairs = [];
      if (showConstellations) {
        const majorStars = stars.filter((s) => s.isSpectralMajor);
        for (let i = 0; i < majorStars.length; i++) {
          for (let j = i + 1; j < majorStars.length; j++) {
            const dx = majorStars[i].x - majorStars[j].x;
            const dy = majorStars[i].y - majorStars[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 140) constellationPairs.push([majorStars[i], majorStars[j], 1 - dist / 140]);
          }
        }
      }
    };

    initStars();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initStars, 150);
    };
    window.addEventListener('resize', handleResize);

    // Shooting stars / Meteors
    const shootingStars: ShootingStar[] = [];
    const meteorColors = ['#a5f3fc', '#ffffff', '#38bdf8', '#818cf8'];
    let meteorTimer = 0;

    const createShootingStar = () => {
      if (!showShootingStars) return;
      if (Math.random() < 0.4 && shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * (width * 0.85),
          y: Math.random() * (height * 0.45),
          length: Math.random() * 90 + 45,
          speed: Math.random() * 7 + 5,
          angle: (Math.PI / 4) + (Math.random() * 0.25 - 0.12),
          alpha: 1,
          active: true,
          color: meteorColors[Math.floor(Math.random() * meteorColors.length)],
        });
      }
    };

    const render = (dt: number) => {
      ctx.clearRect(0, 0, width, height);

      // meteoros nascem a cada ~2.6s de animação (só conta enquanto visível)
      meteorTimer += dt;
      if (meteorTimer > 156) {
        meteorTimer = 0;
        createShootingStar();
      }

      // 1. Draw subtle constellation linkages between proximate major stars
      if (constellationPairs.length > 0) {
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = 'rgb(34, 211, 238)';
        for (const [a, b, closeness] of constellationPairs) {
          ctx.globalAlpha = closeness * 0.12 * Math.min(a.alpha, b.alpha);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // 2. Draw stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.alpha += star.twinkleSpeed * dt;
        if (star.alpha > 0.95 || star.alpha < 0.15) {
          star.twinkleSpeed = -star.twinkleSpeed;
          star.alpha = Math.max(0.15, Math.min(0.95, star.alpha));
        }

        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
        const half = star.drawSize / 2;
        ctx.drawImage(star.sprite, star.x - half, star.y - half, star.drawSize, star.drawSize);

        // Major star four-point diffraction flare
        if (star.isSpectralMajor && star.alpha > 0.65) {
          ctx.strokeStyle = star.color;
          ctx.globalAlpha = (star.alpha - 0.65) * 0.5;
          ctx.lineWidth = 0.5;
          const flareLen = star.radius * 3.5;
          ctx.beginPath();
          ctx.moveTo(star.x - flareLen, star.y);
          ctx.lineTo(star.x + flareLen, star.y);
          ctx.moveTo(star.x, star.y - flareLen);
          ctx.lineTo(star.x, star.y + flareLen);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      // 3. Draw shooting stars (um traço largo e translúcido por baixo faz o papel do shadowBlur)
      if (showShootingStars) {
        for (let i = shootingStars.length - 1; i >= 0; i--) {
          const s = shootingStars[i];
          if (!s.active) {
            shootingStars.splice(i, 1);
            continue;
          }

          const tailX = s.x - Math.cos(s.angle) * s.length;
          const tailY = s.y - Math.sin(s.angle) * s.length;

          const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
          gradient.addColorStop(0, 'rgba(56, 189, 248, 0)');
          gradient.addColorStop(0.7, `rgba(165, 243, 252, ${s.alpha * 0.5})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, ${s.alpha})`);

          ctx.lineCap = 'round';
          ctx.strokeStyle = gradient;
          ctx.globalAlpha = 0.25;
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(s.x, s.y);
          ctx.stroke();
          ctx.globalAlpha = 1;
          ctx.lineWidth = 1.6;
          ctx.stroke();

          s.x += Math.cos(s.angle) * s.speed * dt;
          s.y += Math.sin(s.angle) * s.speed * dt;
          s.alpha -= 0.011 * dt;

          if (s.alpha <= 0 || s.x > width || s.y > height) {
            s.active = false;
          }
        }
      }
    };

    render(0);
    const stopLoop = runCanvasLoop(canvas, render, 30);

    return () => {
      stopLoop();
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [density, showShootingStars, showConstellations]);

  const glowBlurClass = glowIntensity === 'high' ? 'opacity-75' : glowIntensity === 'subtle' ? 'opacity-35' : 'opacity-55';

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}>
      
      {/* 1. Milky Way Astrophotography Backdrop with Screen Blend */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Deep Space Cosmos Infrastructure Starfield"
          referrerPolicy="no-referrer"
          style={{ opacity: imageOpacity }}
          className="w-full h-full object-cover object-center mix-blend-screen scale-[1.03] transition-opacity duration-1000"
        />
        
        {/* Deep vignetting & space edge gradient masks to ensure high contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-[#050608]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050608]/85 via-transparent to-[#050608]/85" />
        <div className="absolute inset-0 bg-radial-vignette opacity-70" />
      </div>

      {/* 2. Interactive Starfield & Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 w-full h-full will-change-transform"
      />

      {/* 3. Luminous Milky Way Nebula Dust & Cosmic Auroras */}
      <div className={`absolute -top-32 right-1/4 w-[650px] h-[380px] bg-radial from-cyan-500/20 via-blue-700/10 to-transparent to-65% rounded-full animate-float-orb-1 ${glowBlurClass}`} />
      <div className={`absolute top-1/3 -left-32 w-[550px] h-[550px] bg-radial from-indigo-900/25 via-cyan-500/15 to-transparent to-65% rounded-full animate-float-orb-2 ${glowBlurClass}`} />
      <div className={`absolute bottom-0 right-10 w-[500px] h-[400px] bg-radial from-cyan-600/15 via-blue-900/10 to-transparent to-65% rounded-full ${glowBlurClass}`} />

      {/* 4. Astrometric Coordinates HUD overlay (Optional) */}
      {showCoordinates && (
        <div className="absolute top-4 right-6 z-20 hidden md:flex items-center gap-2 text-[9px] font-mono tracking-widest text-cyan-400/40 uppercase pointer-events-none select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-ping"></span>
          <span>{coordinates}</span>
        </div>
      )}

      {/* 5. Subtle Interstellar Horizon Edge Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.3)]" />
    </div>
  );
};
