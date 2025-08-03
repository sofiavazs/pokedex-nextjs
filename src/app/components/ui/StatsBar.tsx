"use client";
import { useEffect, useState } from "react";
import { keyframes, styled } from "styled-components";

interface StatsBarProps {
  label: string;
  value: number;
}

const StatsBar: React.FC<StatsBarProps> = ({ label, value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    let frameId: number;

    const duration = 1000;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);
      const currentValue = Math.floor(value * percent);
      setDisplayValue(currentValue);

      if (percent < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [value]);
  return (
    <Container>
      <LabelStyles>{label}</LabelStyles>
      <Bar value={value}>
        <LabelStyles value={value}>{displayValue}</LabelStyles>
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
  100% {width: ${(props) => props.value}}
`;

const Bar = styled.div<{ value: number }>`
  width: ${(props) => (props.value < 100 ? props.value + "%" : 100)};
  background-image: repeating-linear-gradient(
    130deg,
    #03a9f4bd 0 7px,
    #2196f3d1 5px 15px
  );
  border-radius: inherit;
  text-align: center;
  animation: ${fill} 1000ms linear forwards;
`;

const LabelStyles = styled.span<{ value?: number }>`
  padding: 5px;
  color: "#000";
  font-weight: 900;
  color: ${({ value }) => (value ? "#fff" : "#000")};
`;
