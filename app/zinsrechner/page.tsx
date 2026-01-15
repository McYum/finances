"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ETFCalculator } from "@/components/zinsrechner/ETFCalculator";
import { CompoundInterestCalculator } from "@/components/zinsrechner/CompoundInterestCalculator";

export default function ZinsrechnerPage() {

    return (
        <main className="min-h-screen bg-paper overflow-x-hidden selection:bg-gold selection:text-coffee-dark">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-0 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-porter text-coffee-dark mb-6">
                            Zinsrechner
                        </h1>
                        <p className="text-xl text-coffee-medium max-w-2xl mx-auto mb-8">
                            Berechne, wie dein Vermögen mit der Zeit wächst. Der Zinseszins-Effekt macht
                            aus kleinen Beträgen große Summen!
                        </p>
                    </motion.div>
                </div>
            </section>

            <ETFCalculator />

            <CompoundInterestCalculator />

            {/* Info Section */}
            <section className="py-16 px-6 bg-cream/50">
                <div className="max-w-7xl mx-auto">
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

