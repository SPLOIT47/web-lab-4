import React from "react";

export type City = {
    name: string;
    country: string;
    lat: number;
    lon: number;
    state?: string;
};

interface Props {
    items: City[];
    onPick: (coords: { lat: number; lon: number }, name: string) => void;
    className?: string;
}

export const SearchSuggestions: React.FC<Props> = ({
                                                       items,
                                                       onPick,
                                                       className = "",
                                                   }) => {
    if (!items.length) return null;

    return (
        <ul
            className={
                className ||
                "absolute z-20 mt-2 w-full bg-white dark:bg-slate-800 rounded-xl shadow-lg p-2 border border-slate-200 dark:border-slate-600"
            }
        >
            {items.map((c, i) => {
                const label = [c.name, c.state, c.country].filter(Boolean).join(", ");
                return (
                    <li key={i}>
                        <button
                            className="
                w-full text-left px-4 py-2
                hover:bg-slate-100 dark:hover:bg-slate-700
                rounded-lg transition-colors
              "
                            onClick={() => onPick({ lat: c.lat, lon: c.lon }, c.name)}
                        >
                            {label}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};