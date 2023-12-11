# Pokémon Explorer 🔍

Pokédex style application using the [PokéAPI](https://pokeapi.co/) the  where all pokémons are listed on the landing page and the user can just navigate through the pages to see all the pokémons and/or use the search input to search for a specific pokémon.

Specific details of a pokémon can be acessed by clicking on a pokémon card or "view", this will navigate the user to the pokémon's details page.
The details page show the following information:
- Name and image of the pokémon
- Types
- Abilities
- Evolution chain
- Base stats (hp, attack, defense, special-attack, special-defense, speed)

## How to run locally

First, run ```npm install``` to install the dependencies needed.

To start the development server run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack
- Typescript
- Next.js
- Styled Components

## Project Structure

```public/assets```: contains the asset images.

```src/api/pokemons.ts```: contains all API requests.

```src/app```:

```layout.tsx```: Root of the app, contains the metadata object, renders the ```Header.tsx``` and children.

```page.tsx```: Home page, renders the ```SearchList.tsx```component.

```[name]/page```: renders the ```DetailsPage.tsx``` component by passing in the specific pokémon data.

```src/components```:

```SearchList.tsx```: displays all pokémons and renders the pagination component. If the user performs a search, the exact match pokémon will be displayed. If there's no match a message is displayed to the user informing that.

```src/components/DetailsPage```:

```DetailsPage.tsx```: renders the pokémon name and image and the different components to display the pokémon's details:

```EvolutionChain.tsx```: renders the evolution chain with name and image of the pokémons it evolves to.

```TraitList.tsx```: accepts props and renders Types and Abilities list accordingly.

```BaseStats.tsx```: renders the different stats.

```src/components/ui```: contains all the reusable UI   components: ```Card.tsx```, ```EmptyState.tsx```, ```Header.tsx```, ```Pagination.tsx``` and ```StatsBar.tsx```.

```src/app/lib```: contains all the project interfaces and the styled components registry file.

```src/app/helpers```: contains helper hook/functions.

## Styling
 Styling was done with styled components (CSS-in-JS) with responsive design in mind. My approach was to keep the styled components within the component they're being used - in the future I would like to extract some of them and make them reusable so they can be used globally.

## Accessibility
Accessibility checks performed with lighthouse, accessible navigation done manually.

## View it live
[https://pokemonexplorer.vercel.app/](https://pokemonexplorer.vercel.app/)