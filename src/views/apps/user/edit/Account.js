// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import { Lock, Edit, Trash2 } from 'react-feather'
import {
  Media,
  Row,
  Col,
  Button,
  Form,
  Input,
  Label,
  FormGroup,
  Table,
  CustomInput,
} from 'reactstrap'

import Avatar from '@components/avatar'

// Roles
import { rolObj } from '../../../../constants/Rol/rol'

const UserAccountTab = ({ selectedUser }) => {
  // ** States
  const [img, setImg] = useState(null)
  const [userData, setUserData] = useState(null)

  // ** Function to change user image
  const onChange = (e) => {
    const reader = new FileReader()
    const { files } = e.target
    reader.onload = function () {
      setImg(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  // ** Update user image on mount or change
  useEffect(() => {
    if (
      selectedUser !== null ||
      (selectedUser !== null &&
        userData !== null &&
        selectedUser.id !== userData.id)
    ) {
      setUserData(selectedUser)
      if (selectedUser?.avatar?.length) {
        return setImg(selectedUser.avatar)
      }
      return setImg(null)
    }
  }, [selectedUser])

  const renderUserAvatar = () => {
    if (img === null) {
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
      return (
        <Avatar
          initials
          color={color}
          className="rounded mr-2 my-25"
          content={selectedUser.fullName}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(36px)',
            width: '100%',
            height: '100%',
          }}
          style={{
            height: '90px',
            width: '90px',
          }}
        />
      )
    }
    return (
      <img
        className="user-avatar rounded mr-2 my-25 cursor-pointer"
        src={img}
        alt="user profile avatar"
        height="90"
        width="90"
      />
    )
  }

  return (
    <Row>
      <Col sm="12">
        <Media className="mb-2">
          {renderUserAvatar()}
          <Media className="mt-50" body>
            <h4>{selectedUser.fullName} </h4>
            <div className="d-flex flex-wrap mt-1 px-0">
              <Button.Ripple
                id="change-img"
                tag={Label}
                className="mr-75 mb-0"
                color="primary"
              >
                <span className="d-none d-sm-block">Cambiar</span>
                <span className="d-block d-sm-none">
                  <Edit size={14} />
                </span>
                <input
                  type="file"
                  hidden
                  id="change-img"
                  onChange={onChange}
                  accept="image/*"
                />
              </Button.Ripple>
              <Button.Ripple color="primary" outline>
                <span className="d-none d-sm-block">Remover</span>
                <span className="d-block d-sm-none">
                  <Trash2 size={14} />
                </span>
              </Button.Ripple>
            </div>
          </Media>
        </Media>
      </Col>
      <Col sm="12">
        <Form onSubmit={(e) => e.preventDefault()}>
          <Row>
            <Col md="4" sm="12">
              <FormGroup>
                <Label>Cédula de Identidad</Label>
                <Input
                  type="text"
                  placeholder="Cédula de Identidad"
                  defaultValue="001-0030000-0"
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="12">
              <FormGroup>
                <Label>Nombre</Label>
                <Input
                  type="text"
                  placeholder="Nombre"
                  defaultValue="John"
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="12">
              <FormGroup>
                <Label>Apellido</Label>
                <Input type="text" defaultValue="Doe" readOnly />
              </FormGroup>
            </Col>
            <Col md="4" sm="12">
              <FormGroup>
                <Label>Nacionalidad</Label>
                <Input type="text" defaultValue="Dominicano" readOnly />
              </FormGroup>
            </Col>
            <Col md="4" sm="12">
              <FormGroup>
                <Label>Teléfono Móvil</Label>
                <Input type="text" defaultValue="809-220-1111" readOnly />
              </FormGroup>
            </Col>
            <Col md="4" sm="12">
              <FormGroup>
                <Label>Correo Electrónico</Label>
                <Input type="text" defaultValue="johndoe@email.com" readOnly />
              </FormGroup>
            </Col>
            <Col md="4" sm="12">
              <FormGroup>
                <Label>Género</Label>
                <Input type="text" defaultValue="Femenino" readOnly />
              </FormGroup>
            </Col>
            <Col md="4" sm="12">
              <FormGroup>
                <Label>Zona ID</Label>
                <Input type="text" defaultValue="05" readOnly />
              </FormGroup>
            </Col>
            <Col md="4" sm="12">
              <FormGroup>
                <Label>Organización</Label>
                <Input type="text" defaultValue="MOPC" readOnly />
              </FormGroup>
            </Col>
            <Col md="4" sm="12">
              <FormGroup>
                <Label>Estado</Label>
                <Input type="text" defaultValue="Activo" readOnly />
              </FormGroup>
            </Col>
            <Col sm="12">
              <div className="permissions border mt-1">
                <h6 className="py-1 mx-1 mb-0 font-medium-2">
                  <Lock size={18} className="mr-25" />
                  <span className="align-middle">Permisos</span>
                </h6>
                <Table borderless striped responsive>
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
                        <CustomInput
                          type="checkbox"
                          id="admin-2"
                          label=""
                          disabled
                        />
                      </td>
                      <td>
                        <CustomInput
                          type="checkbox"
                          id="admin-3"
                          label=""
                          disabled
                        />
                      </td>
                      <td>
                        <CustomInput
                          type="checkbox"
                          id="admin-4"
                          label=""
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>{rolObj.presidencial.name}</td>
                      <td>
                        <CustomInput
                          type="checkbox"
                          id="staff-1"
                          label=""
                          disabled
                        />
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
                        <CustomInput
                          type="checkbox"
                          id="staff-3"
                          label=""
                          disabled
                        />
                      </td>
                      <td>
                        <CustomInput
                          type="checkbox"
                          id="staff-4"
                          label=""
                          disabled
                        />
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
                        <CustomInput
                          type="checkbox"
                          id="author-2"
                          label=""
                          disabled
                        />
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
                        <CustomInput
                          type="checkbox"
                          id="author-4"
                          label=""
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>{rolObj.reportero.name}</td>
                      <td>
                        <CustomInput
                          type="checkbox"
                          id="contributor-1"
                          label=""
                          disabled
                        />
                      </td>
                      <td>
                        <CustomInput
                          type="checkbox"
                          id="contributor-2"
                          label=""
                          disabled
                        />
                      </td>
                      <td>
                        <CustomInput
                          type="checkbox"
                          id="contributor-3"
                          label=""
                          disabled
                        />
                      </td>
                      <td>
                        <CustomInput
                          type="checkbox"
                          id="contributor-4"
                          label=""
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>{rolObj.ciudadano.name}</td>
                      <td>
                        <CustomInput
                          type="checkbox"
                          id="user-1"
                          label=""
                          disabled
                        />
                      </td>
                      <td>
                        <CustomInput
                          type="checkbox"
                          id="user-2"
                          label=""
                          disabled
                        />
                      </td>
                      <td>
                        <CustomInput
                          type="checkbox"
                          id="user-3"
                          label=""
                          disabled
                        />
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
              </div>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}
export default UserAccountTab
