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
function AppLayout() {
  return (
    <StyledApp>
      <Header />
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </StyledApp>
  );
}
export default AppLayout;
