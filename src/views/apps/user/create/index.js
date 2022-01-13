// ** React Imports
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Cleave from 'cleave.js/react'

// ** Third Party Components
import { User } from 'react-feather'
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
  optionsCodeValueSelect,
  optionsZammadIdValueSelect,
  selectThemeColors,
} from '../../../../utility/Utils'
import { getProvinceByIdRegion } from '../../../../services/territories/province'
import { getMunicipalityByIdRegionByIdProvince } from '../../../../services/territories/municipality'
import { getDistrictByIdProvinceByIdMunicipality } from '../../../../services/territories/district'
import { getInfoCedula } from '../../../../services/cedula'
import { sweetAlert } from '../../../../@core/components/sweetAlert'

const schema = yup.object().shape({
  firstName: yup.string().required().trim(),
  lastName: yup.string().required().trim(),
  email: yup.string().required().trim().email(),
  cedula: yup.string()
    .required('La Cédula es obligatoria')
    .length(11, 'Debe tener exactamente 11 dígitos'),
  phone: yup.number().required(),
  password: yup.string().required().trim(),
  cPassword: yup.string().required().trim().oneOf([yup.ref('password')], 'Passwords must and should match'),
  institucion: yup.string().required(),
  region: yup.string().required(),
  provincia: yup.string().required(),
  municipio: yup.string().required(),
  distrito: yup.string().required(),
})

const UserCreate = function() {
  const dispatch = useDispatch()

  const [loadingState, setLoadingState] = useState(false)

  const [ infoCedulaState, setInfoCedulaState ] = useState(null)

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
  }, [])

  const dataTableOrganizations = useSelector(
    (state) => state?.organizations?.organizations,
  )
  const rolSelector = useSelector((state) => state?.rols?.rols)
  const regionSelector = useSelector((state) => state?.regions?.regions)
  
  const { register, handleSubmit, errors, control, getValues, setValue } = useForm({
    resolver: yupResolver(schema),
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
    console.log('data', data)
    return
    const objZammad = {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      login: data.email,
      organization: data.institucion.label,
      roles: data.rols.map((data) => data.label),
      cedula: data.cedula,
      phone: data.phone,
      zone: data.provincia.value,
      password: data.password,
    }

    console.log('objZammad', objZammad)
    const { dataPost, loading, error } = postUser(objZammad)
    console.log('dataPost, loading, error', dataPost, loading, error)
  }

  return (
    <CardGrid cardHeaderTitle="Añadir Nuevo Usuario">
      <FormApp
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        loading={loadingState}
      >
        <Col sm="12">
          <h4 className="mb-1">
            <User size={20} className="mr-50" />
            <span className="align-middle">Información Personal</span>
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
          messageError={errors.cedula?.message && 'El Nombre es obligatorio'}
        />

        <InputApp
          type="email"
          label="Correo Electrónico"
          name="email"
          register={register}
          placeholder="Escribe el Correo Electrónico"
          messageError={
            errors.email?.message && 'El Correo Electrónico es obligatorio'
          }
        />

        <InputApp
          type="number"
          label="Teléfono"
          name="phone"
          register={register}
          placeholder="Escribe el Teléfono"
          messageError={errors.phone?.message && 'El Teléfono es obligatorio'}
        />

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Institución</Label>
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
            <Label>Permisos</Label>
            <Controller
              control={control}
              name="rols"
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
                />
              )}
            />
          </FormGroup>
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
                onChange={e => setValue('distrito', e.value)}
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

        <InputApp
          type="password"
          label="Contraseña"
          name="password"
          register={register}
          placeholder="Escribe la Contraseña"
          messageError={
            errors.password?.message && 'La Contraseña es obligatoria'
          }
        />

        <InputApp
          type="password"
          label="Confirmar Contraseña"
          name="cPassword"
          register={register}
          placeholder="Escribe la Contraseña"
          messageError={
            errors.cPassword?.message && 'Las Contraseñas no coinciden'
          }
        />
      </FormApp>
    </CardGrid>
  )
}
export default UserCreate
