"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect, useRef } from "react";
import type Lenis from "lenis";

export function SmoothScrolling({ children }: { children: React.ReactNode }) {

    const lenisRef = useRef<Lenis | null>(null);

    // Physics config
    const options = {
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
    };

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            // 1. Did header or button alr handle it? Cancel
            if (e.defaultPrevented) return;

            const target = e.target as HTMLElement | null;
            if (!target) return;

            // Search for link
            const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
            if (!link) return;

            const hash = link.getAttribute('href');
            if (!hash || hash === '#') return;

            const id = hash.slice(1);
            const el = document.getElementById(id);
            if (!el) return;

            e.preventDefault();

            // Safety Check lenis ready?
            if (lenisRef.current) {
                lenisRef.current.scrollTo(el, { offset: -120, duration: 1.5 });
            } else {
                // Lenis not ready do a fallback
                el.scrollIntoView({ behavior: 'smooth' });
            }
        };

        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    return (
        <ReactLenis root options={options} ref={lenisRef as any}>
            {children as any}
        </ReactLenis>
    );
}