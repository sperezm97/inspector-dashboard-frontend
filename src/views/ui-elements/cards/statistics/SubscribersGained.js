import StatsWithAreaChart from '@components/widgets/stats/StatsWithAreaChart'

const SubscribersGained = ({ kFormatter, dataInfoChart }) => {
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
    <StatsWithAreaChart
      icon={dataInfoChart.icon}
      color={dataInfoChart.color}
      stats={kFormatter(dataInfoChart.quantity)}
      statTitle={dataInfoChart.title}
      series={[{ name: dataInfoChart.title, data: dataInfoChart.data }]}
      options={options}
      type="area"
    />
  )
}

export default SubscribersGained
