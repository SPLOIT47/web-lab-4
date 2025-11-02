import { useEffect, useState } from 'react'
export function useFetchJson<T>(url: string | null, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    if (!url) return
    let canceled = false
    setLoading(true); setError(null)
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.statusText))))
      .then((j) => !canceled && setData(j))
      .catch((e) => !canceled && setError(e.message))
      .finally(() => !canceled && setLoading(false))
    return () => { canceled = true }
  }, deps)
  return { data, loading, error }
}
