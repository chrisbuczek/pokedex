import { useState, useEffect } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

interface PokemonDetails {
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

export const useFetchPokemonDetails = ({ idOrName }: { idOrName: string | undefined }) => {
  const [data, setData] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPokemonDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${apiUrl}/pokemon/${idOrName}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Pokemon not found");
        }
        const newData = await response.json();
        setData(newData);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    if (idOrName) fetchPokemonDetails();

    return () => {
      controller.abort();
    };
  }, [idOrName]);

  return { data, loading, error };
};
