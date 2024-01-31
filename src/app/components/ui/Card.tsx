"use client";
import Link from "next/link";
import { styled } from "styled-components";

interface CardProps {
  name: string;
  url?: string;
  image?: string;
  id?: number;
}

const Card: React.FC<CardProps> = ({ name, url, id }) => {
  const pokemonId = url ? url?.split("pokemon/")[1]?.split("/")[0] : id;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  return (
    <>
      <StyledLink href={name} rel="noopener noreferrer">
        <h2>{name}</h2>
        <img src={imageUrl} alt={name} />
        <p>View {">>"}</p>
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
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 1rem;
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
    color: #ef526f;
    align-self: center;
    text-transform: capitalize;
  }

  p {
    font-size: 1.25rem;
    color: #1b395e;

    &:hover {
      color: #0c67ad;
    }
  }

  img {
    max-width: 175px;
    max-height: 175px;
    align-self: center;
  }
`;
