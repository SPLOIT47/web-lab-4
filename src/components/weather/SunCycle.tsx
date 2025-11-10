import dayjs from "dayjs";
import sunsetWhiteIcon from "@/assets/icons/sunset-white-1.svg";
import sunriseWhiteIcon from "@/assets/icons/sunrise-white-1.svg";
import React from "react";
import { useI18n } from "@/i18n";

export const SunCycle: React.FC<{ sunrise?: number; sunset?: number }> = ({sunrise, sunset}) => {
    const { t } = useI18n();

    const fmt = (ts?: number) =>
        ts ? dayjs(ts * 1000).format("HH:mm") : "--:--";

    return (
        <div className="flex gap-4 mt-4 flex-col ml-8 w-[100px]">
            <div className="flex flex-row gap-3">
                <img className="dark:invert" src={sunriseWhiteIcon} alt="sunrise" />
                <div className="flex flex-col items-center w-[60px]">
                    <span className="text-xl font-bold">{t("sunrise")}</span>
                    <span className="font-semibold">{fmt(sunrise)}</span>
                </div>
            </div>

            <div className="flex flex-row gap-3 w-[100px]">
                <img className="dark:invert" src={sunsetWhiteIcon} alt="sunset" />
                <div className="flex flex-col items-center w-[60px]">
                    <span className="text-xl font-bold">{t("sunset")}</span>
                    <span className="font-semibold">{fmt(sunset)}</span>
                </div>
            </div>
        </div>
    );
};