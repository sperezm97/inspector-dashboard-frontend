// ** React Imports
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
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
  const [ dataTableCategories, setDataTableCategories ] = useState([])
  const [ dataTableSubCategories, setDataTableSubCategories ] = useState([])
  const [ dataTableOrganizations, setDataTableOrganizations ] = useState([])
  
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

  // ** React hook form vars
  const { register, handleSubmit, errors, getValues, control } = useForm({
    resolver: yupResolver(schema),
  })

  // console.log(getValues())

  const getCategoryByIdService = ({value}) => {
    setHierarchies({...hierarchies, category: value})
    getIncidentCategoryByIdService(value).then(({data}) => setDataTableCategories(data))
    getIncidentOrganizationByIdService(value).then(({data}) => setDataTableOrganizations(data))
  }

  const getSubCategoryByIdServiceByIdCategory = ({value}) => {
    setHierarchies({...hierarchies, subCategory: value})
    getIncidentSubCategoryByIdServiceByIdCategory(hierarchies, value).then(({data}) => setDataTableSubCategories(data))
  }

  const handleDataCedula = ({target}) => {
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
                  classNamePrefix="select"
                  onChange={e => getCategoryByIdService(e)}
                  isLoading={!servicesSelector[0]}
                  defaultValue={defaultValueState}
                  options={optionsIdValueSelect(servicesSelector)}
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
              classNamePrefix="select"
              onChange={e => getSubCategoryByIdServiceByIdCategory(e)}
              isLoading={!dataTableCategories[0]}
              defaultValue={defaultValueState}
              options={optionsIdValueSelect(dataTableCategories)}
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
              classNamePrefix="select"
              isLoading={!dataTableSubCategories[0]}
              defaultValue={defaultValueState}
              options={optionsIdValueSelect(dataTableSubCategories)}
            />
          </FormGroup>
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

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Cédula de Identidad</Label>
            {/* <Input
              type="number"
              name="cedula"
              placeholder="Escribe la Cédula"
              onBlur={e => handleDataCedula(e)}
            /> */}
            <Cleave
              className="form-control"
              placeholder="Escribe la Cédula"
              onBlur={e => handleDataCedula(e)}
              options={{ blocks: [11], numericOnly: true }}
            />
          </FormGroup>
        </Col>


        <InputApp
          label="Nombre Completo"
          name="name"
          register={register}
          placeholder="Nombre..."
          disabled
          defaultValue={infoCedulaState && `${infoCedulaState.names} ${infoCedulaState.firstSurname} ${infoCedulaState.secondSurname}`}
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

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Región</Label>
            <Select
              name="region"
              theme={selectThemeColors}
              classNamePrefix="select"
              onChange={e => handleGetProvinceByIdRegion(e)}
              isLoading={!regionSelector[0]}
              defaultValue={regionValueState}
              options={optionsCodeValueSelect(regionSelector)}
            />
          </FormGroup>
        </Col>

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Provincia</Label>
            <Select
              name="provincia"
              theme={selectThemeColors}
              classNamePrefix="select"
              onChange={e => handleGetMunicipalityByIdProvince(e)}
              isLoading={!provinceState[0]}
              value={provinceValueState}
              options={optionsCodeValueSelect(provinceState)}
            />
          </FormGroup>
        </Col>

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Municipio</Label>
            <Select
              name="municipio"
              theme={selectThemeColors}
              classNamePrefix="select"
              onChange={e => handleGetDistrictByIdMunicipality(e)}
              isLoading={!municipalityState[0]}
              value={municipalityValueState}
              options={optionsCodeValueSelect(municipalityState)}
            />
          </FormGroup>
        </Col>

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Distrito</Label>
            <Select
              name="distrito"
              theme={selectThemeColors}
              classNamePrefix="select"
              onChange={e => handleGetSectionByIdDistrict(e)}
              isLoading={!districtState[0]}
              value={districtValueState}
              options={optionsCodeValueSelect(districtState)}
            />
          </FormGroup>
        </Col>

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Sección</Label>
            <Select
              name="seccion"
              theme={selectThemeColors}
              classNamePrefix="select"
              onChange={e => handleGetNeighborhoodByIdSection(e)}
              isLoading={!sectionState[0]}
              value={sectionValueState}
              options={optionsCodeValueSelect(sectionState)}
            />
          </FormGroup>
        </Col>

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Barrio</Label>
            <Select
              name="barrio"
              theme={selectThemeColors}
              classNamePrefix="select"
              onChange={e => handleGetSubNeighborhoodByIdNeighborhood(e)}
              isLoading={!neighborhoodState[0]}
              value={neighborhoodValueState}
              options={optionsCodeValueSelect(neighborhoodState)}
            />
          </FormGroup>
        </Col>

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Sub-Barrio</Label>
            <Select
              name="subBarrio"
              theme={selectThemeColors}
              classNamePrefix="select"
              onChange={e => setSubNeighborhoodValueState(e)}
              isLoading={!subNeighborhoodState[0]}
              value={subNeighborhoodValueState}
              options={optionsCodeValueSelect(subNeighborhoodState)}
            />
          </FormGroup>
        </Col>

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
