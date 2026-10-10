import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import HomePage from './pages/HomePage';

// Páginas carregadas sob demanda: quem abre a home não baixa o código da Oxys Sistemas
const SistemasPage = lazy(() => import('./pages/sistemas/SistemasPage'));
const SaasPage = lazy(() => import('./pages/sistemas/SaasPage'));
const RestaurantePage = lazy(() => import('./pages/restaurante/RestaurantePage'));

export type { IgnitionStage } from './pages/HomePage';

function ScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollToTopOnNavigate />
        <Suspense fallback={<div className="min-h-screen bg-[#050608]" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sistemas" element={<SistemasPage />} />
            <Route path="/sistemas/saas/pdv-restaurante" element={<RestaurantePage />} />
            <Route path="/restaurante" element={<RestaurantePage />} />
            <Route path="/sistemas/saas/:slug" element={<SaasPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MotionConfig>
  );
}
