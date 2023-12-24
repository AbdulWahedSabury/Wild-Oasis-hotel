import styled from "styled-components";

const Row = styled.div`
display: flex;
  ${(props) => 
    props.type === "horizontal" &&
    `
      justify-content: space-between;
    `}
  ${(props) =>
    props.type === "vertical" &&
    `
      flex-direction: column;
      gap: 2rem;
    `}
`;

export default Row;
