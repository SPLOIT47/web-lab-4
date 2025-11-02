type City = { name: string; country: string; lat: number; lon: number; state?: string }
export const SearchSuggestions: React.FC<{
  items: City[]
  onPick: (c: {lat:number;lon:number}, name: string) => void
}> = ({ items, onPick }) => {
  if (!items.length) return null
  return (
    <ul className="absolute z-20 mt-2 w-full bg-white dark:bg-slate-800 rounded-xl shadow-card">
      {items.map((c, i) => {
        const label = [c.name, c.state, c.country].filter(Boolean).join(', ')
        return (
          <li key={i}>
            <button className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl"
              onClick={()=>onPick({lat:c.lat, lon:c.lon}, label)}>{label}</button>
          </li>
        )
      })}
    </ul>
  )
}
