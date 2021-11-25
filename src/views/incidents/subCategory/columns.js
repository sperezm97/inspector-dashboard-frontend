import { rowActions } from '../../../@core/components/table/commonColumns'
import Url from '../../../constants/Url'

export const columns = [
  {
    name: 'Nombre',
    minWidth: '',
    selector: 'name',
    sortable: true,
    cell: (row) => row.name,
  },
  {
    name: 'Acciones',
    minWidth: '50px',
    cell: (row) => {
      const url = {
        details: Url.subCategory,
        edit: Url.subCategoryEdit,
      }
      return rowActions(row.id, url)
    },
  },
]
