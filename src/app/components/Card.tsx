"use client";
import Link from "next/link";
import { styled } from "styled-components";
import { capitalize } from "../helpers/capitalize";

interface PokemonCardProps {
  name: string;
  url: string;
}

const Card: React.FC<PokemonCardProps> = ({ name, url }) => {
  const pokemonId = url.split('pokemon/')[1].split('/')[0];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  return (
    <>
      <StyledLink
        href={name}
        rel="noopener noreferrer"
      >
        <h2>{capitalize(name)}</h2>
        <img
          src={imageUrl}
        />

      </StyledLink>
    </>
  );
};
export default Card;

const StyledLink = styled(Link)`
  display: flex;
  padding: 2rem;
  margin: 1rem;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  background: rgba(255, 255, 255, 0.175);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.5px);
  -webkit-backdrop-filter: blur(6.5px);
  border: 1px solid rgba(255, 255, 255, 0.51);
  text-decoration: none;

  &:hover {
    transform: translateY(-10px);
    transition: all 0.3s ease-in-out;
  }

  h2 {
    align-self: center;
  }

  img {
    width: 200px;
    height: 200px;
    align-self: center;
  }
`;

