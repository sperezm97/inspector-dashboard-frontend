// ** Custom Components
import { statusTickets } from '@components/status'
import {
  rowActions,
  rowClient,
  rowInstitution,
} from '../../../../@core/components/table/commonColumns'
import { statusPriority } from '../../../../@core/components/status'
import { formatDate } from '../../../../utility/Utils'

// ** Third Party Components

export const columns = [
  {
    name: 'TÍTULO',
    minWidth: '260px',
    selector: 'title',
    sortable: true,
    cell: (row) => row.title,
  },
  {
    name: 'ESTADO',
    minWidth: '160px',
    selector: 'status',
    sortable: true,
    cell: (row) => statusTickets(row.status),
  },
  {
    name: 'DIRECCIÓN',
    minWidth: '260px',
    selector: 'address',
    sortable: true,
    cell: (row) => row.address,
  },
  {
    name: 'FECHA SLA',
    minWidth: '150px',
    selector: 'createDate',
    sortable: true,
    cell: (row) => formatDate(row.createDate),
  },
  {
    name: 'Oficial',
    minWidth: '400px',
    selector: 'ownerFirstName',
    sortable: true,
    cell: (row) => {
      const userInfo = {
        id: row.ownerId,
        firstName: row.ownerFirstName,
        lastName: row.ownerLastName,
        cedula: row.ownerCedula,
      }

      return rowClient(userInfo)
    },
  },
  {
    name: 'INSTITUCIÓN',
    minWidth: '400px',
    selector: 'institutionName',
    sortable: true,
    cell: (row) => rowInstitution(row),
  },
  {
    name: 'Cliente',
    minWidth: '400px',
    selector: 'customerFirstName',
    sortable: true,
    cell: (row) => {
      const userInfo = {
        id: row.customerId,
        firstName: row.customerFirstName,
        lastName: row.customerLastName,
        cedula: row.customerCedula,
      }

      return rowClient(userInfo)
    },
  },
  {
    name: 'PRIORIDAD',
    minWidth: '150px',
    selector: 'priority',
    sortable: true,
    cell: (row) => statusPriority(row.priority),
  },
  {
    name: 'Acciones',
    minWidth: '50px',
    cell: (row) => rowActions(row.id),
  },
]
