import Header from './components/Header'
import PokemonList from './pages/PokemonList';
import { Container } from '@mui/material';
import './App.css'

function App() {
  return (
    <>
      <Header />
      <Container>
        <PokemonList />
      </Container>
    </>
  );
}

export default App;
