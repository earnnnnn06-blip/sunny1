'use client';
import { useEffect, useRef } from 'react';

export default function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!; const x = c.getContext('2d')!;
    const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
    let W = 0, H = 0, id = 0; let P: { x: number; y: number; r: number; v: number; a: number }[] = [];
    const size = () => {
      W = c.width = innerWidth; H = c.height = innerHeight;
      P = Array.from({ length: Math.min(46, (W / 24) | 0) }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 2.2 + 0.6, v: Math.random() * 0.3 + 0.08, a: Math.random() * 6 }));
    };
    const draw = () => {
      x.clearRect(0, 0, W, H);
      P.forEach((p) => {
        p.y -= p.v; p.a += 0.02; if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
        x.beginPath(); x.arc(p.x + Math.sin(p.a) * 12, p.y, p.r, 0, 7);
        x.fillStyle = `rgba(217,164,65,${0.25 + Math.sin(p.a) * 0.2})`; x.shadowBlur = 10; x.shadowColor = '#D9A441'; x.fill();
      });
      if (!reduce) id = requestAnimationFrame(draw);
    };
    size(); draw(); addEventListener('resize', size);
    return () => { cancelAnimationFrame(id); removeEventListener('resize', size); };
  }, []);
  return <canvas id="dust" ref={ref} aria-hidden="true" />;
}
