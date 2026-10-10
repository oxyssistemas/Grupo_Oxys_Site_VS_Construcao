import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { DeliverySection } from './components/DeliverySection';
import { Plans } from './components/Plans';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import './restaurante.css';

/**
 * Landing page do Oxys Restaurante (SaaS de PDV e gestão da Oxys Sistemas).
 * Rota: /sistemas/saas/pdv-restaurante (atalho: /restaurante).
 * Links, planos e fotos ficam em ./config.ts.
 */
export default function RestaurantePage() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Oxys Restaurante | PDV e gestão para restaurantes';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="oxys-rest min-h-screen overflow-x-clip">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#1565FF] focus:text-white"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Features />
        <DeliverySection />
        <Plans />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
