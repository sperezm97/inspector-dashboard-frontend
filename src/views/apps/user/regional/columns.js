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

import {
  iconRoleTable,
  rowClient,
} from '../../../../@core/components/table/commonColumns'

export const columns = [
  {
    name: 'Nombre',
    minWidth: '320px',
    selector: 'fullName',
    sortable: true,
    cell: (row) => rowClient(row),
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
    name: 'Localidad',
    minWidth: '235px',
    selector: 'Localidad',
    sortable: true,
    // cell: row => row.provincia
    cell: (row) => 'Santo Domingo',
  },
  {
    name: 'Provincia',
    minWidth: '235px',
    selector: 'provincia',
    sortable: true,
    // cell: row => row.provincia
    cell: (row) => 'Santo Domingo',
  },
  {
    name: 'Municipio',
    minWidth: '235px',
    selector: 'municipio',
    sortable: true,
    // cell: row => row.municipio
    cell: (row) => 'Los Alcarrizos',
  },
  {
    name: 'Rol',
    minWidth: '172px',
    selector: 'rol',
    sortable: true,
    cell: (row) => iconRoleTable(row.rol),
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
            to={`/apps/user/view/${row.id}`}
            className="w-100"
          >
            <FileText size={14} className="mr-50" />
            <span className="align-middle">Detalles</span>
          </DropdownItem>
          <DropdownItem
            tag={Link}
            to={`/apps/user/edit/${row.id}`}
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
