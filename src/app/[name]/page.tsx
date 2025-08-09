import { Suspense } from "react";
import { PuffLoader } from "react-spinners";
import { getPokemon, getPokemonSpecies } from "../../api/pokemons";
import DetailsPage from "../components/DetailsPage/DetailsPage";

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const pokemon = await getPokemon(name);
  const pokemonSpecies = await getPokemonSpecies(name);
  const evolutionChainId = pokemonSpecies.evolution_chain.url
    .split("evolution-chain/")[1]
    ?.split("/")[0];

  return (
    <Suspense
      key={name}
      fallback={
        <PuffLoader
          color="#ef526f"
          size={100}
          cssOverride={{ position: "absolute", top: "50vh", right: "50vw" }}
        />
      }
    >
      <DetailsPage pokemon={pokemon} evolutionChainId={evolutionChainId} />
    </Suspense>
  );
}
