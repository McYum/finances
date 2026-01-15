"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

interface AnimatedNumberProps {
    value: number;
    formatValue: (value: number) => string;
}

export function AnimatedNumber({ value, formatValue }: AnimatedNumberProps) {
    const prevValueRef = useRef<number | null>(null);
    const isMountedRef = useRef(false);

    const getStartValue = () => {
        if (!isMountedRef.current || prevValueRef.current === null) {
            return value * 0.7;
        }
        return prevValueRef.current;
    };

    const [displayValue, setDisplayValue] = useState(getStartValue());

    useEffect(() => {
        const from = getStartValue();

        const timer = setTimeout(() => {
            const controls = animate(from, value, {
                duration: 0.8,
                ease: "easeOut",
                onUpdate(latest) {
                    setDisplayValue(latest);
                },
            });

            prevValueRef.current = value;
            isMountedRef.current = true;

            return () => controls.stop();
        }, 10);

        return () => clearTimeout(timer);
    }, [value]);

    return <span>{formatValue(Math.round(displayValue))}</span>;
}

