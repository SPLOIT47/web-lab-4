export interface Coordinates {
    lat: number;
    lon: number;
}

export interface CitySuggestion {
    name: string;
    country: string;
    state?: string;
    lat: number;
    lon: number;
}

export interface CurrentWeather {
    temp: number;
    feels_like: number;
    description: string;
    wind: number;
    humidity: number;
    pressure: number;
    sunrise: number;
    sunset: number;
    icon: string;
    timezone: number;
}

export interface DailyForecast {
    date: string;
    temp_min: number;
    temp_max: number;
    description: string;
    icon: string;
}

export interface HourlyForecast {
    time: string;
    temp: number;
    wind: number;
    icon: string;
    windDeg: number;
}

export interface AQI {
    aqi: number;
    components: {
        co: number;
        no: number;
        no2: number;
        o3: number;
        so2: number;
        pm2_5: number;
        pm10: number;
        nh3: number;
    };
}

export type Units = "metric" | "imperial";
export type Lang = "en" | "ru";