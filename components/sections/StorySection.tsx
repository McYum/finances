"use client";

import Image from "next/image";
import { RetroButton } from "@/components/ui/RetroButton";
import { motion, type Variants } from "framer-motion";

// --- ANIMATION CONFIG ---
// Das definiert, wie die Elemente reinfliegen
const cardVariants: Variants = {
    offscreen: (direction: "left" | "right" | "bottom") => ({
        y: direction === "bottom" ? 100 : 50, // Startet weiter unten
        x: direction === "left" ? -100 : direction === "right" ? 100 : 0, // Startet seitlich
        opacity: 0, // Unsichtbar
        scale: 0.8, // Etwas kleiner
    }),
    onscreen: {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring" as const,
            bounce: 0.4, // Wie stark es nachfedert (Spring)
            duration: 1.5,
        }
    },
    // Wenn man wieder hochscrollt, soll es verschwinden:
    exit: {
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.5 }
    }
};

export function StorySection() {
    return (
        <section className="relative py-20 bg-white overflow-hidden">

            {/* 1. HEADER (Faded sanft ein) */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
                className="text-center mb-20 px-4"
            >
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-coffee-dark uppercase leading-tight">
                    Vom Kleingeld zum Vermögen: <br />
                    <span className="text-coffee">Die Magie der Zeit</span>
                </h2>
            </motion.div>

            <div className="max-w-5xl mx-auto relative px-4 min-h-[1200px]">

                {/* ==============================================
            2. DER WEG (DIE GOLDENE LINIE - ZIEHT SICH SELBST)
           ============================================== */}
                <div className="absolute top-0 left-0 w-full h-full -z-10 hidden md:block pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 800 1200" preserveAspectRatio="none">

                        {/* Pfad Definition mit Drawing Animation */}
                        <motion.path
                            d="M 100,50
                 Q 400,50 600,200
                 T 300,500
                 T 600,850
                 L 600,950"
                            fill="none"
                            stroke="#E5B758"
                            strokeWidth="6"
                            strokeLinecap="round"
                            className="drop-shadow-md"

                            // Die Magie: Pfad zeichnet sich auf
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: false, amount: 0.1 }} // Startet sofort wenn 10% sichtbar
                            transition={{ duration: 2.5, ease: "easeInOut" }} // Dauert 2.5s zum Zeichnen
                        />

                        {/* Pfeil am Ende (blendet ein) */}
                        <motion.path
                            d="M 585,940 L 600,960 L 615,940"
                            fill="none" stroke="#E5B758" strokeWidth="6" strokeLinecap="round"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 2 }} // Wartet bis die Linie da ist
                        />

                        <text x="400" y="40" textAnchor="middle" fill="#8B5E3C" className="font-bold text-xs tracking-widest uppercase">Weg des Geldes</text>
                    </svg>
                </div>

                {/* ==============================================
            3. START-MASKOTTCHEN (Fliegt von LINKS rein)
           ============================================== */}
                <motion.div
                    custom="left"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: false, amount: 0.5 }} // Trigger bei 50% Sichtbarkeit
                    variants={cardVariants}
                    className="md:absolute top-0 left-0 md:left-10 w-40 h-40 md:w-56 md:h-56 mx-auto md:mx-0 mb-12 md:mb-0"
                >
                    <div className="w-full h-full relative">
                        <Image src="/images/mascot.png" alt="Start" fill className="object-contain" />
                        <div className="absolute -top-4 -right-4 bg-white border border-coffee-dark px-2 py-1 text-xs rounded-lg rotate-12 shadow-sm">Let's Go!</div>
                    </div>
                </motion.div>


                {/* ==============================================
            4. STEP 1: HEUTE (Fliegt von RECHTS rein)
           ============================================== */}
                <motion.div
                    custom="right"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: false, amount: 0.5 }}
                    variants={cardVariants}
                    className="md:absolute top-[150px] right-0 md:right-[10%] w-full md:w-[350px] flex flex-col items-center md:items-start text-center md:text-left mb-16 md:mb-0"
                >
                    <h3 className="text-2xl font-bold text-coffee-dark mb-2">HEUTE</h3>
                    <p className="text-sm font-medium text-gray-600 mb-4">Wie viel sparst du pro Woche?</p>

                    <div className="text-6xl font-serif font-bold text-coffee-dark border-b-4 border-coffee/20 inline-block mb-4 relative">
                        25€
                        <span className="absolute -right-8 top-0 bg-[#D7CCC8] text-coffee-dark text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border border-coffee-dark">x5</span>
                    </div>

                    <div className="w-32 h-32 bg-orange-100 rounded-full border-2 border-dashed border-coffee-dark flex items-center justify-center text-4xl mt-2 relative shadow-md">
                        🌱
                        <span className="absolute bottom-0 text-xs bg-white px-2 border rounded shadow-sm">Start</span>
                    </div>
                </motion.div>


                {/* ==============================================
            5. STEP 2: IN 15 JAHREN (Fliegt von LINKS rein)
           ============================================== */}
                <motion.div
                    custom="left"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: false, amount: 0.5 }}
                    variants={cardVariants}
                    className="md:absolute top-[450px] left-0 md:left-[5%] w-full md:w-[450px] flex flex-col md:flex-row items-center gap-6 mb-16 md:mb-0"
                >

                    <div className="w-48 h-48 bg-green-100 rounded-full border-2 border-dashed border-coffee-dark flex items-center justify-center text-6xl relative order-2 md:order-1 shadow-lg">
                        🌳
                        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white border rounded-full text-2xl flex items-center justify-center shadow-sm">💧</div>
                    </div>

                    <div className="flex flex-col gap-4 order-1 md:order-2">
                        <h3 className="text-2xl font-bold text-coffee-dark text-center md:text-left">IN 15 JAHREN</h3>

                        <div className="bg-paper border-2 border-coffee-dark rounded-lg p-2 shadow-[2px_2px_0px_0px_#2D1B0E] w-40 relative hover:scale-105 transition-transform">
                            <span className="absolute -top-3 left-2 bg-[#F5F5F0] text-[10px] font-bold px-1 border border-coffee-dark">EINZAHLUNGEN</span>
                            <p className="text-xl font-black text-coffee-dark">420€</p>
                        </div>

                        <div className="bg-paper border-2 border-coffee-dark rounded-lg p-2 shadow-[2px_2px_0px_0px_#2D1B0E] w-40 relative hover:scale-105 transition-transform">
                            <span className="absolute -top-3 left-2 bg-[#F5F5F0] text-[10px] font-bold px-1 border border-coffee-dark">ZINSEN</span>
                            <p className="text-xl font-black text-coffee-dark">20€</p>
                        </div>
                    </div>
                </motion.div>


                {/* ==============================================
            6. STEP 3: IN 30 JAHREN (Fliegt von RECHTS rein)
           ============================================== */}
                <motion.div
                    custom="right"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: false, amount: 0.5 }}
                    variants={cardVariants}
                    className="md:absolute top-[800px] right-0 md:right-[5%] w-full md:w-[450px] flex flex-col items-center mb-16 md:mb-0"
                >
                    <h3 className="text-2xl font-bold text-coffee-dark mb-4">IN 30 JAHREN</h3>

                    <div className="relative hover:scale-105 transition-transform duration-500">
                        <div className="w-64 h-64 bg-green-200 rounded-full border-4 border-coffee-dark flex items-center justify-center text-8xl z-10 relative shadow-xl">
                            💰🌳
                        </div>
                        <div className="absolute -bottom-4 w-full flex justify-center gap-1 text-2xl animate-bounce">
                            🟡🟡🟡
                        </div>
                    </div>
                </motion.div>


                {/* ==============================================
            7. CTA BUTTON & QUOTE (Fliegt von UNTEN rein)
           ============================================== */}
                <motion.div
                    custom="bottom"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: false, amount: 0.5 }}
                    variants={cardVariants}
                    className="md:absolute top-[1050px] w-full flex flex-col items-center gap-8"
                >

                    <div className="relative">
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-gold animate-bounce text-2xl">↓</div>
                        <RetroButton className="bg-[#E5B758] hover:bg-[#D4A03D]">
                            MEINEN SPARPLAN <br/> JETZT STARTEN
                        </RetroButton>
                    </div>

                    <div className="bg-[#FFF8E7] border-2 border-coffee-dark rounded-2xl px-8 py-4 max-w-lg text-center shadow-sm">
                        <p className="font-bold text-coffee-dark text-sm uppercase leading-relaxed">
                            Man muss nicht reich sein, um anzufangen. <br/>
                            <span className="text-coffee">Zeit ist wichtiger als viel Geld investiere klug!</span>
                        </p>
                    </div>

                </motion.div>

            </div>
        </section>
    );
}