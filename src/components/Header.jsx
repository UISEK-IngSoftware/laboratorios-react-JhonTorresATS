import "./Header.css";
import pokedex_logo from "../assets/pokedex_logo.jpg";
import { Container, AppBar, Toolbar } from "@mui/material";


export default function Header() {
    return (
        <header className="pokedex-header">
            <Container>
                <AppBar position="static">
                    <Toolbar>
                        <div className="image-container">
                            <img src={pokedex_logo} alt="Pokedex_logo" height="{100}" />
                        </div>

                    </Toolbar>
                </AppBar>
            </Container>
        </header>

    )   
}