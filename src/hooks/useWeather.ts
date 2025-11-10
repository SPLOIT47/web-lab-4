import { useCallback } from "react";
import { useFetchJson } from "./useFetchJson";
import {
    fetchCurrentWeather,
    fetchForecast,
    fetchAQI,
    fetchHourlyForecast,
    fetchUV
} from "@/services/api/api";
import type { Coordinates, Units, Lang } from "@/services/types/types";

export const useWeather = (
    coords: Coordinates | null,
    units: Units,
    lang: Lang
) => {
    const currentFetcher = useCallback(
        () => coords ? fetchCurrentWeather(coords, units, lang) : Promise.resolve(null),
        [coords, units, lang]
    );
    const forecastFetcher = useCallback(
        () => coords ? fetchForecast(coords, units, lang) : Promise.resolve(null),
        [coords, units, lang]
    );
    const hourlyFetcher = useCallback(
        () => coords ? fetchHourlyForecast(coords, units, lang) : Promise.resolve(null),
        [coords, units, lang]
    );
    const aqiFetcher = useCallback(
        () => coords ? fetchAQI(coords) : Promise.resolve(null),
        [coords]
    );
    const uvFetcher = useCallback(
        () => coords ? fetchUV(coords) : Promise.resolve(null),
        [coords]
    );

    const current = useFetchJson(currentFetcher);
    const forecast = useFetchJson(forecastFetcher);
    const hourly = useFetchJson(hourlyFetcher);
    const aqi = useFetchJson(aqiFetcher);
    const uv = useFetchJson(uvFetcher);

    return { current, forecast, hourly, aqi, uv };
};