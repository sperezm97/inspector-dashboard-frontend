// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import { User, Edit, Trash2 } from 'react-feather'
import 'cleave.js/dist/addons/cleave-phone.us'
import { useForm, Controller } from 'react-hook-form'
import {
  Media,
  Row,
  Col,
  Button,
  Label,
  FormGroup,
  Input,
  CustomInput,
  Form,
} from 'reactstrap'

import Avatar from '../../../../../@core/components/avatar'
import { rolArray } from '../../../../../constants/Rol/rol'
import CardGrid from '../../../../../@core/components/card-grid'
import { IconInstitution } from '../../../../../@core/components/icons'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const UserCreate = () => {
  // ** State
  const [data, setData] = useState(null)
  const [img, setImg] = useState(null)

  // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } =
    useForm({
      defaultValues: { gender: 'gender-female', dob: null },
    })

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
          content="Subir Logotipo"
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
    <CardGrid cardHeaderTitle="Añadir Nueva Institución">
      <Form
        onSubmit={handleSubmit((data) => {
          trigger()
          setData(data)
        })}
      >
        <Row className="mt-1">
          <Col sm="12">
            <h4 className="mb-1">
              <IconInstitution size={20} className="mr-50" />
              <span className="align-middle">Información</span>
            </h4>
          </Col>
          <Col sm="12">
            <Media className="mb-2">
              {renderUserAvatar()}
              <Media className="mt-50" body>
                <Label>Subir el Logotipo</Label>
                <div className="d-flex flex-wrap mt-1 px-0">
                  <Button.Ripple
                    id="change-img"
                    tag={Label}
                    className="mr-75 mb-0"
                    color="primary"
                  >
                    <span className="d-none d-sm-block">Cargar</span>
                    <span className="d-block d-sm-none">
                      <Edit size={14} />
                    </span>
                    <input
                      type="file"
                      hidden
                      id="change-img"
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
          <Col lg="4" md="6">
            <FormGroup>
              <Label className="d-block" for="nombreInst">
                Nombre de la Institución
              </Label>
              <Input
                type="text"
                id="nombreInst"
                defaultValue="Ministerio de Obras Públicas y Comunicaciones"
                placeholder="Nombre de la Institución"
              />
            </FormGroup>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <Label for="Acrónimo">Acrónimo</Label>
              <Input
                type="text"
                id="Acrónimo"
                defaultValue="MOPC"
                placeholder="Acrónimo"
              />
            </FormGroup>
          </Col>
          <Col lg="4" md="6" sm="12">
            <FormGroup>
              <Label for="Telefono">Teléfono</Label>
              <Input
                type="text"
                name="Telefono"
                id="Telefono"
                defaultValue="809-220-1111"
              />
            </FormGroup>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <Label for="email">Correo Electrónico</Label>
              <Input
                type="email"
                id="email"
                defaultValue="johndoe@email.com"
                placeholder="Correo Electrónico"
              />
            </FormGroup>
          </Col>
          <Col lg="4" md="6" sm="12">
            <FormGroup>
              <Label for="web">Sitio Web</Label>
              <Input
                type="text"
                name="web"
                id="web"
                defaultValue="www.ejemplo.com"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <h4 className="mb-1 mt-2">
              <User size={20} className="mr-50" />
              <span className="align-middle">Encargado</span>
            </h4>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <Label className="d-block" for="dob">
                Cédula de Identidad
              </Label>
              <Input
                type="text"
                id="state"
                defaultValue="001-0000000-0"
                placeholder="Cédula de Identidad"
              />
            </FormGroup>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <Label for="mobileNumber">Nombre Completo</Label>
              <Input
                type="text"
                id="state"
                defaultValue="John Doe"
                placeholder="Nombre Completo"
              />
            </FormGroup>
          </Col>
          <Col lg="4" md="6" sm="12">
            <FormGroup>
              <Label for="role">Rol</Label>
              <Input type="select" name="role" id="role" defaultValue="Admin">
                {rolArray.map((rolArray, index) => (
                  <option value={rolArray} key={index}>
                    {rolArray}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <Label for="languages">Fecha de Nacimiento</Label>
              <Controller
                id="dob"
                name="dob"
                as={Flatpickr}
                control={control}
                placeholder="DD-MM-YYYY"
                options={{ dateFormat: 'd-m-y' }}
                className={classnames('form-control', {
                  'is-invalid': errors.dob,
                })}
              />
            </FormGroup>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <Label for="nacionalidad">Teléfono Móvil</Label>
              <Input
                type="text"
                name="nacionalidad"
                id="nacionalidad"
                defaultValue="809-220-1111"
              />
            </FormGroup>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <Label for="mobileNumber">Correo Electrónico</Label>
              <Input
                type="email"
                id="state"
                defaultValue="johndoe@email.com"
                placeholder="Correo Electrónico"
              />
            </FormGroup>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <Label for="nacionalidad">Nacionalidad</Label>
              <Input
                type="select"
                name="nacionalidad"
                id="nacionalidad"
                defaultValue="Dominicana"
              >
                <option value="Dominicana">Dominicana</option>
              </Input>
            </FormGroup>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <label className="d-block mb-1">Género</label>
              <FormGroup>
                <Controller
                  name="gender"
                  control={control}
                  render={(props) => (
                    <CustomInput
                      inline
                      type="radio"
                      label="Masculino"
                      value="Masculino"
                      id="gender-male"
                      name={props.name}
                      onChange={() => setValue('gender', 'Masculino')}
                    />
                  )}
                />
                <Controller
                  name="gender"
                  control={control}
                  render={(props) => (
                    <CustomInput
                      inline
                      type="radio"
                      label="Femenino"
                      value="Femenino"
                      id="gender-female"
                      name={props.name}
                      defaultChecked
                      onChange={() => setValue('gender', 'Femenino')}
                    />
                  )}
                />
              </FormGroup>
            </FormGroup>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <label className="d-block mb-1">Opciones de Contacto</label>
              <FormGroup>
                <CustomInput
                  inline
                  type="checkbox"
                  name="terms"
                  id="emailTerms"
                  value="Correo"
                  label="Correo"
                  defaultChecked
                />
                <CustomInput
                  inline
                  type="checkbox"
                  name="terms"
                  id="msgTerms"
                  value="Mensajes"
                  label="Mensajes"
                  defaultChecked
                />
                <CustomInput
                  inline
                  type="checkbox"
                  name="terms"
                  id="phoneTerms"
                  value="Teléfono"
                  label="Teléfono"
                />
              </FormGroup>
            </FormGroup>
          </Col>
          <Col className="d-flex flex-sm-row flex-column mt-2">
            <Button
              type="submit"
              color="primary"
              className="mb-1 mb-sm-0 mr-0 mr-sm-1"
            >
              Crear
            </Button>
            <Button type="reset" color="primary" outline>
              Limpiar
            </Button>
          </Col>
        </Row>
      </Form>
    </CardGrid>
  )
}
export default UserCreate
