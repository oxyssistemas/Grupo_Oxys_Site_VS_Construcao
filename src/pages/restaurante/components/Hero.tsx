import React from 'react';
import { ButtonLink, Reveal } from './ui';
import { DashboardMockup } from './DashboardMockup';
import { PhoneMenuMockup } from './PhoneMenuMockup';
import { IMAGES, LINKS } from '../config';

export function Hero() {
  return (
    <section id="topo" aria-labelledby="hero-title" className="relative overflow-hidden bg-gradient-to-b from-[#F7F9FC] via-white to-white pt-28 sm:pt-32 pb-16 sm:pb-24">
      {/* Fotos decorativas nas laterais (só aparecem se configuradas em config.ts) */}
      {IMAGES.heroDishLeft && (
        <img
          src={IMAGES.heroDishLeft}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          className="hidden lg:block absolute -left-24 -top-6 w-[300px] xl:w-[340px] pointer-events-none select-none"
        />
      )}
      {IMAGES.heroDishRight && (
        <img
          src={IMAGES.heroDishRight}
          alt=""
          aria-hidden="true"
          decoding="async"
          className="hidden lg:block absolute -right-20 top-24 w-[260px] xl:w-[300px] pointer-events-none select-none"
        />
      )}
      {/* Brilho suave de fundo */}
      <div className="absolute left-1/2 top-40 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-radial from-[#1565FF]/10 to-transparent to-65% pointer-events-none" aria-hidden="true" />

      <p className="hidden lg:block absolute left-[7%] top-48 font-hand text-[22px] leading-snug text-[#102344]/55 -rotate-[10deg]" aria-hidden="true">
        Da cozinha
        <br />
        para o crescimento
        <br />
        do seu negócio.
      </p>
      <p className="hidden lg:block absolute right-[7%] top-36 font-hand text-[22px] leading-snug text-[#102344]/55 -rotate-[10deg]" aria-hidden="true">
        Tecnologia
        <br />
        que serve boas
        <br />
        histórias.
      </p>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-[#EAF3FF] text-[#1565FF] text-[11px] font-semibold tracking-[0.18em]">
            GESTÃO PARA RESTAURANTES
          </span>
          <h1 id="hero-title" className="mt-6 text-[36px] leading-[1.1] sm:text-5xl lg:text-[60px] font-extrabold tracking-tight">
            <span className="block text-[#102344]">Uma operação mais simples.</span>
            <span className="block text-[#1565FF]">Um restaurante mais forte.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-600">Conecte salão, caixa e delivery em uma experiência de gestão.</p>
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <ButtonLink href={LINKS.signup} arrow>
              Teste grátis de 14 dias
            </ButtonLink>
            <ButtonLink href="#recursos" variant="secondary">
              Conhecer o sistema
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={150} className="relative mt-14 sm:mt-16 lg:pr-24">
          <DashboardMockup />
          <PhoneMenuMockup className="hidden lg:block absolute -right-2 xl:-right-8 top-10 w-[230px] h-[450px] z-10" />
        </Reveal>

        {/* No celular e tablet o celular aparece abaixo do painel, sem sobrepor */}
        <Reveal delay={200} className="lg:hidden mt-8 flex justify-center">
          <PhoneMenuMockup className="relative w-[230px] h-[450px]" />
        </Reveal>
      </div>
    </section>
  );
}
