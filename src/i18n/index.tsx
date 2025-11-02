import React, { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

type Lang = 'en' | 'ru'

type Dict = Record<string, { en: string; ru: string }>

const dict: Dict = {
  search_placeholder: { en: 'Search city…', ru: 'Поиск города…' },
  current_location: { en: 'Current Location', ru: 'Текущая локация' },
  feels_like: { en: 'Feels like', ru: 'Ощущается' },
  humidity: { en: 'Humidity', ru: 'Влажность' },
  wind: { en: 'Wind', ru: 'Ветер' },
  pressure: { en: 'Pressure', ru: 'Давление' },
  sunrise: { en: 'Sunrise', ru: 'Рассвет' },
  sunset: { en: 'Sunset', ru: 'Закат' },
  forecast5: { en: '5‑Day Forecast', ru: 'Прогноз на 5 дней' },
  aqi: { en: 'Air Quality', ru: 'Качество воздуха' },
  today: { en: 'Today', ru: 'Сегодня' },
  empty: { en: 'Start by searching a city', ru: 'Начните с поиска города' },
  error: { en: 'Something went wrong', ru: 'Что‑то пошло не так' },
  loading: { en: 'Loading…', ru: 'Загрузка…' },
  metric: { en: '°C', ru: '°C' },
  imperial: { en: '°F', ru: '°F' },
}

const I18nCtx = createContext<{ lang: Lang; t: (k: keyof typeof dict) => string; setLang: (l: Lang) => void }>({
  lang: 'en',
  t: (k) => dict[k].en,
  setLang: () => {},
})

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useLocalStorage<Lang>('lang', 'ru')
  const t = (k: keyof typeof dict) => dict[k][lang]
  return <I18nCtx.Provider value={{ lang, t, setLang }}>{children}</I18nCtx.Provider>
}

export const useI18n = () => useContext(I18nCtx)
