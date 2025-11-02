import dayjs from 'dayjs'
export const ForecastDayCard: React.FC<{ date: string; temp: number; wind: number; icon: string; desc: string; units: 'metric'|'imperial' }> = ({ date, temp, wind, icon, desc, units }) => {
  const unitSym = units === 'metric' ? '°C' : '°F'
  return (
    <div className="card text-center">
      <div className="font-semibold">{dayjs(date).format('ddd, DD MMM')}</div>
      <div className="text-3xl mt-2">{temp}{unitSym}</div>
      <div className="opacity-70">{desc}</div>
      <div className="opacity-70 mt-1">💨 {wind} {units==='metric'?'m/s':'mph'}</div>
    </div>
  )
}
