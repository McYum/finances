"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { LineChart as LineChartIcon } from "lucide-react";
import { YearButton } from "./YearButton";
import { CoffeeSlider } from "./CoffeeSlider";
import { generateHistoricalData } from "@/lib/calculations";
import { AVAILABLE_STOCKS, MOCK_STOCK_PRICES, COFFEE_PRICE, WEEKS_PER_YEAR } from "@/constants/stocks";

export function StockCalculator() {
    const [selectedStock, setSelectedStock] = useState<string>("AAPL");
    const [stockData, setStockData] = useState<any[]>([]);
    const [stockInfo, setStockInfo] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [coffeesPerWeek, setCoffeesPerWeek] = useState<number>(4);
    const [selectedYears, setSelectedYears] = useState<number>(30);

    const yearlyInvestment = coffeesPerWeek * COFFEE_PRICE * WEEKS_PER_YEAR;
    const currentStock = AVAILABLE_STOCKS.find(s => s.symbol === selectedStock);
    const currentAvgReturn = currentStock?.avgReturn || 0.08;

    useEffect(() => {
        fetchStockData();
    }, [selectedStock, selectedYears, coffeesPerWeek]);

    const fetchStockData = async () => {
        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            const currentPrice = MOCK_STOCK_PRICES[selectedStock] || 100;

            setStockInfo({
                price: currentPrice,
                symbol: selectedStock
            });

            const data = generateHistoricalData(
                selectedYears,
                coffeesPerWeek,
                currentAvgReturn,
                COFFEE_PRICE,
                WEEKS_PER_YEAR
            );
            setStockData(data);
        } catch (error) {
            console.error("Error loading stock data:", error);
            const fallbackData = { price: 100, symbol: selectedStock };
            setStockInfo(fallbackData);

            const data = generateHistoricalData(
                selectedYears,
                coffeesPerWeek,
                currentAvgReturn,
                COFFEE_PRICE,
                WEEKS_PER_YEAR
            );
            setStockData(data);
        } finally {
            setLoading(false);
        }

        /*
        // Real API (commented out to preserve API limits)
        // Activate this only when you need real data:

        try {
            const response = await fetch(
                `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${selectedStock}&apikey=GT2DMV2DS3MS6VFH`
            );
            const data = await response.json();

            if (data["Monthly Time Series"]) {
                const timeSeries = data["Monthly Time Series"];
                const dates = Object.keys(timeSeries).sort();
                const latestDate = dates[dates.length - 1];
                const currentPrice = parseFloat(timeSeries[latestDate]["4. close"]);

                setStockInfo({
                    price: currentPrice,
                    symbol: data["Meta Data"]["2. Symbol"]
                });

                generateHistoricalDataFromReal(timeSeries, dates, currentPrice);
            }
        } catch (error) {
            console.error("API Error:", error);
        }
        */
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
        }).format(value);
    };

    return (
        <section className="py-16 px-6 bg-cream/30">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-paper border-2 border-coffee-dark rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(45,27,14,0.3)]"
                >
                    {/* Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Stock selection */}
                        <div>
                            <select
                                value={selectedStock}
                                onChange={(e) => setSelectedStock(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-coffee-dark rounded-xl bg-cream text-coffee-dark font-semibold focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                            >
                                {AVAILABLE_STOCKS.map((stock) => (
                                    <option key={stock.symbol} value={stock.symbol}>
                                        {stock.symbol} - {stock.name}
                                    </option>
                                ))}
                            </select>
                            <div className="mt-3">
                                <p className="text-lg font-porter text-coffee-dark">{currentStock?.name}</p>
                                {stockInfo && stockInfo.price && (
                                    <p className="text-sm text-coffee-medium">
                                        Aktuell: ${stockInfo.price.toFixed(2)}
                                    </p>
                                )}
                                <p className="text-green-700 font-bold">
                                    ~{(currentAvgReturn * 100).toFixed(0)}% p.a. (historisch)
                                </p>
                            </div>
                        </div>

                        {/* Year buttons */}
                        <div className="flex items-center justify-center gap-3">
                            {[20, 30, 40].map((year) => (
                                <YearButton
                                    key={year}
                                    year={year}
                                    isSelected={selectedYears === year}
                                    onClick={() => setSelectedYears(year)}
                                />
                            ))}
                        </div>

                        {/* Coffee slider */}
                        <div>
                            <label className="block text-lg font-bold text-coffee-dark mb-4 text-center">
                                Tassen Kaffee pro Woche
                            </label>
                            <CoffeeSlider
                                value={coffeesPerWeek}
                                onChange={setCoffeesPerWeek}
                            />
                            <p className="text-sm text-coffee-medium text-center mt-4">
                                = {formatCurrency(yearlyInvestment)} / Jahr
                            </p>
                        </div>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Line Chart */}
                        <div className="lg:col-span-2">
                            {loading ? (
                                <div className="h-96 flex items-center justify-center">
                                    <div className="text-coffee-medium text-lg">Lade Daten...</div>
                                </div>
                            ) : stockData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={400}>
                                    <LineChart data={stockData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#d4a373" opacity={0.3} />
                                        <XAxis
                                            dataKey="year"
                                            stroke="#2d1b0e"
                                            style={{ fontSize: '12px', fontWeight: 'bold' }}
                                            tickFormatter={(value) => value.slice(-2)}
                                        />
                                        <YAxis
                                            stroke="#2d1b0e"
                                            style={{ fontSize: '12px', fontWeight: 'bold' }}
                                            tickFormatter={(value: number) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value.toString()}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#fef9f3',
                                                border: '2px solid #2d1b0e',
                                                borderRadius: '12px',
                                                fontWeight: 'bold',
                                            }}
                                            formatter={(value: number) => formatCurrency(value)}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#c44536"
                                            strokeWidth={3}
                                            dot={{ fill: '#c44536', r: 4, stroke: '#c44536' }}
                                            activeDot={{ r: 6, fill: '#c44536' }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-96 flex items-center justify-center">
                                    <div className="text-center text-coffee-medium">
                                        <LineChartIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                        <p className="text-lg">Keine Daten verfügbar</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Pie Chart */}
                        <div className="flex flex-col items-center justify-center">
                            {stockData.length > 0 && (
                                <>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={[
                                                    { name: 'Selbst investiert', value: stockData[stockData.length - 1].invested },
                                                    { name: 'ZinesZins', value: stockData[stockData.length - 1].value - stockData[stockData.length - 1].invested }
                                                ]}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={100}
                                                paddingAngle={0}
                                                dataKey="value"
                                                startAngle={90}
                                                endAngle={-270}
                                            >
                                                <Cell fill="#e8d5c4" stroke="#2d1b0e" strokeWidth={2} />
                                                <Cell fill="#d4a373" stroke="#2d1b0e" strokeWidth={2} />
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>

                                    <div className="text-center space-y-2 -mt-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 bg-[#e8d5c4] border-2 border-coffee-dark rounded"></div>
                                            <span className="text-coffee-dark font-bold">
                                                {formatCurrency(stockData[stockData.length - 1].invested)} selbst investiert
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 bg-[#d4a373] border-2 border-coffee-dark rounded"></div>
                                            <span className="text-coffee-dark font-bold">
                                                {formatCurrency(stockData[stockData.length - 1].value - stockData[stockData.length - 1].invested)} ZinesZins
                                            </span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Info notice */}
                    <div className="mt-6 p-4 bg-cream/50 border-2 border-coffee-dark/20 rounded-xl">
                        <p className="text-sm text-coffee-medium text-center">
                            💡 <span className="font-bold">Hinweis:</span> Diese Simulation zeigt, was passiert <span className="font-bold">wäre</span>, wenn du vor {selectedYears} Jahren angefangen hättest, monatlich dein Kaffee-Geld in {currentStock?.name} zu investieren (basierend auf historischen Kursen mit ~{(currentAvgReturn * 100).toFixed(0)}% p.a. Durchschnittsrendite).
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

