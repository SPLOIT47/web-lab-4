import dayjs from 'dayjs'
import sunsetWhiteIcon from '@/icons/sunset-white.svg'
import sunriseWhiteIcon from '@/icons/sunrise-white.svg'

export const SunCycle: React.FC<{ sunrise?: number; sunset?: number }> = ({ sunrise, sunset }) => {
  const fmt = (ts?:number) => ts ?dayjs(ts * 1000).format('hh:mm A') : '--:--'
  return (
    <div className="flex gap-4 mt-4 flex-col ml-8">
      <div className="flex flex-row gap-3">
          <img src={sunriseWhiteIcon} alt="sunrise" />
          <div className="flex flex-col items-center">
              <span className="text-xl font-bold">Sunrise</span>
              <span className="font-semibold">{fmt(sunrise)}</span>
          </div>
      </div>
      <div className="flex flex-row gap-3">
          <img src={sunsetWhiteIcon} alt="sunset" />
          <div className="flex flex-col items-center">
              <span className="text-xl font-bold">Sunset</span>
              <span  className="font-semibold">{fmt(sunset)}</span>
          </div>
      </div>
    </div>
  )
}
