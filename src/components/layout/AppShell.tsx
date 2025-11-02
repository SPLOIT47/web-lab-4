import Header from './Header'
import { SearchBar } from '../search/SearchBar'
import { CurrentWeatherCard } from '../weather/CurrentWeatherCard'
import { ForecastList } from '../weather/ForecastList'
import { AQICard } from '../weather/AQICard'
import { useUnits } from '@/hooks/useUnits'
import { useI18n } from '@/hooks/useI18n'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import LocationBadge from "@/components/search/LocationBadge";

export const AppShell = () => {
  const { units } = useUnits()
  const { lang } = useI18n()
  const [coords, setCoords] = useLocalStorage<{lat:number;lon:number}|null>('coords', null)
  const [city, setCity] = useLocalStorage<string>('city', '')

  return (
    <div className="min-h-full max-w-6xl mx-auto px-4">
      <Header />
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-col gap-6">
          <SearchBar onSelect={(c, name)=>{ setCoords(c); setCity(name) }} />
          <LocationBadge city="London" timezone="Europe/London" />
          <CurrentWeatherCard />
        {/*</div>*/}
        {/*<div className="flex flex-col gap-6">*/}
        {/*  <AQICard coords={coords ?? undefined} />*/}
        {/*  <ForecastList coords={coords ?? undefined} units={units} lang={lang} />*/}
        </div>
      </div>
    </div>
  )
}
