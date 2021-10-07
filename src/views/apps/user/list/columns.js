import {
  rowClient,
  iconRoleTable,
  rowActions,
} from '../../../../@core/components/table/commonColumns'

export const columns = [
  {
    name: 'Nombre',
    minWidth: '400px',
    selector: 'firstname',
    sortable: true,
    cell: (row) => {
      const userInfo = {
        reporterId: row.id,
        reporterFirstName: row.firstname,
        reporterLastName: row.lastname,
        reporterCedula: row.cedula,
      }

      return rowClient(userInfo)
    }
  },
  {
    name: 'Teléfono',
    minWidth: '160px',
    selector: 'phone',
    sortable: true,
    cell: (row) => row.phone,
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
    cell: (row) => rowActions(row.id),
  },
]
