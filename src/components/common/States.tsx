import { useI18n } from "@/i18n";
import React from "react";

export const Loader = () => {
    const { t } = useI18n();

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 opacity-70">
            <span className="text-xl">{t("loading")}</span>
        </div>
    );
};

export const ErrorState: React.FC<{ msg?: string }> = ({ msg }) => {
    const { t } = useI18n();
    return (
        <div className="w-full h-full flex items-center justify-center text-red-600 dark:text-red-400">
            {t("error")}{msg ? `: ${msg}` : ""}
        </div>
    );
};

export const EmptyState = () => {
    const { t } = useI18n();
    return (
        <div className="w-full h-full flex items-center justify-center opacity-60">
            {t("empty")}
        </div>
    );
};