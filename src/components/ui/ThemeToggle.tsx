import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <div className="flex items-center flex-col w-[110px] h-[61px]">
            <button
                onClick={toggleTheme}
                className={`relative w-16 h-8 flex items-center rounded-full transition-colors duration-300 ${
                    theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'
                }`}>
                <span
                    className={`absolute w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                        theme === 'dark' ? 'translate-x-8' : 'translate-x-1'
                    }`} />
            </button>

            <span className="mt-1 text-sm font-extrabold text-slate-700 dark:text-slate-300">
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </span>
        </div>
    )
}
