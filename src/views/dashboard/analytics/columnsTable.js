import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { deleteInvoice } from '@src/views/apps/invoice/store/actions'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap'

import { MoreVertical, Download, Edit, Trash, Copy } from 'react-feather'

import {
  iconRoleTable,
  rowClient,
} from '../../../@core/components/table/commonColumns'

// ** renders client column
const renderClient = (row) => {
  const stateNum = Math.floor(Math.random() * 6)
  const states = [
    'light-success',
    'light-danger',
    'light-warning',
    'light-info',
    'light-primary',
    'light-secondary',
  ]
  const color = states[stateNum]

  if (row?.avatar?.length) {
    return <Avatar className="mr-50" img={row.avatar} width="32" height="32" />
  }
  return (
    <Avatar
      color={color}
      className="mr-50"
      content={row.fullName ? row.fullName : 'John Doe'}
      initials
    />
  )
}

// ** Table columns
export const columnsTable = [
  {
    name: 'Nombre',
    minWidth: '300px',
    selector: 'fullName',
    sortable: true,
    cell: (row) => rowClient(row),
  },
  {
    name: 'Teléfono',
    minWidth: '150px',
    selector: 'telephone',
    sortable: true,
    // cell: row => row.telephone
    cell: (row) => '809-220-1111',
  },
  {
    name: 'Provincia',
    selector: 'provincia',
    sortable: true,
    minWidth: '200px',
    // cell: row => row.provincia
    cell: (row) => 'Santo Domingo',
  },
  {
    name: 'Municipio',
    selector: 'municipio',
    sortable: true,
    minWidth: '200px',
    // cell: row => row.municipio
    cell: (row) => 'Los Alcarrizos',
  },
  {
    name: 'Rol',
    selector: 'rol',
    sortable: true,
    minWidth: '125',
    cell: (row) => iconRoleTable(row.rol),
  },
  {
    name: 'Acciones',
    minWidth: '50px',
    sortable: false,
    cell: (row) => (
      <UncontrolledDropdown>
        <DropdownToggle tag="div" className="btn btn-sm">
          <MoreVertical size={14} className="cursor-pointer" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            tag="a"
            href="/"
            className="w-100"
            onClick={(e) => e.preventDefault()}
          >
            <Download size={14} className="mr-50" />
            <span className="align-middle">Descargar</span>
          </DropdownItem>
          <DropdownItem
            tag={Link}
            to={`/apps/invoice/edit/${row.id}`}
            className="w-100"
          >
            <Edit size={14} className="mr-50" />
            <span className="align-middle">Editar</span>
          </DropdownItem>
          <DropdownItem
            tag="a"
            href="/"
            className="w-100"
            onClick={(e) => {
              e.preventDefault()
              store.dispatch(deleteInvoice(row.id))
            }}
          >
            <Trash size={14} className="mr-50" />
            <span className="align-middle">Borrar</span>
          </DropdownItem>
          <DropdownItem
            tag="a"
            href="/"
            className="w-100"
            onClick={(e) => e.preventDefault()}
          >
            <Copy size={14} className="mr-50" />
            <span className="align-middle">Duplicar</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  },
]
