import { useWeather } from '../../hooks/useWeather'
import { Units, Lang } from '../../services/owm'
import { Loader, ErrorState, EmptyState } from '../common/States'
import { ForecastDayCard } from './ForecastDayCard'

export const ForecastList: React.FC<{ coords?: {lat:number;lon:number}, units: Units, lang: Lang }> = ({ coords, units, lang }) => {
  if (!coords) return <EmptyState />
  const { days, loading, error } = useWeather(coords.lat, coords.lon, units, lang)
  if (loading) return <Loader />
  if (error) return <ErrorState msg={error} />
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {days.map((d, i)=>(<ForecastDayCard key={i} {...d} units={units} />))}
    </div>
  )
}
