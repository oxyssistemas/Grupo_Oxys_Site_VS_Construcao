import React from 'react';
import { Link } from 'react-router-dom';
import { BrandMark } from './ui';
import { NAV_LINKS } from './Header';
import { LINKS } from '../config';

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#e6ecf5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
          <Link to="/sistemas" aria-label="Oxys Sistemas — voltar para a página da Oxys Sistemas">
            <BrandMark />
          </Link>
          <span className="hidden sm:block w-px h-5 bg-[#e0e6ef]" aria-hidden="true" />
          <p className="text-sm text-slate-500">
            Uma solução da{' '}
            <Link to="/sistemas" className="font-medium text-[#102344] hover:text-[#1565FF] transition-colors">
              Oxys Sistemas
            </Link>
            .
          </p>
        </div>

        <nav aria-label="Rodapé" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-[#1565FF] transition-colors">
              {link.label}
            </a>
          ))}
          <Link to={LINKS.contact} className="hover:text-[#1565FF] transition-colors">
            Contato
          </Link>
          <a href={LINKS.privacy} target="_blank" rel="noopener noreferrer" className="hover:text-[#1565FF] transition-colors">
            Privacidade
          </a>
        </nav>
      </div>
      <div className="border-t border-[#f0f3f8]">
        <p className="max-w-6xl mx-auto px-4 sm:px-6 py-4 text-xs text-slate-400">
          © {new Date().getFullYear()} Grupo Oxys. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
