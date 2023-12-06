import axios from "axios";

const POKEMON_BASE_URL = "https://pokeapi.co/api/v2/";

export const getAllPokemons = async (limit: number, offset: number): Promise<PokemonListResponse> => {
  const { data } = await axios.get(POKEMON_BASE_URL + `pokemon?limit=${limit}&offset=${offset}`);
  return data;
};

export const getPokemon = async (name: string): Promise<Pokemon> => {
  const { data } = await axios.get(POKEMON_BASE_URL + `pokemon/${name}`);
  return data;
};