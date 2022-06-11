import { useSelector } from 'react-redux'
import { Badge } from 'reactstrap'
import {
  rowClient,
  rowActions,
} from '../../../../@core/components/table/commonColumns'
import Url from '../../../../constants/Url'

export const getRol = (rol, index) => (
  <span key={index} style={{ marginRight: '5px' }}>
    <Badge color="light-primary">{rol}</Badge>
  </span>
)

export const getProvinces = (id) => {
  const provincesSelector = useSelector(
    (state) => state?.provinces?.allProvinces,
  )
  const validatedId = id || ''

  return provincesSelector.find(
    (obj) => obj.identifier.substr(2, 2) === validatedId.substr(2, 2),
  )?.name
}

export const getMunicipality = (id) => {
  const municipalitiesSelector = useSelector(
    (state) => state?.municipalities?.allMunicipalities,
  )
  const validatedId = id || ''

  return municipalitiesSelector.find(
    (obj) => obj.identifier === validatedId.substr(0, 6),
  )?.name
}

export const columns = [
  {
    name: 'Nombre',
    minWidth: '400px',
    selector: 'firstname',
    sortable: true,
    cell: (row) => {
      const userInfo = {
        id: row.id,
        firstName: row.firstname,
        lastName: row.lastname,
        cedula: row.cedula,
      }

      return rowClient(userInfo)
    },
  },
  {
    name: 'Correo',
    minWidth: '260px',
    selector: 'email',
    sortable: true,
    cell: (row) => row.email,
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
    cell: (row) => getProvinces(row.zone_code),
  },
  {
    name: 'Municipio',
    minWidth: '235px',
    selector: 'zone',
    sortable: true,
    cell: (row) => getMunicipality(row.zone_code),
  },
  {
    name: 'Rol',
    minWidth: '172px',
    selector: 'roles',
    sortable: true,
    // cell: (row) => {
    //   const newRols = [...new Set(row.roles)]
    //   return newRols.map((rol, index) => getRol(rol, index))
    // }
    cell: (row) => <Badge color="light-primary">{row.user_level}</Badge> 
  },
  {
    name: 'Acciones',
    minWidth: '50px',
    cell: (row) => {
      const url = {
        edit: Url.userEdit,
      }
      return rowActions(row.id, url)
    },
  },
]
