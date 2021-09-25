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

const AvgSessions = (props) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios
      .get('/card/card-analytics/avg-sessions')
      .then((res) => setData(res.data))
  }, [])

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
    colors: [
      props.colors.primary.main,
      props.colors.info.main,
      props.colors.warning.main,
      props.colors.danger.main,
      props.colors.success.main,
      props.colors.secondary.main,
    ],
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
      data: [275, 335, 200, 175, 350, 100],
    },
  ]

  return data !== null ? (
    <Card>
      <CardBody>
        <Row className="pb-50">
          <Col
            sm={{ size: 3, order: 1 }}
            xs={{ order: 2 }}
            className="d-flex justify-content-between flex-column mt-lg-0 mt-2"
          >
            <div className="session-info mb-1 mb-lg-0">
              <h2 className="font-weight-bold mb-25">
                {kFormatter(data.sessions)}
              </h2>
              <CardText className="mb-2">Casos nuevos</CardText>
              <h4 className="font-medium-2">
                <span className="text-success mr-50">{data.growth}</span>
              </h4>
              <CardText className="mb-2">Contra los 7 días pasados</CardText>
            </div>
          </Col>
          <Col
            sm={{ size: 9, order: 2 }}
            xs={{ order: 1 }}
            className="d-flex justify-content-between flex-column text-right"
          >
            <UncontrolledDropdown className="chart-dropdown">
              <DropdownToggle
                color=""
                className="bg-transparent btn-sm border-0 p-50"
              >
                Últimos 7 días
              </DropdownToggle>
              <DropdownMenu right>
                {data.last_days.map((item) => (
                  <DropdownItem className="w-100" key={item}>
                    {item}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
            <Chart
              options={options}
              series={series}
              type="bar"
              height={200}
              width={350}
            />
          </Col>
        </Row>
        <hr />
        <Row className="pt-50">
          <Col className="mb-2" md="4" sm="12">
            <div className="d-flex justify-content-between align-items-end">
              <p className="mb-50">Infraestructura</p>
              <p className="mb-50">{kFormatter(98766)}</p>
            </div>
            <Progress className="avg-session-progress mt-25" value="50" />
          </Col>
          <Col className="mb-2" md="4" sm="12">
            <div className="d-flex justify-content-between align-items-end">
              <p className="mb-50">Servicios Sociales</p>
              <p className="mb-50">{kFormatter(98766)}</p>
            </div>
            <Progress
              className="avg-session-progress progress-bar-info mt-25"
              value="60"
            />
          </Col>
          <Col className="mb-2" md="4" sm="12">
            <div className="d-flex justify-content-between align-items-end">
              <p className="mb-50">Electricidad</p>
              <p className="mb-50">{kFormatter(98766)}</p>
            </div>
            <Progress
              className="avg-session-progress progress-bar-warning mt-25"
              value="70"
            />
          </Col>
          <Col className="mb-2" md="4" sm="12">
            <div className="d-flex justify-content-between align-items-end">
              <p className="mb-50">Salud</p>
              <p className="mb-50">{kFormatter(98766)}</p>
            </div>
            <Progress
              className="avg-session-progress progress-bar-danger mt-25"
              value="80"
            />
          </Col>
          <Col className="mb-2" md="4" sm="12">
            <div className="d-flex justify-content-between align-items-end">
              <p className="mb-50">Medio Ambiente</p>
              <p className="mb-50">{kFormatter(98766)}</p>
            </div>
            <Progress
              className="avg-session-progress progress-bar-success mt-25"
              value="70"
            />
          </Col>
          <Col className="mb-2" md="4" sm="12">
            <div className="d-flex justify-content-between align-items-end">
              <p className="mb-50">Otros</p>
              <p className="mb-50">{kFormatter(98766)}</p>
            </div>
            <Progress
              className="avg-session-progress progress-bar-secondary mt-25"
              value="80"
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  ) : null
}
export default AvgSessions
