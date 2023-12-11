"use client"
import React from "react";
import styled from "styled-components";

interface EvolutionChainProps {
  evolutionResponse: EvolutionChain;
}

const EvolutionChain: React.FC<EvolutionChainProps> = ({ evolutionResponse }) => {
  const firstInChainId = evolutionResponse?.chain.species.url.split('pokemon-species/')[1]?.split('/')[0];
  const firstInChainImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${firstInChainId}.svg`;

  return (
    <>
      <h2>Evolution Chain</h2>
      <Container>
        <div>
          <img
            className="evolution-img"
            src={firstInChainImageUrl}
            alt={evolutionResponse?.chain.species.name}
          />
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
                <img
                  className="evolution-img"
                  src={secondInChainImageUrl}
                  alt={e.species.name}
                />
                <p>{e.species.name}</p>
              </div>
              <div>
                <img
                  className="evolution-img"
                  src={thirdInChainImageUrl}
                  alt={e.evolves_to[0]?.species.name}
                />
                <p>{e.evolves_to[0]?.species.name}</p>
              </div>
            </React.Fragment>
          );
        })}
      </Container></>
  );
};

export default EvolutionChain;

const Container = styled.div`
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