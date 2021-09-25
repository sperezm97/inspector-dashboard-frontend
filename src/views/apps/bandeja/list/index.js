import { useEffect, useState } from 'react'

import { Row, Col, Media } from 'reactstrap'
import { kFormatter, selectThemeColors } from '@utils'

import Select from 'react-select'
import SubscribersGained from './SubscribersGained'
import { dataInfoChart } from './dataInfoChart'
import { columns } from './columns'

import DataTableList from './table'
import CardGrid from '../../../../@core/components/card-grid'
import { ButtonRipple } from '../../../../@core/components/button'
import Url from '../../../../constants/Url'

import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import { getAllTicketsActions } from '../../../../redux/actions/zammad/tickets'
import { getAllRegionsActions } from '../../../../redux/actions/territories/regions'

const Bandeja = ({ history }) => {
  
  const infoChart = dataInfoChart()

  const dispatch = useDispatch()

  let ticketsState = useSelector(state => state?.tickets?.tickets[0]?.Ticket)
  const tickets = ticketsState && Object.values(ticketsState)
  // let ticketsAllData = useSelector(state => state?.tickets?.tickets[0])
  // ticketsAllData = ticketsAllData && {...ticketsAllData, Ticket: tickets}

  // console.log('asas', ticketsAllData)

  useEffect(() => {
  
    dispatch(getAllTicketsActions())
    dispatch(getAllRegionsActions())
  
  },[dispatch])

  const [currentPlan, setCurrentPlan] = useState({
    value: '',
    label: 'Seleccionar Región',
  })
  const [currentStatus, setCurrentStatus] = useState({
    value: '',
    label: 'Seleccionar Provincia',
    number: 0,
  })
  const [currentRole, setCurrentRole] = useState({
    value: '',
    label: 'Seleccionar Municipio',
  })

  const roleOptions = [
    { value: 'Seleccionar Región', label: 'Seleccionar Región' },
  ]

  const planOptions = [
    { value: 'Seleccionar Provincia', label: 'Seleccionar Provincia' },
  ]

  const statusOptions = [
    {
      value: 'Seleccionar Municipio',
      label: 'Seleccionar Municipio',
      number: 0,
    },
  ]

  return (
    <>
      <Row className="match-height">
        {infoChart.map((dataInfoChart, index) => (
          <Col lg="3" sm="6" key={index}>
            <SubscribersGained
              kFormatter={kFormatter}
              dataInfoChart={dataInfoChart}
            />
          </Col>
        ))}
      </Row>

      <CardGrid cardHeaderTitle="Búsqueda con filtro">
        <Row>
          <Col md="4">
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              options={planOptions}
              value={currentPlan}
            />
          </Col>
          <Col md="4">
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              options={statusOptions}
              value={currentStatus}
            />
          </Col>
          <Col md="4">
            <Select
              isClearable={false}
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              options={roleOptions}
              value={currentRole}
            />
          </Col>
        </Row>
      </CardGrid>

      {tickets &&
        <DataTableList
          columnsTable={columns}
          dataTable={tickets}
          componentButton={
            <ButtonRipple
              label="Nuevo Reporte"
              onClick={() => history.push(Url.dashboardInboxCreate)}
            />
          }
        />
      }
    </>
  )
}

export default Bandeja
