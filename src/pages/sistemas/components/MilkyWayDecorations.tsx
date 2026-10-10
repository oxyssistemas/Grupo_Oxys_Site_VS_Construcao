import React from 'react';
import { Compass, Sparkles, Orbit, Radio, Globe2, Sun, Moon } from 'lucide-react';

/**
 * Badge with Live Galactic Telemetry
 */
export const GalacticTelemetryBadge: React.FC<{
  sector?: string;
  coordinates?: string;
  className?: string;
}> = ({
  sector = 'ORBITAL INFRASTRUCTURE // LIVE TELEMETRY',
  coordinates = 'RA 17h 45.6m | DEC -29°',
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)] ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
      <span className="font-semibold uppercase tracking-wider">{sector}</span>
      <span className="text-cyan-600 hidden sm:inline">•</span>
      <span className="text-cyan-400/80 hidden sm:inline">{coordinates}</span>
    </div>
  );
};

/**
 * Constellation Star Node Indicator
 */
export const ConstellationNode: React.FC<{
  magnitude?: string;
  classification?: string;
  active?: boolean;
}> = ({ magnitude = '1.2 mag', classification = 'Classe Espectral O-B', active = false }) => {
  return (
    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
      <div className="relative flex items-center justify-center w-3.5 h-3.5">
        <span className={`absolute w-full h-full rounded-full ${active ? 'bg-cyan-400/30 animate-ping' : 'bg-white/10'}`} />
        <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-cyan-300 shadow-[0_0_6px_#22d3ee]' : 'bg-slate-400'}`} />
      </div>
      <span className="text-cyan-300/90 font-semibold">{magnitude}</span>
      <span className="text-slate-500">[{classification}]</span>
    </div>
  );
};

/**
 * Orbital Ring Decorative Graphic
 */
export const OrbitalRingGraphic: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 200, className = '' }) => {
  return (
    <div 
      className={`relative pointer-events-none select-none flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer Ellipse */}
      <div className="absolute inset-0 rounded-full border border-cyan-500/20 border-dashed animate-spin-slow" />
      {/* Middle Glowing Ring */}
      <div className="absolute inset-3 rounded-full border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.15)]" />
      {/* Orbiting Satellite/Planet Particle */}
      <div className="absolute top-2 right-6 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee] animate-pulse" />
      <div className="absolute bottom-6 left-3 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]" />
    </div>
  );
};

/**
 * Galactic Stardust Separator
 */
export const StardustDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-8 flex items-center justify-center overflow-hidden pointer-events-none ${className}`}>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      <div className="absolute flex items-center gap-3 bg-[#050608] px-4">
        <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
        <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-cyan-400/70">
          Cosmic Engineering • High Scale
        </span>
        <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
      </div>
    </div>
  );
};
