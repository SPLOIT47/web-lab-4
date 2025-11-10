import Header from './Header'
import { CurrentWeatherCard } from '../weather/CurrentWeatherCard'
import { useUnits } from "@/context/UnitsContext";
import { useI18n } from '@/i18n'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import LocationBadge from "@/components/search/LocationBadge";
import {ForecastList} from "@/components/weather/ForecastList";
import {ForecastDayCard} from "@/components/weather/ForecastDayCard";
import {useWeather} from "@/hooks/useWeather";
import {AqiCard} from "@/components/weather/AQICard";

export const AppShell = () => {
    const { units } = useUnits()
    const { lang } = useI18n()

    const [coords, setCoords] = useLocalStorage<{lat:number;lon:number}|null>('coords', null)
    const [city, setCity] = useLocalStorage('city', '')

    const { current, aqi, uv } = useWeather(coords, units, lang);

  return (
    <div className="min-h-full max-w-6xl mx-auto ёbg-theme text-theme">
        <Header
            onSelect={(c, name) => {
                setCoords(c)
                setCity(name)
            }}
            onCurrentLocation={(coords, name) => {
                setCoords(coords)
                setCity(name)
            }}
        />
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-col gap-6">
            <div className="w-full flex flex-col gap-6">
                <div className="flex flex-row justify-between gap-6">
                    <div>
                        <LocationBadge
                            city={city}
                            timezoneOffset={current.data?.timezone ?? null}
                        />
                    </div>

                    <div>
                        <CurrentWeatherCard
                            data={current.data}
                            loading={current.loading}
                            error={current.error}
                            units={units}
                            uv={uv.data}
                        />
                    </div>
                </div>

                <div className="flex flex-row justify-between gap-6">
                    <div>
                        <ForecastList coords={coords} />
                    </div>

                    <div>
                        <ForecastDayCard coords={coords} />
                    </div>
                </div>

                <div className="flex flex-row justify-between">
                    <div>
                        <AqiCard
                            data={aqi.data}
                            loading={aqi.loading}
                            error={aqi.error}
                        />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
