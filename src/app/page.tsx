import { Suspense } from "react";
import PuffLoader from "react-spinners/PuffLoader";

import { getAllPokemons } from "../api/pokemons";
import SearchList from "./components/SearchList";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{
    limit: number;
    page: number;
  }>;
}) {
  const limit = 24;
  const resolvedSearchParams = await searchParams;
  const currentPage = resolvedSearchParams?.page || 1;
  const offset = (currentPage - 1) * limit;
  const pokemonList = await getAllPokemons(limit, offset);

  return (
    <>
      <Suspense
        key={currentPage}
        fallback={
          <PuffLoader
            color="#ef526f"
            size={100}
            cssOverride={{ position: "absolute", top: "50vh", right: "50vw" }}
          />
        }
      >
        <SearchList
          pokemonData={pokemonList}
          totalCount={pokemonList.count}
          limit={limit}
        />
      </Suspense>
    </>
  );
}
