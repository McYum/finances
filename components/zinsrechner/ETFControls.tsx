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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* ETF selection - Left column */}
            <div className="flex flex-col">
                <select
                    value={selectedETF}
                    onChange={(e) => setSelectedETF(e.target.value)}
                    className="h-[46px] px-4 text-sm border-2 border-coffee-dark rounded-xl bg-cream text-coffee-dark font-semibold focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                >
                    {availableETFs.map((etf) => (
                        <option key={etf.symbol} value={etf.symbol}>
                            {etf.symbol} - {etf.name}
                        </option>
                    ))}
                </select>
                {etfInfo && (
                    <div className="text-xs text-coffee-medium space-y-0 leading-tight mt-2 pl-2">
                        {etfInfo.price && <p>Kurs: ${etfInfo.price.toFixed(2)}</p>}
                        <p>TER: {etfInfo.expenseRatio}</p>
                        <p>Dividende: {etfInfo.dividendYield}</p>
                        <p className="text-green-700 font-bold mt-1">
                            ~{(currentAvgReturn * 100).toFixed(0)}% p.a. (historisch)
                        </p>
                    </div>
                )}
            </div>

            {/* Year buttons - Center column */}
            <div className="flex flex-col">
                <div className="flex items-center justify-center gap-2 h-[46px]">
                    {[20, 30, 40].map((year) => (
                        <YearButton
                            key={year}
                            year={year}
                            isSelected={selectedYears === year}
                            onClick={() => setSelectedYears(year)}
                        />
                    ))}
                </div>
            </div>

            {/* Coffee slider - Right column */}
            <div className="flex flex-col">
                <div className="flex items-center h-[46px]">
                    <CoffeeSlider
                        value={coffeesPerWeek}
                        onChange={setCoffeesPerWeek}
                    />
                </div>
                <p className="text-xs text-coffee-medium text-center mt-2">
                    ☕ {coffeesPerWeek} Kaffee pro Woche = {formatCurrency(yearlyInvestment)} / Jahr
                </p>
            </div>
        </div>
    );
}








