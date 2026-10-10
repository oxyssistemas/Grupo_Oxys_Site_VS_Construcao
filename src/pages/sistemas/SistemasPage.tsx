import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { CompanyId } from '../../types';
import { usePauseOffscreenSections } from '../../hooks/usePauseOffscreenSections';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { TechStackSection } from './components/TechStackSection';
import { PortfolioCases } from './components/PortfolioCases';
import { ProcessMethodology } from './components/ProcessMethodology';
import { Differentials } from './components/Differentials';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { COMPANY_INFO } from './data/mockData';
import './sistemas.css';

/**
 * Página da Oxys Sistemas dentro do site do Grupo Oxys.
 * Usa o menu e o rodapé do grupo, mantendo o design próprio da Oxys Sistemas.
 */
export default function SistemasPage() {
  const navigate = useNavigate();
  const { hash } = useLocation();
  usePauseOffscreenSections();

  // Chegando de outra página com âncora (ex.: /sistemas#contato)
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 100);
    return () => clearTimeout(t);
  }, [hash]);

  const scrollToContact = useCallback(() => {
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSelectCompany = useCallback(
    (companyId: CompanyId) => {
      if (companyId === 'sistemas') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      navigate('/', { state: { openCompany: companyId } });
    },
    [navigate]
  );

  const handleSelectSaas = useCallback(
    (slug: string) => navigate(`/sistemas/saas/${slug}`),
    [navigate]
  );

  const handleWhatsAppQuickClick = () => {
    const text = encodeURIComponent(
      'Olá! Gostaria de conversar com a equipe de engenharia da Oxys Sistemas sobre um novo projeto de software / aplicativo.'
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="oxys-sistemas-page min-h-screen bg-[#050608] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-clip">
      <Navbar onSelectCompany={handleSelectCompany} onOpenContact={scrollToContact} />

      <main>
        <Hero />
        <ServicesSection onSelectService={scrollToContact} />
        <PortfolioCases onSelectSaasPage={handleSelectSaas} />
        <TechStackSection />
        <ProcessMethodology />
        <Differentials />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer onSelectCompany={handleSelectCompany} onOpenContact={scrollToContact} />

      {/* Botão flutuante: WhatsApp */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        <button
          id="floating-whatsapp-btn"
          onClick={handleWhatsAppQuickClick}
          aria-label="Atendimento via WhatsApp"
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-cyan-400 text-slate-950 shadow-[0_0_20px_#22d3ee] hover:bg-cyan-300 hover:scale-105 transition-all cursor-pointer"
        >
          <MessageSquare className="w-5 h-5 fill-current" />
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-sm bg-[#0a0c10] text-[11px] font-mono uppercase tracking-wider text-white border border-white/10 shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Falar no WhatsApp
          </span>
        </button>
      </div>
    </div>
  );
}
