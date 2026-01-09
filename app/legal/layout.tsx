import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedLegalCard } from "@/components/layout/AnimatedLegalCard";

export default function LegalLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#FDFCF8] flex flex-col font-sans selection:bg-[#FFD700] selection:text-[#2D2A26]">
            {/* Header bleibt oben fest */}
            <Header />

            {/* Hauptbereich mit Animation */}
            <main className="flex-grow pt-32 pb-20 px-6 relative z-10">
                <div className="max-w-3xl mx-auto">
                    {/* Hier wird die animierte Karte geladen */}
                    <AnimatedLegalCard>
                        {children}
                    </AnimatedLegalCard>
                </div>
            </main>

            {/* Footer schließt die Seite ab */}
            <Footer />
        </div>
    );
}