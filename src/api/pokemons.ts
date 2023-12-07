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

export const getPokemonSpecies = async (name: string): Promise<PokemonSpecies> => {
  const { data } = await axios.get(POKEMON_BASE_URL + `pokemon-species/${name}`);
  return data;
};

export const getEvolutionChain = async (id: string): Promise<EvolutionChain> => {
  const { data } = await axios.get(POKEMON_BASE_URL + `evolution-chain/${id}`);
  return data;
};

