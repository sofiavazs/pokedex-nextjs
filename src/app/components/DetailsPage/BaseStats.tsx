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
          <div key={index}>
            <span>{item.stat.name}</span>
            <StatsBar value={item.base_stat} />
          </div>
        )
      })}
    </div>
  );
};

export default BaseStats;