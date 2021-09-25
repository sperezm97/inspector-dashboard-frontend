// ** React Imports
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap
import { Row, Col } from 'reactstrap'

// ** User View Components
import { kFormatter } from '@utils'
import { getUser } from '../../store/action'
import SubscribersGained from './SubscribersGained'
import UserInfoCard from './UserInfoCard'
import InvoiceList from '../../../invoice/list'
import { dataInfoChart } from './dataInfoChart'

// ** Styles
import '@styles/react/apps/app-users.scss'

// components
import { InstitutionNotFound } from '../../../../../@core/components/alert'

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

  const infoChart = dataInfoChart()

  return store.selectedUser !== null && store.selectedUser !== undefined ? (
    <div className="app-user-view">
      <Row>
        <Col xl="12" lg="12" md="12">
          <UserInfoCard selectedUser={store.selectedUser} />
        </Col>
      </Row>
      <Row className="match-height">
        {infoChart.map((dataInfoChart, index) => (
          <Col lg="3" sm="6" key={index}>
            <SubscribersGained
              kFormatter={kFormatter}
              dataInfoChart={dataInfoChart}
            />
          </Col>
        ))}
      </Row>
      <Row>
        <Col sm="12">
          <InvoiceList />
        </Col>
      </Row>
    </div>
  ) : (
    <InstitutionNotFound id={id} />
  )
}
export default UserView
