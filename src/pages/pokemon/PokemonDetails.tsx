import { useParams, NavLink } from "react-router";
import {
  CircularProgress,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  Button,
  Container,
} from "@mui/material";
import { useFetchPokemonDetails } from "../../hooks/api/useFetchPokemonDetails";

export const PokemonDetails = () => {
  const { idOrName } = useParams();
  const {
    data: pokemon,
    loading,
    error,
  } = useFetchPokemonDetails({ idOrName });

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography className="flex justify-center text-4xl" color="error">
        {error}
      </Typography>
    );
  }

  if (!pokemon) {
    return <Typography>No Pokemon data available.</Typography>;
  }

  return (
    <Container>
      <Button component={NavLink} to="/" variant="outlined" sx={{ mb: 2 }}>
        Back to List
      </Button>
      <Card>
        <Typography
          gutterBottom
          variant="h2"
          component="div"
          sx={{ textTransform: "capitalize" }}
        >
          {pokemon.name}
        </Typography>

        <CardMedia
          component="img"
          height="140"
          width="140"
          image={pokemon.sprites.front_default}
          alt={pokemon.name}
          sx={{ objectFit: "contain", mt: 2 }}
        />
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" component="div">
              Types
            </Typography>
            {pokemon.types.map((typeInfo) => (
              <Chip
                label={typeInfo.type.name}
                key={typeInfo.type.name}
                sx={{ mr: 1, textTransform: "capitalize" }}
              />
            ))}
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" component="div">
              Abilities
            </Typography>
            {pokemon.abilities.map((abilityInfo) => (
              <Chip
                label={abilityInfo.ability.name}
                key={abilityInfo.ability.name}
                sx={{ mr: 1, textTransform: "capitalize" }}
              />
            ))}
          </Box>

          <Box>
            <Typography variant="h5" component="div">
              Stats
            </Typography>
            {pokemon.stats.map((statInfo) => (
              <Box
                key={statInfo.stat.name}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  maxWidth: "170px",
                }}
              >
                <Typography sx={{ textTransform: "capitalize" }}>
                  {statInfo.stat.name}
                </Typography>
                <Typography>{statInfo.base_stat}</Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
