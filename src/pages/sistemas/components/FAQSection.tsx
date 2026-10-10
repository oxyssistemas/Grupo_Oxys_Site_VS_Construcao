import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare } from 'lucide-react';
import { FAQ_LIST, COMPANY_INFO } from '../data/mockData';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { MilkyWayBackground } from './MilkyWayBackground';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_LIST[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = FAQ_LIST.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#050608] border-b border-white/5 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      
      {/* =========================================================================
          COSMIC CONSTELLATION BACKGROUND
          ========================================================================= */}
      <MilkyWayBackground 
        variant="constellation" 
        density="normal" 
        imageOpacity={0.28} 
        showShootingStars={true} 
        showConstellations={true}
        showCoordinates={true}
        coordinates="BASE DE CONHECIMENTO // SUPORTE TÉCNICO & FAQ"
      />

      {/* Subtle Top & Bottom Glowing Lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up" duration={0.7} distance={30} className="text-center mb-14 space-y-3">
          <div className="text-xs uppercase tracking-[0.4em] text-cyan-400 font-bold mb-1">
            Knowledge Base
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-base text-slate-400 max-w-xl mx-auto">
            Transparência total sobre propriedade intelectual, prazos de entrega, metodologia e suporte.
          </p>

          {/* FAQ search */}
          <div className="pt-4 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar pergunta ou palavra-chave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-black/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>
        </ScrollReveal>

        {/* FAQ Accordion List with Staggered Scroll Reveal */}
        <StaggerContainer staggerDelay={0.06} delayChildren={0.1} className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <StaggerItem
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#0a0c10] border-cyan-500/50 shadow-xl shadow-cyan-950/30'
                    : 'bg-[#0a0c10]/50 border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider rounded bg-black text-cyan-400 border border-white/10 shrink-0">
                      {faq.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="shrink-0 text-slate-400">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-cyan-400" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 font-normal">
                    {faq.answer}
                  </div>
                )}
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Still have questions banner */}
        <ScrollReveal direction="up" duration={0.65} delay={0.15} className="mt-12 p-6 rounded-2xl bg-[#0a0c10] border border-cyan-500/30 text-center space-y-3 shadow-xl">
          <h4 className="text-base font-bold text-white">
            Ainda tem alguma dúvida específica sobre o seu projeto?
          </h4>
          <p className="text-xs text-slate-400 max-w-lg mx-auto">
            Nossos arquitetos de software e engenheiros de soluções estão disponíveis para conversar e entender sua necessidade.
          </p>
          <div className="pt-2">
            <a
              href="#contato"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-sm shadow-md transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Falar com Nossa Engenharia</span>
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
