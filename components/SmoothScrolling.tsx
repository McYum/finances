"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect, useRef } from "react";
import type Lenis from "lenis";

export function SmoothScrolling({ children }: { children: React.ReactNode }) {

    // Hier die Physik einstellen
    const options = {
        lerp: 0.75,         // Je niedriger (z.B. 0.05), desto mehr "Drag" hat das Scrollen
        duration: 0.5,      // Dauer der Scroll-Bewegung
        smoothWheel: true,
    };

    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
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
            lenisRef.current?.scrollTo(el, { offset: -120, duration: 0.8 });
        };

        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    return (
        <ReactLenis root options={options as any} ref={lenisRef as any}>
        {children as any}
        </ReactLenis>
);
}