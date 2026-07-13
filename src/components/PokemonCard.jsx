import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import "./PokemonCard.css";


export default function PokemonCard({ pokemon }) {
    const mediaUrl = import.meta.env.VITE_MEDIA_URL;
    // Construir la URL completa de la imagen usando template literals
    const imageUrl = `${mediaUrl}/${pokemon.picture}`;

    return (
        <Card>
            <CardMedia
                component="img"
                image={imageUrl}
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