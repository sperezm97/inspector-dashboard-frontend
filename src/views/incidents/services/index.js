import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { columns } from './columns'
import DataTableList from '../../apps/bandeja/list/table'
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner'
import { getAllServicesActions } from '../../../redux/actions/incidents/services'
import Url from '../../../constants/Url'

const servicios = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllServicesActions())
  }, [])

  const dataTableServices = useSelector((state) => state?.services?.services)

  const searchTable = (data, queryLowered) =>
    data.filter((data) =>
      (data.name || '').toLowerCase().includes(queryLowered),
    )

  return dataTableServices[0] ? (
    <DataTableList
      columnsTable={columns}
      dataTable={dataTableServices}
      dataTableTitle="Servicios"
      searchTable={searchTable}
      showButton
      labelButton="Añadir Nuevo Servicio"
      urlButton={Url.servicesCreate}
    />
  ) : (
    <ComponentSpinner />
  )
}

export default servicios
