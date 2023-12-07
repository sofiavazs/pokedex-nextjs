"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { getEvolutionChain } from "@/api/pokemons";
import StatsBar from "../components/StatsBar";

interface Props {
  pokemon: Pokemon;
  evolutionChainId: string;
  hasEvolution: boolean;
}

const DetailsPage: React.FC<Props> = ({ pokemon, evolutionChainId, hasEvolution }) => {
  const [evolutionResponse, setEvolutionResponse] = useState<EvolutionChain | undefined>(undefined);

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
          {evolutionResponse?.chain.evolves_to.map((e, i) => {
            const isSamePokemon = e.species.name === pokemon.name;
            const id = e.species.url.split('pokemon-species/')[1]?.split('/')[0];
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
            return (
              <div key={i}>
                {!isSamePokemon && hasEvolution &&
                  <>
                    <p>{e.species.name}</p>
                    <img src={imageUrl} />
                  </>
                }
                {e.evolves_to.map((e, i) => {
                  const id = e.species.url.split('pokemon-species/')[1]?.split('/')[0];
                  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
                  return (
                    <div key={i}>
                      {hasEvolution &&
                        <>
                          <p>{e.species.name}</p>
                          <img src={imageUrl} />
                        </>
                      }
                    </div>
                  )
                })}
              </div>
            )
          })}
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
                <div key={index}>{item.stat.name} <StatsBar value={item.base_stat} /></div>
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
  display: flex;
  flex-direction: column;
  height: 80vh;

  a {
    text-decoration: none;
    font-size: 1.5rem;
    color: #063539;
    margin: 3rem 0 0 1rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 80vw;
  background: white;
  margin: auto;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.5px);
  -webkit-backdrop-filter: blur(6.5px);
  border: 1px solid rgba(255, 255, 255, 0.51);

  h2 {
    color: #1b3f68;
    text-transform: capitalize;
    margin: 0;
  }

  img {
    max-width: 300px;
    max-height: 300px;
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
  }
`;

