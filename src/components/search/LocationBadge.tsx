import { useEffect, useState } from 'react'

interface LocationBadgeProps {
    city: string
    timezone?: string
}

export default function LocationBadge({ city, timezone }: LocationBadgeProps) {
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            const local = timezone
                ? now.toLocaleString('en-US', { timeZone: timezone })
                : now.toLocaleString('en-US')

            const localDate = new Date(local)
            const formattedTime = localDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            })
            const formattedDate = localDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
            })

            setTime(formattedTime)
            setDate(formattedDate)
        }

        updateTime()
        const interval = setInterval(updateTime, 1000 * 60) // обновление раз в минуту
        return () => clearInterval(interval)
    }, [timezone])

    return (
        <div
            className="
        flex flex-col items-center justify-center
        w-[510px] h-[330px]
        rounded-3xl
        bg-white/30 dark:bg-slate-800/40
        backdrop-blur-md
        shadow-[10px_10px_4px_rgba(0,0,0,0.5)]
        text-center
        select-none
      "
        >
            <h2 className="text-4xl font-semibold text-slate-900 dark:text-slate-100 mb-12">
                {city}
            </h2>

            <div className="text-[90px] leading-none font-bold text-slate-900 dark:text-slate-100 mt-5">
                {time || '--:--'}
            </div>

            <div className="text-lg text-slate-700 dark:text-slate-300">
                {date || 'Loading...'}
            </div>
        </div>
    )
}
