'use client';
import Image from 'next/image';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Particles from './Particles';

const features = [
  { ic: '☀', t: 'UVA/UVB Protection', p: 'Broad-spectrum SPF50+ PA++++ shields skin from the rays that cause burning and dullness.' },
  { ic: '✨', t: 'Brightening Skin', p: 'Brightening care works while you protect, so skin looks even and luminous through the day.' },
  { ic: '💧', t: 'Moisturizing', p: 'A light, comfortable texture that keeps skin hydrated, for all skin types.' },
];
const ingredients = [
  { t: 'Brightening complex', p: 'Evens the look of tone while shielding skin from daily UV exposure.' },
  { t: 'Hydrating base', p: 'Water-binding care leaves a soft, dewy finish with no heavy film.' },
  { t: 'Blue light defense', p: 'Extra defense for screens and city days, gentle enough for every skin type.' },
];
const reviews = [
  { q: 'Weightless, no white cast, and my skin looks brighter by the end of the week.', n: 'Mali P.' },
  { q: 'The first sunscreen I actually enjoy wearing under makeup every single day.', n: 'Nina K.' },
  { q: 'Hydrating and elegant. It feels like skincare, not a chore before going out.', n: 'Arthit S.' },
];

export default function Home() {
  useEffect(() => {
    const loader = document.getElementById('loader');
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) { if (loader) loader.style.display = 'none'; return; }
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.09 });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.set('.hl', { yPercent: 110 }); gsap.set(['.sub', '.cta', '.float'], { opacity: 0, y: 40 });
      const arc = document.getElementById('arc') as unknown as SVGPathElement; const len = arc.getTotalLength();
      gsap.set(arc, { strokeDasharray: len, strokeDashoffset: len }); gsap.set('.lr', { opacity: 0 });
      gsap.timeline()
        .to(arc, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' })
        .to('.lr', { opacity: 1, duration: 0.5 }, '-=.3').to('#loader i', { scaleX: 1, duration: 0.6 }, '<')
        .to(loader, { yPercent: -100, duration: 1, ease: 'expo.inOut', delay: 0.2 })
        .to('.hl', { yPercent: 0, duration: 1.2, stagger: 0.12, ease: 'expo.out' }, '-=.5')
        .to('.float', { opacity: 1, y: 0, duration: 1.4, ease: 'expo.out' }, '<.1')
        .to(['.sub', '.cta'], { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out' }, '<.3')
        .add(() => { gsap.set(loader, { display: 'none' }); gsap.to('.float', { y: -14, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut' }); });

      gsap.utils.toArray<HTMLElement>('[data-r]').forEach((el) =>
        gsap.from(el, { y: 50, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }));
      const hero = { trigger: '#hero', scrub: true, start: 'top top', end: 'bottom top' };
      gsap.to('.rays', { y: 160, scrollTrigger: hero });
      gsap.to('#hero h1', { yPercent: -18, scrollTrigger: hero });
      gsap.utils.toArray<HTMLElement>('.blob').forEach((b, i) => gsap.to(b, { y: i ? -120 : 120, scrollTrigger: { trigger: '#show', scrub: true } }));
      gsap.fromTo('#disc', { rotationY: -24 }, { rotationY: 24, duration: 5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      gsap.to('.spin-s', { rotation: 360, duration: 60, repeat: -1, ease: 'none' });

      const heroEl = document.getElementById('hero')!; const fr = document.getElementById('frame')!;
      const move = (e: MouseEvent) => {
        const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
        gsap.to(fr, { rotationY: x * 14, rotationX: -y * 10, transformPerspective: 900, duration: 0.8, ease: 'power3.out' });
        gsap.to('.rays', { x: x * 40, duration: 1.2 });
      };
      const leave = () => gsap.to(fr, { rotationY: 0, rotationX: 0, duration: 1 });
      heroEl.addEventListener('mousemove', move); heroEl.addEventListener('mouseleave', leave);
    });
    return () => { ctx.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);

  const img = (alt: string, extra = {}) => <Image src="/product.jpg" alt={alt} width={1019} height={1100} {...extra} />;

  return (
    <>
      <div id="loader" aria-hidden="true">
        <div>
          <svg viewBox="0 0 120 70" fill="none" stroke="#D9A441" strokeWidth="3" strokeLinecap="round">
            <path id="arc" d="M20 62a40 40 0 0 1 80 0" /><path className="lr" d="M60 6v10M24 22l7 7M96 22l-7 7M6 48h10M104 48h10" />
          </svg>
          <p>Sunny Glow</p><i />
        </div>
      </div>
      <Particles />
      <motion.nav initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 2.8, duration: 0.8 }}>
        <b>Sunny Glow</b><a href="#cta" className="pill glass">Shop</a>
      </motion.nav>

      <main>
        <section id="hero">
          <div className="rays" aria-hidden="true" />
          <div className="glow" style={{ width: '46vmax', height: '46vmax', left: '-14vmax', top: '-12vmax' }} aria-hidden="true" />
          <div className="glow" style={{ width: '34vmax', height: '34vmax', right: '-12vmax', bottom: '-10vmax', animationDirection: 'reverse' }} aria-hidden="true" />
          <h1>
            <span><i className="hl" style={{ fontStyle: 'normal', display: 'block' }}>Glow Confidently</i></span>
            <span><em className="hl">Every Day</em></span>
          </h1>
          <div className="float">
            <div className="frame glass" id="frame">{img('Sunny Glow SPF50+ PA++++ sunscreen tube and box on a stone podium with a white flower', { priority: true, sizes: '(max-width:640px) 78vw, 430px' })}</div>
            <span className="chip glass" style={{ left: '-14%', top: '22%' }}>UVA/UVB</span>
            <span className="chip glass" style={{ right: '-12%', top: '48%' }}>SPF50+ PA++++</span>
          </div>
          <p className="sub">Advanced UV Protection with Brightening Care</p>
          <div className="cta"><a className="btn gold" href="#cta">Shop Now</a><a className="btn line" href="#why">Learn More</a></div>
          <span className="scroll" aria-hidden="true" />
        </section>

        <section id="why">
          <div className="wrap">
            <h2 className="head" data-r>Why Sunny Glow</h2>
            <div className="cards">
              {features.map((f) => (
                <div key={f.t} data-r>
                  <motion.article className="card glass" whileHover={{ y: -12, scale: 1.03 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
                    <div className="ic">{f.ic}</div><h3>{f.t}</h3><p>{f.p}</p>
                  </motion.article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="ing">
          <div className="wrap split">
            <div className="ill" data-r>
              <svg viewBox="0 0 400 400" fill="none" stroke="#D9A441" strokeWidth="1.6" strokeLinecap="round" aria-label="Illustration of a sun, water drop and leaf">
                <circle cx="200" cy="200" r="150" opacity=".35" /><circle cx="200" cy="200" r="110" opacity=".55" />
                <g className="spin-s" style={{ transformOrigin: '200px 200px' }}><path d="M200 30v30M200 340v30M30 200h30M340 200h30M80 80l22 22M298 298l22 22M320 80l-22 22M102 298l-22 22" /></g>
                <path d="M200 140c34 46 48 70 48 92a48 48 0 0 1-96 0c0-22 14-46 48-92z" fill="rgba(217,164,65,.18)" />
                <path d="M200 300c-30-6-70-30-74-80 40 0 72 26 74 80zM200 300c30-6 70-30 74-80-40 0-72 26-74 80z" stroke="#8a9a6a" opacity=".8" />
              </svg>
            </div>
            <div className="ing">{ingredients.map((i) => <div key={i.t} data-r><h3>{i.t}</h3><p>{i.p}</p></div>)}</div>
          </div>
        </section>

        <section id="show">
          <div className="blob" style={{ width: 420, height: 420, background: '#D9A441', left: -120, top: '10%' }} aria-hidden="true" />
          <div className="blob" style={{ width: 360, height: 360, background: '#FFE3B0', right: -100, bottom: '5%' }} aria-hidden="true" />
          <div className="wrap">
            <h2 data-r>SPF50+ <em>PA++++</em></h2>
            <div className="stage">
              <svg className="ring" viewBox="0 0 200 200" aria-hidden="true">
                <defs><path id="c" d="M100 100m-92 0a92 92 0 1 1 184 0a92 92 0 1 1-184 0" /></defs>
                <text><textPath href="#c" style={{ fontSize: 9 }}>SUNNY GLOW · PROTECT · BRIGHT · CARE · SUNNY GLOW · PROTECT · BRIGHT · CARE ·</textPath></text>
              </svg>
              <div className="disc glass" id="disc">{img('Sunny Glow sunscreen close-up', { loading: 'lazy', sizes: '(max-width:640px) 84vw, 560px' })}</div>
            </div>
          </div>
        </section>

        <section id="rev">
          <div className="wrap">
            <h2 className="head" data-r>Loved in the sun</h2>
            <div className="rev">
              {reviews.map((r) => (
                <blockquote key={r.n} className="glass" data-r>
                  <div className="stars" aria-label="5 stars">★★★★★</div><p>{r.q}</p><cite>{r.n}</cite>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section id="cta">
          <div className="wrap"><h2 data-r>Protect Your Skin Beautifully</h2><a className="btn gold" href="#" data-r>Buy Now</a></div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <b className="font-serif text-2xl font-normal">Sunny Glow</b>
          <ul><li><a href="#">Instagram</a></li><li><a href="#">Facebook</a></li><li><a href="#">TikTok</a></li><li><a href="mailto:hello@sunnyglow.example">Email</a></li></ul>
        </div>
      </footer>
    </>
  );
}
