// ** React Imports
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import 'cleave.js/dist/addons/cleave-phone.us'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Select from 'react-select'
import Cleave from 'cleave.js/react'

import { Col, FormGroup, Label , Button } from 'reactstrap'
import { Plus , User } from 'react-feather'

import FormApp from '../../../../../@core/components/form'
import InputApp from '../../../../../@core/components/input'
import Avatar from '../../../../../@core/components/avatar'
import CardGrid from '../../../../../@core/components/card-grid'
import { IconInstitution } from '../../../../../@core/components/icons'
import { ButtonRipple } from '../../../../../@core/components/button'
import { optionsZammadIdValueSelect, selectThemeColors } from '../../../../../utility/Utils'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { zammadAxios } from '../../../../../configs/axios'
import { zammadApi } from '../../../../../constants/api/zammadApi'
import Url from '../../../../../constants/Url'
import { postZammadOrganization } from '../../../../../services/zammad/organization'
import { getAllRolsActions } from '../../../../../redux/actions/zammad/rols'
import { getAllServicesActions } from '../../../../../redux/actions/incidents/services'
import { getAllUsersActions } from '../../../../../redux/actions/zammad/users'
import { schemaYup } from './schemaYup'

const institutionCreate = ({ history }) => {

  const dispatch = useDispatch()

  // ** State
  // const [img, setImg] = useState(null)
  const [loadingState, setLoadingState] = useState(false)

  const defaultValueState = {value: '', label: 'Sin Seleccionar'}

  useEffect(() => {
    dispatch(getAllServicesActions())
    dispatch(getAllUsersActions())
  }, [])

  const usersSelector = useSelector((state) => state?.users?.users)
  const servicesSelector = useSelector((state) => state?.services?.services)

  // ** React hook form vars
  const { register, handleSubmit, errors, getValues, setValue, control } = useForm({
    resolver: yupResolver(schemaYup),
  })
  console.log(getValues())

  const onSubmit = async (data) => {
    return console.log(data)
    setLoadingState(true)
    postZammadOrganization(data).then(response => {
      if (response.status === 201) {
        history.push(Url.institution)
      }
    }).catch(() => {
      console.log(error)
      alert('Se produjo un error al procesar la solicitud')
      setLoadingState(false)      
    })
  }

  // const renderUserAvatar = () => {
  //   if (img === null) {
  //     const stateNum = Math.floor(Math.random() * 6)
  //     const states = [
  //       'light-success',
  //       'light-danger',
  //       'light-warning',
  //       'light-info',
  //       'light-primary',
  //       'light-secondary',
  //     ]
  //     const color = states[stateNum]
  //     return (
  //       <Avatar
  //         initials
  //         color={color}
  //         className="rounded mr-2 my-25"
  //         content="Subir Logotipo"
  //         contentStyles={{
  //           borderRadius: 0,
  //           fontSize: 'calc(36px)',
  //           width: '100%',
  //           height: '100%',
  //         }}
  //         style={{
  //           height: '90px',
  //           width: '90px',
  //         }}
  //       />
  //     )
  //   }
  //   return (
  //     <img
  //       className="user-avatar rounded mr-2 my-25 cursor-pointer"
  //       src={img}
  //       alt="user profile avatar"
  //       height="90"
  //       width="90"
  //     />
  //   )
  // }

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
          label="Nombre de la Institución"
          name="name"
          register={register}
          placeholder="Escribe la Institución"
          messageError={errors.name?.message && errors.name?.message}
        />

        <InputApp
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
            <Label>Servicio</Label>
            <Controller
              control={control}
              name="servicio"
              render={({field}) => <Select 
                {...field} 
                onChange={e => setValue('servicio', e.value)}
                options={optionsZammadIdValueSelect(servicesSelector)}
                isLoading={!servicesSelector[0]}
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
            <Label>Teléfono</Label>
            <Controller
              control={control}
              name="phonenumber"
              render={({field}) => <Cleave
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
          label="Dirección"
          name="address"
          register={register}
          placeholder="Escribe la Dirección"
          messageError={
            errors.address?.message && errors.address?.message
          }
        />

        <InputApp
          label="Correo Electrónico"
          name="email"
          register={register}
          placeholder="Escribe el Correo Electrónico"
          messageError={
            errors.email?.message && errors.email?.message
          }
        />

        <InputApp
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
            <Label>Encargado</Label>
            <Controller
              control={control}
              name="encargado"
              render={({field}) => <Select 
                {...field} 
                onChange={e => setValue('encargado', e.value)}
                options={usersSelector.map(data => ({
                  value: data.id,
                  label: `${data.firstname} ${data.lastname}`
                }))}
                isLoading={!usersSelector[0]}
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
