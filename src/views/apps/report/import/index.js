// ** React Imports
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Cleave from 'cleave.js/react'

// ** Third Party Components
import { User, MapPin, FileText, Image } from 'react-feather'
import 'cleave.js/dist/addons/cleave-phone.us'
import Select from 'react-select'
import { Row, Col, Button, Label, FormGroup, Input, Form } from 'reactstrap'
import { optionsCodeValueSelect, optionsIdValueSelect, selectThemeColors } from '../../../../utility/Utils'

import CardGrid from '../../../../@core/components/card-grid'
import FormApp from '../../../../@core/components/form'
import InputApp from '../../../../@core/components/input'

// ** Styles
import 'uppy/dist/uppy.css'
import '@uppy/status-bar/dist/style.css'
import '@styles/react/libs/file-uploader/file-uploader.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'

import { getAllServicesActions } from '../../../../redux/actions/incidents/services'
import { getIncidentCategoryByIdService } from '../../../../services/incidents/category'
import { getIncidentSubCategoryByIdServiceByIdCategory } from '../../../../services/incidents/subCategory'
import { getIncidentOrganizationByIdService } from '../../../../services/incidents/organization'
import { getInfoCedula } from '../../../../services/cedula'
import { sweetAlert } from '../../../../@core/components/sweetAlert'
import { schemaYup } from './schemaYup'
import { postTicketValidateUser } from '../../../../services/zammad/ticket'
import Url from '../../../../constants/Url'

const ReportImport = function({history}) {
  const dispatch = useDispatch()
  
  const [ loadingPost, setLoadingPost ] = useState(false)

  const initialHierarchies = {
    category: null,
    subCategory: null,
  }

  const [hierarchies, setHierarchies] = useState(initialHierarchies)
  const [ dataTableCategories, setDataTableCategories ] = useState([])
  const [ dataTableSubCategories, setDataTableSubCategories ] = useState([])
  const [ dataTableOrganizations, setDataTableOrganizations ] = useState([])

  const [ infoCedulaState, setInfoCedulaState ] = useState(null)
  
  const defaultValueState = {value: '', label: 'Sin Seleccionar'}

  useEffect(() => {
    dispatch(getAllServicesActions())
  }, [])

  const servicesSelector = useSelector((state) => state?.services?.services)

  const { register, handleSubmit, errors, setValue, control } = useForm({
    resolver: yupResolver(schemaYup),
  })

  const getCategoryByIdService = ({value}) => {
    setValue("incidente", value)
    setHierarchies({...hierarchies, category: value})
    setDataTableCategories([])
    setDataTableSubCategories([])
    setDataTableOrganizations([])
    if(!value) return
    getIncidentCategoryByIdService(value).then(({data}) => setDataTableCategories(data))
    getIncidentOrganizationByIdService(value).then(({data}) => setDataTableOrganizations(data))
  }

  const getSubCategoryByIdServiceByIdCategory = ({value}) => {
    setValue("categoria", value)
    setDataTableSubCategories([])
    if(!value) return
    setHierarchies({...hierarchies, subCategory: value})
    getIncidentSubCategoryByIdServiceByIdCategory(hierarchies, value).then(({data}) => setDataTableSubCategories(data))
  }

  const handleDataCedula = ({target}) => {
    setInfoCedulaState(null)
    if(target.value.length !== 11) return
    getInfoCedula(target.value)
      .then(({data}) => setInfoCedulaState(data.payload))
      .catch(err => {
        setInfoCedulaState(null)
        sweetAlert({
          title: 'Error!',
          text: 'La Cédula ingresada no es válida',
          type: 'error'
        })
      })
  }

  const onSubmit = async (data) => {
    setLoadingPost(true)

    const ticketAsync = await postTicketValidateUser(data)
    if(ticketAsync.status === 201){
      sweetAlert({
        title: 'Reporte creado',
        text: 'Reporte creado con éxito.',
        type: 'success'
      })
      history.push(Url.dashboardInbox)  

    }else{
      sweetAlert({
        title: 'Error!',
        text: 'Ocurrió un error al crear el Reporte.',
        type: 'error'
      })
      setLoadingPost(false)
    }
  }

  return (
    <CardGrid cardHeaderTitle="Importar Reporte">
      <FormApp handleSubmit={handleSubmit} onSubmit={onSubmit} loading={loadingPost}>
        <Col sm="12">
          <h4 className="mb-1">
            <FileText size={20} className="mr-50" />
            <span className="align-middle">Tipo de incidencia</span>
          </h4>
        </Col>

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Incidente</Label>
              <Controller
                control={control}
                name="incidente"
                render={({field}) => <Select 
                  {...field} 
                  onChange={e => getCategoryByIdService(e)}
                  options={optionsIdValueSelect(servicesSelector)}
                  isLoading={!servicesSelector[0]}
                  defaultValue={defaultValueState}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                />}
              />
            <p className="text-danger">{
              errors.incidente?.message && errors.incidente?.message
            }</p>
          </FormGroup>
        </Col>

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Categoría</Label>
              <Controller
                control={control}
                name="categoria"
                render={({field}) => <Select 
                  {...field} 
                  onChange={e => getSubCategoryByIdServiceByIdCategory(e)}
                  options={optionsIdValueSelect(dataTableCategories)}
                  isLoading={!dataTableCategories[0]}
                  defaultValue={defaultValueState}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                />}
              />
            <p className="text-danger">{
              errors.categoria?.message && errors.categoria?.message
            }</p>
          </FormGroup>
        </Col>

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Sub-Categorías</Label>
              <Controller
                control={control}
                name="subCategoria"
                render={({field}) => <Select 
                  {...field} 
                  onChange={e => setValue("subCategoria", e)}
                  options={optionsIdValueSelect(dataTableSubCategories)}
                  isLoading={!dataTableSubCategories[0]}
                  defaultValue={defaultValueState}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                />}
              />
            <p className="text-danger">{
              errors.subCategoria?.message && errors.subCategoria?.message
            }</p>
          </FormGroup>
        </Col>

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Institución</Label>
              <Controller
                control={control}
                name="institucion"
                render={({field}) => <Select 
                  {...field} 
                  onChange={e => setValue("institucion", e.value)}
                  options={optionsIdValueSelect(dataTableOrganizations)}
                  isLoading={!dataTableOrganizations[0]}
                  defaultValue={defaultValueState}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                />}
              />
            <p className="text-danger">{
              errors.institucion?.message && errors.institucion?.message
            }</p>
          </FormGroup>
        </Col>

        <Col sm="12">
          <h4 className="mb-1 mt-2">
            <User size={20} className="mr-50" />
            <span className="align-middle">Detalles del beneficiario</span>
          </h4>
        </Col>

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Cédula de Identidad</Label>
            <Controller
              control={control}
              name="cedula"
              render={({field}) => <Cleave
                {...field}
                className="form-control"
                placeholder="Escribe la Cédula"
                onChange={e => setValue("cedula", e.target.value)}
                onBlur={e => handleDataCedula(e)}
                options={{ blocks: [11], numericOnly: true }}
              />}
            />
            <p className="text-danger">{
              errors.cedula?.message && errors.cedula?.message
            }</p>
          </FormGroup>
        </Col>

        <InputApp
          label="Nombre Completo"
          name="nombreC"
          register={register}
          placeholder="Digita la cédula..."
          disabled
          defaultValue={infoCedulaState && `${infoCedulaState.names} ${infoCedulaState.firstSurname} ${infoCedulaState.secondSurname}`}
          messageError={errors.cedula?.message && errors.cedula?.message}
        />

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Teléfono</Label>
            <Controller
              control={control}
              name="telefono"
              render={({field}) => <Cleave
                {...field}
                className="form-control"
                placeholder="Escribe el Teléfono"
                onChange={e => setValue("telefono", e.target.value)}
                options={{ blocks: [10], numericOnly: true }}
              />}
            />
            <p className="text-danger">{
              errors.telefono?.message && errors.telefono?.message
            }</p>
          </FormGroup>
        </Col>

        <Col sm="12">
          <h4 className="mb-1 mt-2">
            <MapPin size={20} className="mr-50" />
            <span className="align-middle">Detalles del reporte</span>
          </h4>
        </Col>

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Zona ID</Label>
            <Controller
              control={control}
              name="zonaId"
              render={({field}) => <Cleave
                {...field}
                className="form-control"
                placeholder="Escribe la Zona ID"
                onChange={e => setValue("zonaId", e.target.value)}
                options={{ numericOnly: true }}
              />}
            />
            <p className="text-danger">{
              errors.zonaId?.message && errors.zonaId?.message
            }</p>
          </FormGroup>
        </Col>

        <InputApp
          label="Residencial, calle, número"
          name="direccion"
          type="text"
          register={register}
          placeholder="Escribe la dirección..."
          messageError={errors.direccion?.message && errors.direccion?.message}
        />

        <InputApp
          label="Descripción"
          name="descripcion"
          type="text"
          register={register}
          placeholder="Digite información relevante para el reporte"
          messageError={errors.descripcion?.message && errors.descripcion?.message}
        />

      </FormApp>
    </CardGrid>
  )
}
export default ReportImport
