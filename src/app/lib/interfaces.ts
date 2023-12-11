interface PokemonListResponse {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string,
    url: string,
  }[];
}

interface Trait {
  name: string;
  url: string;
}

interface Pokemon {
  name: string;
  id: number;
  species: {
    name: string,
    url: string,
  }
  sprites:{
    other: {
      "official-artwork" :{
        front_default : string;
      }
    }
  }
  types: {
    type: Trait;
  }[]
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string,
      url: string,
    }
  }[];
  abilities: {
    ability: Trait;
  }[];
}

interface PokemonSpecies {
  evolution_chain: {
    url: string;
  }
  order: number;
}

interface Evolution {
  species: {
    name: string,
    url: string,
  }
  evolves_to: Evolution[];
}

interface EvolutionChain {
  chain: {
    evolves_to: Evolution[];
    species: {
      name: string;
      url: string;
    }
  }
}