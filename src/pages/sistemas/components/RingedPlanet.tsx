import React, { useState } from 'react';
import { Sparkles, Orbit, RotateCw, Globe2, ShieldCheck, Zap } from 'lucide-react';

export type PlanetColorTheme = 'cyan' | 'indigo' | 'amber' | 'emerald';

interface RingedPlanetProps {
  size?: number; // overall bounding box in px
  planetColor?: PlanetColorTheme;
  showTelemetry?: boolean;
  showMoons?: boolean;
  className?: string;
  interactive?: boolean;
  speedControl?: boolean;
}

export const RingedPlanet: React.FC<RingedPlanetProps> = ({
  size = 280,
  planetColor = 'cyan',
  showTelemetry = true,
  showMoons = true,
  className = '',
  interactive = true,
  speedControl = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFastRotation, setIsFastRotation] = useState(false);

  // Photographic & Scientific-grade Color Themes
  const themes = {
    cyan: {
      name: 'Oxys Prime',
      type: 'Gigante Gasoso Criogênico',
      globeRadial: 'radial-gradient(circle at 28% 26%, #e0f7fa 0%, #38bdf8 22%, #0284c7 45%, #0369a1 60%, #082f49 78%, #020617 96%)',
      atmosphereHaze: 'rgba(56, 189, 248, 0.4)',
      coronaGlow: 'rgba(6, 182, 212, 0.35)',
      ringGlowColor: 'rgba(34, 211, 238, 0.5)',
      ringOuterAlpha: 'rgba(56, 189, 248, 0.75)',
      ringMidAlpha: 'rgba(14, 165, 233, 0.95)',
      ringInnerAlpha: 'rgba(186, 230, 253, 0.4)',
      ringTextureConic: `conic-gradient(
        from 0deg,
        rgba(56, 189, 248, 0.85) 0deg,
        rgba(14, 165, 233, 0.4) 45deg,
        rgba(186, 230, 253, 0.9) 90deg,
        rgba(2, 132, 199, 0.5) 135deg,
        rgba(56, 189, 248, 0.85) 180deg,
        rgba(14, 165, 233, 0.45) 225deg,
        rgba(186, 230, 253, 0.95) 270deg,
        rgba(2, 132, 199, 0.5) 315deg,
        rgba(56, 189, 248, 0.85) 360deg
      )`,
      moon1: 'bg-cyan-200 shadow-[0_0_12px_#22d3ee]',
      moon2: 'bg-sky-400 shadow-[0_0_8px_#38bdf8]',
      accentColor: 'text-cyan-400',
      badgeBorder: 'border-cyan-500/30 text-cyan-300 bg-cyan-950/70',
    },
    indigo: {
      name: 'Oxys Nebula',
      type: 'Gigante de Hidrogênio Nobre',
      globeRadial: 'radial-gradient(circle at 28% 26%, #f3e8ff 0%, #c084fc 22%, #9333ea 45%, #6b21a8 60%, #3b0764 78%, #030712 96%)',
      atmosphereHaze: 'rgba(192, 132, 252, 0.4)',
      coronaGlow: 'rgba(168, 85, 247, 0.35)',
      ringGlowColor: 'rgba(192, 132, 252, 0.5)',
      ringOuterAlpha: 'rgba(192, 132, 252, 0.75)',
      ringMidAlpha: 'rgba(168, 85, 247, 0.95)',
      ringInnerAlpha: 'rgba(233, 213, 255, 0.4)',
      ringTextureConic: `conic-gradient(
        from 0deg,
        rgba(192, 132, 252, 0.85) 0deg,
        rgba(147, 51, 234, 0.4) 45deg,
        rgba(233, 213, 255, 0.9) 90deg,
        rgba(107, 33, 168, 0.5) 135deg,
        rgba(192, 132, 252, 0.85) 180deg,
        rgba(147, 51, 234, 0.45) 225deg,
        rgba(233, 213, 255, 0.95) 270deg,
        rgba(107, 33, 168, 0.5) 315deg,
        rgba(192, 132, 252, 0.85) 360deg
      )`,
      moon1: 'bg-purple-200 shadow-[0_0_12px_#c084fc]',
      moon2: 'bg-indigo-400 shadow-[0_0_8px_#818cf8]',
      accentColor: 'text-purple-400',
      badgeBorder: 'border-purple-500/30 text-purple-300 bg-purple-950/70',
    },
    amber: {
      name: 'Oxys Helios',
      type: 'Proto-Planeta em Atividade Térmica',
      globeRadial: 'radial-gradient(circle at 28% 26%, #fef3c7 0%, #fbbf24 22%, #d97706 45%, #b45309 60%, #451a03 78%, #030712 96%)',
      atmosphereHaze: 'rgba(251, 191, 36, 0.4)',
      coronaGlow: 'rgba(245, 158, 11, 0.35)',
      ringGlowColor: 'rgba(251, 191, 36, 0.5)',
      ringOuterAlpha: 'rgba(251, 191, 36, 0.75)',
      ringMidAlpha: 'rgba(245, 158, 11, 0.95)',
      ringInnerAlpha: 'rgba(254, 240, 138, 0.4)',
      ringTextureConic: `conic-gradient(
        from 0deg,
        rgba(251, 191, 36, 0.85) 0deg,
        rgba(217, 119, 6, 0.4) 45deg,
        rgba(254, 240, 138, 0.9) 90deg,
        rgba(180, 83, 9, 0.5) 135deg,
        rgba(251, 191, 36, 0.85) 180deg,
        rgba(217, 119, 6, 0.45) 225deg,
        rgba(254, 240, 138, 0.95) 270deg,
        rgba(180, 83, 9, 0.5) 315deg,
        rgba(251, 191, 36, 0.85) 360deg
      )`,
      moon1: 'bg-amber-200 shadow-[0_0_12px_#fcd34d]',
      moon2: 'bg-orange-400 shadow-[0_0_8px_#fb923c]',
      accentColor: 'text-amber-400',
      badgeBorder: 'border-amber-500/30 text-amber-300 bg-amber-950/70',
    },
    emerald: {
      name: 'Oxys Terra-X',
      type: 'Bio-Esfera Quântica Exoplanetária',
      globeRadial: 'radial-gradient(circle at 28% 26%, #d1fae5 0%, #34d399 22%, #059669 45%, #047857 60%, #064e3b 78%, #022c22 96%)',
      atmosphereHaze: 'rgba(52, 211, 153, 0.4)',
      coronaGlow: 'rgba(16, 185, 129, 0.35)',
      ringGlowColor: 'rgba(52, 211, 153, 0.5)',
      ringOuterAlpha: 'rgba(52, 211, 153, 0.75)',
      ringMidAlpha: 'rgba(16, 185, 129, 0.95)',
      ringInnerAlpha: 'rgba(167, 243, 208, 0.4)',
      ringTextureConic: `conic-gradient(
        from 0deg,
        rgba(52, 211, 153, 0.85) 0deg,
        rgba(5, 150, 105, 0.4) 45deg,
        rgba(167, 243, 208, 0.9) 90deg,
        rgba(4, 120, 87, 0.5) 135deg,
        rgba(52, 211, 153, 0.85) 180deg,
        rgba(5, 150, 105, 0.45) 225deg,
        rgba(167, 243, 208, 0.95) 270deg,
        rgba(4, 120, 87, 0.5) 315deg,
        rgba(52, 211, 153, 0.85) 360deg
      )`,
      moon1: 'bg-emerald-200 shadow-[0_0_12px_#6ee7b7]',
      moon2: 'bg-teal-400 shadow-[0_0_8px_#2dd4bf]',
      accentColor: 'text-emerald-400',
      badgeBorder: 'border-emerald-500/30 text-emerald-300 bg-emerald-950/70',
    },
  };

  const theme = themes[planetColor] || themes.cyan;

  // Geometry dimensions in px
  const globeDiameter = size * 0.48; // e.g. ~125px for 260px container
  const ringDiameter = size * 1.18;  // e.g. ~306px for 260px container
  const ringHeight = size * 0.35;    // for perspective thickness

  // Speed class
  const ringAnimationClass = (isFastRotation || (isHovered && interactive)) 
    ? 'animate-horizontal-ring-fast' 
    : 'animate-horizontal-ring';

  return (
    <div 
      className={`relative select-none flex flex-col items-center justify-center ${className}`}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      style={{ width: size, height: size }}
    >
      {/* =========================================================================
          1. DEEP ATMOSPHERIC CORONA & LIMB HAZE (Rayleigh Scattering)
          ========================================================================= */}
      <div 
        className="absolute rounded-full blur-3xl pointer-events-none transition-all duration-700"
        style={{
          width: globeDiameter * 1.8,
          height: globeDiameter * 1.8,
          backgroundColor: theme.coronaGlow,
          opacity: isHovered ? 0.95 : 0.65,
          transform: isHovered ? 'scale(1.2)' : 'scale(1)',
        }}
      />

      {/* =========================================================================
          2. OUTER SATELLITE MOON TRAILS (3D Inclined Elliptical Orbit)
          ========================================================================= */}
      {showMoons && (
        <>
          {/* Moon 1: Fast Equatorial Trail */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              animation: (isFastRotation || isHovered) ? 'spin 10s linear infinite' : 'spin 22s linear infinite',
            }}
          >
            <div 
              className={`absolute top-3 left-8 w-3 h-3 rounded-full ${theme.moon1} transition-transform duration-300`}
              style={{ transform: isHovered ? 'scale(1.3)' : 'scale(1)' }}
            />
          </div>

          {/* Moon 2: Inclined Outer Moon */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              animation: 'spin-reverse 34s linear infinite',
              transform: 'rotateX(42deg) rotateY(18deg)',
            }}
          >
            <div 
              className={`absolute bottom-4 right-10 w-2 h-2 rounded-full ${theme.moon2}`}
            />
          </div>
        </>
      )}

      {/* =========================================================================
          3. STAGE CONTAINER WITH 3D PERSPECTIVE PRESERVATION
          ========================================================================= */}
      <div 
        className="relative flex items-center justify-center preserve-3d"
        style={{ width: size, height: size }}
      >

        {/* -----------------------------------------------------------------------
            A. REAR HALF OF THE HORIZONTAL ROTATING RINGS (Behind Planet Sphere, z-index: 1)
            ----------------------------------------------------------------------- */}
        <div 
          className={`absolute pointer-events-none ${ringAnimationClass}`}
          style={{
            width: ringDiameter,
            height: ringDiameter,
            zIndex: 1,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Perfectly Round Saturnian Disc Structure */}
          <div 
            className="w-full h-full rounded-full relative overflow-hidden"
            style={{
              boxShadow: `0 0 35px ${theme.ringGlowColor}, inset 0 0 25px ${theme.ringGlowColor}`,
            }}
          >
            {/* Multi-layered Concentric Planetary Rings: Ring A, Cassini Division, Ring B, Ring C */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(
                  circle closest-side,
                  transparent 0%,
                  transparent 54%,
                  ${theme.ringInnerAlpha} 55%,
                  ${theme.ringMidAlpha} 66%,
                  rgba(0, 0, 0, 0.95) 67%,
                  rgba(0, 0, 0, 0.95) 70%,
                  ${theme.ringOuterAlpha} 71%,
                  rgba(255, 255, 255, 0.6) 78%,
                  ${theme.ringOuterAlpha} 86%,
                  rgba(0, 0, 0, 0.8) 87%,
                  ${theme.ringInnerAlpha} 91%,
                  transparent 95%
                )`,
              }}
            />

            {/* Fine Radial Grain & Rotating Particle Spokes Pattern */}
            <div 
              className="absolute inset-0 rounded-full opacity-40 mix-blend-overlay"
              style={{
                background: theme.ringTextureConic,
              }}
            />

            {/* Shepherd Moon inside the Cassini Division Gap */}
            <div 
              className="absolute top-1/2 left-4 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#fff]"
            />
          </div>

          {/* Planet's Shadow Cast onto the Rear Rings (Dark elliptical occlusion) */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: globeDiameter * 1.25,
              height: globeDiameter * 1.5,
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.8) 50%, transparent 85%)',
              transform: 'translateY(-20px) rotate(8deg)',
              zIndex: 3,
            }}
          />
        </div>

        {/* -----------------------------------------------------------------------
            B. REALISTIC PLANETARY SPHERE GLOBE (Middle Layer, z-index: 5)
            ----------------------------------------------------------------------- */}
        <div 
          className="relative rounded-full overflow-hidden shadow-2xl animate-float-planet transition-transform duration-500 cursor-pointer"
          style={{
            width: globeDiameter,
            height: globeDiameter,
            zIndex: 5,
            transform: isHovered ? 'scale(1.06)' : 'scale(1)',
            boxShadow: `
              inset -22px -22px 35px rgba(0, 0, 0, 0.98),
              inset 8px 8px 18px rgba(255, 255, 255, 0.5),
              0 0 35px ${theme.coronaGlow}
            `,
          }}
          onClick={() => speedControl && setIsFastRotation(!isFastRotation)}
          title={speedControl ? "Clique para alternar velocidade de rotação" : undefined}
        >
          {/* 1. Base Spherical Gas Giant Radial Gradient */}
          <div 
            className="w-full h-full transition-all duration-700"
            style={{
              background: theme.globeRadial,
            }}
          />

          {/* 2. Realistic Zonal Latitudinal Cloud Striations (Atmospheric flow) */}
          <div 
            className="absolute inset-0 opacity-45 mix-blend-overlay pointer-events-none animate-planet-atmosphere"
            style={{
              backgroundImage: `repeating-linear-gradient(
                -4deg,
                transparent,
                transparent 6px,
                rgba(255, 255, 255, 0.35) 6px,
                rgba(255, 255, 255, 0.35) 12px,
                rgba(0, 0, 0, 0.38) 12px,
                rgba(0, 0, 0, 0.38) 18px
              )`,
              backgroundSize: '200% 100%',
            }}
          />

          {/* 3. Secondary Fine Weather Bands (High Altitude Storms) */}
          <div 
            className="absolute inset-0 opacity-30 mix-blend-soft-light pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(
                -2deg,
                rgba(255, 255, 255, 0.6) 0px,
                transparent 4px,
                transparent 14px,
                rgba(0, 0, 0, 0.5) 18px
              )`,
            }}
          />

          {/* 4. Photorealistic Night-side Terminator & Specular Horizon Rayleigh Falloff */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 28% 26%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 45%, transparent 60%, rgba(1, 4, 14, 0.98) 82%)',
            }}
          />

          {/* 5. Sharp Equatorial Shadow of the Horizontal Rings Cast onto Planet Surface */}
          <div 
            className="absolute top-1/2 left-0 right-0 h-5 -translate-y-1/2 bg-black/85 blur-[1.5px] pointer-events-none"
            style={{
              transform: 'rotate(-4deg) scaleY(0.75)',
            }}
          />
        </div>

        {/* -----------------------------------------------------------------------
            C. FRONT HALF OF THE HORIZONTAL ROTATING RINGS (Front Layer, z-index: 10)
            ----------------------------------------------------------------------- */}
        <div 
          className={`absolute pointer-events-none overflow-hidden ${ringAnimationClass}`}
          style={{
            width: ringDiameter,
            height: ringDiameter,
            zIndex: 10,
            transformStyle: 'preserve-3d',
            clipPath: 'polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)', // Only displays the front horizontal arc!
          }}
        >
          {/* Perfectly Round Saturnian Disc (Front Portion) */}
          <div 
            className="w-full h-full rounded-full relative overflow-hidden"
            style={{
              boxShadow: `0 0 35px ${theme.ringGlowColor}, inset 0 0 25px ${theme.ringGlowColor}`,
            }}
          >
            {/* Synchronized Concentric Ring Layers */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(
                  circle closest-side,
                  transparent 0%,
                  transparent 54%,
                  ${theme.ringInnerAlpha} 55%,
                  ${theme.ringMidAlpha} 66%,
                  rgba(0, 0, 0, 0.95) 67%,
                  rgba(0, 0, 0, 0.95) 70%,
                  ${theme.ringOuterAlpha} 71%,
                  rgba(255, 255, 255, 0.6) 78%,
                  ${theme.ringOuterAlpha} 86%,
                  rgba(0, 0, 0, 0.8) 87%,
                  ${theme.ringInnerAlpha} 91%,
                  transparent 95%
                )`,
              }}
            />

            {/* Synchronized Radial Grain & Ice Shimmer Pattern */}
            <div 
              className="absolute inset-0 rounded-full opacity-40 mix-blend-overlay"
              style={{
                background: theme.ringTextureConic,
              }}
            />

            {/* Front Shepherd Moon */}
            <div 
              className="absolute top-1/2 left-4 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#fff]"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
