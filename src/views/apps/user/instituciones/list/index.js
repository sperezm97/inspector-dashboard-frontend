import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ComponentSpinner from '../../../../../@core/components/spinner/Loading-spinner'
import { columns } from './columns'
import DataTableList from '../../../bandeja/list/table'
import { getAllOrganizationsActions } from '../../../../../redux/actions/zammad/organizations'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { getOrganizations } from '../../../../../services/zammad/organization'
import { sweetAlertError } from '../../../../../@core/components/sweetAlert'

const Instituciones = function() {
  const dispatch = useDispatch()

  const [ organizationState, setOrganizationState ] = useState([])
  const [ loadingOrganization, setLoadingOrganization ] = useState(true)

  useEffect(() => {
    // dispatch(getAllOrganizationsActions())
    getOrganizations()
      .then(res => setOrganizationState(res.data))
      .catch(err => {
        console.log(err)
        sweetAlertError()
      })
      .finally(() => setLoadingOrganization(false))
  }, [])

  // const organizationState = useSelector(
  //   (state) => state?.organizations?.organizations,
  // )

  const searchTable = (data, queryLowered) =>
    data.filter(
      (data) =>
        (data.acronimo || '').toLowerCase().includes(queryLowered) ||
        (data.name || '').toLowerCase().includes(queryLowered),
    )

  return (
    <DataTableList
      columnsTable={columns}
      dataTable={organizationState}
      dataTableTitle="Instituciones"
      searchTable={searchTable}
      showButtonAddInstitution
      loadingTable={loadingOrganization}
    />
  )
}

export default Instituciones
