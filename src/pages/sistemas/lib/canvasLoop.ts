/**
 * Utilitários para as animações em canvas da página Oxys Sistemas.
 * O canvas só anima enquanto está visível na tela e a aba está ativa,
 * com FPS limitado — fundos decorativos não precisam de 60fps.
 */

export function runCanvasLoop(
  canvas: HTMLCanvasElement,
  frame: (dt: number) => void,
  fps = 30
): () => void {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const interval = 1000 / fps;
  let rafId = 0;
  let running = false;
  let visible = false;
  let last = 0;

  const tick = (now: number) => {
    if (!running) return;
    rafId = requestAnimationFrame(tick);
    const elapsed = now - last;
    if (elapsed < interval) return;
    last = now - (elapsed % interval);
    frame(Math.min(elapsed / (1000 / 60), 4));
  };

  const start = () => {
    if (running || !visible || document.hidden) return;
    if (reducedMotion) {
      frame(0);
      return;
    }
    running = true;
    last = performance.now();
    rafId = requestAnimationFrame(tick);
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(rafId);
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    },
    { rootMargin: '100px 0px' }
  );
  observer.observe(canvas);

  const onVisibility = () => (document.hidden ? stop() : start());
  document.addEventListener('visibilitychange', onVisibility);

  return () => {
    stop();
    observer.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
  };
}

const spriteCache = new Map<string, HTMLCanvasElement>();

/** Ponto luminoso com halo pré-renderizado: substitui o shadowBlur (muito caro no canvas). */
export function getGlowSprite(color: string, glow: number): HTMLCanvasElement {
  const key = `${color}|${glow}`;
  const cached = spriteCache.get(key);
  if (cached) return cached;

  const size = 64;
  const sprite = document.createElement('canvas');
  sprite.width = sprite.height = size;
  const ctx = sprite.getContext('2d')!;
  const c = size / 2;
  const grad = ctx.createRadialGradient(c, c, 0, c, c, c);
  // núcleo sólido + halo proporcional ao "glow" pedido
  const core = Math.max(0.12, 0.5 - glow * 0.04);
  grad.addColorStop(0, color);
  grad.addColorStop(core, color);
  grad.addColorStop(Math.min(0.95, core + 0.12), hexToRgba(color, 0.35));
  grad.addColorStop(1, hexToRgba(color, 0));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  spriteCache.set(key, sprite);
  return sprite;
}

function hexToRgba(hex: string, alpha: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}
