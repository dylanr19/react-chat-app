import { useState, useEffect } from 'react';
import axios from 'axios';

export const useApi = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (url, options) => {
        setIsLoading(true);

        try {
            const response = await axios(url, options)
            setData(response.data)
        } catch (error) {
            setError(error);
        }

        setIsLoading(false);
    }

    const callApi = (url, options) => {
        fetchData(url, options)
    }

    return { data, isLoading, error, setError, callApi }
}