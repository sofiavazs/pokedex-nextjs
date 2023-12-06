import Link from "next/link";
import { getPokemon } from "../api/pokemons";

export default async function PageDetails({ params }: { params: { name: string } }) {
  const { name } = params;

  const pokemon = await getPokemon(name);

  return (
    <>
      <Link href="/">
        Go back
      </Link>
      <h1>{name}</h1>
    </>
  )
};