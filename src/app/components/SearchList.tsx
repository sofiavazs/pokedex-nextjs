"use client";
import { useState } from "react";
import { styled } from "styled-components";
import Card from "./Card";

interface PokemonListProps {
  pokemonData: PokemonListResponse;
}

const SearchList: React.FC<PokemonListProps> = ({ pokemonData }) => {
  const [search, setSearch] = useState<string>("");

  const searchFilter = (pokemonData: PokemonListResponse) => {
    return pokemonData.results.filter((pokemon) => pokemon.name.toLowerCase().includes(search.toLowerCase()))
  };

  const filteredList = searchFilter(pokemonData)

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
      <GridContainer>
        {filteredList.map((pokemon, index) => {
          return (
            <Card
              key={index}
              name={pokemon.name}
              url={pokemon.url}
            />
          );
        })}
      </GridContainer>
    </Container>
  );
};
export default SearchList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5rem;
  margin-bottom: 5rem;
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
    height: 2.5rem;
    padding: 1rem;
    border: 1px solid #dfe1e5;
    border-radius: 1rem;
    margin-top: 1rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(30%, 1fr));
  padding-top: 1.5rem;

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(auto-fill,minmax(100%, 1fr));
  }

  @media screen and (min-width: 600px) and (max-width: 992px) {
    grid-template-columns: repeat(auto-fill,minmax(50%, 1fr));
  }
`;