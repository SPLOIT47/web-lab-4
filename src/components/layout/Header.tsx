import { Search } from 'lucide-react';
import { Button } from '@/components/layout/Button';
import ThemeToggle from "@/components/layout/ThemeToggle";
import currentLocationIcon from '@/assets/icons/currentLocationIcon.svg';
import { SearchBar } from '@/components/search/SearchBar';
import { useGeolocation } from "@/hooks/useGeolocation";
import { reverseGeocode } from "@/services/api/api";
import React from "react";
import UnitsToggle from "@/components/layout/UnitsToggle";
import LanguageToggle from "@/components/layout/LanguageToggle";
import {useI18n} from "@/i18n";

type Coords = { lat: number; lon: number };

interface HeaderProps {
    onSelect: (coords: Coords, name: string) => void;
    onCurrentLocation: (coords: Coords, name: string) => void;
}

export default function Header({ onSelect, onCurrentLocation }: HeaderProps) {
    const { getCurrent } = useGeolocation();
    const {t} = useI18n();

    const handleCurrentClick = async () => {
        const c = await getCurrent();
        if (!c) return;

        const cityName = await reverseGeocode(c);

        onCurrentLocation(c, cityName);
    };

    return (
        <header className="flex items-center justify-between gap-4 w-full p-4 bg-transparent rounded-2xl">
            <div className="flex">
                <ThemeToggle />
                <LanguageToggle />
                <UnitsToggle />
            </div>

            <div>
                <div className="relative flex items-center w-[653px] h-[62px]  bg-[#D9D9D9] dark:bg-[#444444] rounded-full px-4 py-2 shadow-2xl border border-black">
                    <Search className="text-slate-500 dark:text-slate-400 mr-2" width={40} height={46} />

                    <SearchBar
                        unstyled
                        onSelect={onSelect}
                        placeholder={t("search_placeholder")}
                        inputClassName="bg-transparent w-full outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                        dropdownClassName="absolute left-0 top-full mt-2 bg-white dark:bg-slate-700 rounded-2xl shadow-xl p-2 w-full max-h-60 overflow-y-auto z-50 border border-slate-300 dark:border-slate-600"
                    />
                </div>
            </div>


            <div>
                <Button
                    className="w-[292px] h-[62px] bg-[#4CBB17] hover:bg-[#3ea314] text-white px-4 py-2 flex items-center gap-2 rounded-[40px]"
                    onClick={handleCurrentClick}
                >
                    <img src={currentLocationIcon} alt="Current location"/>
                    <span className="text-2xl font-extrabold">{t("current_location")}</span>
                </Button>
            </div>
        </header>
    );
}