"use client";

import { memo, useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

export const NumberTicker = memo(function NumberTicker({
                                                           value,
                                                           className,
                                                           prefix = ""
                                                       }: {
    value: number;
    className?: string;
    prefix?: string;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            setDisplayValue(value);
        }
    }, [isInView, value]);

    const formatValue = (val: number) => `${prefix}${Math.round(val).toLocaleString('de-DE')}`;

    return (
        <span ref={ref} className={className}>
            <AnimatedNumber value={displayValue} formatValue={formatValue} />
        </span>
    );
}, (prev, next) => {
    return Math.abs(prev.value - next.value) < 1 && prev.className === next.className && prev.prefix === next.prefix;
});

// Memorize the static positions to avoid recreation
const STATIC_POSITIONS = Array.from({ length: 50 }).map(() => ({
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10,
    rotate: Math.random() * 360,
    delay: Math.random() * 0.3,
}));

type CoinScatterProps = {
    count: number;
    className?: string;
    coinSize?: string;
};

export const CoinScatter = memo(function CoinScatter({
                                                         count,
                                                         className,
                                                         coinSize = "w-6 h-6 md:w-8 md:h-8",
                                                     }: CoinScatterProps) {
    const safeCount = Math.min(count, 30);

    const visibleCoins = useMemo(
        () => STATIC_POSITIONS.slice(0, safeCount),
        [safeCount]
    );

    return (
        <div
            className={cn(
                "absolute inset-0 pointer-events-none z-20 overflow-visible",
                className
            )}
        >
            {visibleCoins.map((pos, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                        delay: pos.delay,
                    }}
                    className={cn("absolute will-change-transform", coinSize)}
                    style={{
                        left: `${pos.x}%`,
                        top: `${pos.y}%`,
                        rotate: `${pos.rotate}deg`,
                    }}
                >
                    <Image
                        src="/images/story/coin.png"
                        alt="Coin"
                        fill
                        className="object-contain drop-shadow-sm"
                        sizes="48px"
                    />
                </motion.div>
            ))}
        </div>
    );
});