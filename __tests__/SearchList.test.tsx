/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import axios from 'axios';
import { render, screen, waitFor, fireEvent } from "@testing-library/react";

import { getPokemon } from "@/api/pokemons";
import SearchList from "@/app/components/SearchList";

// Mock axios module
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock to skip the testing on a child component
jest.mock("../src/app/components/ui/Pagination", () => {
  return {
    __esModule: true,
    default: () => {
      return <div />;
    }
  };
});

describe('Test list items display as intended and search functionality', () => {

  it('renders the list of cards that contains a heading and an image', () => {
    render(<SearchList pokemonData={mockPokemonListResponseData} totalCount={151} limit={24} />);

    const cardHeading = screen.findByRole('h2', {
      name: mockPokemonListResponseData.results[0].name,
    });
    waitFor(() => expect(cardHeading).toBeInTheDocument());

    const pokemonId = mockPokemonListResponseData.results[0].url.split('pokemon/')[1]?.split('/')[0];
    const image = screen.getByAltText(mockPokemonListResponseData.results[0].name);
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

    expect(image.getAttribute('src')).toContain(imageUrl);
  });

  it('updates search input value on change', () => {
    render(<SearchList pokemonData={mockPokemonListResponseData} totalCount={151} limit={24} />);

    const searchInput = screen.getByLabelText("Search Pokémon") as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(searchInput).toHaveValue('test');
  });

  it('should display the result from the search', async () => {
    render(<SearchList pokemonData={mockPokemonListResponseData} totalCount={151} limit={24} />);
    const mockPokemonName = mockPokemonListResponseData.results[0].name;

    mockedAxios.get.mockResolvedValue({ data: mockPokemonName });
    const result = await getPokemon(mockPokemonName);

    expect(result).toEqual("Bulbasaur");
  });
});

/**
 * Test Mock Data
 */
const mockPokemonListResponseData =
{
  count: 151,
  next: "link",
  previous: "link",
  results: [
    {
      name: "Bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/"
    },
  ],
};


