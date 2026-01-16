"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ETFCalculator } from "@/components/zinsrechner/ETFCalculator";
import { CompoundInterestCalculator } from "@/components/zinsrechner/CompoundInterestCalculator";
import { BackButton } from "@/components/ui/BackButton";
import { CalculatorNavButton } from "@/components/zinsrechner/CalculatorNavButton";
import { CalculatorTabs } from "@/components/zinsrechner/CalculatorTabs";

type CalculatorType = "etf" | "compound";

const CALCULATORS = {
    etf: {
        title: "ETF-Rechner",
        description: "Simuliere deine ETF-Investitionen über Jahre hinweg",
        component: ETFCalculator
    },
    compound: {
        title: "Zinseszins-Rechner",
        description: "Berechne klassische Zinseszins-Effekte",
        component: CompoundInterestCalculator
    }
};

export default function ZinsrechnerPage() {
    const [activeCalculator, setActiveCalculator] = useState<CalculatorType>("etf");
    const [direction, setDirection] = useState(0);

    const handlePrevious = () => {
        if (activeCalculator === "compound") {
            setDirection(-1);
            setActiveCalculator("etf");
        }
    };

    const handleNext = () => {
        if (activeCalculator === "etf") {
            setDirection(1);
            setActiveCalculator("compound");
        }
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const ActiveComponent = CALCULATORS[activeCalculator].component;

    return (
        <main className="min-h-screen bg-paper overflow-x-hidden selection:bg-gold selection:text-coffee-dark flex flex-col">
            <Header />
            <BackButton />

            <div className="flex-grow">
                {/* Hero Section */}
                <section className="pb-8 px-6">
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
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={activeCalculator}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-xl text-coffee-medium max-w-2xl mx-auto mb-8"
                                >
                                    {CALCULATORS[activeCalculator].description}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Calculator Carousel */}
            <div className="relative px-6">
                <div className="relative max-w-6xl mx-auto">
                    {/* Navigation Buttons */}
                    <CalculatorNavButton
                        direction="left"
                        onClick={handlePrevious}
                        disabled={activeCalculator === "etf"}
                    />

                    <CalculatorNavButton
                        direction="right"
                        onClick={handleNext}
                        disabled={activeCalculator === "compound"}
                    />
                    <div className="relative overflow-hidden min-h-[670px] flex items-start">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={activeCalculator}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                className="w-full"
                            >
                                <ActiveComponent />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>


            <CalculatorTabs
                activeCalculator={activeCalculator}
                onTabClick={(calculator) => {
                    if (calculator !== activeCalculator) {
                        setDirection(calculator === "compound" ? 1 : -1);
                        setActiveCalculator(calculator);
                    }
                }}
            />
            </div>

            <Footer />
        </main>
    );
}

