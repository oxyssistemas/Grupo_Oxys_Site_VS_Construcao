import React, { useState } from 'react';
import { 
  Code2, 
  Search, 
  Layers, 
  Cpu, 
  Database, 
  Cloud, 
  Smartphone, 
  CheckCircle2, 
  Sparkles,
  Server,
  Terminal,
  ShieldAlert,
  Zap,
  Globe
} from 'lucide-react';
import { TECHNOLOGIES_LIST } from '../data/mockData';
import { TechnologyItem } from '../types';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { MilkyWayBackground } from './MilkyWayBackground';
import { ConstellationNode, GalacticTelemetryBadge } from './MilkyWayDecorations';

export const TechStackSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Todas as Tecnologias', icon: Layers },
    { id: 'backend', label: 'Backend & APIs', icon: Server },
    { id: 'mobile', label: 'Mobile (iOS/Android)', icon: Smartphone },
    { id: 'frontend', label: 'Frontend & SaaS', icon: Globe },
    { id: 'database', label: 'Bancos de Dados', icon: Database },
    { id: 'cloud', label: 'Cloud & DevOps', icon: Cloud },
  ];

  const getTechIcon = (category: string) => {
    switch (category) {
      case 'backend': return <Server className="w-5 h-5 text-emerald-400" />;
      case 'mobile': return <Smartphone className="w-5 h-5 text-rose-400" />;
      case 'frontend': return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'database': return <Database className="w-5 h-5 text-purple-400" />;
      case 'cloud':
      case 'devops': return <Cloud className="w-5 h-5 text-amber-400" />;
      default: return <Cpu className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'frontend':
        return {
          iconBox: 'bg-cyan-950/70 border-cyan-500/30 text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]',
          badge: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/30',
          titleHover: 'group-hover:text-cyan-300',
          accentLine: 'group-hover:via-cyan-400',
          glowOrb: 'bg-cyan-500/10',
          cardHover: 'hover:border-cyan-500/40 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)]',
          accentText: 'text-cyan-300',
        };
      case 'backend':
        return {
          iconBox: 'bg-emerald-950/70 border-emerald-500/30 text-emerald-400 group-hover:border-emerald-400 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]',
          badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30',
          titleHover: 'group-hover:text-emerald-300',
          accentLine: 'group-hover:via-emerald-400',
          glowOrb: 'bg-emerald-500/10',
          cardHover: 'hover:border-emerald-500/40 hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)]',
          accentText: 'text-emerald-300',
        };
      case 'mobile':
        return {
          iconBox: 'bg-rose-950/70 border-rose-500/30 text-rose-400 group-hover:border-rose-400 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.4)]',
          badge: 'bg-rose-950/80 text-rose-300 border-rose-500/30',
          titleHover: 'group-hover:text-rose-300',
          accentLine: 'group-hover:via-rose-400',
          glowOrb: 'bg-rose-500/10',
          cardHover: 'hover:border-rose-500/40 hover:shadow-[0_10px_30px_rgba(244,63,94,0.15)]',
          accentText: 'text-rose-300',
        };
      case 'database':
        return {
          iconBox: 'bg-purple-950/70 border-purple-500/30 text-purple-400 group-hover:border-purple-400 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]',
          badge: 'bg-purple-950/80 text-purple-300 border-purple-500/30',
          titleHover: 'group-hover:text-purple-300',
          accentLine: 'group-hover:via-purple-400',
          glowOrb: 'bg-purple-500/10',
          cardHover: 'hover:border-purple-500/40 hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)]',
          accentText: 'text-purple-300',
        };
      case 'cloud':
      case 'devops':
        return {
          iconBox: 'bg-amber-950/70 border-amber-500/30 text-amber-400 group-hover:border-amber-400 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]',
          badge: 'bg-amber-950/80 text-amber-300 border-amber-500/30',
          titleHover: 'group-hover:text-amber-300',
          accentLine: 'group-hover:via-amber-400',
          glowOrb: 'bg-amber-500/10',
          cardHover: 'hover:border-amber-500/40 hover:shadow-[0_10px_30px_rgba(245,158,11,0.15)]',
          accentText: 'text-amber-300',
        };
      default:
        return {
          iconBox: 'bg-cyan-950/70 border-cyan-500/30 text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]',
          badge: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/30',
          titleHover: 'group-hover:text-cyan-300',
          accentLine: 'group-hover:via-cyan-400',
          glowOrb: 'bg-cyan-500/10',
          cardHover: 'hover:border-cyan-500/40 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)]',
          accentText: 'text-cyan-300',
        };
    }
  };

  const filteredTechs = TECHNOLOGIES_LIST.filter((tech) => {
    const matchesCategory = 
      selectedCategory === 'all' 
        ? true 
        : selectedCategory === 'cloud' 
          ? (tech.category === 'cloud' || tech.category === 'devops')
          : tech.category === selectedCategory;

    const matchesSearch = 
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.popularFor.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="tecnologias" className="py-24 md:py-32 bg-[#050608] border-b border-white/5 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      
      {/* =========================================================================
          COSMIC CONSTELLATION MESH & TECH RADAR
          ========================================================================= */}
      <MilkyWayBackground 
        variant="constellation" 
        density="dense" 
        imageOpacity={0.32} 
        showShootingStars={true} 
        showConstellations={true}
        showCoordinates={true}
        coordinates="RADAR TECNOLÓGICO // MATRIZ DE ENGENHARIA"
      />

      {/* Subtle Top and Bottom Glowing Lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up" duration={0.7} distance={30} className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-xs uppercase tracking-[0.35em] text-cyan-400 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
                <span>Matriz Tecnológica & Stacks</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400/60 bg-cyan-950/40 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                12 Stacks Principais
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Tecnologias Modernas, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                Maduras e de Alto Desempenho
              </span>
            </h2>
            <p className="mt-4 text-base text-slate-400 leading-relaxed">
              Não seguimos modismos sem propósito. Escolhemos ferramentas testadas em escala global 
              que garantem segurança, facilidade de manutenção e máxima performance para sua empresa.
            </p>
          </div>

          {/* Search box with 3D border effect */}
          <div className="w-full lg:w-80 relative group">
            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
            <input
              id="tech-search-input"
              type="text"
              placeholder="Buscar tecnologia (ex: Flutter, Go, Next)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0a0e17]/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] transition-all font-mono"
            />
          </div>
        </ScrollReveal>

        {/* Category Pills Filter with 3D Glass Styling */}
        <ScrollReveal direction="none" duration={0.6} delay={0.1} className="flex items-center gap-2.5 overflow-x-auto overscroll-x-contain pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider rounded-xl whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.4)] scale-105 font-extrabold'
                    : 'bg-[#0a0e17]/70 text-slate-400 border border-white/10 hover:border-cyan-500/40 hover:bg-[#0f1422] hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </ScrollReveal>

        {/* 3D Animated Technology Grid */}
        {filteredTechs.length === 0 ? (
          <div className="text-center py-20 bg-[#0a0e17]/60 rounded-2xl border border-white/10 card-3d">
            <p className="text-slate-400 text-sm font-mono">Nenhuma tecnologia encontrada para "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-4 px-4 py-2 text-xs font-bold uppercase tracking-wider text-cyan-300 hover:text-cyan-200 bg-cyan-950/40 border border-cyan-500/30 rounded-lg hover:border-cyan-400 transition-all font-mono"
            >
              Limpar filtros de busca
            </button>
          </div>
        ) : (
          <StaggerContainer staggerDelay={0.07} delayChildren={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredTechs.map((tech) => {
              const theme = getCategoryTheme(tech.category);
              return (
                <StaggerItem
                  key={tech.name}
                  id={`tech-card-${tech.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className={`group relative p-6 rounded-2xl bg-[#0a0e17]/85 border border-white/10 ${theme.cardHover} transition-all duration-500 hover:-translate-y-2.5 hover:scale-[1.02] flex flex-col justify-between cursor-pointer overflow-hidden shadow-xl`}
                >
                  {/* Subtle Background Glow Orb for this Category */}
                  <div className={`absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl pointer-events-none transition-opacity duration-500 opacity-40 group-hover:opacity-100 ${theme.glowOrb}`} />

                  {/* 3D Diagonal Light Sheen reflection */}
                  <div className="absolute -inset-full w-[250%] h-[250%] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 animate-sheen pointer-events-none z-20" />

                  <div>
                    {/* Top Badges & Icon */}
                    <div className="flex items-center justify-between mb-4 relative z-10">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-300 border ${theme.iconBox}`}>
                        {getTechIcon(tech.category)}
                      </div>
                      
                      <span className={`px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-wider rounded-md border shadow-sm ${theme.badge}`}>
                        {tech.level}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`text-lg font-bold text-white ${theme.titleHover} transition-colors duration-300 relative z-10`}>
                      {tech.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-2.5 text-xs text-slate-300/80 leading-relaxed group-hover:text-slate-200 transition-colors relative z-10">
                      {tech.description}
                    </p>
                  </div>

                  {/* Popular For / Use case badge */}
                  <div className="mt-5 pt-3.5 border-t border-white/10 relative z-10">
                    <p className="text-[11px] text-slate-400 font-medium">
                      <span className="text-slate-500 font-mono text-[10px] uppercase">Aplicação: </span>
                      <span className={`${theme.accentText} font-medium`}>{tech.popularFor}</span>
                    </p>
                  </div>

                  {/* Bottom Neon Line Accent on Hover */}
                  <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-transparent to-transparent ${theme.accentLine} transition-all duration-500`} />
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}

        {/* Quality & Clean Code Standards Banner in 3D */}
        <ScrollReveal direction="up" duration={0.7} delay={0.15} className="mt-16 p-6 sm:p-8 rounded-2xl card-3d grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Code2 className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Clean Architecture & SOLID</h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Código modular, desacoplado e de fácil leitura, permitindo que outros desenvolvedores assumam o projeto sem retrabalho.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Testes Automatizados & CI/CD</h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Esteiras automatizadas de testes unitários e de integração antes de qualquer código ser enviado para homologação ou produção.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Sem Licenças Recorrentes Ocultas</h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Foco em tecnologias Open Source maduras e arquitetura sem dependência de licenças proprietárias caras de terceiros.
              </p>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
