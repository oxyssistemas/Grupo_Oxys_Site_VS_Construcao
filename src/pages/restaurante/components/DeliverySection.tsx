import React from 'react';
import { Check } from 'lucide-react';
import { ButtonLink, Reveal } from './ui';
import { PhoneMenuMockup } from './PhoneMenuMockup';
import { LINKS } from '../config';

/** Etapas reais do acompanhamento de pedido do sistema (página pública de rastreio). */
const STEPS = [
  { label: 'Pedido recebido', time: '12:14', done: true },
  { label: 'Em preparo', time: '12:28', done: true },
  { label: 'Saiu para entrega', time: '12:45', done: true },
  { label: 'Entregue', time: '', done: false },
];

export function DeliverySection() {
  return (
    <section id="delivery" aria-labelledby="delivery-title" className="scroll-mt-20 relative overflow-hidden bg-[#EAF3FF] py-20 sm:py-24">
      <p className="hidden lg:block absolute right-[5%] top-16 font-hand text-[22px] leading-snug text-[#102344]/50 -rotate-[10deg]" aria-hidden="true">
        Mais sabor
        <br />
        para o seu negócio.
      </p>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-14 items-center [&>*]:min-w-0">
        <Reveal className="relative flex justify-center lg:justify-start order-2 lg:order-1">
          <div className="relative flex flex-col sm:flex-row items-center sm:items-end gap-6">
            <PhoneMenuMockup variant="delivery" className="relative w-[200px] sm:w-[210px] h-[400px] sm:h-[410px] -rotate-[6deg] shrink-0" />
            <div
              className="rounded-2xl bg-white border border-[#dfe8f5] shadow-[0_16px_40px_-20px_rgba(16,35,68,0.35)] p-5 w-[220px] sm:w-[190px] sm:mb-10"
              role="img"
              aria-label="Ilustração das etapas do pedido: recebido, em preparo, saiu para entrega e entregue"
            >
              <ol className="space-y-4" aria-hidden="true">
                {STEPS.map((step, i) => (
                  <li key={step.label} className="relative flex gap-3">
                    {i < STEPS.length - 1 && (
                      <span className={`absolute left-[9px] top-5 w-px h-[calc(100%+4px)] ${step.done ? 'bg-[#1565FF]' : 'bg-[#d3dbe7]'}`} />
                    )}
                    <span
                      className={`relative w-[19px] h-[19px] rounded-full flex items-center justify-center shrink-0 ${
                        step.done ? 'bg-[#1565FF] text-white' : 'border-2 border-[#d3dbe7] bg-white'
                      }`}
                    >
                      {step.done && <Check className="w-3 h-3" strokeWidth={3} />}
                    </span>
                    <span>
                      <span className={`block text-[13px] font-semibold ${step.done ? 'text-[#102344]' : 'text-slate-400'}`}>{step.label}</span>
                      {step.time && <span className="block text-[11px] text-slate-400">{step.time}</span>}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="order-1 lg:order-2 text-center lg:text-left">
          <h2 id="delivery-title" className="text-[28px] sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.1]">
            <span className="block text-[#102344]">Seu cardápio online.</span>
            <span className="block text-[#1565FF]">Sua marca em destaque.</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-lg mx-auto lg:mx-0">
            Ofereça uma loja online para seus clientes conhecerem o cardápio e fazerem seus pedidos.
          </p>
          <ButtonLink href={LINKS.deliveryInfo} arrow className="mt-8">
            Conhecer o delivery
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
