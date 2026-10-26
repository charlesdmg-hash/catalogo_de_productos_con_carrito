import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(url);

        if (!res.ok) throw new Error("Error ocurred");
        const textRes = await res.text();
        if (textRes.trim() !== "") {
          setData(JSON.parse(textRes));
        } else {
          throw new Error("No data found for this request");
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [url]);

  return { data, loading, error };
}
