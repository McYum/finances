"use client";

import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

interface CoffeeSliderProps {
    value: number;
    onChange: (value: number) => void;
}

export function CoffeeSlider({ value, onChange }: CoffeeSliderProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const thumbSpring = useSpring({
        scale: isDragging ? 1.2 : isHovered ? 1.15 : 1,
        y: isDragging ? -2 : isHovered ? -2 : 0,
        config: { mass: 1, tension: 300, friction: 20 },
    });

    const progress = ((value - 1) / 19) * 100;

    return (
        <div className="relative w-full h-8">
            {/* Track background */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-coffee-dark/20 rounded-full"></div>

            {/* Progress bar */}
            <animated.div
                className="absolute top-1/2 -translate-y-1/2 h-2 bg-coffee-dark rounded-full"
                style={{ width: `${progress}%` }}
            />

            {/* Thumb with value display */}
            <animated.div
                style={{
                    ...thumbSpring,
                    left: `calc(${progress}% - 20px)`,
                }}
                className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-coffee-dark rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg border-2 border-paper"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <span className="text-paper font-bold text-lg">{value}</span>
            </animated.div>

            {/* Hidden input for actual interaction */}
            <input
                type="range"
                min="1"
                max="20"
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onTouchStart={() => setIsDragging(true)}
                onTouchEnd={() => setIsDragging(false)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
        </div>
    );
}

