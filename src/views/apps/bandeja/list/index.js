import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'reactstrap'
import Select from 'react-select'

import { kFormatter, selectThemeColors } from '@utils'

import SubscribersGained from './SubscribersGained'
import { dataInfoChart } from './dataInfoChart'
import { columns } from './columns'
import DataTableList from './table'
import CardGrid from '../../../../@core/components/card-grid'
import { ButtonRipple } from '../../../../@core/components/button'
import Url from '../../../../constants/Url'
import { getAllTicketsActions } from '../../../../redux/actions/zammad/tickets'
import { getAllRegionsActions } from '../../../../redux/actions/territories/regions'
import { territoriesLabel } from '../../../../constants/label/territories'
import { noOptionsMessageSelect, optionsValueSelect } from '../../../../utility/Utils'
import { getProvincesByRegion } from '../../../../redux/actions/territories/provinces'
import { getMunicipalitiesByprovincesByRegions } from '../../../../redux/actions/territories/municipalities'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Bandeja = ({ history }) => {
  
  const dispatch = useDispatch()

  useEffect(() => {
  
    dispatch(getAllTicketsActions())
    dispatch(getAllRegionsActions())
  
  },[dispatch])

  const dataTable = useSelector(state => state?.tickets?.listTickets)

  let usersState = useSelector(state => state?.tickets?.tickets?.User)
  const newUsersState = usersState && Object.values(usersState)
  
  const regionsState = useSelector(state => state?.regions?.regions)
  const provincesState = useSelector(state => state?.provinces?.provinces)
  const municipalitiesState = useSelector(state => state?.municipalities?.municipalities)

  const infoChart = dataInfoChart(dataTable, newUsersState?.length)

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

      {dataTable &&
        <DataTableList
          columnsTable={columns}
          dataTable={dataTable}
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
