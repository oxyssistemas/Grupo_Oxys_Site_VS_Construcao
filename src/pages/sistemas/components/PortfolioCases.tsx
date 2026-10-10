import React, { useState } from 'react';
import { 
  Utensils, 
  ShoppingBag, 
  Boxes, 
  Wrench, 
  CalendarCheck, 
  Users, 
  BarChart3, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  Image as ImageIcon,
  Sparkles,
  Layers,
  ChevronRight,
  TrendingUp,
  Zap,
  Flame,
  Radio
} from 'lucide-react';
import { SAAS_PRODUCTS_LIST } from '../data/mockData';
import { SaasProduct } from '../types';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { MilkyWayBackground } from './MilkyWayBackground';
import { GalacticTelemetryBadge } from './MilkyWayDecorations';

interface PortfolioCasesProps {
  onSelectSaasPage?: (slug: string) => void;
}

export const PortfolioCases: React.FC<PortfolioCasesProps> = ({ onSelectSaasPage }) => {
  const [selectedSaasId, setSelectedSaasId] = useState<string>(SAAS_PRODUCTS_LIST[0].id);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [redirectNotice, setRedirectNotice] = useState<string | null>(null);

  const selectedSaas = SAAS_PRODUCTS_LIST.find((s) => s.id === selectedSaasId) || SAAS_PRODUCTS_LIST[0];

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const handleRedirect = (saas: SaasProduct) => {
    if (onSelectSaasPage) {
      onSelectSaasPage(saas.slug);
      return;
    }
    
    // Smooth redirect or notice for the dedicated page to be created after home
    const targetUrl = `/saas/${saas.slug}`;
    setRedirectNotice(targetUrl);
    setTimeout(() => {
      // In production / multi-page mode, this navigates to the dedicated SaaS route
      window.location.hash = `#${saas.slug}`;
    }, 400);
  };

  const getSaasIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'Utensils': return <Utensils className={className} />;
      case 'ShoppingBag': return <ShoppingBag className={className} />;
      case 'Boxes': return <Boxes className={className} />;
      case 'Wrench': return <Wrench className={className} />;
      case 'CalendarCheck': return <CalendarCheck className={className} />;
      case 'Users': return <Users className={className} />;
      case 'BarChart3': return <BarChart3 className={className} />;
      default: return <Layers className={className} />;
    }
  };

  return (
    <section id="cases" className="py-24 md:py-32 bg-[#050608] border-b border-white/5 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      
      {/* =========================================================================
          COSMIC DEEP SPACE BACKGROUND
          ========================================================================= */}
      <MilkyWayBackground 
        variant="deep-space" 
        density="normal" 
        imageOpacity={0.35} 
        showShootingStars={true} 
        showConstellations={true}
        showCoordinates={true}
        coordinates="ECOSSISTEMA DIGITAL // PRODUTOS SAAS ATIVOS"
      />

      {/* Dynamic Ambient Flare colored according to active selection */}
      <div 
        className="absolute top-1/4 -left-28 w-[550px] h-[550px] rounded-full pointer-events-none transition-all duration-700 opacity-25" 
        style={{ background: `radial-gradient(circle, ${selectedSaas.colorTheme.primaryHex} 0%, transparent 65%)` }}
      />
      <div 
        className="absolute bottom-10 -right-28 w-[550px] h-[550px] rounded-full pointer-events-none transition-all duration-700 opacity-20" 
        style={{ background: `radial-gradient(circle, ${selectedSaas.colorTheme.primaryHex} 0%, transparent 65%)` }}
      />

      {/* Top and bottom subtle glowing dividers */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up" duration={0.7} distance={30} className="max-w-3xl mb-14 text-left">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-xs uppercase tracking-[0.35em] text-cyan-400 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
              <span>Portfólio de Produtos SaaS</span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400/60 bg-cyan-950/40 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
              {SAAS_PRODUCTS_LIST.length} Plataformas Ativas
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Soluções para seu{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              Negócio
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed max-w-2xl">
            Soluções proprietárias completas e vibrantes, desenhadas sob medida para automatizar, controlar e acelerar operações comerciais em alta performance.
          </p>
        </ScrollReveal>

        {/* =========================================================================
            2 COLUNAS: 
            ESQUERDA: ITENS LIVRES E COLORIDOS COM ANIMAÇÃO NA SELEÇÃO
            DIREITA: PREVIEW HORIZONTAL DA IMAGEM E RECURSOS DO SAAS ATIVO
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ==================== COLUNA ESQUERDA: ITENS LIVRES E COLORIDOS ==================== */}
          <div className="lg:col-span-5 flex flex-col gap-3.5">
            <ScrollReveal direction="right" duration={0.5} distance={20} className="flex items-center justify-between px-1 mb-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Selecione um Sistema ({SAAS_PRODUCTS_LIST.length})</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                Itens Interativos
              </span>
            </ScrollReveal>

            {/* ITENS LIVRES (Elementos soltos e estilizados com cores exclusivas) with Staggered Entrance */}
            <StaggerContainer staggerDelay={0.08} delayChildren={0.1} className="space-y-3">
              {SAAS_PRODUCTS_LIST.map((saas) => {
                const isSelected = selectedSaas.id === saas.id;
                const { colorTheme } = saas;

                return (
                  <StaggerItem
                    key={saas.id}
                    id={`saas-free-item-${saas.id}`}
                    onMouseEnter={() => setSelectedSaasId(saas.id)}
                    onClick={() => {
                      setSelectedSaasId(saas.id);
                    }}
                    style={{
                      ['--saas-glow' as any]: colorTheme.primaryHex,
                    }}
                    className={`group relative rounded-2xl p-4 sm:p-4.5 transition-all duration-400 cursor-pointer overflow-hidden ${
                      isSelected
                        ? `border ${colorTheme.borderClass} ${colorTheme.lightBgClass} animate-saas-active z-20`
                        : 'border border-white/10 bg-[#080b12]/60 hover:bg-[#0d121f]/90 hover:border-white/20 hover:translate-x-1.5'
                    }`}
                  >
                    {/* Active Radar Beacon Waves */}
                    {isSelected && (
                      <div 
                        className="absolute -right-8 -top-8 w-24 h-24 rounded-full pointer-events-none animate-beacon-wave opacity-50"
                        style={{ backgroundColor: colorTheme.primaryHex }}
                      />
                    )}

                    {/* Subtle Background Glow Streak when selected */}
                    {isSelected && (
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none"
                      />
                    )}

                    <div className="flex items-center justify-between gap-3.5 relative z-10">
                      
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Colorful Distinct Icon Container */}
                        <div 
                          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isSelected
                              ? `${colorTheme.iconBgClass} shadow-[0_0_20px_${colorTheme.primaryHex}66] scale-110`
                              : `${colorTheme.iconBgClass} opacity-85 group-hover:opacity-100 group-hover:scale-105`
                          }`}
                        >
                          {getSaasIcon(saas.iconName, `w-5 h-5 ${colorTheme.textClass}`)}
                        </div>

                        {/* Text and Category */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className={`text-sm sm:text-base font-bold truncate transition-colors ${
                              isSelected ? `${colorTheme.textClass} drop-shadow-[0_0_8px_${colorTheme.primaryHex}88]` : 'text-white group-hover:text-slate-100'
                            }`}>
                              {saas.name}
                            </h3>
                          </div>
                          
                          <p className="text-[11px] text-slate-400 truncate mt-0.5 flex items-center gap-1.5">
                            <span 
                              className="w-1.5 h-1.5 rounded-full inline-block" 
                              style={{ backgroundColor: colorTheme.primaryHex }}
                            />
                            <span>{saas.category}</span>
                          </p>
                        </div>
                      </div>

                      {/* Right Action Button with Colored State */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRedirect(saas);
                        }}
                        title={`Acessar página do ${saas.name}`}
                        className={`p-2.5 rounded-xl transition-all shrink-0 cursor-pointer ${
                          isSelected
                            ? `bg-gradient-to-r ${colorTheme.gradientClass} text-slate-950 shadow-md font-bold hover:brightness-110 scale-105`
                            : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Active Expanded Drawer Snippet */}
                    {isSelected && (
                      <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
                        <span className="truncate pr-2 font-mono text-[10px] text-slate-400 flex items-center gap-1">
                          <span className="text-slate-500">Rota:</span>
                          <span className={`${colorTheme.textClass} font-semibold`}>/sistemas/saas/{saas.slug}</span>
                        </span>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRedirect(saas);
                          }}
                          className={`${colorTheme.textClass} hover:brightness-125 font-bold uppercase tracking-wider text-[10px] inline-flex items-center gap-1 shrink-0 cursor-pointer`}
                        >
                          <span>Acessar Página</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>

          {/* ==================== COLUNA DIREITA: PREVIEW HORIZONTAL DA IMAGEM E DETALHES ==================== */}
          <ScrollReveal direction="left" duration={0.8} distance={35} delay={0.15} className="lg:col-span-7 sticky top-24">
            <div 
              id="saas-showcase-preview"
              style={{
                borderColor: selectedSaas.colorTheme.primaryHex + '55',
                boxShadow: `0 20px 50px -10px rgba(0, 0, 0, 0.9), 0 0 35px -5px ${selectedSaas.colorTheme.primaryHex}33`
              }}
              className="card-3d rounded-2xl p-6 sm:p-8 overflow-hidden relative transition-all duration-500"
            >
              {/* 3D Diagonal Light Sheen */}
              <div className="absolute -inset-full w-[250%] h-[250%] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent opacity-0 hover:opacity-100 animate-sheen pointer-events-none z-20" />

              {/* =========================================================================
                  IMAGEM DO SAAS (PARTE HORIZONTAL DO PREVIEW)
                  Caminhos configurados em: /public/saas/{slug}.jpg
                  ========================================================================= */}
              <div 
                onClick={() => handleRedirect(selectedSaas)}
                className="group/img relative w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-gradient-to-b from-[#0e1422] to-[#080b12] border border-white/15 cursor-pointer shadow-inner"
              >
                {/* 3D Top Border Highlight with Dynamic Color */}
                <div 
                  className="absolute inset-x-0 top-0 h-[2px] z-20 opacity-80"
                  style={{
                    background: `linear-gradient(to right, transparent, ${selectedSaas.colorTheme.primaryHex}, transparent)`
                  }}
                />

                {/* Badge on Top Left of Image with Dynamic Color */}
                <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-md bg-black/85 border ${selectedSaas.colorTheme.bgBadgeClass} font-mono text-[10px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5`}>
                    <span 
                      className="w-1.5 h-1.5 rounded-full animate-ping" 
                      style={{ background: `radial-gradient(circle, ${selectedSaas.colorTheme.primaryHex} 0%, transparent 65%)` }}
                    />
                    {selectedSaas.badge}
                  </span>
                </div>

                {/* Direct Link Hover Overlay Indicator */}
                <div className="absolute top-3.5 right-3.5 z-20">
                  <span className="px-2.5 py-1 rounded-md bg-black/80 border border-white/15 text-slate-300 group-hover/img:text-white group-hover/img:border-white/30 text-[10px] font-mono font-medium flex items-center gap-1 transition-colors">
                    <span>Clique para Abrir</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>

                {/* Real Image Render (when placed in /public/saas/...) */}
                {selectedSaas.image && !imageErrors[selectedSaas.id] ? (
                  <img
                    src={selectedSaas.image}
                    alt={selectedSaas.name}
                    onError={() => handleImageError(selectedSaas.id)}
                    className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  /* Futuristic 3D Cyber Placeholder with Distinct SaaS Color */
                  <div className="w-full h-full relative flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#0f172a]/70 via-[#0a0f1d]/90 to-[#07090e]">
                    
                    {/* Cyber Grid Background */}
                    <div 
                      className="absolute inset-0 opacity-20 pointer-events-none"
                      style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, ${selectedSaas.colorTheme.primaryHex} 1.2px, transparent 0)`,
                        backgroundSize: '24px 24px'
                      }}
                    />

                    {/* Glowing Cyber Emblem with Product Theme Color */}
                    <div 
                      style={{
                        boxShadow: `0 0 35px ${selectedSaas.colorTheme.primaryHex}44`,
                        borderColor: `${selectedSaas.colorTheme.primaryHex}88`
                      }}
                      className="relative z-10 w-20 h-20 rounded-2xl bg-black/60 border flex items-center justify-center group-hover/img:scale-110 transition-all duration-500"
                    >
                      {getSaasIcon(selectedSaas.iconName, `w-10 h-10 ${selectedSaas.colorTheme.textClass}`)}
                    </div>

                    <h4 className={`relative z-10 mt-4 text-base font-bold text-white transition-colors group-hover/img:${selectedSaas.colorTheme.textClass}`}>
                      Preview do Sistema {selectedSaas.name}
                    </h4>

                    {/* Directory instruction */}
                    <div className="relative z-10 mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 border border-white/10 text-[11px] font-mono text-slate-400 group-hover/img:text-slate-200 transition-colors">
                      <ImageIcon className={`w-3.5 h-3.5 ${selectedSaas.colorTheme.textClass}`} />
                      <span>Adicione a foto em: /public{selectedSaas.image}</span>
                    </div>

                    <p className="relative z-10 mt-3 text-xs text-slate-400 max-w-md">
                      Clique em qualquer lugar da imagem para navegar até a página dedicada do software.
                    </p>
                  </div>
                )}

                {/* Bottom Shadow Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0e17] to-transparent pointer-events-none z-10" />
              </div>

              {/* =========================================================================
                  INFORMAÇÕES DETALHADAS & RECURSOS DO SAAS SELECIONADO
                  ========================================================================= */}
              <div className="mt-6 space-y-5">
                
                {/* Header with Title & Category */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div>
                    <span 
                      className="text-[10px] font-mono font-bold uppercase tracking-widest"
                      style={{ color: selectedSaas.colorTheme.primaryHex }}
                    >
                      {selectedSaas.category}
                    </span>
                    <h3 
                      onClick={() => handleRedirect(selectedSaas)}
                      className={`text-2xl font-bold text-white hover:${selectedSaas.colorTheme.textClass} transition-colors cursor-pointer flex items-center gap-2`}
                    >
                      <span>{selectedSaas.name}</span>
                      <ExternalLink className="w-4 h-4 text-slate-500 hover:text-white" />
                    </h3>
                  </div>

                  {selectedSaas.metrics && (
                    <div 
                      style={{ borderColor: selectedSaas.colorTheme.primaryHex + '44' }}
                      className="px-3.5 py-1.5 rounded-xl bg-black/40 border text-left sm:text-right shrink-0"
                    >
                      <p className="text-xs font-mono text-slate-400 uppercase">Impacto Médio</p>
                      <p className={`text-sm font-bold font-mono ${selectedSaas.colorTheme.textClass}`}>
                        {selectedSaas.metrics.value}
                      </p>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedSaas.fullDesc}
                </p>

                {/* Key Highlights Grid */}
                <div className="space-y-2">
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Principais Funcionalidades Integradas:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedSaas.highlights.map((feat, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#080c14] border border-white/10 text-xs text-slate-200"
                      >
                        <CheckCircle2 
                          className="w-3.5 h-3.5 shrink-0" 
                          style={{ color: selectedSaas.colorTheme.primaryHex }}
                        />
                        <span className="font-medium truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Action Button with SaaS Theme Gradient */}
                <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => handleRedirect(selectedSaas)}
                    style={{
                      boxShadow: `0 10px 25px -5px ${selectedSaas.colorTheme.primaryHex}66`
                    }}
                    className={`w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-slate-950 bg-gradient-to-r ${selectedSaas.colorTheme.gradientClass} hover:brightness-110 rounded-xl transition-all cursor-pointer`}
                  >
                    <span>Acessar Página do {selectedSaas.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-[11px] font-mono text-slate-400">
                    Rota: <code className={selectedSaas.colorTheme.textClass}>/sistemas/saas/{selectedSaas.slug}</code>
                  </div>
                </div>
              </div>

            </div>
          </ScrollReveal>

        </div>

      </div>

      {/* Redirect / Navigation Notice Toast */}
      {redirectNotice && (
        <div 
          style={{ borderColor: selectedSaas.colorTheme.primaryHex }}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#0a0f1d] border shadow-2xl text-white max-w-sm animate-bounce"
        >
          <div className="flex items-start gap-3">
            <div 
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedSaas.colorTheme.iconBgClass} shrink-0`}
            >
              <ExternalLink className="w-4 h-4" />
            </div>
            <div>
              <p className={`text-xs font-bold ${selectedSaas.colorTheme.textClass}`}>
                Redirecionando para SaaS
              </p>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Pronto para a rota: <span className="font-mono text-white font-bold">{redirectNotice}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
