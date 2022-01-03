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

const AnalyticsDashboard = function() {
  const dispatch = useDispatch()

  const { colors } = useContext(ThemeColors)

  useEffect(() => {
    dispatch(getAllTicketsActions())
    // dispatch(
    //   getTicketsByTwoDateActions(
    //     dateBeforeDay({ day: 28, f: 'YYYY-MM-DD' }),
    //     dateToday('YYYY-MM-DD'),
    //   ),
    // )
    dispatch(getAllOrganizationsActions())
    dispatch(getAllProvincesActions())
    dispatch(getAllUsersActions())
  }, [])

  const dataTableTicketsTwo = useSelector(
    (state) => state?.tickets?.listTickets,
  )
  // const dataTableTicketsTwo = useSelector(
  //   (state) => state?.tickets?.ticketsTwoDate?.Ticket,
  // )
  const newDataTableTicketsTwo =
    (dataTableTicketsTwo && Object.values(dataTableTicketsTwo)) || []

  const newUsersState = useSelector((state) => state?.users?.users)
  // const usersState = useSelector((state) => state?.tickets?.tickets?.User)
  // const newUsersState = usersState && Object.values(usersState)

  const organizationsState = useSelector(
    (state) => state?.organizations?.organizations,
  )

  const provincesState = useSelector((state) => state?.provinces?.allProvinces)

  const [casesDayState, setCasesDayState] = useState({
    firstDay: 0,
    secondDay: 0,
    thirdDay: 0,
  })

  const [casesWeekState, setCasesWeekState] = useState({
    firstWeek: 0,
    secondWeek: 0,
    thirdWeek: 0,
    fourthWeek: 0,
  })

  const infoChart = dataInfoChart(newDataTableTicketsTwo, newUsersState?.length)
  console.log(infoChart)

  useEffect(() => {
    const dateDay = newDataTableTicketsTwo.filter(
      (cases) => formatDate(cases.createDate) === dateToday(),
    ).length
    const dateDayOneAgo = newDataTableTicketsTwo.filter(
      (cases) => formatDate(cases.createDate) === dateBeforeDay({ day: 1 }),
    ).length
    const dateDayTwoAgo = newDataTableTicketsTwo.filter(
      (cases) => formatDate(cases.createDate) === dateBeforeDay({ day: 2 }),
    ).length

    const dateWeek = newDataTableTicketsTwo.filter(
      (cases) =>
        toMs(formatDate(cases.createDate)) >= toMs(dateBeforeDay({ day: 7 })) &&
        toMs(formatDate(cases.createDate)) <= toMs(dateToday()),
    ).length

    const dateWeekTwoAgo = newDataTableTicketsTwo.filter(
      (cases) =>
        toMs(formatDate(cases.createDate)) >=
          toMs(dateBeforeDay({ day: 14 })) &&
        toMs(formatDate(cases.createDate)) <= toMs(dateBeforeDay({ day: 8 })),
    ).length

    const dateWeekThreeAgo = newDataTableTicketsTwo.filter(
      (cases) =>
        toMs(formatDate(cases.createDate)) >=
          toMs(dateBeforeDay({ day: 21 })) &&
        toMs(formatDate(cases.createDate)) <= toMs(dateBeforeDay({ day: 15 })),
    ).length

    const dateWeekFourAgo = newDataTableTicketsTwo.filter(
      (cases) =>
        toMs(formatDate(cases.createDate)) >=
          toMs(dateBeforeDay({ day: 28 })) &&
        toMs(formatDate(cases.createDate)) <= toMs(dateBeforeDay({ day: 22 })),
    ).length

    const objDay = {
      firstDay: dateDay,
      secondDay: dateDayOneAgo,
      thirdDay: dateDayTwoAgo,
    }

    const objWeek = {
      firstWeek: dateWeek,
      secondWeek: dateWeekTwoAgo,
      thirdWeek: dateWeekThreeAgo,
      fourthWeek: dateWeekFourAgo,
    }

    setCasesDayState(objDay)
    setCasesWeekState(objWeek)
  }, [newDataTableTicketsTwo[0]])

  return (
    <div id="dashboard-analytics">
      <Row className="match-height">
        {infoChart.map((dataInfoChart, index) => (
          <Col lg="3" sm="6" key={index}>
            <StatsWithAreaChart
              kFormatter={kFormatter}
              newDataTableTicketsTwo={newDataTableTicketsTwo}
              dataInfoChart={dataInfoChart}
              series={[{ name: dataInfoChart.title, data: null }]}
            />
          </Col>
        ))}

        <Col lg="2" md="6">
          <Row className="match-height">
            <Col xs="12">
              <TinyChartStats
                height={70}
                newDataTableTicketsTwo={newDataTableTicketsTwo}
                type="bar"
                title="Casos por Día"
                total={casesDayState.firstDay}
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
            </Col>
            <Col xs="12">
              <TinyChartStats
                height={70}
                newDataTableTicketsTwo={newDataTableTicketsTwo}
                type="line"
                title="Casos por Semana"
                total={casesWeekState.firstWeek}
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
            </Col>
            <Col lg="12" md="6" xs="12">
              {/* <Earnings
                beforeMonth={casesWeekState.secondWeek}
                thisMonth={casesWeekState.firstWeek}
                success={colors.success.main}
              /> */}
            </Col>
          </Row>
        </Col>

        <Col lg="4" md="6" xs="12">
          <GoalOverview
            dataTableTickets={newDataTableTicketsTwo}
            success={colors.success.main}
          />
        </Col>
        <Col lg="6" md="6" xs="12">
          <CardBrowserStates
            organizations={organizationsState}
            listTickets={newDataTableTicketsTwo}
          />
        </Col>
        <Col lg="4" md="6" xs="12">
          <CardTransactions
            provinces={provincesState}
            listTickets={newDataTableTicketsTwo}
          />
        </Col>
        <Col lg="8" xs="12">
          <AvgSessions colors={colors} listTickets={newDataTableTicketsTwo} />
        </Col>
      </Row>
    </div>
  )
}

export default AnalyticsDashboard
