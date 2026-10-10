import React from 'react';
import { ButtonLink, Reveal } from './ui';
import { IMAGES, LINKS } from '../config';

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="bg-white pt-4 pb-16 sm:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="relative overflow-hidden rounded-3xl bg-[#102344] px-6 py-10 sm:px-12 sm:py-12">
          {IMAGES.ctaBackground && (
            <img
              src={IMAGES.ctaBackground}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
          )}
          {/* Degradê garante contraste do texto sobre a foto */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#102344] via-[#102344]/90 to-[#102344]/40" aria-hidden="true" />
          <div className="absolute -right-24 -bottom-24 w-80 h-80 rounded-full bg-radial from-[#1565FF]/35 to-transparent to-65%" aria-hidden="true" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 id="cta-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Vamos organizar seu restaurante?
              </h2>
              <p className="mt-2 text-base text-white/75">Teste grátis por 14 dias e conheça o Oxys Restaurante na prática.</p>
            </div>
            <ButtonLink href={LINKS.signup} arrow className="shrink-0">
              Teste grátis de 14 dias
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
