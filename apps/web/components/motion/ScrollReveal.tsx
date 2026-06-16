'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { GSAP_EASE_EXPO } from '@/lib/motion/easings';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  y = 40,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null;

    const init = async () => {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger }  = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          ref.current,
          {
            autoAlpha: 0,
            y,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            delay,
            ease: GSAP_EASE_EXPO,
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 84%',
              once: true,
            },
          }
        );
      }, ref);
    };

    init();

    return () => { ctx?.revert(); };
  }, [delay, y]);

  return (
    <div ref={ref} className={className} style={{ visibility: 'hidden', willChange: 'transform, opacity' }}>
      {children}
    </div>
  );
}
