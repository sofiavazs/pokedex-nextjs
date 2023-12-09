interface Props {
  title: string;
  traits: Trait[];
}

const TraitList: React.FC<Props> = ({ title, traits }) => {
  return (
    <div>
      <h2>{title}</h2>
      <ul >
        {traits.map((item, index) => {
          return (
            <li key={index}>{item.name}</li>
          )
        })}
      </ul>
    </div>
  );
};

export default TraitList;