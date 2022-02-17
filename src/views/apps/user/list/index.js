// ** React Imports
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ** Columns

// ** Third Party Components
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { Row, Col, Label } from 'reactstrap'
import { columns } from './columns'

// import DataTableList from '../../../../@core/components/table'
import DataTableList from '../../bandeja/list/table'
import CardGrid from '../../../../@core/components/card-grid'
import ComponentSpinner from '../../../../@core/components/spinner/Loading-spinner'
import { getAllUsersActions } from '../../../../redux/actions/zammad/users'
import { getAllRolsActions } from '../../../../redux/actions/zammad/rols'
import { getAllProvincesActions } from '../../../../redux/actions/territories/provinces'
import { getAllMunicipalitiesActions } from '../../../../redux/actions/territories/municipalities'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import {
  optionsIdValueSelect,
  optionsCodeValueSelect,
} from '../../../../utility/Utils'

const UsersList = function() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsersActions())
    dispatch(getAllRolsActions())
    dispatch(getAllProvincesActions())
    dispatch(getAllMunicipalitiesActions())
  }, [dispatch])

  const dataTableUsers = useSelector((state) => state?.users?.users)

  const provincesSelector = useSelector(
    (state) => state?.provinces?.allProvinces,
  )
  const municipalitiesSelector = useSelector(
    (state) => state?.municipalities?.allMunicipalities,
  )
  const rolSelector = useSelector((state) => state?.rols?.rols)

  const defaultValueState = {value: '', label: 'Sin Seleccionar'}

  const [provinciaState, setProvinciaState] = useState(defaultValueState)
  const [municipioState, setMunicipioState] = useState(defaultValueState)
  const [rolState, setRolState] = useState(defaultValueState)

  const [dataTable, setDataTable] = useState([])

  useEffect(() => {
    setDataTable(dataTableUsers)
  }, [dataTableUsers])

  const handleChangeProvinces = ({ value, label }) => {
    if (value) {
      setProvinciaState({ value, label })
      setMunicipioState(defaultValueState)
      filterZone(value, 2)
    } else {
      setProvinciaState(defaultValueState)
      setMunicipioState(defaultValueState)
      setDataTable(dataTableUsers)
    }
    setRolState(defaultValueState)
  }

  const handleChangeMunicipalities = ({ value, label }) => {
    if (value) {
      setMunicipioState({ value, label })
      filterZone(provinciaState.value + value, 4)
    } else {
      setMunicipioState(defaultValueState)
      filterZone(provinciaState.value, 2)
    }
    setRolState(defaultValueState)
  }

  const handleChangeRols = ({ value, label }) => {
    if (value) {
      setRolState({ value, label })
      filterRols(value)
    } else {
      setRolState(defaultValueState)
      setDataTable(dataTableUsers)
    }
    setProvinciaState(defaultValueState)
    setMunicipioState(defaultValueState)
  }

  const filterZone = (value, positionToFind = 0) => {
    console.log( value, positionToFind )
    const data = dataTableUsers.filter((users) => users.zone !== null)
    const dataValidated = data.filter(
      (users) => users.zone.substr(2, positionToFind) === value,
    )
    setDataTable(dataValidated)
  }

  const filterRols = (value) => {
    console.log(value)
    const data = dataTableUsers.filter((rols) => rols.role_ids[0] === value)
    console.log(data)
    setDataTable(data)
  }

  const searchTable = (data, queryLowered) =>
    data.filter(
      (data) =>
        (data.firstname || '').toLowerCase().includes(queryLowered) ||
        (data.lastname || '').toLowerCase().includes(queryLowered) ||
        (data.phone || '').toLowerCase().includes(queryLowered) ||
        (data.cedula || '').toLowerCase().includes(queryLowered),
    )

  return (
    <>
      <CardGrid cardHeaderTitle="Búsqueda con filtro">
        <Row>
          <Col className="my-md-0 my-1" md="4">
            <Label>Provincia</Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              value={provinciaState}
              options={optionsCodeValueSelect(provincesSelector)}
              onChange={handleChangeProvinces}
            />
          </Col>
          <Col md="4">
            <Label>Municipio</Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              value={municipioState}
              options={optionsCodeValueSelect(
                municipalitiesSelector.filter(
                  (municipality) =>
                    municipality.provinceCode === provinciaState.value,
                ),
              )}
              onChange={handleChangeMunicipalities}
            />
          </Col>
          <Col md="4">
            <Label>Permiso</Label>
            <Select
              isClearable={false}
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              value={rolState}
              options={optionsIdValueSelect(rolSelector)}
              onChange={handleChangeRols}
            />
          </Col>
        </Row>
      </CardGrid>

      <DataTableList
        columnsTable={columns}
        dataTable={dataTable}
        searchTable={searchTable}
        showButtonAddUser
      />
    </>
  )
}

export default UsersList
