import { rowActions } from '../../../../@core/components/table/commonColumns'
import Url from '../../../../constants/Url'

export const columns = [
  {
    name: 'Nombre',
    minWidth: '',
    selector: 'name',
    sortable: true,
    cell: (row) => row.attributes.name,
  },
  {
    name: 'Acciones',
    minWidth: '50px',
    cell: (row) => {
      const url = {
        details: Url.category,
        edit: Url.categoryEdit,
      }
      return rowActions(row.id, url)
    },
  },
]
