import React from "react";
import { useUnits } from "@/context/UnitsContext";
import { useI18n } from "@/i18n";
import { useWeather } from "@/hooks/useWeather";
import type { Coordinates, Units } from "@/services/types/types";
import NavigationIcon from "@/assets/icons/navigation.svg";
import { getWeatherIcon } from "@/utils/weatherIcons";
import { useTheme } from "@/hooks/useTheme";

interface ForecastDayCardProps {
    coords: Coordinates | null;
}

export const ForecastDayCard: React.FC<ForecastDayCardProps> = ({ coords }) => {
    const { units } = useUnits();
    const { lang, t } = useI18n();
    const { hourly } = useWeather(coords, units, lang);
    const { theme } = useTheme();

    const hours = hourly.data;
    const loading = hourly.loading;
    const error = hourly.error;

    return (
        <div className="card w-[870px] h-[366px] p-6 flex flex-col justify-between select-none items-center gap-3">
            <span className="text-[32px] font-bold">{t("hourly")}</span>

            {loading && (
                <div className="flex flex-1 items-center justify-center text-xl opacity-70">
                    {t("loading")}
                </div>
            )}

            {!loading && error && (
                <div className="flex flex-1 items-center justify-center text-xl text-red-500">
                    {t("error")}
                </div>
            )}

            {!loading && !error && (!hours || hours.length === 0) && (
                <div className="flex flex-1 items-center justify-center text-xl opacity-60">
                    {t("empty")}
                </div>
            )}

            {!loading && !error && hours && hours.length > 0 && (
                <div className="flex flex-row gap-x-2">
                    {hours.slice(0, 5).map((h, i) => {
                        const isDay = isDayTime(h.time);

                        const itemStyle =
                            theme === "dark"
                                ? undefined
                                : {
                                    background: isDay
                                        ? "linear-gradient(180deg, #F88508, #F6FAD9)"
                                        : "linear-gradient(180deg, #443D64, #6582C6)",
                                };

                        return (
                            <div
                                key={i}
                                className="
                  w-[130px] h-[270px] flex flex-col items-center rounded-[40px] p-4
                  dark:bg-[#373636]
                "
                                style={itemStyle}
                            >
                <span className="text-xl font-bold">
                  {formatHour(h.time, lang)}
                </span>

                                <img
                                    className="w-[80px] h-[80px]"
                                    src={getWeatherIcon(h.icon, 2)}
                                    alt=""
                                />

                                <span className="text-xl font-bold">
                  {Math.round(h.temp)}
                                    {units === "metric" ? t("metric") : t("imperial")}
                </span>

                                <img
                                    src={NavigationIcon}
                                    style={{ transform: `rotate(${h.windDeg}deg)` }}
                                    alt="wind direction"
                                />

                                <span className="text-xl font-bold">
                  {formatWind(h.wind, units)}
                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

function isDayTime(ts: string | number) {
    const h = new Date(ts).getHours();
    return h >= 6 && h < 18;
}

function formatHour(ts: string | number, lang: "en" | "ru") {
    return new Date(ts).toLocaleTimeString(lang === "ru" ? "ru-RU" : "en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

function formatWind(w: number, units: Units) {
    return units === "imperial" ? `${Math.round(w * 2.237)} mph` : `${Math.round(w)} m/s`;
}