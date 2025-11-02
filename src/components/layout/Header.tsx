import { MapPin, Search, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/context/ThemeContext';
import currentLocationIcon from '@/icons/currentLocationIcon.svg';
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Header() {
    return (
        <header className="flex items-center justify-between gap-4 w-full p-4 bg-transparent dark:bg-slate-900 rounded-2xl">
            <ThemeToggle />

            <div className="flex items-center w-[803px] h-[62px] bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-2 shadow-2xl border border-black">
                <Search className="text-slate-500 dark:text-slate-400 mr-2" width={40} height={46} />
                <input
                    type="text"
                    placeholder="Search for your preferred city..."
                    className="bg-transparent w-full outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                />
            </div>

            <div>
                <Button className="w-[292px] h-[62px] bg-[#4CBB17] hover:bg-[#3ea314] text-white px-4 py-2 flex items-center gap-2 rounded-[40px]">
                    <img src={currentLocationIcon} alt="Current location"/>
                    <span className="text-2xl font-extraboldА ">Current Location</span>
                </Button>
            </div>
        </header>
    );
}