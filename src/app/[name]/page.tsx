import { getPokemon, getPokemonSpecies } from "../../api/pokemons";
import DetailsPage from "../components/DetailsPage/DetailsPage";
import EmptyState from "../components/ui/EmptyState";

export default async function Page({ params }: { params: { name: string } }) {
  const { name } = params;
  const pokemon = await getPokemon(name);
  const pokemonSpecies = await getPokemonSpecies(name);
  const evolutionChainId = pokemonSpecies.evolution_chain.url.split('evolution-chain/')[1]?.split('/')[0];

  return (
    <>
      {pokemon ? (
        <DetailsPage
          pokemon={pokemon}
          evolutionChainId={evolutionChainId}
        />
      ) : (
        <EmptyState text="Ooops something went wrong, please try again later" />
      )}
    </>
  );
};