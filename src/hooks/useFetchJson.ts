import { useEffect, useState } from "react";

export function useFetchJson<T>(fetcher: (() => Promise<T>) | null) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!fetcher) return;

        setLoading(true);
        setError(null);

        fetcher()
            .then((res) => setData(res))
            .catch((err) => setError(err?.message ?? String(err)))
            .finally(() => setLoading(false));

    }, [fetcher]);

    return { data, loading, error };
}