import { getAllPokemons } from './api/pokemons';
import Header from './components/Header';
import SearchList from './components/SearchList';


export default async function Home() {
  const pokemonList = await getAllPokemons();

  return (
    <>
      <SearchList pokemonData={pokemonList} />
    </>
  )
}

