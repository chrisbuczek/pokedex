import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  CardMedia,
} from "@mui/material";
import { NavLink } from "react-router";
import { useFetchPokemonList } from "../../hooks/api";
import { useIsPageBottom } from "../../hooks/useIsPageBottom";

interface PokemonDetails {
  name: string;
  sprites: {
    front_default: string;
  };
}

export const PokemonList = () => {
  const [pokemonDetails, setPokemonDetails] = useState<Record<
    string,
    PokemonDetails
  > | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const {
    data: pokemonList,
    loading,
    error,
  } = useFetchPokemonList({ limit: 50, offset: offset });
  const isPageBottom = useIsPageBottom({ loadingData: loading });

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (pokemonList) {
        const details = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            const data = await response.json();
            return { [pokemon.name]: data };
          })
        );
        setPokemonDetails(Object.assign({}, ...details));
      }
    };
    fetchPokemonDetails();
  }, [pokemonList]);

  useEffect(() => {
    if (isPageBottom) setOffset((prev) => prev + 50);
  }, [isPageBottom]);

  if ((loading || !pokemonDetails) && offset === 0) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (!pokemonDetails) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <>
      <div className="flex gap-4 flex-wrap items-center justify-center">
        {pokemonList?.map((pokemon) => (
          <NavLink to={`/pokemon/${pokemon.name}`} key={pokemon.name}>
            <Card className="h-[300px] w-[200px]">
              {pokemonDetails[pokemon.name] && (
                <CardMedia
                  component="img"
                  height="140"
                  width="140"
                  image={pokemonDetails[pokemon.name].sprites.front_default}
                  alt={pokemon.name}
                  sx={{ objectFit: "contain" }}
                />
              )}
              <CardContent>
                <Typography className="text-[1.3rem]" component="div">
                  {pokemon.name}
                </Typography>
              </CardContent>
            </Card>
          </NavLink>
        ))}
      </div>
      {loading && offset !== 0 && (
        <div className="w-full flex justify-center py-4">
          <CircularProgress />
        </div>
      )}
    </>
  );
};
