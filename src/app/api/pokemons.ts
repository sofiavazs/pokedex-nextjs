import axios from "axios";

const POKEMON_BASE_URL = "https://pokeapi.co/api/v2/";

export const getAllPokemons = async (): Promise<PokemonListResponse> => {
  const { data } = await axios.get(POKEMON_BASE_URL + "pokemon?limit=151&offset=0");
  return data;
};

export const getPokemon = async (name: string): Promise<Pokemon> => {
  const { data } = await axios.get(POKEMON_BASE_URL + `pokemon/${name}`);
  return data;
};