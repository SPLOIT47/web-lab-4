import humidityWhiteIcon from '@/assets/icons/humidity-1.svg'
import pressureWhiteIcon from '@/assets/icons/pressure-white-1.svg'
import uvWhiteIcon from '@/assets/icons/uv-white-1.svg'
import windWhiteIcon from '@/assets/icons/wind-1.svg'
import { useI18n } from "@/i18n"
import {useUnits} from "@/context/UnitsContext";

interface WeatherMetricsProps {
    humidity: number
    pressure: number
    wind: number
    uv?: number
}

export function WeatherMetrics({ humidity, pressure, wind, uv }: WeatherMetricsProps) {
    const { t } = useI18n();
    const { units } = useUnits();

    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-x-8 gap-y-6 text-sm text-slate-700 dark:text-slate-300 mt-4">

            <div className="flex flex-col items-center">
                <img className="w-[60px] h-[50px] mb-1 dark:invert" src={humidityWhiteIcon}  alt=""/>
                <span className="font-medium text-lg">{humidity}%</span>
                <span className="text-sm opacity-70 w-[80px] text-center truncate">
                    {t("humidity")}
                </span>
            </div>

            <div className="flex flex-col items-center">
                <img className="w-[60px] h-[50px] mb-1 dark:invert" src={windWhiteIcon}  alt=""/>
                <span className="font-medium text-lg">{wind} {units === "metric" ? "m/s" : "mph"}</span>
                <span className="text-sm opacity-70 w-[80px] text-center truncate">
                    {t("wind")}
                </span>
            </div>

            <div className="flex flex-col items-center">
                <img className="w-[60px] h-[50px] mb-1 dark:invert" src={pressureWhiteIcon}  alt=""/>
                <span className="font-medium text-lg">{pressure} hPa</span>
                <span className="text-sm opacity-70 w-[80px] text-center truncate">
                    {t("pressure")}
                </span>
            </div>

            <div className="flex flex-col items-center">
                <img className="w-[60px] h-[50px] mb-1 dark:invert" src={uvWhiteIcon}  alt=""/>
                <span className="font-medium text-lg">{uv ?? "--"}</span>
                <span className="text-sm opacity-70 w-[80px] text-center truncate">
                    {t("uv")}
                </span>
            </div>

        </div>
    );
}