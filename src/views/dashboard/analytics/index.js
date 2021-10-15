import { useEffect, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { kFormatter } from '@utils'
import { ThemeColors } from '@src/utility/context/ThemeColors'

import { Row, Col } from 'reactstrap'

import StatsWithAreaChart from '../../../@core/components/widgets/stats/StatsWithAreaChart'
import TinyChartStats from '../../../@core/components/widgets/stats/TinyChartStats'

import OrdersBarChart from './OrdersBarChart'
import ProfitLineChart from './ProfitLineChart'
import CardTransactions from './CardTransactions'
import CardBrowserStates from './CardBrowserState'
import Earnings from './Earnings'
import GoalOverview from './GoalOverview'
import AvgSessions from './AvgSessions'

import { getAllTicketsActions } from '../../../redux/actions/zammad/tickets'

import { dataInfoChart } from './dataInfoChart'

import '@styles/react/libs/charts/apex-charts.scss'
import { dateToday, dateBeforeDay, formatDate } from '../../../utility/Utils'

const AnalyticsDashboard = () => {
  const dispatch = useDispatch()

  const { colors } = useContext(ThemeColors)

  useEffect(() => {
    dispatch(getAllTicketsActions())
  }, [dispatch])

  const dataTableTickets = useSelector((state) => state?.tickets?.listTickets)

  const usersState = useSelector((state) => state?.tickets?.tickets?.User)
  const newUsersState = usersState && Object.values(usersState)

  const [casesTodayState, setCasesTodayState] = useState(0)
  const [casesDayOneBefore, setCasesDayOneBefore] = useState(0)
  const [casesDayTwoBefore, setCasesDayTwoBefore] = useState(0)

  const [casesMonthState, setCasesMonthState] = useState(0)
  const [casesMonthBeforeState, setCasesMonthBeforeState] = useState(0)
  const [casesTwoMonthBeforeState, setCasesTwoMonthBeforeState] = useState(0)

  const infoChart = dataInfoChart(dataTableTickets, newUsersState?.length)

  useEffect(() => {
    const date = dataTableTickets.filter(
      (cases) => formatDate(cases.createDate) === dateToday(),
    ).length
    const dateDayOne = dataTableTickets.filter(
      (cases) => formatDate(cases.createDate) === dateBeforeDay(1),
    ).length
    const dateDayTwo = dataTableTickets.filter(
      (cases) => formatDate(cases.createDate) === dateBeforeDay(2),
    ).length

    const dateMonth = dataTableTickets.filter(
      (cases) =>
        formatDate(cases.createDate).substr(3) === dateToday('MM/YYYY'),
    ).length
    const dateMonthBefore = dataTableTickets.filter(
      (cases) =>
        formatDate(cases.createDate).substr(3) ===
        dateBeforeDay(1, 'months', 'MM/YYYY'),
    ).length
    const dateTwoMonthBefore = dataTableTickets.filter(
      (cases) =>
        formatDate(cases.createDate).substr(3) ===
        dateBeforeDay(2, 'months', 'MM/YYYY'),
    ).length

    setCasesTodayState(date)
    setCasesDayOneBefore(dateDayOne)
    setCasesDayTwoBefore(dateDayTwo)

    setCasesMonthState(dateMonth)
    setCasesMonthBeforeState(dateMonthBefore)
    setCasesTwoMonthBeforeState(dateTwoMonthBefore)
  }, [dataTableTickets])

  return dataTableTickets[0] ? (
    <div id="dashboard-analytics">
      <Row className="match-height">
        {infoChart.map((dataInfoChart, index) => (
          <Col lg="3" sm="6" key={index}>
            <StatsWithAreaChart
              kFormatter={kFormatter}
              dataInfoChart={dataInfoChart}
              series={[{ name: dataInfoChart.title, data: null }]}
            />
          </Col>
        ))}

        <Col lg="4" md="12">
          <Row className="match-height">
            <Col lg="6" md="6" xs="6">
              <TinyChartStats
                height={70}
                type="bar"
                title="Casos por Día"
                total={casesTodayState}
                series={[
                  {
                    name: 'Casos',
                    data: [
                      casesDayTwoBefore,
                      casesDayOneBefore,
                      casesTodayState,
                    ],
                  },
                ]}
              />
            </Col>
            <Col xs="6">
              <TinyChartStats
                height={70}
                type="line"
                title="Casos por Mes"
                total={casesMonthState}
                series={[
                  {
                    name: 'Casos',
                    data: [
                      casesTwoMonthBeforeState,
                      casesMonthBeforeState,
                      casesMonthState,
                    ],
                  },
                ]}
              />
            </Col>
            <Col lg="12" md="6" xs="12">
              <Earnings
                beforeMonth={casesMonthBeforeState}
                thisMonth={casesMonthState}
                success={colors.success.main}
              />
            </Col>
          </Row>
        </Col>

        <Col lg="4" md="6" xs="12">
          <GoalOverview
            dataTableTickets={dataTableTickets}
            success={colors.success.main}
          />
        </Col>
        <Col lg="4" md="6" xs="12">
          <CardBrowserStates colors={colors} trackBgColor="#e9ecef" />
        </Col>
        <Col lg="4" md="6" xs="12">
          <CardTransactions />
        </Col>
        <Col lg="8" xs="12">
          <AvgSessions colors={colors} />
        </Col>
      </Row>
    </div>
  ) : null
}

export default AnalyticsDashboard
