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
          />

          <Col sm="12">
            <h4 className="mb-1 mt-2">
              <User size={20} className="mr-50" />
              <span className="align-middle">Detalles del beneficiario</span>
            </h4>
          </Col>

          <InputApp
            label="Cédula de Identidad"
            name="cedula"
            type="number"
            register={register}
            placeholder="Escribe la Cédula"
            messageError={errors.name?.message && 'La Cédula es obligatoria'}
          />

          <InputApp
            label="Nombre Completo"
            name="name"
            register={register}
            placeholder="Nombre..."
            disabled
            messageError={errors.name?.message && 'El Nombre es obligatorio'}
          />

          <InputApp
            label="Teléfono"
            name="telefono"
            type="number"
            register={register}
            placeholder="Escribe el Teléfono"
            messageError={errors.name?.message && 'El Teléfono es obligatorio'}
          />

          <Col sm="12">
            <h4 className="mb-1 mt-2">
              <MapPin size={20} className="mr-50" />
              <span className="align-middle">Detalles del reporte</span>
            </h4>
          </Col>

          <InputApp
            select
            label="Sección"
            name="Sección"
            selectOptions={dataTableOrganizations}
            register={register}
            control={control}
            placeholder="Escribe la Sección"
            messageError={errors.name?.message && 'La Sección es obligatoria'}
          />

          <InputApp
            select
            label="Barrio"
            name="Barrio"
            selectOptions={dataTableOrganizations}
            register={register}
            control={control}
            placeholder="Escribe el Barrio"
            messageError={errors.name?.message && 'El Barrio es obligatorio'}
          />

          <InputApp
            select
            label="Sub-Barrio"
            name="subBarrio"
            selectOptions={dataTableOrganizations}
            register={register}
            control={control}
            placeholder="Escribe el Sub-Barrio"
            messageError={errors.name?.message && 'El Sub-Barrio es obligatorio'}
          />
         
          <InputApp
            label="Residencial, calle, número"
            name="location"
            type="text"
            register={register}
            placeholder="Escribe la dirección"
            messageError={errors.name?.message && 'Campo obligatorio'}
          />          

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
                name="Description"
                innerRef={register()}
                placeholder="Digite información relevante para el reporte"
              />
            </FormGroup>
          </Col>
      </FormApp>
    </CardGrid>
  )
}
export default ReportCreate
