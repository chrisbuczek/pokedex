import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  CardMedia,
} from "@mui/material";
import { useFetchPokemonList } from "../../hooks/api";
const apiUrl = import.meta.env.VITE_API_URL;

interface PokemonDetails {
  name: string;
  sprites: {
    front_default: string;
  };
}

export const PokemonList = () => {
  // const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  // const [loading, setLoading] = useState(true);
  const [pokemonDetails, setPokemonDetails] = useState<
    Record<string, PokemonDetails>
  >({});
  const { data: pokemon, loading } = useFetchPokemonList({ limit: 50 });

  // useEffect(() => {
  //   const fetchPokemon = async () => {
  //     try {
  //       const response = await fetch(`${apiUrl}/pokemon?limit=50`);
  //       const data = await response.json();
  //       setPokemon(data.results);
  //     } catch (error) {
  //       console.error("Error fetching pokemon list:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPokemon();
  // }, []);

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

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className="flex">
      {pokemon?.map((p) => (
        <div>
          <Card className="h-[300px] w-[200px]">
            {pokemonDetails[p.name] && (
              <CardMedia
                component="img"
                height="140"
                width="140"
                image={pokemonDetails[p.name].sprites.front_default}
                alt={p.name}
                sx={{ objectFit: "contain" }}
              />
            )}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {p.name}
              </Typography>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};
