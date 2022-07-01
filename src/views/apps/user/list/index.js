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
import { getAllProvincesActions, getProvincesByRegionActions } from '../../../../redux/actions/territories/provinces'
import { getAllMunicipalitiesActions, getMunicipalitiesByprovincesByRegionsActions } from '../../../../redux/actions/territories/municipalities'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import {
  optionsIdValueSelectNoData,
  optionsCodeValueSelectNoData,
} from '../../../../utility/Utils'
import { getAllUsers } from '../../../../services/zammad/user'
import { sweetAlertError } from '../../../../@core/components/sweetAlert'
import { strapiGetBeneficiaries } from '../../../../services/strapi/beneficiaries'
import { strapiGetUsers } from '../../../../services/strapi/users'
import { getAllRegionsActions } from '../../../../redux/actions/territories/regions'

const UsersList = function() {
  const dispatch = useDispatch()

  const [ userState, setUserState ] = useState([])
  console.log(userState)
  const [ userLoading, setUserLoading ] = useState(true)
  const [valueSearch, setValueSearch] = useState("")
  const [valueZone, setValueZone] = useState("")
  console.log(valueZone)

  useEffect(() => {
    // dispatch(getAllUsersActions())
    // getAllUsers()
    //   .then(res => setUserState(res.data))
    //   .catch(err => {
    //     sweetAlertError()
    //   })
    //   .finally(() => setUserLoading(false))
    // dispatch(getAllRolsActions())
    // dispatch(getAllProvincesActions())

    strapiGetUsers({valueSearch, valueZone})
      .then(res => setUserState(res.data))
      .catch(() => sweetAlertError())
      .finally(() => setUserLoading(false))

  }, [valueSearch, valueZone])

  useEffect(() => {
    dispatch(getAllRegionsActions())
  },[dispatch])

  // const userState = useSelector((state) => state?.users?.users)

  const regionsSelector = useSelector((state) => state?.regions?.regions)
  const provincesSelector = useSelector((state) => state?.provinces?.provinces)
  const municipalitiesSelector = useSelector((state) => state?.municipalities?.municipalities)

  const defaultValueState = {value: '', label: 'Sin Seleccionar'}
  const [regionState, setRegionState] = useState(defaultValueState)
  const [provinciaState, setProvinciaState] = useState(defaultValueState)
  const [municipioState, setMunicipioState] = useState(defaultValueState)

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

  // const handleChangeRols = ({ value, label }) => {
  //   if (value) {
  //     setRolState({ value, label })
  //     filterRols(value)
  //   } else {
  //     setRolState(defaultValueState)
  //     setDataTable(userState)
  //   }
  //   setProvinciaState(defaultValueState)
  //   setMunicipioState(defaultValueState)
  // }

  // const filterZone = (value, positionToFind = 0) => {
  //   const data = userState.filter((users) => users.zone_code !== null)
  //   const dataValidated = data.filter(
  //     (users) => users.zone_code.substr(2, positionToFind) === value,
  //   )
  //   setDataTable(dataValidated)
  // }

  // const filterRols = (value) => {
  //   const data = userState.filter((rols) => rols.role_ids[0] === value)
  //   setDataTable(data)
  // }

  // const searchTable = (data, queryLowered) =>
  //   data.filter(
  //     (data) =>
  //       (data.firstname || '').toLowerCase().includes(queryLowered) ||
  //       (data.lastname || '').toLowerCase().includes(queryLowered) ||
  //       (data.phone || '').toLowerCase().includes(queryLowered) ||
  //       (data.cedula || '').toLowerCase().includes(queryLowered),
  //   )

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

      <DataTableList
        columnsTable={columns}
        setValueSearch={setValueSearch}
        dataTable={userState}
        showButtonAddUser
        loadingTable={userLoading}
      />
    </>
  )
}

export default UsersList
