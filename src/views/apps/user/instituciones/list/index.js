import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { columns } from './columns'
import DataTableList from '../../../bandeja/list/table'
import { getAllOrganizationsActions } from '../../../../../redux/actions/zammad/organizations'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Instituciones = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllOrganizationsActions())
  }, [])

  const dataTableTickets = useSelector((state) => state?.organizations?.organizations)

  const [dataTable, setDataTable] = useState([])
  console.log(dataTable)

  useEffect(() => {
    setDataTable(dataTableTickets)
  }, [dataTableTickets])

  const searchTable = (data, queryLowered) =>
  data.filter(
    (data) =>
      (data.acronimo || '').toLowerCase().includes(queryLowered) ||
      (data.name || '').toLowerCase().includes(queryLowered),
  )
  
  return (
    <DataTableList
      columnsTable={columns}
      dataTable={dataTable}
      dataTableTitle="Instituciones"
      searchTable={searchTable}
      showButtonAddInstitution
    />
  )
}

export default Instituciones
