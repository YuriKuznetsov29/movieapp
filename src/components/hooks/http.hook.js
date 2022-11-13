import { useCallback, useState } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [process, setProcess] = useState('waiting');

    const request = useCallback(async (url, method ='GET', body = null, headers = {
        'X-API-KEY': '5e62284f-25c8-43fc-ac1e-2b91ed89b371',
        'Content-Type': 'application/json',
    }) => {
        setLoading(true);
        setProcess('loading');

        try {
            const response = await fetch(url, {method, body, headers});
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            setLoading(false);
            setProcess('waiting');
            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            setProcess('error');
            throw e;
        }
    }, [])

    const clearError = useCallback(() => {
        setError(null);
        setProcess('loading');
    }, []);

    return {loading, request, error, clearError, process, setProcess}
}

//'Content-type': 'application/json'