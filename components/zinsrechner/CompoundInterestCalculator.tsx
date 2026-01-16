"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RetroButton } from "@/components/ui/RetroButton";
import { TrendingUp, Calculator } from "lucide-react";
import { calculateCompoundInterest } from "@/lib/calculations";
import { formatCurrency, formatCurrencyWithPlus, getFontSizeClass } from "@/lib/formatters";
import { CompoundInterestInput } from "./CompoundInterestInput";
import { CompoundInterestResults } from "./CompoundInterestResults";

interface Result {
    finalCapital: number;
    totalDeposited: number;
    totalInterest: number;
}

export function CompoundInterestCalculator() {
    const [initialCapital, setInitialCapital] = useState<string>("10000");
    const [monthlyDeposit, setMonthlyDeposit] = useState<string>("200");
    const [interestRate, setInterestRate] = useState<string>("5");
    const [duration, setDuration] = useState<string>("10");
    const [result, setResult] = useState<Result | null>(null);

    const calculateResult = () => {
        const capital = parseFloat(initialCapital) || 0;
        const deposit = parseFloat(monthlyDeposit) || 0;
        const rate = parseFloat(interestRate) || 0;
        const years = parseFloat(duration) || 0;

        const calculatedResult = calculateCompoundInterest(capital, deposit, rate, years);
        setResult(calculatedResult);
    };

    return (
        <section className="px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-cream border-2 border-coffee-dark rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(45,27,14,0.3)]"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Calculator className="w-8 h-8 text-coffee-dark" />
                            <h2 className="text-2xl font-porter text-coffee-dark">Deine Eingaben</h2>
                        </div>

                        <div className="space-y-6">
                            <CompoundInterestInput
                                label="Startkapital (€)"
                                value={initialCapital}
                                onChange={setInitialCapital}
                                step="100"
                                placeholder="10000"
                            />

                            <CompoundInterestInput
                                label="Monatliche Sparrate (€)"
                                value={monthlyDeposit}
                                onChange={setMonthlyDeposit}
                                step="10"
                                placeholder="200"
                            />

                            <CompoundInterestInput
                                label="Jährlicher Zinssatz (%)"
                                value={interestRate}
                                onChange={setInterestRate}
                                step="0.1"
                                placeholder="5"
                            />

                            <CompoundInterestInput
                                label="Laufzeit (Jahre)"
                                value={duration}
                                onChange={setDuration}
                                placeholder="10"
                            />

                            <RetroButton onClick={calculateResult} className="w-full">
                                Jetzt berechnen
                            </RetroButton>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-gradient-to-br from-gold to-amber-200 border-2 border-coffee-dark rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(45,27,14,0.3)]"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <TrendingUp className="w-8 h-8 text-coffee-dark" />
                            <h2 className="text-2xl font-porter text-coffee-dark">Dein Ergebnis</h2>
                        </div>

                        {result ? (
                            <CompoundInterestResults
                                result={result}
                                formatCurrency={formatCurrency}
                                formatInterest={formatCurrencyWithPlus}
                                getFontSizeClass={getFontSizeClass}
                            />
                        ) : (
                            <div className="h-full flex items-center justify-center">
                                <div className="text-center text-coffee-medium">
                                    <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                    <p className="text-lg">
                                        Gib deine Werte ein und klicke auf "Jetzt berechnen"
                                    </p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

