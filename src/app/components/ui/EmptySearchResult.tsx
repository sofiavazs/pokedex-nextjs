"use client";
import { styled } from "styled-components";

interface EmptySearchResultProps {
  text: string;
  imageUrl?: string;
}

const EmptySearchResult: React.FC<EmptySearchResultProps> = ({ text, imageUrl }) => {
  return (
    <MessageContainer>
      <h2>{text}</h2>
      <img src={imageUrl} alt="gif" />
    </MessageContainer>
  );
};

export default EmptySearchResult;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #0c67ad;

  img {
    max-width: 300px;
    max-height: 300px;
  }
`;