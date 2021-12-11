import { useEffect, useState } from 'react'
import axios from 'axios'
import { kFormatter } from '@utils'
import {
  Card,
  CardBody,
  CardText,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Progress,
} from 'reactstrap'
import Chart from 'react-apexcharts'
import { filterByPriorityTickets } from '../../../utility/Utils'

const AvgSessions = function({ colors, listTickets }) {
  console.log(listTickets)
  const lowPriority = filterByPriorityTickets(listTickets, 1).length || 0
  const normalPriority = filterByPriorityTickets(listTickets, 2).length || 0
  const highPriority = filterByPriorityTickets(listTickets, 3).length || 0

  const totalPriority = lowPriority + normalPriority + highPriority

  const options = {
    chart: {
      sparkline: { enabled: true },
      toolbar: { show: false },
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
      },
    },
    states: {
      hover: {
        filter: 'none',
      },
    },
    colors: [colors.success.main, colors.warning.main, colors.danger.main],
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
        endingShape: 'rounded',
      },
    },
    tooltip: {
      x: { show: false },
    },
    xaxis: {
      type: 'numeric',
    },
  }
  const series = [
    {
      name: 'Sessions',
      data: [lowPriority, normalPriority, highPriority],
    },
  ]

  return (
    <Card>
      <CardBody>
        <Row className="pb-50">
          <Col
            sm={{ size: 3, order: 1 }}
            xs={{ order: 2 }}
            className="d-flex justify-content-between flex-column mt-lg-0 mt-2"
          >
            <div className="session-info mb-1 mb-lg-0">
              <h2 className="font-weight-bold mb-25">{totalPriority}</h2>
              <CardText className="mb-2">Casos nuevos</CardText>
            </div>
          </Col>
          <Col
            sm={{ size: 9, order: 2 }}
            xs={{ order: 1 }}
            className="d-flex justify-content-between flex-column text-right"
          >
            {/* <p className="text-muted">Últimos 28 días</p> */}
            <Chart
              options={options}
              series={series}
              type="bar"
              height={250}
              width={350}
            />
          </Col>
        </Row>
        <hr />
        <Row className="pt-50">
          <Col className="mb-2" md="4" sm="12">
            <div className="d-flex justify-content-between align-items-end">
              <p className="mb-50">Prioridad Baja</p>
              <p className="mb-50">{lowPriority}</p>
            </div>
            <Progress
              className="avg-session-progress progress-bar-success mt-25"
              value={(lowPriority * 100) / totalPriority}
            />
          </Col>
          <Col className="mb-2" md="4" sm="12">
            <div className="d-flex justify-content-between align-items-end">
              <p className="mb-50">Prioridad Normal</p>
              <p className="mb-50">{normalPriority}</p>
            </div>
            <Progress
              className="avg-session-progress progress-bar-warning mt-25"
              value={(normalPriority * 100) / totalPriority}
            />
          </Col>
          <Col className="mb-2" md="4" sm="12">
            <div className="d-flex justify-content-between align-items-end">
              <p className="mb-50">Prioridad Alta</p>
              <p className="mb-50">{highPriority}</p>
            </div>
            <Progress
              className="avg-session-progress progress-bar-danger mt-25"
              value={(highPriority * 100) / totalPriority}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}
export default AvgSessions
