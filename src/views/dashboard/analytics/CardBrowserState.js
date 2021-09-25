import Chart from 'react-apexcharts'
import { MoreVertical } from 'react-feather'
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Media,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap'

const CardBrowserState = ({ colors, trackBgColor }) => {
  const statesArr = [
    {
      avatar: require('@src/assets/images/icons/1.png').default,
      title: 'Ministerio de Obras Públicas y Comunicaciones',
      value: '54.4%',
      chart: {
        type: 'radialBar',
        series: [54.4],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15,
            },
          },
          colors: [colors.primary.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%',
              },
              track: {
                background: trackBgColor,
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false,
                },
                value: {
                  show: false,
                },
              },
            },
          },
          stroke: {
            lineCap: 'round',
          },
        },
      },
    },
    {
      avatar: require('@src/assets/images/icons/2.png').default,
      title: 'Alcaldía del Distrito Nacional',
      value: '6.1%',
      chart: {
        type: 'radialBar',
        series: [6.1],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15,
            },
          },
          colors: [colors.warning.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%',
              },
              track: {
                background: trackBgColor,
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false,
                },
                value: {
                  show: false,
                },
              },
            },
          },
          stroke: {
            lineCap: 'round',
          },
        },
      },
    },
    {
      avatar: require('@src/assets/images/icons/3.png').default,
      title: 'Empresa Distribuidora de Electricidad del Este',
      value: '14.6%',
      chart: {
        type: 'radialBar',
        series: [14.6],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15,
            },
          },
          colors: [colors.secondary.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%',
              },
              track: {
                background: trackBgColor,
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false,
                },
                value: {
                  show: false,
                },
              },
            },
          },
          stroke: {
            lineCap: 'round',
          },
        },
      },
    },
    {
      avatar: require('@src/assets/images/icons/4.png').default,
      title: 'Instituto Nacional de Aguas Potables y Alcantarillados',
      value: '4.2%',
      chart: {
        type: 'radialBar',
        series: [4.2],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15,
            },
          },
          colors: [colors.info.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%',
              },
              track: {
                background: trackBgColor,
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false,
                },
                value: {
                  show: false,
                },
              },
            },
          },
          stroke: {
            lineCap: 'round',
          },
        },
      },
    },
    {
      avatar: require('@src/assets/images/icons/5.png').default,
      title: 'Ayuntamiento Santo Domingo Este',
      value: '8.4%',
      chart: {
        type: 'radialBar',
        series: [8.4],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15,
            },
          },
          colors: [colors.danger.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%',
              },
              track: {
                background: trackBgColor,
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false,
                },
                value: {
                  show: false,
                },
              },
            },
          },
          stroke: {
            lineCap: 'round',
          },
        },
      },
    },
  ]

  const renderStates = () =>
    statesArr.map((state) => (
      <div key={state.title} className="browser-states">
        <Media>
          <img
            className="rounded mr-1"
            src={state.avatar}
            height="30"
            alt={state.title}
          />
          <h6 className="align-self-center mb-0">{state.title}</h6>
        </Media>
        <div className="d-flex align-items-center">
          <div className="font-weight-bold text-body-heading mr-1">9,999</div>
          <Chart
            options={state.chart.options}
            series={state.chart.series}
            type={state.chart.type}
            height={state.chart.height}
            width={state.chart.width}
          />
        </div>
      </div>
    ))

  return (
    <Card className="card-browser-states">
      <CardHeader className="pb-0">
        <div>
          <CardTitle tag="h4">Instituciones</CardTitle>
        </div>
        <UncontrolledDropdown className="chart-dropdown">
          <DropdownToggle
            color=""
            className="bg-transparent btn-sm border-0 p-50"
          >
            <MoreVertical size={18} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem className="w-100">Last 28 Days</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </CardHeader>
      <CardBody>{renderStates()}</CardBody>
    </Card>
  )
}

export default CardBrowserState
