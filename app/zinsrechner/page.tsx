"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ETFCalculator } from "@/components/zinsrechner/ETFCalculator";
import { CompoundInterestCalculator } from "@/components/zinsrechner/CompoundInterestCalculator";
import { BackButton } from "@/components/ui/BackButton";

export default function ZinsrechnerPage() {

    return (
        <main className="min-h-screen bg-paper overflow-x-hidden selection:bg-gold selection:text-coffee-dark">
            <Header />
            <BackButton />

            {/* Hero Section */}
            <section className="pb-0 px-6">


                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="text-center">
                            <h1 className="text-5xl md:text-6xl font-porter text-coffee-dark mb-6">
                                Zinsrechner
                            </h1>
                            <p className="text-xl text-coffee-medium max-w-2xl mx-auto mb-8">
                                Berechne, wie dein Vermögen mit der Zeit wächst. Der Zinseszins-Effekt macht
                                aus kleinen Beträgen große Summen!
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <ETFCalculator />

            <CompoundInterestCalculator />

            <Footer />
        </main>
    );
}

