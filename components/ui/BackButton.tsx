"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
    href?: string;
    label?: string;
}

export function BackButton({ href = "/", label = "Zurück zur Startseite" }: BackButtonProps) {
    return (
        <div className="px-6 pt-32">
            <div className="max-w-6xl mx-auto mb-8">
                <Link
                    href={href}
                    className="inline-flex items-center gap-2 text-coffee-medium hover:text-coffee-dark transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    <span className="font-bold">{label}</span>
                </Link>
            </div>
        </div>
    );
}

