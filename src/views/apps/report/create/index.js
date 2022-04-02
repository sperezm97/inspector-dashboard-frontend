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
import { postTicketArrTags } from '../../../../services/zammad/ticketTags'
import Url from '../../../../constants/Url'
import { getOrganizations } from '../../../../services/zammad/organization'
import { getGroups, postGroup } from '../../../../services/zammad/group'
import { RequiredInput } from '../../../../@core/components/requiredInput'

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
  console.log('dataTableOrganizations', dataTableOrganizations)

  const [ previewArr, setPreviewArr ] = useState([])
  
  const [ infoCedulaState, setInfoCedulaState ] = useState(null)
  
  const [ dataOrganizationState, setDataOrganizationState ] = useState([])
  console.log('dataOrganizationState', dataOrganizationState)
  const [ dataGroupState, setDataGroupState ] = useState([])
  console.log('dataGroupState', dataGroupState)
  
  const defaultValueState = {value: '', label: 'Sin Seleccionar'}

  const [incidentValueState, setIncidentValueState] = useState(defaultValueState)
  const [categoryValueState, setCategoryValueState] = useState(defaultValueState)
  const [subCategoryValueState, setSubCategoryValueState] = useState(defaultValueState)
  const [institutionValueState, setInstitutionValueState] = useState(defaultValueState)
  
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

    getOrganizations()
      .then(res => setDataOrganizationState(res.data))
      .catch(err => console.log(err))

    getGroups()
      .then(res => setDataGroupState(res.data))
      .catch(err => console.log(err))
  }, [])

  const servicesSelector = useSelector((state) => state?.services?.services)
  const regionSelector = useSelector((state) => state?.regions?.regions)

  const { register, handleSubmit, errors, setValue, control, getValues } = useForm({
    resolver: yupResolver(schemaYup),
  })

  console.log(getValues())

  const getCategoryByIdService = (e) => {
    setValue("incidente", e)
    setValue("categoria", "")
    setValue("subCategoria", "")
    setValue("institucion", "")
    setHierarchies({...hierarchies, category: e.value})
    setIncidentValueState(e)
    setCategoryValueState(defaultValueState)
    setSubCategoryValueState(defaultValueState)
    setInstitutionValueState(defaultValueState)
    setDataTableCategories([])
    setDataTableSubCategories([])
    setDataTableOrganizations([])
    if(!e.value) return
    getIncidentCategoryByIdService(e.value).then(({data}) => setDataTableCategories(data))
    getIncidentOrganizationByIdService(e.value).then(({data}) => setDataTableOrganizations(data))
  }

  const getSubCategoryByIdServiceByIdCategory = (e) => {
    setValue("categoria", e)
    setValue("subCategoria", "")
    setCategoryValueState(e)
    setSubCategoryValueState(defaultValueState)
    setDataTableSubCategories([])
    if(!e.value) return
    setHierarchies({...hierarchies, subCategory: e.value})
    getIncidentSubCategoryByIdServiceByIdCategory(hierarchies, e.value).then(({data}) => setDataTableSubCategories(data))
  }

  const handleSubCategory = (e) => {
    setValue("subCategoria", e)
    setSubCategoryValueState(e)
  }

  const handleSetInstitution = (e) => {
    setInstitutionValueState(e)
    const findInstitution = dataTableOrganizations.find(data => data.id === e.value)
    console.log('findInstitution', findInstitution)
    if(!findInstitution) return
    const findedGroup = dataGroupState.find(data => data.acronimo.toUpperCase() === findInstitution.acronym.toUpperCase())
    const findedOrganization = dataOrganizationState.find(data => data.acronimo.toUpperCase() === findInstitution.acronym.toUpperCase())
    console.log('findedGroup', findedGroup)
    console.log('findedOrganization', findedOrganization)
    if(Object.keys(findedGroup)[0]){
      setValue("institucion", findedGroup.id)
    }else {
      postGroup({name: findInstitution.name, acronimo: findInstitution.acronym.toUpperCase()})
        .then(res => setValue("institucion", res.data.id))
        .catch(err => console.log(err))
    }if(!Object.keys(findedOrganization)[0]){
      postGroup({name: findInstitution.name, acronimo: findInstitution.acronym.toUpperCase()})
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
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

  const handleGetProvinceByIdRegion = (e) => {
    setValue('region', e.value)
    setValue('provincia', "")
    setValue('municipio', "")
    setValue('distrito', "")
    setValue('seccion', "")
    setValue('barrio', "")
    setValue('subBarrio', "")
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
    setValue('municipio', "")
    setValue('distrito', "")
    setValue('seccion', "")
    setValue('barrio', "")
    setValue('subBarrio', "")
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
    setValue('distrito', "")
    setValue('seccion', "")
    setValue('barrio', "")
    setValue('subBarrio', "")
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
    setValue('seccion', "")
    setValue('barrio', "")
    setValue('subBarrio', "")
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
    setValue('barrio', "")
    setValue('subBarrio', "")
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
    setValue('barrio', e)
    setValue('subBarrio', "")
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

  const handleSubNeighborhood = (e) => {
    setValue('subBarrio', e)
    setSubNeighborhoodValueState(e)
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

    const ticketAsync = await postTicketValidateUser(data, infoCedulaState, previewArr)
    console.log('ticketAsync', ticketAsync)
    if(ticketAsync.status === 201){
      
      postTicketArrTags(ticketAsync?.data?.id, [data.incidente.label, data.categoria.label, data.subCategoria.label])
        .then(res => console.log('res tags: ', res))
        .catch(err => console.log('err tags: ', err))

      sweetAlert({
        title: 'Ticket creado',
        text: 'Ticket creado con éxito.',
        type: 'success'
      })
      history.push(Url.dashboardInbox)  

    }else{
      sweetAlert({
        title: 'Error!',
        text: 'Ocurrió un error al crear el Ticket.',
        type: 'error'
      })
      setLoadingPost(false)
    }
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
            <Label>Incidente<RequiredInput /></Label>
              <Controller
                control={control}
                name="incidente"
                render={({field}) => <Select 
                  {...field}
                  onChange={e => getCategoryByIdService(e)}
                  options={optionsIdValueSelect(servicesSelector)}
                  isLoading={!servicesSelector[0]}
                  defaultValue={incidentValueState}
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
            <Label>Categoría<RequiredInput /></Label>
              <Controller
                control={control}
                name="categoria"
                render={({field}) => <Select 
                  {...field} 
                  onChange={e => getSubCategoryByIdServiceByIdCategory(e)}
                  options={optionsIdValueSelect(dataTableCategories)}
                  isLoading={!dataTableCategories[0]}
                  value={categoryValueState}
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
            <Label>Sub-Categorías<RequiredInput /></Label>
              <Controller
                control={control}
                name="subCategoria"
                render={({field}) => <Select 
                  {...field} 
                  onChange={e => handleSubCategory(e)}
                  options={optionsIdValueSelect(dataTableSubCategories)}
                  isLoading={!dataTableSubCategories[0]}
                  value={subCategoryValueState}
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
            <Label>Institución<RequiredInput /></Label>
              <Controller
                control={control}
                name="institucion"
                render={({field}) => <Select 
                  {...field} 
                  onChange={e => handleSetInstitution(e)}
                  options={optionsIdValueSelect(dataTableOrganizations)}
                  isLoading={!dataTableOrganizations[0]}
                  value={institutionValueState}
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
            <Label>Cédula de Identidad<RequiredInput /></Label>
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
          required
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
            <Label>Teléfono<RequiredInput /></Label>
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
            <Label>Región<RequiredInput /></Label>
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
            <Label>Provincia<RequiredInput /></Label>
            <Controller
              control={control}
              name="provincia"
              render={({field}) => <Select 
                {...field} 
                onChange={e => handleGetMunicipalityByIdProvince(e)}
                options={optionsCodeValueSelect(provinceState)}
                isLoading={!provinceState[0]}
                value={provinceValueState}
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
            <Label>Municipio<RequiredInput /></Label>
            <Controller
              control={control}
              name="municipio"
              render={({field}) => <Select 
                {...field} 
                onChange={e => handleGetDistrictByIdMunicipality(e)}
                options={optionsCodeValueSelect(municipalityState)}
                isLoading={!municipalityState[0]}
                value={municipalityValueState}
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
            <Label>Distrito<RequiredInput /></Label>
            <Controller
              control={control}
              name="distrito"
              render={({field}) => <Select 
                {...field} 
                onChange={e => handleGetSectionByIdDistrict(e)}
                options={optionsCodeValueSelect(districtState)}
                isLoading={!districtState[0]}
                value={districtValueState}
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
            <Label>Sección<RequiredInput /></Label>
            <Controller
              control={control}
              name="seccion"
              render={({field}) => <Select 
                {...field} 
                onChange={e => handleGetNeighborhoodByIdSection(e)}
                options={optionsCodeValueSelect(sectionState)}
                isLoading={!sectionState[0]}
                value={sectionValueState}
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
            <Label>Barrio<RequiredInput /></Label>
            <Controller
              control={control}
              name="barrio"
              render={({field}) => <Select 
                {...field} 
                onChange={e => handleGetSubNeighborhoodByIdNeighborhood(e)}
                options={optionsCodeValueSelect(neighborhoodState)}
                isLoading={!neighborhoodState[0]}
                value={neighborhoodValueState}
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
                onChange={e => handleSubNeighborhood(e)}
                options={optionsCodeValueSelect(subNeighborhoodState)}
                isLoading={!subNeighborhoodState[0]}
                value={subNeighborhoodValueState}
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
          required
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
            <Label for="descripcion">Descripción<RequiredInput /></Label>
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
