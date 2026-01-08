"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Star, Layers, Calendar } from "lucide-react";
import { RetroButton } from "@/components/ui/RetroButton";
import { useSpring, animated } from "@react-spring/web";
import { SparkleCluster } from "@/components/ui/SparkleCluster";

export function NewsletterSection() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const subscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setTimeout(() => setStatus("success"), 1500);
    };

    const floatStyles = useSpring({
        loop: true,
        from: { y: 0, rotate: 0 },
        to: [
            { y: -15, rotate: 2 },
            { y: 0, rotate: 0 }
        ],
        config: { duration: 3000, easing: t => t },
    });

    return (
        <section id="newsletter" className="py-20 px-4 max-w-6xl mx-auto mb-10">
            <div className="bg-white border border-gray-200 rounded-[3rem] p-8 md:p-16 shadow-sm relative overflow-visible">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* --- LINKE SEITE --- */}
                    <div className="z-10 text-left">
                        <h2 className="font-serif font-bold text-4xl md:text-5xl mb-6 text-coffee-dark">
                            Starte deinen <br/> einfachen Finanzweg
                        </h2>
                        <p className="text-black-600 mb-8 text-lg">
                            Hol dir wöchentliche Mini Spar & Investment-Tipps, verständlich und ohne Stress.
                        </p>

                        <h3 className="font-porter text-4xl tracking-widest bg-clip-text bg-gradient-to-b from-white to-gray-300 mb-8 transform"
                            style={{
                                WebkitTextStroke: ".5px #1F1E1E",
                                textShadow: "2px 2px 0px rgba(0,0,0,0.1)"
                            }}>
                            SICHERE DIR
                        </h3>

                        <ul className="space-y-4 mb-10 text-lg font-medium text-coffee-dark">
                            <li className="flex items-center gap-3"><Star className="text-gold fill-gold" /> Mini-Sparpläne ab 25€</li>
                            <li className="flex items-center gap-3"><Layers className="text-gold" /> Community für Finanzstarter</li>
                            <li className="flex items-center gap-3"><Calendar className="text-gold" /> 1 Tipp pro Woche</li>
                        </ul>

                        <form onSubmit={subscribe} className="flex flex-col gap-4 max-w-md">
                            <input
                                type="email"
                                placeholder="Deine E-Mail-Adresse"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border-2 border-gray-300 rounded-full px-6 py-4 text-lg focus:outline-none focus:border-coffee-dark transition-colors"
                            />
                            <RetroButton type="submit" disabled={status === 'loading' || status === 'success'} className="w-full flex justify-center gap-2">
                                {status === 'loading' ? 'LÄDT...' : status === 'success' ? 'WILLKOMMEN!' : 'JETZT ABONNIEREN'}
                                <ArrowRight strokeWidth={3}/>
                            </RetroButton>
                        </form>
                    </div>

                    {/* --- RECHTE SEITE: BILDER & SPARKLES --- */}
                    <div className="relative flex justify-center min-h-[300px]">

                        {/*
                           ÄNDERUNG HIER: GRÖSSE ANGEPASST
                           Vorher: w-64 h-64 md:w-80 md:h-80
                           Jetzt:  w-72 h-72 md:w-[420px] md:h-[420px]
                        */}
                        <animated.div style={floatStyles} className="relative w-72 h-72 md:w-[420px] md:h-[420px] mt-10">

                            {/* 1. SPARKLES */}
                            <SparkleCluster className="-top-8 -left-8" delay={0.2} />
                            <SparkleCluster className="top-1/2 -right-12" delay={1.2} />
                            <SparkleCluster className="bottom-0 -left-6" delay={0.7} />

                            {/* 2. SPRECHBLASE */}
                            <div className="absolute -top-20 -right-6 md:-right-10 z-20 w-56 h-40">
                                <Image
                                    src="/images/bubble.png"
                                    alt="Bubble"
                                    fill
                                    className="object-contain drop-shadow-md"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pb-2 pl-2 rotate-[18deg]">
                                    <p className="font-sans font-bold text-black text-lg leading-tight">
                                        Ich begleite <br/> dich!
                                    </p>
                                </div>
                            </div>

                            {/* 3. MASKOTTCHEN */}
                            <div className="relative w-full h-full">
                                <Image
                                    src="/images/mascot.png"
                                    alt="Kaffee Maskottchen"
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                />
                            </div>

                        </animated.div>
                    </div>

                </div>
            </div>
        </section>
    );
}