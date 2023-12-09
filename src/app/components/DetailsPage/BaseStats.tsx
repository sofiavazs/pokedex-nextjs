import React from "react";
import StatsBar from "../ui/StatsBar";

interface BaseStatsProps {
  pokemon: Pokemon;
}

const BaseStats: React.FC<BaseStatsProps> = ({ pokemon }) => {
  return (
    <div className="base-stats">
      <h2>Base Stats</h2>
      {pokemon.stats.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <StatsBar label={item.stat.name} value={item.base_stat} />
          </React.Fragment>
        )
      })}
    </div>
  );
};

export default BaseStats;