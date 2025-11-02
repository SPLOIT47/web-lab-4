import humidityWhiteIcon from '@/icons/humidity-white.svg'
import pressureWhiteIcon from '@/icons/pressure-white.svg'
import uvWhiteIcon from '@/icons/uv-white.svg'
import windWhiteIcon from '@/icons/wind-white.svg'

interface WeatherMetricsProps {
    humidity: number
    pressure: number
    wind: number
    uv: number
}

export function WeatherMetrics({ humidity, pressure, wind, uv }: WeatherMetricsProps) {
    const getUvColor = (uv: number) => {
        if (uv <= 2) return 'text-green-500'
        if (uv <= 5) return 'text-yellow-500'
        if (uv <= 7) return 'text-orange-500'
        if (uv <= 10) return 'text-red-500'
        return 'text-purple-500'
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-slate-700 dark:text-slate-300 mt-4">
            <div>
                <img src={humidityWhiteIcon} alt="humidity icon" />
                <span className="font-medium">{humidity}%</span>
                <span>Humidity</span>
            </div>
            <div>
                <img src={windWhiteIcon} alt="wind icon" />
                <span className="font-medium">{wind} m/s</span>
                <span>Wind</span>
            </div>
            <div>
                <img src={pressureWhiteIcon} alt="uv icon" />
                <span className="font-medium">{pressure} hPa</span>
                <span>Pressure</span>
            </div>
            <div>
                <img src={uvWhiteIcon} alt="uv icon" />
                <span className="font-medium">{uv}</span>
                <span>UV</span>
            </div>
        </div>
    )
}
