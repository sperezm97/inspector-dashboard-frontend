// ** Reactstrap
import {
  Card,
  CardHeader,
  CardTitle,
  CardText,
  Table,
  CustomInput,
} from 'reactstrap'
import { Lock } from 'react-feather'

import { rolObj } from '../../../../constants/Rol/rol'

const PermissionsTable = () => (
  <Card>
    <CardHeader>
      <CardTitle tag="h4">
        <Lock className="mr-1" />
        Permisos
      </CardTitle>
    </CardHeader>
    <CardText className="ml-2">Permisos de Acuerdo al Rol</CardText>
    <Table striped borderless responsive>
      <thead className="thead-light">
        <tr>
          <th>MÓDULO</th>
          <th>LEER</th>
          <th>ESCRIBIR</th>
          <th>CREAR</th>
          <th>BORRAR</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{rolObj.admin.name}</td>
          <td>
            <CustomInput
              type="checkbox"
              id="admin-1"
              label=""
              defaultChecked
              disabled
            />
          </td>
          <td>
            <CustomInput type="checkbox" id="admin-2" label="" disabled />
          </td>
          <td>
            <CustomInput type="checkbox" id="admin-3" label="" disabled />
          </td>
          <td>
            <CustomInput type="checkbox" id="admin-4" label="" disabled />
          </td>
        </tr>
        <tr>
          <td>{rolObj.presidencial.name}</td>
          <td>
            <CustomInput type="checkbox" id="staff-1" label="" disabled />
          </td>
          <td>
            <CustomInput
              type="checkbox"
              id="staff-2"
              label=""
              defaultChecked
              disabled
            />
          </td>
          <td>
            <CustomInput type="checkbox" id="staff-3" label="" disabled />
          </td>
          <td>
            <CustomInput type="checkbox" id="staff-4" label="" disabled />
          </td>
        </tr>
        <tr>
          <td>{rolObj.institucion.name}</td>
          <td>
            <CustomInput
              type="checkbox"
              id="author-1"
              label=""
              defaultChecked
              disabled
            />
          </td>
          <td>
            <CustomInput type="checkbox" id="author-2" label="" disabled />
          </td>
          <td>
            <CustomInput
              type="checkbox"
              id="author-3"
              label=""
              defaultChecked
              disabled
            />
          </td>
          <td>
            <CustomInput type="checkbox" id="author-4" label="" disabled />
          </td>
        </tr>
        <tr>
          <td>{rolObj.reportero.name}</td>
          <td>
            <CustomInput type="checkbox" id="contributor-1" label="" disabled />
          </td>
          <td>
            <CustomInput type="checkbox" id="contributor-2" label="" disabled />
          </td>
          <td>
            <CustomInput type="checkbox" id="contributor-3" label="" disabled />
          </td>
          <td>
            <CustomInput type="checkbox" id="contributor-4" label="" disabled />
          </td>
        </tr>
        <tr>
          <td>{rolObj.ciudadano.name}</td>
          <td>
            <CustomInput type="checkbox" id="user-1" label="" disabled />
          </td>
          <td>
            <CustomInput type="checkbox" id="user-2" label="" disabled />
          </td>
          <td>
            <CustomInput type="checkbox" id="user-3" label="" disabled />
          </td>
          <td>
            <CustomInput
              type="checkbox"
              id="user-4"
              label=""
              defaultChecked
              disabled
            />
          </td>
        </tr>
      </tbody>
    </Table>
  </Card>
)

export default PermissionsTable
