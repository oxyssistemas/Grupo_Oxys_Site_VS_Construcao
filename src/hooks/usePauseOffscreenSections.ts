import { useEffect } from 'react';

/**
 * Pausa as animações SVG (SMIL) e CSS das seções que estão fora da tela.
 * Sem isso, o navegador continua redesenhando circuitos e pulsos que ninguém está vendo.
 */
export function usePauseOffscreenSections() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section'));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const section = entry.target as HTMLElement;
          const visible = entry.isIntersecting;
          section.toggleAttribute('data-offscreen', !visible);
          section.querySelectorAll('svg').forEach((svg) => {
            if (visible) svg.unpauseAnimations();
            else svg.pauseAnimations();
          });
        }
      },
      { rootMargin: '200px 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
}
