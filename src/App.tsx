import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { motion, MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CompaniesGrid } from './components/CompaniesGrid';
import { ServicesTechSection } from './components/ServicesTechSection';
import { ProcessSection } from './components/ProcessSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CompanyModal } from './components/CompanyModal';
import { CompanyId, Company } from './types';
import { COMPANIES_DATA } from './data/companies';
import { usePauseOffscreenSections } from './hooks/usePauseOffscreenSections';

// Evita re-renderizar seções pesadas quando só o hover dos cards muda
const MemoServicesTechSection = memo(ServicesTechSection);
const MemoProcessSection = memo(ProcessSection);
const MemoAboutSection = memo(AboutSection);
const MemoContactSection = memo(ContactSection);
const MemoFooter = memo(Footer);
const MemoNavbar = memo(Navbar);
const MemoCompanyModal = memo(CompanyModal);

export type IgnitionStage = 'black' | 'core' | 'circuits' | 'revealed';

export default function App() {
  const [stage, setStage] = useState<IgnitionStage>('black');
  const [selectedCompanyId, setSelectedCompanyId] = useState<CompanyId | null>(null);
  const [hoveredCompany, setHoveredCompany] = useState<CompanyId | null>(null);
  const [contactPreselectedUnit, setContactPreselectedUnit] = useState<CompanyId | null>(null);
  const [contactPreselectedSolution, setContactPreselectedSolution] = useState<string | null>(null);

  useEffect(() => {
    // 1. Abertura: tela preta
    // 2. Núcleo acende instantaneamente (40ms)
    const t1 = setTimeout(() => {
      setStage('core');
    }, 40);

    // 3. Circuitos acendem e expandem (300ms)
    const t2 = setTimeout(() => {
      setStage('circuits');
    }, 300);

    // 4. Site é totalmente revelado (750ms) - transição fluida sem sensação de travamento
    const t3 = setTimeout(() => {
      setStage('revealed');
    }, 750);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const selectedCompany: Company | null = useMemo(
    () => (selectedCompanyId ? COMPANIES_DATA.find((c) => c.id === selectedCompanyId) || null : null),
    [selectedCompanyId]
  );

  usePauseOffscreenSections();

  const handleOpenCompanyModal = useCallback((companyId: CompanyId) => {
    setSelectedCompanyId(companyId);
  }, []);

  const handleCloseCompanyModal = useCallback(() => {
    setSelectedCompanyId(null);
  }, []);

  const handleOpenContact = useCallback((preselectedUnit?: CompanyId) => {
    if (preselectedUnit) {
      setContactPreselectedUnit(preselectedUnit);
    }
    const contactElem = document.getElementById('contato');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleOpenContactGeneric = useCallback(() => handleOpenContact(), [handleOpenContact]);

  const isRevealed = stage === 'revealed';

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-[#02050e] text-slate-100 selection:bg-blue-500 selection:text-white flex flex-col overflow-x-hidden">
      {/* Top Navbar: Revelada apenas ao término da animação */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={!isRevealed ? 'pointer-events-none' : ''}
      >
        <MemoNavbar
          onSelectCompany={handleOpenCompanyModal}
          onOpenContact={handleOpenContact}
        />
      </motion.div>

      <main className="flex-grow">
        {/* Hero Section: Executa a ignição do núcleo -> circuitos -> revelação dos textos e botões */}
        <Hero
          hoveredCompany={hoveredCompany}
          onSelectCompany={handleOpenCompanyModal}
          onOpenContact={handleOpenContactGeneric}
          stage={stage}
        />

        {/* Demais Seções: Reveladas exclusivamente ao final da animação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className={!isRevealed ? 'pointer-events-none' : ''}
        >
          {/* 4 Companies Grid Section */}
          <CompaniesGrid
            hoveredCompany={hoveredCompany}
            onHoverCompany={setHoveredCompany}
            onSelectCompany={handleOpenCompanyModal}
            onRequestQuoteForCompany={handleOpenContact}
          />

          {/* Services & Technologies Showcase Section */}
          <MemoServicesTechSection />

          {/* Nosso Processo Showcase Section */}
          <MemoProcessSection />

          {/* About Group Structure & Differentials */}
          <MemoAboutSection onSelectCompany={handleOpenCompanyModal} />

          {/* Interactive Proposal & Contact Section */}
          <MemoContactSection
            preselectedUnit={contactPreselectedUnit}
            preselectedSolution={contactPreselectedSolution}
          />
        </motion.div>
      </main>

      {/* Footer: Revelado exclusivamente ao final da animação */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        className={!isRevealed ? 'pointer-events-none' : ''}
      >
        <MemoFooter
          onSelectCompany={handleOpenCompanyModal}
          onOpenContact={handleOpenContactGeneric}
        />
      </motion.div>

      {/* Deep Dive Company Detail Modal */}
      <MemoCompanyModal
        company={selectedCompany}
        isOpen={!!selectedCompanyId}
        onClose={handleCloseCompanyModal}
        onOpenContactWithCompany={handleOpenContact}
      />
    </div>
    </MotionConfig>
  );
}
