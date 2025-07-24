import { useState, useEffect } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

interface PokemonList {
  name: string;
  url: string;
}

export const useFetchPokemonDetails = ({
  pokemonList = null,
  idOrName,
}: {
  pokemonList?: PokemonList[] | null;
  idOrName?: string;
}) => {
  const [data, setData] = useState<PokemonList[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonListDetails = async () => {
      try {
        setLoading(true);
        const details = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            const data = await response.json();
            return { [pokemon.name]: data };
          })
        );
        setPokemonDetails(Object.assign({}, ...details));
        const response = await fetch(`${apiUrl}/pokemon`);
        if (!response.ok) {
          throw new Error("Error: " + response);
        }
        const data = await response.json();
        setData(data.results);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    const fetchPokemonDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${apiUrl}/pokemon/${idOrName}`);
        if (!response.ok) {
          throw new Error("Pokemon not found");
        }
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    if (pokemonList) {
      fetchPokemonListDetails();
    } else {
      fetchPokemonDetails();
    }
  }, [pokemonList, idOrName]);

  return { data, loading, error };
};

useEffect(() => {
  const fetchPokemonDetails = async () => {
    if (pokemon) {
      const details = await Promise.all(
        pokemon.map(async (p) => {
          const response = await fetch(p.url);
          const data = await response.json();
          return { [p.name]: data };
        })
      );
      setPokemonDetails(Object.assign({}, ...details));
    }
  };
  fetchPokemonDetails();
}, [pokemon]);
