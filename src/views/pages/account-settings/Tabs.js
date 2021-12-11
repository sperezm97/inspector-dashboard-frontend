import { Nav, NavItem, NavLink } from 'reactstrap'
import { User, Lock, Info, Link, Bell } from 'react-feather'

const Tabs = function({ activeTab, toggleTab }) {
  return <Nav className="nav-left" pills vertical>
    <NavItem>
      <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
        <User size={18} className="mr-1" />
        <span className="font-weight-bold">General</span>
      </NavLink>
    </NavItem>
  </Nav>
}

export default Tabs
