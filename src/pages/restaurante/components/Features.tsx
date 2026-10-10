import React from 'react';
import { Armchair, Calculator, Bike, Package, BarChart3, FileText, Banknote, CreditCard, QrCode, ChevronRight } from 'lucide-react';
import { IconBadge, Reveal, SectionHeading } from './ui';

/*
 * Recursos confirmados no Oxys Restaurante (README e telas do sistema):
 * mapa de mesas e comandas, PDV/caixa com dinheiro, cartões e Pix, delivery próprio
 * com loja online, estoque com ingredientes, financeiro e relatórios.
 */

const FeatureCard: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
  return (
    <Reveal
      as="article"
      delay={delay}
      className={`rounded-3xl border border-[#e6ecf5] shadow-[0_10px_30px_-18px_rgba(16,35,68,0.25)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-20px_rgba(16,35,68,0.35)] ${className}`}
    >
      {children}
    </Reveal>
  );
};

/** Planta do salão vista de cima (ilustração). */
function TablesFloor() {
  const tables = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
  const active = new Set(['04', '07']);
  return (
    <div className="relative mt-6 rounded-2xl bg-white/70 border border-white px-3 sm:px-6 py-6" aria-hidden="true">
      <div className="grid grid-cols-5 gap-y-8 gap-x-2 sm:gap-x-4">
        {tables.map((t) => {
          const on = active.has(t);
          return (
            <div key={t} className="relative mx-auto w-12 h-12 sm:w-14 sm:h-14">
              {/* cadeiras */}
              {['-top-2 left-1/2 -translate-x-1/2 w-5 h-2', '-bottom-2 left-1/2 -translate-x-1/2 w-5 h-2', 'top-1/2 -left-2 -translate-y-1/2 w-2 h-5', 'top-1/2 -right-2 -translate-y-1/2 w-2 h-5'].map((pos) => (
                <span key={pos} className={`absolute rounded-full ${pos} ${on ? 'bg-[#1565FF]/70' : 'bg-[#d3dbe7]'}`} />
              ))}
              <span
                className={`absolute inset-0 rounded-xl flex items-center justify-center text-[11px] font-bold border ${
                  on ? 'bg-[#1565FF] text-white border-[#1565FF] shadow-[0_6px_16px_-4px_rgba(21,101,255,0.6)]' : 'bg-white text-[#102344] border-[#dfe6f0]'
                }`}
              >
                {t}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PaymentList() {
  const methods = [
    { label: 'Dinheiro', icon: Banknote },
    { label: 'Cartão de crédito', icon: CreditCard, selected: true },
    { label: 'Cartão de débito', icon: CreditCard },
    { label: 'Pix', icon: QrCode },
  ];
  return (
    <ul className="rounded-2xl border border-[#e6ecf5] bg-white p-2 text-[12px] w-full sm:w-[200px] shrink-0" aria-hidden="true">
      {methods.map(({ label, icon: Icon, selected }) => (
        <li key={label} className={`flex items-center gap-2 px-2.5 py-2 rounded-lg ${selected ? 'bg-[#EAF3FF] text-[#102344] font-medium' : 'text-slate-500'}`}>
          <Icon className="w-3.5 h-3.5 text-[#1565FF]" />
          <span className="flex-1">{label}</span>
          <span className={`w-3 h-3 rounded-full border ${selected ? 'border-[#1565FF] bg-[radial-gradient(circle,#1565FF_40%,transparent_45%)]' : 'border-[#d3dbe7]'}`} />
        </li>
      ))}
    </ul>
  );
}

function DeliveryList() {
  const orders = [
    ['#1040', 'Ana Souza', 'Em entrega', 'bg-[#EAF3FF] text-[#1565FF]'],
    ['#1039', 'Carlos Lima', 'Em preparo', 'bg-[#fff1e3] text-[#c86a12]'],
    ['#1038', 'Marina Costa', 'Confirmado', 'bg-[#e8f6ec] text-[#2a8a4b]'],
  ];
  return (
    <ul className="rounded-2xl border border-[#e6ecf5] bg-white p-2 text-[12px] w-full sm:w-[230px] shrink-0" aria-hidden="true">
      {orders.map(([id, name, status, cls]) => (
        <li key={id} className="flex items-center gap-2 px-2 py-2 border-b last:border-0 border-[#f1f4f9]">
          <span className="text-slate-400">{id}</span>
          <span className="flex-1 truncate text-[#102344]">{name}</span>
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${cls}`}>{status}</span>
          <ChevronRight className="w-3 h-3 text-slate-300" />
        </li>
      ))}
    </ul>
  );
}

const SMALL_FEATURES = [
  { title: 'Estoque', text: 'Controle ingredientes, acompanhe o consumo e evite faltas.', icon: Package },
  { title: 'Financeiro', text: 'Acompanhe entradas, saídas e o resultado do seu restaurante.', icon: BarChart3 },
  { title: 'Relatórios', text: 'Tenha uma visão clara da sua operação com relatórios completos.', icon: FileText },
];

export function Features() {
  return (
    <section id="recursos" aria-labelledby="recursos-title" className="scroll-mt-20 py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          id="recursos-title"
          title="Tudo conectado, do pedido ao caixa."
          description="Recursos que trabalham juntos para uma gestão mais prática e organizada."
        />

        <div className="mt-14 grid lg:grid-cols-2 gap-5">
          <FeatureCard className="bg-gradient-to-b from-[#EAF3FF] to-[#f5f9ff] p-6 sm:p-8 lg:row-span-2">
            <div className="flex items-start gap-4">
              <IconBadge icon={Armchair} className="bg-white" />
              <div>
                <h3 className="text-xl font-bold text-[#102344]">Mesas e comandas</h3>
                <p className="mt-1.5 text-[15px] text-slate-600">
                  Visualize o salão em tempo real, controle comandas e acompanhe o status de cada mesa.
                </p>
              </div>
            </div>
            <TablesFloor />
          </FeatureCard>

          <FeatureCard delay={100} className="bg-white p-6 sm:p-7 flex flex-col sm:flex-row gap-5 sm:items-center">
            <div className="flex items-start gap-4 flex-1">
              <IconBadge icon={Calculator} />
              <div>
                <h3 className="text-lg font-bold text-[#102344]">PDV e caixa</h3>
                <p className="mt-1.5 text-[15px] text-slate-600">Registre pedidos, aplique formas de pagamento e finalize com agilidade.</p>
              </div>
            </div>
            <PaymentList />
          </FeatureCard>

          <FeatureCard delay={180} className="bg-white p-6 sm:p-7 flex flex-col sm:flex-row gap-5 sm:items-center">
            <div className="flex items-start gap-4 flex-1">
              <IconBadge icon={Bike} />
              <div>
                <h3 className="text-lg font-bold text-[#102344]">Delivery próprio</h3>
                <p className="mt-1.5 text-[15px] text-slate-600">Receba e gerencie pedidos do seu delivery em um só lugar.</p>
              </div>
            </div>
            <DeliveryList />
          </FeatureCard>
        </div>

        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SMALL_FEATURES.map(({ title, text, icon }, i) => (
            <FeatureCard key={title} delay={i * 80} className="bg-white p-6 flex items-start gap-4">
              <IconBadge icon={icon} />
              <div>
                <h3 className="text-lg font-bold text-[#102344]">{title}</h3>
                <p className="mt-1.5 text-[15px] text-slate-600">{text}</p>
              </div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}
