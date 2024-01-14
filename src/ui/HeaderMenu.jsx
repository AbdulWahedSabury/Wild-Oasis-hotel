import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "./ButtonIcon";
import DarkModeToggle from "./DarkModeToggle";

const StyleHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;
export default function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyleHeaderMenu>
      <li>
        <Logout />
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
    </StyleHeaderMenu>
  );
}
