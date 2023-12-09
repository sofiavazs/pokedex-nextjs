"use client"
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { getEvolutionChain } from "@/api/pokemons";
import BaseStats from "./BaseStats";
import EvolutionChain from "./EvolutionChain";
import TraitList from "./TraitList";

interface Props {
  pokemon: Pokemon;
  evolutionChainId: string;
}

const DetailsPage: React.FC<Props> = ({ pokemon, evolutionChainId }) => {
  const [evolutionResponse, setEvolutionResponse] = useState<EvolutionChain | undefined>(undefined);
  const [error, setError] = useState(undefined);
  const hasEvolution = evolutionResponse && evolutionResponse?.chain.evolves_to.length > 0;

  useEffect(() => {
    if (evolutionChainId) {
      getEvolutionChain(evolutionChainId).then((response) => {
        setEvolutionResponse(response);
      }).catch((error) => {
        setError(error.message);
      });
    }
  }, [evolutionChainId]);

  return (
    <PageContainer>
      <Link href="/">
        {"<<"} Back
      </Link>
      <Wrapper>
        <StyledSection>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
          {hasEvolution && !error &&
            <>
              <EvolutionChain evolutionResponse={evolutionResponse} />
            </>
          }
        </StyledSection>
        <StyledSection>
          <TraitsContainer>
            <TraitList title={"Types"} traits={pokemon.types.map((type) => type.type)} />
            <TraitList title={"Abilites"} traits={pokemon.abilities.map((ability) => ability.ability)} />
          </TraitsContainer>
          <BaseStats pokemon={pokemon} />
        </StyledSection>
      </Wrapper>
    </PageContainer>
  );
};

export default DetailsPage;

const PageContainer = styled.div`
  height: 100vh;

  a {
    display: flex;
    text-decoration: none;
    font-size: 1.5rem;
    color: #063539;
    margin: 1rem 0 1rem 1rem;

    &:hover {
      color: #0c67ad;
      transform: translateX(-10px);
      transition: 0.3s ease-in;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  width: 80vw;
  justify-content: space-evenly;
  background: #ffffffa3;
  margin: auto;
  padding: 2rem 1rem 1rem 1rem;
  border-radius: 1rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.51);

  h2 {
    color: #1b3f68;
    text-transform: capitalize;
    margin: 0;
  }

  img {
    max-width: 200px;
    max-height: 200px;
    margin-bottom: 2rem;
  }

  @media screen and (max-width: 600px) {
    display: block;
  }
`;

const StyledSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;

  .base-stats {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 1rem;

    @media screen and (max-width: 600px) {
      padding-top: 2rem;
      margin-left: 4rem;
    }
  }
`;

const TraitsContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;

    div:first-child {
      margin-right: 5rem;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        margin: 8px;
      }
    }

    @media screen and (max-width: 600px) {
      justify-content: center;
      padding-top: 2rem;
    }
`;
