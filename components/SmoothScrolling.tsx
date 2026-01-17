"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect, useRef, type ReactNode } from "react";

interface SmoothScrollingProps {
    children: ReactNode;
}

export function SmoothScrolling({ children }: SmoothScrollingProps) {
    const lenisRef = useRef<any>(null);

    // Physics config
    const options = {
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
    };

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (e.defaultPrevented) return;

            const target = e.target as HTMLElement | null;
            if (!target) return;

            const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
            if (!link) return;

            const hash = link.getAttribute('href');
            if (!hash || hash === '#') return;

            const id = hash.slice(1);
            const el = document.getElementById(id);
            if (!el) return;

            e.preventDefault();

            if (lenisRef.current?.lenis) {
                lenisRef.current.lenis.scrollTo(el, { offset: -120, duration: 1.5 });
            } else {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        };

        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    return (
        <ReactLenis root options={options} ref={lenisRef}>
            {children as any}
        </ReactLenis>
    );
}