import React from "react";
import type { AQI } from "@/services/types/types";
import { getAqiInfo } from "@/utils/aqi";
import { useI18n } from "@/i18n";
import {EmptyState, ErrorState, Loader} from "@/components/common/States";

interface Props {
    data?: AQI | null;
    loading?: boolean;
    error?: string | null;
}

export const AqiCard: React.FC<Props> = ({ data, loading, error }) => {
    const { t } = useI18n();

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

    const info = getAqiInfo(data.aqi);

    return (
        <div className="
            w-[414px] h-[200px] card  p-6 flex flex-col justify-between select-none">
            <span className="font-bold text-[32px] self-center">
                {t("aqi")}
            </span>

            <div className="flex justify-center items-center gap-4">
                <span className="text-[48px] font-bold" style={{ color: info.color }}>
                    {data.aqi}
                </span>

                <span className="text-xl font-semibold" style={{ color: info.color }}>
                    {info.label}
                </span>
            </div>

            <div className="grid grid-cols-3 gap-1 text-sm opacity-75">
                <span>{t("pm25")}: {data.components.pm2_5}</span>
                <span>{t("pm10")}: {data.components.pm10}</span>
                <span>{t("o3")}: {data.components.o3}</span>
                <span>{t("no2")}: {data.components.no2}</span>
                <span>{t("so2")}: {data.components.so2}</span>
                <span>{t("co")}: {data.components.co}</span>
            </div>
        </div>
    );
};