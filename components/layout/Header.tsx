"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useLenis } from "@studio-freight/react-lenis";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
    { label: "START", href: "/#hero" },
    { label: "SO FUNKTIONIERT'S", href: "/#how-it-works" },
    { label: "ZINS-RECHNER", href: "/zinsrechner" },
    { label: "NEWSLETTER", href: "/#newsletter" },
];

function NavButton({ href, children }: { href: string; children: React.ReactNode }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const lenis = useLenis();
    const pathname = usePathname(); // Check where we are

    const springStyles = useSpring({
        scale: isPressed ? 0.95 : isHovered ? 1.05 : 1,
        y: isPressed ? 4 : isHovered ? -3 : 0,
        config: { mass: 1, tension: 280, friction: 18 },
    });

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (pathname === "/" && href.includes("#")) {
            e.preventDefault();
            const id = href.split("#")[1];
            const element = document.getElementById(id);
            if (element && lenis) {
                lenis.scrollTo(element, { offset: -120, duration: 1.2 });
            }
        }
    };

    return (
        <Link href={href} legacyBehavior passHref>
            <animated.a
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                style={springStyles}
                className={cn(
                    "inline-block cursor-pointer select-none text-center",
                    "border-2 border-coffee-dark bg-[#EFE6DD] text-coffee-dark",
                    "px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest",
                    "shadow-[3px_3px_0px_0px_rgba(45,27,14,0.5)]"
                )}
            >
                {children}
            </animated.a>
        </Link>
    );
}

export function Header() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/90 backdrop-blur-sm py-4 px-6 border-b border-coffee-dark/5">
            <div className="max-w-7xl mx-auto flex items-center justify-start gap-8 md:gap-12">
                <Link href="/" className="w-16 h-16 bg-paper border-2 border-coffee-dark rounded-full flex items-center justify-center overflow-hidden shadow-sm shrink-0 relative cursor-pointer">
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={64}
                        height={64}
                        className="object-contain p-2"
                    />
                </Link>

                <div className="hidden md:flex gap-4">
                    {NAV_ITEMS.map((item) => (
                        <NavButton key={item.label} href={item.href}>
                            {item.label}
                        </NavButton>
                    ))}
                </div>
            </div>
        </nav>
    );
}