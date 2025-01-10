import { HiHome } from "react-icons/hi";
import { HiCalendarDays, HiCog6Tooth, HiHomeModern, HiMiniUsers } from "react-icons/hi2";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  text-transform: capitalize;
`;

const StyledLink = styled(Link)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledLink to="/dashboard">
            <HiHome />
            <span>home</span>
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/bookings">
            <HiCalendarDays />
            <span>bookings</span>
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/cabins">
            <HiHomeModern />
            <span>cabins</span>
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/users">
            <HiMiniUsers />
            <span>users</span>
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/settings">
            <HiCog6Tooth />
            <span>settings</span>
          </StyledLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
