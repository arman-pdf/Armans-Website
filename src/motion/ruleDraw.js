// Draws each section's label rule once, the first time it scrolls into view.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function initRuleDraw() {
  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    document.querySelectorAll('[data-rule-draw]').forEach((rule) => {
      if (rule.getBoundingClientRect().top < window.innerHeight) return; // already in view
      gsap.fromTo(
        rule,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: rule, start: 'top 85%', once: true } }
      );
    });
  });
  return () => mm.revert();
}
