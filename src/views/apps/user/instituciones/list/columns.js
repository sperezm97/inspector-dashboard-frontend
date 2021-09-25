// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import { MoreVertical, FileText, Trash2, Archive } from 'react-feather'

import { rowInstitution } from '../../../../../@core/components/table/commonColumns'
import Url from '../../../../../constants/Url'

export const columns = [
  {
    name: 'Institución',
    minWidth: '360px',
    selector: 'institucion',
    sortable: true,
    cell: (row) => rowInstitution(row),
  },
  {
    name: 'Teléfono',
    minWidth: '160px',
    selector: 'telephone',
    sortable: true,
    // cell: row => row.telephone
    cell: (row) => '809-220-1111',
  },
  {
    name: 'DIRECCIÓN',
    minWidth: '172px',
    selector: 'direccion',
    sortable: true,
    cell: (row) => '27 de Febrero #419',
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
          <DropdownItem
            tag={Link}
            to={`${Url.institution}/${row.id}`}
            className="w-100"
          >
            <FileText size={14} className="mr-50" />
            <span className="align-middle">Detalles</span>
          </DropdownItem>
          <DropdownItem
            tag={Link}
            to={`/apps/user/instituciones/${row.id}`}
            className="w-100"
          >
            <Archive size={14} className="mr-50" />
            <span className="align-middle">Editar</span>
          </DropdownItem>
          <DropdownItem className="w-100">
            <Trash2 size={14} className="mr-50" />
            <span className="align-middle">Borrar</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  },
]
