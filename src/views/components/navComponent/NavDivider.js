import { Nav, NavItem, NavLink } from 'reactstrap'

const NavDivider = () => (
  <Nav vertical className="wrap-border square-border">
    <NavItem>
      <NavLink href="#" active>
        Active
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="#">Link</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="#">Link</NavLink>
    </NavItem>
    <li className="dropdown-divider">
      <NavLink href="#">Link</NavLink>
    </li>
    <NavItem>
      <NavLink disabled href="#">
        Disabled
      </NavLink>
    </NavItem>
  </Nav>
)
export default NavDivider
