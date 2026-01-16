"use client";

type CalculatorType = "etf" | "compound";

interface CalculatorTabsProps {
    activeCalculator: CalculatorType;
    onTabClick: (calculator: CalculatorType) => void;
}

export function CalculatorTabs({ activeCalculator, onTabClick }: CalculatorTabsProps) {
    return (
        <div className="flex justify-center gap-3 py-8">
            <button
                onClick={() => onTabClick("etf")}
                className={`transition-all cursor-pointer ${
                    activeCalculator === "etf"
                        ? "w-8 h-3 bg-coffee-dark"
                        : "w-3 h-3 bg-coffee-medium/30 hover:bg-coffee-medium/50"
                } rounded-full`}
                aria-label="ETF-Rechner"
            />
            <button
                onClick={() => onTabClick("compound")}
                className={`transition-all cursor-pointer ${
                    activeCalculator === "compound"
                        ? "w-8 h-3 bg-coffee-dark"
                        : "w-3 h-3 bg-coffee-medium/30 hover:bg-coffee-medium/50"
                } rounded-full`}
                aria-label="Zinseszins-Rechner"
            />
        </div>
    );
}

