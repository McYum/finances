import { useMemo } from "react";

interface CalculationResult {
  fv: number;
  total: number;
  interest: number;
}

interface InterestStats {
  y15: CalculationResult;
  y30: CalculationResult;
}

/**
 * Custom hook to calculate compound interest for savings
 * @param weeklySavings - The amount saved per week in euros
 * @returns Object containing calculated values for 15 and 30 years
 */
export function useInterestCalculator(weeklySavings: number): InterestStats {
  return useMemo(() => {
    const monthly = weeklySavings * 4.33;
    const rate = 0.07;
    const months15 = 15 * 12;
    const months30 = 30 * 12;
    const monthlyRate = rate / 12;

    const calc = (m: number): CalculationResult => {
      const fv = monthly * ((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate);
      const total = monthly * m;
      return { fv, total, interest: fv - total };
    };

    return { y15: calc(months15), y30: calc(months30) };
  }, [weeklySavings]);
}
