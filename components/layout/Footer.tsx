import Link from "next/link";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        // bg-[#111] macht den Hintergrund fast schwarz, wie im Bild
        <footer className="bg-[#111111] text-white py-12 text-center mt-auto">
            <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-4">

                {/* Copyright Zeile */}
                <p className="text-base font-medium text-white/90">
                    © {currentYear} Coffee4Money All rights reserved.
                </p>

                {/* Links Zeile (mit leichter Transparenz wie im Design) */}
                <div className="flex flex-wrap justify-center gap-6 text-white/60 text-sm">
                    <Link href="/rechtliches" className="hover:text-white transition-colors">
                        Rechtliches
                    </Link>
                    <Link href="/privatsphaere" className="hover:text-white transition-colors">
                        Privatsphäre
                    </Link>
                    <Link href="/barrierefreiheit" className="hover:text-white transition-colors">
                        Barrierefreiheit
                    </Link>
                </div>

            </div>
        </footer>
    );
}