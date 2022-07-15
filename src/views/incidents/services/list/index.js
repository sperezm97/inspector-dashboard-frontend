import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { columns } from './columns'
import DataTableList from '../../../apps/bandeja/list/table'
import ComponentSpinner from '../../../../@core/components/spinner/Loading-spinner'
import { getAllServicesActions } from '../../../../redux/actions/incidents/services'
import Url from '../../../../constants/Url'
import { getIncidents } from '../../../../services/incidents/service'
import { sweetAlertError } from '../../../../@core/components/sweetAlert'
import { strapiGetServices } from '../../../../services/strapi/services'

const servicios = () => {
  const dispatch = useDispatch()

  const [servicesState, setServicesState] = useState([])
  console.log(servicesState)
  const [loadingServices, setLoadingServices] = useState(true)
  const [valueSearch, setValueSearch] = useState("")
  const [ pageNumber, setPageNumber ] = useState(1)

  useEffect(() => {
    // dispatch(getAllServicesActions())

    strapiGetServices({valueSearch, pageNumber})
      .then(res => setServicesState(res.data))
      .catch(err => {
        console.log(err)
        sweetAlertError()
      })
      .finally(() => setLoadingServices(false))
  }, [valueSearch, pageNumber])

  // const servicesState = useSelector((state) => state?.services?.services)

  // const searchTable = (data, queryLowered) =>
  //   data.filter((data) =>
  //     (data.name || '').toLowerCase().includes(queryLowered),
  //   )

  return (
    <DataTableList
      columnsTable={columns}
      setValueSearch={setValueSearch}
      setPageNumber={setPageNumber}
      dataTable={servicesState}
      dataTableTitle="Servicios"
      showButton
      labelButton="Añadir Nuevo Servicio"
      urlButton={Url.servicesCreate}
      loadingTable={loadingServices}
    />
  )
}

export default servicios
