"use client";
import Link from "next/link";

interface PokemonCardProps {
  name: string;
}

const Card: React.FC<PokemonCardProps> = ({ name }) => {

  return (
    <>
      <Link
        href={name}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>{name}</h2>
      </Link>
    </>

  );
};

export default Card;