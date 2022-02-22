// ** Custom Components
import Avatar from '@components/avatar'

import classnames from 'classnames'
import Chart from 'react-apexcharts'
import { Card, CardBody } from 'reactstrap'

import LoadingData from '../../../../@core/components/spinner/loadingData'

// ** Default Options

const StatsWithAreaChart = props => {
  // ** Props
  const { kFormatter, newDataTableTicketsTwo, dataInfoChart, series, type = 'area', height, className, loadingTicket, ...rest } = props

  const options = {
    chart: {
      id: 'revenue',
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    grid: {
      show: false,
    },
    colors: [dataInfoChart.colorHEX],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2.5,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.9,
        opacityFrom: 0.7,
        opacityTo: 0.5,
        stops: [0, 80, 100],
      },
    },

    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      x: { show: false },
    },
  }

  return (
    <Card>
      <CardBody
        className={classnames('pb-0', {
          [className]: className
        })}
      >
        <Avatar className='avatar-stats p-50 m-0' color={`light-${dataInfoChart.color}`} icon={dataInfoChart.icon} />
        <h2 className='font-weight-bolder mt-1'>{loadingTicket ? <LoadingData /> : kFormatter(dataInfoChart.quantity)}</h2>
        <p className='card-text mb-1'>{dataInfoChart.title}</p>
      </CardBody>
      {series[0].data &&
        <Chart options={options} series={series} type={type} height={height ? height : 100} />
      }
    </Card>
  )
}

export default StatsWithAreaChart
