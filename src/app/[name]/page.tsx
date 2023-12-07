import { getPokemon, getPokemonSpecies } from "../../api/pokemons";
import DetailsPage from "../components/DetailsPage"

export default async function Page({ params }: { params: { name: string } }) {
  const { name } = params;
  const pokemon = await getPokemon(name);
  const pokemonSpecies = await getPokemonSpecies(name);
  const evolutionChainId = pokemonSpecies.evolution_chain.url.split('evolution-chain/')[1]?.split('/')[0];
  const hasEvolution = pokemonSpecies.order < 3;

  return (
    <>
      <DetailsPage
        pokemon={pokemon}
        evolutionChainId={evolutionChainId}
        hasEvolution={hasEvolution}
      />
    </>
  )
};