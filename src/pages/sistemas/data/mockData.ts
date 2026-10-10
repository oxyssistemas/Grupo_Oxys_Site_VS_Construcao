import {
  ServiceItem,
  TechnologyItem,
  SaasProduct,
  CaseStudy,
  ApiEndpointDemo,
  Testimonial,
  FaqItem
} from '../types';
import { BRAND_CONFIG } from '../../../config/brandAssets';

export const COMPANY_INFO = {
  name: 'Oxys Sistemas',
  parentGroup: 'Grupo Oxys',
  tagline: 'Engenharia de Software, Aplicativos Mobile & APIs de Alta Performance',
  description: 'Criamos softwares sob medida, plataformas web escaláveis, aplicativos nativos e híbridos, e arquiteturas de microsserviços prontas para suportar o crescimento exponencial do seu negócio.',
  // Contatos vêm do site principal (src/config/brandAssets.ts) para ficarem sempre iguais
  email: BRAND_CONFIG.CONTACT.EMAIL,
  whatsappNumber: BRAND_CONFIG.CONTACT.WHATSAPP_NUMBER,
  whatsappDisplay: BRAND_CONFIG.CONTACT.PHONE,
  location: `${BRAND_CONFIG.CONTACT.ADDRESS} - Atendimento: ${BRAND_CONFIG.CONTACT.COVERAGE}`,
  foundedYear: '2020',
  stats: {
    projectsDelivered: '140+',
    activeUsersServed: '4.8M+',
    uptimeSla: '99.98%',
    codeOwnership: '100%'
  }
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'custom-software',
    title: 'Sistemas Web & Plataformas Sob Medida',
    shortDesc: 'Desenvolvimento de ERPs, CRMs, portais B2B/B2C e sistemas de gestão desenhados exclusivamente para a regra de negócio da sua empresa.',
    fullDesc: 'Construímos soluções web robustas e modernas com arquiteturas modulares que eliminam gargalos operacionais e automatizam fluxos críticos com total segurança de dados.',
    image: '/services/custom-software.jpg',
    iconName: 'LayoutGrid',
    badge: 'Core Enterprise',
    deliverables: [
      'Painéis administrativos e dashboards interativos',
      'Controle granular de permissões e perfis (RBAC)',
      'Automação de fluxos operacionais e relatórios em tempo real',
      'Código limpo, escalável e 100% transferido para sua empresa'
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    metrics: '-65% em tempo de processos manuais'
  },
  {
    id: 'mobile-apps',
    title: 'Aplicativos Mobile (iOS & Android)',
    shortDesc: 'Apps nativos e cross-platform intuitivos, fluidos a 60fps, com sincronização offline, notificações push e integrações com sensores.',
    fullDesc: 'Desde a concepção da experiência do usuário (UX/UI) até a publicação e homologação na Apple App Store e Google Play Store, garantindo alto engajamento e retenção.',
    image: '/services/mobile-apps.jpg',
    iconName: 'Smartphone',
    badge: 'Mobile First',
    deliverables: [
      'Apps híbridos de alta performance (Flutter / React Native)',
      'Sincronização de dados offline-first com SQLite/WatermelonDB',
      'Biometria, Push Notifications e Geolocalização avançada',
      'Publicação e gestão de esteiras de build contínuo nas lojas'
    ],
    technologies: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'GraphQL'],
    metrics: 'Classificação média 4.9 nas lojas'
  },
  {
    id: 'apis-microservices',
    title: 'APIs Escaláveis & Microsserviços',
    shortDesc: 'Arquiteturas orientadas a eventos e APIs REST/GraphQL projetadas para suportar milhões de requisições por minuto com latência ultra-baixa.',
    fullDesc: 'Desenvolvemos gateways de integração seguros, sistemas de filas resilientes e barramentos de comunicação que conectam seu ecossistema sem fricção.',
    image: '/services/apis-microservices.jpg',
    iconName: 'Cpu',
    badge: 'Alta Performance',
    deliverables: [
      'APIs RESTful e GraphQL documentadas via Swagger/OpenAPI',
      'Gateways de autenticação com OAuth 2.0 / JWT / mTLS',
      'Processamento assíncrono com Redis, Kafka e RabbitMQ',
      'Monitoramento de telemetria e APM (Datadog, Prometheus)'
    ],
    technologies: ['Node.js', 'Go (Golang)', 'Python / FastAPI', 'Redis', 'Kafka', 'Docker'],
    metrics: 'Latência < 45ms em 99% das requisições'
  },
  {
    id: 'integrations-gateways',
    title: 'Integrações de Sistemas & Pagamentos',
    shortDesc: 'Conectores robustos com gateways de pagamento (Pix, Cartão, Boleto), ERPs legados, CRMs (HubSpot, Salesforce) e plataformas bancárias.',
    fullDesc: 'Eliminamos silos de informação integrando plataformas legadas aos sistemas mais modernos com webhooks confiáveis e tratamento de idempotência.',
    image: '/services/integrations-gateways.jpg',
    iconName: 'Network',
    badge: 'Conectividade',
    deliverables: [
      'Integração Pix instantâneo e conciliação bancária automática',
      'Conectores com ERPs tradicionais (SAP, TOTVS, Sankhya, Senior)',
      'Pipelines de Webhooks com retentativas inteligentes e dead-letter queue',
      'Conformidade com padrões abertos e segurança bancária'
    ],
    technologies: ['Webhooks', 'mTLS', 'REST', 'gRPC', 'Postman', 'OAuth2'],
    metrics: 'Zero perda de eventos com Dead-Letter Queue'
  },
  {
    id: 'cloud-devops',
    title: 'Cloud Architecture & DevOps',
    shortDesc: 'Infraestrutura como código (IaC), esteiras de CI/CD automatizadas e ambientes em nuvem (AWS/GCP/Azure) otimizados para custo e performance.',
    fullDesc: 'Modernizamos o ciclo de entrega de software com deploys automatizados, autoscaling dinâmico e segurança preventiva com monitoramento 24/7.',
    image: '/services/cloud-devops.jpg',
    iconName: 'Cloud',
    badge: 'Cloud Native',
    deliverables: [
      'Infraestrutura como Código com Terraform e Docker',
      'Clusters Kubernetes (EKS, GKE) com autoscaling inteligente',
      'Pipelines CI/CD com GitHub Actions e testes automatizados',
      'Otimização de custos FinOps com redução média de 35% na fatura'
    ],
    technologies: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
    metrics: 'Economia média de 35% em custos de Cloud'
  },
  {
    id: 'legacy-modernization',
    title: 'Modernização de Sistemas Legados',
    shortDesc: 'Migração gradual de sistemas antigos monolíticos para arquiteturas modernas sem interrupção da operação diária.',
    fullDesc: 'Analisamos o código legado, isolamos os domínios de negócio e criamos uma camada de transição segura usando padrões como Strangler Fig.',
    image: '/services/legacy-modernization.jpg',
    iconName: 'RefreshCw',
    badge: 'Transformação',
    deliverables: [
      'Mapeamento de débito técnico e arquitetura de transição',
      'Desacoplamento de monólitos em serviços modulares',
      'Migração de banco de dados relacional sem downtime',
      'Garantia de continuidade das regras de negócio existentes'
    ],
    technologies: ['Microfrontends', 'BFF Pattern', 'PostgreSQL', 'Docker', 'Prisma'],
    metrics: '100% sem interrupção de operação comercial'
  }
];

export const TECHNOLOGIES_LIST: TechnologyItem[] = [
  // Frontend
  {
    name: 'React 19 & Next.js',
    category: 'frontend',
    icon: 'Atom',
    description: 'Interface de usuário ultra rápida com Server Components e renderização otimizada.',
    level: 'Especialista',
    popularFor: 'Portais Web, Dashboards & SaaS'
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    icon: 'Code2',
    description: 'Tipagem estática avançada que reduz em 80% erros em tempo de execução.',
    level: 'Padrão em 100% dos projetos',
    popularFor: 'Robustez e segurança no código'
  },
  {
    name: 'Tailwind CSS & Shadcn',
    category: 'frontend',
    icon: 'Palette',
    description: 'Design systems modernos, responsivos, acessíveis e com visual refinado.',
    level: 'Especialista',
    popularFor: 'UI/UX moderno e escalável'
  },
  {
    name: 'Vue.js & Nuxt',
    category: 'frontend',
    icon: 'Layers',
    description: 'Framework progressivo para aplicações interativas e dinâmicas.',
    level: 'Avançado',
    popularFor: 'Sistemas corporativos reativos'
  },

  // Backend
  {
    name: 'Node.js & Express / NestJS',
    category: 'backend',
    icon: 'Server',
    description: 'Backends assíncronos de alta vazão, orientados a microsserviços e TypeScript.',
    level: 'Especialista',
    popularFor: 'APIs REST e WebSockets em tempo real'
  },
  {
    name: 'Go (Golang)',
    category: 'backend',
    icon: 'Zap',
    description: 'Linguagem compilada de altíssima performance para sistemas críticos e gateways.',
    level: 'Especialista',
    popularFor: 'Serviços de alto throughput e mensageria'
  },
  {
    name: 'Python & FastAPI',
    category: 'backend',
    icon: 'Terminal',
    description: 'APIs modernas, processamento de dados, inteligência artificial e automação.',
    level: 'Avançado',
    popularFor: 'Pipelines de dados e módulos de IA'
  },
  {
    name: 'Java / Kotlin Spring Boot',
    category: 'backend',
    icon: 'ShieldCheck',
    description: 'Arquiteturas corporativas para bancos, financeiras e grandes volumes de transações.',
    level: 'Avançado',
    popularFor: 'Sistemas bancários e legados'
  },

  // Mobile
  {
    name: 'Flutter (Dart)',
    category: 'mobile',
    icon: 'Smartphone',
    description: 'Compilação nativa com UI uniforme e taxa de 120fps em iOS e Android simultaneamente.',
    level: 'Especialista',
    popularFor: 'Apps multiplataforma de alta fidelidade'
  },
  {
    name: 'React Native & Expo',
    category: 'mobile',
    icon: 'Boxes',
    description: 'Desenvolvimento mobile ágil com ecossistema JavaScript nativo e OTA updates.',
    level: 'Especialista',
    popularFor: 'Startups, e-commerces e apps dinâmicos'
  },
  {
    name: 'Swift & SwiftUI (iOS)',
    category: 'mobile',
    icon: 'Apple',
    description: 'Desenvolvimento nativo exclusivo para dispositivos Apple, Apple Watch e iPadOS.',
    level: 'Avançado',
    popularFor: 'Experiências nativas premium iOS'
  },
  {
    name: 'Kotlin & Jetpack (Android)',
    category: 'mobile',
    icon: 'Radio',
    description: 'Aplicações nativas com integração direta de hardware, Bluetooth e POS.',
    level: 'Avançado',
    popularFor: 'Apps Android nativos e terminais Smart POS'
  },

  // Databases
  {
    name: 'PostgreSQL',
    category: 'database',
    icon: 'Database',
    description: 'O banco de dados relacional mais confiável do mundo, com suporte a JSON e índices avançados.',
    level: 'Especialista',
    popularFor: 'Transações ACID e integridade de dados'
  },
  {
    name: 'Redis',
    category: 'database',
    icon: 'Flame',
    description: 'Armazenamento em memória para cache distribuído, pub/sub e controle de sessões.',
    level: 'Especialista',
    popularFor: 'Cache ultra rápido e filas assíncronas'
  },
  {
    name: 'MongoDB',
    category: 'database',
    icon: 'FolderKanban',
    description: 'Banco de dados NoSQL flexível para catálogos dinâmicos e logs estruturados.',
    level: 'Avançado',
    popularFor: 'Armazenamento de documentos não estruturados'
  },

  // Cloud & DevOps
  {
    name: 'Amazon Web Services (AWS)',
    category: 'cloud',
    icon: 'CloudLightning',
    description: 'Arquiteturas Serverless (Lambda), ECS, S3, RDS e CloudFront.',
    level: 'Especialista',
    popularFor: 'Infraestrutura global e escalabilidade elástica'
  },
  {
    name: 'Google Cloud Platform (GCP)',
    category: 'cloud',
    icon: 'Globe',
    description: 'Cloud Run, BigQuery, Firebase e Kubernetes Engine com deploy instantâneo.',
    level: 'Especialista',
    popularFor: 'Apps conteinerizados e analytics'
  },
  {
    name: 'Docker & Kubernetes',
    category: 'devops',
    icon: 'Container',
    description: 'Padronização de ambientes de desenvolvimento e orquestração de microsserviços.',
    level: 'Especialista',
    popularFor: 'Deploy contínuo e resiliência'
  },
  {
    name: 'CI/CD & GitHub Actions',
    category: 'devops',
    icon: 'GitBranch',
    description: 'Pipelines automatizados de lint, testes unitários, build e deploy seguro.',
    level: 'Especialista',
    popularFor: 'Entrega contínua sem intervenção manual'
  }
];

export const API_PLAYGROUND_DEMOS: ApiEndpointDemo[] = [
  {
    id: 'auth-jwt',
    method: 'POST',
    path: '/api/v1/auth/token',
    title: 'Autenticação Segura (OAuth2 / JWT)',
    description: 'Emissão de token seguro com tempo de expiração curto e chave de rotação automática.',
    requestHeaders: {
      'Content-Type': 'application/json',
      'X-Client-Id': 'oxys-client-app-v2',
      'User-Agent': 'OxysMobile/3.4.1 (iOS 18.2)'
    },
    requestBody: {
      client_id: 'enterprise_user_9921',
      auth_type: 'biometric_assertion',
      device_fingerprint: 'sha256:d8e8fca2901b0098',
      scope: ['read:systems', 'write:orders', 'sync:offline']
    },
    responseStatus: 200,
    responseBody: {
      status: 'success',
      authenticated: true,
      token_type: 'Bearer',
      access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...',
      expires_in: 3600,
      user: {
        id: 'usr_849204',
        name: 'Roberto Alencar',
        company: 'Logix Logística SA',
        roles: ['ADMIN_SYSTEM', 'DISPATCHER']
      },
      security_audit: {
        ip: '189.40.122.9',
        geo: 'São Paulo, BR',
        mfa_verified: true
      }
    },
    latencyMs: 38
  },
  {
    id: 'pix-checkout',
    method: 'POST',
    path: '/api/v1/payments/pix/charge',
    title: 'Gateway de Pagamento Pix Instantâneo',
    description: 'Geração de cobrança Pix dinâmica com QR Code Copia e Cola, webhook em tempo real e expiração automática.',
    requestHeaders: {
      'Authorization': 'Bearer eyJhbGciOiJSUzI1Ni...',
      'Idempotency-Key': 'pix_req_99201a_44b7',
      'Content-Type': 'application/json'
    },
    requestBody: {
      amount_cents: 285000,
      currency: 'BRL',
      order_reference: 'PED-2026-8841',
      customer: {
        tax_id: '44.821.902/0001-33',
        name: 'Vanguarda Soluções Industriais',
        email: 'financeiro@vanguarda.ind.br'
      },
      webhook_notify_url: 'https://cliente.com.br/api/webhooks/pix'
    },
    responseStatus: 201,
    responseBody: {
      charge_id: 'chg_pix_88204919028',
      status: 'PENDING_PAYMENT',
      amount_brl: 'R$ 2.850,00',
      pix_copy_paste: '00020126580014br.gov.bcb.pix0136d8e8fca2-oxys-sistema-bcb52040000530398654072850.005802BR5925OXYS SISTEMAS PAGAMENTOS6009SAO PAULO62070503***6304E8A1',
      qr_code_svg: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0...',
      expires_at: '2026-08-28T03:45:00Z',
      idempotency_matched: false
    },
    latencyMs: 52
  },
  {
    id: 'mobile-sync',
    method: 'GET',
    path: '/api/v1/mobile/sync/delta?last_sync_timestamp=1738290000',
    title: 'Sincronização Delta Offline-First',
    description: 'Sincroniza apenas as alterações incrementais (deltas) entre o servidor e o app mobile com compressão gzip.',
    requestHeaders: {
      'Authorization': 'Bearer eyJhbGciOiJSUzI1Ni...',
      'Accept-Encoding': 'gzip, deflate',
      'X-App-Version': '3.4.1'
    },
    responseStatus: 200,
    responseBody: {
      sync_session_id: 'sync_991823a01',
      timestamp: 1738298400,
      has_more_pages: false,
      records: {
        created: [
          { id: 'cli_102', name: 'Centro de Distribuição Sul', status: 'ACTIVE' }
        ],
        updated: [
          { id: 'ord_994', status: 'IN_TRANSIT', driver_lat: -23.55052, driver_lng: -46.63330 }
        ],
        deleted_ids: ['tmp_cache_991']
      },
      compression_ratio: '88% reduced payload',
      execution_time_ms: 24
    },
    latencyMs: 24
  },
  {
    id: 'ai-pipeline',
    method: 'POST',
    path: '/api/v1/ai/extract-documents',
    title: 'Pipeline de IA & OCR para Documentos',
    description: 'Extração automática de metadados, validação de campos fiscais e estruturação de NF-e e contratos em JSON.',
    requestHeaders: {
      'Authorization': 'Bearer eyJhbGciOiJSUzI1Ni...',
      'Content-Type': 'application/json'
    },
    requestBody: {
      document_url: 'https://cloud-storage.oxys.com/docs/nfe_fiscal_9901.pdf',
      document_type: 'NFE_SERVICO',
      confidence_threshold: 0.95
    },
    responseStatus: 200,
    responseBody: {
      job_id: 'ai_job_771920',
      extracted_data: {
        cnpj_emissor: '12.345.678/0001-90',
        valor_total_liquido: 14500.00,
        impostos_retidos: {
          iss: 725.00,
          pis: 94.25,
          cofins: 435.00
        },
        descricao_servico: 'Serviços de desenvolvimento e sustentação de software especializado',
        data_emissao: '2026-08-25'
      },
      accuracy_score: 0.994,
      processing_latency_ms: 180
    },
    latencyMs: 180
  }
];

export const SAAS_PRODUCTS_LIST: SaasProduct[] = [
  {
    id: 'pdv-restaurante',
    name: 'PDV Restaurante',
    category: 'Food Service & Gastronomia',
    slug: 'pdv-restaurante',
    image: '/saas/pdv-restaurante.jpg',
    badge: 'Food Service',
    shortDesc: 'Frente de caixa rápida, controle de mesas e comandas eletrônicas, integração com delivery e telas KDS de cozinha.',
    fullDesc: 'Sistema completo e veloz para restaurantes, bares, cafeterias e dark kitchens com fechamento ágil, divisão de conta por cliente, impressão setorizada e relatórios de CMV.',
    highlights: ['Comanda Mobile & Mesas', 'KDS Cozinha em Tempo Real', 'iFood & Delivery Direto', 'NFC-e / SAT Automático'],
    metrics: { label: 'Agilidade de Atendimento', value: '+45%' },
    iconName: 'Utensils',
    colorTheme: {
      primaryHex: '#f97316',
      textClass: 'text-orange-400',
      borderClass: 'border-orange-500',
      bgBadgeClass: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
      gradientClass: 'from-orange-500 via-amber-500 to-yellow-500',
      glowShadow: '0 0 35px rgba(249, 115, 22, 0.5)',
      iconBgClass: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
      lightBgClass: 'bg-orange-950/30'
    }
  },
  {
    id: 'pdv',
    name: 'PDV (Frente de Caixa)',
    category: 'Varejo & Comércio',
    slug: 'pdv',
    image: '/saas/pdv.jpg',
    badge: 'Varejo & PDV',
    shortDesc: 'Frente de caixa ágil com emissão fiscal instantânea, leitor de código de barras, TEF integrado e operação offline.',
    fullDesc: 'Ideal para lojas, mercados, franquias e comércio em geral. Venda em segundos sem travar a fila, mesmo com instabilidade de internet, sincronizando tudo automaticamente.',
    highlights: ['Emissão NFC-e / SAT / PAF', 'TEF Multibandeira & Pix', 'Operação 100% Offline-First', 'Fechamento Cego de Caixa'],
    metrics: { label: 'Tempo Médio por Venda', value: '< 8s' },
    iconName: 'ShoppingBag',
    colorTheme: {
      primaryHex: '#10b981',
      textClass: 'text-emerald-400',
      borderClass: 'border-emerald-500',
      bgBadgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      gradientClass: 'from-emerald-400 via-teal-400 to-green-500',
      glowShadow: '0 0 35px rgba(16, 185, 129, 0.5)',
      iconBgClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50',
      lightBgClass: 'bg-emerald-950/30'
    }
  },
  {
    id: 'gestao-estoque',
    name: 'Gestão de Estoque',
    category: 'Logística & Suprimentos',
    slug: 'gestao-estoque',
    image: '/saas/gestao-estoque.jpg',
    badge: 'Controle de Estoque',
    shortDesc: 'Controle rigoroso de entradas e saídas, cálculo de ponto de reposição, inventário por leitor, multi-depósitos e Curva ABC.',
    fullDesc: 'Elimine perdas, rupturas e compras desnecessárias. Rastreamento por lotes e validades com alertas preditivos de compras para seu negócio.',
    highlights: ['Curva ABC & Previsão', 'Múltiplos Depósitos / Lojas', 'Rastreio de Lote & Validade', 'Importação XML de NF-e'],
    metrics: { label: 'Redução de Rupturas', value: '-60%' },
    iconName: 'Boxes',
    colorTheme: {
      primaryHex: '#a855f7',
      textClass: 'text-purple-400',
      borderClass: 'border-purple-500',
      bgBadgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      gradientClass: 'from-purple-500 via-violet-500 to-indigo-500',
      glowShadow: '0 0 35px rgba(168, 85, 247, 0.5)',
      iconBgClass: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
      lightBgClass: 'bg-purple-950/30'
    }
  },
  {
    id: 'ordem-servico',
    name: 'Ordem de Serviço (OS)',
    category: 'Assistências & Prestadores',
    slug: 'ordem-servico',
    image: '/saas/ordem-servico.jpg',
    badge: 'Gestão de OS',
    shortDesc: 'Acompanhamento do ciclo de vida da OS, checklist de entrada, fotos do equipamento, laudo técnico e assinatura digital.',
    fullDesc: 'Projetado para oficinas, assistências técnicas, climatização, prestadores e manutenção. Controle de peças utilizadas, mão de obra e envio de orçamento por WhatsApp.',
    highlights: ['Assinatura Digital no App', 'Laudo Técnico com Fotos', 'Aprovação via WhatsApp', 'Controle de Peças e Garantia'],
    metrics: { label: 'Aprovações Rápidas', value: '3x mais rápido' },
    iconName: 'Wrench',
    colorTheme: {
      primaryHex: '#38bdf8',
      textClass: 'text-sky-400',
      borderClass: 'border-sky-500',
      bgBadgeClass: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
      gradientClass: 'from-sky-400 via-blue-500 to-indigo-600',
      glowShadow: '0 0 35px rgba(56, 189, 248, 0.5)',
      iconBgClass: 'bg-sky-500/20 text-sky-400 border-sky-500/50',
      lightBgClass: 'bg-sky-950/30'
    }
  },
  {
    id: 'agendamentos',
    name: 'Agendamentos',
    category: 'Clínicas, Salões & Serviços',
    slug: 'agendamentos',
    image: '/saas/agendamentos.jpg',
    badge: 'Agenda Online 24/7',
    shortDesc: 'Página de agendamento online para clientes, bloqueio inteligente de horários, lembretes automáticos e pagamento antecipado.',
    fullDesc: 'Reduza faltas e no-shows em até 50% com automação de confirmações por WhatsApp e SMS, controle de comissões por profissional e sincronização com Google Agenda.',
    highlights: ['Lembretes via WhatsApp', 'Multi-Profissionais & Salas', 'Sinal/Pagamento no Pix', 'Google Agenda Sync'],
    metrics: { label: 'Redução de No-Shows', value: '-52%' },
    iconName: 'CalendarCheck',
    colorTheme: {
      primaryHex: '#ec4899',
      textClass: 'text-pink-400',
      borderClass: 'border-pink-500',
      bgBadgeClass: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
      gradientClass: 'from-pink-500 via-rose-500 to-fuchsia-500',
      glowShadow: '0 0 35px rgba(236, 72, 153, 0.5)',
      iconBgClass: 'bg-pink-500/20 text-pink-400 border-pink-500/50',
      lightBgClass: 'bg-pink-950/30'
    }
  },
  {
    id: 'crm',
    name: 'CRM (Gestão de Vendas)',
    category: 'Vendas & Relacionamento',
    slug: 'crm',
    image: '/saas/crm.jpg',
    badge: 'Vendas & Funil',
    shortDesc: 'Funil de vendas visual estilo Kanban, histórico de interações, automação de follow-ups e gerador de propostas comerciais.',
    fullDesc: 'Dobre a taxa de conversão do seu time comercial organizando oportunidades, lead scoring, métricas de taxa de ganho e integração com WhatsApp e e-mail corporativo.',
    highlights: ['Pipelines & Funil Kanban', 'Histórico 360° do Cliente', 'Propostas em PDF/Link', 'Métricas de Conversão'],
    metrics: { label: 'Conversão Comercial', value: '+38%' },
    iconName: 'Users',
    colorTheme: {
      primaryHex: '#f59e0b',
      textClass: 'text-amber-400',
      borderClass: 'border-amber-500',
      bgBadgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      gradientClass: 'from-amber-400 via-yellow-400 to-orange-500',
      glowShadow: '0 0 35px rgba(245, 158, 11, 0.5)',
      iconBgClass: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
      lightBgClass: 'bg-amber-950/30'
    }
  },
  {
    id: 'erp',
    name: 'ERP (Gestão Empresarial)',
    category: 'Gestão Integrada Enterprise',
    slug: 'erp',
    image: '/saas/erp.jpg',
    badge: 'ERP Completo',
    shortDesc: 'Controle financeiro com DRE e Fluxo de Caixa, faturamento, conciliação bancária automática, fiscal e relatórios executivos.',
    fullDesc: 'O coração da gestão da sua empresa em uma única plataforma segura. Integração total entre vendas, compras, contas a pagar/receber, estoque e contabilidade.',
    highlights: ['DRE & Fluxo Projetado', 'Conciliação Bancária OFX', 'Emissão Fiscal Completa', 'Multi-Filiais & Centros de Custo'],
    metrics: { label: 'Visibilidade Financeira', value: '100% Real-time' },
    iconName: 'BarChart3',
    colorTheme: {
      primaryHex: '#06b6d4',
      textClass: 'text-cyan-400',
      borderClass: 'border-cyan-500',
      bgBadgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      gradientClass: 'from-cyan-400 via-sky-400 to-teal-400',
      glowShadow: '0 0 35px rgba(6, 182, 212, 0.5)',
      iconBgClass: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50',
      lightBgClass: 'bg-cyan-950/30'
    }
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'fintech-gateway',
    title: 'Plataforma de Liquidação & Gateway de Pagamentos',
    clientCategory: 'FinTech & Meios de Pagamento',
    tagline: 'Processamento de mais de 800 mil transações/mês com 99.99% de disponibilidade.',
    summary: 'A Oxys Sistemas projetou e construiu do zero um ecossistema completo de pagamentos com subadquirência, geração de Pix em lote, split de pagamentos automático e painel financeiro multi-empresa.',
    challenge: 'A fintech enfrentava gargalos em datas comemorativas com lentidão em transações, conciliação manual com bancos parceiros e falhas por falta de idempotência nos webhooks.',
    solution: 'Implementação de microsserviços em Go e Node.js com filas assíncronas em Redis, arquitetura de alta disponibilidade na AWS com Kubernetes e painel administrativo em React.',
    results: [
      { label: 'Uptime em Produção', value: '99.99%', detail: 'Zero downtime mesmo na Black Friday' },
      { label: 'Tempo de Resposta Pix', value: '38ms', detail: 'Liquidação instantânea confirmada' },
      { label: 'Volume Processado', value: '+R$ 140M', detail: 'Transacionados de forma segura' }
    ],
    techStack: ['Go', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS EKS', 'React'],
    platforms: ['Web Enterprise', 'API Gateway', 'Dashboard Financeiro'],
    featuredImagePlaceholder: 'Fintech Dashboard'
  },
  {
    id: 'logistics-mobile',
    title: 'App de Roteirização e Rastreamento em Tempo Real',
    clientCategory: 'Logística & Transportes',
    tagline: 'App mobile com telemetria, offline-first e comprovação digital de entrega.',
    summary: 'Desenvolvimento de aplicativo móvel para motoristas e entregadores em todo o Brasil, operando sem sinal em áreas remotas e sincronizando automaticamente ao reconectar.',
    challenge: 'Entregas perdidas por falta de conectividade nas estradas, baixa aderência dos motoristas a interfaces complexas e atrasos na validação de canhoto fiscal.',
    solution: 'App nativo em Flutter com banco local WatermelonDB, compressão de fotos de comprovante no aparelho, geofencing inteligente e painel central de despachantes com mapas ao vivo.',
    results: [
      { label: 'Motoristas Ativos', value: '4.200+', detail: 'Usando o app diariamente' },
      { label: 'Economia de Combustível', value: '-22%', detail: 'Com roteirização otimizada' },
      { label: 'Tempo de Baixa da NF', value: '2 min', detail: 'Antes levava até 48 horas' }
    ],
    techStack: ['Flutter', 'Dart', 'TypeScript', 'GCP Cloud Run', 'PostGIS', 'WebSockets'],
    platforms: ['iOS', 'Android', 'Painel Web de Controle'],
    featuredImagePlaceholder: 'Mobile Logistics'
  },
  {
    id: 'health-saas',
    title: 'SaaS de Gestão Clínica & Prontuário Eletrônico',
    clientCategory: 'HealthTech & Clínicas',
    tagline: 'Sistema web multi-tenant seguro em conformidade com a LGPD e padrão TISS.',
    summary: 'Construção de um sistema web modular para redes de consultórios médicos com agendamento inteligente, prontuário com assinatura digital ICP-Brasil e telemedicina integrada.',
    challenge: 'Clínicas utilizavam múltiplos sistemas desintegrados, com risco de vazamento de dados sensíveis e perda de agendamentos por falta de confirmação por WhatsApp.',
    solution: 'Plataforma Next.js e Node.js com criptografia de ponta a ponta para dados de pacientes, integração oficial com WhatsApp Cloud API para lembretes e videoconferência WebRTC.',
    results: [
      { label: 'No-Show de Pacientes', value: '-48%', detail: 'Com automação via WhatsApp' },
      { label: 'Consultas Realizadas', value: '+350k', detail: 'Registradas com prontuário seguro' },
      { label: 'Conformidade LGPD', value: '100%', detail: 'Auditoria e criptografia mTLS' }
    ],
    techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'WebRTC', 'WhatsApp API'],
    platforms: ['Web SaaS Multi-tenant', 'Portal do Paciente PWA'],
    featuredImagePlaceholder: 'HealthTech Portal'
  }
];

export const METHODOLOGY_STEPS = [
  {
    step: '01',
    title: 'Imersão, Discovery & Arquitetura',
    description: 'Mapeamos detalhadamente as regras de negócio, fluxos de usuário, modelos de dados e desenhamos a arquitetura de software ideal antes de escrever uma única linha de código.',
    duration: 'Semana 1 a 2',
    icon: 'Compass',
    deliverables: ['Especificação Técnica', 'Diagrama de Arquitetura', 'Wireframes Interativos', 'Roadmap de Sprints']
  },
  {
    step: '02',
    title: 'Design UI/UX & Prototipagem',
    description: 'Criamos interfaces modernas, intuitivas e centradas na usabilidade real de quem vai usar o sistema no dia a dia, com validação de protótipo de alta fidelidade.',
    duration: 'Semana 2 a 3',
    icon: 'Figma',
    deliverables: ['Design System', 'Protótipo Navegável', 'Guia de Componentes', 'Acessibilidade WCAG']
  },
  {
    step: '03',
    title: 'Desenvolvimento Ágil em Sprints',
    description: 'Construção do software em ciclos quinzenais com entregas contínuas em ambiente de homologação, permitindo testes práticos e feedback em tempo real.',
    duration: 'Ciclos de 2 semanas',
    icon: 'Code2',
    deliverables: ['Código Versionado no Git', 'Deploys Contínuos (CI/CD)', 'Reuniões de Alinhamento', 'Sprints Transparentes']
  },
  {
    step: '04',
    title: 'QA, Testes Automatizados & Segurança',
    description: 'Bateria rigorosa de testes unitários, testes de integração, testes de carga sob estresse e auditoria de vulnerabilidades de segurança (OWASP Top 10).',
    duration: 'Integrado às Sprints',
    icon: 'CheckCircle2',
    deliverables: ['Cobertura de Testes Automatizados', 'Relatório de Vulnerabilidades', 'Testes de Carga & Estresse', 'Homologação Final']
  },
  {
    step: '05',
    title: 'Deploy em Produção & Suporte 24/7',
    description: 'Lançamento seguro com migração assistida, publicação nas lojas de aplicativos, monitoramento proativo de métricas e garantia de sustentação contínua.',
    duration: 'Go-Live & Ongoing',
    icon: 'Rocket',
    deliverables: ['Publicação App Store / Google Play', 'Infraestrutura Cloud Escalável', 'Dashboards de Telemetria', 'SLA de Atendimento Rápido']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos Mendonça',
    role: 'CTO & Co-Fundador',
    company: 'PayFlow Pagamentos',
    content: 'A Oxys Sistemas entregou nossa API e o sistema core de pagamentos com uma qualidade técnica impressionante. O código é extremamente organizado, testado e documentado. Conseguimos escalar para milhares de transações sem nenhum soluço.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    projectDelivered: 'Gateway de Pagamentos & API'
  },
  {
    id: '2',
    name: 'Juliana Ferreira',
    role: 'Diretora de Operações',
    company: 'LogExpress Brasil',
    content: 'Nosso aplicativo mobile anterior travava constantemente quando os motoristas ficavam sem sinal. A equipe da Oxys redesenhou todo o app com arquitetura offline-first em Flutter. O índice de reclamações caiu para zero e a produtividade da frota subiu mais de 30%.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    projectDelivered: 'App Mobile de Entregas & Web Admin'
  },
  {
    id: '3',
    name: 'Eduardo Silveira',
    role: 'Head de Tecnologia',
    company: 'ClinMax Saúde Integrada',
    content: 'Profissionalismo raro no mercado de software. Cumpriram rigorosamente todos os prazos das sprints, nos deram total visibilidade do progresso e o sistema foi entregue 100% pronto para a LGPD e com alta velocidade de carregamento.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    projectDelivered: 'Plataforma SaaS Multi-Tenant'
  }
];

export const FAQ_LIST: FaqItem[] = [
  {
    id: '1',
    question: 'O código-fonte do software desenvolvido pertencerá à minha empresa?',
    answer: 'Sim, 100%! Ao concluir o projeto e realizar as entregas, todos os direitos autorais, repositórios de código no GitHub/GitLab, documentação e propriedade intelectual são integralmente transferidos para sua empresa sem royalties ou taxas ocultas de licenciamento.',
    category: 'Contrato & Propriedade'
  },
  {
    id: '2',
    question: 'Qual a diferença entre a Oxys Sistemas e o Grupo Oxys?',
    answer: 'A Oxys Sistemas é a empresa vertical de tecnologia, engenharia de software e desenvolvimento sob medida pertencente ao ecossistema do Grupo Oxys. Combinamos a solidez e governança do grupo com a agilidade de squads de engenharia especializados.',
    category: 'Institucional'
  },
  {
    id: '3',
    question: 'Vocês desenvolvem tanto para iOS quanto para Android?',
    answer: 'Sim. Desenvolvemos aplicativos nativos ou multiplataforma de alta performance (utilizando Flutter ou React Native), garantindo que seu aplicativo funcione perfeitamente tanto no ecossistema Apple (iPhone, iPad) quanto no Android (smartphones e tablets de todas as marcas).',
    category: 'Desenvolvimento Mobile'
  },
  {
    id: '4',
    question: 'Como funciona a estimativa de prazos e valores?',
    answer: 'Após uma reunião inicial de discovery técnico (ou através do nosso simulador interativo nesta página), estruturamos um plano de trabalho dividido em sprints com escopo claro, marcos de entrega e estimativa de investimento previsível sem surpresas.',
    category: 'Prazos & Custos'
  },
  {
    id: '5',
    question: 'Vocês realizam integração com sistemas legados ou ERPs existentes?',
    answer: 'Com certeza. Temos vasta experiência em criar camadas de integração com ERPs tradicionais de mercado (como SAP, TOTVS Protheus/RM, Senior, Sankhya, Bling, Tiny) e gateways bancários, viabilizando a modernização sem que você precise trocar o sistema principal da empresa.',
    category: 'Integrações & APIs'
  },
  {
    id: '6',
    question: 'Como é feito o suporte e a manutenção após o lançamento do sistema?',
    answer: 'Oferecemos planos de suporte contínuo com SLA garantido para correções emergenciais, atualizações de segurança em bibliotecas, monitoramento de infraestrutura cloud 24/7 e evolução contínua de novas funcionalidades via squads dedicados.',
    category: 'Suporte & Sustentação'
  }
];
