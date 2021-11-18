import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { Card, CardTitle, CardText, CardBody, Row, Col } from 'reactstrap'

const Earnings = ({ success, beforeMonth = 0, thisMonth = 0 }) => {
  const [valuePercent, setValuePercent] = useState('')

  useEffect(() => {
    setValuePercent(thisMonth - (beforeMonth / beforeMonth) * 100)
  }, [thisMonth, beforeMonth])

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: { show: false },
    // comparedResult: [2, 13, 8],
    labels: ['Semana anterior', 'Esta Semana'],
    stroke: { width: 0 },
    colors: ['#28c76f66', success],
    grid: {
      padding: {
        right: -20,
        bottom: -8,
        left: -20,
      },
    },
    plotOptions: {
      pie: {
        startAngle: -10,
        donut: {
          labels: {
            show: true,
            name: {
              offsetY: 15,
            },
            value: {
              offsetY: -15,
              formatter(val) {
                return `${parseInt(val)}`
              },
            },
            total: {
              show: true,
              offsetY: 15,
              label: 'Casos',
              formatter(w) {
                return `${valuePercent}%`
              },
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 1325,
        options: {
          chart: {
            height: 100,
          },
        },
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 120,
          },
        },
      },
      {
        breakpoint: 1065,
        options: {
          chart: {
            height: 100,
          },
        },
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 120,
          },
        },
      },
    ],
  }

  return (
    <Card className="earnings-card">
      <CardBody>
        <Row>
          {valuePercent ? (
            <>
              <Col xs="6">
                <CardTitle className="mb-1">Casos Completados</CardTitle>
                <div className="font-small-2">Esta Semana</div>
                <h5 className="mb-1">{thisMonth}</h5>
                <CardText className="text-muted font-small-2">
                  <span className="font-weight-bolder">{valuePercent}%</span>
                  <span> de la Semana anterior</span>
                </CardText>
              </Col>
              <Col xs="6">
                <Chart
                  options={options}
                  series={[beforeMonth, thisMonth]}
                  type="donut"
                  height={120}
                />
              </Col>
            </>
          ) : null}
        </Row>
      </CardBody>
    </Card>
  )
}

export default Earnings
