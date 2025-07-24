import { useState, useEffect } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

interface Pokemon {
  name: string;
  url: string;
}

export const useFetchPokemonList = ({
  limit = 50,
  offset,
}: {
  limit?: number;
  offset?: number;
}) => {
  const [data, setData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${apiUrl}/pokemon?limit=${limit}${offset ? `&offset=${offset}` : ""}`
          //   , { signal: controller.signal }
        );
        if (!response.ok) {
          throw new Error("Error: " + response);
        }
        const data = await response.json();
        setData((prev) => [...prev, ...data.results]);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // return () => {
    //   controller.abort();
    // };
  }, [limit, offset]);

  return { data, loading, error };
};
