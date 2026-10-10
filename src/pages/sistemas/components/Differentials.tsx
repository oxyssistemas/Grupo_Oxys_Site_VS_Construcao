import React from 'react';
import { 
  ShieldCheck, 
  KeyRound, 
  Zap, 
  Users, 
  FileCode, 
  Lock, 
  Quote, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Globe2,
  Cpu,
  Terminal
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { BRAND_CONFIG } from '../../../config/brandAssets';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { MilkyWayBackground } from './MilkyWayBackground';
import { GalacticTelemetryBadge, StardustDivider } from './MilkyWayDecorations';
import { LogoBrandShowcase } from './LogoBrandShowcase';

export const Differentials: React.FC = () => {
  const pillars = [
    {
      icon: KeyRound,
      title: 'Propriedade 100% Sua',
      badge: 'Zero Lock-in',
      description: 'O código-fonte, arquitetura, repositórios e infraestrutura são inteiramente de sua propriedade, sem royalties recorrentes ou amarras.',
      colorHex: '#10b981',
      theme: {
        iconBg: 'bg-emerald-950/70 border-emerald-500/40 text-emerald-400 group-hover:border-emerald-400 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]',
        badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30',
        titleHover: 'group-hover:text-emerald-300',
        accentLine: 'group-hover:via-emerald-400',
        glowOrb: 'bg-emerald-500/15',
        cardHover: 'hover:border-emerald-500/50 hover:shadow-[0_12px_35px_rgba(16,185,129,0.15)]',
      }
    },
    {
      icon: Zap,
      title: 'Alta Concorrência & Baixa Latência',
      badge: 'Escala Extrema',
      description: 'Arquiteturas preparadas para absorver picos de milhões de acessos e transações sem degradação de performance ou lentidão.',
      colorHex: '#f59e0b',
      theme: {
        iconBg: 'bg-amber-950/70 border-amber-500/40 text-amber-400 group-hover:border-amber-400 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]',
        badge: 'bg-amber-950/80 text-amber-300 border-amber-500/30',
        titleHover: 'group-hover:text-amber-300',
        accentLine: 'group-hover:via-amber-400',
        glowOrb: 'bg-amber-500/15',
        cardHover: 'hover:border-amber-500/50 hover:shadow-[0_12px_35px_rgba(245,158,11,0.15)]',
      }
    },
    {
      icon: Users,
      title: 'Squads Seniores Alocadas',
      badge: 'Nível Sênior',
      description: 'Engenheiros de software com vasta experiência em produtos de grande porte. Sem estagiários programando funções críticas.',
      colorHex: '#06b6d4',
      theme: {
        iconBg: 'bg-cyan-950/70 border-cyan-500/40 text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]',
        badge: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/30',
        titleHover: 'group-hover:text-cyan-300',
        accentLine: 'group-hover:via-cyan-400',
        glowOrb: 'bg-cyan-500/15',
        cardHover: 'hover:border-cyan-500/50 hover:shadow-[0_12px_35px_rgba(6,182,212,0.15)]',
      }
    },
    {
      icon: Lock,
      title: 'Segurança & LGPD Nativa',
      badge: 'Zero Trust',
      description: 'Criptografia mTLS, tokens rotativos, proteção contra OWASP Top 10 e total aderência às exigências da LGPD.',
      colorHex: '#f43f5e',
      theme: {
        iconBg: 'bg-rose-950/70 border-rose-500/40 text-rose-400 group-hover:border-rose-400 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.4)]',
        badge: 'bg-rose-950/80 text-rose-300 border-rose-500/30',
        titleHover: 'group-hover:text-rose-300',
        accentLine: 'group-hover:via-rose-400',
        glowOrb: 'bg-rose-500/15',
        cardHover: 'hover:border-rose-500/50 hover:shadow-[0_12px_35px_rgba(244,63,94,0.15)]',
      }
    },
    {
      icon: FileCode,
      title: 'Documentação Viva & Swagger',
      badge: 'OpenAPI 3.0',
      description: 'APIs totalmente documentadas em OpenAPI/Swagger com coleções no Postman para que qualquer equipe técnica possa manter com facilidade.',
      colorHex: '#a855f7',
      theme: {
        iconBg: 'bg-purple-950/70 border-purple-500/40 text-purple-400 group-hover:border-purple-400 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]',
        badge: 'bg-purple-950/80 text-purple-300 border-purple-500/30',
        titleHover: 'group-hover:text-purple-300',
        accentLine: 'group-hover:via-purple-400',
        glowOrb: 'bg-purple-500/15',
        cardHover: 'hover:border-purple-500/50 hover:shadow-[0_12px_35px_rgba(168,85,247,0.15)]',
      }
    },
    {
      icon: ShieldCheck,
      title: 'Garantia & Suporte Pós-Lançamento',
      badge: 'SLA 99.98%',
      description: 'Acompanhamento próximo no Go-Live, suporte com SLA garantido e esteira de monitoramento contínuo em nuvem.',
      colorHex: '#3b82f6',
      theme: {
        iconBg: 'bg-blue-950/70 border-blue-500/40 text-blue-400 group-hover:border-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]',
        badge: 'bg-blue-950/80 text-blue-300 border-blue-500/30',
        titleHover: 'group-hover:text-blue-300',
        accentLine: 'group-hover:via-blue-400',
        glowOrb: 'bg-blue-500/15',
        cardHover: 'hover:border-blue-500/50 hover:shadow-[0_12px_35px_rgba(59,130,246,0.15)]',
      }
    },
  ];

  return (
    <section id="diferenciais" className="py-20 md:py-28 bg-[#050608] border-b border-white/5 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      
      {/* =========================================================================
          COSMIC DEEP SPACE BACKGROUND
          ========================================================================= */}
      <MilkyWayBackground 
        variant="deep-space" 
        density="normal" 
        imageOpacity={0.3} 
        showShootingStars={true} 
        showConstellations={true}
        showCoordinates={true}
        coordinates="PILARES DE RIGOR // ARQUITETURA ORBITAL"
      />

      {/* Subtle Top & Bottom Glowing Lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Orbital Badges */}
        <ScrollReveal direction="up" duration={0.7} distance={30} className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
            <div className="text-xs uppercase tracking-[0.4em] text-cyan-400 font-bold">
              Rigor Técnico & Excelência
            </div>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Por que Escolher a Oxys Sistemas?
          </h2>
          <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Combinamos a solidez corporativa do {COMPANY_INFO.parentGroup} com a velocidade 
            e inovação das melhores práticas de engenharia de software do mercado.
          </p>
        </ScrollReveal>

        {/* Highlight Feature Banner: Enterprise Identity & Architecture Showcase */}
        <ScrollReveal direction="up" duration={0.75} distance={30} className="mb-14 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0b0f19]/90 via-[#070a12]/95 to-[#04060a] border border-cyan-500/25 shadow-2xl relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-radial from-cyan-500/15 to-transparent to-65% rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-radial from-indigo-500/15 to-transparent to-65% rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Interactive Logo & Brand Showcase Stage */}
            <div className="lg:col-span-5 flex items-center justify-center py-2">
              <LogoBrandShowcase logoSrc={BRAND_CONFIG.HEADER_LOGO_SRC} logoAlt="Logo Oxys Sistemas" />
            </div>

            {/* Right Architecture Highlights */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-300 bg-cyan-950/80 rounded-full border border-cyan-500/30">
                  Arquitetura de Alta Performance
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Engenharia de Missão Crítica com <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                  Identidade e Estabilidade Absoluta
                </span>
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                Desenvolvemos sistemas que operam continuamente sem falhas. Nossas soluções contam com tolerância a falhas, replicação de dados e observabilidade ponta a ponta construídas sob medida para a sua marca.
              </p>

              {/* Mini Status Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                  <div className="text-xs font-mono text-cyan-400 font-bold">99.98% SLA</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Disponibilidade Garantida</div>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                  <div className="text-xs font-mono text-emerald-400 font-bold">&lt; 15ms</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Latência de Resposta</div>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 col-span-2 sm:col-span-1">
                  <div className="text-xs font-mono text-purple-400 font-bold">100% Nativo</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Cloud Agnostic</div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 6 Engineering Pillars with Colorful Themes & Staggered Scroll Reveal */}
        <StaggerContainer staggerDelay={0.09} delayChildren={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const theme = pillar.theme;
            return (
              <StaggerItem
                key={idx}
                className={`group relative p-6 sm:p-7 rounded-2xl bg-[#0a0c10]/90 border border-white/10 ${theme.cardHover} transition-all duration-500 hover:-translate-y-2.5 hover:scale-[1.02] shadow-xl overflow-hidden cursor-pointer flex flex-col justify-between`}
              >
                {/* Background Ambient Glow */}
                <div className={`absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl pointer-events-none transition-opacity duration-500 opacity-40 group-hover:opacity-100 ${theme.glowOrb}`} />

                {/* 3D Diagonal Light Sheen */}
                <div className="absolute -inset-full w-[250%] h-[250%] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 animate-sheen pointer-events-none z-20" />

                <div>
                  <div className="flex items-center justify-between mb-5 relative z-10">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 border shadow-lg ${theme.iconBg}`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className={`px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-wider rounded-md border shadow-sm ${theme.badge}`}>
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className={`text-lg font-bold text-white ${theme.titleHover} transition-colors duration-300 relative z-10`}>
                    {pillar.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-300/80 leading-relaxed group-hover:text-slate-200 transition-colors relative z-10">
                    {pillar.description}
                  </p>
                </div>

                {/* Bottom Neon Accent Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-transparent to-transparent ${theme.accentLine} transition-all duration-500`} />
              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
};
