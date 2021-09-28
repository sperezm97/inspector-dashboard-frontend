import { useEffect, useState } from 'react'

import { Row, Col } from 'reactstrap'
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

import { getAllTicketsActions } from '../../../../redux/actions/zammad/tickets'
import { getAllRegionsActions } from '../../../../redux/actions/territories/regions'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { territoriesLabel } from '../../../../constants/label/territories'
import { noOptionsMessageSelect, optionsValueSelect } from '../../../../utility/Utils'
import { getProvincesByRegion } from '../../../../redux/actions/territories/provinces'
import { getMunicipalitiesByprovincesByRegions } from '../../../../redux/actions/territories/municipalities'

const Bandeja = ({ history }) => {
  
  const dispatch = useDispatch()

  let ticketsState = useSelector(state => state?.tickets?.tickets[0]?.Ticket)
  const tickets = ticketsState && Object.values(ticketsState)

  let usersState = useSelector(state => state?.tickets?.tickets[0]?.User)
  const newUsersState = ticketsState && Object.values(usersState)
  
  const regionsState = useSelector(state => state?.regions?.regions[0])
  const provincesState = useSelector(state => state?.provinces?.provinces[0])
  const municipalitiesState = useSelector(state => state?.municipalities?.municipalities[0])

  const infoChart = dataInfoChart(tickets, newUsersState?.length)

  useEffect(() => {
  
    dispatch(getAllTicketsActions())
    dispatch(getAllRegionsActions())
  
  },[dispatch])

  const [regionState, setRegionState] = useState({
    value: '',
    label: 'Seleccionar Región',
  })
  const [provinciaState, setProvinciaState] = useState({
    value: '',
    label: 'Seleccionar Provincia',
  })
  const [municipioState, setMunicipioState] = useState({
    value: '',
    label: 'Seleccionar Municipio',
  })

  const handleChangeRegions = ({value, label}) =>{
    setRegionState({value, label})
    dispatch(getProvincesByRegion(value))
  }

  const handleChangeProvinces = ({value, label}) =>{
    setProvinciaState({value, label})
    dispatch(getMunicipalitiesByprovincesByRegions(regionState.value, value))
  }
  
  const handleChangeMunicipalities = ({value, label}) =>{
    setMunicipioState({value, label})
  }

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
              options={optionsValueSelect(regionsState)}
              value={regionState}
              onChange={handleChangeRegions}
              noOptionsMessage={({inputValue}) => noOptionsMessageSelect(inputValue, territoriesLabel.selectNoRegionsFound)} 
            />
          </Col>
          <Col md="4">
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              options={optionsValueSelect(provincesState)}
              value={provinciaState}
              onChange={handleChangeProvinces}
              noOptionsMessage={({inputValue}) => noOptionsMessageSelect(inputValue, territoriesLabel.selectNoProvincesFound)} 
            />
          </Col>
          <Col md="4">
            <Select
              isClearable={false}
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              options={optionsValueSelect(municipalitiesState)}
              value={municipioState}
              onChange={handleChangeMunicipalities}
              noOptionsMessage={({inputValue}) => noOptionsMessageSelect(inputValue, territoriesLabel.selectNoMunicipalitiesFound)}
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
