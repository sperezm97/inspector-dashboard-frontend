import { Nav, NavItem, NavLink } from 'reactstrap'

const NavDivider = function() {
  return <Nav vertical className="wrap-border square-border">
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
}
export default NavDivider
