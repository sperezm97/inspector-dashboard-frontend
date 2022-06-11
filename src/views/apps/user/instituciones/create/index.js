import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import 'cleave.js/dist/addons/cleave-phone.us'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Select from 'react-select'
import Cleave from 'cleave.js/react'

import { Col, FormGroup, Label, Button } from 'reactstrap'
import { Plus } from 'react-feather'

import FormApp from '../../../../../@core/components/form'
import InputApp from '../../../../../@core/components/input'
import CardGrid from '../../../../../@core/components/card-grid'
import { IconInstitution } from '../../../../../@core/components/icons'
import { optionsZammadIdValueSelect, selectThemeColors } from '../../../../../utility/Utils'
import Url from '../../../../../constants/Url'
import { postOrganization } from '../../../../../services/zammad/organization'
import { getAllServicesActions } from '../../../../../redux/actions/incidents/services'
import { getAllUsersActions } from '../../../../../redux/actions/zammad/users'
import { sweetAlertError, sweetAlertGood } from '../../../../../@core/components/sweetAlert'
import { schemaYup } from './schemaYup'

import '@styles/react/libs/flatpickr/flatpickr.scss'
import { postGroup } from '../../../../../services/zammad/group'
import { RequiredInput } from '../../../../../@core/components/requiredInput'
import { strapiPostInstitutions } from '../../../../../services/strapi/institutions'
import { strapiGetUsers } from '../../../../../services/strapi/users'
import { strapiGetServices } from '../../../../../services/strapi/services'

const institutionCreate = ({ history }) => {

  const dispatch = useDispatch()

  const [loadingState, setLoadingState] = useState(false)
  
  const [ userState, setUserState ] = useState([])
  const [ serviceState, setServiceState ] = useState({data: []})
  console.log(serviceState)

  const defaultValueState = { value: '', label: 'Sin Seleccionar' }

  useEffect(() => {
    dispatch(getAllServicesActions())
    // dispatch(getAllUsersActions())
    strapiGetUsers()
    .then(res => setUserState(res.data))
    .catch(() => sweetAlertError())

    strapiGetServices()
    .then(res => setServiceState(res.data))
    .catch(() => sweetAlertError())

  }, [])

  // const usersSelector = useSelector((state) => state?.users?.users)
  // const servicesSelector = useSelector((state) => state?.services?.services)

  const { register, handleSubmit, errors, setValue, control } = useForm({
    resolver: yupResolver(schemaYup),
  })

  const onSubmit = async (data) => {
    const obj = {
      data: {
        name: data.name,
        acronym: data.acronimo.toUpperCase(),
        services: [data.servicio],
        phone: data.phonenumber,
        address: data.address,
        email: data.email,
        website: data.website,
        owner: data.encargado,
      }
    }
    console.log(obj)
    strapiPostInstitutions(obj)
      .then(() => {
        sweetAlertGood()
        history.push(Url.institution)
      })
      .catch(() => sweetAlertError())
      .finally(() => setLoadingState(false))
    // setLoadingState(true)
    // postOrganization(obj)
    //   .then(response => {
    //     if (response.status === 201) {
    //       postGroup({name: obj.name, acronimo: obj.acronimo})
    //         .then(() => {
    //           history.push(Url.institution)
    //           sweetAlertGood()
    //         })
    //         .catch(() => sweetAlertError())
    //         .finally(() => setLoadingState(false))
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err.message)
    //     sweetAlertError()      
    //   })
    //   .finally(() => setLoadingState(false))
  }

  return (
    <CardGrid cardHeaderTitle="Añadir Nueva Institución">
      <FormApp
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        loading={loadingState}
      >
        <Col sm="12">
          <h4 className="mb-1">
            <IconInstitution size={20} className="mr-50" />
            <span className="align-middle">Información</span>
          </h4>
        </Col>

        <InputApp
          required
          label="Nombre de la Institución"
          name="name"
          register={register}
          placeholder="Escribe la Institución"
          messageError={errors.name?.message && errors.name?.message}
        />

        <InputApp
          required
          label="Acrónimo"
          name="acronimo"
          register={register}
          placeholder="Escribe el Acrónimo"
          messageError={
            errors.acronimo?.message && 'El Acrónimo es obligatorio'
          }
        />
        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Servicio<RequiredInput /></Label>
            <Controller
              control={control}
              name="servicio"
              render={({ field }) => <Select
                {...field}
                onChange={e => setValue('servicio', e.value)}
                options={serviceState.data.map(data => ({
                  value: data.id,
                  label: data.attributes.name
                }))}
                isLoading={!serviceState.data[0]}
                defaultValue={defaultValueState}
                classNamePrefix="select"
                theme={selectThemeColors}
              />}
            />
            <p className="text-danger">{
              errors.servicio?.message && errors.servicio?.message
            }</p>
          </FormGroup>
        </Col>

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Teléfono<RequiredInput /></Label>
            <Controller
              control={control}
              name="phonenumber"
              render={({ field }) => <Cleave
                {...field}
                className="form-control"
                placeholder="Escribe el Teléfono"
                onChange={e => setValue("phonenumber", e.target.value)}
                options={{ blocks: [10], numericOnly: true }}
              />}
            />
            <p className="text-danger">{
              errors.phonenumber?.message && errors.phonenumber?.message
            }</p>
          </FormGroup>
        </Col>

        <InputApp
          required
          label="Dirección"
          name="address"
          register={register}
          placeholder="Escribe la Dirección"
          messageError={
            errors.address?.message && errors.address?.message
          }
        />

        <InputApp
          required
          label="Correo Electrónico"
          name="email"
          register={register}
          placeholder="Escribe el Correo Electrónico"
          messageError={
            errors.email?.message && errors.email?.message
          }
        />

        <InputApp
          required
          label="Sitio Web"
          name="website"
          register={register}
          placeholder="Escribe el Sitio Web"
          messageError={
            errors.website?.message && errors.website?.message
          }
        />

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Encargado<RequiredInput /></Label>
            <Controller
              control={control}
              name="encargado"
              render={({ field }) => <Select
                {...field}
                onChange={e => setValue('encargado', e.value)}
                options={userState.map(data => ({
                  value: data.id,
                  label: `${data.firstname} ${data.lastname}`
                }))}
                isLoading={!userState[0]}
                defaultValue={defaultValueState}
                classNamePrefix="select"
                theme={selectThemeColors}
              />}
            />
            <p className="text-danger">{
              errors.encargado?.message && errors.encargado?.message
            }</p>
          </FormGroup>
        </Col>

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label />
            <div>
              <Button.Ripple
                outline
                color='primary'
                onClick={() => history.push(Url.userCreate)}
              >
                <Plus size={14} />
                <span className='align-middle ml-25'>Añadir Usuario</span>
              </Button.Ripple>
            </div>
          </FormGroup>
        </Col>

      </FormApp>
    </CardGrid>
  )
}
export default institutionCreate
