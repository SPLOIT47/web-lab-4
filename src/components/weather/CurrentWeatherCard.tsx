import { WeatherMetrics } from './WeatherMetrics'
import { SunCycle } from './SunCycle'
import type { CurrentWeather } from "@/services/types/types"
import { getWeatherIcon } from "@/utils/weatherIcons";
import { useI18n } from "@/i18n";
import React from "react";
import { useUnits } from "@/context/UnitsContext";
import { Loader, ErrorState, EmptyState } from "@/components/common/States";

interface Props {
    data?: CurrentWeather | null;
    loading?: boolean;
    error?: string | null;
    units?: string;
    uv?: number | null;
}

export const CurrentWeatherCard: React.FC<Props> = ({data, loading, error, uv}) => {
    const { t } = useI18n();
    const { units } = useUnits();

    if (loading) return (
        <div className="w-[780px] h-[330px] card">
            <Loader />
        </div>
    );

    if (error) return (
        <div className="w-[780px] h-[330px] card">
            <ErrorState msg={error} />
        </div>
    );

    if (!data) return (
        <div className="w-[780px] h-[330px] card">
            <EmptyState />
        </div>
    );

    const temp = Math.round(data.temp)
    const feels = Math.round(data.feels_like)
    const desc = data.description

    return (
        <div className="w-[780px] h-[330px] card p-6 flex flex-row justify-between select-none">
            <div className="flex justify-between flex-row gap-10">

                <div>
                    <div className="text-[80px] font-bold bg-gradient-to-r from-[#292929] to-[#a3a3a3] dark:from-white dark:to-[#444444] bg-clip-text text-transparent mt-[-20px]">
                        {temp}{units === "metric" ? t("metric") : t("imperial")}
                    </div>

                    <div className="flex items-end gap-1 opacity-70 mt-[-30px] ml-2 mb-8 w-[180px]">

                        <span className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                            {t("feels_like")}:
                        </span>

                        <span className="text-[32px] font-semibold text-slate-900 dark:text-slate-100 relative top-[8px]">
                            {feels}{units === "metric" ? t("metric") : t("imperial")}
                        </span>
                    </div>

                    <SunCycle sunrise={data.sunrise} sunset={data.sunset} />
                </div>

                <div className="flex flex-col items-center mt-[-40px]">
                    <img className="w-[270px] h-[270px]" src={getWeatherIcon(data.icon, 2)} alt={desc} />
                    <span className="text-2xl font-bold capitalize text-center">{desc}</span>
                </div>

                <WeatherMetrics
                    humidity={data.humidity}
                    pressure={data.pressure}
                    wind={data.wind}
                    uv={uv ?? undefined}
                />
            </div>
        </div>
    )
}