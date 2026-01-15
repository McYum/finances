"use client";

import { YearButton } from "./YearButton";
import { CoffeeSlider } from "./CoffeeSlider";

interface ETFControlsProps {
    selectedETF: string;
    setSelectedETF: (etf: string) => void;
    availableETFs: Array<{ symbol: string; name: string; avgReturn: number }>;
    currentETF: { symbol: string; name: string; avgReturn: number } | undefined;
    etfInfo: any;
    currentAvgReturn: number;
    selectedYears: number;
    setSelectedYears: (years: number) => void;
    coffeesPerWeek: number;
    setCoffeesPerWeek: (coffees: number) => void;
    yearlyInvestment: number;
    formatCurrency: (value: number) => string;
}

export function ETFControls({
    selectedETF,
    setSelectedETF,
    availableETFs,
    currentETF,
    etfInfo,
    currentAvgReturn,
    selectedYears,
    setSelectedYears,
    coffeesPerWeek,
    setCoffeesPerWeek,
    yearlyInvestment,
    formatCurrency
}: ETFControlsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* ETF selection */}
            <div>
                <select
                    value={selectedETF}
                    onChange={(e) => setSelectedETF(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-coffee-dark rounded-xl bg-cream text-coffee-dark font-semibold focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                >
                    {availableETFs.map((etf) => (
                        <option key={etf.symbol} value={etf.symbol}>
                            {etf.symbol} - {etf.name}
                        </option>
                    ))}
                </select>
                <div className="mt-3">
                    {etfInfo && (
                        <div className="text-sm text-coffee-medium space-y-0 leading-snug">
                            {etfInfo.price && <p>Kurs: ${etfInfo.price.toFixed(2)}</p>}
                            <p>TER: {etfInfo.expenseRatio}</p>
                            <p>Dividende: {etfInfo.dividendYield}</p>
                        </div>
                    )}
                    <p className="text-green-700 font-bold mt-2">
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
    );
}

