// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import { User, MapPin } from 'react-feather'
import 'cleave.js/dist/addons/cleave-phone.us'
import { useForm, Controller } from 'react-hook-form'
import {
  Row,
  Col,
  Button,
  Label,
  FormGroup,
  Input,
  CustomInput,
  Form,
} from 'reactstrap'

import { rolArray } from '../../../../constants/Rol/rol'
import CardGrid from '../../../../@core/components/card-grid'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const UserCreate = () => {
  // ** State
  const [data, setData] = useState(null)

  // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } =
    useForm({
      defaultValues: { gender: 'gender-female', dob: null },
    })

  return (
    <CardGrid cardHeaderTitle="Añadir Nuevo Usuario">
      <Form
        onSubmit={handleSubmit((data) => {
          trigger()
          setData(data)
        })}
      >
        <Row className="mt-1">
          <Col sm="12">
            <h4 className="mb-1">
              <User size={20} className="mr-50" />
              <span className="align-middle">Información Personal</span>
            </h4>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <Label className="d-block" for="dob">
                Cédula de Identidad
              </Label>
              <Input
                type="text"
                id="statee"
                defaultValue="001-0000000-0"
                placeholder="Cédula de Identidad"
              />
            </FormGroup>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <Label for="Nombre">Nombre</Label>
              <Input
                type="text"
                id="Nombre"
                defaultValue="John"
                placeholder="Nombre"
                readOnly
              />
            </FormGroup>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <Label for="Apellido">Apellido</Label>
              <Input
                type="text"
                id="Apellido"
                defaultValue="Doe"
                placeholder="Apellido"
                readOnly
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
              <Label for="zonaid">Zona ID</Label>
              <Input type="text" name="zonaid" id="zonaid" defaultValue="05" />
            </FormGroup>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <Label for="organizacion">Organización</Label>
              <Input
                type="select"
                name="organizacion"
                id="organizacion"
                defaultValue="Organización"
              >
                <option value="Organización">Organización</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
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
