import { useState, useEffect } from 'react';
import API from '../services/api';

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await API.get(url);
        if (isMounted) {
          setData(response.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.detail || err.message || 'Error al cargar datos');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (url) fetchData();

    return () => { isMounted = false; };
  }, [url]);

  return { data, loading, error, setData };
};