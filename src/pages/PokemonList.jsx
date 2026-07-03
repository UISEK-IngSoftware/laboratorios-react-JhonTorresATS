import { Grid } from "@mui/material";
import { pokemons } from "../data/pokemons";
import PokemonCard from "../components/PokemonCard";
import "./PokemonList.css";

export default function PokemonList() {
    return (
        <Grid container spacing={2}>
            {pokemons.map((pokemon) => (
                <Grid item key={pokemon.id} size={12} sm={6} md={4}>
                    <PokemonCard pokemon={pokemon} />
                </Grid>
            ))}
        </Grid>

    );
}