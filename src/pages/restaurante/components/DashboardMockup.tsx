import React from 'react';
import {
  LayoutGrid,
  Armchair,
  ClipboardList,
  Bike,
  Wallet,
  BookOpen,
  Package,
  CircleDollarSign,
  BarChart3,
  Settings,
  Bell,
  FileText,
} from 'lucide-react';

/** Dados apenas visuais — a interface é identificada como ilustrativa. */
const SIDEBAR = [
  { label: 'Visão geral', icon: LayoutGrid, active: true },
  { label: 'Mesas', icon: Armchair },
  { label: 'Pedidos', icon: ClipboardList },
  { label: 'Delivery', icon: Bike },
  { label: 'Caixa', icon: Wallet },
  { label: 'Cardápio', icon: BookOpen },
  { label: 'Estoque', icon: Package },
  { label: 'Financeiro', icon: CircleDollarSign },
  { label: 'Relatórios', icon: BarChart3 },
  { label: 'Configurações', icon: Settings },
];

const KPIS = [
  { label: 'Mesas ocupadas', value: '12', sub: 'de 20 mesas', icon: Armchair },
  { label: 'Pedidos hoje', value: '28', sub: 'em andamento', icon: FileText },
  { label: 'Faturamento do dia', value: 'R$ 2.350,00', sub: '', icon: BarChart3 },
  { label: 'Delivery hoje', value: '16', sub: 'pedidos', icon: Bike },
];

type TableState = 'free' | 'busy' | 'service';
const TABLES: [string, TableState, number][] = [
  ['01', 'service', 4], ['02', 'busy', 4], ['03', 'free', 4], ['04', 'free', 4], ['05', 'free', 2],
  ['06', 'free', 4], ['07', 'service', 4], ['08', 'free', 4], ['09', 'busy', 4], ['10', 'free', 4],
];
const tableStyle: Record<TableState, string> = {
  free: 'bg-[#f3f6fb] border-[#e3e9f2]',
  busy: 'bg-[#fdecef] border-[#f8cdd5] text-[#c23a52]',
  service: 'bg-[#e8f6ec] border-[#c5e8cf] text-[#2a8a4b]',
};

const ORDERS = [
  ['#1042', '03', 'Mesa 03', 'Em preparo', '12 min'],
  ['#1041', '07', 'Mesa 07', 'No salão', '5 min'],
  ['#1040', '12', 'Delivery', 'Em entrega', '18 min'],
  ['#1039', '05', 'Mesa 05', 'Em preparo', '9 min'],
  ['#1038', '08', 'Mesa 08', 'No salão', '2 min'],
];
const statusStyle: Record<string, string> = {
  'Em preparo': 'bg-[#fff1e3] text-[#c86a12]',
  'No salão': 'bg-[#EAF3FF] text-[#1565FF]',
  'Em entrega': 'bg-[#EAF3FF] text-[#1565FF]',
};

const BARS = [18, 30, 22, 40, 34, 52, 46, 64, 38, 58, 70, 48, 30, 44];

export function DashboardMockup() {
  return (
    <div
      className="relative rounded-[18px] bg-white border border-[#e3e9f2] shadow-[0_30px_70px_-30px_rgba(16,35,68,0.35)] overflow-hidden flex text-left"
      aria-label="Interface ilustrativa do painel do Oxys Restaurante"
      role="img"
    >
      {/* Barra lateral */}
      <aside className="hidden md:flex flex-col w-[190px] shrink-0 bg-[#102344] text-white/80 py-5 px-3" aria-hidden="true">
        <div className="px-2 mb-6">
          <div className="text-[15px] font-extrabold tracking-[0.06em] text-white">
            O<span className="text-[#5b9bff]">X</span>YS
          </div>
          <div className="text-[7px] tracking-[0.38em] text-white/60 mt-0.5">RESTAURANTE</div>
        </div>
        <ul className="space-y-0.5">
          {SIDEBAR.map(({ label, icon: Icon, active }) => (
            <li
              key={label}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[11px] ${active ? 'bg-[#1565FF] text-white font-semibold' : ''}`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </li>
          ))}
        </ul>
      </aside>

      <div className="flex-1 min-w-0 p-4 sm:p-5 bg-[#fbfcfe]" aria-hidden="true">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-bold text-[#102344]">Bom dia, Restaurante!</div>
            <div className="text-[10px] text-slate-500">Tudo em ordem para um ótimo serviço.</div>
          </div>
          <div className="flex items-center gap-3 text-[9px] text-slate-400">
            <span className="hidden sm:inline">Seg, 26 de mai. · 12:14</span>
            <Bell className="w-3.5 h-3.5 text-slate-500" />
            <span className="w-6 h-6 rounded-full bg-[#1565FF] text-white text-[10px] font-bold flex items-center justify-center">R</span>
          </div>
        </div>

        {/* Indicadores */}
        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {KPIS.map(({ label, value, sub, icon: Icon }) => (
            <div key={label} className="rounded-xl bg-white border border-[#e8edf5] p-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[9px] text-slate-500 truncate">{label}</div>
                <div className="text-base sm:text-lg font-bold text-[#102344] leading-tight mt-0.5 whitespace-nowrap">{value}</div>
                {sub && <div className="text-[9px] text-slate-400">{sub}</div>}
              </div>
              <span className="w-8 h-8 rounded-lg bg-[#EAF3FF] text-[#1565FF] flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4" />
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 grid lg:grid-cols-[1.25fr_1fr] gap-3">
          {/* Mapa de mesas */}
          <div className="rounded-xl bg-white border border-[#e8edf5] p-3 flex flex-col">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="text-xs font-bold text-[#102344]">Mapa de mesas</div>
              <div className="flex items-center gap-2.5 text-[8px] text-slate-500">
                <span className="flex items-center gap-1"><i className="w-1.5 h-1.5 rounded-full bg-[#9aa8bd]" />Livre</span>
                <span className="flex items-center gap-1"><i className="w-1.5 h-1.5 rounded-full bg-[#e0566e]" />Ocupada</span>
                <span className="flex items-center gap-1"><i className="w-1.5 h-1.5 rounded-full bg-[#3aa35f]" />Em atendimento</span>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {TABLES.map(([n, state, seats]) => (
                <div key={n} className={`rounded-lg border text-center py-2.5 ${tableStyle[state]}`}>
                  <div className="text-[11px] font-bold">{n}</div>
                  <div className="text-[7px] text-slate-400">{seats} lugares</div>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-3 grid grid-cols-3 gap-2 text-center">
              {[
                ['6', 'Livres', 'text-[#102344]'],
                ['2', 'Ocupadas', 'text-[#c23a52]'],
                ['2', 'Em atendimento', 'text-[#2a8a4b]'],
              ].map(([n, label, cls]) => (
                <div key={label} className="rounded-lg bg-[#f6f8fc] py-2">
                  <div className={`text-sm font-bold ${cls}`}>{n}</div>
                  <div className="text-[8px] text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pedidos + movimentação */}
          <div className="hidden sm:flex flex-col gap-3">
            <div className="rounded-xl bg-white border border-[#e8edf5] p-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-[#102344]">Pedidos em andamento</div>
                <span className="text-[8px] text-[#1565FF]">Ver todos</span>
              </div>
              <table className="w-full mt-2 text-[8.5px]">
                <tbody>
                  {ORDERS.map(([id, , who, status, time]) => (
                    <tr key={id} className="border-t border-[#f1f4f9]">
                      <td className="py-1.5 text-slate-400">{id}</td>
                      <td className="py-1.5 text-[#102344]">{who}</td>
                      <td className="py-1.5">
                        <span className={`px-1.5 py-0.5 rounded ${statusStyle[status]}`}>{status}</span>
                      </td>
                      <td className="py-1.5 text-right text-slate-400">{time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-xl bg-white border border-[#e8edf5] p-3">
              <div className="text-xs font-bold text-[#102344]">Movimentação do dia</div>
              <div className="mt-2 flex items-end gap-1 h-12">
                {BARS.map((h, i) => (
                  <span key={i} className="flex-1 rounded-sm bg-[#1565FF]" style={{ height: `${h}%`, opacity: 0.35 + (h / 70) * 0.65 }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 text-[9px] text-slate-400">Interface ilustrativa</div>
      </div>
    </div>
  );
}
