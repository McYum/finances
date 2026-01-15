"use client";

import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

interface YearButtonProps {
    year: number;
    isSelected: boolean;
    onClick: () => void;
}

export function YearButton({ year, isSelected, onClick }: YearButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const springStyles = useSpring({
        scale: isPressed ? 0.95 : isHovered ? 1.05 : 1,
        y: isPressed ? 4 : isHovered ? -3 : 0,
        config: { mass: 1, tension: 280, friction: 18 },
    });

    return (
        <animated.button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            style={springStyles}
            className={`px-6 py-3 border-2 border-coffee-dark rounded-xl font-bold transition-colors duration-200 ${
                isSelected
                    ? 'bg-gold text-coffee-dark shadow-[3px_3px_0px_0px_rgba(45,27,14,0.5)]'
                    : 'bg-cream text-coffee-dark shadow-[3px_3px_0px_0px_rgba(45,27,14,0.3)]'
            }`}
        >
            {year} Jahre
        </animated.button>
    );
}

