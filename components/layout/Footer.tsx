import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-[#1a1918] text-[#FDFCF8] py-12 px-6 border-t border-[#2D2A26]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-sm opacity-80">
                    © {new Date().getFullYear()} Coffee4Money All rights reserved.
                </div>

                <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium">
                    <Link
                        href="/legal/impressum"
                        className="hover:text-[#d48c55] transition-colors duration-200"
                    >
                        Rechtliches
                    </Link>
                    <Link
                        href="/legal/datenschutz"
                        className="hover:text-[#d48c55] transition-colors duration-200"
                    >
                        Privatsphäre
                    </Link>
                    <Link
                        href="/legal/barrierefreiheit"
                        className="hover:text-[#d48c55] transition-colors duration-200"
                    >
                        Barrierefreiheit
                    </Link>
                </nav>
            </div>
        </footer>
    );
}