import React, { useCallback } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { CompanyId } from '../../types';
import { SAAS_PRODUCTS_LIST } from './data/mockData';
import './sistemas.css';

/**
 * Página de cada SaaS da Oxys Sistemas (/sistemas/saas/:slug).
 * Base inicial com os dados do catálogo — pronta para receber o conteúdo dedicado de cada produto.
 */
export default function SaasPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const saas = SAAS_PRODUCTS_LIST.find((item) => item.slug === slug);

  const handleSelectCompany = useCallback(
    (companyId: CompanyId) => {
      if (companyId === 'sistemas') navigate('/sistemas');
      else navigate('/', { state: { openCompany: companyId } });
    },
    [navigate]
  );

  if (!saas) return <Navigate to="/sistemas" replace />;

  const goToContact = () => navigate('/sistemas#contato');

  return (
    <div className="oxys-sistemas-page min-h-screen bg-[#050608] text-slate-100 font-sans relative overflow-x-clip">
      <Navbar onSelectCompany={handleSelectCompany} onOpenContact={goToContact} />

      <main>
        <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden border-b border-white/5">
          <div
            className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full pointer-events-none opacity-25"
            style={{ background: `radial-gradient(circle, ${saas.colorTheme.primaryHex} 0%, transparent 65%)` }}
          />
          <div className="absolute inset-0 bg-dot-matrix opacity-40 pointer-events-none" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/sistemas#cases"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar para Oxys Sistemas
            </Link>

            <div className="mt-8 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className={`inline-block px-3 py-1 rounded-md border text-[10px] font-mono font-bold uppercase tracking-wider ${saas.colorTheme.bgBadgeClass}`}>
                  {saas.badge}
                </span>
                <h1 className="mt-5 font-brand-title text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {saas.name}
                </h1>
                <p className={`mt-2 text-sm font-semibold ${saas.colorTheme.textClass}`}>{saas.category}</p>
                <p className="mt-6 text-slate-300 text-base sm:text-lg leading-relaxed">{saas.fullDesc}</p>

                <ul className="mt-8 grid sm:grid-cols-2 gap-3">
                  {saas.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-200">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${saas.colorTheme.textClass}`} />
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={goToContact}
                  className={`mt-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r ${saas.colorTheme.gradientClass} text-slate-950 font-bold text-sm uppercase tracking-wider hover:scale-[1.02] transition-transform`}
                >
                  Quero conhecer o {saas.name} <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="card-3d rounded-2xl p-8">
                <div className="aspect-video rounded-xl overflow-hidden bg-[#0a0e17] border border-white/10 flex items-center justify-center">
                  <img
                    src={saas.image}
                    alt={saas.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    onError={(e) => ((e.currentTarget.style.display = 'none'))}
                  />
                </div>
                {saas.metrics && (
                  <div className="mt-6 flex items-baseline justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400">{saas.metrics.label}</span>
                    <span className={`text-3xl font-extrabold ${saas.colorTheme.textClass}`}>{saas.metrics.value}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onSelectCompany={handleSelectCompany} onOpenContact={goToContact} />
    </div>
  );
}
