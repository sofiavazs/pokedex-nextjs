"use client"
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { getEvolutionChain } from "@/api/pokemons";
import StatsBar from "../components/StatsBar";

interface Props {
  pokemon: Pokemon;
  evolutionChainId: string;
}

const DetailsPage: React.FC<Props> = ({ pokemon, evolutionChainId }) => {
  const [evolutionResponse, setEvolutionResponse] = useState<EvolutionChain | undefined>(undefined);
  const firstInChainId = evolutionResponse?.chain.species.url.split('pokemon-species/')[1]?.split('/')[0];
  const firstInChainImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${firstInChainId}.svg`;


  useEffect(() => {
    if (evolutionChainId) {
      getEvolutionChain(evolutionChainId).then((response) => {
        setEvolutionResponse(response);
      })
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
          <h2>Evolution Chain</h2>
          <EvolutionChainContainer>
            <div>
              <img className="evolution-img" src={firstInChainImageUrl} />
              <p>{evolutionResponse?.chain.species.name}</p>
            </div>
            {evolutionResponse?.chain.evolves_to.map((e, i) => {
              const secondInChainId = e.species.url.split('pokemon-species/')[1]?.split('/')[0];
              const thirdInChainId = e.evolves_to[0]?.species.url.split('pokemon-species/')[1]?.split('/')[0];
              const secondInChainImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${secondInChainId}.svg`;
              const thirdInChainImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${thirdInChainId}.svg`;
              return (
                <React.Fragment key={i}>
                  <div>
                    <img className="evolution-img" src={secondInChainImageUrl} />
                    <p>{e.species.name}</p>
                  </div>
                  <div>
                    <img className="evolution-img" src={thirdInChainImageUrl} />
                    <p>{e.evolves_to[0]?.species.name}</p>
                  </div>
                </React.Fragment>
              );
            })}
          </EvolutionChainContainer>
        </StyledSection>
        <StyledSection>
          <div className="types-abilities-wrapper">
            <div>
              <h2>Types</h2>
              {pokemon.types.map((item, index) => {
                return (
                  <p key={index}>{item.type.name}</p>
                )
              })}
            </div>
            <div>
              <h2>Abilities</h2>
              {pokemon.abilities.map((item, index) => {
                return (
                  <p key={index}>{item.ability.name}</p>
                )
              })}
            </div>
          </div>
          <div className="base-stats">
            <h2>Base Stats</h2>
            {pokemon.stats.map((item, index) => {
              return (
                <div key={index}><span>{item.stat.name}</span><StatsBar value={item.base_stat} /></div>
              )
            })}
          </div>
        </StyledSection>
      </Wrapper>
    </PageContainer>
  )
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
  background: white;
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
`;

const StyledSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;

  .types-abilities-wrapper {
    display: flex;
    flex-direction: row;
    width: 100%;

    div:first-child {
      margin-right: 5rem;
    }
  }
  .base-stats {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 1rem;
  }
`;

const EvolutionChainContainer = styled.div`
  display: flex;
  padding: 8px;
  align-items: baseline;

  div {
    display: flex;
    flex-direction: column;
    margin: 1rem;
    align-items: center;

    img {
      max-width: 50px;
      max-height: 50px;
      margin: 0;
    }

    p {
      text-transform: capitalize;
      margin: 0;
    }
  }
`;

