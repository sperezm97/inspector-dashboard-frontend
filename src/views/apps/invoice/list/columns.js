import { Link } from 'react-router-dom'

// ** Store & Actions
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  UncontrolledTooltip,
} from 'reactstrap'

import {
  Eye,
  Send,
  MoreVertical,
  Download,
  Edit,
  Trash,
  Copy,
} from 'react-feather'
import { deleteInvoice } from '../store/actions'

import { rowClient } from '../../../../@core/components/table/commonColumns'

// ** Table columns
export const columns = [
  {
    name: 'Nombre',
    minWidth: '300px',
    selector: 'client',
    sortable: true,
    cell: (row) => rowClient(row),
  },
  {
    name: 'Teléfono',
    minWidth: '150px',
    selector: 'cliente',
    sortable: true,
    cell: (row) => '809-220-1111',
  },
  {
    name: 'Localidad',
    minWidth: '235px',
    selector: 'Localidad',
    sortable: true,
    // cell: row => row.provincia
    cell: (row) => 'Santo Domingo',
  },
  {
    name: 'Municipio',
    selector: 'total',
    sortable: true,
    minWidth: '200px',
    cell: (row) => 'Distrito Nacional',
  },
  {
    name: 'Rol',
    selector: 'dueDate',
    sortable: true,
    minWidth: '200px',
    cell: (row) => 'Reportero',
  },
  {
    name: 'Reporteros',
    selector: 'balance',
    sortable: true,
    minWidth: '150px',
    cell: (row) => '99',
  },
  {
    name: 'Acciones',
    minWidth: '110px',
    selector: '',
    sortable: false,
    cell: (row) => (
      <div className="column-action d-flex align-items-center">
        <Send size={17} id={`send-tooltip-${row.id}`} />
        <UncontrolledTooltip placement="top" target={`send-tooltip-${row.id}`}>
          Enviar correo
        </UncontrolledTooltip>
        <Link to="/apps/invoice/preview" id={`pw-tooltip-${row.id}`}>
          <Eye size={17} className="mx-1" />
        </Link>
        <UncontrolledTooltip placement="top" target={`pw-tooltip-${row.id}`}>
          Detalles
        </UncontrolledTooltip>
        <UncontrolledDropdown>
          <DropdownToggle tag="span">
            <MoreVertical size={17} className="cursor-pointer" />
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
      </div>
    ),
  },
]
