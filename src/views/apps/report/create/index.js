// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import { User, MapPin, FileText, Image } from 'react-feather'
import 'cleave.js/dist/addons/cleave-phone.us'
import { useForm } from 'react-hook-form'
import { Row, Col, Button, Label, FormGroup, Input, Form } from 'reactstrap'

import CardGrid from '../../../../@core/components/card-grid'

import FileUploader from './FileUploader'

// ** Styles
import 'uppy/dist/uppy.css'
import '@uppy/status-bar/dist/style.css'
import '@styles/react/libs/file-uploader/file-uploader.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const ReportCreate = () => {
  // ** State
  const [data, setData] = useState(null)

  // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } =
    useForm({
      defaultValues: { gender: 'gender-female', dob: null },
    })

  return (
    <CardGrid cardHeaderTitle="Nuevo Reporte">
      <Form
        onSubmit={handleSubmit((data) => {
          trigger()
          setData(data)
        })}
      >
        <Row className="mt-1">
          <Col sm="12">
            <h4 className="mb-1">
              <FileText size={20} className="mr-50" />
              <span className="align-middle">Información del Reporte</span>
            </h4>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <Label for="nacionalidad">Estado</Label>
              <Input
                type="select"
                name="nacionalidad"
                id="nacionalidad"
                defaultValue="En progreso"
              >
                <option value="En progreso">En progreso</option>
              </Input>
            </FormGroup>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <Label for="titlereport">Título del Reporte</Label>
              <Input
                type="text"
                id="titlereport"
                defaultValue="Ejemplo"
                placeholder="Título del Reporte"
              />
            </FormGroup>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <Label for="Institución">Institución</Label>
              <Input
                type="select"
                name="institucion"
                id="institucion"
                defaultValue="Seleccione"
              >
                <option value="Seleccione">Seleccione</option>
              </Input>
            </FormGroup>
          </Col>
          <Col sm="12">
            <h4 className="mb-1 mt-2">
              <User size={20} className="mr-50" />
              <span className="align-middle">Información del Ciudadano</span>
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
          <Col sm="12">
            <h4 className="mb-1 mt-2">
              <MapPin size={20} className="mr-50" />
              <span className="align-middle">Su Zona de Trabajo</span>
            </h4>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <Label for="ZoneID">Zona ID</Label>
              <Input
                type="text"
                id="ZoneID"
                defaultValue="05"
                placeholder="Zone ID"
              />
            </FormGroup>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <Label for="mobileNumber">Dirección</Label>
              <Input
                type="text"
                id="state"
                defaultValue="Santo Domingo"
                placeholder="Dirección"
              />
            </FormGroup>
          </Col>
          <Col sm="12">
            <h4 className="mb-1 mt-2">
              <Image size={20} className="mr-50" />
              <span className="align-middle">Prueba</span>
            </h4>
          </Col>
          <Col sm="12">
            <FormGroup>
              <Label for="Description">Descripción</Label>
              <Input
                type="text"
                id="Description"
                placeholder="Escribe de qué se trata el reporte"
              />
            </FormGroup>
          </Col>
          <Col sm="12">
            <FileUploader />
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
export default ReportCreate
