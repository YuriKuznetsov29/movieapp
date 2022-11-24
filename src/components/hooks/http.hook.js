import { useCallback } from "react";

export const useHttp = () => {
    
    const request = useCallback(async (url, method ='GET', body = null, headers = {
        'X-API-KEY': 'd727b04e-f986-4937-88df-8a08ae791e53',
        'Content-Type': 'application/json',
    }) => {

        try {
            const response = await fetch(url, {method, body, headers});
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (e) {
            throw e;
        }
    }, [])

    return {request}
}

//'Content-type': 'application/json'
// 5e62284f-25c8-43fc-ac1e-2b91ed89b371
// d727b04e-f986-4937-88df-8a08ae791e53