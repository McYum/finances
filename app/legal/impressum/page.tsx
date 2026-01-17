"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RetroButton } from "@/components/ui/RetroButton";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Impressum | Coffee4Money",
    description: "Legal notice for Coffee4Money",
};

export default function ImpressumPage() {
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
            <h1>Impressum</h1>

            <section className="mb-8">
                <h2>Angaben gemäß § 5 TMG</h2>
                <p>
                    Coffee4Money
                    <br />
                    Max Mustermann
                    <br />
                    Musterstraße 123
                    <br />
                    12345 Musterstadt
                </p>
            </section>

            <section className="mb-8">
                <h2>Kontakt</h2>
                <p>
                    Telefon: +49 (0) 123 44 55 66
                    <br />
                    E-Mail: hello@coffee4money.de
                </p>
            </section>

            <section className="mb-8">
                <h2>Redaktionell verantwortlich</h2>
                <p>
                    Max Mustermann
                    <br />
                    Musterstraße 123
                    <br />
                    12345 Musterstadt
                </p>
            </section>

            <section className="pt-8 mt-8 border-t border-stone-200 text-sm text-stone-500">
                <p>
                    <strong>Haftungsausschluss:</strong> Die Inhalte dieser Website wurden
                    mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit,
                    Vollständigkeit und Aktualität der Inhalte können wir jedoch keine
                    Gewähr übernehmen.
                </p>
            </section>
                </article>
            </main>
            
            <Footer />
        </>
    );
}