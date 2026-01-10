"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import { RetroButton } from "@/components/ui/RetroButton";
import { TrendingUp, PiggyBank, Calculator, LineChart as LineChartIcon } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

function YearButton({ year, isSelected, onClick }: { year: number; isSelected: boolean; onClick: () => void }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const springStyles = useSpring({
        scale: isPressed ? 0.95 : isHovered ? 1.05 : 1,
        y: isPressed ? 4 : isHovered ? -3 : 0,
        config: { mass: 1, tension: 280, friction: 18 },
    });

    return (
        <animated.button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            style={springStyles}
            className={`px-6 py-3 border-2 border-coffee-dark rounded-xl font-bold transition-colors duration-200 ${
                isSelected
                    ? 'bg-gold text-coffee-dark shadow-[3px_3px_0px_0px_rgba(45,27,14,0.5)]'
                    : 'bg-cream text-coffee-dark shadow-[3px_3px_0px_0px_rgba(45,27,14,0.3)]'
            }`}
        >
            {year} Jahre
        </animated.button>
    );
}

export default function ZinsrechnerPage() {
    // States: Stock Calculator
    const [selectedStock, setSelectedStock] = useState<string>("AAPL");
    const [stockData, setStockData] = useState<any[]>([]);
    const [stockInfo, setStockInfo] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [coffeesPerWeek, setCoffeesPerWeek] = useState<number>(4);
    const [selectedYears, setSelectedYears] = useState<number>(30);

    const coffeePrice = 3; // €/Kaffee
    const weeksPerYear = 52;
    const yearlyInvestment = coffeesPerWeek * coffeePrice * weeksPerYear;

    // States: Zinsrechner
    const [startkapital, setStartkapital] = useState<string>("10000");
    const [monatlicheRate, setMonatlicheRate] = useState<string>("200");
    const [zinssatz, setZinssatz] = useState<string>("5");
    const [laufzeit, setLaufzeit] = useState<string>("10");
    const [ergebnis, setErgebnis] = useState<{
        endkapital: number;
        eingezahlt: number;
        zinsen: number;
    } | null>(null);

    // Aktien & Renditen
    const availableStocks = [
        { symbol: "AAPL", name: "Apple Inc.", avgReturn: 0.12 },
        { symbol: "TSLA", name: "Tesla Inc.", avgReturn: 0.15 },
        { symbol: "MSFT", name: "Microsoft Corp.", avgReturn: 0.11 },
        { symbol: "GOOGL", name: "Alphabet Inc.", avgReturn: 0.10 },
        { symbol: "AMZN", name: "Amazon.com Inc.", avgReturn: 0.13 },
        { symbol: "NVDA", name: "NVIDIA Corp.", avgReturn: 0.16 },
        { symbol: "META", name: "Meta Platforms Inc.", avgReturn: 0.11 },
    ];

    const currentStock = availableStocks.find(s => s.symbol === selectedStock);
    const currentAvgReturn = currentStock?.avgReturn || 0.08;

    // Lade Aktiendaten
    useEffect(() => {
        fetchStockData();
    }, [selectedStock, selectedYears, coffeesPerWeek]);

    const fetchStockData = async () => {
        setLoading(true);

        const mockStockPrices: { [key: string]: number } = {
            "AAPL": 185.50,
            "TSLA": 248.30,
            "MSFT": 375.20,
            "GOOGL": 140.80,
            "AMZN": 178.60,
            "NVDA": 495.20,
            "META": 485.30
        };

        await new Promise(resolve => setTimeout(resolve, 500)); // Loading animation

        try {
            const currentPrice = mockStockPrices[selectedStock] || 100;

            setStockInfo({
                price: currentPrice,
                symbol: selectedStock
            });

            generateHistoricalDataFallback();
        } catch (error) {
            console.error("Fehler beim Laden der Aktiendaten:", error);
            const fallbackData = { price: 100, symbol: selectedStock };
            setStockInfo(fallbackData);
            generateHistoricalDataFallback();
        } finally {
            setLoading(false);
        }

        /*
        // Echte API (auskommentiert um API-Limit zu schonen)
        // Aktiviere dies nur wenn du echte Daten brauchst:

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

    const generateHistoricalDataFromReal = (timeSeries: any, dates: string[], currentPrice: number) => {
        const tenYearsAgo = new Date();
        tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);

        let oldestPrice = currentPrice;
        let oldestDate = new Date();

        for (const date of dates) {
            const dateObj = new Date(date);
            if (dateObj <= tenYearsAgo) {
                oldestPrice = parseFloat(timeSeries[date]["4. close"]);
                oldestDate = dateObj;
                break;
            }
        }

        // CAGR
        const years = (new Date().getTime() - oldestDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
        const actualReturn = Math.pow(currentPrice / oldestPrice, 1 / years) - 1;
        const avgAnnualReturn = Math.min(actualReturn, currentAvgReturn);
        const monthlyReturn = Math.pow(1 + avgAnnualReturn, 1/12) - 1;

        const historicalData = [];
        const monthlyInvest = (coffeesPerWeek * coffeePrice * weeksPerYear) / 12;

        for (let i = 0; i <= selectedYears; i += 5) {
            const year = new Date().getFullYear() + i;
            const months = i * 12;
            const totalInvested = monthlyInvest * months;

            let futureValue = 0;
            if (months > 0) {
                // FV = PMT × [(1+r)^n - 1] / r
                futureValue = monthlyInvest * (Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn;
            }

            historicalData.push({
                year: year.toString(),
                Wert: Math.round(futureValue),
                Investiert: Math.round(totalInvested),
            });
        }

        setStockData(historicalData);
    };

    const generateHistoricalDataFallback = () => {
        const monthlyReturn = Math.pow(1 + currentAvgReturn, 1/12) - 1;
        const monthlyInvest = (coffeesPerWeek * coffeePrice * weeksPerYear) / 12;

        const historicalData = [];

        for (let i = 0; i <= selectedYears; i += 5) {
            const year = new Date().getFullYear() + i;
            const months = i * 12;
            const totalInvested = monthlyInvest * months;

            let futureValue = 0;
            if (months > 0) {
                // FV = PMT × [(1+r)^n - 1] / r
                futureValue = monthlyInvest * (Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn;
            }

            historicalData.push({
                year: year.toString(),
                Wert: Math.round(futureValue),
                Investiert: Math.round(totalInvested),
            });
        }

        setStockData(historicalData);
    };

    const berechneZinseszins = () => {
        const K0 = parseFloat(startkapital) || 0;
        const R = parseFloat(monatlicheRate) || 0;
        const p = parseFloat(zinssatz) || 0;
        const n = parseFloat(laufzeit) || 0;

        const r = p / 100 / 12; // Monatszins
        const m = n * 12; // Monate

        // K_n = K_0 * (1+r)^m + R * ((1+r)^m - 1) / r
        const faktor = Math.pow(1 + r, m);
        const endkapitalAusStartkapital = K0 * faktor;
        const endkapitalAusRaten = r !== 0 ? R * (faktor - 1) / r : R * m;
        const endkapital = endkapitalAusStartkapital + endkapitalAusRaten;

        const eingezahlt = K0 + R * m;
        const zinsen = endkapital - eingezahlt;

        setErgebnis({
            endkapital: Math.round(endkapital * 100) / 100,
            eingezahlt: Math.round(eingezahlt * 100) / 100,
            zinsen: Math.round(zinsen * 100) / 100,
        });
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
        }).format(value);
    };

    return (
        <main className="min-h-screen bg-paper overflow-x-hidden selection:bg-gold selection:text-coffee-dark">
            <Header />

            {/* Hero */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-porter text-coffee-dark mb-6">
                            Zinsrechner
                        </h1>
                        <p className="text-xl text-coffee-medium max-w-2xl mx-auto mb-8">
                            Berechne, wie dein Vermögen mit der Zeit wächst. Der Zinseszins-Effekt macht
                            aus kleinen Beträgen große Summen!
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stock Calculator */}
            <section className="py-16 px-6 bg-cream/30">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-paper border-2 border-coffee-dark rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(45,27,14,0.3)]"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {/* Aktienauswahl */}
                            <div>
                                <select
                                    value={selectedStock}
                                    onChange={(e) => setSelectedStock(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-coffee-dark rounded-xl bg-cream text-coffee-dark font-semibold focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                                >
                                    {availableStocks.map((stock) => (
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

                            {/* Jahre-Buttons */}
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

                            {/* Kaffee-Slider */}
                            <div>
                                <label className="block text-lg font-bold text-coffee-dark mb-4 text-center">
                                    Tassen Kaffee pro Woche
                                </label>
                                <div className="relative w-full h-8">
                                    <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-coffee-dark/20 rounded-full"></div>
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 h-2 bg-coffee-dark rounded-full"
                                        style={{ width: `${((coffeesPerWeek - 1) / 19) * 100}%` }}
                                    ></div>
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-coffee-dark rounded-full flex items-center justify-center cursor-pointer shadow-lg border-2 border-paper"
                                        style={{ left: `calc(${((coffeesPerWeek - 1) / 19) * 100}% - 20px)` }}
                                    >
                                        <span className="text-paper font-bold text-lg">{coffeesPerWeek}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="20"
                                        value={coffeesPerWeek}
                                        onChange={(e) => setCoffeesPerWeek(parseInt(e.target.value))}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </div>
                                <p className="text-sm text-coffee-medium text-center mt-4">
                                    = {formatCurrency(yearlyInvestment)} / Jahr
                                </p>
                            </div>
                        </div>

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
                                                dataKey="Wert"
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
                                                        { name: 'Selbst investiert', value: stockData[stockData.length - 1].Investiert },
                                                        { name: 'ZinesZins', value: stockData[stockData.length - 1].Wert - stockData[stockData.length - 1].Investiert }
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
                                                    {formatCurrency(stockData[stockData.length - 1].Investiert)} selbst investiert
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-4 h-4 bg-[#d4a373] border-2 border-coffee-dark rounded"></div>
                                                <span className="text-coffee-dark font-bold">
                                                    {formatCurrency(stockData[stockData.length - 1].Wert - stockData[stockData.length - 1].Investiert)} ZinesZins
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Hinweis */}
                        <div className="mt-6 p-4 bg-cream/50 border-2 border-coffee-dark/20 rounded-xl">
                            <p className="text-sm text-coffee-medium text-center">
                                💡 <span className="font-bold">Hinweis:</span> Diese Simulation basiert auf der historischen durchschnittlichen Rendite von {currentStock?.name} (~{(currentAvgReturn * 100).toFixed(0)}% p.a.).
                                Vergangene Performance ist keine Garantie für zukünftige Ergebnisse.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Zinsrechner */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Input */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-cream border-2 border-coffee-dark rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(45,27,14,0.3)]"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <Calculator className="w-8 h-8 text-coffee-dark" />
                                <h2 className="text-2xl font-porter text-coffee-dark">Deine Eingaben</h2>
                            </div>

                            <div className="space-y-6">
                                {/* Startkapital */}
                                <div>
                                    <label className="block text-sm font-bold text-coffee-dark mb-2 uppercase tracking-wide">
                                        Startkapital (€)
                                    </label>
                                    <input
                                        type="number"
                                        value={startkapital}
                                        onChange={(e) => setStartkapital(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-coffee-dark rounded-xl bg-paper text-coffee-dark font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                                        placeholder="10000"
                                    />
                                </div>

                                {/* Monatliche Rate */}
                                <div>
                                    <label className="block text-sm font-bold text-coffee-dark mb-2 uppercase tracking-wide">
                                        Monatliche Sparrate (€)
                                    </label>
                                    <input
                                        type="number"
                                        value={monatlicheRate}
                                        onChange={(e) => setMonatlicheRate(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-coffee-dark rounded-xl bg-paper text-coffee-dark font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                                        placeholder="200"
                                    />
                                </div>

                                {/* Zinssatz */}
                                <div>
                                    <label className="block text-sm font-bold text-coffee-dark mb-2 uppercase tracking-wide">
                                        Jährlicher Zinssatz (%)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={zinssatz}
                                        onChange={(e) => setZinssatz(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-coffee-dark rounded-xl bg-paper text-coffee-dark font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                                        placeholder="5"
                                    />
                                </div>

                                {/* Laufzeit */}
                                <div>
                                    <label className="block text-sm font-bold text-coffee-dark mb-2 uppercase tracking-wide">
                                        Laufzeit (Jahre)
                                    </label>
                                    <input
                                        type="number"
                                        value={laufzeit}
                                        onChange={(e) => setLaufzeit(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-coffee-dark rounded-xl bg-paper text-coffee-dark font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                                        placeholder="10"
                                    />
                                </div>

                                <RetroButton onClick={berechneZinseszins} className="w-full">
                                    Jetzt berechnen
                                </RetroButton>
                            </div>
                        </motion.div>

                        {/* Results */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-gradient-to-br from-gold to-amber-200 border-2 border-coffee-dark rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(45,27,14,0.3)]"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <TrendingUp className="w-8 h-8 text-coffee-dark" />
                                <h2 className="text-2xl font-porter text-coffee-dark">Dein Ergebnis</h2>
                            </div>

                            {ergebnis ? (
                                <div className="space-y-6">
                                    {/* Endkapital */}
                                    <div className="bg-paper border-2 border-coffee-dark rounded-xl p-6">
                                        <div className="text-sm font-bold text-coffee-medium mb-2 uppercase tracking-wide">
                                            Endkapital
                                        </div>
                                        <div className="text-4xl font-porter text-coffee-dark">
                                            {formatCurrency(ergebnis.endkapital)}
                                        </div>
                                    </div>

                                    {/* Eingezahlt */}
                                    <div className="bg-paper border-2 border-coffee-dark rounded-xl p-6">
                                        <div className="text-sm font-bold text-coffee-medium mb-2 uppercase tracking-wide">
                                            Eingezahlt
                                        </div>
                                        <div className="text-2xl font-bold text-coffee-dark">
                                            {formatCurrency(ergebnis.eingezahlt)}
                                        </div>
                                    </div>

                                    {/* Zinsen */}
                                    <div className="bg-cream border-2 border-coffee-dark rounded-xl p-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <PiggyBank className="w-5 h-5 text-coffee-dark" />
                                            <div className="text-sm font-bold text-coffee-medium uppercase tracking-wide">
                                                Gewinn durch Zinsen
                                            </div>
                                        </div>
                                        <div className="text-3xl font-porter text-green-700">
                                            +{formatCurrency(ergebnis.zinsen)}
                                        </div>
                                    </div>

                                    {/* Prozentsatz */}
                                    <div className="text-center pt-4 border-t-2 border-coffee-dark/20">
                                        <p className="text-sm text-coffee-medium">
                                            Das sind{" "}
                                            <span className="font-bold text-coffee-dark text-lg">
                                                {((ergebnis.zinsen / ergebnis.eingezahlt) * 100).toFixed(1)}%
                                            </span>{" "}
                                            mehr als eingezahlt!
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full flex items-center justify-center">
                                    <div className="text-center text-coffee-medium">
                                        <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                        <p className="text-lg">
                                            Gib deine Werte ein und klicke auf "Jetzt berechnen"
                                        </p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Info */}
            <section className="py-16 px-6 bg-cream/50">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="bg-paper border-2 border-coffee-dark rounded-2xl p-8 shadow-[4px_4px_0px_0px_rgba(45,27,14,0.2)]"
                    >
                        <h3 className="text-2xl font-porter text-coffee-dark mb-4">
                            Was ist der Zinseszins-Effekt?
                        </h3>
                        <p className="text-coffee-medium leading-relaxed mb-4">
                            Der Zinseszins-Effekt beschreibt das exponentielle Wachstum deines Kapitals. Du erhältst
                            nicht nur Zinsen auf dein eingezahltes Geld, sondern auch Zinsen auf die bereits
                            erhaltenen Zinsen!
                        </p>
                        <p className="text-coffee-medium leading-relaxed">
                            Je länger du sparst, desto stärker wird dieser Effekt. Deshalb lohnt es sich, früh
                            anzufangen – selbst mit kleinen Beträgen. Zeit ist beim Vermögensaufbau dein bester
                            Freund!
                        </p>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

