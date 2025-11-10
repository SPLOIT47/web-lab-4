import React, { createContext, useContext } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export type Lang = "en" | "ru";

type Dict = Record<string, { en: string; ru: string }>;

const dict: Dict = {
    search_placeholder: { en: "Search for your preferred city…", ru: "Поиск города…" },
    current_location: { en: 'Current Location', ru: 'Текущая локация' },
    feels_like: { en: 'Feels like', ru: 'Ощущается' },
    humidity: { en: 'Humidity', ru: 'Влажность' },
    wind: { en: 'Wind', ru: 'Ветер' },
    pressure: { en: 'Pressure', ru: 'Давление' },
    sunrise: { en: 'Sunrise', ru: 'Рассвет' },
    sunset: { en: 'Sunset', ru: 'Закат' },
    today: { en: 'Today', ru: 'Сегодня' },
    empty: { en: 'Start by searching a city', ru: 'Начните с поиска города' },
    error: { en: 'Something went wrong', ru: 'Что-то пошло не так' },
    loading: { en: 'Loading…', ru: 'Загрузка…' },
    metric: { en: '°C', ru: '°C' },
    imperial: { en: '°F', ru: '°F' },
    uv: { en: "UV index", ru: "УФ-индекс" },
    aqi: { en: "Air Quality", ru: "Качество воздуха" },
    hourly: { en: "Hourly Forecast", ru: "Почасовой прогноз" },
    forecast5: { en: "5-Day Forecast", ru: "Прогноз на 5 дней" },
    pm25: { en: "PM2.5", ru: "PM2.5" },
    pm10: { en: "PM10", ru: "PM10" },
    o3: { en: "O₃", ru: "O₃" },
    no2: { en: "NO₂", ru: "NO₂" },
    so2: { en: "SO₂", ru: "SO₂" },
    co: { en: "CO", ru: "CO" },
};

const I18nCtx = createContext<{
    lang: Lang
    t: (k: keyof typeof dict) => string
    setLang: React.Dispatch<React.SetStateAction<Lang>>
}>({
    lang: "en",
    t: (k) => dict[k].en,
    setLang: () => {}
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lang, setLang] = useLocalStorage<Lang>("lang", "ru");

    const t = React.useCallback(
        (k: keyof typeof dict) => dict[k][lang],
        [lang]
    );

    const value = React.useMemo(
        () => ({ lang, t, setLang }),
        [lang, t]
    );

    return (
        <I18nCtx.Provider value={value}>
            {children}
        </I18nCtx.Provider>
    );
};

export const useI18n = () => useContext(I18nCtx);