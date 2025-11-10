import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { searchCities } from "@/services/api/api";
import { SearchSuggestions, City } from "./SearchSuggestions";

type Coords = { lat: number; lon: number };

interface SearchBarProps {
    onSelect: (coords: Coords, name: string) => void;
    placeholder?: string;
    unstyled?: boolean;
    inputClassName?: string;
    dropdownClassName?: string;
}

export function SearchBar({
                              onSelect,
                              placeholder = "Search for your preferred city...",
                              unstyled = false,
                              inputClassName = "",
                              dropdownClassName = "",
                          }: SearchBarProps) {
    const [text, setText] = useState("");
    const debounced = useDebounce(text, 400);
    const [results, setResults] = useState<City[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!debounced) {
            setResults([]);
            return;
        }

        setLoading(true);
        searchCities(debounced)
            .then((res) => setResults(res))
            .finally(() => setLoading(false));
    }, [debounced]);

    const handlePick = (coords: Coords, name: string) => {
        onSelect(coords, name);
        setText("");
        setResults([]);
    };

    const inputEl = (
        <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            className={
                inputClassName ||
                "w-full h-12 px-4 rounded-md bg-slate-100 dark:bg-slate-800 outline-none"
            }
        />
    );

    if (unstyled) {
        return (
            <>
                {inputEl}
                <SearchSuggestions
                    items={results}
                    onPick={handlePick}
                    className={dropdownClassName}
                />
            </>
        );
    }

    return (
        <div className="relative w-full">
            {inputEl}

            {loading && (
                <div className="absolute right-3 top-full pt-1 text-sm opacity-60">
                    Loading...
                </div>
            )}

            <SearchSuggestions
                items={results}
                onPick={handlePick}
                className={dropdownClassName}
            />
        </div>
    );
}