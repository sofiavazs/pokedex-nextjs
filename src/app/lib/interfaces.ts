interface PokemonListResponse {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string,
    url: string,
  }[];
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
    type: {
      name: string,
      url: string,
    }
  }[]
  stats: {
    base_stat: number;
    effort: number;
    stat:{
      name: string,
      url: string,
    }
  }[];
  abilities: {
    ability: {
      name: string;
    }
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