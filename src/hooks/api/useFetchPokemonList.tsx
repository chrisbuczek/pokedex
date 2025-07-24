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
  const [data, setData] = useState<Pokemon[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${apiUrl}/pokemon?limit=${limit}${offset ? `&offset=${offset}` : ""}`
        );
        if (!response.ok) {
          throw new Error("Error: " + response);
        }
        const data = await response.json();
        console.log(data);
        setData(data.results);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limit, offset]);

  return { data, loading, error };
};
