const MAX_DISPLAY_VALUE = 9999999999999;

export function formatCurrency(value: number): string {
    const isOverLimit = value > MAX_DISPLAY_VALUE;
    const clampedValue = Math.min(value, MAX_DISPLAY_VALUE);

    if (clampedValue >= 10000000) {
        const formatted = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(Math.floor(clampedValue));

        return isOverLimit ? `> ${formatted}` : formatted;
    }

    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(clampedValue);
}

export function formatCurrencyWithPlus(value: number): string {
    const isOverLimit = value > MAX_DISPLAY_VALUE;
    const clampedValue = Math.min(value, MAX_DISPLAY_VALUE);

    if (clampedValue >= 10000000) {
        const formatted = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(Math.floor(clampedValue));

        return isOverLimit ? `> +${formatted}` : `+${formatted}`;
    }

    const formatted = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(clampedValue);

    return `+${formatted}`;
}

export function getFontSizeClass(value: number): string {
    return value >= 10000000 ? "text-2xl" : "text-4xl";
}

