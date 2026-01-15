"use client";

import Image from "next/image";
import Link from "next/link";
import { RetroButton } from "@/components/ui/RetroButton";
import { useSpring, animated } from "@react-spring/web";
import { smoothScrollToElement } from "@/lib/smoothScroll";
// HIER IMPORTIEREN:
import { SparkleCluster } from "@/components/ui/SparkleCluster";

export function HeroSection() {
    const float = useSpring({
        loop: true,
        from: { y: 0 },
        to: [{ y: -10 }, { y: 0 }],
        config: { duration: 4000, tension: 280, friction: 60 }
    });

    return (
        <section id="hero" className="relative pt-48 pb-10 px-4 max-w-7xl mx-auto min-h-screen flex items-start">
            {/* ... Dein Grid Layout ... */}
            <div className="grid md:grid-cols-2 gap-4 items-start w-full mt-8">

                {/* Linke Seite (Text) - unverändert lassen */}
                <div className="text-left z-10 md:-mt-8">
                    {/* ... Dein H1 Code ... */}
                    <h1 className="font-serif text-coffee-dark font-bold leading-tight mb-6">
                        <span className="block text-4xl md:text-6xl lg:text-7xl whitespace-nowrap">Ist dir dein täglicher</span>
                        <span className="block text-4xl md:text-6xl lg:text-7xl italic relative w-fit mt-1 md:mt-2">
                          Coffee To Go
                          <svg className="absolute w-full h-3 bottom-0 left-0 text-gold -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" opacity="0.4" /></svg>
                        </span>
                        <span className="block text-4xl md:text-6xl lg:text-7xl mt-1 md:mt-2">100.000 € wert?</span>
                    </h1>
                    <button
                        onClick={() => smoothScrollToElement('#story', 80)}
                        className="mt-4"
                    >
                        <RetroButton>ZEIGE MIR WIE</RetroButton>
                    </button>
                </div>

                {/* Rechte Seite (Mascot) - unverändert lassen */}
                <div className="relative flex justify-center md:justify-end mt-4 md:mt-12 will-change-transform">
                    <animated.div style={float} className="relative will-change-transform">
                        <SparkleCluster className="-top-2 -left--12" delay={0} />
                        <SparkleCluster className="top-1/3 -right-16" delay={1.5} />
                        <SparkleCluster className="bottom-40 -left-4" delay={0.8} />

                        {/* Bubble & Mascot Code ... */}
                        <div className="absolute -top-18 -right-4 md:-right-16 z-20 w-64 md:w-72 h-48">
                            <Image src="/images/bubble.png" alt="Background" fill className="object-contain drop-shadow-lg" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pb-3 pl-3 rotate-[14deg]">
                                <p className="font-sans font-bold text-black leading-tight text-lg">Spare & <br/>verdiene Geld</p>
                                <p className="font-black text-3xl mt-1 tracking-wide flex items-center justify-center gap-[1px]">
                                    <span className="text-black">EA</span>
                                    <span className="text-5xl bg-gradient-to-b from-lime-400 to-green-600 bg-clip-text text-transparent transform translate-y-[2px] drop-shadow-sm">$</span>
                                    <span className="text-black">Y!</span>
                                </p>
                            </div>
                        </div>
                        <div className="relative w-72 h-72 md:w-[500px] md:h-[500px]">
                            <Image src="/images/mascot.png" alt="Kaffee Maskottchen" fill priority className="object-contain drop-shadow-2xl" />
                        </div>
                    </animated.div>
                </div>
            </div>
        </section>
    );
}