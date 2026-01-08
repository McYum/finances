"use client"; // Wichtig für Animationen

import { cn } from "@/lib/utils";
import { animated, useSpring, config } from "@react-spring/web";
import { useState, ButtonHTMLAttributes } from "react";

interface RetroButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function RetroButton({ className, children, style, ...props }: RetroButtonProps & { style?: any }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    // Die Physik-Animation definieren
    const { scale, rotation, y } = useSpring({
        scale: isPressed ? 0.95 : isHovered ? 1.05 : 1, // Drücken: klein, Hover: groß, Sonst: normal
        rotation: isHovered ? -1 : 0, // Beim Hovern ganz leicht kippen
        y: isPressed ? 2 : 0, // Beim Drücken physisch nach unten bewegen

        // Wobbly Config: Fühlt sich an wie Wackelpudding/Gummi
        config: { tension: 300, friction: 10 },
    });

    return (
        <animated.button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}

            // Hier verbinden wir die Spring-Werte mit dem Style
            style={{
                transform: scale.to(s => `scale(${s})`),
                rotate: rotation.to(r => `${r}deg`),
                y: y.to(v => `${v}px`),
                ...style
            }}

            className={cn(
                "relative font-black uppercase tracking-wide text-[#3E2723]",
                "text-lg md:text-xl px-10 py-4 rounded-full select-none", // select-none verhindert Textmarkieren beim schnellen Klicken
                "border-[3px] border-[#3E2723]",

                // Hintergrund Gradient
                "bg-gradient-to-b from-[#FFF2C2] to-[#FFC850]",

                // Schatten (Inset + Drop Shadow) - WICHTIG: Keine CSS Transitions hier, das macht Spring!
                "shadow-[inset_0px_-6px_0px_0px_#DFA339,0px_5px_15px_rgba(0,0,0,0.15)]",

                // Wenn man klickt, ändern wir den Schatten manuell (Spring macht Scale/Y, CSS macht Schatten)
                isPressed ? "shadow-[inset_0px_-2px_0px_0px_#DFA339]" : "",

                className
            )}
            {...props}
        >
            {children}
        </animated.button>
    );
}