const API = 'https://api.openweathermap.org'
const KEY = import.meta.env.VITE_OWM_API_KEY as string

export type Units = 'metric' | 'imperial'
export type Lang = 'ru' | 'en'

export async function geocodeCity(q: string, limit = 5) {
  const url = `${API}/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=${limit}&appid=${KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('geocode failed')
  return (await res.json()) as Array<{ name: string; country: string; lat: number; lon: number; state?: string }>
}

export async function reverseGeocode(lat: number, lon: number) {
  const url = `${API}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('reverse geocode failed')
  return (await res.json()) as Array<{ name: string; country: string; lat: number; lon: number; state?: string }>
}

export async function getCurrent(lat: number, lon: number, units: Units, lang: Lang) {
  const url = `${API}/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${KEY}`
  const r = await fetch(url)
  if (!r.ok) throw new Error('current failed')
  return await r.json()
}

export async function getForecast(lat: number, lon: number, units: Units, lang: Lang) {
  const url = `${API}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${KEY}`
  const r = await fetch(url)
  if (!r.ok) throw new Error('forecast failed')
  return await r.json()
}

export async function getAQI(lat: number, lon: number) {
  const url = `${API}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${KEY}`
  const r = await fetch(url)
  if (!r.ok) throw new Error('aqi failed')
  return await r.json()
}
