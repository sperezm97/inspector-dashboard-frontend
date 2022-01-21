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

import FileUploader from './FileUploader'

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
import { getAllRegionsActions } from '../../../../redux/actions/territories/regions'
import { getProvinceByIdRegion } from '../../../../services/territories/province'
import { getMunicipalityByIdRegionByIdProvince } from '../../../../services/territories/municipality'
import { getDistrictByIdProvinceByIdMunicipality } from '../../../../services/territories/district'
import { getSectionByIdMunicipalityByIdDistrict } from '../../../../services/territories/section'
import { getNeighborhoodByIdDistrictByIdSection } from '../../../../services/territories/neighborhood'
import { getSubNeighborhoodByIdSectionByIdNeighborhood } from '../../../../services/territories/subNeighborhood'
import { sweetAlert } from '../../../../@core/components/sweetAlert'
import { schemaYup } from './schemaYup'
import { postTicketValidateUser } from '../../../../services/zammad/ticket'
import Url from '../../../../constants/Url'

const ReportCreate = function({history}) {
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

  const [ previewArr, setPreviewArr ] = useState([])
  console.log(previewArr);
  
  const [ infoCedulaState, setInfoCedulaState ] = useState(null)
  
  const defaultValueState = {value: '', label: 'Sin Seleccionar'}

  const [ regionValueState, setRegionValueState ] = useState(defaultValueState)
  const [ provinceValueState, setProvinceValueState ] = useState(defaultValueState)
  const [ municipalityValueState, setMunicipalityValueState ] = useState(defaultValueState)
  const [ districtValueState, setDistrictValueState ] = useState(defaultValueState)
  const [ sectionValueState, setSectionValueState ] = useState(defaultValueState)
  const [ neighborhoodValueState, setNeighborhoodValueState ] = useState(defaultValueState)
  const [ subNeighborhoodValueState, setSubNeighborhoodValueState ] = useState(defaultValueState)

  const [ provinceState, setProvinceState ] = useState([])
  const [ municipalityState, setMunicipalityState ] = useState([])
  const [ districtState, setDistrictState ] = useState([])
  const [ sectionState, setSectionState ] = useState([])
  const [ neighborhoodState, setNeighborhoodState ] = useState([])
  const [ subNeighborhoodState, setSubNeighborhoodState ] = useState([])

  useEffect(() => {
    dispatch(getAllServicesActions())
    dispatch(getAllRegionsActions())
  }, [])

  const servicesSelector = useSelector((state) => state?.services?.services)
  const regionSelector = useSelector((state) => state?.regions?.regions)

  const { register, handleSubmit, errors, setValue, control, getValues } = useForm({
    resolver: yupResolver(schemaYup),
  })
  console.log(getValues());

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
        console.log(err)
        setInfoCedulaState(null)
        sweetAlert({
          title: 'Error!',
          text: 'La Cédula ingresada no es válida',
          type: 'error'
        })
      })
  }

  const handleGetProvinceByIdRegion = (e) => {
    setValue('region', e.value)
    setRegionValueState(e)
    setProvinceValueState(defaultValueState)
    setProvinceState([])
    setMunicipalityValueState(defaultValueState)
    setMunicipalityState([])
    setDistrictValueState(defaultValueState)
    setDistrictState([])
    setSectionValueState(defaultValueState)
    setSectionState([])
    setNeighborhoodValueState(defaultValueState)
    setNeighborhoodState([])
    setSubNeighborhoodValueState(defaultValueState)
    setSubNeighborhoodState([])
    if(!e.value) return
    getProvinceByIdRegion(e.value).then(res => setProvinceState(res.data.data))
  }

  const handleGetMunicipalityByIdProvince = (e) => {
    setValue('provincia', e.value)
    setProvinceValueState(e)
    setMunicipalityValueState(defaultValueState)
    setMunicipalityState([])
    setDistrictValueState(defaultValueState)
    setDistrictState([])
    setSectionValueState(defaultValueState)
    setSectionState([])
    setNeighborhoodValueState(defaultValueState)
    setNeighborhoodState([])
    setSubNeighborhoodValueState(defaultValueState)
    setSubNeighborhoodState([])
    if(!e.value) return
    getMunicipalityByIdRegionByIdProvince(regionValueState.value, e.value).then(res => setMunicipalityState(res.data.data))
  }

  const handleGetDistrictByIdMunicipality = (e) => {
    setValue('municipio', e.value)
    setMunicipalityValueState(e)
    setDistrictValueState(defaultValueState)
    setDistrictState([])
    setSectionValueState(defaultValueState)
    setSectionState([])
    setNeighborhoodValueState(defaultValueState)
    setNeighborhoodState([])
    setSubNeighborhoodValueState(defaultValueState)
    setSubNeighborhoodState([])
    if(!e.value) return
    getDistrictByIdProvinceByIdMunicipality(regionValueState.value, provinceValueState.value, e.value)
    .then(res => setDistrictState(res.data.data))
  }

  const handleGetSectionByIdDistrict = (e) => {
    setValue('distrito', e.value)
    setDistrictValueState(e)
    setSectionValueState(defaultValueState)
    setSectionState([])
    setNeighborhoodValueState(defaultValueState)
    setNeighborhoodState([])
    setSubNeighborhoodValueState(defaultValueState)
    setSubNeighborhoodState([])
    if(!e.value) return
    getSectionByIdMunicipalityByIdDistrict(regionValueState.value, provinceValueState.value, municipalityValueState.value, e.value)
    .then(res => setSectionState(res.data.data))
  }

  const handleGetNeighborhoodByIdSection = (e) => {
    setValue('seccion', e.value)
    setSectionValueState(e)
    setNeighborhoodValueState(defaultValueState)
    setNeighborhoodState([])
    setSubNeighborhoodValueState(defaultValueState)
    setSubNeighborhoodState([])
    if(!e.value) return
    getNeighborhoodByIdDistrictByIdSection(
      regionValueState.value, 
      provinceValueState.value, 
      municipalityValueState.value, 
      districtValueState.value,
      e.value
    ).then(res => setNeighborhoodState(res.data.data))
  }

  const handleGetSubNeighborhoodByIdNeighborhood = (e) => {
    setValue('barrio', e.value)
    setNeighborhoodValueState(e)
    setSubNeighborhoodValueState(defaultValueState)
    setSubNeighborhoodState([])
    if(!e.value) return
    getSubNeighborhoodByIdSectionByIdNeighborhood(
      regionValueState.value,
      provinceValueState.value, 
      municipalityValueState.value, 
      districtValueState.value,
      sectionValueState.value,
      e.value
    ).then(res => setSubNeighborhoodState(res.data.data))
  }

  const onSubmit = async (data) => {
    if(!previewArr[0]){
      return sweetAlert({
        title: 'Aviso',
        text: 'Debes agregar al menos una evidencia.',
        type: 'warning'
      })
    }
    setLoadingPost(true)
    postTicketValidateUser(data, previewArr)
      .then(res => {
        console.log(res)
        sweetAlert({
          title: 'Reporte creado',
          text: 'Reporte creado con éxito.',
          type: 'success'
        })
        setTimeout(() => history.push(Url.dashboardInbox), 3000)
      })
      .catch(err => {
        sweetAlert({
          title: 'Error!',
          text: 'Ocurrió un error al crear el Reporte.',
          type: 'error'
        })
        setLoadingPost(false)
        console.log('error: ', err)
      })
  }

  return (
    <CardGrid cardHeaderTitle="Nuevo Reporte">
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
            <Label>Región</Label>
            <Controller
              control={control}
              name="region"
              render={({field}) => <Select 
                {...field} 
                onChange={e => handleGetProvinceByIdRegion(e)}
                options={optionsCodeValueSelect(regionSelector)}
                isLoading={!regionSelector[0]}
                defaultValue={regionValueState}
                classNamePrefix="select"
                theme={selectThemeColors}
              />}
            />
            <p className="text-danger">{
              errors.region?.message && errors.region?.message
            }</p>
          </FormGroup>
        </Col>

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Provincia</Label>
            <Controller
              control={control}
              name="provincia"
              render={({field}) => <Select 
                {...field} 
                onChange={e => handleGetMunicipalityByIdProvince(e)}
                options={optionsCodeValueSelect(provinceState)}
                isLoading={!provinceState[0]}
                defaultValue={provinceValueState}
                classNamePrefix="select"
                theme={selectThemeColors}
              />}
            />
            <p className="text-danger">{
              errors.provincia?.message && errors.provincia?.message
            }</p>
          </FormGroup>
        </Col>

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Municipio</Label>
            <Controller
              control={control}
              name="municipio"
              render={({field}) => <Select 
                {...field} 
                onChange={e => handleGetDistrictByIdMunicipality(e)}
                options={optionsCodeValueSelect(municipalityState)}
                isLoading={!municipalityState[0]}
                defaultValue={municipalityValueState}
                classNamePrefix="select"
                theme={selectThemeColors}
              />}
            />
            <p className="text-danger">{
              errors.municipio?.message && errors.municipio?.message
            }</p>
          </FormGroup>
        </Col>

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Distrito</Label>
            <Controller
              control={control}
              name="distrito"
              render={({field}) => <Select 
                {...field} 
                onChange={e => handleGetSectionByIdDistrict(e)}
                options={optionsCodeValueSelect(districtState)}
                isLoading={!districtState[0]}
                defaultValue={districtValueState}
                classNamePrefix="select"
                theme={selectThemeColors}
              />}
            />
            <p className="text-danger">{
              errors.distrito?.message && errors.distrito?.message
            }</p>
          </FormGroup>
        </Col>

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Sección</Label>
            <Controller
              control={control}
              name="seccion"
              render={({field}) => <Select 
                {...field} 
                onChange={e => handleGetNeighborhoodByIdSection(e)}
                options={optionsCodeValueSelect(sectionState)}
                isLoading={!sectionState[0]}
                defaultValue={sectionValueState}
                classNamePrefix="select"
                theme={selectThemeColors}
              />}
            />
            <p className="text-danger">{
              errors.seccion?.message && errors.seccion?.message
            }</p>
          </FormGroup>
        </Col>

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Barrio</Label>
            <Controller
              control={control}
              name="barrio"
              render={({field}) => <Select 
                {...field} 
                onChange={e => handleGetSubNeighborhoodByIdNeighborhood(e)}
                options={optionsCodeValueSelect(neighborhoodState)}
                isLoading={!neighborhoodState[0]}
                defaultValue={neighborhoodValueState}
                classNamePrefix="select"
                theme={selectThemeColors}
              />}
            />
            <p className="text-danger">{
              errors.barrio?.message && errors.barrio?.message
            }</p>
          </FormGroup>
        </Col>

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Sub-Barrio</Label>
            <Controller
              control={control}
              name="subBarrio"
              render={({field}) => <Select 
                {...field} 
                onChange={e => setValue('subBarrio', e.value)}
                options={optionsCodeValueSelect(subNeighborhoodState)}
                isLoading={!subNeighborhoodState[0]}
                defaultValue={subNeighborhoodValueState}
                classNamePrefix="select"
                theme={selectThemeColors}
              />}
            />
            <p className="text-danger">{
              errors.subBarrio?.message && errors.subBarrio?.message
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

        <Col sm="12">
          <h4 className="mb-1 mt-2">
            <Image size={20} className="mr-50" />
            <span className="align-middle">Evidencias</span>
          </h4>
        </Col>
        
        <Col sm="12">
          <FileUploader 
            previewArr={previewArr}
            setPreviewArr={setPreviewArr}
          />
        </Col>

        <Col sm="12">
          <FormGroup>
            <Label for="descripcion">Descripción</Label>
            <Input
              type="text"
              id="descripcion"
              name="descripcion"
              innerRef={register()}
              placeholder="Digite información relevante para el reporte"
            />
            <p className="text-danger">{
              errors.descripcion?.message && errors.descripcion?.message
            }</p>
          </FormGroup>
        </Col>
      </FormApp>
    </CardGrid>
  )
}
export default ReportCreate
