import { useEffect, useState } from "react";
import { useI18n } from "@/i18n";

interface LocationBadgeProps {
    city: string;
    timezoneOffset?: number | null;
}

export default function LocationBadge({ city, timezoneOffset }: LocationBadgeProps) {
    const { lang, t } = useI18n();

    const [time, setTime] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        const update = () => {
            const now = new Date();

            let local = now;
            if (timezoneOffset != null) {
                const utc = now.getTime() + now.getTimezoneOffset() * 60_000;
                local = new Date(utc + timezoneOffset * 1000);
            }

            const formattedTime = local.toLocaleTimeString(
                lang === "ru" ? "ru-RU" : "en-US",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                }
            );

            const formattedDate = local.toLocaleDateString(
                lang === "ru" ? "ru-RU" : "en-US",
                {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                }
            );

            setTime(formattedTime);
            setDate(formattedDate);
        };

        update();
        const id = setInterval(update, 60_000);
        return () => clearInterval(id);
    }, [timezoneOffset, lang]);

    return (
        <div
            className=" card flex flex-col items-center justify-center w-[510px] h-[330px] text-center select-none">
            <h2 className="text-4xl font-semibold text-slate-900 dark:text-slate-100 mb-12">
                {city}
            </h2>

            <div className="text-[90px] leading-none font-bold text-slate-900 dark:text-slate-100 mt-5">
                {time || "--:--"}
            </div>

            <div className="text-lg text-slate-700 dark:text-slate-300">
                {date || t("loading")}
            </div>
        </div>
    );
}