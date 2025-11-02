import { useI18n } from '../../hooks/useI18n'
import { useUnits } from '../../hooks/useUnits'
import { useLocalStorage } from '../../hooks/useLocalStorage'

export const Toggles = () => {
  const { lang, setLang } = useI18n()
  const { units, setUnits } = useUnits()
  const [theme, setTheme] = useLocalStorage<'light'|'dark'>('theme','light')

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.classList.toggle('dark', next==='dark')
  }

  return (
    <div className="flex items-center gap-2">
      <button className="badge" onClick={toggleTheme}>{theme==='light'?'Light':'Dark'}</button>
      <button className={`badge ${units==='metric'?'ring-2 ring-slate-400':''}`} onClick={()=>setUnits('metric')}>°C</button>
      <button className={`badge ${units==='imperial'?'ring-2 ring-slate-400':''}`} onClick={()=>setUnits('imperial')}>°F</button>
      <button className={`badge ${lang==='ru'?'ring-2 ring-slate-400':''}`} onClick={()=>setLang('ru')}>RU</button>
      <button className={`badge ${lang==='en'?'ring-2 ring-slate-400':''}`} onClick={()=>setLang('en')}>EN</button>
    </div>
  )
}
