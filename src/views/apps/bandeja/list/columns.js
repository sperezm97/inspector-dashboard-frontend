import Select from 'react-select'

import { statusTickets , statusPriority } from '../../../../@core/components/status'

import {
  rowActions,
  rowClient,
  rowInstitution,
} from '../../../../@core/components/table/commonColumns'
import { formatDate, selectThemeColors } from '../../../../utility/Utils'
import { statusTicketsArray } from '../../../../constants/Status/statusTickets'
import { putUpdateStateTicket } from '../../../../services/zammad/ticket'


const handleChangeStatus = (e, ticket) => {
  console.log(e)
  console.log(ticket)
  const dataObj = {
    id: ticket,
    state_id: e.value
  }
  putUpdateStateTicket(dataObj)
    .then(res => console.log(res))
    .catch((err) => {
      sweetAlert({
        title: 'Error!',
        text: 'Ocurrió un error al modificar el estado del ticket.',
        type: 'error'
      }) 
      console.log(err)
    })
}

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
    minWidth: '260px',
    selector: 'status',
    sortable: true,
    cell: (row) => (
      <div style={{width: '100%'}}>
        <Select
          menuPlacement="auto"
          menuPosition="fixed"
          theme={selectThemeColors}
          className="react-select"
          classNamePrefix="select"
          defaultValue={statusTicketsArray[row.status - 1]}
          onChange={(e) => handleChangeStatus(e, row.id)}
          options={statusTicketsArray.map((dataMap) => ({
            value: dataMap.id,
            label: dataMap.label,
          }))}
        />
      </div>
      // statusTickets(row.status)
    )
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
    cell: (row) => {
      const institutionInfo = {
        id: row.institutionId,
        acronym: row.institutionAcronym,
        name: row.institutionName
      }
      
      return rowInstitution(institutionInfo)
    }
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