import { rowActions, rowInstitution } from '../../../../../@core/components/table/commonColumns'

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
        acronym: row.acronimo
      }
      return rowInstitution(data)
    },
  },
  {
    name: 'Teléfono',
    minWidth: '160px',
    selector: 'telephone',
    sortable: true,
    cell: (row) => '',
  },
  {
    name: 'DIRECCIÓN',
    minWidth: '172px',
    selector: 'direccion',
    sortable: true,
    cell: (row) => '',
  },
  {
    name: 'Acciones',
    minWidth: '50px',
    cell: (row) => rowActions(row.id),
  },
]
