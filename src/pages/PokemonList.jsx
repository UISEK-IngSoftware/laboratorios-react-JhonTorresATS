import { useEffect, useState } from "react";
import { getPokemonsList } from "../services/pokemonService";
import { Grid, Typography } from "@mui/material";
import PokemonCard from "../components/PokemonCard";
import "./PokemonList.css";

export default function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    useEffect(() => {
        getPokemonsList().then((pokemonsData) => {
            setPokemons(pokemonsData);
        }).catch((error) => {
            setErrorMsg("Error al obtener pokemons.");
            alert("Error fetching pokemons:", error);
        })
    },[]);

    return (
        <Grid container spacing={2}>
            {pokemons.map((pokemon) => (
                <Grid item key={pokemon.id} xs={12} sm={6} md={4} lg={3}>
                    <PokemonCard pokemon={pokemon} />
                </Grid>
            ))}
            {errorMsg && (
                <Grid item xs={12}>
                    <div className="error-message">{errorMsg}</div>
                </Grid>
            )}  
        </Grid>
    );
}