import { useEffect, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { kFormatter } from '@utils'
import { ThemeColors } from '@src/utility/context/ThemeColors'

import { Row, Col } from 'reactstrap'

import StatsWithAreaChart from '../../../@core/components/widgets/stats/StatsWithAreaChart'
import TinyChartStats from '../../../@core/components/widgets/stats/TinyChartStats'
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner'

import OrdersBarChart from './OrdersBarChart'
import ProfitLineChart from './ProfitLineChart'
import CardTransactions from './CardTransactions'
import CardBrowserStates from './CardBrowserState'
import Earnings from './Earnings'
import GoalOverview from './GoalOverview'
import AvgSessions from './AvgSessions'

import {
  getAllTicketsActions,
  getTicketsByTwoDateActions,
} from '../../../redux/actions/zammad/tickets'

import { dataInfoChart } from './dataInfoChart'

import '@styles/react/libs/charts/apex-charts.scss'
import {
  dateToday,
  dateBeforeDay,
  formatDate,
  toMs,
} from '../../../utility/Utils'
import { getAllOrganizationsActions } from '../../../redux/actions/zammad/organizations'
import { getAllProvincesActions } from '../../../redux/actions/territories/provinces'
import { getAllUsersActions } from '../../../redux/actions/zammad/users'
import { getAllTickets } from '../../../services/zammad/ticket'
import { ticketNewObjectFiltered } from '../../../utility/zammad/filterData'
import { sweetAlertError } from '../../../@core/components/sweetAlert'
import { strapiGetInstitutionWithTickets, strapiGetTicketsEnd, strapiGetTicketsNotClose, strapiGetTicketsOpen, strapiGetTicketsPriorityHigh, strapiGetTicketsPriorityLow, strapiGetTicketsPriorityNormal, strapiGetTicketsTotal, strapiGetUsersActive } from '../../../services/strapi/dashboard'

const AnalyticsDashboard = function () {

  const { colors } = useContext(ThemeColors)

  const [totalTickets, setTotalTickets] = useState([])
  const [openTickets, setOpenTickets] = useState([])
  const [endTickets, setEndTickets] = useState([])
  const [notCloseTickets, setNotCloseTickets] = useState([])
  const [priorityLowTickets, setPriorityLowTickets] = useState([])
  const [priorityNormalTickets, setPriorityNormalTickets] = useState([])
  const [priorityHighTickets, setpriorityHighTickets] = useState([])
  const [institutionWithTickets, setInstitutionWithTickets] = useState([])
  console.log(institutionWithTickets)
  const [usersActive, setUsersActive] = useState([])

  useEffect(() => {

    strapiGetTicketsTotal().then(res => setTotalTickets(res?.data?.meta?.pagination?.total))
    strapiGetTicketsOpen().then(res => setOpenTickets(res?.data?.meta?.pagination?.total))
    strapiGetTicketsEnd().then(res => setEndTickets(res?.data?.meta?.pagination?.total))
    strapiGetTicketsNotClose().then(res => setNotCloseTickets(res?.data?.meta?.pagination?.total))
    strapiGetTicketsPriorityLow().then(res => setPriorityLowTickets(res?.data?.meta?.pagination?.total))
    strapiGetTicketsPriorityNormal().then(res => setPriorityNormalTickets(res?.data?.meta?.pagination?.total))
    strapiGetTicketsPriorityHigh().then(res => setpriorityHighTickets(res?.data?.meta?.pagination?.total))
    strapiGetInstitutionWithTickets().then(res => setInstitutionWithTickets(res?.data?.data))
    strapiGetUsersActive().then(res => setUsersActive(res?.data?.length))

  }, [])

  const infoChart = dataInfoChart({ totalTickets, openTickets, endTickets, usersActive })

  return (
    <div id="dashboard-analytics">
      <Row className="match-height">
        {infoChart.map((dataInfoChart, index) => (
          <Col lg="3" sm="6" key={index}>
            <StatsWithAreaChart
              kFormatter={kFormatter}
              dataInfoChart={dataInfoChart}
              series={[{ name: dataInfoChart.title, data: null }]}
              loadingTicket={false}
            />
          </Col>
        ))}

        {/* <Col lg="2" md="6">
          <Row className="match-height"> */}
        {/* <Col xs="12">
              <TinyChartStats
                height={70}
                newDataTableTicketsTwo={newDataTableTicketsTwo}
                type="bar"
                title="Casos por Día"
                total={casesDayState.firstDay}
                loadingTicket={loadingTicket}
                series={[
                  {
                    name: 'Casos',
                    data: [
                      casesDayState.thirdDay,
                      casesDayState.secondDay,
                      casesDayState.firstDay,
                    ],
                  },
                ]}
              />
            </Col> */}
        {/* <Col xs="12">
              <TinyChartStats
                height={70}
                newDataTableTicketsTwo={newDataTableTicketsTwo}
                type="line"
                title="Casos por Semana"
                total={casesWeekState.firstWeek}
                loadingTicket={loadingTicket}
                series={[
                  {
                    name: 'Casos',
                    data: [
                      casesWeekState.fourthWeek,
                      casesWeekState.thirdWeek,
                      casesWeekState.secondWeek,
                      casesWeekState.firstWeek,
                    ],
                  },
                ]}
              />
            </Col> */}
        {/* <Col lg="12" md="6" xs="12"> */}
        {/* <Earnings
                beforeMonth={casesWeekState.secondWeek}
                thisMonth={casesWeekState.firstWeek}
                success={colors.success.main}
              /> */}
        {/* </Col>
          </Row>
        </Col> */}

        <Col lg="4" md="6" xs="12">
          <GoalOverview
            endTickets={endTickets}
            notCloseTickets={notCloseTickets}
            success={colors.success.main}
            loadingTicket={false}
          />
        </Col>
        <Col lg="8" md="8" xs="12">
          <CardBrowserStates
            institutionWithTickets={institutionWithTickets}
            loadingTicket
          />
        </Col>
        {/* <Col lg="4" md="6" xs="12">
          <CardTransactions
            loadingTicket={true}
          />
        </Col> */}
        <Col lg="12" xs="12">
          <AvgSessions
            priorityLowTickets={priorityLowTickets}
            priorityNormalTickets={priorityNormalTickets}
            priorityHighTickets={priorityHighTickets}
            colors={colors}
            loadingTicket
          />
        </Col>
      </Row>
    </div>
  )
}

export default AnalyticsDashboard
