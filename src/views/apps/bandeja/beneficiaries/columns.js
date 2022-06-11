import {
  rowClient,
  rowActions,
} from '../../../../@core/components/table/commonColumns'
import Url from '../../../../constants/Url'

export const columns = [
  {
    name: 'Nombre',
    minWidth: '400px',
    selector: 'name',
    sortable: true,
    cell: (row) => {
      const userInfo = {
        id: row.id,
        firstName: row.attributes.name,
        lastName: row.attributes.lastname,
        cedula: row.attributes.cedula,
      }

      return rowClient(userInfo)
    },
  },
  {
    name: 'Correo',
    minWidth: '160px',
    selector: 'email',
    sortable: true,
    cell: (row) => row.attributes.email,
  },
  {
    name: 'Teléfono',
    minWidth: '160px',
    selector: 'phone',
    sortable: true,
    cell: (row) => row.attributes.phone,
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
