import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PER_PAGE } from "../utils/constants";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export default function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const lastPage = Math.ceil(count / PER_PAGE)

  function handleNextPage (){
    const next = currentPage === lastPage ? currentPage : currentPage + 1;
    searchParams.set('page', next)
    setSearchParams(searchParams)
  }

  function handlePrevPage (){
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set('page', prev)
    setSearchParams(searchParams)
  }

  if(lastPage <= 1) return null;
  return (
    <StyledPagination>
      <P>
        showing
        <span> {(currentPage - 1) * PER_PAGE + 1} </span>
        to
        <span> {currentPage === lastPage ? count : currentPage * PER_PAGE} </span>
        result of
        <span> {count} </span>
      </P>
      <PaginationButton disabled={currentPage === 1} onClick={handlePrevPage}>
        <Buttons>
        <HiChevronLeft />
        <span>
        Previews
        </span>
        </Buttons>
      </PaginationButton>
      <PaginationButton disabled={currentPage === lastPage} onClick={handleNextPage}>
        <Buttons>
        Next
        <HiChevronRight />
        </Buttons>
      </PaginationButton>
    </StyledPagination>
  );
}
