/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";

import SearchList from "@/app/components/SearchList";

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

  it('renders the list of cards that contain a heading and an image', () => {
    render(<SearchList pokemonData={mockData} totalCount={151} limit={24} />);

    const cardHeading = screen.findByRole('h2', {
      name: mockData.results[0].name,
    });
    waitFor(() => expect(cardHeading).toBeInTheDocument());

    const pokemonId = mockData.results[0].url.split('pokemon/')[1]?.split('/')[0];
    const image = screen.getByAltText(mockData.results[0].name);
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

    expect(image.getAttribute('src')).toContain(imageUrl);
  });

  it('updates search input value on change', () => {
    render(<SearchList pokemonData={mockData} totalCount={151} limit={24} />);

    const searchInput = screen.getByLabelText("Search Pokémon") as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(searchInput).toHaveValue('test');
  });

  it('should return value from search input', () => {
    render(<SearchList pokemonData={mockData} totalCount={151} limit={24} />);

    const searchInput = (screen.getByLabelText("Search Pokémon") as HTMLInputElement).value = "Bulbasaur";
    const mockFilter = mockData.results.filter((item) => item.name === searchInput);
    const mockItem = mockFilter[0].name;

    expect(searchInput).toEqual(mockItem);
  });
});

/**
 * Test Mock Data
 */
const mockData =
{
  count: 151,
  next: "link",
  previous: "link",
  results: [
    {
      name: "Bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
      name: "Pikachu",
      url: "https://pokeapi.co/api/v2/pokemon/25/"
    },
  ],
}


