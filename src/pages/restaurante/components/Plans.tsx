import React from 'react';
import { Check, Crown, BarChart3, UtensilsCrossed, MessageCircle } from 'lucide-react';
import { ButtonLink, Reveal, SectionHeading } from './ui';
import { LINKS, PLANS, Plan } from '../config';

const PLAN_ICONS: Record<Plan['icon'], typeof Crown> = {
  start: UtensilsCrossed,
  pro: BarChart3,
  premium: Crown,
};

const PlanCard: React.FC<{ plan: Plan; delay: number }> = ({ plan, delay }) => {
  const Icon = PLAN_ICONS[plan.icon];
  return (
    <Reveal
      as="article"
      delay={delay}
      className={`relative flex flex-col rounded-3xl bg-white p-7 transition-shadow duration-300 ${
        plan.featured
          ? 'border-2 border-[#1565FF] shadow-[0_24px_50px_-24px_rgba(21,101,255,0.45)]'
          : 'border border-[#e6ecf5] shadow-[0_10px_30px_-18px_rgba(16,35,68,0.25)] hover:shadow-[0_18px_40px_-20px_rgba(16,35,68,0.3)]'
      }`}
    >
      {plan.badge && (
        <span className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-[#1565FF] text-white text-[11px] font-semibold">{plan.badge}</span>
      )}
      <div className="flex items-center gap-2.5">
        <Icon className="w-6 h-6 text-[#1565FF]" aria-hidden="true" />
        <h3 className="text-xl font-bold text-[#102344]">{plan.name}</h3>
      </div>
      <p className="mt-2 text-[15px] text-slate-500">{plan.description}</p>
      <p className="mt-5 text-lg font-bold text-[#102344]">{plan.price ?? 'Consulte condições'}</p>

      <ul className="mt-5 space-y-2.5 flex-1">
        {plan.highlights.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[14px] text-slate-600">
            <Check className="w-4 h-4 mt-0.5 text-[#1565FF] shrink-0" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-7 flex flex-col gap-2.5">
        <ButtonLink
          href={LINKS.signup}
          variant={plan.featured ? 'primary' : 'secondary'}
          className="w-full"
          aria-label={`Teste grátis de 14 dias do plano ${plan.name}`}
        >
          Teste grátis de 14 dias
        </ButtonLink>
        <ButtonLink
          href={LINKS.plan(plan.name)}
          variant="ghost"
          size="sm"
          className="w-full border border-transparent hover:border-[#d5deec] hover:bg-[#F7F9FC]"
          aria-label={`Falar no WhatsApp sobre o plano ${plan.name}`}
        >
          <MessageCircle className="w-4 h-4 text-[#1565FF]" aria-hidden="true" />
          Falar no WhatsApp
        </ButtonLink>
      </div>
    </Reveal>
  );
};

export function Plans() {
  return (
    <section id="planos" aria-labelledby="planos-title" className="scroll-mt-20 py-20 sm:py-28 bg-[#F7F9FC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading id="planos-title" title="Um plano para cada fase." description="Escolha o plano ideal para o momento do seu restaurante." />
        <div className="mt-14 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} delay={i * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}
