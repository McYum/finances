// API Configuration
export const ALPHA_VANTAGE_API_KEY = "7VCOYYG0OQIY65LB";
export const ALPHA_VANTAGE_BASE_URL = "https://www.alphavantage.co/query";

// Available ETFs
export const AVAILABLE_ETFS = [
    { symbol: "QQQ", name: "Invesco QQQ Trust (NASDAQ-100)", avgReturn: 0.14 },
    { symbol: "SPY", name: "SPDR S&P 500 ETF Trust", avgReturn: 0.10 },
    { symbol: "VOO", name: "Vanguard S&P 500 ETF", avgReturn: 0.10 },
    { symbol: "VTI", name: "Vanguard Total Stock Market ETF", avgReturn: 0.09 },
    { symbol: "IWM", name: "iShares Russell 2000 ETF", avgReturn: 0.08 },
    { symbol: "DIA", name: "SPDR Dow Jones Industrial Average ETF", avgReturn: 0.09 },
    { symbol: "ARKK", name: "ARK Innovation ETF", avgReturn: 0.12 },
];

// Mock ETF data (fallback when API limit reached)
export const MOCK_ETF_DATA: { [key: string]: { price: number; expenseRatio: string; dividendYield: string; inceptionDate: string } } = {
    "QQQ": { price: 520.45, expenseRatio: "0.20%", dividendYield: "0.46%", inceptionDate: "1999-03-10" },
    "SPY": { price: 478.20, expenseRatio: "0.09%", dividendYield: "1.32%", inceptionDate: "1993-01-22" },
    "VOO": { price: 439.80, expenseRatio: "0.03%", dividendYield: "1.35%", inceptionDate: "2010-09-07" },
    "VTI": { price: 268.50, expenseRatio: "0.03%", dividendYield: "1.28%", inceptionDate: "2001-05-24" },
    "IWM": { price: 198.30, expenseRatio: "0.19%", dividendYield: "1.15%", inceptionDate: "2000-05-22" },
    "DIA": { price: 389.60, expenseRatio: "0.16%", dividendYield: "1.65%", inceptionDate: "1998-01-14" },
    "ARKK": { price: 52.80, expenseRatio: "0.75%", dividendYield: "0.00%", inceptionDate: "2014-10-31" },
};

export const COFFEE_PRICE = 3; // €/coffee
export const WEEKS_PER_YEAR = 52;

