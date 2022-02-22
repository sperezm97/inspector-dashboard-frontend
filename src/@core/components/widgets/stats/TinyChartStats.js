import { useContext } from 'react'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import Chart from 'react-apexcharts'
import { Card, CardBody } from 'reactstrap'
import LoadingData from '../../spinner/loadingData'

const TinyChartStats = props => {
  // ** Props
  const { title, newDataTableTicketsTwo, total, series, type, height, loadingTicket } = props

  const { colors } = useContext(ThemeColors)

  const options = {
    chart: {
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: true,
      padding: {
        left: 0,
        right: 0,
        top: -15,
        bottom: -15,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        startingShape: 'rounded',
        colors: {
          backgroundBarColors: [
            '#f3f3f3',
            '#f3f3f3',
            '#f3f3f3',
            '#f3f3f3',
            '#f3f3f3',
          ],
          backgroundBarRadius: 5,
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    colors: [colors.warning.main],
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      x: {
        show: false,
      },
    },
  }

  return (
    <Card className='card-tiny-line-stats'>
      <CardBody className='pb-50'>
        <h6>{title}</h6>
        <h2 className='font-weight-bolder mb-1'>{loadingTicket ? <LoadingData /> : total}</h2>
        {series &&
          <Chart options={options} series={series} type={type} height={height} />
        }
      </CardBody>
    </Card>
  )
}

export default TinyChartStats
