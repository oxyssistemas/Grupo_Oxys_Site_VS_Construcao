import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, Code2, Server, Cloud, Cpu } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OxysLogo } from './OxysLogo';
import { CompanyId } from '../types';

// Serviços exibidos no submenu de SERVIÇOS; cada um leva à empresa do grupo que o presta
const SERVICE_LINKS: {
  label: string;
  description: string;
  icon: React.ElementType;
  company: CompanyId;
  route?: string;
}[] = [
  { label: 'Desenvolvimento', description: 'Oxys Sistemas · software sob medida, web, mobile e ERP.', icon: Code2, company: 'sistemas', route: '/sistemas' },
  { label: 'Infraestrutura & Suporte', description: 'Oxys TI · suporte especializado, segurança e gestão de TI.', icon: Server, company: 'ti' },
  { label: 'Cloud & DevOps', description: 'Oxys Cloud · nuvem, migrações, DevOps e redução de custos.', icon: Cloud, company: 'cloud' },
  { label: 'Automação', description: 'Oxys Automação · automação industrial e comercial, RPA e IoT.', icon: Cpu, company: 'automacao' },
];

interface NavbarProps {
  onSelectCompany?: (companyId: CompanyId) => void;
  onOpenContact?: (preselectedUnit?: CompanyId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectCompany, onOpenContact }) => {
  const [activeItem, setActiveItem] = useState<string>('HOME');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === '/';

  useEffect(() => {
    // Processa no máximo uma vez por frame (o evento de scroll dispara dezenas de vezes por frame)
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        updateFromScroll();
      });
    };

    const updateFromScroll = () => {
      setIsScrolled(window.scrollY > 20);
      // Fora da home (ex.: /sistemas) as seções do menu não existem nesta página
      if (!isHome) return;

      // Simple active link detection based on scroll position
      const scrollPos = window.scrollY + 120;
      const sections = [
        { id: 'home', name: 'HOME' },
        { id: 'about', name: 'ABOUT' },
        { id: 'servicos', name: 'SERVIÇOS' },
        { id: 'processos', name: 'PROCESSOS' },
      ];

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveItem(section.name);
            break;
          }
        }
      }
    };

    if (!isHome) setActiveItem('');
    updateFromScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const navItems = [
    { label: 'HOME', href: '#home', id: 'home' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'SERVIÇOS', href: '#servicos', id: 'servicos' },
    { label: 'PROCESSOS', href: '#processos', id: 'processos' },
  ];

  const handleServiceClick = (service: (typeof SERVICE_LINKS)[number]) => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
    if (service.route) {
      navigate(service.route);
    } else if (onSelectCompany) {
      onSelectCompany(service.company);
    } else {
      navigate('/', { state: { openCompany: service.company } });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof navItems[0]) => {
    e.preventDefault();
    setActiveItem(item.label);
    setMobileMenuOpen(false);

    // Em outra página: volta para a home já na seção escolhida
    if (!isHome) {
      navigate(item.id === 'home' ? '/' : `/#${item.id}`);
      return;
    }

    if (item.id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetEl = document.getElementById(item.id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    setMobileMenuOpen(false);
    if (onOpenContact) {
      onOpenContact();
    } else {
      const contactEl = document.getElementById('contato');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#02050e]/95 border-b border-blue-950/40 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.85)]'
          : 'bg-gradient-to-b from-[#02050e]/90 via-[#02050e]/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo on Left */}
          <a
            href="#home"
            id="brand-logo"
            onClick={(e) => {
              e.preventDefault();
              setActiveItem('HOME');
              if (!isHome) navigate('/');
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center transition-opacity hover:opacity-95 focus:outline-none"
            aria-label="Oxys Sistemas | TI Home"
          >
            <OxysLogo size="md" />
          </a>

          {/* Desktop Navigation Links & Action Button */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-11">
            <nav className="flex items-center gap-7 xl:gap-9" aria-label="Main Navigation">
              {navItems.map((item) => {
                const isActive = activeItem === item.label;
                const hasSubmenu = item.id === 'servicos';
                const link = (
                  <a
                    key={item.label}
                    href={item.href}
                    id={`nav-link-${item.label.toLowerCase()}`}
                    onClick={(e) => handleNavClick(e, item)}
                    aria-haspopup={hasSubmenu || undefined}
                    aria-expanded={hasSubmenu ? servicesOpen : undefined}
                    className={`relative py-1 text-[12.5px] font-semibold tracking-[0.14em] uppercase transition-all duration-200 inline-flex items-center gap-1 ${
                      isActive
                        ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {hasSubmenu && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                    )}
                    {/* Active Underline Indicator matching image */}
                    {isActive && (
                      <motion.div
                        layoutId="navActiveIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0099ff] to-transparent shadow-[0_0_8px_#0099ff]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );

                if (!hasSubmenu) return link;

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                    onFocus={() => setServicesOpen(true)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) setServicesOpen(false);
                    }}
                  >
                    {link}
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[340px]"
                        >
                          <div className="rounded-2xl bg-[#050b1a] border border-blue-900/50 shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(0,136,255,0.12)] p-2">
                            {SERVICE_LINKS.map((service) => {
                              const Icon = service.icon;
                              return (
                                <button
                                  key={service.label}
                                  type="button"
                                  onClick={() => handleServiceClick(service)}
                                  className="w-full flex items-start gap-3 p-3 rounded-xl text-left hover:bg-blue-950/40 focus:bg-blue-950/40 focus:outline-none transition-colors group/item"
                                >
                                  <span className="shrink-0 w-9 h-9 rounded-lg bg-[#08142b] border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover/item:text-[#00f0ff] group-hover/item:border-sky-400/60 transition-colors">
                                    <Icon className="w-4.5 h-4.5" />
                                  </span>
                                  <span>
                                    <span className="block text-[12.5px] font-semibold tracking-wider uppercase text-white group-hover/item:text-sky-300 transition-colors">
                                      {service.label}
                                    </span>
                                    <span className="block mt-0.5 text-xs text-slate-400 leading-snug normal-case tracking-normal">
                                      {service.description}
                                    </span>
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* Right Button: "VAMOS CONVERSAR" */}
            <button
              id="nav-btn-vamos-conversar"
              onClick={handleContactClick}
              className="relative group px-6 py-2 rounded-full border border-[#0088ff] text-white text-[12.5px] font-semibold tracking-[0.14em] uppercase bg-blue-950/20 hover:bg-[#0088ff]/15 shadow-[0_0_15px_rgba(0,136,255,0.35)] hover:shadow-[0_0_22px_rgba(0,136,255,0.6)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none"
            >
              <span className="relative z-10 text-slate-100 group-hover:text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">
                VAMOS CONVERSAR
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-[#0088ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              aria-expanded={mobileMenuOpen}
              aria-label="Alternar menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-[#02050e]/98 border-b border-blue-900/30 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-4">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => {
                  const isActive = activeItem === item.label;
                  const link = (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item)}
                      className={`px-3 py-2.5 rounded-lg text-sm font-semibold tracking-[0.14em] uppercase transition-colors flex items-center justify-between ${
                        isActive
                          ? 'bg-blue-900/30 text-white border-l-2 border-[#0099ff]'
                          : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <div className="w-2 h-2 rounded-full bg-[#0099ff] shadow-[0_0_6px_#0099ff]" />}
                    </a>
                  );
                  if (item.id !== 'servicos') return link;
                  return (
                    <div key={item.label}>
                      {link}
                      <div className="mt-1 ml-3 pl-3 border-l border-blue-900/40 flex flex-col">
                        {SERVICE_LINKS.map((service) => {
                          const Icon = service.icon;
                          return (
                            <button
                              key={service.label}
                              type="button"
                              onClick={() => handleServiceClick(service)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-sm text-slate-300 hover:bg-slate-900 hover:text-white transition-colors"
                            >
                              <Icon className="w-4 h-4 text-sky-400 shrink-0" />
                              {service.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </nav>

              <div className="pt-3 border-t border-slate-800/80">
                <button
                  onClick={handleContactClick}
                  className="w-full py-3 rounded-full border border-[#0088ff] text-white text-xs font-semibold tracking-[0.16em] uppercase bg-blue-950/40 shadow-[0_0_15px_rgba(0,136,255,0.4)] text-center block"
                >
                  VAMOS CONVERSAR
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
