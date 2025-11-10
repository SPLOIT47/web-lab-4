import React from "react";
import { useUnits } from "@/context/UnitsContext";
import { Lang, useI18n } from "@/i18n";
import { useWeather } from "@/hooks/useWeather";
import type { Coordinates } from "@/services/types/types";
import { getWeatherIcon } from "@/utils/weatherIcons";

interface ForecastListProps {
    coords: Coordinates | null;
}

export const ForecastList: React.FC<ForecastListProps> = ({ coords }) => {
    const { units } = useUnits();
    const { lang, t } = useI18n();
    const { forecast } = useWeather(coords, units, lang);

    const days = forecast.data;
    const loading = forecast.loading;
    const error = forecast.error;

    return (
        <div
            className=" card  w-[414px] h-[366px]  p-6 flex flex-col justify-between select-none">
            <span className="font-bold text-[32px] self-center">
                {t("forecast5")}
            </span>

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

            {!loading && !error && (!days || days.length === 0) && (
                <div className="flex flex-1 items-center justify-center opacity-60 text-lg">
                    {t("empty")}
                </div>
            )}

            {!loading && !error && days && days.length > 0 && (
                <div className="grid grid-cols-1">
                    {days.map((d, i) => (
                        <div key={i} className="flex flex-row items-center gap-6">
                            <img
                                src={getWeatherIcon(d.icon, 2)}
                                className="w-[60px] h-[60px]"
                                alt={d.description}
                            />

                            <span className="text-2xl font-bold">
                                {Math.round(d.temp_max)}
                                {units === "metric" ? t("metric") : t("imperial")}
                            </span>

                            <span className="text-lg font-bold">
                                {formatDate(d.date, lang)}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

function formatDate(dateStr: string, lang: Lang) {
    const date = new Date(dateStr);

    const weekday = date.toLocaleDateString(
        lang === "ru" ? "ru-RU" : "en-US",
        { weekday: "long" }
    );

    const day = date.getDate();

    const month = date.toLocaleDateString(
        lang === "ru" ? "ru-RU" : "en-US",
        { month: "short" }
    );

    return `${weekday}, ${day} ${month}`;
}