// ** React Imports
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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

import { getAllServicesActions } from '../../../../redux/actions/incidents/services'
import { getAllCategoriesActions } from '../../../../redux/actions/incidents/categories'
import { getAllSubCategoriesActions } from '../../../../redux/actions/incidents/subCategories'
import { getAllOrganizationsActions } from '../../../../redux/actions/zammad/organizations'

const schema = yup.object().shape({
  // Incidente: yup.string().required().trim(),
  // acronimo: yup.string().required().trim(),
  // phonenumber: yup.number().positive().integer().required(),
  // address: yup.string().required().trim(),
})

const ReportCreate = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllServicesActions())
    dispatch(getAllCategoriesActions())
    dispatch(getAllSubCategoriesActions())
    dispatch(getAllOrganizationsActions())
  }, [])

  const dataTableServices = useSelector((state) => state?.services?.services)
  const dataTableCategories = useSelector(
    (state) => state?.categories?.categories,
  )
  const dataTableSubCategories = useSelector(
    (state) => state?.subCategories?.subCategories,
  )
  const dataTableOrganizations = useSelector(
    (state) => state?.organizations?.organizations,
  )

  // ** React hook form vars
  const { register, handleSubmit, errors, getValues, control } = useForm({
    resolver: yupResolver(schema),
  })

  console.log(getValues())

  const onSubmit = async (data) => {
    console.log(data)
  }

  return (
    <CardGrid cardHeaderTitle="Nuevo Reporte">
      <FormApp
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      >
          <Col sm="12">
            <h4 className="mb-1">
              <FileText size={20} className="mr-50" />
              <span className="align-middle">Tipo de incidencia</span>
            </h4>
          </Col>

          <InputApp
            select
            label="Incidente"
            name="Incidente"
            selectOptions={dataTableServices}
            register={register}
            control={control}
            messageError={errors.name?.message && 'El Incidente es obligatorio'}
          />

          <InputApp
            select
            label="Categoria"
            name="Categoria"
            selectOptions={dataTableCategories}
            register={register}
            control={control}
            messageError={errors.name?.message && 'La Categoria es obligatoria'}
          />

          <InputApp
            select
            label="Sub-Categorias"
            name="subCategoria"
            selectOptions={dataTableSubCategories}
            register={register}
            control={control}
            messageError={errors.name?.message && 'La Sub-Categorias es obligatoria'}
          />

          <InputApp
            select
            label="Institución"
            name="institución"
            selectOptions={dataTableOrganizations}
            register={register}
            control={control}
            messageError={errors.name?.message && 'La Institución es obligatoria'}
            placeholder="Escribe la Institución"
            messageError={
              errors.name?.message && 'El Título del Reporte es obligatorio'
            }
          />

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
      </FormApp>
    </CardGrid>
  )
}
export default ReportCreate
