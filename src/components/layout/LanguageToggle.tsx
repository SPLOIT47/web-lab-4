import { useI18n } from "@/i18n";
import { ToggleSwitch } from "@/components/layout/ToggleSwitch";

export default function LanguageToggle() {
    const { lang, setLang } = useI18n();

    return (
        <ToggleSwitch
            value={lang === "ru"}
            onToggle={() => setLang(lang === "ru" ? "en" : "ru")}
            label={lang === "ru" ? "Русский" : "English"}
        />
    );
}