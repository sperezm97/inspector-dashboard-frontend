// ** React Imports
import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// ** Third Party Components
import { User, MapPin, FileText, Image } from 'react-feather'
import 'cleave.js/dist/addons/cleave-phone.us'
import { Row, Col, Button, Label, FormGroup, Input, Form } from 'reactstrap'

import CardGrid from '../../../../@core/components/card-grid'
import FormApp from '../../../../@core/components/form'
import InputApp from '../../../../@core/components/input'

import FileUploader from './FileUploader'

// ** Styles
import 'uppy/dist/uppy.css'
import '@uppy/status-bar/dist/style.css'
import '@styles/react/libs/file-uploader/file-uploader.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const schema = yup.object().shape({
  name: yup.string().required().trim(),
  acronimo: yup.string().required().trim(),
  phonenumber: yup.number().positive().integer().required(),
  address: yup.string().required().trim(),
})

const ReportCreate = () => {
  // ** State
  const [data, setData] = useState(null)

  // ** React hook form vars
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    console.log(data)
  }

  return (
    <CardGrid cardHeaderTitle="Nuevo Reporte">
      <FormApp
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      >
        <Row className="mt-1">
          <Col sm="12">
            <h4 className="mb-1">
              <FileText size={20} className="mr-50" />
              <span className="align-middle">Tipo de incidencia</span>
            </h4>
          </Col>

          <InputApp
            select
            label="Título del Reporte"
            name="title"
            register={register}
            placeholder="Escribe la Institución"
            messageError={errors.name?.message && 'El Título del Reporte es obligatorio'}
          />

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
              <span className="align-middle">Detalles del beneficiario</span>
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
              <span className="align-middle">Detalles del reporte</span>
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
              <span className="align-middle">Evidencias</span>
            </h4>
          </Col>
          <Col sm="12">
            <FileUploader />
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
      </FormApp>
    </CardGrid>
  )
}
export default ReportCreate
