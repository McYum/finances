"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { APIStatusBanner } from "./APIStatusBanner";
import { ETFControls } from "./ETFControls";
import { ETFLineChart } from "./ETFLineChart";
import { ETFPieChart } from "./ETFPieChart";
import { generateHistoricalData } from "@/lib/calculations";
import {
    AVAILABLE_ETFS,
    MOCK_ETF_DATA,
    COFFEE_PRICE,
    WEEKS_PER_YEAR
} from "@/constants/stocks";

export function ETFCalculator() {
    const [selectedETF, setSelectedETF] = useState<string>("QQQ");
    const [stockData, setStockData] = useState<any[]>([]);
    const [etfInfo, setEtfInfo] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [coffeesPerWeek, setCoffeesPerWeek] = useState<number>(4);
    const [selectedYears, setSelectedYears] = useState<number>(30);
    const [usingMockData, setUsingMockData] = useState<boolean>(false);
    const [apiStatus, setApiStatus] = useState<'loading' | 'api' | 'mock' | null>(null);

    const yearlyInvestment = coffeesPerWeek * COFFEE_PRICE * WEEKS_PER_YEAR;
    const currentETF = AVAILABLE_ETFS.find(s => s.symbol === selectedETF);
    const currentAvgReturn = currentETF?.avgReturn || 0.08;

    useEffect(() => {
        fetchETFData();
    }, [selectedETF, selectedYears, coffeesPerWeek]);

    const fetchETFData = async () => {
        setLoading(true);
        setApiStatus('loading');

        /*
        // Real API - commented to preserve API calls during development/demo
        try {
            const apiUrl = `${ALPHA_VANTAGE_BASE_URL}?function=ETF_PROFILE&symbol=${selectedETF}&apikey=${ALPHA_VANTAGE_API_KEY}`;
            console.log("Fetching ETF data from API:", apiUrl);

            const response = await fetch(apiUrl);
            const data = await response.json();

            console.log("API Response:", data);

            // Check for API limit/error
            if (data["Note"] || data["Information"] || data["Error Message"]) {
                console.warn("API limit or error:", data["Note"] || data["Information"] || data["Error Message"]);
                throw new Error("API limit reached or error");
            }

            if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
                console.warn("Empty API response");
                throw new Error("Empty API response");
            }

            // Parse API data
            console.log("Valid API data received");
            setEtfInfo({
                symbol: selectedETF,
                expenseRatio: data.expense_ratio || "N/A",
                dividendYield: data.dividend_yield || "N/A",
                inceptionDate: data.inception_date || "N/A",
                netAssets: data.net_assets || "N/A"
            });

            setUsingMockData(false);
            setApiStatus('api');

            const historicalData = generateHistoricalData(
                selectedYears,
                coffeesPerWeek,
                currentAvgReturn,
                COFFEE_PRICE,
                WEEKS_PER_YEAR
            );
            setStockData(historicalData);

            console.log("Successfully loaded from API");
            setLoading(false);
            return;
        } catch (error) {
            console.error("API error, falling back to mock data:", error);
        }
        */

        // Mock data mode (for development/demo)
        console.log("Loading demo data for:", selectedETF);
        await new Promise(resolve => setTimeout(resolve, 300));
        loadMockData();
        setLoading(false);
    };

    const loadMockData = () => {
        const mockData = MOCK_ETF_DATA[selectedETF] || MOCK_ETF_DATA["QQQ"];

        console.log("Mock data loaded:", mockData);

        setEtfInfo({
            symbol: selectedETF,
            price: mockData.price,
            expenseRatio: mockData.expenseRatio,
            dividendYield: mockData.dividendYield,
            inceptionDate: mockData.inceptionDate
        });

        setUsingMockData(true);
        setApiStatus('mock');

        const historicalData = generateHistoricalData(
            selectedYears,
            coffeesPerWeek,
            currentAvgReturn,
            COFFEE_PRICE,
            WEEKS_PER_YEAR
        );
        setStockData(historicalData);
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
        }).format(value);
    };

    return (
        <section className="pb-12 px-6">
            <div className="max-w-6xl mx-auto">
                <APIStatusBanner apiStatus={apiStatus} usingMockData={usingMockData} />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-paper border-2 border-coffee-dark rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(45,27,14,0.3)]"
                >
                    <ETFControls
                        selectedETF={selectedETF}
                        setSelectedETF={setSelectedETF}
                        availableETFs={AVAILABLE_ETFS}
                        currentETF={currentETF}
                        etfInfo={etfInfo}
                        currentAvgReturn={currentAvgReturn}
                        selectedYears={selectedYears}
                        setSelectedYears={setSelectedYears}
                        coffeesPerWeek={coffeesPerWeek}
                        setCoffeesPerWeek={setCoffeesPerWeek}
                        yearlyInvestment={yearlyInvestment}
                        formatCurrency={formatCurrency}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <ETFLineChart
                                loading={loading}
                                stockData={stockData}
                                formatCurrency={formatCurrency}
                            />
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            <ETFPieChart
                                stockData={stockData}
                                formatCurrency={formatCurrency}
                            />
                        </div>
                    </div>

                    {/* Info notice */}
                    <div className="mt-4 p-3 bg-cream/50 border-2 border-coffee-dark/20 rounded-xl">
                        <p className="text-sm text-coffee-medium text-center">
                            <span className="font-bold">Hinweis:</span> Diese Simulation zeigt, was passiert <span className="font-bold">wäre</span>, wenn du vor {selectedYears} Jahren angefangen hättest, monatlich dein Kaffee-Geld in den {currentETF?.symbol} ETF zu investieren (basierend auf ~{(currentAvgReturn * 100).toFixed(0)}% p.a. Durchschnittsrendite).
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

