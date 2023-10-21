import axios from 'axios';
import { useEffect, useState } from 'react';
import { getUsername } from '../Helper/helper';
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

export default function useFetch(query) {
    const [getData, setData] = useState({
        isLoading: false,
        apiData: null,
        error: null,
        status: null,
    });

    useEffect(() => {
        const fetch = async () => {
            try {
                setData((prev) => ({ ...prev, isLoading: true }));
                const { username } = !query ? await getUsername() : '';
                const { data, status } = !query ? await axios.get(`/api/user/${username}`) : await axios.get(`/api/${query}`);

                if (status === 201) {
                    setData((prev) => ({ ...prev, isLoading: false }));
                }
                setData((prev) => ({ ...prev, status, apiData: data }));
            } catch (error) {
                const status = error?.response?.status;
                setData((prev) => ({ ...prev, status, error, isLoading: false }));
            }
        };
        fetch();
    }, [query]);

    return [getData, setData];
}
