import React, { useState } from 'react';
import { 
  Compass, 
  Figma, 
  Code2, 
  CheckCircle2, 
  Rocket, 
  Clock, 
  ArrowRight,
  Shield,
  FileCode,
  Layers
} from 'lucide-react';
import { METHODOLOGY_STEPS } from '../data/mockData';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { MilkyWayBackground } from './MilkyWayBackground';
import { GalacticTelemetryBadge } from './MilkyWayDecorations';

export const ProcessMethodology: React.FC = () => {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const activeStep = METHODOLOGY_STEPS[activeStepIdx];

  const stepThemes = [
    {
      color: '#06b6d4',
      badge: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
      activeBorder: 'border-cyan-500/80 shadow-[0_0_25px_rgba(6,182,212,0.35)] ring-1 ring-cyan-500/50',
      iconBox: 'bg-cyan-950/80 border-cyan-500/40 text-cyan-400',
      accentText: 'text-cyan-400',
      glow: 'from-cyan-500/15',
    },
    {
      color: '#a855f7',
      badge: 'bg-purple-950/80 text-purple-300 border-purple-500/40',
      activeBorder: 'border-purple-500/80 shadow-[0_0_25px_rgba(168,85,247,0.35)] ring-1 ring-purple-500/50',
      iconBox: 'bg-purple-950/80 border-purple-500/40 text-purple-400',
      accentText: 'text-purple-400',
      glow: 'from-purple-500/15',
    },
    {
      color: '#10b981',
      badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
      activeBorder: 'border-emerald-500/80 shadow-[0_0_25px_rgba(16,185,129,0.35)] ring-1 ring-emerald-500/50',
      iconBox: 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400',
      accentText: 'text-emerald-400',
      glow: 'from-emerald-500/15',
    },
    {
      color: '#f43f5e',
      badge: 'bg-rose-950/80 text-rose-300 border-rose-500/40',
      activeBorder: 'border-rose-500/80 shadow-[0_0_25px_rgba(244,63,94,0.35)] ring-1 ring-rose-500/50',
      iconBox: 'bg-rose-950/80 border-rose-500/40 text-rose-400',
      accentText: 'text-rose-400',
      glow: 'from-rose-500/15',
    },
    {
      color: '#f59e0b',
      badge: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
      activeBorder: 'border-amber-500/80 shadow-[0_0_25px_rgba(245,158,11,0.35)] ring-1 ring-amber-500/50',
      iconBox: 'bg-amber-950/80 border-amber-500/40 text-amber-400',
      accentText: 'text-amber-400',
      glow: 'from-amber-500/15',
    },
  ];

  const currentTheme = stepThemes[activeStepIdx] || stepThemes[0];

  const getStepIcon = (iconName: string, active: boolean) => {
    switch (iconName) {
      case 'Compass': return <Compass className="w-5 h-5 text-cyan-400" />;
      case 'Figma': return <Figma className="w-5 h-5 text-purple-400" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-emerald-400" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-rose-400" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-amber-400" />;
      default: return <Layers className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="metodologia" className="py-20 md:py-28 bg-[#050608] border-b border-white/5 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      
      {/* =========================================================================
          COSMIC TRAJECTORY CELESTIAL BACKGROUND
          ========================================================================= */}
      <MilkyWayBackground 
        variant="nebula" 
        density="normal" 
        imageOpacity={0.3} 
        showShootingStars={true} 
        showConstellations={true}
        showCoordinates={true}
        coordinates="TRAJETÓRIA DE ENGENHARIA // FLUXO OPERACIONAL"
      />

      {/* Subtle Top & Bottom Glowing Lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up" duration={0.7} distance={30} className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-xs uppercase tracking-[0.4em] text-cyan-400 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
              <span>Ciclo de Missão & Engenharia</span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400/60 bg-cyan-950/40 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
              5 Fases Contínuas
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Como Transformamos Requisitos em Softwares de Alta Escala
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Processo transparente e previsível com rigor de engenharia. Você acompanha cada linha de código e evolução 
            do sistema em tempo real através de deploys contínuos e relatórios de sprint.
          </p>
        </ScrollReveal>

        {/* Interactive Steps Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Step list selector */}
          <StaggerContainer staggerDelay={0.09} delayChildren={0.1} className="lg:col-span-5 space-y-3">
            {METHODOLOGY_STEPS.map((step, idx) => {
              const isActive = activeStepIdx === idx;
              const sTheme = stepThemes[idx];
              return (
                <StaggerItem
                  key={step.step}
                  id={`methodology-step-${step.step}`}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-start gap-4 ${
                    isActive
                      ? `bg-[#0c101a] ${sTheme.activeBorder}`
                      : 'bg-[#080b12]/80 border-white/10 hover:bg-[#0c101a] hover:border-white/20'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm shrink-0 border transition-all duration-300 ${
                    isActive
                      ? sTheme.badge
                      : 'bg-black/60 text-slate-400 border-white/10'
                  }`}>
                    {step.step}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                      {step.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Step Detail Spotlight */}
          <ScrollReveal direction="up" duration={0.7} distance={25} delay={0.15} className={`lg:col-span-7 rounded-3xl bg-[#0a0d16]/95 border border-white/15 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-500`}>
            {/* Dynamic Background Glow matched to active step */}
            <div className={`absolute top-0 right-0 w-80 h-80 bg-radial ${currentTheme.glow} to-transparent to-65% rounded-full pointer-events-none transition-all duration-700`} />

            <div className="space-y-6 relative z-10">
              
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-lg ${currentTheme.iconBox}`}>
                    {getStepIcon(activeStep.icon, true)}
                  </div>
                  <div>
                    <span className={`text-[10px] font-mono uppercase font-bold tracking-widest ${currentTheme.accentText}`}>
                      ETAPA {activeStep.step} DE 05
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {activeStep.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/15 text-xs font-mono text-cyan-300 shadow-sm">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{activeStep.duration}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {activeStep.description}
              </p>

              {/* Deliverables for this step */}
              <div className="space-y-3 pt-2">
                <p className={`text-xs font-mono font-bold uppercase tracking-widest ${currentTheme.accentText}`}>
                  Entregáveis Garantidos nesta Etapa:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeStep.deliverables.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-black/50 border border-white/10 flex items-center gap-3 text-xs text-slate-200 shadow-inner">
                      <CheckCircle2 className={`w-4 h-4 ${currentTheme.accentText} shrink-0`} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Nav / Next Step */}
            <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono text-slate-400">
                Acompanhamento semanal via reuniões de Sprint Review & Homologação
              </span>
              <button
                onClick={() => setActiveStepIdx((activeStepIdx + 1) % METHODOLOGY_STEPS.length)}
                className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${currentTheme.accentText} hover:opacity-80 cursor-pointer transition-opacity`}
              >
                <span>Próxima Etapa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
