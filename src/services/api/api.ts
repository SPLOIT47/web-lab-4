import {
    Coordinates,
    CitySuggestion,
    CurrentWeather,
    DailyForecast,
    HourlyForecast,
    AQI
} from "@/services/types/types";

const API = "https://api.openweathermap.org";
const KEY = import.meta.env.VITE_OWM_API_KEY;

export async function searchCities(query: string): Promise<CitySuggestion[]> {
    if (!query) return [];

    const resp = await fetch(
        `${API}/geo/1.0/direct?q=${query}&limit=5&appid=${KEY}`
    );

    if (!resp.ok) throw new Error("City search failed");

    return await resp.json();
}

export async function reverseGeocode(coords: Coordinates): Promise<string> {
    const resp = await fetch(
        `${API}/geo/1.0/reverse?lat=${coords.lat}&lon=${coords.lon}&limit=1&appid=${KEY}`
    );

    if (!resp.ok) throw new Error("Reverse geocoding failed");

    const data = await resp.json();
    return data?.[0]?.name ?? "Unknown";
}

export async function fetchCurrentWeather(
    coords: Coordinates,
    units: string,
    lang: string
): Promise<CurrentWeather> {
    const resp = await fetch(
        `${API}/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=${units}&lang=${lang}&appid=${KEY}`
    );

    if (!resp.ok) throw new Error("Current weather request failed");

    const data = await resp.json();

    return {
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        wind: data.wind.speed,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        timezone: data.timezone,
    };
}

export async function fetchForecast(
    coords: Coordinates,
    units: string,
    lang: string
): Promise<DailyForecast[]> {
    const resp = await fetch(
        `${API}/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&units=${units}&lang=${lang}&appid=${KEY}`
    );

    if (!resp.ok) throw new Error("Forecast request failed");

    const json = await resp.json();

    const grouped: Record<string, DailyForecast> = {};

    json.list.forEach((entry: any) => {
        const date = entry.dt_txt.split(" ")[0];

        if (!grouped[date]) {
            grouped[date] = {
                date,
                temp_min: entry.main.temp,
                temp_max: entry.main.temp,
                icon: entry.weather[0].icon,
                description: entry.weather[0].description,
            };
        } else {
            grouped[date].temp_min = Math.min(grouped[date].temp_min, entry.main.temp);
            grouped[date].temp_max = Math.max(grouped[date].temp_max, entry.main.temp);
        }
    });

    return Object.values(grouped).slice(0, 5);
}

export async function fetchHourlyForecast(
    coords: Coordinates,
    units: string,
    lang: string
): Promise<HourlyForecast[]> {
    const resp = await fetch(
        `${API}/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&units=${units}&lang=${lang}&appid=${KEY}`
    );

    if (!resp.ok) throw new Error("Hourly forecast request failed");

    const json = await resp.json();

    return json.list.slice(0, 8).map((entry: any) => ({
        time: entry.dt_txt,
        temp: entry.main.temp,
        wind: entry.wind.speed,
        windDeg: entry.wind.deg ?? 0,
        icon: entry.weather[0].icon,
    }));
}

export async function fetchAQI(coords: Coordinates): Promise<AQI> {
    const resp = await fetch(
        `${API}/data/2.5/air_pollution?lat=${coords.lat}&lon=${coords.lon}&appid=${KEY}`
    );

    if (!resp.ok) {
        console.warn("AQI request failed");
        throw new Error("AQI request failed");
    }

    const json = await resp.json();
    const d = json.list?.[0];

    return {
        aqi: d?.main?.aqi ?? 0,
        components: d?.components ?? {
            co: 0, no: 0, no2: 0, o3: 0, so2: 0, pm2_5: 0, pm10: 0, nh3: 0
        },
    };
}

export async function fetchUV(coords: Coordinates): Promise<number | null> {
    const endpoint =
        `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}` +
        `&longitude=${coords.lon}&hourly=uv_index`;

    const resp = await fetch(endpoint);
    if (!resp.ok) throw new Error("UV request failed");

    const data = await resp.json();

    const hours: string[] = data?.hourly?.time ?? [];
    const uv: number[] = data?.hourly?.uv_index ?? [];

    if (!hours.length) return null;

    const now = new Date();
    const isoHour = now.toISOString().slice(0, 13);

    let idx = hours.findIndex((t) => t.startsWith(isoHour));
    if (idx === -1) idx = 0;

    return uv[idx] ?? null;
}