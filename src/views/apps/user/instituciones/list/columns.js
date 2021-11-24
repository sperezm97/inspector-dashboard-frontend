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
        name: row.name,
        acronym: row.acronimo,
      }
      return rowInstitution(data)
    },
  },
  {
    name: 'Teléfono',
    minWidth: '160px',
    selector: 'phonenumber',
    sortable: true,
    cell: (row) => row.phonenumber,
  },
  {
    name: 'DIRECCIÓN',
    minWidth: '172px',
    selector: 'address',
    sortable: true,
    cell: (row) => row.address,
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
    } 
  },
]
