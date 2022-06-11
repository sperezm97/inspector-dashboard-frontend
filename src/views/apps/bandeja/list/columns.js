import Select from 'react-select'
import { Link } from 'react-router-dom'

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
} from 'reactstrap'
import { MoreVertical, FileText, Trash2, Archive } from 'react-feather'
import { statusTickets , statusPriority } from '../../../../@core/components/status'

import {
  rowActions,
  rowClient,
  rowInstitution,
} from '../../../../@core/components/table/commonColumns'
import { formatDate, selectThemeColors } from '../../../../utility/Utils'
import { statusTicketsArray } from '../../../../constants/Status/statusTickets'
import { putUpdateStatusTicket } from '../../../../services/zammad/ticket'
import Url from '../../../../constants/Url'

import { sweetAlert, sweetAlertGood } from '../../../../@core/components/sweetAlert'


const handleChangeStatus = (e, ticket) => {
  console.log(e)
  console.log(ticket)
  const dataObj = {
    id: ticket,
    state_id: e.value
  }
  putUpdateStatusTicket(dataObj)
    .then(res => sweetAlertGood())
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
    cell: (row) => row.attributes.title,
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
          defaultValue={statusTicketsArray[row.attributes.state - 1]}
          onChange={(e) => handleChangeStatus(e, row.attributes.id)}
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
    cell: (row) => row.attributes.address,
  },
  {
    name: 'FECHA SLA',
    minWidth: '150px',
    selector: 'createDate',
    sortable: true,
    cell: (row) => formatDate(row.attributes.createdAt),
  },
  // {
  //   name: 'Oficial',
  //   minWidth: '400px',
  //   selector: 'ownerFirstName',
  //   sortable: true,
  //   cell: (row) => {
  //     const userInfo = {
  //       id: row.ownerId,
  //       firstName: row.ownerFirstName,
  //       lastName: row.ownerLastName,
  //       cedula: row.ownerCedula,
  //     }

  //     return rowClient(userInfo)
  //   },
  // },
  // {
  //   name: 'INSTITUCIÓN',
  //   minWidth: '400px',
  //   selector: 'institutionName',
  //   sortable: true,
  //   cell: (row) => {
  //     const institutionInfo = {
  //       id: row.institutionId,
  //       acronym: row.institutionAcronym,
  //       name: row.institutionName
  //     }
      
  //     return rowInstitution(institutionInfo)
  //   }
  // },
  // {
  //   name: 'Cliente',
  //   minWidth: '400px',
  //   selector: 'customerFirstName',
  //   sortable: true,
  //   cell: (row) => {
  //     const userInfo = {
  //       id: row.customerId,
  //       firstName: row.customerFirstName,
  //       lastName: row.customerLastName,
  //       cedula: row.customerCedula,
  //     }

  //     return rowClient(userInfo)
  //   },
  // },
  {
    name: 'PRIORIDAD',
    minWidth: '150px',
    selector: 'priority',
    sortable: true,
    cell: (row) => statusPriority(row.attributes.priority),
  },
  {
    name: 'Acciones',
    minWidth: '50px',
    cell: (row) => (
      <UncontrolledDropdown>
        <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
        </DropdownToggle>
        <DropdownMenu right>
            {/* <DropdownItem
                tag={Link}
                to={`${url?.details}/${rowId}`}
                className="w-100"
                >
                <FileText size={14} className="mr-50" />
                <span className="align-middle">Detalles</span>
            </DropdownItem> */}
            <DropdownItem
                tag={Link}
                to={`${Url.dashboardInbox}/${row.id}`}
                className="w-100"
                >
                <Archive size={14} className="mr-50" />
                <span className="align-middle">Detalles</span>
            </DropdownItem>
            {/* <DropdownItem className="w-100">
                <Trash2 size={14} className="mr-50" />
                <span className="align-middle">Borrar</span>
            </DropdownItem> */}
        </DropdownMenu>
    </UncontrolledDropdown>
    )
  },
]