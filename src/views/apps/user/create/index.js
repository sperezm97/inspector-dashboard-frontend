// ** React Imports
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Cleave from 'cleave.js/react'

// ** Third Party Components
import { User, MapPin, Lock } from 'react-feather'
import 'cleave.js/dist/addons/cleave-phone.us'
import { Col, FormGroup, Label } from 'reactstrap'

import CardGrid from '../../../../@core/components/card-grid'
import FormApp from '../../../../@core/components/form'
import InputApp from '../../../../@core/components/input'

import { postUser } from '../../../../services/zammad/user'

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
import { sweetAlert, sweetAlertGood } from '../../../../@core/components/sweetAlert'
import { schemaYup } from './schemaYup'
import Url from '../../../../constants/Url'
import { getGroups } from '../../../../services/zammad/group'
import { RequiredInput } from '../../../../@core/components/requiredInput'

const UserCreate = function({history}) {
  const dispatch = useDispatch()

  const [loadingCreate, setLoadingCreate] = useState(false)

  const [ infoCedulaState, setInfoCedulaState ] = useState(null)
  
  const [ groupsState, setGroupsState ] = useState([])

  const defaultValueState = {value: '', label: 'Sin Seleccionar'}

  const [ regionValueState, setRegionValueState ] = useState(defaultValueState)
  const [ provinceValueState, setProvinceValueState ] = useState(defaultValueState)
  const [ municipalityValueState, setMunicipalityValueState ] = useState(defaultValueState)
  const [ districtValueState, setDistrictValueState ] = useState(defaultValueState)

  const [ provinceState, setProvinceState ] = useState([])
  const [ municipalityState, setMunicipalityState ] = useState([])
  const [ districtState, setDistrictState ] = useState([])

  useEffect(() => {
    dispatch(getAllOrganizationsActions())
    dispatch(getAllRolsActions())
    dispatch(getAllRegionsActions())

    getGroups()
      .then((res) => setGroupsState(res.data))
      .catch((err) => console.log(err))
  }, [])

  const dataTableOrganizations = useSelector(
    (state) => state?.organizations?.organizations,
  )
  const rolSelector = useSelector((state) => state?.rols?.rols)
  const regionSelector = useSelector((state) => state?.regions?.regions)
  
  const { register, handleSubmit, errors, control, getValues, setValue } = useForm({
    resolver: yupResolver(schemaYup),
  })

  console.log(getValues())

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
    setValue('provincia', "")
    setValue('municipio', "")
    setValue('distrito', "")
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
    setValue('municipio', "")
    setValue('distrito', "")
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
    setValue('distrito', "")
    setMunicipalityValueState(e)
    setDistrictValueState(defaultValueState)
    setDistrictState([])
    if(!e.value) return
    getDistrictByIdProvinceByIdMunicipality(regionValueState.value, provinceValueState.value, e.value)
    .then(res => setDistrictState(res.data.data))
  }

  const handleSetDistrict = (e) => {
    setValue('distrito', e.value)
    setDistrictValueState(e)
  }

  const onSubmit = async (data) => {

    const objZammad = {
      cedula: data.cedula,
      firstname: infoCedulaState.names,
      lastname: `${infoCedulaState.firstSurname} ${infoCedulaState.secondSurname}`,
      email: data.email,
      login: data.email,
      phone: data.phone,
      organization: parseInt(data.institucion),
      role_ids: data.permisos.map((data) => data.value),
      zone: data.region + data.provincia + data.municipio + data.distrito,
      password: data.cPassword,
      note: 'User created from the BackOffice',
      group_ids: addAllGroupsToUser(groupsState)
    }

    console.log('objZammad', objZammad)
    
    setLoadingCreate(true)
    postUser(objZammad)
      .then((res) => {
        sweetAlertGood()
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

  return (
    <CardGrid cardHeaderTitle="Añadir Nuevo Usuario">
      <FormApp
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        loading={loadingCreate}
      >
        <Col sm="12">
          <h4 className="mb-1">
            <User size={20} className="mr-50" />
            <span className="align-middle">Información Personal</span>
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
          messageError={errors.cedula?.message && 'El Nombre es obligatorio'}
        />

        <InputApp
          required
          type="email"
          label="Correo Electrónico"
          name="email"
          register={register}
          placeholder="Escribe el Correo Electrónico"
          messageError={
            errors.email?.message && errors.email?.message
          }
        />

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Teléfono<RequiredInput /></Label>
            <Controller
              control={control}
              name="phone"
              render={({field}) => <Cleave
                {...field}
                className="form-control"
                placeholder="Escribe el Teléfono"
                onChange={e => setValue("phone", e.target.value)}
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
            <Label>Institución<RequiredInput /></Label>
            <Controller
              control={control}
              name="institucion"
              render={({field}) => <Select 
                {...field} 
                onChange={e => setValue('institucion', e.value)}
                options={optionsZammadIdValueSelect(dataTableOrganizations)}
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

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Permisos<RequiredInput /></Label>
            <Controller
              control={control}
              name="permisos"
              onChange={register}
              render={({ onChange, name }) => (
                <Select
                  isMulti
                  name={name}
                  theme={selectThemeColors}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={onChange}
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

        <Col sm="12">
          <h4 className="mb-1 mt-2">
            <MapPin size={20} className="mr-50" />
            <span className="align-middle">Detalles de Zona</span>
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
                onChange={e => handleSetDistrict(e)}
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

        <Col sm="12">
          <h4 className="mb-1 mt-2">
            <Lock size={20} className="mr-50" />
            <span className="align-middle">Seguridad</span>
          </h4>
        </Col>

        <InputApp
          required
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
          required
          type="password"
          label="Confirmar Contraseña"
          name="cPassword"
          register={register}
          placeholder="Escribe la Contraseña"
          messageError={
            errors.cPassword?.message && errors.cPassword?.message
          }
        />

      </FormApp>
    </CardGrid>
  )
}
export default UserCreate
