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

const Bandeja = function() {
  const dispatch = useDispatch()

  const [ dataTableTickets, setDataTableTickets ] = useState([])
  const [loadingTicket, setLoadingTicket] = useState(true)

  console.log(dataTableTickets)

  useEffect(() => {
    // dispatch(getAllTicketsActions())
    getAllTickets()
      .then(res => {
        setDataTableTickets(
          ticketNewObjectFiltered(res.data.assets.Ticket, res.data.assets)
        )
      })
      .catch(err => {
        console.log(err)
        sweetAlertError()
      })
      .finally(() => setLoadingTicket(false))

    dispatch(getAllRegionsActions())
  }, [dispatch])

  // const dataTableTickets = useSelector((state) => state?.tickets?.listTickets)

  const regionsSelector = useSelector((state) => state?.regions?.regions)
  const provincesSelector = useSelector((state) => state?.provinces?.provinces)
  const municipalitiesSelector = useSelector(
    (state) => state?.municipalities?.municipalities,
  )

  const defaultValueState = {value: '', label: 'Sin Seleccionar'}

  const [regionState, setRegionState] = useState(defaultValueState)
  const [provinciaState, setProvinciaState] = useState(defaultValueState)
  const [municipioState, setMunicipioState] = useState(defaultValueState)

  const [dataTable, setDataTable] = useState([])

  useEffect(() => {
    setDataTable(dataTableTickets)
  }, [dataTableTickets])

  const handleChangeRegions = ({ value, label }) => {
    if (value) {
      setRegionState({ value, label })
      setProvinciaState(defaultValueState)
      setMunicipioState(defaultValueState)
      filterTickets(value, 2)
    } else {
      setRegionState(defaultValueState)
      setProvinciaState(defaultValueState)
      setMunicipioState(defaultValueState)
      setDataTable(dataTableTickets)
    }

    dispatch(getProvincesByRegionActions(value))
  }

  const handleChangeProvinces = ({ value, label }) => {
    if (value) {
      setProvinciaState({ value, label })
      filterTickets(regionState.value + value, 4)
    } else {
      setProvinciaState(defaultValueState)
      setMunicipioState(defaultValueState)
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
      setMunicipioState(defaultValueState)
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
        (data.ownerFirstName || '').toLowerCase().includes(queryLowered) ||
        (data.ownerLastName || '').toLowerCase().includes(queryLowered) ||
        (data.ownerCedula || '').toLowerCase().includes(queryLowered) ||
        (data.customerFirstName || '').toLowerCase().includes(queryLowered) ||
        (data.customerLastName || '').toLowerCase().includes(queryLowered) ||
        (data.customerCedula || '').toLowerCase().includes(queryLowered) ||
        (data.institutionName || '').toLowerCase().includes(queryLowered) ||
        (data.institutionAcronym || '').toLowerCase().includes(queryLowered),
    )

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
            <Label>Provincia</Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              value={provinciaState}
              isLoading={!provincesSelector[0]}
              options={optionsCodeValueSelectNoData(provincesSelector)}
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
            <Label>Municipio</Label>
            <Select
              isClearable={false}
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              value={municipioState}
              isLoading={!municipalitiesSelector[0]}
              options={optionsCodeValueSelectNoData(municipalitiesSelector)}
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
          loadingTable={loadingTicket}
        />
      )}
    </>
  )
}

export default Bandeja
