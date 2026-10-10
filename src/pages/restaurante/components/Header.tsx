import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BrandMark, ButtonLink } from './ui';
import { LINKS } from '../config';

export const NAV_LINKS = [
  { label: 'Recursos', href: '#recursos' },
  { label: 'Delivery', href: '#delivery' },
  { label: 'Planos', href: '#planos' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'bg-white/90 backdrop-blur-md border-b border-[#e6ecf5] shadow-[0_6px_24px_-12px_rgba(16,35,68,0.18)]'
          : 'bg-white/60 border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-[72px] flex items-center justify-between gap-4">
        <Link to="/sistemas" aria-label="Oxys Sistemas — voltar para a página da Oxys Sistemas">
          <BrandMark />
        </Link>

        <nav aria-label="Seções da página" className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-[#102344]/80 hover:text-[#1565FF] transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <a href={LINKS.login} className="text-sm font-medium text-[#102344]/80 hover:text-[#1565FF] transition-colors">
            Entrar
          </a>
          <ButtonLink href={LINKS.signup} size="sm" arrow>
            Teste grátis de 14 dias
          </ButtonLink>
        </div>

        <button
          type="button"
          className="md:hidden p-2 -mr-2 rounded-lg text-[#102344]"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="rest-mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div id="rest-mobile-menu" className="md:hidden border-t border-[#e6ecf5] bg-white">
          <nav aria-label="Seções da página" className="max-w-6xl mx-auto px-4 py-4 flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-[#102344] border-b border-[#f0f3f8]"
              >
                {link.label}
              </a>
            ))}
            <a href={LINKS.login} className="py-3 text-base font-medium text-[#102344]">
              Entrar
            </a>
            <ButtonLink href={LINKS.signup} arrow className="mt-3 w-full">
              Teste grátis de 14 dias
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  );
}
