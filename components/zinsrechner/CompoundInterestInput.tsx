"use client";

interface CompoundInterestInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    step?: string;
    placeholder: string;
}

export function CompoundInterestInput({ label, value, onChange, step, placeholder }: CompoundInterestInputProps) {
    return (
        <div>
            <label className="block text-sm font-bold text-coffee-dark mb-2 uppercase tracking-wide">
                {label}
            </label>
            <input
                type="number"
                step={step}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 border-2 border-coffee-dark rounded-xl bg-paper text-coffee-dark font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                placeholder={placeholder}
            />
        </div>
    );
}

