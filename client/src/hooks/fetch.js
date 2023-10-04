import axios from 'axios';
import { useEffect, useState } from 'react';
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

export default function useFetch(query) {
    const [getData, setData] = useState({
        isLoading: false,
        apiData: null,
        error: null,
        status: null,
    });

    useEffect(() => {
        if (!query) return;
        const fetch = async () => {
            try {
                setData((prev) => ({ ...prev, isLoading: true }));
                const { data, status } = await axios.get(`/api/${query}`);
                
                if (status === 201) {
                    setData((prev) => ({ ...prev, isLoading: false }));
                    setData((prev) => ({ ...prev, apiData: data, status: status }));
                }

                setData((prev) => ({ ...prev, isLoading: false }));
            } catch (e) {
                setData((prev) => ({ ...prev, isLoading: false, error: e }));
            }
        };
        fetch();
    }, [query]);

    return [getData, setData];
}
