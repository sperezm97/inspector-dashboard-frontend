import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Label } from 'reactstrap'
import Select from 'react-select'

import { selectThemeColors } from '@utils'

import { columns } from './columns'
import DataTableList from './table'
import CardGrid from '../../../../@core/components/card-grid'
import ComponentSpinner from '../../../../@core/components/spinner/Loading-spinner'

import { getAllTicketsActions } from '../../../../redux/actions/zammad/tickets'
import { getAllRegionsActions } from '../../../../redux/actions/territories/regions'
import { territoriesLabel } from '../../../../constants/label/territories'
import {
  noOptionsMessageSelect,
  optionsCodeValueSelectNoData,
} from '../../../../utility/Utils'
import { getProvincesByRegionActions } from '../../../../redux/actions/territories/provinces'
import { getMunicipalitiesByprovincesByRegionsActions } from '../../../../redux/actions/territories/municipalities'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { getAllTickets } from '../../../../services/zammad/ticket'
import { ticketNewObjectFiltered } from '../../../../utility/zammad/filterData'
import { sweetAlertError } from '../../../../@core/components/sweetAlert'
import { strapiGetTickets } from '../../../../services/strapi/tickets'

const Bandeja = function() {
  const dispatch = useDispatch()

  const [ dataTableTickets, setDataTableTickets ] = useState([])
  const [loadingTicket, setLoadingTicket] = useState(true)
  const [valueSearch, setValueSearch] = useState("")
  const [valueZone, setValueZone] = useState("")
  const [ pageNumber, setPageNumber ] = useState(1)
  console.log(valueZone)

  useEffect(() => {
    strapiGetTickets({valueSearch, valueZone, pageNumber})
      .then(res => setDataTableTickets(res.data))
      .catch(() => sweetAlertError())
      .finally(() => setLoadingTicket(false))

    // dispatch(getAllTicketsActions())
    // getAllTickets()
    //   .then(res => {
    //     setDataTableTickets(
    //       ticketNewObjectFiltered(res.data.assets.Ticket, res.data.assets)
    //     )
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     sweetAlertError()
    //   })
    //   .finally(() => setLoadingTicket(false))
  }, [valueSearch, valueZone, pageNumber])
  
  useEffect(() => {
    dispatch(getAllRegionsActions())
  },[dispatch])

  // const dataTableTickets = useSelector((state) => state?.tickets?.listTickets)

  const regionsSelector = useSelector((state) => state?.regions?.regions)
  const provincesSelector = useSelector((state) => state?.provinces?.provinces)
  const municipalitiesSelector = useSelector((state) => state?.municipalities?.municipalities)

  const defaultValueState = {value: '', label: 'Sin Seleccionar'}
  const [regionState, setRegionState] = useState(defaultValueState)
  const [provinciaState, setProvinciaState] = useState(defaultValueState)
  const [municipioState, setMunicipioState] = useState(defaultValueState)

  // const [dataTable, setDataTable] = useState([])
  // console.log(dataTable)

  // useEffect(() => {
  //   setDataTable(dataTableTickets)
  // }, [dataTableTickets])

  const handleChangeRegions = (e) => {
    if(e.value) {
      setRegionState(e)
      setValueZone(e.value)
      setProvinciaState(defaultValueState)
      setMunicipioState(defaultValueState)
      // filterTickets(value, 2)
    } else {
      setRegionState(defaultValueState)
      setProvinciaState(defaultValueState)
      setMunicipioState(defaultValueState)
      setValueZone("")
      // setDataTable(dataTableTickets)
    }

    dispatch(getProvincesByRegionActions(e.value))
  }

  const handleChangeProvinces = (e) => {
    if (e.value) {
      setProvinciaState(e)
      setValueZone(regionState.value + e.value)
      // filterTickets(regionState.value + value, 4)
    } else {
      setProvinciaState(defaultValueState)
      setMunicipioState(defaultValueState)
      setValueZone(regionState.value)
      // filterTickets(regionState.value, 2)
    }

    dispatch(getMunicipalitiesByprovincesByRegionsActions(regionState.value, e.value),)
  }

  const handleChangeMunicipalities = (e) => {
    if (e.value) {
      setMunicipioState(e)
      setValueZone(regionState.value + provinciaState.value + e.value)
      // filterTickets(regionState.value + provinciaState.value + value, 6)
    } else {
      setMunicipioState(defaultValueState)
      setValueZone(regionState.value + provinciaState.value)
      // filterTickets(regionState.value + provinciaState.value, 4)
    }
  }

  // const filterTickets = (value, positionToFind = 0) => {
  //   return console.log(dataTableTickets)
  // }

  return (
    <>
      <CardGrid cardHeaderTitle="Búsqueda con filtro">
        <Row>
          <Col md="4">
            <Label>Región</Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              value={regionState}
              isLoading={!regionsSelector[0]}
              options={optionsCodeValueSelectNoData(regionsSelector)}
              onChange={(e) => handleChangeRegions(e)}
              noOptionsMessage={({ inputValue }) =>
                noOptionsMessageSelect(
                  inputValue,
                  territoriesLabel.selectNoRegionsFound,
                )
              }
            />
          </Col>
          <Col md="4">
            <Label>Provincia</Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              value={provinciaState}
              isLoading={!provincesSelector[0]}
              options={optionsCodeValueSelectNoData(provincesSelector)}
              onChange={(e) => handleChangeProvinces(e)}
              noOptionsMessage={({ inputValue }) =>
                noOptionsMessageSelect(
                  inputValue,
                  territoriesLabel.selectNoProvincesFound,
                )
              }
            />
          </Col>
          <Col md="4">
            <Label>Municipio</Label>
            <Select
              isClearable={false}
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              value={municipioState}
              isLoading={!municipalitiesSelector[0]}
              options={optionsCodeValueSelectNoData(municipalitiesSelector)}
              onChange={(e) => handleChangeMunicipalities(e)}
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

      {dataTableTickets && (
        <DataTableList
          columnsTable={columns}
          setValueSearch={setValueSearch}
          setPageNumber={setPageNumber}
          dataTable={dataTableTickets}
          showButtonAddReport
          loadingTable={loadingTicket}
        />
      )}
    </>
  )
}

export default Bandeja
