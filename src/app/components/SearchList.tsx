"use client";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import PuffLoader from "react-spinners/PuffLoader";

import { getPokemon } from "../../api/pokemons";
import { useDebounce } from "../../helpers/useDebounce";
import Card from "./Card";
import Pagination from "./Pagination";
import ErrorMessage from "./EmptySearchResult";
import EmptySearchResult from "./EmptySearchResult";

interface PokemonListProps {
  pokemonData: PokemonListResponse;
  totalCount: number;
  limit: number;
}

const SearchList: React.FC<PokemonListProps> = ({ pokemonData, totalCount, limit }) => {
  const [searchResponse, setSearchResponse] = useState<Pokemon | undefined>(undefined);
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(undefined);
  const debouncedValue = useDebounce<string>(search, 1000);
  const formattedSearch = search.toLowerCase();

  useEffect(() => {
    if (search.length > 0) {
      setIsLoading(true)
      getPokemon(formattedSearch).then((response) => {
        setSearchResponse(response);
      }).catch((error) => {
        setError(error.message);
      }).finally(() => {
        setIsLoading(false);
      });
    }
    setSearchResponse(undefined);
    setError(undefined);
  }, [debouncedValue]);


  return (
    <Container>
      <SearchBoxWrapper>
        <label htmlFor="pokemonName">Search Pokémon</label>
        <input
          autoComplete="off"
          type="text"
          id="pokemonName"
          placeholder="example: pikachu, psyduck etc"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchBoxWrapper>
      <PuffLoader
        loading={isLoading}
        color="#7d0cad" size={100}
        cssOverride={{ position: "absolute", top: "50vh", right: "50vw" }}
      />
      {error ? <EmptySearchResult text="Oooops! Couldn't find that Pokémon, please try again!" /> : (
        <GridContainer>
          {searchResponse ? (
            <Card
              name={searchResponse.name}
              id={searchResponse.id}
            />
          ) : (
            !isLoading && pokemonData.results.map((pokemon, index) => {
              return (
                <Card
                  key={index}
                  name={pokemon.name}
                  url={pokemon.url}
                />
              );
            })
          )}
        </GridContainer>
      )}
      {!error && !isLoading &&
        <Pagination
          totalCount={totalCount}
          limit={limit}
        />
      }
    </Container>
  );
};
export default SearchList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5rem;
  margin-bottom: 2rem;
`;

const SearchBoxWrapper = styled.div`
  display: flex;
  width: 50vw;
  text-align: center;
  align-self: center;
  flex-direction: column;
  padding: 1.5rem;

  label {
    font-size: 1.5rem;
  }

  input[type=text] {
    height: 1.5rem;
    padding: 1rem;
    border: 1px solid #dfe1e5;
    border-radius: 1rem;
    margin-top: 1rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(30%, 1fr));

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(auto-fill,minmax(100%, 1fr));
  }

  @media screen and (min-width: 600px) and (max-width: 992px) {
    grid-template-columns: repeat(auto-fill,minmax(50%, 1fr));
  }
`;