"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { RetroButton } from "@/components/ui/RetroButton";
import Link from "next/link";

export function CtaSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 }, // Reduced y
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100 },
        },
    };

    return (
        <section className="py-24 bg-paper overflow-hidden">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                // Margin buffer
                viewport={{ once: false, amount: 0.3, margin: "-100px" }}
                className="max-w-7xl mx-auto px-4"
            >
                <div className="relative min-h-[550px] rounded-[3rem] border-3 border-[#EFE6DD] bg-white p-8 shadow-lg md:p-10">
                    <div className="grid items-center gap-12 md:grid-cols-2">
                        {/* LEFT */}
                        <div className="relative z-10 text-center md:text-left">
                            <motion.h2 variants={itemVariants} className="mb-2 font-serif text-4xl italic text-coffee-dark md:text-6xl">
                                Probiere
                            </motion.h2>

                            <motion.h2
                                variants={itemVariants}
                                className="flex items-center gap-25 font-porter whitespace-nowrap text-5xl tracking-wider md:text-8xl"
                                style={{
                                    WebkitTextStroke: "1px #1F1E1E",
                                    color: "white",
                                    textShadow: "2px 5px 0 #1F1E1E",
                                }}
                            >
                                <span>HEUTE</span>
                                <span>NOCH!</span>
                            </motion.h2>

                            <motion.div variants={itemVariants} className="mt-12 flex justify-center md:justify-start">
                                <Link href="/zinsrechner">
                                    <RetroButton>
                                        <span className="flex items-center gap-3">
                                            Zinsrechner
                                            <ArrowRight/>
                                        </span>
                                    </RetroButton>
                                </Link>
                            </motion.div>
                        </div>

                        {/* RIGHT */}
                        <div className="relative hidden h-[400px] md:block">
                            <motion.div variants={itemVariants} className="absolute inset-0">
                                <div className="relative h-full w-full -translate-x-75 translate-y-7 scale-135 transform">
                                    <Image src="/images/act.jpg" alt="Act Now Button" fill className="object-contain" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}