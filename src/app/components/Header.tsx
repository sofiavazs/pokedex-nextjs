"use client";
import { styled } from "styled-components";

interface Props {
  headerText: string;
}

const Header: React.FC<Props> = ({ headerText }) => {
  return (
    <StyledHeader>
      <h1>{headerText}</h1>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  width: 100vw;
  height: 5rem;
  display: flex;
  justify-content: flex-start;
  position: sticky;
  align-items:center;
  top:0;
  box-shadow: 0px 1px 5px rgba(190, 190, 190, 0.46);
  -webkit-box-shadow: 0px 1px 5px rgba(190, 190, 190, 0.46);
  background-color: rgba(255, 255, 255, 0.287);
  -webkit-backdrop-filter: blur(4px);
  -moz-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
`;