/**
 * ============================================================================
 * CONFIGURAÇÃO DA LANDING PAGE — OXYS RESTAURANTE
 * ============================================================================
 * Tudo que é dado real (links, planos, fotos) fica aqui, num só lugar.
 * Itens marcados com "PREENCHER" ainda precisam de informação real.
 */
import { BRAND_CONFIG } from '../../config/brandAssets';

/** Endereço do sistema em produção (o mesmo usado pelo app em src/lib/native.ts do Oxys Restaurante). */
export const APP_URL = 'https://www.oxysrestaurante.app';

const whatsapp = (message: string) =>
  `https://wa.me/${BRAND_CONFIG.CONTACT.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const LINKS = {
  /** Tela de login do sistema. */
  login: `${APP_URL}/login`,
  /** Política de privacidade publicada pelo sistema. */
  privacy: `${APP_URL}/privacidade`,
  /** Cadastro para o teste grátis de 14 dias (CTA principal da página). */
  signup: `${APP_URL}/cadastro`,
  deliveryInfo: whatsapp('Olá! Quero conhecer o delivery próprio do Oxys Restaurante.'),
  plan: (planName: string) => whatsapp(`Olá! Quero conhecer o plano ${planName} do Oxys Restaurante.`),
  /** Contato geral (seção de contato da página da Oxys Sistemas). */
  contact: '/sistemas#contato',
};

/**
 * Planos — nomes e recursos conforme o próprio sistema
 * (tabela `plans`, migração 20260830035111 do Oxys Restaurante).
 * Preços: PREENCHER quando definidos. Enquanto `price` for null, o card mostra "Consulte condições".
 */
export interface Plan {
  id: string;
  name: string;
  description: string;
  price: string | null;
  highlights: string[];
  featured?: boolean;
  badge?: string;
  icon: 'start' | 'pro' | 'premium';
}

export const PLANS: Plan[] = [
  {
    id: 'essencial',
    name: 'Essencial',
    description: 'O essencial para começar a organizar a operação.',
    price: null,
    icon: 'start',
    highlights: ['Pedidos e comandas', 'Mapa de mesas', 'Cardápio', 'Portal da cozinha', 'Caixa', 'Estoque'],
  },
  {
    id: 'profissional',
    name: 'Profissional',
    description: 'Gestão completa com financeiro e delivery.',
    price: null,
    icon: 'pro',
    featured: true,
    badge: 'Para crescer',
    highlights: ['Tudo do Essencial', 'Delivery e entregadores', 'Relatórios financeiros e DRE', 'Emissão fiscal', 'Fidelidade e CRM'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Todos os recursos para operações em expansão.',
    price: null,
    icon: 'premium',
    highlights: ['Tudo do Profissional', 'Filiais (várias lojas)', 'Marca própria (white label)', 'Assistente de IA', 'Portal de marketing'],
  },
];

/**
 * Fotos (opcionais). Coloque os arquivos em /public/restaurante/ e informe o caminho.
 * Formato recomendado: .webp, até ~200 KB cada.
 * Enquanto vazias, a página usa ilustrações leves em CSS no lugar das fotos.
 */
export const IMAGES = {
  /** Prato decorativo no canto superior esquerdo do topo (ex.: /restaurante/prato-hero.webp) — PREENCHER */
  heroDishLeft: '',
  /** Elemento decorativo no canto superior direito do topo (ex.: tábua, temperos) — PREENCHER */
  heroDishRight: '',
  /** Lanche em destaque no cardápio do celular (topo da página) */
  menuBurger: '/restaurante/burger-artesanal.webp',
  /** Salada no cardápio do celular (topo da página) */
  menuSalad: '/restaurante/salada-caesar.webp',
  /** Banner do cardápio no celular da seção de delivery */
  menuMain: '/restaurante/banner-grelhado.webp',
  /** Prato da lista no celular da seção de delivery */
  menuParmegiana: '/restaurante/file-parmegiana.webp',
  /** Foto de fundo do banner final (salão de restaurante) — PREENCHER */
  ctaBackground: '',
};
