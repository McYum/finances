"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RetroButton } from "@/components/ui/RetroButton";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <>
            <Header />
            
            <div className="min-h-screen bg-paper flex flex-col items-center justify-center px-4 py-12 flex-grow">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-2xl flex flex-col items-center"
            >
                {/* 404 Header */}
                <h1 className="text-7xl md:text-8xl font-serif font-bold text-coffee-dark mb-4">
                    404
                </h1>

                {/* Mascot */}
                <motion.div
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-48 h-48 md:w-64 md:h-64 mb-8"
                >
                    <Image
                        src="/images/mascot.png"
                        alt="Verwirrtes Maskottchen"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 192px, 256px"
                    />
                </motion.div>

                {/* Message */}
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-coffee-dark mb-4 text-center">
                    Ups, hier gibt es keinen Kaffee.
                </h2>

                <p className="text-lg md:text-xl text-coffee text-center mb-8 max-w-md">
                    Diese Seite existiert nicht. Aber keine Sorge – unser Sparplan-Wecker funktioniert noch einwandfrei!
                </p>

                {/* Button Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <Link href="/">
                        <RetroButton className="text-lg md:text-xl px-8 py-4">
                            ZURÜCK ZUR STARTSEITE
                        </RetroButton>
                    </Link>
                </motion.div>

                {/* Decorative element */}
                <div className="mt-12 flex gap-6 opacity-60">
                    <div className="text-4xl">☕</div>
                    <div className="text-4xl">💰</div>
                    <div className="text-4xl">📈</div>
                </div>
            </motion.div>
            </div>
            
            <Footer />
        </>
    );
}
