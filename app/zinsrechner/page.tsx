"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { RetroButton } from "@/components/ui/RetroButton";
import { TrendingUp, PiggyBank, Calculator } from "lucide-react";

export default function ZinsrechnerPage() {
    const [startkapital, setStartkapital] = useState<string>("10000");
    const [monatlicheRate, setMonatlicheRate] = useState<string>("200");
    const [zinssatz, setZinssatz] = useState<string>("5");
    const [laufzeit, setLaufzeit] = useState<string>("10");
    const [ergebnis, setErgebnis] = useState<{
        endkapital: number;
        eingezahlt: number;
        zinsen: number;
    } | null>(null);

    const berechneZinseszins = () => {
        const K0 = parseFloat(startkapital) || 0;
        const R = parseFloat(monatlicheRate) || 0;
        const p = parseFloat(zinssatz) || 0;
        const n = parseFloat(laufzeit) || 0;

        const r = p / 100 / 12; // Monatlicher Zinssatz
        const m = n * 12; // Anzahl Monate

        // Formel für Endkapital mit monatlichen Einzahlungen
        // K_n = K_0 * (1+r)^m + R * ((1+r)^m - 1) / r
        const faktor = Math.pow(1 + r, m);
        const endkapitalAusStartkapital = K0 * faktor;
        const endkapitalAusRaten = r !== 0 ? R * (faktor - 1) / r : R * m;
        const endkapital = endkapitalAusStartkapital + endkapitalAusRaten;

        const eingezahlt = K0 + R * m;
        const zinsen = endkapital - eingezahlt;

        setErgebnis({
            endkapital: Math.round(endkapital * 100) / 100,
            eingezahlt: Math.round(eingezahlt * 100) / 100,
            zinsen: Math.round(zinsen * 100) / 100,
        });
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
        }).format(value);
    };

    return (
        <main className="min-h-screen bg-paper overflow-x-hidden selection:bg-gold selection:text-coffee-dark">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-porter text-coffee-dark mb-6">
                            Zinseszins-Rechner
                        </h1>
                        <p className="text-xl text-coffee-medium max-w-2xl mx-auto mb-8">
                            Berechne, wie dein Vermögen mit der Zeit wächst. Der Zinseszins-Effekt macht
                            aus kleinen Beträgen große Summen!
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Input Form */}
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
                                {/* Startkapital */}
                                <div>
                                    <label className="block text-sm font-bold text-coffee-dark mb-2 uppercase tracking-wide">
                                        Startkapital (€)
                                    </label>
                                    <input
                                        type="number"
                                        value={startkapital}
                                        onChange={(e) => setStartkapital(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-coffee-dark rounded-xl bg-paper text-coffee-dark font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                                        placeholder="10000"
                                    />
                                </div>

                                {/* Monatliche Rate */}
                                <div>
                                    <label className="block text-sm font-bold text-coffee-dark mb-2 uppercase tracking-wide">
                                        Monatliche Sparrate (€)
                                    </label>
                                    <input
                                        type="number"
                                        value={monatlicheRate}
                                        onChange={(e) => setMonatlicheRate(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-coffee-dark rounded-xl bg-paper text-coffee-dark font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                                        placeholder="200"
                                    />
                                </div>

                                {/* Zinssatz */}
                                <div>
                                    <label className="block text-sm font-bold text-coffee-dark mb-2 uppercase tracking-wide">
                                        Jährlicher Zinssatz (%)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={zinssatz}
                                        onChange={(e) => setZinssatz(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-coffee-dark rounded-xl bg-paper text-coffee-dark font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                                        placeholder="5"
                                    />
                                </div>

                                {/* Laufzeit */}
                                <div>
                                    <label className="block text-sm font-bold text-coffee-dark mb-2 uppercase tracking-wide">
                                        Laufzeit (Jahre)
                                    </label>
                                    <input
                                        type="number"
                                        value={laufzeit}
                                        onChange={(e) => setLaufzeit(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-coffee-dark rounded-xl bg-paper text-coffee-dark font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                                        placeholder="10"
                                    />
                                </div>

                                <RetroButton onClick={berechneZinseszins} className="w-full">
                                    Jetzt berechnen
                                </RetroButton>
                            </div>
                        </motion.div>

                        {/* Results Display */}
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

                            {ergebnis ? (
                                <div className="space-y-6">
                                    {/* Endkapital */}
                                    <div className="bg-paper border-2 border-coffee-dark rounded-xl p-6">
                                        <div className="text-sm font-bold text-coffee-medium mb-2 uppercase tracking-wide">
                                            Endkapital
                                        </div>
                                        <div className="text-4xl font-porter text-coffee-dark">
                                            {formatCurrency(ergebnis.endkapital)}
                                        </div>
                                    </div>

                                    {/* Eingezahlt */}
                                    <div className="bg-paper border-2 border-coffee-dark rounded-xl p-6">
                                        <div className="text-sm font-bold text-coffee-medium mb-2 uppercase tracking-wide">
                                            Eingezahlt
                                        </div>
                                        <div className="text-2xl font-bold text-coffee-dark">
                                            {formatCurrency(ergebnis.eingezahlt)}
                                        </div>
                                    </div>

                                    {/* Zinsen */}
                                    <div className="bg-cream border-2 border-coffee-dark rounded-xl p-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <PiggyBank className="w-5 h-5 text-coffee-dark" />
                                            <div className="text-sm font-bold text-coffee-medium uppercase tracking-wide">
                                                Gewinn durch Zinsen
                                            </div>
                                        </div>
                                        <div className="text-3xl font-porter text-green-700">
                                            +{formatCurrency(ergebnis.zinsen)}
                                        </div>
                                    </div>

                                    {/* Prozentsatz */}
                                    <div className="text-center pt-4 border-t-2 border-coffee-dark/20">
                                        <p className="text-sm text-coffee-medium">
                                            Das sind{" "}
                                            <span className="font-bold text-coffee-dark text-lg">
                                                {((ergebnis.zinsen / ergebnis.eingezahlt) * 100).toFixed(1)}%
                                            </span>{" "}
                                            mehr als eingezahlt!
                                        </p>
                                    </div>
                                </div>
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

            {/* Info Section */}
            <section className="py-16 px-6 bg-cream/50">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="bg-paper border-2 border-coffee-dark rounded-2xl p-8 shadow-[4px_4px_0px_0px_rgba(45,27,14,0.2)]"
                    >
                        <h3 className="text-2xl font-porter text-coffee-dark mb-4">
                            Was ist der Zinseszins-Effekt?
                        </h3>
                        <p className="text-coffee-medium leading-relaxed mb-4">
                            Der Zinseszins-Effekt beschreibt das exponentielle Wachstum deines Kapitals. Du erhältst
                            nicht nur Zinsen auf dein eingezahltes Geld, sondern auch Zinsen auf die bereits
                            erhaltenen Zinsen!
                        </p>
                        <p className="text-coffee-medium leading-relaxed">
                            Je länger du sparst, desto stärker wird dieser Effekt. Deshalb lohnt es sich, früh
                            anzufangen – selbst mit kleinen Beträgen. Zeit ist beim Vermögensaufbau dein bester
                            Freund!
                        </p>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

