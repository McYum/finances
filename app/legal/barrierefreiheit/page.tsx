"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RetroButton } from "@/components/ui/RetroButton";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Barrierefreiheit | Coffee4Money",
};

export default function BarrierefreiheitPage() {
    return (
        <>
            <Header />
            
            {/* Back Button */}
            <div className="bg-paper py-6 px-4 border-b border-coffee/10">
                <div className="max-w-4xl mx-auto">
                    <Link href="/">
                        <RetroButton className="text-sm md:text-base px-6 py-3">
                            <span className="flex items-center gap-2">
                                <ChevronLeft size={20} />
                                ZURÜCK
                            </span>
                        </RetroButton>
                    </Link>
                </div>
            </div>

            {/* Content */}
            <main className="bg-paper py-12 px-4 flex-grow">
                <article className="max-w-4xl mx-auto">
                <h1>Erklärung zur Barrierefreiheit</h1>
                <p>
                    Coffee4Money ist bemüht, seine Website im Einklang mit den nationalen
                    Rechtsvorschriften zur Umsetzung der Richtlinie (EU) 2016/2102 des
                    Europäischen Parlaments und des Rates barrierefrei zugänglich zu machen.
                </p>

                <h2>Stand der Vereinbarkeit</h2>
                <p>
                    Diese Website ist mit den geltenden Richtlinien für Barrierefreiheit
                    weitestgehend vereinbar.
                </p>

                <h2>Maßnahmen</h2>
                <ul>
                    <li>Verwendung von kontrastreichen Farben für Textelemente.</li>
                    <li>Skalierbare Schriftgrößen.</li>
                    <li>Alternative Texte für Bilder und Grafiken.</li>
                    <li>Tastaturnavigation für interaktive Elemente.</li>
                </ul>

                <h2>Kontakt und Feedback</h2>
                <p>
                    Sollten dir Mängel in Bezug auf die barrierefreie Gestaltung auffallen,
                    kannst du dich jederzeit unter <strong>hello@coffee4money.de</strong> bei uns melden.
                </p>
            </article>
            </main>
            
            <Footer />
        </>
    );
}