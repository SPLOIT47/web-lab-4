import CloudsIcon from "@/assets/icons/clouds-1.svg";
import RainIcon from "@/assets/icons/rain-1.svg";
import DrizzleIcon from "@/assets/icons/drizzle-1.svg";
import MistIcon from "@/assets/icons/mist-1.svg";
import ClearIcon from "@/assets/icons/clear-2.svg";

export function getLocalWeatherIcon(code: string) {
    if (!code) return null;

    if (code.startsWith("01")) return ClearIcon;
    if (
        code.startsWith("02") ||
        code.startsWith("03") ||
        code.startsWith("04")
    ) return CloudsIcon;
    if (code.startsWith("09") || code.startsWith("10")) return RainIcon;
    if (code.startsWith("11")) return DrizzleIcon;
    if (code.startsWith("50")) return MistIcon;

    return null;
}

export function getWeatherIcon(code: string, size: number = 4): string {
    const local = getLocalWeatherIcon(code);
    if (local) return local;

    return `https://openweathermap.org/img/wn/${code}@${size}x.png`;
}