import dayjs from 'dayjs'
import { getAQI, getCurrent, getForecast } from '../services/owm'
import { Units, Lang } from '../services/owm'
import { useEffect, useState } from 'react'

export type WeatherBundle = {
  current: any | null
  days: Array<{ date: string; temp: number; wind: number; icon: string; desc: string }>
  aqi: { aqi: number } | null
}

export function useWeather(lat?: number, lon?: number, units: Units = 'metric', lang: Lang = 'ru') {
  const [bundle, setBundle] = useState<WeatherBundle>({ current: null, days: [], aqi: null })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (lat == null || lon == null) return
    let cancel = false
    setLoading(true); setError(null)
    Promise.all([
      getCurrent(lat, lon, units, lang),
      getForecast(lat, lon, units, lang),
      getAQI(lat, lon),
    ])
      .then(([current, forecast, aqi]) => {
        if (cancel) return
        const byDay: Record<string, { t: number[]; w: number[]; icon: string; desc: string }> = {}
        for (const item of forecast.list) {
          const d = dayjs(item.dt * 1000).format('YYYY-MM-DD')
          byDay[d] ??= { t: [], w: [], icon: item.weather[0].icon, desc: item.weather[0].description }
          byDay[d].t.push(item.main.temp)
          byDay[d].w.push(item.wind.speed)
        }
        const days = Object.entries(byDay).slice(0, 5).map(([date, v]) => ({
          date,
          temp: Math.round(v.t.reduce((a,b)=>a+b,0)/v.t.length),
          wind: Math.round(v.w.reduce((a,b)=>a+b,0)/v.w.length),
          icon: v.icon,
          desc: v.desc,
        }))
        setBundle({ current, days, aqi: { aqi: aqi.list?.[0]?.main?.aqi ?? 0 } })
      })
      .catch((e) => !cancel && setError(e.message))
      .finally(() => !cancel && setLoading(false))
    return () => { cancel = true }
  }, [lat, lon, units, lang])

  return { ...bundle, loading, error }
}
