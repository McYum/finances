interface HistoricalDataPoint {
    year: string;
    value: number;
    invested: number;
}

export function generateHistoricalData(
    selectedYears: number,
    coffeesPerWeek: number,
    avgReturn: number,
    coffeePrice: number = 3,
    weeksPerYear: number = 52
): HistoricalDataPoint[] {
    const historicalData: HistoricalDataPoint[] = [];
    const monthlyInvest = (coffeesPerWeek * coffeePrice * weeksPerYear) / 12;

    // Calculate backwards: what would have happened if started X years ago
    for (let i = 0; i <= selectedYears; i += 5) {
        const year = new Date().getFullYear() - selectedYears + i;
        const monthsPassed = i * 12;
        const totalInvested = monthlyInvest * monthsPassed;

        let portfolioValue = 0;

        // Simulate monthly investments with growth until today
        for (let month = 0; month < monthsPassed; month++) {
            const monthsRemaining = monthsPassed - month;
            const monthlyReturn = Math.pow(1 + avgReturn, 1/12) - 1;
            const futureValue = monthlyInvest * Math.pow(1 + monthlyReturn, monthsRemaining);
            portfolioValue += futureValue;
        }

        historicalData.push({
            year: year.toString(),
            value: Math.round(portfolioValue),
            invested: Math.round(totalInvested),
        });
    }

    return historicalData;
}

interface CompoundInterestResult {
    finalCapital: number;
    totalDeposited: number;
    totalInterest: number;
}

export function calculateCompoundInterest(
    initialCapital: number,
    monthlyDeposit: number,
    interestRate: number,
    durationYears: number
): CompoundInterestResult {
    const r = interestRate / 100 / 12; // Monthly interest rate
    const m = durationYears * 12; // Total months

    const factor = Math.pow(1 + r, m);
    const finalFromInitial = initialCapital * factor;
    const finalFromDeposits = r !== 0 ? monthlyDeposit * (factor - 1) / r : monthlyDeposit * m;
    const finalCapital = finalFromInitial + finalFromDeposits;

    const totalDeposited = initialCapital + monthlyDeposit * m;
    const totalInterest = finalCapital - totalDeposited;

    return {
        finalCapital: Math.round(finalCapital * 100) / 100,
        totalDeposited: Math.round(totalDeposited * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
    };
}

