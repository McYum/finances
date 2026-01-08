"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect, useRef } from "react";
import type Lenis from "lenis";

export function SmoothScrolling({ children }: { children: React.ReactNode }) {

    const lenisRef = useRef<Lenis | null>(null);

    // Physik Einstellungen
    const options = {
        lerp: 0.1,         // Standard für Lenis ist eher 0.1 (weich). 0.75 ist fast sofortig/hart.
        duration: 1.2,     // Dauer etwas erhöhen für Eleganz
        smoothWheel: true,
        wheelMultiplier: 1,
    };

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            // 1. Wenn der Header oder ein Button das Event schon behandelt hat -> Abbruch
            if (e.defaultPrevented) return;

            const target = e.target as HTMLElement | null;
            if (!target) return;

            // Suche nach dem Link
            const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
            if (!link) return;

            const hash = link.getAttribute('href');
            if (!hash || hash === '#') return;

            const id = hash.slice(1);
            const el = document.getElementById(id);
            if (!el) return;

            e.preventDefault();

            // Sicherheits-Check ob Lenis bereit ist
            if (lenisRef.current) {
                lenisRef.current.scrollTo(el, { offset: -120, duration: 1.5 });
            } else {
                // Fallback falls Lenis nicht geladen ist (sollte nicht passieren)
                el.scrollIntoView({ behavior: 'smooth' });
            }
        };

        // Nutzung von 'true' im 3. Parameter (Capture Phase) kann helfen, aber wir nutzen hier Bubbling
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    return (
        <ReactLenis root options={options} ref={lenisRef}>
            {children}
        </ReactLenis>
    );
}