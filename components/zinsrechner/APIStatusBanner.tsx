"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface APIStatusBannerProps {
    apiStatus: 'loading' | 'api' | 'mock' | null;
    usingMockData: boolean;
}

export function APIStatusBanner({ apiStatus, usingMockData }: APIStatusBannerProps) {
    if (apiStatus === 'api' && !usingMockData) {
        return (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-green-100 border-2 border-green-500 rounded-xl flex items-center gap-3"
            >
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-sm text-green-800">
                    <span className="font-bold">Live-Daten:</span> Verbunden mit Alpha Vantage API - Echte ETF-Daten werden angezeigt
                </p>
            </motion.div>
        );
    }

    if (usingMockData) {
        return (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-amber-100 border-2 border-amber-500 rounded-xl flex items-center gap-3"
            >
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <p className="text-sm text-amber-800">
                    <span className="font-bold">Demo-Modus:</span> API-Limit erreicht. Es werden Beispieldaten angezeigt.
                </p>
            </motion.div>
        );
    }

    return null;
}

