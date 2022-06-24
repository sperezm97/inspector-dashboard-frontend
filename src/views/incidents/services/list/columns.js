import { rowActions } from '../../../../@core/components/table/commonColumns'
import Url from '../../../../constants/Url'

export const columns = [
  {
    name: 'Nombre',
    selector: 'name',
    sortable: true,
    cell: (row) => row.attributes.name,
  },
  {
    name: 'Acciones',
    minWidth: '50px',
    cell: (row) => {
      const url = {
        details: Url.services,
        edit: Url.servicesEdit,
      }
      return rowActions(row.id, url)
    },
  },
]
