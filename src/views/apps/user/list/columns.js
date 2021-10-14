import { useSelector } from 'react-redux'
import {
  rowClient,
  rowActions,
} from '../../../../@core/components/table/commonColumns'

import {
  Badge,
} from 'reactstrap'

export const getRol = (id) => {
  const rolSelector = useSelector((state) => state?.rols?.rols)

  return ( 
    <span style={{marginRight: '5px'}}>
      <Badge color="light-primary">
        {rolSelector[id - 1]?.name}
      </Badge>
    </span>
  )
}

export const getProvinces = (id) => {
  const provincesSelector = useSelector((state) => state?.provinces?.allProvinces)
  let validatedId = id || ''

  return provincesSelector.find((obj) => obj.identifier.substr(2, 2) === validatedId.substr(2, 2))?.name
}

export const getMunicipality = (id) => {
  const municipalitiesSelector = useSelector((state) => state?.municipalities?.allMunicipalities)
  let validatedId = id || ''

  return municipalitiesSelector.find((obj) => obj.identifier === validatedId.substr(0, 6))?.name
}

export const columns = [
  {
    name: 'Nombre',
    minWidth: '400px',
    selector: 'firstname',
    sortable: true,
    cell: (row) => {
      const userInfo = {
        reporterId: row.id,
        reporterFirstName: row.firstname,
        reporterLastName: row.lastname,
        reporterCedula: row.cedula,
      }

      return rowClient(userInfo)
    },
  },
  {
    name: 'Teléfono',
    minWidth: '160px',
    selector: 'phone',
    sortable: true,
    cell: (row) => row.phone,
  },
  {
    name: 'Provincia',
    minWidth: '235px',
    selector: 'zone',
    sortable: true,
    cell: (row) => getProvinces(row.zone),
  },
  {
    name: 'Municipio',
    minWidth: '235px',
    selector: 'zone',
    sortable: true,
    cell: (row) => getMunicipality(row.zone),
  },
  {
    name: 'Rol',
    minWidth: '172px',
    selector: 'role_ids',
    sortable: true,
    cell: (row) => row.role_ids.map(rol => getRol(rol)),
  },
  {
    name: 'Acciones',
    minWidth: '50px',
    cell: (row) => rowActions(row.id),
  },
]
