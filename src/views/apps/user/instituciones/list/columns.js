import {
  rowActions,
  rowInstitution,
} from '../../../../../@core/components/table/commonColumns'
import Url from '../../../../../constants/Url'

export const columns = [
  {
    name: 'Institución',
    minWidth: '450px',
    selector: 'name',
    sortable: true,
    cell: (row) => {
      const data = {
        id: row.id,
        name: row.attributes.name,
        acronym: row.attributes.acronym,
      }
      return rowInstitution(data)
    },
  },
  {
    name: 'Teléfono',
    minWidth: '160px',
    selector: 'phone',
    sortable: true,
    cell: (row) => row.attributes.phone,
  },
  {
    name: 'DIRECCIÓN',
    minWidth: '172px',
    selector: 'address',
    sortable: true,
    cell: (row) => row.attributes.address,
  },
  {
    name: 'Acciones',
    minWidth: '50px',
    cell: (row) => {
      const url = {
        details: Url.institution,
        edit: Url.institutionEdit,
      }
      return rowActions(row.id, url)
    },
  },
]
