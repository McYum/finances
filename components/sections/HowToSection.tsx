"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { animated, useSpring } from "@react-spring/web";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Slide data
const slides = [
  {
    title: "Sparen auf Autopilot",
    content: [
      "Kein Bock, ständig ans Sparen zu denken? Musst du auch nicht!",
      "Der Trick: Richte direkt nach Gehaltseingang einen Dauerauftrag auf ein separates Sparkonto ein. Was sofort weg ist, gibst du nicht aus.",
      "Nächstes Level: Mach einen ETF-Sparplan. Schon ab 25 € im Monat investierst du automatisch in hunderte Firmen gleichzeitig. Einmal einrichten, fertig.",
      "So baust du Vermögen auf, ohne einen Finger zu krümmen. Dein Zukunfts-Ich wird's dir danken.",
    ],
  },
  {
    title: "Investieren leicht gemacht",
    content: [
      "Aktien, Anleihen, ETFs? Klingt kompliziert, ist es aber nicht.",
      "Der einfachste Weg für Anfänger ist ein breit gestreuter Welt-ETF. Damit investierst du mit einem Klick in tausende Unternehmen weltweit.",
      "Du brauchst kein riesiges Startkapital. Mit einem Sparplan ab 25€ bist du dabei und profitierst vom Zinseszins.",
      "Deine Geldanlage wächst über die Jahre von ganz allein, während du dich auf die wichtigen Dinge im Leben konzentrierst.",
    ],
  },
  {
    title: "Die Macht des Zinseszins",
    content: [
      "Albert Einstein nannte ihn das achte Weltwunder. Wer ihn versteht, verdient an ihm. Wer nicht, bezahlt ihn.",
      "Wenn du Zinsen auf deine Geldanlage bekommst, werden diese im nächsten Jahr mitverzinst. So entsteht ein Schneeballeffekt.",
      "Je früher du anfängst, desto gewaltiger wird dieser Effekt. Selbst kleine Beträge können über Jahrzehnte zu einem riesigen Vermögen anwachsen.",
      "Der Schlüssel ist Geduld und Beständigkeit. Lass die Zeit für dich arbeiten!"
    ]
  }
];

function ArrowButton({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  const spring = useSpring({
    scale: isHovered ? 1.15 : 1,
    boxShadow: isHovered ? "0px 10px 25px -5px rgba(0,0,0,0.2)" : "0px 5px 15px -5px rgba(0,0,0,0.1)",
    config: { tension: 300, friction: 10 },
  });

  return (
      <animated.button
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={spring}
          className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-full bg-coffee/80 text-white backdrop-blur-sm border-2 border-white/20 flex items-center justify-center cursor-pointer z-30"
      >
        {direction === "left" ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </animated.button>
  );
}

export function HowToSection() {
  const [index, setIndex] = useState(0);

  const goNext = () => setIndex((prev) => (prev + 1) % slides.length);
  const goPrev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
      <motion.section
          initial={{ opacity: 0, y: 50 }} // Reduce Y from 100 to 50
          whileInView={{ opacity: 1, y: 0 }}
          // Margin buffer to prevent looping
          viewport={{ once: false, amount: 0.2, margin: "-100px" }}
          transition={{ type: "spring", duration: 1.5 }}
          className="py-24 px-4"
      >
        <div className="max-w-4xl mx-auto">

          <h2 className="font-serif text-4xl font-bold mb-10 text-coffee-dark text-center md:text-left">Wie geht das?</h2>

          {/* relative padding-bottom for mobile */}
          <div className="relative bg-white border-2 border-[#EFE6DD] rounded-3xl p-8 md:p-12 shadow-lg min-h-[450px] flex items-center justify-center pb-24 md:pb-12">

            {/* DESKTOP ARROWS - Side absolute */}
            <div className="absolute top-1/2 -left-6 -translate-y-1/2 hidden md:block z-20">
              <ArrowButton direction="left" onClick={goPrev}/>
            </div>
            <div className="absolute top-1/2 -right-6 -translate-y-1/2 hidden md:block z-20">
              <ArrowButton direction="right" onClick={goNext}/>
            </div>

            <div className="relative overflow-hidden w-full">
              <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{opacity: 0, y: 20, scale: 0.98}}
                    animate={{opacity: 1, y: 0, scale: 1}}
                    exit={{opacity: 0, y: -20, scale: 0.98}}
                    transition={{type: "spring", stiffness: 300, damping: 30}}
                    className="space-y-6 text-coffee-dark"
                >
                  <h3 className="text-3xl font-bold font-serif">{slides[index].title}</h3>

                  {slides[index].content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-lg leading-relaxed text-gray-700">
                        {paragraph.split(' ').map((word, wIndex) => {
                          const boldWords = ["Dauerauftrag", "ETF-Sparplan.", "ETF-Sparplan", "ab", "25", "€"];
                          if (boldWords.includes(word)) {
                            return <strong key={wIndex} className="font-bold text-coffee-dark">{word} </strong>
                          }
                          return word + " ";
                        })}
                      </p>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* MOBILE ARROWS - Bottom centered absolute */}
            <div className="md:hidden absolute bottom-6 left-0 w-full flex justify-center items-center gap-8 z-20">
              <ArrowButton direction="left" onClick={goPrev}/>
              <ArrowButton direction="right" onClick={goNext}/>
            </div>
          </div>
        </div>
      </motion.section>
  );
}