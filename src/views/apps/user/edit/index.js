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

import { getUserById, postUser, putUser } from '../../../../services/zammad/user'

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
// import { getInfoCedula } from '../../../../services/cedula'
import { sweetAlert, sweetAlertError, sweetAlertGood } from '../../../../@core/components/sweetAlert'
import { schemaYup } from './schemaYup'
import Url from '../../../../constants/Url'
import { getGroups } from '../../../../services/zammad/group'
import ComponentSpinner from '../../../../@core/components/spinner/Loading-spinner'
import { strapiGetUserById, strapiPutUser } from '../../../../services/strapi/users'
import { strapiGetInstitutions } from '../../../../services/strapi/institutions'

const UserCreate = function ({ history, match }) {

  const idParams = match.params.id

  const dispatch = useDispatch()

  const [loadingCreate, setLoadingCreate] = useState(false)

  // const [ infoCedulaState, setInfoCedulaState ] = useState(null)
  const [infoCedulaState2, setInfoCedulaState2] = useState(null)
  const [dataInfoUser, setDataInfoUser] = useState([])
  const [dataInstitutions, setDataInstitutions] = useState([])
  console.log(dataInstitutions)
  const [valueSearch, setValueSearch] = useState("")

  const [groupsState, setGroupsState] = useState([])

  const defaultValueState = { value: '', label: 'Sin Seleccionar' }

  const [institutionValueState, setInstitutionValueState] = useState(defaultValueState)
  const [permisosValueState, setPermisosValueState] = useState(null)

  const [regionValueState, setRegionValueState] = useState(defaultValueState)
  const [provinceValueState, setProvinceValueState] = useState(defaultValueState)
  const [municipalityValueState, setMunicipalityValueState] = useState(defaultValueState)
  const [districtValueState, setDistrictValueState] = useState(defaultValueState)

  // const [ regionState, setRegionState ] = useState([])
  const [provinceState, setProvinceState] = useState([])
  const [municipalityState, setMunicipalityState] = useState([])
  const [districtState, setDistrictState] = useState([])

  const [executeState, setExecuteState] = useState(true)

  useEffect(() => {
    // dispatch(getAllOrganizationsActions())
    // dispatch(getAllRolsActions())
    dispatch(getAllRegionsActions())

    strapiGetUserById(idParams)
      .then((res) => setDataInfoUser(res.data))
      .catch((err) => sweetAlertError())

    strapiGetInstitutions({valueSearch})
      .then((res) => {
        const newData = res.data.data.map(data => ({ value: data.id, label: `${data.attributes.acronym} - ${data.attributes.name}` }))
        setDataInstitutions(newData)
      })

    // getUserById(idParams)
    // .then((res) => setDataInfoUser(res.data))
    // .catch((err) => sweetAlertError())

    // getGroups()
    //   .then((res) => setGroupsState(res.data))
    //   .catch((err) => console.log(err))
  }, [])

  const dataTableOrganizations = useSelector(
    (state) => state?.organizations?.organizations
  )
  const rolSelector = useSelector((state) => state?.rols?.rols)
  const regionSelector = useSelector((state) => state?.regions?.regions)

  useEffect(() => {
    if (dataTableOrganizations[0] && Object.keys(dataInfoUser)[0]) {
      filterSelectInstitution(dataInfoUser.organization_id)
    }
    if (Object.keys(dataInfoUser)[0]) {
      const newRols = [...new Set(dataInfoUser?.role_ids)]
      const newRolsNames = [...new Set(dataInfoUser?.roles)]
      setValue('permisos', newRols.map((data) => data))
      setValue('phone', dataInfoUser?.phone)
      setValue('region', dataInfoUser?.zone_code?.substr(0, 2))
      setValue('provincia', dataInfoUser?.zone_code?.substr(2, 2))
      setValue('municipio', dataInfoUser?.zone_code?.substr(4, 2))
      setValue('distrito', dataInfoUser?.zone_code?.substr(6, 2))
      filterSelectsTerritories()
      setInfoCedulaState2(`${dataInfoUser?.firstname} ${dataInfoUser?.lastname}`)
      setPermisosValueState(newRolsNames.map((data, index) => ({ value: dataInfoUser.role_ids[index], label: data })))
    }
  }, [dataTableOrganizations, dataInfoUser])

  useEffect(() => {
    const newData = dataInstitutions.filter((data) => data.value === dataInfoUser?.institution?.id)
    setInstitutionValueState(newData)
    setValue('institucion', String(newData.value))
  },[dataInstitutions, dataInfoUser])

  console.log(dataInfoUser?.zone_code?.length)

  useEffect(() => {
    if (regionSelector[0] && Object.keys(dataInfoUser)[0] && executeState && dataInfoUser?.zone_code?.length >= 2) {
      const regionValue = regionSelector.find(data => data.code === dataInfoUser?.zone_code.substr(0, 2))
      setRegionValueState({ value: regionValue?.code, label: regionValue?.name })
    }

    if (provinceState[0] && executeState && dataInfoUser?.zone_code?.length >= 4) {
      const provinceValue = provinceState.find(data => data.code === dataInfoUser?.zone_code.substr(2, 2))
      setProvinceValueState({ value: provinceValue?.code, label: provinceValue?.name })
    }

    if (municipalityState[0] && executeState && dataInfoUser?.zone_code?.length >= 6) {
      const municipalityValue = municipalityState.find(data => data.code === dataInfoUser?.zone_code.substr(4, 2))
      setMunicipalityValueState({ value: municipalityValue?.code, label: municipalityValue?.name })
    }

    if (districtState[0] && executeState && dataInfoUser?.zone_code?.length >= 8) {
      const districtValue = districtState.find(data => data.code === dataInfoUser?.zone_code.substr(6, 2))
      setDistrictValueState({ value: districtValue?.code, label: districtValue?.name })
    }

    if (regionSelector[0] && provinceState[0] && municipalityState[0] && districtState[0]) {
      setExecuteState(false)
    }

  }, [dataInfoUser, regionSelector, provinceState, municipalityState, districtState])

  const filterSelectsTerritories = () => {
    getProvinceByIdRegion(dataInfoUser?.zone_code?.substr(0, 2))
      .then(res => {
        setProvinceState(res.data.data.filter(data => data.regionCode === dataInfoUser?.zone_code?.substr(0, 2)))
        getMunicipalityByIdRegionByIdProvince(dataInfoUser?.zone_code?.substr(0, 2), dataInfoUser?.zone_code?.substr(2, 2))
          .then(res => {
            setMunicipalityState(res.data.data.filter(data => data.provinceCode === dataInfoUser?.zone_code?.substr(2, 2)))
            getDistrictByIdProvinceByIdMunicipality(dataInfoUser?.zone_code?.substr(0, 2), dataInfoUser?.zone_code?.substr(2, 2), dataInfoUser?.zone_code?.substr(4, 2))
              .then(res => {
                setDistrictState(res.data.data.filter(data => data.municipalityCode === dataInfoUser?.zone_code?.substr(4, 2)))
              })
          })
      })
  }

  const filterSelectInstitution = (e) => {
    if (!e.value) return
    // const optionFiltered = dataInstitutions.find(option => option.value === id)
    setInstitutionValueState(e)
    setValue('institucion', e.value)
  }

  const { register, handleSubmit, errors, control, setError, setValue, getValues } = useForm({
    resolver: yupResolver(schemaYup),
  })
  console.log(getValues())

  // const handleDataCedula = ({target}) => {
  //   setInfoCedulaState(null)
  //   if(target.value.length !== 11) return
  //   getInfoCedula(target.value)
  //     .then(({data}) => {
  //       setInfoCedulaState2(`${data.payload.names} ${data.payload.firstSurname} ${data.payload.secondSurname}`)
  //       setInfoCedulaState(data.payload)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //       setInfoCedulaState(null)
  //       setInfoCedulaState2(null)
  //       sweetAlert({
  //         title: 'Error!',
  //         text: 'La Cédula ingresada no es válida',
  //         type: 'error'
  //       })
  //     })
  // }

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
    if (!e.value) return
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
    if (!e.value) return
    getMunicipalityByIdRegionByIdProvince(regionValueState.value, e.value).then(res => setMunicipalityState(res.data.data))
  }

  const handleGetDistrictByIdMunicipality = (e) => {
    setValue('municipio', e.value)
    setValue('distrito', "")
    setMunicipalityValueState(e)
    setDistrictValueState(defaultValueState)
    setDistrictState([])
    if (!e.value) return
    getDistrictByIdProvinceByIdMunicipality(regionValueState.value, provinceValueState.value, e.value)
      .then(res => setDistrictState(res.data.data))
  }

  const handleSetDistrict = (e) => {
    setValue('distrito', e.value)
    setDistrictValueState(e)
  }

  const onSubmit = async (data) => {

    // if(!permisosValueState[0]){
    //   return sweetAlert({
    //     title: 'Aviso',
    //     text: 'Debes seleccionar al menos 1 Permiso',
    //     type: 'warning'
    //   })
    // }

    let obj = {
      username: dataInfoUser.username,
      user_level: dataInfoUser.user_level,
      firstname: dataInfoUser.firstname,
      cedula: dataInfoUser.cedula,
      email: data.email,
      phone: data.phone,
      institution: parseInt(data.institucion),
      // role_ids: permisosValueState.map((data) => data.value),
      zone_code: data.region + data.provincia + data.municipio + data.distrito,
    }

    if (data.cPassword) {
      obj = { ...obj, password: data.cPassword }
    }

    console.log('obj', obj)

    setLoadingCreate(true)

    strapiPutUser(idParams, obj)
      .then((res) => {
        sweetAlertGood()
        history.push(Url.user)
        console.log(res)
      })
      .catch(() => {
        setLoadingCreate(false)
        sweetAlert({
          title: 'Error!',
          text: 'Ocurrió un error al editar el usuario.',
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
              render={({ field }) => <Cleave
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
              render={({ field }) => <Select
                {...field}
                onChange={e => filterSelectInstitution(e)}
                options={dataInstitutions}
                isLoading={!dataInstitutions[0]}
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

        {/* <Col lg="4" md="6" sm="12">
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
        </Col> */}

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
              render={({ field }) => <Select
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
              render={({ field }) => <Select
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
              render={({ field }) => <Select
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
              render={({ field }) => <Select
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
          type="password"
          label="Contraseña"
          name="password"
          autocomplete="off"
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
          autocomplete="off"
          register={register}
          placeholder="Escribe la Contraseña"
          messageError={
            errors.cPassword?.message && errors.cPassword?.message
          }
        />

      </FormApp>
    </CardGrid>
  ) : <ComponentSpinner />
}
export default UserCreate
