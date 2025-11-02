import { useForm } from 'react-hook-form'
import { useDebounce } from '../../hooks/useDebounce'
import { geocodeCity } from '../../services/owm'
import { useEffect, useState } from 'react'
import { SearchSuggestions } from './SearchSuggestions'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useI18n } from '../../hooks/useI18n'

type City = { name: string; country: string; lat: number; lon: number; state?: string }

export const SearchBar: React.FC<{ onSelect: (coords:{lat:number;lon:number}, name: string) => void }> = ({ onSelect }) => {
  const { register, watch, setValue } = useForm<{ q: string }>({ defaultValues: { q: '' } })
  const q = watch('q')
  const qd = useDebounce(q, 400)
  const [suggest, setSuggest] = useState<City[]>([])
  const [history, setHistory] = useLocalStorage<string[]>('history', [])
  const { t } = useI18n()

  useEffect(() => {
    let cancel = false
    if (!qd) { setSuggest([]); return }
    geocodeCity(qd).then((list)=>{ if(!cancel) setSuggest(list as City[]) }).catch(()=>setSuggest([]))
    return () => { cancel = true }
  }, [qd])

  const pick = (coords:{lat:number;lon:number}, name: string) => {
    onSelect(coords, name)
    setValue('q', '')
    setSuggest([])
    setHistory([name, ...history.filter(h=>h!==name)].slice(0,8))
  }

  const historyItems = history.map((h, i) => ({
    name: h, country: '', lat: NaN, lon: NaN
  }))

  return (
    <div className="relative">
      <input
        {...register('q')}
        placeholder={t('search_placeholder')}
        className="w-full rounded-full px-5 py-3 bg-white dark:bg-slate-800 shadow-card outline-none"
      />
      <SearchSuggestions
        items={qd ? suggest : []}
        onPick={(c, name)=>pick(c, name)}
      />
      {!qd && history.length > 0 && (
        <div className="absolute z-10 mt-2 w-full bg-white dark:bg-slate-800 rounded-xl shadow-card p-2">
          <div className="text-xs opacity-70 px-2 pb-1">History</div>
          {historyItems.map((h,i)=>(
            <button key={i} className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl"
              onClick={()=>pick({lat:NaN, lon:NaN}, h.name)}>{h.name}</button>
          ))}
        </div>
      )}
    </div>
  )
}
