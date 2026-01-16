"use client";

import { motion } from "framer-motion";
import { PiggyBank } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

interface CompoundInterestResultsProps {
    result: {
        finalCapital: number;
        totalDeposited: number;
        totalInterest: number;
    };
    formatCurrency: (value: number) => string;
    formatInterest: (value: number) => string;
    getFontSizeClass: (value: number) => string;
}

export function CompoundInterestResults({ result, formatCurrency, formatInterest, getFontSizeClass }: CompoundInterestResultsProps) {
    return (
        <motion.div
            key={`${result.finalCapital}-${result.totalDeposited}-${result.totalInterest}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div className="bg-paper border-2 border-coffee-dark rounded-xl p-6">
                <div className="text-sm font-bold text-coffee-medium mb-2 uppercase tracking-wide">
                    Endkapital
                </div>
                <div className={`${getFontSizeClass(result.finalCapital)} font-porter text-coffee-dark`}>
                    <AnimatedNumber value={result.finalCapital} formatValue={formatCurrency} />
                </div>
            </div>

            <div className="bg-paper border-2 border-coffee-dark rounded-xl p-6">
                <div className="text-sm font-bold text-coffee-medium mb-2 uppercase tracking-wide">
                    Eingezahlt
                </div>
                <div className={`${getFontSizeClass(result.totalDeposited)} font-bold text-coffee-dark`}>
                    <AnimatedNumber value={result.totalDeposited} formatValue={formatCurrency} />
                </div>
            </div>

            <div className="bg-cream border-2 border-coffee-dark rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                    <PiggyBank className="w-5 h-5 text-coffee-dark" />
                    <div className="text-sm font-bold text-coffee-medium uppercase tracking-wide">
                        Gewinn durch Zinsen
                    </div>
                </div>
                <div className={`${getFontSizeClass(result.totalInterest)} font-porter text-green-700`}>
                    <AnimatedNumber value={result.totalInterest} formatValue={formatInterest} />
                </div>
            </div>

            <div className="text-center pt-4 border-t-2 border-coffee-dark/20">
                <p className="text-sm text-coffee-medium">
                    Das sind{" "}
                    <span className="font-bold text-coffee-dark text-lg">
                        {((result.totalInterest / result.totalDeposited) * 100).toFixed(1)}%
                    </span>{" "}
                    mehr als eingezahlt!
                </p>
            </div>
        </motion.div>
    );
}

