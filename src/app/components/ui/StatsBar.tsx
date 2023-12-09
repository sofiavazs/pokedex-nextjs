"use client";
import { keyframes, styled } from "styled-components";

interface StatsBarProps {
  label: string;
  value: number;
}

const StatsBar: React.FC<StatsBarProps> = ({ label, value }) => {
  return (
    <Container>
      <LabelStyles>{label}</LabelStyles>
      <Bar value={value}>
        <LabelStyles value={value}>{value}</LabelStyles>
      </Bar>
    </Container>
  );
};

export default StatsBar;

const Container = styled.div`
  width: 100%;
  border-radius: 50px;
  margin-top: 10px;
`;

const fill = keyframes<{ value: number }>`
  0% {width: 0%}
  100% {width: value}
`;

const Bar = styled.div<{ value: number }>`
  width: ${(props) => props.value < 100 ? props.value + "%" : 100};
  background-image: repeating-linear-gradient(130deg,  #03a9f4bd 0 7px, #2196f3d1 5px 15px);
  border-radius: inherit;
  text-align: center;
  animation: ${fill} 2s linear;
`;

const LabelStyles = styled.span<{ value?: number }>`
  padding: 5px;
  color: "#000";
  font-weight: 'bold';

  ${({ value }) => value && `
    color: #fff;
  `}
`;