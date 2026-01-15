"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RetroButton } from "@/components/ui/RetroButton";
import { TrendingUp, PiggyBank, Calculator } from "lucide-react";
import { calculateCompoundInterest } from "@/lib/calculations";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

export function CompoundInterestCalculator() {
    const [initialCapital, setInitialCapital] = useState<string>("10000");
    const [monthlyDeposit, setMonthlyDeposit] = useState<string>("200");
    const [interestRate, setInterestRate] = useState<string>("5");
    const [duration, setDuration] = useState<string>("10");
    const [result, setResult] = useState<{
        finalCapital: number;
        totalDeposited: number;
        totalInterest: number;
    } | null>(null);

    const calculateResult = () => {
        const capital = parseFloat(initialCapital) || 0;
        const deposit = parseFloat(monthlyDeposit) || 0;
        const rate = parseFloat(interestRate) || 0;
        const years = parseFloat(duration) || 0;

        const calculatedResult = calculateCompoundInterest(capital, deposit, rate, years);
        setResult(calculatedResult);
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
        }).format(value);
    };

    return (
        <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Input section */}
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
                            <div>
                                <label className="block text-sm font-bold text-coffee-dark mb-2 uppercase tracking-wide">
                                    Startkapital (€)
                                </label>
                                <input
                                    type="number"
                                    value={initialCapital}
                                    onChange={(e) => setInitialCapital(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-coffee-dark rounded-xl bg-paper text-coffee-dark font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                                    placeholder="10000"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-coffee-dark mb-2 uppercase tracking-wide">
                                    Monatliche Sparrate (€)
                                </label>
                                <input
                                    type="number"
                                    value={monthlyDeposit}
                                    onChange={(e) => setMonthlyDeposit(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-coffee-dark rounded-xl bg-paper text-coffee-dark font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                                    placeholder="200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-coffee-dark mb-2 uppercase tracking-wide">
                                    Jährlicher Zinssatz (%)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-coffee-dark rounded-xl bg-paper text-coffee-dark font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                                    placeholder="5"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-coffee-dark mb-2 uppercase tracking-wide">
                                    Laufzeit (Jahre)
                                </label>
                                <input
                                    type="number"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-coffee-dark rounded-xl bg-paper text-coffee-dark font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                                    placeholder="10"
                                />
                            </div>

                            <RetroButton onClick={calculateResult} className="w-full">
                                Jetzt berechnen
                            </RetroButton>
                        </div>
                    </motion.div>

                    {/* Results section */}
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
                            <motion.div
                                key={`${result.finalCapital}-${result.totalDeposited}-${result.totalInterest}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                {/* Final capital */}
                                <div className="bg-paper border-2 border-coffee-dark rounded-xl p-6">
                                    <div className="text-sm font-bold text-coffee-medium mb-2 uppercase tracking-wide">
                                        Endkapital
                                    </div>
                                    <div className="text-4xl font-porter text-coffee-dark">
                                        <AnimatedNumber value={result.finalCapital} formatValue={formatCurrency} />
                                    </div>
                                </div>

                                {/* Total deposited */}
                                <div className="bg-paper border-2 border-coffee-dark rounded-xl p-6">
                                    <div className="text-sm font-bold text-coffee-medium mb-2 uppercase tracking-wide">
                                        Eingezahlt
                                    </div>
                                    <div className="text-2xl font-bold text-coffee-dark">
                                        <AnimatedNumber value={result.totalDeposited} formatValue={formatCurrency} />
                                    </div>
                                </div>

                                {/* Interest earned */}
                                <div className="bg-cream border-2 border-coffee-dark rounded-xl p-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <PiggyBank className="w-5 h-5 text-coffee-dark" />
                                        <div className="text-sm font-bold text-coffee-medium uppercase tracking-wide">
                                            Gewinn durch Zinsen
                                        </div>
                                    </div>
                                    <div className="text-3xl font-porter text-green-700">
                                        +<AnimatedNumber value={result.totalInterest} formatValue={formatCurrency} />
                                    </div>
                                </div>

                                {/* Percentage gain */}
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

