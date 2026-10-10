import React from 'react';
import { Cpu, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface LogoBrandShowcaseProps {
  className?: string;
  /**
   * Passe o caminho ou import da sua imagem de logo aqui.
   * Exemplo:
   * import myLogo from '../assets/images/minha-logo.svg';
   * <LogoBrandShowcase logoSrc={myLogo} logoAlt="Minha Empresa" />
   */
  logoSrc?: string;
  logoAlt?: string;
}

export const LogoBrandShowcase: React.FC<LogoBrandShowcaseProps> = ({
  className = '',
  logoSrc,
  logoAlt = 'Logo',
}) => {
  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      
      {/* 1. Purple Volumetric Cosmic Glow Backdrop */}
      <div 
        className="absolute w-80 h-80 rounded-full bg-radial from-purple-600/20 to-transparent to-65% pointer-events-none transform-gpu" 
        style={{ willChange: 'transform, opacity' }}
      />
      <div 
        className="absolute w-48 h-48 rounded-full bg-radial from-fuchsia-500/15 to-transparent to-65% pointer-events-none transform-gpu" 
        style={{ willChange: 'transform, opacity' }}
      />

      {/* 2. Main Holographic Pedestal & Logo Chamber */}
      <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center p-6">
        
        {/* SVG Orbital Cyber Rings & Grid Radar in Vibrant Purple Palette */}
        <svg 
          className="absolute inset-0 w-full h-full transform-gpu" 
          viewBox="0 0 400 400" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ willChange: 'transform' }}
        >
          <defs>
            <linearGradient id="purpleRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C084FC" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#9333EA" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.9" />
            </linearGradient>
            <filter id="purpleGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Anel Externo: Rotação Horária Contínua */}
          <g className="animate-core-outer origin-center transform-gpu" style={{ willChange: 'transform' }}>
            <circle cx="200" cy="200" r="185" stroke="url(#purpleRingGrad)" strokeWidth="1.5" strokeDasharray="8 14" opacity="0.65" />
            <circle cx="200" cy="200" r="170" stroke="#9333EA" strokeOpacity="0.25" strokeWidth="1" />
            {/* 4 Pontos Cardeais de Mira Violeta */}
            <circle cx="200" cy="15" r="4.5" fill="#C084FC" filter="url(#purpleGlowFilter)" />
            <circle cx="385" cy="200" r="4.5" fill="#C084FC" filter="url(#purpleGlowFilter)" />
            <circle cx="200" cy="385" r="4.5" fill="#C084FC" filter="url(#purpleGlowFilter)" />
            <circle cx="15" cy="200" r="4.5" fill="#C084FC" filter="url(#purpleGlowFilter)" />
          </g>

          {/* Anel Intermediário: Rotação Anti-horária */}
          <g className="animate-core-mid origin-center transform-gpu" style={{ willChange: 'transform' }}>
            <circle cx="200" cy="200" r="145" stroke="#A855F7" strokeWidth="1.5" strokeDasharray="18 10 4 10" opacity="0.75" />
            <circle cx="200" cy="200" r="125" stroke="#FFFFFF" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="2 6" />
            <rect x="290" y="110" width="8" height="8" fill="#07040d" stroke="#C084FC" strokeWidth="1.5" />
            <rect x="102" y="282" width="8" height="8" fill="#07040d" stroke="#C084FC" strokeWidth="1.5" />
          </g>

          {/* Anel Interno: Pulsação & Mira Holográfica */}
          <g className="animate-core-inner origin-center transform-gpu" style={{ willChange: 'transform' }}>
            <circle cx="200" cy="200" r="95" stroke="#C084FC" strokeWidth="1.8" strokeDasharray="24 12" opacity="0.85" />
            <line x1="200" y1="110" x2="200" y2="290" stroke="#A855F7" strokeOpacity="0.3" strokeDasharray="4 4" />
            <line x1="110" y1="200" x2="290" y2="200" stroke="#A855F7" strokeOpacity="0.3" strokeDasharray="4 4" />
          </g>
        </svg>

        {/* Central Logo Container / Floating Chamber */}
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 w-44 h-44 rounded-3xl bg-[#090514]/90 border border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.35)] flex items-center justify-center p-4 text-center transform-gpu overflow-hidden"
          style={{ willChange: 'transform' }}
        >
          {/* Inner Corner Tech Brackets in Purple */}
          <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t-2 border-l-2 border-purple-400" />
          <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t-2 border-r-2 border-purple-400" />
          <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b-2 border-l-2 border-purple-400" />
          <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b-2 border-r-2 border-purple-400" />

          {/* Light Sweep Sheen */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] pointer-events-none" />

          {logoSrc ? (
            /* Imagem da Logo Oficial inserida via código */
            <div className="relative w-full h-full flex items-center justify-center p-2">
              <img 
                src={logoSrc} 
                alt={logoAlt} 
                className="max-h-28 max-w-full object-contain filter drop-shadow-[0_0_20px_rgba(192,132,252,0.6)]" 
              />
            </div>
          ) : (
            /* Visual Futurista Geométrico / Símbolo Holográfico */
            <div className="relative flex items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1b0d33] to-[#0a0514] border border-purple-500/40 flex items-center justify-center shadow-lg">
                <Cpu className="w-10 h-10 text-purple-400" />
              </div>
              {/* Floating sparkle badge */}
              <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-400 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-purple-300 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
            </div>
          )}
        </motion.div>
      </div>

    </div>
  );
};
