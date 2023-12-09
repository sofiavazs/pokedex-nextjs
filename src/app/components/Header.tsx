"use client";
import Link from "next/link";
import { styled } from "styled-components";

interface Props {
  headerText: string;
  icon: string;
  url?: string;
}

const Header: React.FC<Props> = ({ headerText, icon, url }) => {
  return (
    <StyledHeader>
      {url ? (
        <Link href={url}>
          <h1>{headerText}</h1>
          <img src={icon} />
        </Link>
      ) : (
        <>
          <h1>{headerText}</h1>
          <img src={icon} />
        </>
      )}
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  width: 100vw;
  height: 5rem;
  display: flex;
  justify-content: flex-start;
  align-items:center;
  top:0;
  box-shadow: 0px 1px 5px rgba(190, 190, 190, 0.46);
  -webkit-box-shadow: 0px 1px 5px rgba(190, 190, 190, 0.46);
  background-color: rgba(255, 255, 255, 0.287);
  -webkit-backdrop-filter: blur(4px);
  -moz-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);

  h1 {
    padding-left: 1rem;
  }

  img {
    width: 3.5rem;
    height: 2rem;
  }

  a {
    display: flex;
    text-decoration: none;
    align-items: center;
    color: #342022d0;
  }
`;