"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { LineChart as LineChartIcon } from "lucide-react";

interface ETFLineChartProps {
    loading: boolean;
    stockData: any[];
    formatCurrency: (value: number) => string;
}

export function ETFLineChart({ loading, stockData, formatCurrency }: ETFLineChartProps) {
    if (loading) {
        return (
            <div className="h-96 flex items-center justify-center">
                <div className="text-coffee-medium text-lg">Lade Daten...</div>
            </div>
        );
    }

    if (stockData.length === 0) {
        return (
            <div className="h-96 flex items-center justify-center">
                <div className="text-center text-coffee-medium">
                    <LineChartIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Keine Daten verfügbar</p>
                </div>
            </div>
        );
    }

    return (
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
    );
}

