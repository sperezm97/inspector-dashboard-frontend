// ** React Imports
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { selectThemeColors } from '../../../../utility/Utils'

// ** Third Party Components
import { User, MapPin, FileText, Image } from 'react-feather'
import 'cleave.js/dist/addons/cleave-phone.us'
import Select from 'react-select'
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
import { getIncidentCategoryByIdService } from '../../../../services/incidents/category'
import { getIncidentSubCategoryByIdServiceByIdCategory } from '../../../../services/incidents/subCategory'
import { getIncidentOrganizationByIdService } from '../../../../services/incidents/organization'

const schema = yup.object().shape({
  // Incidente: yup.string().required().trim(),
  // acronimo: yup.string().required().trim(),
  // phonenumber: yup.number().positive().integer().required(),
  // address: yup.string().required().trim(),
})

const ReportCreate = function() {
  const dispatch = useDispatch()

  const [hierarchies, setHierarchies] = useState({
    category: null,
    subCategory: null,
  })
  console.log(hierarchies)
  const [ dataTableCategories, setDataTableCategories ] = useState([])
  console.log(dataTableCategories)
  const [ dataTableSubCategories, setDataTableSubCategories ] = useState([])
  const [ dataTableOrganizations, setDataTableOrganizations ] = useState([])

  useEffect(() => {
    dispatch(getAllServicesActions())
    // dispatch(getAllCategoriesActions())
    // dispatch(getAllSubCategoriesActions())
    dispatch(getAllOrganizationsActions())
  }, [])

  const dataTableServices = useSelector((state) => state?.services?.services)

  // ** React hook form vars
  const { register, handleSubmit, errors, getValues, control } = useForm({
    resolver: yupResolver(schema),
  })

  // console.log(getValues())

  const getCategoryByIdService = ({value}) => {
    console.log(value)
    setHierarchies({...hierarchies, category: value})
    getIncidentCategoryByIdService(value).then(({data}) => setDataTableCategories(data))
    getIncidentOrganizationByIdService(value).then(({data}) => setDataTableOrganizations(data))
  }

  const getSubCategoryByIdServiceByIdCategory = ({value}) => {
    console.log(value)
    setHierarchies({...hierarchies, subCategory: value})
    getIncidentSubCategoryByIdServiceByIdCategory(hierarchies, value).then(({data}) => setDataTableSubCategories(data))
  }

  const onSubmit = async (data) => {
    console.log(data)
  }

  return (
    <CardGrid cardHeaderTitle="Nuevo Reporte">
      <FormApp handleSubmit={handleSubmit} onSubmit={onSubmit}>
        <Col sm="12">
          <h4 className="mb-1">
            <FileText size={20} className="mr-50" />
            <span className="align-middle">Tipo de incidencia</span>
          </h4>
        </Col>

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Incidente</Label>
            {/* <Controller
              control={control}
              name="Incidente"
              onChange={getCategoryByIdIncident}
              defaultValue={{value: '', label: 'Sin Seleccionar'}}
              render={({ onChange, value, name }) => ( */}
                <Select
                  name="Incidente"
                  theme={selectThemeColors}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={e => getCategoryByIdService(e)}
                  isLoading={!dataTableServices[0]}
                  defaultValue={{value: '', label: 'Sin Seleccionar'}}
                  options={dataTableServices.map((dataMap) => ({
                    value: dataMap.id,
                    label: dataMap.name,
                  }))}
                />
              {/* )}
            /> */}
          </FormGroup>
          <p className="text-danger">{
            errors.Incidente?.message && 'El Incidente es obligatorio'
          }</p>
        </Col>

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Categoría</Label>
            <Select
              name="categoria"
              theme={selectThemeColors}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={e => getSubCategoryByIdServiceByIdCategory(e)}
              isLoading={!dataTableCategories[0]}
              defaultValue={{value: '', label: 'Sin Seleccionar'}}
              options={dataTableCategories.map((dataMap) => ({
                value: dataMap.id,
                label: dataMap.name,
              }))}
            />
          </FormGroup>
          {/* <p className="text-danger">{
            errors.Incidente?.message && 'La Categoría es obligatoria'
          }</p> */}
        </Col>

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Sub-Categorías</Label>
            <Select
              name="subCategoria"
              theme={selectThemeColors}
              className="basic-multi-select"
              classNamePrefix="select"
              isLoading={!dataTableSubCategories[0]}
              defaultValue={{value: '', label: 'Sin Seleccionar'}}
              options={dataTableSubCategories.map((dataMap) => ({
                value: dataMap.id,
                label: dataMap.name,
              }))}
            />
          </FormGroup>
          {/* <p className="text-danger">{
            errors.Incidente?.message && 'La Sub-Categorías es obligatoria'
          }</p> */}
        </Col>

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
