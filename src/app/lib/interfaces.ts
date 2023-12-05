interface PokemonListResponse {
  count: number;
  next: string;
  results: Pokemon[];
  previous: boolean;
}

interface Pokemon {
  name: string;
  url: string;
}