"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalculatorNavButtonProps {
    direction: "left" | "right";
    onClick: () => void;
    disabled: boolean;
}

export function CalculatorNavButton({ direction, onClick, disabled }: CalculatorNavButtonProps) {
    const Icon = direction === "left" ? ChevronLeft : ChevronRight;
    const position = direction === "left" ? "-left-16" : "-right-16";

    return (
        <div className={`absolute ${position} top-1/2 -translate-y-1/2 z-20 hidden lg:block`}>
            <button
                onClick={onClick}
                disabled={disabled}
                className="w-12 h-12 rounded-full bg-paper border-2 border-coffee-dark flex items-center justify-center hover:bg-cream transition-colors disabled:opacity-30 disabled:hover:bg-paper cursor-pointer disabled:cursor-default"
                aria-label={direction === "left" ? "Vorheriger Rechner" : "Nächster Rechner"}
            >
                <Icon className="w-6 h-6 text-coffee-dark" />
            </button>
        </div>
    );
}

