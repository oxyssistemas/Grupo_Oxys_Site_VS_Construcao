import React, { useState } from 'react';
import { 
  Mail, 
  MessageSquare, 
  Send, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  Building, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY_INFO } from '../data/mockData';
import { ScrollReveal } from './ScrollReveal';
import { MilkyWayBackground } from './MilkyWayBackground';
import { GalacticTelemetryBadge } from './MilkyWayDecorations';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: 'App Mobile (iOS & Android)',
    budgetRange: 'R$ 20.000 a R$ 50.000',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#10b981', '#6366f1']
        });
      } catch (err) {}
    }, 600);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Olá, equipe da Oxys Sistemas!\n\nMe chamo *${formData.name || 'Cliente'}* da empresa *${formData.company || 'Empresa'}*.\nTenho interesse em desenvolver um *${formData.projectType}* com estimativa de *${formData.budgetRange}*.\n\n*Detalhes do Projeto:* ${formData.message || 'Gostaria de agendar uma reunião de alinhamento.'}\n\nContato: ${formData.email} | ${formData.phone}`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="contato" className="py-20 md:py-28 bg-[#050608] border-b border-white/5 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      
      {/* =========================================================================
          COSMIC DEEP SPACE BACKGROUND
          ========================================================================= */}
      <MilkyWayBackground 
        variant="deep-space" 
        density="dense" 
        imageOpacity={0.35} 
        showShootingStars={true} 
        showConstellations={true}
        showCoordinates={true}
        coordinates="CENTRO DE OPERAÇÕES // CANAL DIRETO DE ENGENHARIA"
      />

      {/* Subtle Top & Bottom Glowing Lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Contact Info & Value Prop */}
          <ScrollReveal direction="right" duration={0.7} distance={30} className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-1">
                <div className="text-xs uppercase tracking-[0.4em] text-cyan-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
                  <span>Canal Estelar de Transmissão</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400/60 bg-cyan-950/40 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                  Uplink Aberto
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                Vamos Construir Seu Próximo Grande Software?
              </h2>
              <p className="text-base text-slate-400 leading-relaxed">
                Conte-nos sobre o seu projeto ou agende uma reunião técnica com nossos arquitetos de soluções. 
                Retornamos em até 2 horas úteis com uma avaliação preliminar de escopo e viabilidade.
              </p>
            </div>

            {/* Direct Channels Cards */}
            <div className="space-y-4">
              
              {/* Official Email */}
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="p-4 rounded-xl bg-[#0a0c10] border border-white/10 hover:border-cyan-500/40 flex items-center gap-4 transition-colors group shadow-lg"
              >
                <div className="w-12 h-12 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">E-mail Oficial</p>
                  <p className="text-sm font-bold text-white group-hover:text-cyan-300 font-mono">
                    {COMPANY_INFO.email}
                  </p>
                </div>
              </a>

              {/* WhatsApp Direct */}
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="w-full text-left p-4 rounded-xl bg-[#0a0c10] border border-white/10 hover:border-cyan-500/40 flex items-center gap-4 transition-colors group cursor-pointer shadow-lg"
              >
                <div className="w-12 h-12 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Atendimento WhatsApp</p>
                  <p className="text-sm font-bold text-white group-hover:text-cyan-300 font-mono">
                    {COMPANY_INFO.whatsappDisplay}
                  </p>
                </div>
              </button>

              {/* Location / Remote */}
              <div className="p-4 rounded-xl bg-[#0a0c10]/60 border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Localização & Atuação</p>
                  <p className="text-xs font-medium text-slate-300">
                    {COMPANY_INFO.location}
                  </p>
                </div>
              </div>

            </div>

            {/* Commitment Box */}
            <div className="p-5 rounded-xl bg-[#0a0c10] border border-white/10 space-y-2 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 font-mono uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>NDA & Acordo de Confidencialidade</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Seus dados e ideias de negócio são protegidos por rigoroso acordo de confidencialidade desde o primeiro contato.
              </p>
            </div>
          </ScrollReveal>

          {/* Right: Interactive Contact & Briefing Form */}
          <ScrollReveal direction="left" duration={0.75} distance={30} delay={0.15} className="lg:col-span-7">
            <div className="rounded-2xl bg-[#0a0c10] border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-400 shadow-[0_0_15px_#22d3ee]">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Solicitação Recebida com Sucesso!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Obrigado, <strong className="text-white">{formData.name}</strong>. Nossa equipe técnica da Oxys Sistemas já está analisando as informações do seu projeto. Entraremos em contato em breve através de <strong className="text-cyan-400">{formData.email}</strong>.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleWhatsAppDirect}
                      className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-sm transition-all cursor-pointer"
                    >
                      Acelerar Atendimento no WhatsApp
                    </button>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white bg-black/60 border border-white/10 rounded-sm transition-colors cursor-pointer"
                    >
                      Enviar Outro Briefing
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="pb-3 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-xs font-bold text-white font-mono uppercase tracking-widest">
                      Formulário de Briefing Inicial
                    </h3>
                    <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                      Resposta em até 2h
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Roberto Silva"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-sm bg-black/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300">
                        E-mail Corporativo *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Ex: roberto@empresa.com.br"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-sm bg-black/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300">
                        WhatsApp / Telefone
                      </label>
                      <input
                        type="tel"
                        placeholder="Ex: (11) 98765-4321"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-sm bg-black/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300">
                        Nome da Empresa
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Logix Soluções"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-sm bg-black/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300">
                        Tipo de Projeto
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-sm bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                      >
                        <option value="App Mobile (iOS & Android)">App Mobile (iOS & Android)</option>
                        <option value="Sistema Web / SaaS Sob Medida">Sistema Web / SaaS Sob Medida</option>
                        <option value="APIs & Microsserviços de Alta Escala">APIs & Microsserviços de Alta Escala</option>
                        <option value="Integração de Sistemas & Gateways">Integração de Sistemas & Gateways</option>
                        <option value="Modernização de Sistema Legado">Modernização de Sistema Legado</option>
                        <option value="Consultoria & Squad Dedicada">Consultoria & Squad Dedicada</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300">
                        Expectativa de Investimento
                      </label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-sm bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                      >
                        <option value="Até R$ 20.000 (MVP Ágil)">Até R$ 20.000 (MVP Ágil)</option>
                        <option value="R$ 20.000 a R$ 50.000">R$ 20.000 a R$ 50.000</option>
                        <option value="R$ 50.000 a R$ 120.000">R$ 50.000 a R$ 120.000</option>
                        <option value="Acima de R$ 120.000 (Enterprise)">Acima de R$ 120.000 (Enterprise)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300">
                      Descreva seu projeto ou objetivo técnico
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Conte um pouco sobre as funcionalidades esperadas, usuários do sistema ou problemas que precisa resolver..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-sm bg-black/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:flex-1 py-3.5 px-6 rounded-sm font-bold text-xs uppercase tracking-widest text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Enviando...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Solicitar Proposta Comercial</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="w-full sm:w-auto py-3.5 px-5 rounded-sm font-bold text-xs uppercase tracking-widest text-white bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-cyan-400" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
