import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import "./PokemonCard.css";

export default function PokemonCard({ pokemon }) {
    return (
        <Card>
            <CardMedia
                component="img"
                image={pokemon.image}
                alt={pokemon.name}
                height="200"
            />
            <CardContent>
                <Typography variant="h6" component="div">
                    {pokemon.name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">
                    Ver detalles
                </Button>
            </CardActions>
        </Card>
    );
}