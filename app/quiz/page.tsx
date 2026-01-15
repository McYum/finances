"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, Circle } from "lucide-react";
import { RetroButton } from "@/components/ui/RetroButton";
import { animated, useSpring } from "@react-spring/web";
import { cn } from "@/lib/utils";
import Link from "next/link";

// --- TYPES & DATA ---

type ProfileType = "safety" | "balanced" | "risky" | "relaxed";

const PROFILES: Record<ProfileType, { title: string; desc: string; strategy: string }> = {
    safety: {
        title: "Der Sicherheits-Fan",
        desc: "Du magst keine Überraschungen beim Geld. Dein Schlaf ist dir wichtiger als hohe Rendite. Du willst dein Vermögen schützen und inflationssicher aufbewahren, statt zu zocken.",
        strategy: "Tagesgeldkonto & Festgeld für den Großteil. Ein kleiner Teil in konservative 'All-Weather' ETFs, um die Inflation auszugleichen."
    },
    balanced: {
        title: "Der Langzeit-Investor",
        desc: "Du weißt, dass Rendite Zeit braucht. Kursschwankungen machen dich nicht nervös, weil du den langen Atem hast. Du suchst die perfekte Balance aus Wachstum und Stabilität.",
        strategy: "Klassischer 70/30 Mix (Welt-ETF & Staatsanleihen) oder ein simpler MSCI World Sparplan. Automatisieren und liegen lassen."
    },
    risky: {
        title: "Der Chancen-Jäger",
        desc: "No risk, no fun! Du willst mehr aus deinem Geld machen als der Durchschnitt. Du informierst dich gerne und bist bereit, für hohe Gewinne auch mal rote Zahlen auszusitzen.",
        strategy: "Sektor-ETFs (Tech/AI), Einzelaktien oder ein kleiner Krypto-Anteil. Der Basis-Teil sollte trotzdem ein solider Welt-ETF sein."
    },
    relaxed: {
        title: "Der Entspannte Minimalist",
        desc: "Finanzen? Bitte so wenig Aufwand wie möglich! Du willst dich nicht täglich mit Börsenkursen beschäftigen. Dein Geld soll für dich arbeiten, während du dein Leben genießt.",
        strategy: "Ein einziger 'All-Country World' ETF (thesaurierend). Einmal Sparplan einrichten, App löschen und in 20 Jahren freuen."
    }
};

const QUESTIONS = [
    {
        id: 1,
        question: "Wie triffst du Entscheidungen im Alltag?",
        options: [
            { text: "Ich mag es übersichtlich & sicher", type: "safety" },
            { text: "Ich folge gerne festen Routinen", type: "balanced" },
            { text: "Ich entscheide spontan & mutig", type: "risky" },
            { text: "Ich zögere und brauche Klarheit", type: "relaxed" }
        ]
    },
    {
        id: 2,
        question: "Was machst du mit übrigem Geld am Monatsende?",
        options: [
            { text: "Sofort aufs Sparkonto schieben", type: "safety" },
            { text: "In meinen Sparplan investieren", type: "balanced" },
            { text: "In neue Trends investieren", type: "risky" },
            { text: "Es bleibt einfach auf dem Girokonto", type: "relaxed" }
        ]
    },
    {
        id: 3,
        question: "Wie reagierst du, wenn es an der Börse crasht?",
        options: [
            { text: "Panik! Alles verkaufen!", type: "safety" },
            { text: "Ich warte ab und trinke Tee", type: "balanced" },
            { text: "Ich kaufe günstig nach (Rabatt!)", type: "risky" },
            { text: "Ich schaue gar nicht erst ins Depot", type: "relaxed" }
        ]
    },
    {
        id: 4,
        question: "Was ist dein wichtigstes finanzielles Ziel?",
        options: [
            { text: "Ein Eigenheim / Sicherheit", type: "safety" },
            { text: "Früher in Rente gehen", type: "balanced" },
            { text: "Maximale Vermögenssteigerung", type: "risky" },
            { text: "Finanzielle Unabhängigkeit", type: "relaxed" }
        ]
    },
    {
        id: 5,
        question: "Wie viel Zeit willst du für Finanzen aufbringen?",
        options: [
            { text: "Ich prüfe täglich meinen Kontostand", type: "safety" },
            { text: "Einmal im Monat reicht", type: "balanced" },
            { text: "Ich lese täglich Finanznews", type: "risky" },
            { text: "Gar keine, es soll automatisch laufen", type: "relaxed" }
        ]
    }
];

// --- HELPER COMPONENTS ---

function QuizNavButton({ direction, onClick, disabled }: { direction: "left" | "right"; onClick: () => void; disabled?: boolean }) {
    const [isHovered, setIsHovered] = useState(false);

    const spring = useSpring({
        scale: isHovered && !disabled ? 1.15 : 1,
        opacity: disabled ? 0.5 : 1,
        config: { mass: 1, tension: 300, friction: 10 },
    });

    return (
        <animated.button
            onClick={onClick}
            disabled={disabled}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={spring}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#C6A992] hover:bg-[#B5967D] text-white border-2 border-white/40 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed shadow-md transition-colors z-30"
        >
            {direction === "left" ? <ChevronLeft size={32} /> : <ChevronRight size={32} />}
        </animated.button>
    );
}

// --- UPDATED OPTION CARD ---
function OptionCard({ text, selected, onClick }: { text: string; selected: boolean; onClick: () => void }) {
    return (
        <motion.button
            type="button"
            onClick={onClick}
            aria-pressed={selected}
            // Tap animation: Subtle shrink
            whileTap={{ scale: 0.98 }}

            // Layout animation
            layout

            className={cn(
                // Base Layout: Added more padding (py-6, px-8) for larger touch area
                "relative flex items-center gap-6 py-6 px-8 rounded-3xl border-4 select-none w-full text-left",

                // Color Transitions: Smooth fade instead of jumpy effects
                "transition-colors duration-200",

                // Focus styles for keyboard accessibility
                "focus:outline-none focus:ring-4 focus:ring-coffee/50",

                // --- STATE STYLES ---
                selected
                    // Selected: Dark frame, distinct background
                    ? "border-coffee-dark bg-[#F2EBE3]"
                    // Default: Light frame, white/transparent bg
                    // Hover: Slightly darker border and white bg to indicate interactivity
                    : "border-[#E5DACE] bg-white/60 hover:border-[#C6A992] hover:bg-white hover:shadow-sm"
            )}
        >
            <div className="shrink-0 text-coffee-dark">
                {/* Icon animation */}
                <motion.div
                    initial={false}
                    animate={{ scale: selected ? 1.1 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    {selected ? <CheckCircle2 size={32} strokeWidth={3} /> : <Circle size={32} strokeWidth={2} className="text-gray-300" />}
                </motion.div>
            </div>

            <span className={cn(
                "text-xl md:text-2xl font-bold text-coffee-dark transition-opacity duration-200",
                selected ? "opacity-100" : "opacity-70"
            )}>
                {text}
            </span>
        </motion.button>
    );
}

export default function QuizPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, ProfileType>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [resultProfile, setResultProfile] = useState<ProfileType>("balanced");
    const [direction, setDirection] = useState(0);

    const handleSelect = (type: string) => {
        setAnswers(prev => ({ ...prev, [QUESTIONS[currentIndex].id]: type as ProfileType }));
    };

    const nextQuestion = () => {
        if (currentIndex < QUESTIONS.length - 1) {
            setDirection(1);
            setCurrentIndex(prev => prev + 1);
        }
    };

    const prevQuestion = () => {
        if (currentIndex > 0) {
            setDirection(-1);
            setCurrentIndex(prev => prev - 1);
        }
    };

    const calculateResult = () => {
        const counts: Record<string, number> = { safety: 0, balanced: 0, risky: 0, relaxed: 0 };
        Object.values(answers).forEach((type) => {
            if (counts[type] !== undefined) counts[type]++;
        });
        let maxKey: ProfileType = "balanced";
        let maxVal = 0;
        (Object.keys(counts) as ProfileType[]).forEach(key => {
            if (counts[key] > maxVal) {
                maxVal = counts[key];
                maxKey = key;
            }
        });
        return maxKey;
    };

    const triggerFinancialConfetti = async () => {
        const confetti = (await import("canvas-confetti")).default;
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function() {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#E5B758', '#85bb65', '#2D1B0E'] });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#E5B758', '#85bb65', '#2D1B0E'] });
        }, 250);
    };

    const submitQuiz = () => {
        const profile = calculateResult();
        setResultProfile(profile);
        triggerFinancialConfetti();
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const isComplete = Object.keys(answers).length === QUESTIONS.length;

    // --- SMOOTH & FAST ANIMATION VARIANTS ---
    // Removed rotation and large offsets for a cleaner, faster feel
    const questionVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 50 : -50, // Reduced offset for subtle slide
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.3, // Fast transition
                ease: "easeOut"
            }
        },
        exit: (dir: number) => ({
            x: dir < 0 ? 50 : -50,
            opacity: 0,
            transition: {
                duration: 0.2, // Very fast exit
                ease: "easeIn"
            }
        })
    };

    return (
        <main className="min-h-screen bg-paper flex flex-col">
            <Header />

            <div className="flex-grow flex items-center justify-center pt-32 pb-20 px-4">
                <div className="w-full max-w-5xl mx-auto">

                    {!isSubmitted ? (
                        <div className="space-y-8">

                            {/* Header Text Container */}
                            <div className="min-h-[100px] flex items-center justify-center relative px-4 mb-4">
                                <AnimatePresence mode="wait">
                                    <motion.h1
                                        key={currentIndex}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        transition={{ duration: 0.2 }} // Fast text switch
                                        className="text-3xl md:text-5xl font-serif font-bold text-coffee-dark text-center leading-tight w-full"
                                    >
                                        {QUESTIONS[currentIndex].question}
                                    </motion.h1>
                                </AnimatePresence>
                            </div>

                            <div className="relative bg-white border-2 border-[#EFE6DD] rounded-[3rem] p-6 md:p-12 shadow-lg min-h-[500px] flex flex-col justify-between">

                                <div className="absolute top-1/2 -left-8 md:-left-20 -translate-y-1/2 z-20">
                                    <QuizNavButton direction="left" onClick={prevQuestion} disabled={currentIndex === 0} />
                                </div>
                                <div className="absolute top-1/2 -right-8 md:-right-20 -translate-y-1/2 z-20">
                                    <QuizNavButton direction="right" onClick={nextQuestion} disabled={currentIndex === QUESTIONS.length - 1} />
                                </div>

                                {/* Content Area */}
                                <div className="relative overflow-hidden w-full h-full flex-grow py-4">
                                    <AnimatePresence initial={false} custom={direction} mode="wait">
                                        <motion.div
                                            key={currentIndex}
                                            custom={direction}
                                            variants={questionVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            // Ensure the container is full width and centered
                                            className="flex flex-col gap-4 max-w-2xl mx-auto w-full px-2 md:px-4"
                                        >
                                            {QUESTIONS[currentIndex].options.map((option, idx) => (
                                                <OptionCard
                                                    key={idx}
                                                    text={option.text}
                                                    selected={answers[QUESTIONS[currentIndex].id] === option.type}
                                                    onClick={() => handleSelect(option.type)}
                                                />
                                            ))}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Footer Bar */}
                                <div className="mt-8 pt-6 border-t border-[#EFE6DD] flex flex-col md:flex-row items-center justify-between gap-4">

                                    <div className="flex items-baseline gap-1 overflow-hidden h-12">
                                        <AnimatePresence mode="popLayout" custom={direction}>
                                            <motion.span
                                                key={currentIndex}
                                                custom={direction}
                                                initial={{ y: direction > 0 ? 20 : -20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: direction > 0 ? -20 : 20, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="text-4xl font-serif text-coffee-dark font-bold block"
                                            >
                                                {currentIndex + 1}
                                            </motion.span>
                                        </AnimatePresence>
                                        <span className="text-gray-400 text-2xl">/{QUESTIONS.length}</span>
                                    </div>

                                    {currentIndex === QUESTIONS.length - 1 && (
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ type: "spring", bounce: 0.5 }}
                                        >
                                            <RetroButton
                                                onClick={submitQuiz}
                                                disabled={!isComplete}
                                                className={cn(
                                                    "py-3 px-8 text-sm md:text-lg transition-all duration-500",
                                                    !isComplete ? "from-gray-200 to-gray-300 border-gray-400 text-gray-500 shadow-[inset_0px_-6px_0px_0px_#9CA3AF] cursor-not-allowed" : ""
                                                )}
                                            >
                                                {isComplete ? "ABSCHICKEN" : "BITTE ALLES BEANTWORTEN"}
                                            </RetroButton>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="space-y-10"
                        >
                            <h1 className="text-4xl md:text-6xl font-serif font-bold text-coffee-dark text-center">
                                Dein Profil: <span className="italic text-coffee">{PROFILES[resultProfile].title}</span>
                            </h1>

                            <div className="bg-white border-4 border-[#EFE6DD] rounded-[3rem] p-8 md:p-16 shadow-xl max-w-4xl mx-auto relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                                <div className="space-y-8 relative z-10">
                                    <h2 className="text-3xl md:text-4xl font-bold text-coffee-dark">
                                        Bereit, die Zukunft zu erobern?
                                    </h2>
                                    <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed">
                                        <p className="font-bold text-coffee">
                                            Darum passt es perfekt zu dir:
                                        </p>
                                        <p>{PROFILES[resultProfile].desc}</p>
                                        <p>
                                            Die ideale Strategie für dich: <br />
                                            <strong className="text-coffee-dark">{PROFILES[resultProfile].strategy}</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <Link href="/#calculator">
                                    <RetroButton className="text-xl md:text-2xl px-12 py-6">
                                        Jetzt den Zinsrechner Probieren!
                                    </RetroButton>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
}