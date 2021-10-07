// ** React Imports
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ** Columns

// ** Third Party Components
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { Row, Col } from 'reactstrap'
import { columns } from './columns'

// import DataTableList from '../../../../@core/components/table'
import DataTableList from '../../bandeja/list/table'
import CardGrid from '../../../../@core/components/card-grid'
import { getAllUsersActions } from '../../../../redux/actions/zammad/users'
import { getAllProvincesActions } from '../../../../redux/actions/territories/provinces'
import { getAllMunicipalitiesActions } from '../../../../redux/actions/territories/municipalities'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { optionsValueSelect } from '../../../../utility/Utils'

const UsersList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsersActions())
    dispatch(getAllProvincesActions())
    dispatch(getAllMunicipalitiesActions())
  }, [dispatch])

  const dataTableUsers = useSelector((state) => state?.users?.users)
  console.log(dataTableUsers)

  const provincesSelector = useSelector(
    (state) => state?.provinces?.allProvinces,
  )
  const municipalitiesSelector = useSelector(
    (state) => state?.municipalities?.allMunicipalities,
  )
  // const rolSelector = useSelector((state) => state?.regions?.regions)

  const regionRef = useRef({
    value: '',
    label: 'Seleccionar Rol',
  })

  const provinciaRef = useRef({
    value: '',
    label: 'Seleccionar Provincia',
  })

  const municipioRef = useRef({
    value: '',
    label: 'Seleccionar Municipio',
  })

  const [provinciaState, setProvinciaState] = useState(provinciaRef.current)
  const [municipioState, setMunicipioState] = useState(municipioRef.current)
  const [rolState, setRegionState] = useState(regionRef.current)

  const [dataTable, setDataTable] = useState([])

  useEffect(() => {
    setDataTable(dataTableUsers)
  }, [dataTableUsers])

  const handleChangeProvinces = ({ value, label }) => {
    if (value) {
      setProvinciaState({ value, label })
      // filterTickets(regionState.value + value, 4)
    } else {
      setProvinciaState(provinciaRef.current)
      setMunicipioState(municipioRef.current)
      // filterTickets(regionState.value, 2)
    }

    // dispatch(getMunicipalitiesByprovincesByRegionsActions(regionState.value, value))
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

  // const filterTickets = (value, positionToFind = 0) => {

  //   let data = dataTableUsers.filter(tickets => tickets.zone.substr(0, positionToFind) === value)
  //   setDataTable(data)
  // }

  // // ** User filter options
  // const planOptions = [
  //   { value: '', label: 'Seleccionar Provincia' },
  //   { value: 'basic', label: 'Basic' },
  //   { value: 'company', label: 'Company' },
  //   { value: 'enterprise', label: 'Enterprise' },
  //   { value: 'team', label: 'Team' },
  // ]

  const statusOptions = [
    { value: '', label: 'Seleccionar Municipio', number: 0 },
    { value: 'pending', label: 'Pending', number: 1 },
    { value: 'active', label: 'Active', number: 2 },
    { value: 'inactive', label: 'Inactive', number: 3 },
  ]

  const roleOptions = [
    { value: '', label: 'Seleccionar Rol' },
    { value: 'admin', label: 'Admin' },
    { value: 'author', label: 'Author' },
    { value: 'editor', label: 'Editor' },
    { value: 'maintainer', label: 'Maintainer' },
    { value: 'subscriber', label: 'Subscriber' },
  ]

  return (
    <>
      <CardGrid cardHeaderTitle="Búsqueda con filtro">
        <Row>
          <Col className="my-md-0 my-1" md="4">
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              value={provinciaState}
              options={optionsValueSelect(provincesSelector)}
              onChange={handleChangeProvinces}
            />
          </Col>
          <Col md="4">
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              value={municipioState}
              options={optionsValueSelect(
                municipalitiesSelector.filter(
                  (municipality) =>
                    municipality.provinceCode === provinciaState.value,
                ),
              )}
            />
          </Col>
          <Col md="4">
            <Select
              isClearable={false}
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              options={roleOptions}
              value={rolState}
            />
          </Col>
        </Row>
      </CardGrid>

      {dataTable && (
        <DataTableList
          columnsTable={columns}
          dataTable={dataTable}
          showButtonAddUser
        />
      )}
    </>
  )
}

export default UsersList
