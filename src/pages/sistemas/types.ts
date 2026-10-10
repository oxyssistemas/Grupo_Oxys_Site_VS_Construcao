export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc?: string;
  image?: string;
  iconName?: string;
  badge?: string;
  deliverables?: string[];
  technologies?: string[];
  metrics?: string;
}

export interface TechnologyItem {
  name: string;
  category: 'frontend' | 'backend' | 'mobile' | 'cloud' | 'database' | 'devops';
  icon: string;
  description: string;
  level: string;
  popularFor: string;
}

export interface SaasProduct {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  slug: string;
  image: string;
  badge: string;
  highlights: string[];
  metrics?: { label: string; value: string };
  iconName: string;
  colorTheme: {
    primaryHex: string;
    textClass: string;
    borderClass: string;
    bgBadgeClass: string;
    gradientClass: string;
    glowShadow: string;
    iconBgClass: string;
    lightBgClass: string;
  };
}

export interface CaseStudy {
  id: string;
  title: string;
  clientCategory: string;
  tagline: string;
  summary: string;
  challenge: string;
  solution: string;
  results: {
    label: string;
    value: string;
    detail: string;
  }[];
  techStack: string[];
  platforms: string[];
  featuredImagePlaceholder: string;
}

export interface ApiEndpointDemo {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  title: string;
  description: string;
  requestHeaders: Record<string, string>;
  requestBody?: Record<string, any>;
  responseStatus: number;
  responseBody: Record<string, any>;
  latencyMs: number;
}

export interface EstimatorState {
  projectType: 'mobile_app' | 'web_saas' | 'custom_erp' | 'api_microservices';
  platformTarget: string[];
  complexity: 'mvp' | 'growth' | 'enterprise';
  features: string[];
  timelineSpeed: 'standard' | 'fast_track';
  cloudProvider: 'aws' | 'gcp' | 'azure' | 'hybrid';
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  projectNotes: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  projectDelivered: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
