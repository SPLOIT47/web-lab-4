import { useWeather } from '../../hooks/useWeather'
import { Loader, ErrorState, EmptyState } from '../common/States'

function level(n:number){
  switch(n){
    case 1: return 'Good';
    case 2: return 'Fair';
    case 3: return 'Moderate';
    case 4: return 'Poor';
    case 5: return 'Very Poor';
    default: return '--';
  }
}

export const AQICard: React.FC<{ coords?: {lat:number;lon:number} }> = ({ coords }) => {
  if (!coords) return <EmptyState />
  const { aqi, loading, error } = useWeather(coords.lat, coords.lon)
  if (loading) return <Loader />
  if (error) return <ErrorState msg={error} />
  return (
    <div className="card">
      <div className="font-semibold mb-2">Air Quality</div>
      <div className="text-3xl">AQI {aqi?.aqi ?? '--'}</div>
      <div className="opacity-70">{level(aqi?.aqi ?? 0)}</div>
    </div>
  )
}
