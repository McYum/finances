import { Header } from "@/components/layout/Header";
import { StorySection } from "@/components/sections/StorySection";
import { HowToSection } from "@/components/sections/HowToSection";
import { QuizSection } from "@/components/sections/QuizSection";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function Home() {
    return (
        <main className="min-h-screen bg-paper overflow-x-hidden selection:bg-gold selection:text-coffee-dark">
            <Header/>
            <HeroSection/>
            <div id="story">
                <StorySection/>
            </div>

            <div id="how-it-works">
                <HowToSection/>
            </div>

            <QuizSection/>

            <div id="calculator">
                <CtaSection/>
            </div>

            <div id="newsletter">
                <NewsletterSection/>
            </div>

            <Footer/>
        </main>
    );
}