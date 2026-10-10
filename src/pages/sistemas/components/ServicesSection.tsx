import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutGrid, 
  Smartphone, 
  Cpu, 
  Network, 
  Cloud, 
  RefreshCw, 
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { SERVICES_LIST } from '../data/mockData';
import { runCanvasLoop, getGlowSprite } from '../lib/canvasLoop';
import servicesBgImage from '../assets/images/services_cosmic_mesh.webp';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { MilkyWayBackground } from './MilkyWayBackground';
import { GalacticTelemetryBadge } from './MilkyWayDecorations';

interface ServicesSectionProps {
  onSelectService?: (serviceId: string) => void;
}

interface NodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  // Track image load errors to display the high-tech placeholder when file is not yet uploaded
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Interactive Neural Constellation & Space Nodes Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initNodes();
    };

    window.addEventListener('resize', handleResize);

    const nodeColors = ['#38bdf8', '#22d3ee', '#818cf8', '#a5f3fc', '#06b6d4'];
    let nodes: NodeParticle[] = [];

    const initNodes = () => {
      nodes = [];
      const count = Math.min(110, Math.floor((width * height) / 18000)); // Optimal density
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.8 + 0.8,
          color: nodeColors[Math.floor(Math.random() * nodeColors.length)],
          alpha: Math.random() * 0.6 + 0.2
        });
      }
    };

    initNodes();

    const maxDistance = 140;

    const render = (dt: number) => {
      ctx.clearRect(0, 0, width, height);

      // Update positions & draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx * dt;
        n.y += n.vy * dt;

        if (n.x < 0) n.x = width;
        else if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        else if (n.y > height) n.y = 0;

        // Draw node (sprite com halo no lugar do shadowBlur)
        ctx.globalAlpha = n.alpha;
        const size = n.radius * 5;
        ctx.drawImage(getGlowSprite(n.color, 8), n.x - size / 2, n.y - size / 2, size, size);

        // Connect nearby nodes
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 0.8;
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistance * maxDistance) {
            const lineAlpha = (1 - Math.sqrt(distSq) / maxDistance) * 0.25;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.globalAlpha = lineAlpha;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
    };

    render(0);
    const stopLoop = runCanvasLoop(canvas, render, 30);

    return () => {
      stopLoop();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleImageError = (serviceId: string) => {
    setImageErrors((prev) => ({ ...prev, [serviceId]: true }));
  };

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'LayoutGrid': return <LayoutGrid className="w-8 h-8 text-cyan-400" />;
      case 'Smartphone': return <Smartphone className="w-8 h-8 text-emerald-400" />;
      case 'Cpu': return <Cpu className="w-8 h-8 text-teal-400" />;
      case 'Network': return <Network className="w-8 h-8 text-blue-400" />;
      case 'Cloud': return <Cloud className="w-8 h-8 text-indigo-400" />;
      case 'RefreshCw': return <RefreshCw className="w-8 h-8 text-amber-400" />;
      default: return <Layers className="w-8 h-8 text-cyan-400" />;
    }
  };

  return (
    <section id="servicos" className="py-24 md:py-32 bg-[#050608] border-b border-white/5 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      
      {/* =========================================================================
          COSMIC NEBULA CELESTIAL BACKGROUND & STAR DUST
          ========================================================================= */}
      <MilkyWayBackground 
        variant="nebula" 
        density="normal" 
        imageOpacity={0.35} 
        showShootingStars={true} 
        showConstellations={true}
        showCoordinates={true}
        coordinates="INFRAESTRUTURA DIGITAL // SERVIÇOS SOB MEDIDA"
      />

      {/* Top and bottom subtle neon boundary separators */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up" duration={0.7} distance={30} className="max-w-3xl mb-16 text-left">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-xs uppercase tracking-[0.35em] text-cyan-400 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
              <span>Nossas Soluções de Engenharia</span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400/60 bg-cyan-950/40 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
              6 Especialidades
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Serviços de Engenharia <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              Desenvolvidos para Alta Performance
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed max-w-2xl">
            Soluções completas e sob medida para impulsionar a infraestrutura e os produtos digitais da sua empresa com precisão e robustez.
          </p>
        </ScrollReveal>

        {/* 3D Animated & Semi-Transparent Services Grid with Staggered Scroll Reveal */}
        <StaggerContainer staggerDelay={0.12} delayChildren={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {SERVICES_LIST.map((service) => {
            const hasError = imageErrors[service.id];
            const hasImage = service.image && !hasError;

            return (
              <StaggerItem
                key={service.id}
                id={`service-card-${service.id}`}
                onClick={() => {
                  if (onSelectService) {
                    onSelectService(service.id);
                  }
                }}
                className="group relative rounded-2xl overflow-hidden card-3d transition-all duration-500 hover:-translate-y-2.5 hover:scale-[1.015] flex flex-col cursor-pointer"
              >
                {/* Diagonal 3D Light Sheen reflection effect */}
                <div className="absolute -inset-full w-[250%] h-[250%] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 animate-sheen pointer-events-none z-30" />

                {/* =========================================================================
                    1. FOTO NA PARTE SUPERIOR (COM DIRETÓRIO PRONTO & FALLBACK 3D)
                    Caminhos configurados em: /public/services/ (ex: /services/custom-software.jpg)
                    ========================================================================= */}
                <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-gradient-to-b from-slate-900/80 to-[#080b12] border-b border-white/10 flex items-center justify-center">
                  
                  {/* Subtle 3D Top Inner Highlight on Image Frame */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent z-20" />
                  
                  {/* Real Image Render (when file is uploaded in /public/services/...) */}
                  {service.image && !hasError ? (
                    <img
                      src={service.image}
                      alt={service.title}
                      onError={() => handleImageError(service.id)}
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    /* Futuristic High-Tech 3D Cyber Placeholder when image is not yet uploaded */
                    <div className="w-full h-full relative flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-cyan-950/20 via-[#07090e]/90 to-[#07090e]">
                      
                      {/* Grid background inside image box */}
                      <div 
                        className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{
                          backgroundImage: 'radial-gradient(circle at 2px 2px, #38bdf8 1px, transparent 0)',
                          backgroundSize: '20px 20px'
                        }}
                      />

                      {/* Floating Cyber Icon with Glowing Ring */}
                      <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#0d121d]/80 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.25)] group-hover:border-cyan-400 group-hover:shadow-[0_0_28px_rgba(34,211,238,0.4)] group-hover:scale-110 transition-all duration-500">
                        {getIcon(service.iconName)}
                      </div>

                      {/* File directory location hint */}
                      <div className="relative z-10 mt-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 border border-white/10 text-[10px] font-mono text-slate-400 group-hover:text-cyan-300 transition-colors">
                        <ImageIcon className="w-3 h-3 text-cyan-400" />
                        <span>/public{service.image || `/services/${service.id}.jpg`}</span>
                      </div>
                    </div>
                  )}

                  {/* Dark gradient overlay on bottom of image for seamless blending */}
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0a0e17] to-transparent pointer-events-none z-10" />
                </div>

                {/* =========================================================================
                    2. TEXTO DO SERVIÇO & 3. BREVE DESCRIÇÃO
                    ========================================================================= */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-start">
                  {/* Service Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 leading-snug">
                    {service.title}
                  </h3>

                  {/* Brief Description */}
                  <p className="mt-3 text-sm text-slate-300/80 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                    {service.shortDesc}
                  </p>
                </div>

                {/* 3D Bottom Edge Accent */}
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-400/60 transition-all duration-500" />
              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
};
