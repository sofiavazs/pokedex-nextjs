'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { styled } from 'styled-components';

interface PaginationProps {
  totalCount: number;
  limit: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalCount, limit }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPages = Math.ceil(totalCount / limit);

  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  const handleNavigationPreviousPage = () => {
    if (hasPreviousPage) {
      router.push(`/?page=${currentPage - 1}`);
    };
  };

  const handleNavigationNextPage = () => {
    if (hasNextPage) {
      router.push(`/?page=${currentPage + 1}`);
    };
  };

  return (
    <PaginationWrapper>
      <button
        className="previous-button"
        disabled={!hasPreviousPage}
        onClick={handleNavigationPreviousPage}>
      </button>
      <span>page {currentPage} of {totalPages}</span>
      <button
        className="next-button"
        disabled={!hasNextPage}
        onClick={handleNavigationNextPage}>
        <span></span>
      </button>
    </PaginationWrapper>
  )
};
export default Pagination;

const PaginationWrapper = styled.div`
  width: 25vw;
  display: flex;
  justify-content: space-between;
  align-self: center;
  padding: 1rem;
  border-radius: 1rem;
  margin: 1rem;
  background-color: #fff;
  box-shadow: 0px 1px 5px rgba(190, 190, 190, 0.46);
  -webkit-box-shadow: 0px 1px 5px rgba(190, 190, 190, 0.46);

  button {
    background: transparent;
    border: none;
    cursor: pointer;

    &:hover {
      color: #7d0cad;
    }
  }

  .previous-button::before {
    display: inline-block;
    border-style: solid;
    border-width: 4px 4px 0 0;
    content: '';
    width: 1rem;
    height: 1rem;
    transform: rotate(225deg);
    vertical-align: top;
  };

  .next-button::before {
    display: inline-block;
    border-style: solid;
    border-width: 4px 4px 0 0;
    content: '';
    width: 1rem;
    height: 1rem;
    transform: rotate(45deg);
    vertical-align: top;
  }
`;

