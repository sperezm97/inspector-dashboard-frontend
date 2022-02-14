// ** React Imports
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Cleave from 'cleave.js/react'

// ** Third Party Components
import { User, MapPin } from 'react-feather'
import 'cleave.js/dist/addons/cleave-phone.us'
import { Col, FormGroup, Label } from 'reactstrap'

import CardGrid from '../../../../@core/components/card-grid'
import FormApp from '../../../../@core/components/form'
import InputApp from '../../../../@core/components/input'

import { getUserById, postUser } from '../../../../services/zammad/user'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { getAllOrganizationsActions } from '../../../../redux/actions/zammad/organizations'
import { getAllRolsActions } from '../../../../redux/actions/zammad/rols'
import { getAllRegionsActions } from '../../../../redux/actions/territories/regions'
import {
  addAllGroupsToUser,
  optionsCodeValueSelect,
  optionsZammadIdValueSelect,
  selectThemeColors,
} from '../../../../utility/Utils'
import { getProvinceByIdRegion } from '../../../../services/territories/province'
import { getMunicipalityByIdRegionByIdProvince } from '../../../../services/territories/municipality'
import { getDistrictByIdProvinceByIdMunicipality } from '../../../../services/territories/district'
import { getInfoCedula } from '../../../../services/cedula'
import { sweetAlert, sweetAlertError } from '../../../../@core/components/sweetAlert'
import { schemaYup } from './schemaYup'
import Url from '../../../../constants/Url'
import { getGroups } from '../../../../services/zammad/group'
import ComponentSpinner from '../../../../@core/components/spinner/Loading-spinner'

const UserCreate = function({history, match}) {

  const idParams = match.params.id

  const dispatch = useDispatch()

  const [loadingCreate, setLoadingCreate] = useState(false)

  const [ infoCedulaState, setInfoCedulaState ] = useState(null)
  const [ infoCedulaState2, setInfoCedulaState2 ] = useState(null)
  const [ dataInfoUser, setDataInfoUser ] = useState([])
  
  const [ groupsState, setGroupsState ] = useState([])

  const defaultValueState = {value: '', label: 'Sin Seleccionar'}

  const [ institutionValueState, setInstitutionValueState ] = useState(defaultValueState)
  const [ permisosValueState, setPermisosValueState ] = useState(null)

  const [ regionValueState, setRegionValueState ] = useState(defaultValueState)
  const [ provinceValueState, setProvinceValueState ] = useState(defaultValueState)
  const [ municipalityValueState, setMunicipalityValueState ] = useState(defaultValueState)
  const [ districtValueState, setDistrictValueState ] = useState(defaultValueState)

  const [ regionState, setRegionState ] = useState([])
  const [ provinceState, setProvinceState ] = useState([])
  const [ municipalityState, setMunicipalityState ] = useState([])
  const [ districtState, setDistrictState ] = useState([])

  useEffect(() => {
    dispatch(getAllOrganizationsActions())
    dispatch(getAllRolsActions())
    dispatch(getAllRegionsActions())

    getUserById(idParams)
      .then((res) => setDataInfoUser(res.data))
      .catch((err) => sweetAlertError())
      
    getGroups()
      .then((res) => setGroupsState(res.data))
      .catch((err) => console.log(err))
  }, [])

  const dataTableOrganizations = useSelector(
    (state) => state?.organizations?.organizations
  )
  const rolSelector = useSelector((state) => state?.rols?.rols)
  const regionSelector = useSelector((state) => state?.regions?.regions)

  useEffect(() => {
    if(dataTableOrganizations[0] && Object.keys(dataInfoUser)[0]){
      filterSelectInstitution(dataInfoUser.organization_id)
    }
    if(Object.keys(dataInfoUser)[0]){
      setValue('permisos', dataInfoUser.role_ids.map((data) => data))
      setValue('phone', dataInfoUser?.phone)
      setValue('region', dataInfoUser?.zone.substr(0, 2))
      setValue('provincia', dataInfoUser?.zone.substr(2, 2))
      setValue('municipio', dataInfoUser?.zone.substr(4, 2))
      setValue('distrito', dataInfoUser?.zone.substr(6, 2))
      filterSelectsTerritories()
      setInfoCedulaState2(`${dataInfoUser?.firstname} ${dataInfoUser?.lastname}`)
      setPermisosValueState(dataInfoUser.roles.map((data, index) => {
        return {value: dataInfoUser.role_ids[index], label: data}
      }))
    }
  }, [dataTableOrganizations, dataInfoUser])

  useEffect(() => {
    if(regionSelector[0] && Object.keys(dataInfoUser)[0]){
      const regionZone = regionSelector.find(data => data.code === dataInfoUser?.zone.substr(0, 2))
      setRegionValueState({value: regionZone?.code, label: regionZone?.name})      
    }

    if(provinceState[0]){
      setProvinceValueState({value: provinceState[0].code, label: provinceState[0].name})      
    }

    if(municipalityState[0]){
      setMunicipalityValueState({value: municipalityState[0].code, label: municipalityState[0].name})      
    }

    if(districtState[0]){
      setDistrictValueState({value: districtState[0].code, label: districtState[0].name})      
    }
  },[dataInfoUser, regionSelector])

  const filterSelectsTerritories = () => {
    getProvinceByIdRegion(dataInfoUser?.zone.substr(0, 2))
      .then(res => {
        setProvinceState(res.data.data.filter(data => data.code === dataInfoUser?.zone.substr(2, 2)))
        getMunicipalityByIdRegionByIdProvince(dataInfoUser?.zone.substr(0, 2), dataInfoUser?.zone.substr(2, 2))
          .then(res => {
            setMunicipalityState(res.data.data.filter(data => data.code === dataInfoUser?.zone.substr(4, 2)))
            getDistrictByIdProvinceByIdMunicipality(dataInfoUser?.zone.substr(0, 2), dataInfoUser?.zone.substr(2, 2), dataInfoUser?.zone.substr(4, 2))
              .then(res => {
                setDistrictState(res.data.data.filter(data => data.code === dataInfoUser?.zone.substr(6, 2)))
              })
          })
      })
  }

  const filterSelectInstitution = (id) => {
    if(!id) return
    const optionFiltered = dataTableOrganizations.find(option => option.id === id)
    setInstitutionValueState({value: optionFiltered.id, label: `${optionFiltered.name}`})
    setValue('institucion', id)
  }
  
  const { register, handleSubmit, errors, control, setValue, getValues } = useForm({
    resolver: yupResolver(schemaYup),
  })
  console.log(getValues())

  const handleDataCedula = ({target}) => {
    setInfoCedulaState(null)
    if(target.value.length !== 11) return
    getInfoCedula(target.value)
      .then(({data}) => {
        setInfoCedulaState2(`${data.payload.names} ${data.payload.firstSurname} ${data.payload.secondSurname}`)
        setInfoCedulaState(data.payload)
      })
      .catch(err => {
        console.log(err)
        setInfoCedulaState(null)
        setInfoCedulaState2(null)
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
    if(!e.value) return
    getMunicipalityByIdRegionByIdProvince(regionValueState.value, e.value).then(res => setMunicipalityState(res.data.data))
  }

  const handleGetDistrictByIdMunicipality = (e) => {
    setValue('municipio', e.value)
    setMunicipalityValueState(e)
    setDistrictValueState(defaultValueState)
    setDistrictState([])
    if(!e.value) return
    getDistrictByIdProvinceByIdMunicipality(regionValueState.value, provinceValueState.value, e.value)
    .then(res => setDistrictState(res.data.data))
  }

  const onSubmit = async (data) => {

    let objZammad = {
      email: data.email,
      login: data.email,
      phone: data.phone,
      organization: parseInt(data.institucion),
      role_ids: data.permisos.map((data) => data),
      zone: data.region + data.provincia + data.municipio + data.distrito,
      group_ids: addAllGroupsToUser(groupsState)
    }

    if(data.cPassword){
      objZammad = {...objZammad, password: data.cPassword}
    }

    return console.log('objZammad', objZammad)
    
    setLoadingCreate(true)
    postUser(objZammad)
      .then((res) => {
        history.push(Url.user)
        console.log(res)
      })
      .catch(() => {
        setLoadingCreate(false)
        sweetAlert({
          title: 'Error!',
          text: 'Ocurrió un error al crear el usuario.',
          type: 'error'
        })
      })
  }

  return Object.keys(dataInfoUser)[0] ? (
    <CardGrid cardHeaderTitle="Editar Usuario">
      <FormApp
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        loading={loadingCreate}
        edit
      >
        <Col sm="12">
          <h4 className="mb-1">
            <User size={20} className="mr-50" />
            <span className="align-middle">Información Personal</span>
          </h4>
        </Col>

        {/* <Col lg="4" md="6" sm="12">
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
                value={dataInfoUser?.cedula}
                onBlur={e => handleDataCedula(e)}
                options={{ blocks: [11], numericOnly: true }}
              />}
            />
            <p className="text-danger">{
              errors.cedula?.message && errors.cedula?.message
            }</p>
          </FormGroup>
        </Col> */}

        <InputApp
          label="Nombre Completo"
          name="nombreC"
          register={register}
          placeholder="Digita la cédula..."
          disabled
          defaultValue={infoCedulaState2}
          messageError={errors.cedula?.message}
        />

        <InputApp
          type="email"
          label="Correo Electrónico"
          name="email"
          register={register}
          placeholder="Escribe el Correo Electrónico"
          messageError={
            errors.email?.message && errors.email?.message
          }
          defaultValue={dataInfoUser?.email}
        />

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Teléfono</Label>
            <Controller
              control={control}
              name="phone"
              render={({field}) => <Cleave
                {...field}
                className="form-control"
                placeholder="Escribe el Teléfono"
                onChange={e => setValue("phone", e.target.value)}
                value={dataInfoUser?.phone}
                options={{ blocks: [10], numericOnly: true }}
              />}
            />
            <p className="text-danger">{
              errors.phone?.message && errors.phone?.message
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
                onChange={e => filterSelectInstitution(e.value)}
                options={optionsZammadIdValueSelect(dataTableOrganizations)}
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

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Permisos</Label>
            <Controller
              control={control}
              name="permisos"
              render={({ name }) => (
                <Select
                  isMulti
                  name={name}
                  theme={selectThemeColors}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={e => setPermisosValueState(e)}
                  value={permisosValueState}
                  options={rolSelector.map((dataMap) => ({
                    value: dataMap.id,
                    label: dataMap.name,
                  }))}
                  isLoading={!rolSelector[0]}
                  placeholder={defaultValueState.label}
                />
              )}
            />
            <p className="text-danger">{
              errors.permisos?.message && errors.permisos?.message
            }</p>
          </FormGroup>
        </Col>

        <InputApp
          type="password"
          label="Contraseña"
          name="password"
          register={register}
          placeholder="Escribe la Contraseña"
          messageError={
            errors.password?.message && errors.password?.message
          }
        />

        <InputApp
          type="password"
          label="Confirmar Contraseña"
          name="cPassword"
          register={register}
          placeholder="Escribe la Contraseña"
          messageError={
            errors.cPassword?.message && errors.cPassword?.message
          }
        />

        <Col sm="12">
          <h4 className="mb-1 mt-2">
            <MapPin size={20} className="mr-50" />
            <span className="align-middle">Detalles de Zona</span>
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
                value={regionValueState}
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
            <Label>Municipio</Label>
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
            <Label>Distrito</Label>
            <Controller
              control={control}
              name="distrito"
              render={({field}) => <Select 
                {...field} 
                onChange={e => setValue('distrito', e.value)}
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

      </FormApp>
    </CardGrid>
  ) : <ComponentSpinner />
}
export default UserCreate
