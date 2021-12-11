import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ComponentSpinner from '../../../../../@core/components/spinner/Loading-spinner'
import { columns } from './columns'
import DataTableList from '../../../bandeja/list/table'
import { getAllOrganizationsActions } from '../../../../../redux/actions/zammad/organizations'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Instituciones = function() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllOrganizationsActions())
  }, [])

  const dataTableTickets = useSelector(
    (state) => state?.organizations?.organizations,
  )

  const searchTable = (data, queryLowered) =>
    data.filter(
      (data) =>
        (data.acronimo || '').toLowerCase().includes(queryLowered) ||
        (data.name || '').toLowerCase().includes(queryLowered),
    )

  return dataTableTickets[0] ? (
    <DataTableList
      columnsTable={columns}
      dataTable={dataTableTickets}
      dataTableTitle="Instituciones"
      searchTable={searchTable}
      showButtonAddInstitution
    />
  ) : (
    <ComponentSpinner />
  )
}

export default Instituciones
