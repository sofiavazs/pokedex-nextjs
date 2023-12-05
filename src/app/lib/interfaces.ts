interface PokemonListResponse {
  count: number;
  next: string;
  previous: string;
  results: PokemonNameAndUrl[];
}

interface PokemonNameAndUrl {
  name: string;
  url: string;
}

interface Pokemon {
  name: string;
  id: number,
  sprites:{
    other: {
      official_artwork :{
        front_default : string
      }
    }
  }
  stats: {
    base_stat: number,
  }[];
  abilities: {
    ability: {
      name: string;
    }
  }[];
}