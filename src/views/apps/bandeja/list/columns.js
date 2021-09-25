// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import { statusTickets } from '@components/status'
import {
  rowActions,
  rowClient,
  rowInstitution,
} from '../../../../@core/components/table/commonColumns'
import { getCustomerById, getOrganizationById, getStateById } from '../../../../utility/zammad/filterData'
import { statusPriority } from '../../../../@core/components/status'

// ** Third Party Components

export const columns = [
  {
    name: 'TÍTULO',
    minWidth: '220px',
    selector: 'title',
    sortable: true,
    cell: (row) => row.title,
  },
  {
    name: 'ESTADO',
    minWidth: '160px',
    selector: 'state_id',
    sortable: true,
    cell: (row) => statusTickets(getStateById(row.state_id)),
  },
  {
    name: 'DIRECCIÓN',
    minWidth: '200px',
    selector: 'address',
    sortable: true,
    cell: (row) => row.address,
  },
  {
    name: 'FECHA SLA',
    minWidth: '150px',
    selector: 'created_at',
    sortable: true,
    cell: (row) => row.created_at,
  },
  {
    name: 'REPORTERO',
    minWidth: '250px',
    selector: 'customer_id',
    sortable: true,
    cell: (row) => rowClient(getCustomerById(row.customer_id)),
  },
  {
    name: 'INSTITUCIÓN',
    minWidth: '320px',
    selector: 'organization_id',
    sortable: true,
    cell: (row) => rowInstitution(getOrganizationById(row.organization_id)),
  },
  {
    name: 'Oficial',
    minWidth: '250px',
    selector: 'customer_id',
    sortable: true,
    cell: (row) => rowClient(getCustomerById(row.customer_id)),
  },
  {
    name: 'PRIORIDAD',
    minWidth: '172px',
    selector: 'priority_id',
    sortable: true,
    cell: (row) => statusPriority(row.priority_id),
  },
  {
    name: 'Acciones',
    minWidth: '50px',
    cell: (row) => rowActions(row.id)
  },
]
