"use client";
import { styled } from "styled-components";

interface Props {
  value: number;
}

const StatsBar: React.FC<Props> = ({ value }) => {
  return (
    <Container>
      <Bar value={value}>
        <LabelStyles>{value}</LabelStyles>
      </Bar>


    </Container>
  )
};
export default StatsBar;

const Container = styled.div`
  width: 100%;
  background-color: "#e0e0de";
  border-radius: 50;
  margin: 50;
`;

const Bar = styled.div<{ value: number }>`
  width: ${(props) => props.value + "%"} ;
  background-color: #82b8db;
  border-radius: inherit;
  text-align: center;
`;

const LabelStyles = styled.span`
  padding: 5px;
  color: 'white';
  font-weight: 'bold';
`;