import React from 'react';
import { Menu, ShoppingCart, Plus, Home, BookOpen, ClipboardList, User } from 'lucide-react';
import { FoodImage } from './ui';
import { IMAGES } from '../config';

/** Celular com o cardápio online (dados ilustrativos). */
export function PhoneMenuMockup({ variant = 'hero', className = '' }: { variant?: 'hero' | 'delivery'; className?: string }) {
  const isHero = variant === 'hero';

  return (
    <div
      role="img"
      aria-label="Ilustração do cardápio online do Oxys Restaurante no celular"
      className={`rounded-[34px] bg-[#0f1a2e] p-[7px] shadow-[0_30px_60px_-20px_rgba(16,35,68,0.45)] ${className}`}
    >
      <div className="relative rounded-[28px] bg-white overflow-hidden h-full flex flex-col" aria-hidden="true">
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full bg-[#0f1a2e] z-10" />
        <div className="pt-7 px-3 pb-2 flex items-center justify-between">
          <Menu className="w-4 h-4 text-[#102344]" />
          <div className="text-center">
            <div className="text-[11px] font-bold text-[#102344]">Sabor &amp; Brasa</div>
            <div className="text-[7px] text-slate-400">Restaurante</div>
          </div>
          <span className="relative">
            <ShoppingCart className="w-4 h-4 text-[#102344]" />
            <i className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#e0566e]" />
          </span>
        </div>

        {isHero && (
          <div className="px-3 flex gap-1.5 text-[7px] font-medium">
            {['Destaques', 'Pratos', 'Bebidas', 'Sobremesas'].map((c, i) => (
              <span key={c} className={`px-2 py-1 rounded-full ${i === 0 ? 'bg-[#1565FF] text-white' : 'bg-[#f1f4f9] text-slate-500'}`}>
                {c}
              </span>
            ))}
          </div>
        )}

        <div className="px-3 pt-2.5 flex-1 flex flex-col gap-2.5">
          {isHero ? (
            <>
              <div className="rounded-xl border border-[#eef1f6] overflow-hidden">
                <FoodImage src={IMAGES.menuBurger} alt="Burger artesanal" tone="warm" className="w-full h-[92px]" />
                <div className="p-2">
                  <span className="inline-block px-1.5 py-0.5 rounded bg-[#fff1e3] text-[#c86a12] text-[6.5px] font-semibold">Mais pedido</span>
                  <div className="mt-1 text-[9.5px] font-bold text-[#102344]">Burger Artesanal</div>
                  <div className="text-[7px] text-slate-400 leading-snug">Pão brioche, blend de carnes, cheddar, alface e tomate.</div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#102344]">R$ 42,00</span>
                    <span className="w-5 h-5 rounded-full bg-[#1565FF] text-white flex items-center justify-center"><Plus className="w-3 h-3" /></span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center rounded-xl border border-[#eef1f6] p-1.5">
                <FoodImage src={IMAGES.menuSalad} alt="Salada Caesar" tone="green" className="w-12 h-12 rounded-lg shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[8.5px] font-bold text-[#102344]">Salada Caesar</div>
                  <div className="text-[6.5px] text-slate-400 truncate">Mix de folhas, frango grelhado e parmesão.</div>
                  <div className="text-[8.5px] font-bold text-[#102344] mt-0.5">R$ 28,00</div>
                </div>
                <span className="w-5 h-5 rounded-full bg-[#1565FF] text-white flex items-center justify-center shrink-0"><Plus className="w-3 h-3" /></span>
              </div>
            </>
          ) : (
            <>
              <FoodImage src={IMAGES.menuMain} alt="Hambúrguer na grelha" tone="red" className="w-full h-[110px] rounded-xl" />
              <div>
                <div className="text-[11px] font-bold text-[#102344]">Nossos destaques</div>
                <div className="text-[7px] text-slate-400">O melhor da nossa cozinha, agora no seu pedido.</div>
              </div>
              <div className="flex gap-2 items-center rounded-xl border border-[#eef1f6] p-1.5">
                <FoodImage src={IMAGES.menuParmegiana} alt="Filé à parmegiana" tone="warm" className="w-12 h-12 rounded-lg shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[8.5px] font-bold text-[#102344]">Filé à Parmegiana</div>
                  <div className="text-[6.5px] text-slate-400 truncate">Acompanha arroz e batata rústica.</div>
                  <div className="text-[8.5px] font-bold text-[#102344] mt-0.5">R$ 54,00</div>
                </div>
                <span className="w-5 h-5 rounded-full bg-[#1565FF] text-white flex items-center justify-center shrink-0"><Plus className="w-3 h-3" /></span>
              </div>
            </>
          )}
        </div>

        <div className="mt-2 px-4 py-2 border-t border-[#eef1f6] flex justify-between text-[6.5px] text-slate-400">
          {[
            [Home, 'Início'],
            [BookOpen, 'Cardápio'],
            [ClipboardList, 'Pedidos'],
            [User, 'Conta'],
          ].map(([Icon, label], i) => {
            const I = Icon as typeof Home;
            return (
              <span key={label as string} className={`flex flex-col items-center gap-0.5 ${i === 1 ? 'text-[#1565FF]' : ''}`}>
                <I className="w-3 h-3" />
                {label as string}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
