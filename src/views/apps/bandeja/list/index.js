import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'reactstrap'
import Select from 'react-select'

import { kFormatter, selectThemeColors } from '@utils'

import SubscribersGained from './SubscribersGained'
import { dataInfoChart } from './dataInfoChart'
import { columns } from './columns'
import DataTableList from './table'
import CardGrid from '../../../../@core/components/card-grid'
// import { ButtonRipple } from '../../../../@core/components/button'
// import Url from '../../../../constants/Url'
import { getAllTicketsActions } from '../../../../redux/actions/zammad/tickets'
import { getAllRegionsActions } from '../../../../redux/actions/territories/regions'
import { territoriesLabel } from '../../../../constants/label/territories'
import {
  noOptionsMessageSelect,
  optionsCodeValueSelect,
} from '../../../../utility/Utils'
import { getProvincesByRegionActions } from '../../../../redux/actions/territories/provinces'
import { getMunicipalitiesByprovincesByRegionsActions } from '../../../../redux/actions/territories/municipalities'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Bandeja = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllTicketsActions())
    dispatch(getAllRegionsActions())
  }, [dispatch])

  const dataTableTickets = useSelector((state) => state?.tickets?.listTickets)

  const usersState = useSelector((state) => state?.tickets?.tickets?.User)
  const newUsersState = usersState && Object.values(usersState)

  const regionsSelector = useSelector((state) => state?.regions?.regions)
  const provincesSelector = useSelector((state) => state?.provinces?.provinces)
  const municipalitiesSelector = useSelector(
    (state) => state?.municipalities?.municipalities,
  )

  const infoChart = dataInfoChart(dataTableTickets, newUsersState?.length)

  const regionRef = useRef({
    value: '',
    label: 'Seleccionar Región',
  })

  const provinciaRef = useRef({
    value: '',
    label: 'Seleccionar Provincia',
  })

  const municipioRef = useRef({
    value: '',
    label: 'Seleccionar Municipio',
  })

  const [regionState, setRegionState] = useState(regionRef.current)
  const [provinciaState, setProvinciaState] = useState(provinciaRef.current)
  const [municipioState, setMunicipioState] = useState(municipioRef.current)

  const [dataTable, setDataTable] = useState([])

  useEffect(() => {
    setDataTable(dataTableTickets)
  }, [dataTableTickets])

  const handleChangeRegions = ({ value, label }) => {
    if (value) {
      setRegionState({ value, label })
      filterTickets(value, 2)
    } else {
      setRegionState(regionRef.current)
      setProvinciaState(provinciaRef.current)
      setMunicipioState(municipioRef.current)
      setDataTable(dataTableTickets)
    }

    dispatch(getProvincesByRegionActions(value))
  }

  const handleChangeProvinces = ({ value, label }) => {
    if (value) {
      setProvinciaState({ value, label })
      filterTickets(regionState.value + value, 4)
    } else {
      setProvinciaState(provinciaRef.current)
      setMunicipioState(municipioRef.current)
      filterTickets(regionState.value, 2)
    }

    dispatch(
      getMunicipalitiesByprovincesByRegionsActions(regionState.value, value),
    )
  }

  const handleChangeMunicipalities = ({ value, label }) => {
    if (value) {
      setMunicipioState({ value, label })
      filterTickets(regionState.value + provinciaState.value + value, 6)
    } else {
      setMunicipioState(municipioRef.current)
      filterTickets(regionState.value + provinciaState.value, 4)
    }
  }

  const filterTickets = (value, positionToFind = 0) => {
    const data = dataTableTickets.filter(
      (tickets) => tickets.zone.substr(0, positionToFind) === value,
    )
    setDataTable(data)
  }

  const searchTable = (data, queryLowered) =>
    data.filter(
      (data) =>
        (data.title || '').toLowerCase().includes(queryLowered) ||
        (data.address || '').toLowerCase().includes(queryLowered) ||
        (data.reporterFirstName || '').toLowerCase().includes(queryLowered) ||
        (data.reporterLastName || '').toLowerCase().includes(queryLowered) ||
        (data.reporterCedula || '').toLowerCase().includes(queryLowered) ||
        (data.institutionName || '').toLowerCase().includes(queryLowered) ||
        (data.institutionAcronym || '').toLowerCase().includes(queryLowered),
    )

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
              value={regionState}
              options={optionsCodeValueSelect(regionsSelector)}
              onChange={handleChangeRegions}
              noOptionsMessage={({ inputValue }) =>
                noOptionsMessageSelect(
                  inputValue,
                  territoriesLabel.selectNoRegionsFound,
                )
              }
            />
          </Col>
          <Col md="4">
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              value={provinciaState}
              options={optionsCodeValueSelect(provincesSelector)}
              onChange={handleChangeProvinces}
              noOptionsMessage={({ inputValue }) =>
                noOptionsMessageSelect(
                  inputValue,
                  territoriesLabel.selectNoProvincesFound,
                )
              }
            />
          </Col>
          <Col md="4">
            <Select
              isClearable={false}
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              value={municipioState}
              options={optionsCodeValueSelect(municipalitiesSelector)}
              onChange={handleChangeMunicipalities}
              noOptionsMessage={({ inputValue }) =>
                noOptionsMessageSelect(
                  inputValue,
                  territoriesLabel.selectNoMunicipalitiesFound,
                )
              }
            />
          </Col>
        </Row>
      </CardGrid>

      {dataTable && (
        <DataTableList
          columnsTable={columns}
          dataTable={dataTable}
          searchTable={searchTable}
          showButtonAddReport
        />
      )}
    </>
  )
}

export default Bandeja
