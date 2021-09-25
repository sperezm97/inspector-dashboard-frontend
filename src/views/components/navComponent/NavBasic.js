import { Nav, NavItem, NavLink } from 'reactstrap'

const NavBasic = () => (
  <Nav>
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
    <NavItem>
      <NavLink disabled href="#">
        Disabled
      </NavLink>
    </NavItem>
  </Nav>
)
export default NavBasic
