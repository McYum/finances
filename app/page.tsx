import { Header } from "@/components/layout/Header";
import { StorySection } from "@/components/sections/StorySection";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

export default function Home() {
    return (
        <main className="min-h-screen bg-paper overflow-x-hidden selection:bg-gold selection:text-coffee-dark">
            <Header />

            {/* SECTION 1: HERO */}
            <HeroSection />
            <StorySection />

            {/* SECTION 2: SO FUNKTIONIERT'S (Platzhalter für Scrolling) */}
            <section id="how-it-works" className="py-32 bg-white border-y-2 border-coffee-dark/10">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-4xl font-serif font-bold mb-6">Wie geht das?</h2>
                    <p className="text-xl text-gray-600">Hier kommt später die Erklärung mit dem Baum 🌳</p>
                    <div className="h-64 mt-10 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                        Platzhalter Grafik
                    </div>
                </div>
            </section>

            {/* SECTION 3: RECHNER (Platzhalter) */}
            <section id="calculator" className="py-32 bg-paper px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-serif font-bold mb-6">Zins-Rechner</h2>
                    <p>Berechne dein Vermögen...</p>
                </div>
            </section>

            {/* SECTION 4: NEWSLETTER */}
            <div id="newsletter">
                <NewsletterSection />
            </div>

            <Footer />
        </main>
    );
}