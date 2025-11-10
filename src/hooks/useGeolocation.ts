import { useState } from "react";

export interface Coordinates {
    lat: number;
    lon: number;
}

export function useGeolocation() {
    const [coords, setCoords] = useState<Coordinates | null>(null);
    const [error, setError] = useState<string | null>(null);

    const getCurrent = () : Promise<Coordinates | null> => {
        return new Promise((resolve) => {
            if (!navigator.geolocation) {
                setError("Geolocation not supported");
                resolve(null);
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const c = {
                        lat: pos.coords.latitude,
                        lon: pos.coords.longitude,
                    };
                    setCoords(c);
                    resolve(c);
                },
                (err) => {
                    setError(err.message);
                    resolve(null);
                },
                { enableHighAccuracy: true }
            );
        });
    };

    return { coords, error, getCurrent };
}