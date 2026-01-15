import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import localFont from "next/font/local";
import { SmoothScrolling } from "@/components/SmoothScrolling"; // <--- 1. IMPORTIEREN
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const porter = localFont({
    src: "./fonts/porter.otf",
    variable: "--font-porter",
});

export const metadata: Metadata = {
    title: "Coffee4Money",
    description: "Vom Kleingeld zum Vermögen",
    openGraph: {
        title: "Coffee4Money",
        description: "Vom Kleingeld zum Vermögen - Entdecke wie du mit kleinen regelmäßigen Ersparnissen langfristig Vermögen aufbaust",
        type: "website",
        locale: "de_DE",
        url: "https://coffee4money.de",
        images: [
            {
                url: "/images/og-image.png",
                width: 1200,
                height: 630,
                alt: "Coffee4Money - Vom Kleingeld zum Vermögen",
            },
        ],
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="de">
        <body className={`${inter.variable} ${playfair.variable} ${porter.variable} font-sans antialiased`}>
        <SmoothScrolling>
            {children}
        </SmoothScrolling>

        </body>
        </html>
    );
}