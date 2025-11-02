import { WeatherMetrics } from './WeatherMetrics'
import { SunCycle } from './SunCycle'
import clearIcon from '@/icons/clear.svg'

export const CurrentWeatherCard: React.FC = () => {
    // --- Моковые данные ---
    const mockWeather = {
        main: {
            temp: 22.5,
            feels_like: 21.7,
            humidity: 60,
            pressure: 1013,
        },
        weather: [{ description: 'sunny' }],
        wind: { speed: 3.4 },
        sys: { sunrise: 1698734400, sunset: 1698772800 },
    }

    const temp = Math.round(mockWeather.main.temp)
    const feels = Math.round(mockWeather.main.feels_like)
    const desc = mockWeather.weather[0].description
    const unitSym = '°C'

    return (
        <div className="w-[780px] h-[330px] bg-white/30 dark:bg-slate-800/40 backdrop-blur-md rounded-3xl shadow-[10px_10px_4px_rgba(0,0,0,0.25)] p-6 flex flex-row justify-between select-none">
            <div className="flex justify-between flex-row">
                <div>
                    <div className="text-[80px] font-bold bg-gradient-to-r from-[#292929] to-[#a3a3a3] bg-clip-text text-transparent mt-[-20px]">
                        {temp}{unitSym}
                    </div>
                    <div className="flex items-end gap-1 opacity-70 text-slate-700 dark:text-slate-400 mt-[-30px] ml-2 mb-8">
                        <span className="text-xl font-semibold text-slate-900">Feels like:</span>
                        <span className="text-[32px] font-semibold text-slate-900 relative top-[8px]">{feels}{unitSym}</span>
                    </div>

                    <SunCycle
                        sunrise={mockWeather.sys.sunrise}
                        sunset={mockWeather.sys.sunset}
                    />
                </div>

                <div className="flex flex-col items-center mt-[-40px]">
                    <img className="w-[270px] h-[270px]" src={clearIcon} alt="clear" />
                    <span className="text-[32px] font-bold">Sunny</span>
                </div>
            </div>

            {/*<WeatherMetrics*/}
            {/*    humidity={mockWeather.main.humidity}*/}
            {/*    pressure={mockWeather.main.pressure}*/}
            {/*    wind={mockWeather.wind.speed}*/}
            {/*    uv={5.2}*/}
            {/*/>*/}


        </div>
    )
}
