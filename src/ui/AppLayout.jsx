import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./sidebar";
import styled from "styled-components";

const StyledApp = styled.main`
  background-color: var(--color-grey-50);
  display: grid;
  grid-template-columns: 26rem 1fr;
  padding: 4rem 4.8rem 6rem;
  height: 100vh;
  grid-template-rows: auto 1fr;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  max-width: 120rem;
`;
const Main = styled.div`
  padding: 4rem 4.8rem 4.5rem;
  background-color: var(---color-grey-50);
  overflow-y: scroll;
`;
function AppLayout() {
  return (
    <StyledApp>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledApp>
  );
}
export default AppLayout;
