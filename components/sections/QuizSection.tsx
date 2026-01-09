"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import { RetroButton } from "@/components/ui/RetroButton";
import { SparkleCluster } from "@/components/ui/SparkleCluster";

export function QuizSection() {
    const float = useSpring({
        loop: true,
        from: { y: 0, rotate: 2 },
        to: [{ y: -12, rotate: -2 }, { y: 0, rotate: 2 }],
        config: { duration: 3500, easing: t => t }
    });

    return (
        <section className="py-24 bg-paper overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3, margin: "-100px" }}
                transition={{ type: "spring", duration: 1.5, bounce: 0.3 }}
                className="max-w-7xl mx-auto px-4"
            >
                <div className="bg-white border-2 border-[#EFE6DD] rounded-[3rem] p-8 md:p-16 shadow-lg min-h-[500px]">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-center md:text-left">
                            <h2 className="font-serif text-4xl md:text-5xl italic text-coffee-dark mb-2">Finde deinen</h2>
                            <h2
                                className="font-porter text-6xl md:text-6xl tracking-widest bg-clip-text bg-gradient-to-b from-white to-gray-00 mb-6 whitespace-nowrap"
                                style={{
                                    WebkitTextStroke: "0.5px #1F1E1E",
                                    textShadow: "4px 4px 0 #D7CCC8"
                                }}
                            >
                                FINANZ TYP
                            </h2>
                            <p className="text-2xl text-gray-600 mb-10">Mach eine schnelle Umfrage</p>

                            {/* HIER IST DER LINK JETZT KORREKT */}
                            <Link href="/quiz">
                                <RetroButton>PROBIER ES AUS!</RetroButton>
                            </Link>
                        </div>

                        <div className="relative flex justify-center h-[350px] md:h-[550px]">
                            <animated.div style={float} className="relative w-full h-full">
                                <SparkleCluster className="-top-10 -left-10" delay={0.1} />
                                <SparkleCluster className="top-1/3 -right-10" delay={0.8} />
                                <SparkleCluster className="bottom-0 -left-4" delay={1.2} />
                                <div className="relative w-full h-full">
                                    <Image src="/images/mascot.png" alt="Kaffee Maskottchen winkt" fill className="object-contain drop-shadow-2xl" />
                                </div>
                            </animated.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}