import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, LucideIcon, UtensilsCrossed } from 'lucide-react';
import { BRAND_CONFIG } from '../../../config/brandAssets';

/**
 * Logo da Oxys Sistemas (mesma imagem e tipografia do site do grupo),
 * com cores ajustadas para o fundo claro desta página.
 */
export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {BRAND_CONFIG.HEADER_LOGO_SRC && (
        <img src={BRAND_CONFIG.HEADER_LOGO_SRC} alt="" aria-hidden="true" className="h-9 w-auto object-contain" />
      )}
      <span className="flex flex-col justify-center" aria-hidden="true">
        <span className="font-orbitron font-extrabold text-[20px] tracking-[0.14em] leading-none text-[#102344]">
          {BRAND_CONFIG.BRAND_NAME}
        </span>
        <span className="font-rajdhani font-semibold text-[10px] tracking-[0.26em] text-slate-500 uppercase mt-1 leading-none">
          {BRAND_CONFIG.BRAND_SUBTITLE}
        </span>
      </span>
    </span>
  );
}

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#1565FF] text-white shadow-[0_8px_20px_-6px_rgba(21,101,255,0.55)] hover:bg-[#0f56e0] hover:shadow-[0_12px_26px_-8px_rgba(21,101,255,0.6)]',
  secondary: 'bg-white text-[#102344] border border-[#d5deec] hover:border-[#1565FF]/50 hover:text-[#1565FF]',
  ghost: 'text-[#102344] hover:text-[#1565FF]',
};

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  arrow?: boolean;
  size?: 'md' | 'sm';
  className?: string;
  onClick?: () => void;
  'aria-label'?: string;
}

/** Botão com aparência de botão, mas semântica de link (todos os CTAs levam a um destino). */
export const ButtonLink: React.FC<ButtonLinkProps> = ({ href, variant = 'primary', arrow, size = 'md', className = '', children, onClick, ...aria }) => {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      onClick={onClick}
      {...aria}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 active:scale-[0.98] ${
        size === 'md' ? 'px-6 py-3 text-[15px]' : 'px-4 py-2.5 text-sm'
      } ${buttonStyles[variant]} ${className}`}
    >
      {children}
      {arrow && <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />}
    </a>
  );
};

/** Entrada suave ao entrar na tela (CSS puro + IntersectionObserver; respeita movimento reduzido). */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({ title, description, id }: { title: React.ReactNode; description?: string; id?: string }) {
  return (
    <Reveal className="text-center max-w-3xl mx-auto">
      <h2 id={id} className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#102344] leading-[1.1]">
        {title}
      </h2>
      {description && <p className="mt-4 text-base sm:text-lg text-slate-500">{description}</p>}
    </Reveal>
  );
}

export function IconBadge({ icon: Icon, className = '' }: { icon: LucideIcon; className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#EAF3FF] text-[#1565FF] shrink-0 ${className}`}>
      <Icon className="w-6 h-6" aria-hidden="true" strokeWidth={1.8} />
    </span>
  );
}

const foodTones = {
  warm: 'from-[#ffb36b] via-[#f0803c] to-[#b9471f]',
  green: 'from-[#c7e59a] via-[#8cc063] to-[#4f8a3a]',
  red: 'from-[#ffb199] via-[#e8644a] to-[#9e2f22]',
};

/**
 * Foto de prato: usa a imagem configurada; sem foto, mostra uma ilustração leve em CSS
 * (sem carregar arquivos), para a composição continuar equilibrada.
 */
export function FoodImage({
  src,
  alt,
  tone = 'warm',
  className = '',
}: {
  src?: string;
  alt: string;
  tone?: keyof typeof foodTones;
  className?: string;
}) {
  if (src) {
    return <img src={src} alt={alt} loading="lazy" decoding="async" className={`object-cover ${className}`} />;
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden bg-gradient-to-br ${foodTones[tone]} flex items-center justify-center ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.45),transparent_55%)]" />
      <UtensilsCrossed className="relative w-1/4 h-1/4 max-w-10 max-h-10 text-white/85" aria-hidden="true" />
    </div>
  );
}
