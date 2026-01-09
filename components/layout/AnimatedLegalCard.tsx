"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export function AnimatedLegalCard({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 1
            }}
            className="bg-white p-8 md:p-16 rounded-2xl border-2 border-[#2D2A26] shadow-[8px_8px_0px_0px_#2D2A26]"
        >
            <article className="prose prose-stone prose-lg max-w-none
        prose-headings:font-serif prose-headings:font-normal prose-headings:text-[#2D2A26]
        prose-p:text-gray-600 prose-li:text-gray-600
        prose-a:text-[#d48c55] hover:prose-a:text-[#b06d3b] prose-a:no-underline hover:prose-a:underline">
                {children}
            </article>
        </motion.div>
    );
}