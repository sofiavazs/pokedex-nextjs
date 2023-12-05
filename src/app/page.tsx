import PokemonList from './components/PokemonList';
import { getPokemonList } from './api/pokemons';


export default async function Home() {
  const pokemonList = await getPokemonList();
  return (
    <>
      <h1>pokemons</h1>
      <PokemonList pokemonData={pokemonList} />
    </>
  )
}

