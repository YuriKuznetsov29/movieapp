import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    
    const request = useCallback(async (url, method ='GET', body = null, headers = {
        'X-API-KEY': 'd727b04e-f986-4937-88df-8a08ae791e53',
        'Content-Type': 'application/json',
    }) => {
        setLoading(true);
        try {
            const response = await fetch(url, {method, body, headers});
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            setLoading(false)
            return data;
        } catch (e) {
            throw e;
            setLoading(false);
        }
    }, [])

    return {request, loading}
}

//'Content-type': 'application/json'
// 5e62284f-25c8-43fc-ac1e-2b91ed89b371
// d727b04e-f986-4937-88df-8a08ae791e53