"use client";

import { useState, useEffect, useRef, memo, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, useSpring, useTransform, useInView, useScroll } from "framer-motion";
import { RetroButton } from "@/components/ui/RetroButton";
import { SparkleCluster } from "@/components/ui/SparkleCluster";
import { cn } from "@/lib/utils";
import { useInterestCalculator } from "@/lib/hooks/useInterestCalculator";
import { NumberTicker, CoinScatter } from "@/components/story/StoryComponents";
import { smoothScrollToElement } from "@/lib/smoothScroll";

const LAYOUT_CONFIG = {
    // Path image styling
    pathImage: { 
        x: 0, 
        y: 0, 
        scale: 1.0, 
        opacity: 0.8 
    },
    // Station positions
    stations: {
        station1: { x: -400, y: 0 },
        station2: { x: 0, y: 0 },
        station3: { x: -50, y: 100 }
    },
    // Scroll animation
    scroll: {
        offset: ["start 80%", "end 20%"] as const,
        clipPathRange: [0, 0.9],
        clipPathValues: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]
    },
    // Spring animations
    springs: {
        smooth: { stiffness: 100, damping: 30, restDelta: 0.001 },
        savings: { stiffness: 150, damping: 25 },
        number: { mass: 0.5, stiffness: 75, damping: 15 }
    },
    // Motion ranges
    motionRanges: {
        slider: { min: 5, max: 100, step: 5 },
        sliderPercent: [5, 100],
        potScale: [5, 100],
        sliderPercentValues: ["0%", "100%"],
        potScaleValues: [1, 1.25]
    },
    // Bubble positioning
    bubble: {
        top: -25,
        rightDesktop: 1,
        rightMobile: "1/2",
        translateX: 10,
        width: { mobile: 160, desktop: 192 },
        height: { mobile: 128, desktop: 160 }
    },
    // Mascot dimensions
    mascot: {
        width: { mobile: 192, desktop: 256 },
        height: { mobile: 192, desktop: 256 }
    },
    // Money pot counter
    potCounter: {
        top: "1/2",
        right: "-90%",
        translateX: "-1/2",
        translateY: "-1/2",
        marginTop: 2
    },
    // Animations
    animations: {
        wateringCan: {
            rotate: [20, 5, 20],
            duration: 3,
            top: 15,
            left: -110
        },
        pulse: {
            y: [0, 10, 0],
            duration: 2
        }
    },
    // Coin scatter positions
    coinScatter: {
        y15: { top: "3%", left: "15%", right: "25%", bottom: "60%" },
        y30: { top: "1%", left: "25%", right: "35%", bottom: "40%" }
    },
    // Money tree scale
    moneyTreeScale: 1.2,
    // 30 years bottom panel
    bottomPanel: {
        bottom: "-25%"
    }
};


export function StorySection() {
    const [weeklySavings, setWeeklySavings] = useState(25);
    const [displayValue, setDisplayValue] = useState(25);
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLElement>(null);

    // Memoize scroll config
    const scrollConfig = useMemo(() => ({
        target: containerRef,
        offset: LAYOUT_CONFIG.scroll.offset as any
    }), []);

    const { scrollYProgress } = useScroll(scrollConfig);

    const smoothScroll = useSpring(scrollYProgress as any, {
        ...LAYOUT_CONFIG.springs.smooth
    });

    const pathClip = useTransform(smoothScroll as any, [LAYOUT_CONFIG.scroll.clipPathRange[0], LAYOUT_CONFIG.scroll.clipPathRange[1]], LAYOUT_CONFIG.scroll.clipPathValues);

    const smoothSavings = useSpring(displayValue, { 
        ...LAYOUT_CONFIG.springs.savings
    });
    useEffect(() => { smoothSavings.set(displayValue); }, [displayValue, smoothSavings]);

    const sliderPercent = useTransform(smoothSavings, LAYOUT_CONFIG.motionRanges.sliderPercent, LAYOUT_CONFIG.motionRanges.sliderPercentValues);
    const potScale = useTransform(smoothSavings, LAYOUT_CONFIG.motionRanges.potScale, LAYOUT_CONFIG.motionRanges.potScaleValues);

    // Debounced slider handler
    const handleSliderChange = useCallback((value: number) => {
        setDisplayValue(value);
        
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        
        debounceTimerRef.current = setTimeout(() => {
            setWeeklySavings(value);
        }, 100);
    }, []);

    const stats = useInterestCalculator(weeklySavings);

    return (
        <section ref={containerRef} className="relative pt-24 pb-96 bg-[#FFFBF5] overflow-visible">
            <div className="text-center mb-16 md:mb-32 px-4 relative z-20">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-serif font-bold text-coffee-dark uppercase leading-tight"
                >
                    Vom Kleingeld zum Vermögen: <br />
                    <span className="text-coffee italic">Die Magie der Zeit</span>
                </motion.h2>
            </div>

            <div className="max-w-6xl mx-auto relative px-4 min-h-[2200px]">
                <motion.div
                    className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none hidden md:block will-change-transform"
                    style={{
                        clipPath: pathClip,
                        opacity: LAYOUT_CONFIG.pathImage.opacity,
                        transform: `translate(${LAYOUT_CONFIG.pathImage.x}px, ${LAYOUT_CONFIG.pathImage.y}px) scale(${LAYOUT_CONFIG.pathImage.scale})`
                    }}
                >
                    <div className="relative w-full h-full">
                        <Image src="/images/story/Path_temp.png" alt="Path" fill className="object-contain" priority sizes="100vw" />
                    </div>
                </motion.div>

                <motion.div
                    className="relative grid md:grid-cols-2 gap-12 items-center mb-48 z-10 will-change-transform"
                    style={{ x: LAYOUT_CONFIG.stations.station1.x, y: LAYOUT_CONFIG.stations.station1.y }}
                >
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex justify-center md:justify-end relative"
                    >
                        <div className="absolute -top-25 right-1/2 translate-x-10 md:right-1 w-40 h-32 md:w-48 md:h-40 z-20">
                            <Image src="/images/bubble.png" alt="Bubble" fill className="object-contain drop-shadow-md" sizes="(max-width: 768px) 160px, 192px" />
                            <div className="absolute inset-0 flex items-center justify-center pb-3 pr-2">
                                <p className="font-bold text-coffee-dark text-lg rotate-[-8deg] leading-tight text-center">
                                    Fang <br/> klein an!
                                </p>
                            </div>
                        </div>
                        <div className="w-48 h-48 md:w-64 md:h-64 relative">
                            <Image
                                src="/images/mascot.png"
                                alt="Mascot"
                                fill
                                className="object-contain scale-x-[-1]"
                                sizes="(max-width: 768px) 192px, 256px"
                            />
                        </div>
                    </motion.div>

                    <div className="flex flex-col items-center md:items-start z-20 md:mt-120 md:ml-80">
                        <h3 className="text-3xl font-bold text-coffee-dark mb-3 uppercase tracking-wide">Heute</h3>
                        <p className="text-lg text-gray-700 mb-6">Wie viel sparst du pro Woche?</p>
                        <div className="relative w-full md:w-[400px] flex flex-col items-center">
                            <motion.div className="relative w-40 h-40 mb-6" style={{scale: potScale}}>
                                <Image src="/images/story/money_pot.png" alt="Pot" fill
                                       className="object-contain drop-shadow-xl"/>

                                {/* MONEY COUNTER FRAME */}
                                <div className="absolute top-1/2 right-[-90%] -translate-x-1/2 -translate-y-1/2 mt-2">
                                    <div
                                        className="text-3xl font-black text-coffee-dark bg-paper px-4 py-2 rounded-xl border-2 border-coffee-dark shadow-[4px_4px_0px_0px_#2D1B0E] flex items-baseline z-30">
                                        <NumberTicker value={displayValue}/>
                                        <span className="ml-1 text-2xl">€</span>
                                    </div>
                                </div>
                            </motion.div>
                            <div
                                className="w-full bg-[#EFE6DD] p-5 rounded-2xl border-2 border-coffee-dark shadow-[4px_4px_0px_0px_#2D1B0E] relative touch-none">
                                <input
                                    type="range"
                                    min={LAYOUT_CONFIG.motionRanges.slider.min.toString()}
                                    max={LAYOUT_CONFIG.motionRanges.slider.max.toString()}
                                    step={LAYOUT_CONFIG.motionRanges.slider.step.toString()}
                                    value={displayValue}
                                    onChange={(e) => handleSliderChange(Number(e.target.value))}
                                    className="absolute inset-0 z-30 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="relative h-6 w-full flex items-center">
                                    <div
                                        className="absolute w-full h-3 bg-white border border-coffee/20 rounded-full overflow-hidden">
                                        <motion.div className="h-full bg-gradient-to-r from-gold to-orange-400"
                                                    style={{width: sliderPercent}}/>
                                    </div>
                                    <motion.div
                                        className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-coffee-dark border-2 border-white rounded-full shadow-md z-10 flex items-center justify-center pointer-events-none"
                                        style={{left: sliderPercent, x: "-50%"}}
                                    >
                                        <div className="w-2 h-2 bg-gold rounded-full"/>
                                    </motion.div>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-coffee mt-4 px-1">
                                    <span>5€</span>
                                    <span className="uppercase tracking-wider">Wöchentlich</span>
                                    <span>100€</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="relative grid md:grid-cols-2 gap-8 items-center mb-48 z-10 will-change-transform"
                    style={{x: LAYOUT_CONFIG.stations.station2.x, y: LAYOUT_CONFIG.stations.station2.y}}
                >
                    <motion.div
                        initial={{x: -50, opacity: 0}}
                        whileInView={{x: 0, opacity: 1}}
                        viewport={{once: true}}
                        className="order-2 md:order-1 flex flex-col items-center relative"
                    >
                        <h3 className="text-4xl font-bold text-coffee-dark mb-6 uppercase tracking-wide bg-paper px-4 relative z-10">In 15 Jahren</h3>
                        <motion.div className="relative w-64 h-64 md:w-80 md:h-80">
                            <Image src="/images/story/pot_tree.png" alt="Pot Tree" fill
                                   className="object-contain drop-shadow-2xl z-10"
                                   sizes="(max-width: 768px) 256px, 320px"/>
                            <SparkleCluster className="-top-4 -right-4"/>
                            <SparkleCluster className="bottom-1/3 -left-8" delay={1}/>
                            <div className="absolute top-[3%] left-[15%] right-[25%] bottom-[60%] z-10">
                                <CoinScatter count={Math.floor(displayValue / 6)}/>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-6 mt-10 w-full max-w-sm">
                            <div className="relative bg-paper border-2 border-coffee-dark rounded-xl p-4 shadow-[4px_4px_0px_0px_#2D1B0E] text-center overflow-visible">
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-coffee-dark text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">Einzahlungen</span>
                                <p className="text-2xl font-black text-coffee-dark mt-1 tracking-tight">
                                    <NumberTicker value={stats.y15.total}/>€
                                </p>
                            </div>
                            <div className="relative bg-white border-2 border-gold rounded-xl p-4 shadow-[4px_4px_0px_0px_#E5B758] text-center overflow-visible transform scale-105">
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-coffee-dark text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">Zinsen ✨</span>
                                <p className="text-2xl font-black text-coffee-dark mt-1 tracking-tight">
                                    +<NumberTicker value={stats.y15.interest}/>€
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{x: 50, opacity: 0}}
                        whileInView={{x: 0, opacity: 1}}
                        viewport={{once: true}}
                        className="order-1 md:order-2 flex flex-col items-center md:items-start pl-0 md:-ml-24"
                    >
                        <div className="relative w-48 h-48 md:w-64 md:h-64 md:mt-24">
                            <motion.div
                                animate={{ rotate: LAYOUT_CONFIG.animations.wateringCan.rotate }}
                                transition={{ duration: LAYOUT_CONFIG.animations.wateringCan.duration, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-15 left-[-110px] w-32 h-32 md:w-40 md:h-40 z-20"
                            >
                                <Image src="/images/story/watering_can.png" alt="Can" fill className="object-contain" />
                            </motion.div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 md:w-40 md:h-40">
                                <Image src="/images/mascot.png" alt="Mascot" fill className="object-contain" />
                            </div>
                        </div>
                        <p className="mt-4 text-center md:text-left text-coffee font-medium max-w-xs">
                            Kleine Beträge wachsen mit der Zeit. <br/>Der Zinseszins ist dein Wasser! 💧
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="relative flex flex-col items-center z-10 will-change-transform"
                    style={{x: LAYOUT_CONFIG.stations.station3.x, y: LAYOUT_CONFIG.stations.station3.y}}
                >
                    <motion.div
                        initial={{scale: 0.8, opacity: 0}}
                        whileInView={{scale: 1, opacity: 1}}
                        transition={{duration: 0.8}}
                        viewport={{once: true}}
                        className="relative w-full max-w-2xl aspect-[16/10] flex flex-col items-center overflow-visible"
                    >
                        <h3 className="absolute -top-12 md:-top-20 left-1/2 -translate-x-1/2 text-3xl md:text-4xl font-bold text-coffee-dark uppercase tracking-wide bg-paper px-6 py-2 border-2 border-coffee-dark rounded-full shadow-md z-30 whitespace-nowrap">
                            In 30 Jahren
                        </h3>

                        <div className="relative w-full h-full" style={{ transform: `scale(${LAYOUT_CONFIG.moneyTreeScale})`, transformOrigin: "bottom center" }}>
                            <Image src="/images/story/money_tree.png" alt="Tree" fill className="object-contain z-10" />
                            <div className="absolute top-[1%] left-[25%] right-[35%] bottom-[40%] z-10">
                                <CoinScatter
                                    count={Math.floor(displayValue * 1.5)}
                                    coinSize="w-8 h-8 md:w-10 md:h-10"
                                />
                            </div>
                            <SparkleCluster className="top-[20%] left-[20%]"/>
                            <SparkleCluster className="top-[15%] right-[25%]" delay={0.5}/>
                            <SparkleCluster className="bottom-[40%] left-[10%]" delay={1.2}/>
                        </div>

                        <div
                            className="absolute bottom-[-25%] left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm border-4 border-gold px-8 py-4 rounded-3xl shadow-[0px_10px_20px_rgba(0,0,0,0.1)] z-40 text-center min-w-[280px]">
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Dein Vermögen</p>
                            <p className="text-4xl md:text-5xl font-porter text-coffee-dark tabular-nums">
                                <NumberTicker value={stats.y30.fv}/>€
                            </p>
                        </div>
                    </motion.div>

                    <div className="mt-32 flex flex-col items-center gap-6 relative z-30">
                        <motion.div
                            animate={{y: LAYOUT_CONFIG.animations.pulse.y}}
                            transition={{repeat: Infinity, duration: LAYOUT_CONFIG.animations.pulse.duration}}
                            className="text-gold text-4xl"
                        >
                            ⬇
                        </motion.div>
                        <button
                            onClick={() => smoothScrollToElement('#how-it-works', 80)}
                            className="text-xl md:text-2xl px-12 py-5"
                        >
                            <RetroButton className="text-xl md:text-2xl px-12 py-5 shadow-[inset_0px_-6px_0px_0px_#DFA339,0px_10px_20px_rgba(0,0,0,0.2)]">
                                MEINEN SPARPLAN <br className="md:hidden"/> JETZT STARTEN
                            </RetroButton>
                        </button>
                        <motion.div
                            initial={{y: 20, opacity: 0}}
                            whileInView={{y: 0, opacity: 1}}
                            viewport={{once: true}}
                            className="bg-[#FFF8E7] border-2 border-coffee-dark rounded-2xl px-6 py-4 max-w-lg text-center shadow-[4px_4px_0px_0px_#2D1B0E] mt-4 mx-4"
                        >
                            <p className="font-bold text-coffee-dark text-sm md:text-base uppercase leading-relaxed">
                                Man muss nicht reich sein, um anzufangen. <br/>
                                <span className="text-coffee bg-gold/20 px-1">Zeit ist wichtiger als viel Geld</span> –
                                investiere klug!
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}