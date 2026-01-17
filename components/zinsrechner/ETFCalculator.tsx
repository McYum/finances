"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { APIStatusBanner } from "./APIStatusBanner";
import { ETFControls } from "./ETFControls";
import { ETFLineChart } from "./ETFLineChart";
import { ETFPieChart } from "./ETFPieChart";
import { generateHistoricalData } from "@/lib/calculations";
import { validateAPIResponse, extractField } from "@/lib/apiHelpers";
import { apiLogger } from "@/lib/apiLogger";
import { AVAILABLE_ETFS, MOCK_ETF_DATA } from "@/constants/etfs";
import { COFFEE_PRICE, WEEKS_PER_YEAR } from "@/constants/pricing";
import { ALPHA_VANTAGE_API_KEY, ALPHA_VANTAGE_BASE_URL, USE_API } from "@/constants/api";

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
    const currentETF = AVAILABLE_ETFS.find((s: { symbol: string; name: string; avgReturn: number }) => s.symbol === selectedETF);
    const currentAvgReturn = currentETF?.avgReturn || 0.08;

    useEffect(() => {
        fetchETFData();
    }, [selectedETF, selectedYears, coffeesPerWeek]);

    const fetchETFData = async () => {
        setLoading(true);
        setApiStatus('loading');

        if (USE_API) {
            try {
                const apiUrl = `${ALPHA_VANTAGE_BASE_URL}?function=ETF_PROFILE&symbol=${selectedETF}&apikey=${ALPHA_VANTAGE_API_KEY}`;
                apiLogger.request(selectedETF);

                const response = await fetch(apiUrl);
                const data = await response.json();

                const validation = validateAPIResponse(data);
                if (!validation.isValid) {
                    throw new Error(validation.error);
                }

                setEtfInfo({
                    symbol: extractField(data, ["symbol", "Symbol", "SYMBOL"]) !== "N/A"
                        ? extractField(data, ["symbol", "Symbol", "SYMBOL"])
                        : selectedETF,
                    expenseRatio: extractField(data, [
                        "expense_ratio", "expenseRatio", "Expense Ratio",
                        "EXPENSE_RATIO", "expense ratio"
                    ]),
                    dividendYield: extractField(data, [
                        "dividend_yield", "dividendYield", "Dividend Yield",
                        "DIVIDEND_YIELD", "dividend yield"
                    ]),
                    inceptionDate: extractField(data, [
                        "inception_date", "inceptionDate", "Inception Date",
                        "INCEPTION_DATE", "inception date"
                    ]),
                    netAssets: extractField(data, [
                        "net_assets", "netAssets", "Net Assets",
                        "NET_ASSETS", "net assets", "aum", "AUM"
                    ])
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

                apiLogger.success(selectedETF);
                setLoading(false);
                return;
            } catch (error) {
                apiLogger.fallback(error);
            }
        } else {
            apiLogger.demoMode();
        }

        apiLogger.loadingDemo(selectedETF);
        await new Promise(resolve => setTimeout(resolve, 300));
        loadMockData();
        setLoading(false);
    };

    const loadMockData = () => {
        const mockData = MOCK_ETF_DATA[selectedETF] || MOCK_ETF_DATA["QQQ"];


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
        <section className="px-6">
            <div className="max-w-6xl mx-auto">
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

                    <div className="mt-4 p-3 bg-cream/50 border-2 border-coffee-dark/20 rounded-xl">
                        <p className="text-sm text-coffee-medium text-center">
                            <span className="font-bold">Hinweis:</span> Diese Simulation zeigt, was passiert <span className="font-bold">wäre</span>, wenn du vor {selectedYears} Jahren angefangen hättest, monatlich dein Kaffee-Geld in den {currentETF?.symbol} ETF zu investieren (basierend auf ~{(currentAvgReturn * 100).toFixed(0)}% p.a. Durchschnittsrendite).
                        </p>
                    </div>
                </motion.div>

                <APIStatusBanner apiStatus={apiStatus} usingMockData={usingMockData} />
            </div>
        </section>
    );
}

