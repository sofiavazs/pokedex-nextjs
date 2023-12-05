"use client";
import { useEffect, useState } from "react";
import Card from "./Card";

interface PokemonListProps {
  pokemonData: PokemonListResponse;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemonData }) => {
  const [search, setSearch] = useState<string>("");


  const searchFilter = (pokemonData: PokemonListResponse) => {
    return pokemonData.results.filter((pokemon) => pokemon.name.toLowerCase().includes(search.toLowerCase()))
  };

  const filteredList = searchFilter(pokemonData)

  return (
    <>
      <div>
        <h2>Search Pokémon</h2>
        <div>
          <label htmlFor="pokemonName">Pokémon Name</label>
          <input
            autoComplete="off"
            type="text"
            id="pokemonName"
            placeholder="example: pikachu, psyduck etc"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          {filteredList.map((pokemon, index) => {
            return (
              <Card key={index} name={pokemon.name} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PokemonList;