// ** React Imports
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** User Edit Components
import { useSelector, useDispatch } from 'react-redux'
import { User, Info, Share2 } from 'react-feather'
import {
  Card,
  CardBody,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Alert,
} from 'reactstrap'
import AccountTab from './Account'
import InfoTab from './Information'

// ** Store & Actions
import { getUser } from '../store/action'

// ** Third Party Components

// ** Styles
import '@styles/react/apps/app-users.scss'

// components
import { UserNotFound } from '../../../../@core/components/alert'

const UserEdit = () => {
  // ** States & Vars
  const [activeTab, setActiveTab] = useState('1')
  const store = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const { id } = useParams()

  // ** Function to toggle tabs
  const toggle = (tab) => setActiveTab(tab)

  // ** Function to get user on mount
  useEffect(() => {
    dispatch(getUser(parseInt(id)))
  }, [dispatch])

  return store.selectedUser !== null && store.selectedUser !== undefined ? (
    <Row className="app-user-edit">
      <Col sm="12">
        <Card>
          <CardBody className="pt-2">
            <Nav pills>
              <NavItem>
                <NavLink active={activeTab === '1'} onClick={() => toggle('1')}>
                  <User size={14} />
                  <span className="align-middle d-none d-sm-block">Perfil</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={activeTab === '2'} onClick={() => toggle('2')}>
                  <Info size={14} />
                  <span className="align-middle d-none d-sm-block">
                    Información
                  </span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <AccountTab selectedUser={store.selectedUser} />
              </TabPane>
              <TabPane tabId="2">
                <InfoTab />
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </Row>
  ) : (
    <UserNotFound id={id} />
  )
}
export default UserEdit
