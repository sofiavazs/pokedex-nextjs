import axios from 'axios';
import { render, screen, waitFor } from '@testing-library/react';

import { getEvolutionChain, getPokemon } from '@/api/pokemons';
import DetailsPage from '@/app/components/DetailsPage/DetailsPage';
import EvolutionChain from '@/app/components/DetailsPage/EvolutionChain';
import TraitList from '@/app/components/DetailsPage/TraitList';
import BaseStats from '@/app/components/DetailsPage/BaseStats';

// Mock axios module
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Details Page", () => {

  it('should render heading and image', () => {
    render(
      <DetailsPage pokemon={pokemonMockData} evolutionChainId={"1"} />
    )
    const heading = screen.findByRole('heading');
    const image = screen.findByRole('img');

    waitFor(() => {
      expect(heading).toHaveTextContent('Bulbasaur');
      expect(image).toBeInTheDocument();
    });
  });

  it('should render the types section', () => {
    render(
      <TraitList title={"Types"} traits={pokemonMockData.types.map((type) => type.type)} />
    )
    const typesHeading = screen.getByText("Types");
    const typeListItem = screen.getByText("grass");
    const typeItem = pokemonMockData.types[0].type.name;

    expect(typesHeading.textContent).toBe('Types');
    expect(typeListItem.textContent).toBe(typeItem);
  });

  it('should render the abilities section', () => {
    render(
      <TraitList title={"Abilities"} traits={pokemonMockData.abilities.map((ability) => ability.ability)} />
    )

    const abilitiesHeading = screen.getByText("Abilities");
    const abilityListItem = screen.getByText("overgrow");
    const abilityItem = pokemonMockData.abilities[0].ability.name;

    expect(abilitiesHeading.textContent).toBe('Abilities');
    expect(abilityListItem.textContent).toBe(abilityItem);
  });

  it('should render the evolution chain section', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockEvolutionData });
    const result = await getEvolutionChain(pokemonMockData.id.toString());
    render(
      <EvolutionChain evolutionResponse={mockEvolutionData} />
    )

    const evolutionChainHeading = screen.getByText("Evolution Chain");
    const evolutionName = result.chain.evolves_to[0].species.name;
    const image = screen.getByAltText(result.chain.evolves_to[0].species.name);

    expect(evolutionChainHeading.textContent).toBe('Evolution Chain');
    expect(evolutionName).toMatch("ivysaur");
    expect(image.getAttribute('alt')).toContain("ivysaur");
  });

  it('should render the base stats section', async () => {
    mockedAxios.get.mockResolvedValue({ data: pokemonMockData });
    const result = await getPokemon(pokemonMockData.name);
    render(
      <BaseStats pokemon={pokemonMockData} />
    )

    const baseStatsHeading = screen.getByText("Base Stats");
    const statsLabel = result.stats[0].stat.name;
    const statsValue = result.stats[0].base_stat;

    expect(baseStatsHeading.textContent).toBe('Base Stats');
    expect(statsLabel).toMatch("hp");
    expect(statsValue).toBe(45);
  });
});

/**
 * Test Mock Data
 */

const pokemonMockData =
{
  name: "Bulbasaur",
  id: 1,
  species: {
    name: "test",
    url: "test",
  },
  sprites: {
    other: {
      "official-artwork": {
        front_default: "test"
      }
    }
  },
  types: [{
    type: {
      name: "grass",
      url: "test",
    }
  }],
  stats: [{
    base_stat: 45,
    effort: 30,
    stat: {
      name: "hp",
      url: "test",
    }
  }],
  abilities: [{
    ability: {
      name: "overgrow",
      url: "url"
    }
  }]
};

const mockEvolutionData =
{
  "chain": {
    "evolution_details": [],
    "evolves_to": [
      {
        "evolution_details": [
          {
            "gender": null,
            "held_item": null,
            "item": null,
            "known_move": null,
            "known_move_type": null,
            "location": null,
            "min_affection": null,
            "min_beauty": null,
            "min_happiness": null,
            "min_level": 16,
            "needs_overworld_rain": false,
            "party_species": null,
            "party_type": null,
            "relative_physical_stats": null,
            "time_of_day": "",
            "trade_species": null,
            "trigger": {
              "name": "level-up",
              "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
            },
            "turn_upside_down": false
          }
        ],
        "evolves_to": [
          {
            "evolution_details": [
              {
                "gender": null,
                "held_item": null,
                "item": null,
                "known_move": null,
                "known_move_type": null,
                "location": null,
                "min_affection": null,
                "min_beauty": null,
                "min_happiness": null,
                "min_level": 32,
                "needs_overworld_rain": false,
                "party_species": null,
                "party_type": null,
                "relative_physical_stats": null,
                "time_of_day": "",
                "trade_species": null,
                "trigger": {
                  "name": "level-up",
                  "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
                },
                "turn_upside_down": false
              }
            ],
            "evolves_to": [],
            "is_baby": false,
            "species": {
              "name": "venusaur",
              "url": "https://pokeapi.co/api/v2/pokemon-species/3/"
            }
          }
        ],
        "is_baby": false,
        "species": {
          "name": "ivysaur",
          "url": "https://pokeapi.co/api/v2/pokemon-species/2/"
        }
      }
    ],
    "is_baby": false,
    "species": {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon-species/1/"
    }
  },
  "id": 1
}