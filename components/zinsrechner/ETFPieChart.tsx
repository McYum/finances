"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface ETFPieChartProps {
    stockData: any[];
    formatCurrency: (value: number) => string;
}

export function ETFPieChart({ stockData, formatCurrency }: ETFPieChartProps) {
    if (stockData.length === 0) {
        return null;
    }

    const lastDataPoint = stockData[stockData.length - 1];
    const invested = lastDataPoint.invested;
    const totalValue = lastDataPoint.value;
    const interest = totalValue - invested;

    return (
        <>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={[
                            { name: 'Selbst investiert', value: invested },
                            { name: 'ZinesZins', value: interest }
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
                        {formatCurrency(invested)} selbst investiert
                    </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 bg-[#d4a373] border-2 border-coffee-dark rounded"></div>
                    <span className="text-coffee-dark font-bold">
                        {formatCurrency(interest)} ZinesZins
                    </span>
                </div>
            </div>
        </>
    );
}

