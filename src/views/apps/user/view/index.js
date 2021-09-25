// ** React Imports
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap
import { Row, Col } from 'reactstrap'
import { getUser } from '../store/action'

// ** User View Components
import UserInfoCard from './UserInfoCard'
import UserTimeline from './UserTimeline'
import InvoiceList from '../../invoice/list'
import PermissionsTable from './PermissionsTable'

// ** Styles
import '@styles/react/apps/app-users.scss'

// components
import { UserNotFound } from '../../../../@core/components/alert'

const UserView = (props) => {
  // ** Vars
  const store = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const { id } = useParams()

  // ** Get suer on mount
  useEffect(() => {
    // dispatch(getUser(parseInt(id)))
    dispatch(getUser(parseInt(1)))
  }, [dispatch])

  return store.selectedUser !== null && store.selectedUser !== undefined ? (
    <div className="app-user-view">
      <Row>
        <Col xl="12" lg="12" md="12">
          <UserInfoCard selectedUser={store.selectedUser} />
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <UserTimeline />
        </Col>
        <Col md="6">
          <PermissionsTable />
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <InvoiceList />
        </Col>
      </Row>
    </div>
  ) : (
    <UserNotFound id={id} />
  )
}
export default UserView
