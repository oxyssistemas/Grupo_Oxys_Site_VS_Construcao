import React, { useState } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';

export type LanguageCode = 'pt' | 'en' | 'es';

interface Language {
  code: LanguageCode;
  label: string;
  shortLabel: string;
  flag: string;
}

const LANGUAGES: Language[] = [
  { code: 'pt', label: 'Português (BR)', shortLabel: 'PT', flag: '🇧🇷' },
  { code: 'en', label: 'English (US)', shortLabel: 'EN', flag: '🇺🇸' },
  { code: 'es', label: 'Español (ES)', shortLabel: 'ES', flag: '🇪🇸' },
];

interface LanguageSelectorProps {
  variant?: 'pill' | 'dropdown' | 'compact';
  className?: string;
  onChange?: (lang: LanguageCode) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'dropdown',
  className = '',
  onChange
}) => {
  const [selectedLang, setSelectedLang] = useState<LanguageCode>('pt');
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (code: LanguageCode) => {
    setSelectedLang(code);
    setIsOpen(false);
    if (onChange) onChange(code);
  };

  const current = LANGUAGES.find(l => l.code === selectedLang) || LANGUAGES[0];

  if (variant === 'pill') {
    return (
      <div 
        id="language-selector-pill"
        className={`inline-flex items-center gap-1 p-0.5 rounded-full bg-[#030914]/90 border border-cyan-500/25 shadow-[0_0_15px_rgba(0,217,255,0.1)] ${className}`}
      >
        <div className="pl-2 pr-1 text-cyan-400">
          <Globe className="w-3.5 h-3.5" />
        </div>
        {LANGUAGES.map((lang) => {
          const isActive = selectedLang === lang.code;
          return (
            <button
              key={lang.code}
              id={`lang-pill-${lang.code}`}
              onClick={() => handleSelect(lang.code)}
              className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_8px_rgba(0,217,255,0.4)]'
                  : 'text-slate-400 hover:text-cyan-200'
              }`}
            >
              {lang.shortLabel}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        id="language-selector-dropdown-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#030914]/80 hover:bg-[#06101E] border border-cyan-500/25 hover:border-cyan-400/50 text-cyan-300 text-[11px] font-mono font-semibold transition-all shadow-[0_0_10px_rgba(0,217,255,0.08)] cursor-pointer"
        aria-label="Selecionar idioma"
      >
        <Globe className="w-3.5 h-3.5 text-cyan-400" />
        <span>{current.shortLabel}</span>
        <span className="text-[10px] text-slate-500">{current.flag}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-cyan-300' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)} 
          />
          <div 
            id="language-dropdown-menu"
            className="absolute right-0 mt-1.5 w-36 py-1 bg-[#040814]/95 border border-cyan-500/30 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="px-2.5 py-1 text-[9px] font-mono uppercase text-slate-400 tracking-wider border-b border-white/10">
              Idioma / Language
            </div>
            {LANGUAGES.map((lang) => {
              const isActive = selectedLang === lang.code;
              return (
                <button
                  key={lang.code}
                  id={`lang-option-${lang.code}`}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 text-left text-xs font-mono transition-colors cursor-pointer ${
                    isActive 
                      ? 'bg-cyan-500/15 text-cyan-300 font-bold' 
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </div>
                  {isActive && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
