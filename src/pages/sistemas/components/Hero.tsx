import React, { useState, useEffect, useId, memo } from 'react';
import { 
  ArrowRight, 
  Terminal, 
  Lock, 
  ShieldCheck, 
  Zap, 
  Copy, 
  Check, 
  RotateCcw, 
  Server, 
  Smartphone, 
  Layers, 
  Database, 
  Activity, 
  Globe, 
  Radio, 
  Sparkles,
  Cpu,
  Code2,
  CheckCircle2,
  Boxes
} from 'lucide-react';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { COMPANY_INFO } from '../data/mockData';
import { LanguageSelector } from './LanguageSelector';
import { MilkyWayBackground } from './MilkyWayBackground';

export const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'api' | 'mobile' | 'iac' | 'rust'>('api');
  const [copied, setCopied] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  // Parallax pelo mouse com motion values: atualiza o transform direto, sem re-renderizar o Hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 90, damping: 20, mass: 0.6 });
  const smoothY = useSpring(mouseY, { stiffness: 90, damping: 20, mass: 0.6 });
  const nebulaX = useTransform(smoothX, (v) => v * -8);
  const nebulaY = useTransform(smoothY, (v) => v * -8);
  const coreX = useTransform(smoothX, (v) => v * 6);
  const coreY = useTransform(smoothY, (v) => v * 6);
  const terminalRotateY = useTransform(smoothX, (v) => v * -4);
  const terminalRotateX = useTransform(smoothY, (v) => v * 4);
  const shouldReduceMotion = useReducedMotion();

  // Dynamic Telemetry states
  const [telemetry, setTelemetry] = useState({
    load: 77.23,
    latency: 13,
    qps: '14.5K',
    activeConnections: 3420
  });

  // Unique IDs for SVG filters and gradients to prevent DOM collisions
  const baseId = useId();
  const gradOuterId = `${baseId}-core-grad-outer`;
  const gradMidId = `${baseId}-core-grad-mid`;
  const gradInnerId = `${baseId}-core-grad-inner`;
  const glowFilterId = `${baseId}-glow-filter`;
  
  // Nebula Gradient & Filter IDs
  const nebulaGrad1 = `${baseId}-nebula-grad-1`;
  const nebulaGrad2 = `${baseId}-nebula-grad-2`;
  const nebulaGrad3 = `${baseId}-nebula-grad-3`;
  const nebulaGrad4 = `${baseId}-nebula-grad-4`;
  const nebulaPlasma = `${baseId}-nebula-plasma`;
  const nebulaBlurWide = `${baseId}-nebula-blur-wide`;
  const nebulaBlurDeep = `${baseId}-nebula-blur-deep`;
  const nebulaWebGrad1 = `${baseId}-web-grad-1`;
  const nebulaWebGrad2 = `${baseId}-web-grad-2`;
  const nebulaWebGrad3 = `${baseId}-web-grad-3`;
  const nebulaWebCards = `${baseId}-web-cards`;
  const nebulaWebSynaptic = `${baseId}-web-synaptic`;
  const nebulaNodeGlow = `${baseId}-node-glow`;

  // Code snippets for the API Gateway / Dev Terminal
  const codeSnippets: Record<'api' | 'mobile' | 'iac' | 'rust', string> = {
    api: `// Oxys High-Throughput API Gateway (Go / Node.js)
package main

import (
    "github.com/oxys/gateway"
    "github.com/oxys/resilience"
    "github.com/oxys/auth"
)

func main() {
    gw := gateway.New(&gateway.Config{
        Port:         3000,
        RateLimit:    "14500_qps",
        AuthEngine:   auth.OAuth2_JWT_mTLS(),
        CacheCluster: "Redis_v7_MultiRegion",
    })

    // Zero-Downtime routing with Circuit Breaker
    gw.Route("/v1/payments", resilience.Protect(paymentHandler))
    gw.Route("/v1/mobile/sync", resilience.DeltaSync(mobileHandler))

    gw.Listen("0.0.0.0:3000") // 99.98% SLA
}`,
    mobile: `// Oxys Real-Time Mobile Engine (Flutter / React Native)
import 'package:oxys_core/sync.dart';
import 'package:oxys_security/biometrics.dart';

class OxysMobileEngine {
  final SyncPipeline sync = SyncPipeline(
    offlineFirst: true,
    encryption: AES256_GCM(),
    deltaCompression: true,
    telemetryStream: true,
  );

  Future<void> initialize() async {
    await BiometricVault.verifySecureEnclave();
    sync.connectStream("wss://api.oxys.com.br/v1/live");
  }
}`,
    iac: `// Enterprise Cloud Infrastructure as Code (Terraform)
module "oxys_distributed_cloud" {
  source              = "oxys-cloud/kubernetes/aws"
  cluster_name        = "oxys-prod-enterprise"
  kubernetes_version  = "1.31"

  autoscaling = {
    min_nodes     = 4
    max_nodes     = 128
    target_cpu    = 65
  }

  redis_cluster_enabled = true
  postgresql_ha_sync    = true
  waf_ddos_shield       = true
}`,
    rust: `// Ultra-Low Latency Core Engine (Rust / Tokio)
use oxys_engine::{Router, Telemetry, CircuitBreaker};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut core = Router::new()
        .with_concurrency_limit(50_000)
        .with_zero_copy_buffer(true);

    core.mount("/grpc/stream", oxys_grpc_service());
    core.listen("0.0.0.0:443").await?;
    Ok(())
}`
  };

  // Telemetry fluctuation simulator
  useEffect(() => {
    const telemetryInterval = setInterval(() => {
      setTelemetry({
        load: +(76 + Math.random() * 3).toFixed(2),
        latency: Math.floor(12 + Math.random() * 3),
        qps: `${(14.3 + Math.random() * 0.5).toFixed(1)}K`,
        activeConnections: Math.floor(3400 + Math.random() * 80)
      });
    }, 2800);

    return () => clearInterval(telemetryInterval);
  }, []);

  // Desktop Mouse Parallax Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || window.innerWidth < 1024) return;
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    // Normalized offset between -1 and 1
    const offsetX = (clientX - centerX) / centerX;
    const offsetY = (clientY - centerY) / centerY;
    mouseX.set(offsetX);
    mouseY.set(offsetY);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReplayCode = () => setReplayKey((k) => k + 1);

  return (
    <section 
      id="hero-section"
      onMouseMove={handleMouseMove}
      className="relative min-h-[calc(100vh-76px)] pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-gradient-to-b from-[#02050B] via-[#030914] to-[#06101E] flex flex-col justify-between border-b border-[#00D9FF]/10 scroll-mt-20 sm:scroll-mt-24"
    >
      {/* =========================================================================
          11. BACKGROUND ATMOSPHERE: ANIMATED DEEP SPACE COSMOS & STARFIELD CANVAS
          ========================================================================= */}
      <MilkyWayBackground 
        variant="core" 
        density="dense" 
        imageOpacity={0.42} 
        showShootingStars={true} 
        showConstellations={true}
        showCoordinates={false}
        className="z-0"
      />

      {/* Dark vignette overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#02050B_95%)]" />

      {/* High-legibility dark mask behind left hero copy */}
      <div className="absolute top-0 left-0 bottom-0 w-full lg:w-3/5 bg-gradient-to-r from-[#02050B] via-[#02050B]/92 to-transparent pointer-events-none z-0" />

      {/* =========================================================================
          TRAÇOS DE NEBULOSA (NEBULA WISPS & PLASMA STREAMS RADIATING FROM TERMINAL)
          Saindo de trás do terminal e preenchendo toda a extensão da Hero
          ========================================================================= */}
      <motion.div 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none"
        style={{ x: nebulaX, y: nebulaY, willChange: 'transform' }}
      >
        {/* Camadas separadas: as nuvens com blur pesado são desenhadas uma vez e só
            se movem/pulsam no compositor; os filamentos animados ficam numa camada própria */}
        <svg 
          className="absolute inset-0 w-full h-full animate-nebula-flow-1" 
          viewBox="0 0 1440 900" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Deep wide blur for volumetric cosmic clouds */}
            <filter id={nebulaBlurDeep} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="75" />
            </filter>

            {/* Medium blur for flowing gas ribbons */}
            <filter id={nebulaBlurWide} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="35" />
            </filter>

            {/* Sharp glow for high-energy plasma filaments */}
            <filter id={glowFilterId} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Node pulse glow filter */}
            <filter id={nebulaNodeGlow} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Nebula Gradient 1: Terminal to Top-Left Badge & Title */}
            <linearGradient id={nebulaGrad1} x1="75%" y1="45%" x2="10%" y2="20%">
              <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#1677FF" stopOpacity="0.55" />
              <stop offset="70%" stopColor="#8B5CF6" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#006EFF" stopOpacity="0" />
            </linearGradient>

            {/* Nebula Gradient 2: Terminal to Subtitle & CTAs */}
            <linearGradient id={nebulaGrad2} x1="70%" y1="50%" x2="0%" y2="55%">
              <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.75" />
              <stop offset="40%" stopColor="#06B6D4" stopOpacity="0.45" />
              <stop offset="75%" stopColor="#3B82F6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#030914" stopOpacity="0" />
            </linearGradient>

            {/* Nebula Gradient 3: Terminal to Lower Metrics Bar */}
            <linearGradient id={nebulaGrad3} x1="68%" y1="55%" x2="15%" y2="92%">
              <stop offset="0%" stopColor="#1677FF" stopOpacity="0.8" />
              <stop offset="45%" stopColor="#00D9FF" stopOpacity="0.5" />
              <stop offset="80%" stopColor="#10B981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#02050B" stopOpacity="0" />
            </linearGradient>

            {/* Nebula Gradient 4: Terminal to Floating Cards & Space */}
            <linearGradient id={nebulaGrad4} x1="65%" y1="45%" x2="98%" y2="10%">
              <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1677FF" stopOpacity="0" />
            </linearGradient>

            {/* Web Filament Gradients (Teias de Nebulosa) */}
            <linearGradient id={nebulaWebGrad1} x1="100%" y1="50%" x2="0%" y2="20%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="15%" stopColor="#00D9FF" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#1677FF" stopOpacity="0.65" />
              <stop offset="85%" stopColor="#8B5CF6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00D9FF" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id={nebulaWebGrad2} x1="100%" y1="40%" x2="0%" y2="70%">
              <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#006EFF" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#10B981" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#00D9FF" stopOpacity="0.85" />
            </linearGradient>

            <linearGradient id={nebulaWebGrad3} x1="70%" y1="50%" x2="20%" y2="95%">
              <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.9" />
              <stop offset="30%" stopColor="#1677FF" stopOpacity="0.75" />
              <stop offset="65%" stopColor="#06B6D4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id={nebulaWebCards} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1677FF" stopOpacity="0.85" />
            </linearGradient>

            <linearGradient id={nebulaWebSynaptic} x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#00D9FF" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#1677FF" stopOpacity="0.5" />
            </linearGradient>

            {/* High-intensity Plasma Filament Gradient */}
            <linearGradient id={nebulaPlasma} x1="80%" y1="45%" x2="0%" y2="25%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#00D9FF" stopOpacity="0.85" />
              <stop offset="65%" stopColor="#1677FF" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* =====================================================================
              CAMADA 1: GASES VOLUMÉTRICOS PROFUNDOS (VOLUMETRIC NEBULA CLOUD MATRIX)
              ===================================================================== */}
          <g filter={`url(#${nebulaBlurDeep})`}>
            {/* Núcleo de gás atrás do terminal */}
            <ellipse cx="1020" cy="420" rx="360" ry="260" fill="#1677FF" fillOpacity="0.35" />
            <ellipse cx="980" cy="380" rx="280" ry="200" fill="#00D9FF" fillOpacity="0.30" />
            <ellipse cx="1060" cy="450" rx="300" ry="220" fill="#8B5CF6" fillOpacity="0.22" />

            {/* Braço de nebulosa se expandindo para a esquerda superior (Título) */}
            <path 
              d="M 1020 400 C 820 280, 520 180, 240 220 C 120 240, 40 320, -20 380" 
              stroke={`url(#${nebulaGrad1})`} 
              strokeWidth="160" 
              strokeLinecap="round" 
              fill="none" 
            />

            {/* Braço de nebulosa se expandindo horizontalmente pelo centro */}
            <path 
              d="M 1000 450 C 780 480, 540 440, 280 500 C 140 530, 20 520, -60 560" 
              stroke={`url(#${nebulaGrad2})`} 
              strokeWidth="140" 
              strokeLinecap="round" 
              fill="none" 
            />

            {/* Braço de nebulosa descendo em direção à barra de métricas */}
            <path 
              d="M 980 480 C 850 620, 620 720, 320 780 C 160 810, 0 830, -80 840" 
              stroke={`url(#${nebulaGrad3})`} 
              strokeWidth="150" 
              strokeLinecap="round" 
              fill="none" 
            />
          </g>

        </svg>

        <svg 
          className="absolute inset-0 w-full h-full animate-nebula-flow-2" 
          viewBox="0 0 1440 900" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* =====================================================================
              CAMADA 2: FITILHOS E FAIXAS DE GÁS DINÂMICAS (FLOWING NEBULA STREAMERS)
              ===================================================================== */}
          <g filter={`url(#${nebulaBlurWide})`}>
            {/* Faixa Superior Refinada conectando Terminal ao Topo da Página */}
            <path 
              d="M 1060 410 C 860 270, 580 190, 280 210 C 140 220, 50 280, -10 320" 
              stroke={`url(#${nebulaGrad1})`} 
              strokeWidth="65" 
              strokeLinecap="round" 
              fill="none" 
            />

            {/* Faixa Central Dinâmica conectando Terminal a Botões e Subtítulo */}
            <path 
              d="M 1010 440 C 790 470, 510 420, 260 480 C 110 510, 10 500, -40 520" 
              stroke={`url(#${nebulaGrad2})`} 
              strokeWidth="55" 
              strokeLinecap="round" 
              fill="none" 
            />

            {/* Faixa Inferior conectando Terminal às 4 Colunas de Métricas */}
            <path 
              d="M 960 470 C 820 590, 590 690, 310 750 C 160 780, 20 800, -30 810" 
              stroke={`url(#${nebulaGrad3})`} 
              strokeWidth="70" 
              strokeLinecap="round" 
              fill="none" 
            />

            {/* Faixa Ascendente para a Direita Superior */}
            <path 
              d="M 1030 380 C 1140 260, 1260 160, 1420 90" 
              stroke={`url(#${nebulaGrad4})`} 
              strokeWidth="80" 
              strokeLinecap="round" 
              fill="none" 
            />
          </g>

        </svg>

        <svg 
          className="absolute inset-0 w-full h-full animate-nebula-flow-3" 
          viewBox="0 0 1440 900" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* =====================================================================
              CAMADA 3: TEIAS DE NEBULOSA E FILAMENTOS DE CONEXÃO DINÂMICOS (NEBULA WEBS)
              Conectam fisicamente o Terminal a todos os elementos da interface
              ===================================================================== */}
          <g>
            
            {/* -------------------------------------------------------------
                A. FILAMENTOS PRINCIPAIS (ARTERIAL WEB PATHS) - TERMINAL -> ELEMENTOS
                ------------------------------------------------------------- */}
            
            {/* 1. Terminal (Chassis Top-Left) -> Top Badge "OXYS ENTERPRISE" & Seletor */}
            <path 
              d="M 780 270 C 640 210, 480 155, 330 175" 
              stroke={`url(#${nebulaWebGrad1})`} 
              strokeWidth="2.2" 
              strokeDasharray="14 8 4 8" 
              strokeLinecap="round" 
              fill="none" 
              className="animate-nebula-web-flow"
            />
            {/* Filamento secundário estendendo do Badge até o limite cósmico superior */}
            <path 
              d="M 330 175 C 220 160, 140 120, 40 90" 
              stroke="#00D9FF" 
              strokeOpacity="0.45" 
              strokeWidth="1.2" 
              strokeDasharray="8 6" 
              strokeLinecap="round" 
              fill="none" 
            />

            {/* 2. Terminal (Chassis Left) -> Título "Engenharia de Software de Alta Performance" */}
            {/* 2a. Arco Superior do Título */}
            <path 
              d="M 760 310 C 600 240, 480 230, 360 265" 
              stroke={`url(#${nebulaPlasma})`} 
              strokeWidth="2.4" 
              strokeDasharray="18 10" 
              strokeLinecap="round" 
              fill="none" 
              className="animate-filament-pulse"
            />
            {/* 2b. Arco Inferior do Título (Gradient Clip Text) */}
            <path 
              d="M 740 360 C 610 340, 490 320, 310 335" 
              stroke={`url(#${nebulaWebGrad1})`} 
              strokeWidth="1.8" 
              strokeDasharray="12 8" 
              strokeLinecap="round" 
              fill="none" 
              className="animate-nebula-web-fast"
            />

            {/* 3. Terminal (Chassis Center-Left) -> Subtítulo & Proposta de Valor */}
            <path 
              d="M 740 400 C 610 430, 460 410, 290 425" 
              stroke="#00D9FF" 
              strokeOpacity="0.7" 
              strokeWidth="1.6" 
              strokeDasharray="16 10 6 10" 
              strokeLinecap="round" 
              fill="none" 
              className="animate-nebula-web-flow-rev"
            />

            {/* 4. Terminal (Chassis Lower-Left) -> CTAs (Botão Primário "Iniciar Projeto" & Secundário) */}
            {/* 4a. Rota arterial direta para o Botão Iniciar Projeto */}
            <path 
              d="M 760 470 C 610 520, 430 520, 230 520" 
              stroke={`url(#${nebulaWebGrad2})`} 
              strokeWidth="2.5" 
              strokeDasharray="20 10 4 10" 
              strokeLinecap="round" 
              fill="none" 
              className="animate-filament-pulse"
            />
            {/* 4b. Rota ramificada para o Botão Conhecer Stack */}
            <path 
              d="M 580 500 C 500 505, 450 515, 410 520" 
              stroke="#00D9FF" 
              strokeOpacity="0.8" 
              strokeWidth="1.6" 
              strokeDasharray="10 8" 
              strokeLinecap="round" 
              fill="none" 
              className="animate-nebula-web-fast"
            />

            {/* 5. Terminal / CTA Junction -> Trust Indicators (Proprietário, LGPD, SLA) */}
            <path 
              d="M 230 520 C 210 550, 195 565, 180 585" 
              stroke="#00D9FF" 
              strokeOpacity="0.65" 
              strokeWidth="1.2" 
              strokeDasharray="6 6" 
              strokeLinecap="round" 
              fill="none" 
            />
            <path 
              d="M 410 520 C 380 550, 360 565, 340 585" 
              stroke="#1677FF" 
              strokeOpacity="0.75" 
              strokeWidth="1.2" 
              strokeDasharray="6 6" 
              strokeLinecap="round" 
              fill="none" 
            />
            <path 
              d="M 580 500 C 540 545, 515 565, 490 585" 
              stroke="#10B981" 
              strokeOpacity="0.8" 
              strokeWidth="1.4" 
              strokeDasharray="8 6" 
              strokeLinecap="round" 
              fill="none" 
            />

            {/* -------------------------------------------------------------
                B. FILAMENTOS ORBITAIS (TEIAS CONECTANDO OS 4 FLOATING CARDS)
                ------------------------------------------------------------- */}
            
            {/* Terminal -> Card 1 (API Online - Top Left) */}
            <path 
              d="M 790 280 C 750 240, 720 220, 680 195" 
              stroke={`url(#${nebulaWebCards})`} 
              strokeWidth="2.2" 
              strokeDasharray="12 8" 
              strokeLinecap="round" 
              fill="none" 
              className="animate-nebula-web-flow"
            />

            {/* Terminal -> Card 2 (Database Cluster - Top Right) */}
            <path 
              d="M 1240 280 C 1280 240, 1305 220, 1330 195" 
              stroke={`url(#${nebulaWebCards})`} 
              strokeWidth="2.2" 
              strokeDasharray="12 8" 
              strokeLinecap="round" 
              fill="none" 
              className="animate-nebula-web-flow-rev"
            />

            {/* Terminal -> Card 3 (Mobile Ready - Bottom Left) */}
            <path 
              d="M 790 510 C 750 550, 720 570, 680 590" 
              stroke={`url(#${nebulaWebCards})`} 
              strokeWidth="2" 
              strokeDasharray="10 8" 
              strokeLinecap="round" 
              fill="none" 
              className="animate-nebula-web-flow"
            />

            {/* Terminal -> Card 4 (14.5K Req/Sec - Bottom Right) */}
            <path 
              d="M 1240 510 C 1280 550, 1305 570, 1330 590" 
              stroke={`url(#${nebulaWebCards})`} 
              strokeWidth="2" 
              strokeDasharray="10 8" 
              strokeLinecap="round" 
              fill="none" 
              className="animate-nebula-web-flow-rev"
            />

            {/* Teia Transversal Superior (Card 1 ao Badge à Esquerda) */}
            <path 
              d="M 680 195 C 550 170, 440 165, 330 175" 
              stroke={`url(#${nebulaWebSynaptic})`} 
              strokeWidth="1.2" 
              strokeDasharray="6 8" 
              strokeLinecap="round" 
              fill="none" 
              className="opacity-70 animate-nebula-web-flow"
            />

            {/* Teia Transversal em Arco Superior (Card 1 para Card 2 sobre o Terminal) */}
            <path 
              d="M 680 195 C 840 120, 1160 120, 1330 195" 
              stroke={`url(#${nebulaWebSynaptic})`} 
              strokeWidth="1.4" 
              strokeDasharray="14 10" 
              strokeLinecap="round" 
              fill="none" 
              className="opacity-60 animate-nebula-web-flow"
            />

            {/* Teia Transversal em Arco Inferior (Card 3 para Card 4 sob o Terminal) */}
            <path 
              d="M 680 590 C 840 650, 1160 650, 1330 590" 
              stroke={`url(#${nebulaWebSynaptic})`} 
              strokeWidth="1.4" 
              strokeDasharray="14 10" 
              strokeLinecap="round" 
              fill="none" 
              className="opacity-60 animate-nebula-web-flow-rev"
            />

            {/* Teia Transversal Inferior (Card 3 para CTA "Iniciar Projeto") */}
            <path 
              d="M 680 590 C 520 570, 370 545, 230 520" 
              stroke="#00D9FF" 
              strokeOpacity="0.5" 
              strokeWidth="1.2" 
              strokeDasharray="8 6" 
              strokeLinecap="round" 
              fill="none" 
            />

            {/* -------------------------------------------------------------
                C. FILAMENTOS DESCENDENTES (TERMINAL -> 4 COLUNAS DE MÉTRICAS)
                ------------------------------------------------------------- */}
            
            {/* Tronco Principal de Descida da Base do Terminal */}
            <path 
              d="M 980 550 C 900 640, 760 700, 580 730" 
              stroke={`url(#${nebulaWebGrad3})`} 
              strokeWidth="2.6" 
              strokeDasharray="16 12" 
              strokeLinecap="round" 
              fill="none" 
              className="animate-filament-pulse"
            />

            {/* Rota para Métrica 1 (Projetos 140+) */}
            <path 
              d="M 580 730 C 440 750, 330 765, 230 780" 
              stroke={`url(#${nebulaWebGrad3})`} 
              strokeWidth="2" 
              strokeDasharray="12 8" 
              strokeLinecap="round" 
              fill="none" 
              className="animate-nebula-web-flow"
            />

            {/* Rota para Métrica 2 (Escala 4.8M+ Requisições) */}
            <path 
              d="M 760 700 C 670 735, 590 760, 510 780" 
              stroke="#00D9FF" 
              strokeOpacity="0.8" 
              strokeWidth="1.8" 
              strokeDasharray="10 8" 
              strokeLinecap="round" 
              fill="none" 
              className="animate-nebula-web-fast"
            />

            {/* Rota para Métrica 3 (SLA 99.98% Confiabilidade) */}
            <path 
              d="M 1020 550 C 960 650, 880 720, 790 780" 
              stroke="#1677FF" 
              strokeOpacity="0.85" 
              strokeWidth="2" 
              strokeDasharray="14 10" 
              strokeLinecap="round" 
              fill="none" 
              className="animate-nebula-web-flow-rev"
            />

            {/* Rota para Métrica 4 (Propriedade 100% Código) */}
            <path 
              d="M 1080 550 C 1120 650, 1110 720, 1070 780" 
              stroke="#8B5CF6" 
              strokeOpacity="0.75" 
              strokeWidth="1.8" 
              strokeDasharray="12 10" 
              strokeLinecap="round" 
              fill="none" 
              className="animate-nebula-web-flow"
            />

            {/* Teia Horizontal Interligando todas as 4 Métricas */}
            <path 
              d="M 230 780 C 510 765, 790 765, 1070 780" 
              stroke={`url(#${nebulaWebSynaptic})`} 
              strokeWidth="1.2" 
              strokeDasharray="4 8" 
              strokeLinecap="round" 
              fill="none" 
              className="opacity-50 animate-nebula-web-flow"
            />

            {/* -------------------------------------------------------------
                D. NÓS DE CONEXÃO E PULSOS DE ENERGIA (CONSTELLATION NEXUS NODES)
                Posicionados exatamente nos pontos de conexão com elementos
                ------------------------------------------------------------- */}

            {/* Nexus 1: Top Badge (Anchor) */}
            <g transform="translate(330, 175)">
              <circle r="12" fill="#00D9FF" fillOpacity="0.15" className="animate-nebula-node-ping" />
              <circle r="4" fill="#00D9FF" />
              <circle r="2" fill="#FFFFFF" />
            </g>

            {/* Nexus 2: Headline Top Arc */}
            <g transform="translate(360, 265)">
              <circle r="10" fill="#1677FF" fillOpacity="0.2" />
              <circle r="3.5" fill="#00D9FF" />
              <circle r="1.5" fill="#FFFFFF" />
            </g>

            {/* Nexus 3: Headline Gradient Highlight */}
            <g transform="translate(310, 335)">
              <circle r="12" fill="#00D9FF" fillOpacity="0.2" className="animate-nebula-node-ping" />
              <circle r="4" fill="#00D9FF" />
              <circle r="2" fill="#F5F7FA" />
            </g>

            {/* Nexus 4: Subtitle Anchor */}
            <g transform="translate(290, 425)">
              <circle r="3" fill="#8B5CF6" />
            </g>

            {/* Nexus 5: Primary CTA ("Iniciar Projeto") */}
            <g transform="translate(230, 520)">
              <circle r="14" fill="#00D9FF" fillOpacity="0.2" className="animate-nebula-node-ping" />
              <circle r="5" fill="#00D9FF" />
              <circle r="2.5" fill="#FFFFFF" />
            </g>

            {/* Nexus 6: Secondary CTA ("Conhecer Stack") */}
            <g transform="translate(410, 520)">
              <circle r="8" fill="#1677FF" fillOpacity="0.2" />
              <circle r="3.5" fill="#00D9FF" />
            </g>

            {/* Nexus 7: Trust Indicator 1 (Proprietário) */}
            <g transform="translate(180, 585)">
              <circle r="3" fill="#00D9FF" />
            </g>

            {/* Nexus 8: Trust Indicator 2 (LGPD) */}
            <g transform="translate(340, 585)">
              <circle r="3" fill="#1677FF" />
            </g>

            {/* Nexus 9: Trust Indicator 3 (SLA) */}
            <g transform="translate(490, 585)">
              <circle r="3.5" fill="#10B981" />
            </g>

            {/* Nexus 10: Floating Card 1 (API Online) */}
            <g transform="translate(680, 195)">
              <circle r="12" fill="#00D9FF" fillOpacity="0.2" className="animate-nebula-node-ping" />
              <circle r="4.5" fill="#00D9FF" />
              <circle r="2" fill="#FFFFFF" />
            </g>

            {/* Nexus 11: Floating Card 2 (Database Cluster) */}
            <g transform="translate(1330, 195)">
              <circle r="12" fill="#1677FF" fillOpacity="0.2" className="animate-nebula-node-ping" />
              <circle r="4.5" fill="#00D9FF" />
              <circle r="2" fill="#FFFFFF" />
            </g>

            {/* Nexus 12: Floating Card 3 (Mobile Ready) */}
            <g transform="translate(680, 590)">
              <circle r="12" fill="#00D9FF" fillOpacity="0.2" className="animate-nebula-node-ping" />
              <circle r="4.5" fill="#00D9FF" />
              <circle r="2" fill="#FFFFFF" />
            </g>

            {/* Nexus 13: Floating Card 4 (14.5K Req/Sec) */}
            <g transform="translate(1330, 590)">
              <circle r="12" fill="#1677FF" fillOpacity="0.2" className="animate-nebula-node-ping" />
              <circle r="4.5" fill="#00D9FF" />
              <circle r="2" fill="#FFFFFF" />
            </g>

            {/* Nexus 14-17: Metrics Columns (1 to 4) */}
            <g transform="translate(230, 780)">
              <circle r="10" fill="#00D9FF" fillOpacity="0.2" />
              <circle r="4" fill="#00D9FF" />
              <circle r="2" fill="#FFFFFF" />
            </g>
            <g transform="translate(510, 780)">
              <circle r="3.5" fill="#00D9FF" />
            </g>
            <g transform="translate(790, 780)">
              <circle r="3.5" fill="#1677FF" />
            </g>
            <g transform="translate(1070, 780)">
              <circle r="4" fill="#8B5CF6" />
              <circle r="2" fill="#FFFFFF" />
            </g>

            {/* Terminal Chassis Junction Anchors (Os pontos de emissão das teias) */}
            <g transform="translate(780, 270)">
              <circle r="5" fill="#00D9FF" />
              <circle r="2" fill="#FFFFFF" />
            </g>
            <g transform="translate(760, 470)">
              <circle r="5" fill="#00D9FF" />
              <circle r="2" fill="#FFFFFF" />
            </g>
            <g transform="translate(980, 550)">
              <circle r="6" fill="#1677FF" className="animate-pulse" />
              <circle r="3" fill="#00D9FF" />
            </g>
            <g transform="translate(1240, 280)">
              <circle r="5" fill="#00D9FF" />
            </g>
            <g transform="translate(1240, 510)">
              <circle r="5" fill="#00D9FF" />
            </g>
          </g>
        </svg>
      </motion.div>

      {/* Subtle Technological Particle Grid Matrix */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0" />

      {/* Subtle Top Cyan Flare Border Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00D9FF]/40 to-transparent pointer-events-none z-20" />

      {/* Main Container */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto">
        
        {/* =========================================================================
            2. TWO-COLUMN HERO STRUCTURE (45% LEFT / 55% RIGHT)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          
          {/* =======================================================================
              3, 4, 5, 6. LEFT COLUMN: BADGE, TITLE, SUBTITLE, CTAs & TRUST INDICATORS
              ======================================================================= */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Top Bar: Badge Futurista + Seletor de Idioma */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ willChange: 'transform, opacity' }}
              className="flex flex-wrap items-center gap-3 transform-gpu"
            >
              {/* 3. Badge Futurista no Topo */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#030914]/80 border border-[#00D9FF]/35 shadow-[0_0_15px_rgba(0,217,255,0.15)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D9FF] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D9FF]"></span>
                </span>
                <Radio className="w-3.5 h-3.5 text-[#00D9FF]" />
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-cyan-200 uppercase tracking-wider">
                  OXYS ENTERPRISE // CORE ARCHITECTURE
                </span>
              </div>

              {/* Seletor de Idioma Integrado */}
              <div className="hidden sm:inline-block">
                <LanguageSelector variant="pill" />
              </div>
            </motion.div>

            {/* 3. Título de Maior Destaque */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              style={{ willChange: 'transform, opacity' }}
              className="text-[34px] sm:text-[46px] lg:text-[50px] xl:text-[62px] font-black tracking-tight leading-[1.06] text-[#F5F7FA] transform-gpu"
            >
              Engenharia de Software <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#00A3FF] to-[#006EFF]">
                de Alta Performance.
              </span>
            </motion.h1>

            {/* 4. Subtítulo */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ willChange: 'opacity' }}
              className="text-[#94A3B8] text-base sm:text-lg leading-relaxed max-w-[580px] font-normal transform-gpu"
            >
              Do desenvolvimento de ecossistemas de APIs robustas à criação de experiências mobile imersivas e sistemas web sob medida. Transformamos complexidade técnica em valor digital de escala.
            </motion.p>

            {/* 5. Call To Action: Botões Primário e Secundário */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              style={{ willChange: 'transform, opacity' }}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 transform-gpu"
            >
              {/* Botão Primário */}
              <a
                href="#contato"
                id="hero-primary-cta"
                className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-[220px] h-[54px] rounded-xl bg-gradient-to-r from-[#006EFF] via-[#1677FF] to-[#00D9FF] text-white font-bold text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(0,110,255,0.38)] hover:shadow-[0_0_35px_rgba(0,217,255,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer overflow-hidden text-center shrink-0"
              >
                {/* Light Sweep Sheen Animation on hover */}
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] pointer-events-none opacity-0 group-hover:opacity-100 group-hover:animate-btn-sheen" />
                
                <span className="relative z-10">Iniciar Projeto</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>

              {/* Botão Secundário */}
              <a
                href="#tecnologias"
                id="hero-secondary-cta"
                className="inline-flex items-center justify-center gap-2.5 px-6 h-[54px] rounded-xl bg-transparent border border-[#334155] text-slate-300 text-xs font-bold uppercase tracking-widest hover:border-[#00D9FF]/70 hover:text-[#00D9FF] hover:bg-[#00D9FF]/5 hover:shadow-[0_0_20px_rgba(0,217,255,0.15)] transition-all duration-300 cursor-pointer text-center"
              >
                <Terminal className="w-4 h-4 text-[#00D9FF]" />
                <span>Conhecer Stack</span>
              </a>
            </motion.div>

            {/* 6. Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ willChange: 'opacity' }}
              className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-5 text-[11px] sm:text-[11.5px] uppercase tracking-wider font-mono text-[#94A3B8] transform-gpu"
            >
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-[#00D9FF] shrink-0" />
                <span>100% Código Proprietário</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1677FF] shrink-0" />
                <span>Conformidade LGPD</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>SLA Garantido 99.98%</span>
              </div>
            </motion.div>

          </div>

          {/* =======================================================================
              7, 8, 9, 10. RIGHT COLUMN: 3D TECH NUCLEUS + TERMINAL + FLOATING CARDS
              ======================================================================= */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[440px] sm:min-h-[500px]">
            
            {/* =====================================================================
                9. NÚCLEO TECNOLÓGICO CIRCULAR CONCÊNTRICO (ATRÁS DO TERMINAL)
                ===================================================================== */}
            <motion.div 
              className="absolute pointer-events-none flex items-center justify-center -z-10 select-none"
              style={{ width: '560px', height: '560px', x: coreX, y: coreY }}
            >
              {/* Inner ambient blue glow core */}
              <div className="absolute w-72 h-72 rounded-full bg-radial from-[#1677FF]/20 to-transparent to-65%" />
              <div className="absolute w-48 h-48 rounded-full bg-radial from-[#00D9FF]/25 to-transparent to-65%" />

              <svg 
                className="absolute inset-0 w-full h-full animate-core-outer" 
                viewBox="0 0 600 600" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id={gradOuterId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#1677FF" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#006EFF" stopOpacity="0.6" />
                  </linearGradient>
                  
                  <linearGradient id={gradMidId} x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#10B981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#1677FF" stopOpacity="0.6" />
                  </linearGradient>

                  <linearGradient id={gradInnerId} x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#006EFF" stopOpacity="0.4" />
                  </linearGradient>

                  <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* 1. Camada Externa (Gira a 60s) */}
                <g>
                  {/* Outer Orbit Circle */}
                  <circle cx="300" cy="300" r="275" stroke={`url(#${gradOuterId})`} strokeWidth="1.2" strokeDasharray="8 12" />
                  <circle cx="300" cy="300" r="260" stroke="#1677FF" strokeOpacity="0.2" strokeWidth="1" />
                  
                  {/* Orbital Nodes & Segment arcs */}
                  <path d="M 300 25 A 275 275 0 0 1 494 105" stroke="#00D9FF" strokeWidth="2.5" strokeLinecap="round" filter={`url(#${glowFilterId})`} />
                  <path d="M 300 575 A 275 275 0 0 1 106 495" stroke="#00D9FF" strokeWidth="2.5" strokeLinecap="round" filter={`url(#${glowFilterId})`} />
                  
                  {/* Glowing Node dots on outer rim */}
                  <circle cx="300" cy="25" r="4.5" fill="#00D9FF" filter={`url(#${glowFilterId})`} />
                  <circle cx="494" cy="105" r="3.5" fill="#F5F7FA" />
                  <circle cx="300" cy="575" r="4.5" fill="#00D9FF" filter={`url(#${glowFilterId})`} />
                  <circle cx="106" cy="495" r="3.5" fill="#F5F7FA" />

                  {/* Circuit traces */}
                  <line x1="300" y1="25" x2="300" y2="45" stroke="#00D9FF" strokeWidth="1.5" />
                  <line x1="575" y1="300" x2="555" y2="300" stroke="#00D9FF" strokeWidth="1.5" />
                  <line x1="300" y1="575" x2="300" y2="555" stroke="#00D9FF" strokeWidth="1.5" />
                  <line x1="25" y1="300" x2="45" y2="300" stroke="#00D9FF" strokeWidth="1.5" />
                </g>

              </svg>

              <svg 
                className="absolute inset-0 w-full h-full animate-core-mid" 
                viewBox="0 0 600 600" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* 2. Camada Intermediária (Gira a 90s em sentido inverso) */}
                <g>
                  <circle cx="300" cy="300" r="215" stroke={`url(#${gradMidId})`} strokeWidth="1.5" strokeDasharray="16 8 4 8" />
                  <circle cx="300" cy="300" r="185" stroke="#00D9FF" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 6" />

                  {/* Radial Circuit Spokes */}
                  <line x1="300" y1="85" x2="300" y2="120" stroke="#1677FF" strokeWidth="1.5" />
                  <line x1="452" y1="148" x2="427" y2="173" stroke="#00D9FF" strokeWidth="1.5" />
                  <line x1="515" y1="300" x2="480" y2="300" stroke="#1677FF" strokeWidth="1.5" />
                  <line x1="452" y1="452" x2="427" y2="427" stroke="#00D9FF" strokeWidth="1.5" />
                  <line x1="300" y1="515" x2="300" y2="480" stroke="#1677FF" strokeWidth="1.5" />
                  <line x1="148" y1="452" x2="173" y2="427" stroke="#00D9FF" strokeWidth="1.5" />
                  <line x1="85" y1="300" x2="120" y2="300" stroke="#1677FF" strokeWidth="1.5" />
                  <line x1="148" y1="148" x2="173" y2="173" stroke="#00D9FF" strokeWidth="1.5" />

                  {/* Node Chips */}
                  <rect x="422" y="168" width="10" height="10" fill="#030914" stroke="#00D9FF" strokeWidth="1" />
                  <rect x="168" y="422" width="10" height="10" fill="#030914" stroke="#00D9FF" strokeWidth="1" />
                </g>

              </svg>

              <svg 
                className="absolute inset-0 w-full h-full animate-core-inner" 
                viewBox="0 0 600 600" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* 3. Camada Interna (Gira a 120s) */}
                <g>
                  <circle cx="300" cy="300" r="140" stroke={`url(#${gradInnerId})`} strokeWidth="2" strokeDasharray="30 10" />
                  <circle cx="300" cy="300" r="105" stroke="#00D9FF" strokeOpacity="0.4" strokeWidth="1" />

                  {/* Central Ring Nodes */}
                  <circle cx="300" cy="160" r="4" fill="#00D9FF" filter={`url(#${glowFilterId})`} />
                  <circle cx="440" cy="300" r="4" fill="#00D9FF" filter={`url(#${glowFilterId})`} />
                  <circle cx="300" cy="440" r="4" fill="#00D9FF" filter={`url(#${glowFilterId})`} />
                  <circle cx="160" cy="300" r="4" fill="#00D9FF" filter={`url(#${glowFilterId})`} />

                  {/* Geometric Cross-hair */}
                  <line x1="300" y1="210" x2="300" y2="390" stroke="#00D9FF" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="210" y1="300" x2="390" y2="300" stroke="#00D9FF" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="4 4" />
                </g>
              </svg>
            </motion.div>

            {/* =====================================================================
                7 & 8. TERMINAL / API GATEWAY PRINCIPAL FLUTUANTE
                ===================================================================== */}
            <motion.div
              id="arquitetura"
              initial={{ opacity: 0, scale: 0.95, x: 25 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="w-full max-w-[620px] relative z-10 group transform-gpu scroll-mt-24"
              style={{
                rotateY: terminalRotateY,
                rotateX: terminalRotateX,
                transformPerspective: 1200,
                willChange: 'transform, opacity',
              }}
            >
              {/* Outer Deep Glow and Cyan Boundary */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#006EFF]/30 via-[#00D9FF]/30 to-[#1677FF]/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-90 transition duration-700 -z-10" />

              <div className="w-full bg-[#030814]/92 rounded-2xl overflow-hidden border border-[#00D9FF]/30 shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col">
                
                {/* Laser Scanning Line Animation */}
                {/* O wrapper ocupa o terminal e desliza via transform (antes animava `top`, que recalcula layout) */}
                <div className="absolute inset-0 animate-laser-scan pointer-events-none z-30">
                  <div className="h-[1.5px] bg-gradient-to-r from-transparent via-[#00D9FF] to-transparent shadow-[0_0_10px_#00D9FF]" />
                </div>

                {/* 7. Cabeçalho da Janela: OXYS-CORE // TERMINAL & Tabs */}
                <div className="px-4 sm:px-5 py-3 bg-[#02050B]/90 border-b border-[#00D9FF]/15 flex items-center justify-between gap-2 z-20">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono text-[10.5px] text-cyan-200/90 font-semibold uppercase tracking-wider hidden sm:inline">
                      OXYS-CORE // {
                        activeTab === 'api' ? 'API-GATEWAY.GO' : 
                        activeTab === 'mobile' ? 'MOBILE-SYNC.DART' : 
                        activeTab === 'iac' ? 'INFRA-IAC.TF' : 'ULTRA-CORE.RS'
                      }
                    </span>
                  </div>

                  {/* Tabs: API | MOBILE | IAC | RUST */}
                  <div className="flex items-center gap-1 bg-[#06101E]/80 p-0.5 rounded-lg border border-[#00D9FF]/20">
                    <button
                      id="hero-tab-api"
                      onClick={() => setActiveTab('api')}
                      className={`px-2.5 py-1 text-[9.5px] font-mono font-bold uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                        activeTab === 'api'
                          ? 'bg-gradient-to-r from-[#006EFF] to-[#00D9FF] text-white shadow-[0_0_10px_rgba(0,217,255,0.4)]'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        <Server className="w-3 h-3" />
                        API
                      </span>
                    </button>

                    <button
                      id="hero-tab-mobile"
                      onClick={() => setActiveTab('mobile')}
                      className={`px-2.5 py-1 text-[9.5px] font-mono font-bold uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                        activeTab === 'mobile'
                          ? 'bg-gradient-to-r from-[#006EFF] to-[#00D9FF] text-white shadow-[0_0_10px_rgba(0,217,255,0.4)]'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        <Smartphone className="w-3 h-3" />
                        MOBILE
                      </span>
                    </button>

                    <button
                      id="hero-tab-iac"
                      onClick={() => setActiveTab('iac')}
                      className={`px-2.5 py-1 text-[9.5px] font-mono font-bold uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                        activeTab === 'iac'
                          ? 'bg-gradient-to-r from-[#006EFF] to-[#00D9FF] text-white shadow-[0_0_10px_rgba(0,217,255,0.4)]'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        <Layers className="w-3 h-3" />
                        IAC
                      </span>
                    </button>

                    <button
                      id="hero-tab-rust"
                      onClick={() => setActiveTab('rust')}
                      className={`px-2.5 py-1 text-[9.5px] font-mono font-bold uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                        activeTab === 'rust'
                          ? 'bg-gradient-to-r from-[#006EFF] to-[#00D9FF] text-white shadow-[0_0_10px_rgba(0,217,255,0.4)]'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        <Boxes className="w-3 h-3" />
                        RUST
                      </span>
                    </button>
                  </div>

                  {/* Actions: Replay & Copy */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleReplayCode}
                      className="p-1.5 text-slate-400 hover:text-[#00D9FF] hover:bg-white/5 rounded-md transition-colors shrink-0"
                      title="Replay animação de código"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleCopyCode}
                      className="p-1.5 text-slate-400 hover:text-[#00D9FF] hover:bg-white/5 rounded-md transition-colors shrink-0"
                      title="Copiar código"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Code Window Body */}
                <div className="p-4 sm:p-5 overflow-x-auto bg-[#02050B]/85 font-mono text-[11px] sm:text-xs text-slate-300 leading-relaxed min-h-[250px] max-h-[280px] overflow-y-auto overscroll-contain relative">
                  <div className="font-mono">
                    <TypingCode code={codeSnippets[activeTab]} replayKey={replayKey} />
                  </div>
                </div>

                {/* =================================================================
                    8. TELEMETRIA DO TERMINAL: LOAD, LATENCY, STREAM ACTIVE, QPS
                    ================================================================= */}
                <div className="px-4 sm:px-5 py-3 bg-[#020610]/95 border-t border-[#00D9FF]/15 flex flex-col sm:flex-row items-center justify-between gap-3 z-20">
                  
                  {/* Left: Load meter & Waveform Mini-Graph */}
                  <div className="w-full sm:w-1/2 space-y-1.5">
                    <div className="flex items-center justify-between text-[9.5px] font-mono uppercase tracking-wider text-[#94A3B8]">
                      <span>CORE TELEMETRY</span>
                      <span className="text-[#00D9FF] font-bold">
                        {telemetry.load}% LOAD • {telemetry.latency}MS LATENCY
                      </span>
                    </div>

                    {/* Animated Waveform Graphic + Mini Progress Bar */}
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 bg-[#101827] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#1677FF] to-[#00D9FF] rounded-full transition-all duration-700 shadow-[0_0_8px_#00D9FF]"
                          style={{ width: `${telemetry.load}%` }}
                        />
                      </div>
                      
                      {/* Mini animated equalizer bars */}
                      <div className="flex items-end gap-0.5 h-3 shrink-0">
                        <span className="w-0.5 bg-[#00D9FF] rounded-full animate-telemetry-bar-1" />
                        <span className="w-0.5 bg-[#00D9FF] rounded-full animate-telemetry-bar-2" />
                        <span className="w-0.5 bg-[#00D9FF] rounded-full animate-telemetry-bar-3" />
                        <span className="w-0.5 bg-[#00D9FF] rounded-full animate-telemetry-bar-4" />
                        <span className="w-0.5 bg-[#00D9FF] rounded-full animate-telemetry-bar-5" />
                        <span className="w-0.5 bg-[#00D9FF] rounded-full animate-telemetry-bar-6" />
                      </div>
                    </div>
                  </div>

                  {/* Right: Stream Active indicator & QPS throughput */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto text-[9.5px] font-mono">
                    <div className="text-right">
                      <div className="text-[#00D9FF] font-bold tracking-widest flex items-center gap-1.5 justify-end">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-ping" />
                        STREAM ACTIVE
                      </div>
                      <div className="text-[#94A3B8] uppercase tracking-wider font-semibold">
                        {telemetry.qps} QPS/SEC
                      </div>
                    </div>

                    {/* Glowing status orb chip */}
                    <div className="w-8 h-8 rounded-xl border border-[#00D9FF]/40 bg-[#06101E] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(0,217,255,0.25)]">
                      <div className="w-2.5 h-2.5 bg-[#00D9FF] rounded-full animate-pulse shadow-[0_0_8px_#00D9FF]" />
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>

            {/* =====================================================================
                10. CARDS FLUTUANTES ASSÍNCRONOS AO REDOR DO TERMINAL
                ===================================================================== */}
            {/* CARD 1: API ONLINE (Top Left) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              style={{ willChange: 'transform, opacity' }}
              className="absolute -top-5 -left-4 sm:-top-8 sm:-left-8 z-30 animate-float-card-1 hidden sm:flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#030914]/90 border border-[#00D9FF]/35 shadow-[0_10px_25px_rgba(0,0,0,0.6)] transform-gpu"
            >
              <div className="w-7 h-7 rounded-lg bg-[#06101E] border border-[#00D9FF]/30 flex items-center justify-center text-[#00D9FF]">
                <Globe className="w-4 h-4" />
              </div>
              <div className="text-left font-mono">
                <div className="text-[10px] font-bold text-white leading-none">API</div>
                <div className="text-[8.5px] font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </div>
              </div>
            </motion.div>

            {/* CARD 2: DATABASE CLUSTER (Top Right) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              style={{ willChange: 'transform, opacity' }}
              className="absolute -top-6 -right-2 sm:-top-8 sm:-right-6 z-30 animate-float-card-2 hidden sm:flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#030914]/90 border border-[#1677FF]/40 shadow-[0_10px_25px_rgba(0,0,0,0.6)] transform-gpu"
            >
              <div className="w-7 h-7 rounded-lg bg-[#06101E] border border-[#1677FF]/30 flex items-center justify-center text-[#00D9FF]">
                <Database className="w-4 h-4" />
              </div>
              <div className="text-left font-mono">
                <div className="text-[10px] font-bold text-white leading-none">DATABASE</div>
                <div className="text-[8.5px] font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  CLUSTER
                </div>
              </div>
            </motion.div>

            {/* CARD 3: MOBILE READY (Bottom Left) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              style={{ willChange: 'transform, opacity' }}
              className="absolute -bottom-6 -left-3 sm:-bottom-8 sm:-left-6 z-30 animate-float-card-3 hidden sm:flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#030914]/90 border border-[#00D9FF]/35 shadow-[0_10px_25px_rgba(0,0,0,0.6)] transform-gpu"
            >
              <div className="w-7 h-7 rounded-lg bg-[#06101E] border border-[#00D9FF]/30 flex items-center justify-center text-[#00D9FF]">
                <Smartphone className="w-4 h-4" />
              </div>
              <div className="text-left font-mono">
                <div className="text-[10px] font-bold text-white leading-none">MOBILE</div>
                <div className="text-[8.5px] font-semibold text-cyan-300 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  READY
                </div>
              </div>
            </motion.div>

            {/* CARD 4: 14.5K REQ/SEC (Bottom Right) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              style={{ willChange: 'transform, opacity' }}
              className="absolute -bottom-6 -right-3 sm:-bottom-8 sm:-right-6 z-30 animate-float-card-4 hidden sm:flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#030914]/90 border border-[#006EFF]/40 shadow-[0_10px_25px_rgba(0,0,0,0.6)] transform-gpu"
            >
              <div className="w-7 h-7 rounded-lg bg-[#06101E] border border-[#006EFF]/30 flex items-center justify-center text-[#00D9FF]">
                <Activity className="w-4 h-4" />
              </div>
              <div className="text-left font-mono">
                <div className="text-[10px] font-bold text-white leading-none">{telemetry.qps}</div>
                <div className="text-[8.5px] font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  REQ/SEC
                </div>
              </div>
            </motion.div>

          </div>

        </div>

        {/* =========================================================================
            13. MÉTRICAS INFERIORES: CONTAINER ÚNICO COM 4 COLUNAS & SEPARADORES
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          style={{ willChange: 'transform, opacity' }}
          className="mt-12 sm:mt-16 w-full rounded-2xl border border-[rgba(0,180,255,0.20)] bg-[rgba(5,15,30,0.60)] shadow-2xl p-4 sm:p-6 transform-gpu"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(0,180,255,0.15)] gap-y-4 sm:gap-y-0">
            
            {/* MÉTRICA 1: PROJETOS */}
            <div className="px-4 sm:px-6 py-2 text-left space-y-1">
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#94A3B8]">
                <Code2 className="w-3.5 h-3.5 text-[#00D9FF]" />
                <span>PROJETOS</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-[#00D9FF]">
                {COMPANY_INFO.stats.projectsDelivered}
              </div>
              <div className="text-xs text-[#94A3B8] font-normal">
                Sistemas & Apps Entregues
              </div>
            </div>

            {/* MÉTRICA 2: ESCALA */}
            <div className="px-4 sm:px-6 py-2 text-left space-y-1">
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#94A3B8]">
                <Globe className="w-3.5 h-3.5 text-[#1677FF]" />
                <span>ESCALA</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-[#00D9FF]">
                {COMPANY_INFO.stats.activeUsersServed}
              </div>
              <div className="text-xs text-[#94A3B8] font-normal">
                Usuários Impactados
              </div>
            </div>

            {/* MÉTRICA 3: CONFIABILIDADE */}
            <div className="px-4 sm:px-6 py-2 text-left space-y-1">
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#94A3B8]">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>CONFIABILIDADE</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-[#00D9FF]">
                {COMPANY_INFO.stats.uptimeSla}
              </div>
              <div className="text-xs text-[#94A3B8] font-normal">
                SLA Médio de Uptime
              </div>
            </div>

            {/* MÉTRICA 4: PROPRIEDADE */}
            <div className="px-4 sm:px-6 py-2 text-left space-y-1">
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#94A3B8]">
                <Lock className="w-3.5 h-3.5 text-[#00D9FF]" />
                <span>PROPRIEDADE</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-[#00D9FF]">
                {COMPANY_INFO.stats.codeOwnership}
              </div>
              <div className="text-xs text-[#94A3B8] font-normal">
                Código 100% Seu (Sem Lock-in)
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

// Syntax highlighting parser
function renderHighlightedCode(text: string) {
  const lines = text.split('\n');
  return lines.map((line, lIdx) => {
    if (line.trim().startsWith('//')) {
      return (
        <div key={lIdx} className="text-slate-500 italic">
          {line}
        </div>
      );
    }

    return (
      <div key={lIdx} className="leading-relaxed">
        {line.split(/("(?:[^"\\]|\\.)*"|\/\/.*|\b(?:package|import|func|main|class|final|Future|void|async|await|module|source|true|false|return|use|let|mut|fn|pub|impl)\b)/g).map((token, tIdx) => {
          if (!token) return null;
          if (token.startsWith('//')) {
            return <span key={tIdx} className="text-slate-500 italic">{token}</span>;
          }
          if (token.startsWith('"') && token.endsWith('"')) {
            return <span key={tIdx} className="text-[#00D9FF]">{token}</span>;
          }
          if (['package', 'import', 'func', 'main', 'class', 'final', 'Future', 'void', 'async', 'await', 'module', 'source', 'use', 'let', 'mut', 'fn', 'pub', 'impl'].includes(token)) {
            return <span key={tIdx} className="text-[#1677FF] font-semibold">{token}</span>;
          }
          if (['true', 'false', 'Ok', 'Result'].includes(token)) {
            return <span key={tIdx} className="text-emerald-400 font-semibold">{token}</span>;
          }
          if (token.match(/\b(gateway|resilience|auth|SyncPipeline|BiometricVault|AES256_GCM|Listen|Route|Router|Telemetry|CircuitBreaker)\b/)) {
            return <span key={tIdx} className="text-cyan-300">{token}</span>;
          }
          return <span key={tIdx} className="text-slate-200">{token}</span>;
        })}
      </div>
    );
  });
}

/**
 * Terminal com efeito de digitação. Fica isolado num componente próprio para que
 * cada caractere digitado re-renderize só este bloco, e não o Hero inteiro.
 */
const TypingCode = memo(function TypingCode({ code, replayKey }: { code: string; replayKey: number }) {
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedCode('');
    setIsTyping(true);

    let currentIndex = 0;
    const step = 4;
    const interval = setInterval(() => {
      currentIndex += step;
      if (currentIndex >= code.length) {
        setDisplayedCode(code);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setDisplayedCode(code.slice(0, currentIndex));
      }
    }, 12);

    return () => clearInterval(interval);
  }, [code, replayKey]);

  return (
    <>
      {renderHighlightedCode(displayedCode)}
      {isTyping && (
        <span className="inline-block w-2 h-3.5 ml-0.5 bg-[#00D9FF] animate-cursor align-middle shadow-[0_0_8px_#00D9FF]" />
      )}
    </>
  );
});
