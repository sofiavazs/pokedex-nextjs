import { Suspense } from 'react';
import { getAllPokemons } from '../api/pokemons';
import SearchList from './components/SearchList';
import Pagination from './components/Pagination';

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    limit: number,
    page: number,
  },
}) {

  const limit = 24;
  const currentPage = searchParams?.page || 1;
  const offset = (currentPage - 1) * limit;
  const pokemonList = await getAllPokemons(limit, offset);

  return (
    <>
      <Suspense key={currentPage} fallback={"loading.."}>
        <SearchList pokemonData={pokemonList} />
        <Pagination
          totalCount={pokemonList.count}
          limit={limit}
        />
      </Suspense>
    </>
  )
}

