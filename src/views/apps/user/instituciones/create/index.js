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

import { Col, FormGroup, Label } from 'reactstrap'

import { User } from 'react-feather'
import FormApp from '../../../../../@core/components/form'
import InputApp from '../../../../../@core/components/input'
import Avatar from '../../../../../@core/components/avatar'
import CardGrid from '../../../../../@core/components/card-grid'
import { IconInstitution } from '../../../../../@core/components/icons'
import { selectThemeColors } from '../../../../../utility/Utils'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { zammadAxios } from '../../../../../configs/axios'
import { zammadApi } from '../../../../../constants/api/zammadApi'
import Url from '../../../../../constants/Url'
import { postZammadOrganization } from '../../../../../services/zammad/organization'
import { getAllRolsActions } from '../../../../../redux/actions/zammad/rols'
import { getAllServicesActions } from '../../../../../redux/actions/incidents/services'

const schema = yup.object().shape({
  name: yup.string().required().trim(),
  acronimo: yup.string().required().trim(),
  phonenumber: yup.number().positive().integer().required(),
  address: yup.string().required().trim(),
  email: yup.string().required().trim().email(),
  website: yup.string().required().trim(),
  cedula: yup.string().required().trim(),
  fullName: yup.string().required().trim(),
  // rols: ,
  dateBird: yup.string().required().trim(),
  phone: yup.string().required().trim(),
  emailEncargado: yup.string().required().trim().email(),
})

const institutionCreate = ({ history }) => {

  const dispatch = useDispatch()

  // ** State
  // const [img, setImg] = useState(null)
  const [loadingState, setLoadingState] = useState(false)

  useEffect(() => {
    dispatch(getAllRolsActions())
    dispatch(getAllServicesActions())
  }, [])

  const rolSelector = useSelector((state) => state?.rols?.rols)
  const servicesSelector = useSelector((state) => state?.services?.services)

  // ** React hook form vars
  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schema),
  })
  console.log(errors)

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
          messageError={errors.name?.message && 'La Institución es obligatoria'}
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

        <InputApp
          select
          label="Servicio"
          name="service"
          selectOptions={servicesSelector}
          register={register}
          control={control}
          messageError={errors.name?.message && 'El Servicio es obligatorio'}
        />

        <Col lg="4" md="6" sm="12">
          <label htmlFor="date">Teléfono</label>
          <Controller
              control={control}
              name="phonenumber"
              onChange={register}
              render={({ onChange, name }) => (
                <Cleave
                  className="form-control"
                  placeholder="809 220 1111"
                  name={name}
                  onChange={onChange}
                  options={{ phone: true, phoneRegionCode: 'US' }}
                  id="phone-number"
                />
              )}
            />
            <p className="text-danger">{
              errors.phonenumber?.message && 'El Teléfono es obligatorio'
            }</p>
        </Col>

        <InputApp
          label="Dirección"
          name="address"
          register={register}
          placeholder="Escribe la Dirección"
          messageError={
            errors.address?.message && 'La Dirección es obligatoria'
          }
        />

        <InputApp
          label="Correo Electrónico"
          name="email"
          register={register}
          placeholder="Escribe el Correo Electrónico"
          messageError={
            errors.email?.message && 'El Correo Electrónico es obligatorio'
          }
        />

        <InputApp
          label="Sitio Web"
          name="website"
          register={register}
          placeholder="Escribe el Sitio Web"
          messageError={
            errors.website?.message && 'El Sitio Web es obligatorio'
          }
        />

        <Col sm="12">
          <h4 className="mb-1">
            <User size={20} className="mr-50" />
            <span className="align-middle">Encargado</span>
          </h4>
        </Col>

        <InputApp
          type="number"
          label="Cédula de Identidad"
          name="cedula"
          register={register}
          placeholder="Escribe la Cédula"
          messageError={errors.cedula?.message && 'La Cédula es obligatoria'}
        />

        <InputApp
          label="Nombre Completo"
          name="fullName"
          register={register}
          placeholder="Escribe el Nombre Completo"
          messageError={errors.fullName?.message && 'El Nombre Completo es obligatorio'}
        />

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
          <p className="text-danger">{
            errors.rols?.message && 'El Permiso es obligatorio'
          }</p>
        </Col>

        <Col lg="4" md="6" sm="12">
          <label htmlFor="date">Fecha de Nacimiento</label>
          <Controller
              control={control}
              name="dateBird"
              onChange={register}
              render={({ onChange, name }) => (
              <Cleave
                className="form-control"
                placeholder="31-12-2000"
                name={name}
                onChange={onChange}
                options={{ date: true, delimiter: '-', datePattern: ['d', 'm', 'Y'] }}
                id="date"
              />
            )}
          />
          <p className="text-danger">{
            errors.dateBird?.message && 'La Fecha de Nacimiento es obligatoria'
          }</p>
        </Col>

        <Col lg="4" md="6" sm="12">
          <label htmlFor="date">Teléfono Móvil</label>
          <Controller
              control={control}
              name="phone"
              onChange={register}
              render={({ onChange, name }) => (
                <Cleave
                  className="form-control"
                  placeholder="809 220 1111"
                  name={name}
                  onChange={onChange}
                  options={{ phone: true, phoneRegionCode: 'US' }}
                  id="phone-number"
                />
              )}
            />
            <p className="text-danger">{
              errors.phone?.message && 'El Teléfono Móvil es obligatorio'
            }</p>
        </Col>

        <InputApp
          label="Correo Electrónico"
          name="emailEncargado"
          register={register}
          placeholder="Escribe el Correo Electrónico"
          messageError={
            errors.emailEncargado?.message && 'El Correo Electrónico es obligatorio'
          }
        />

      </FormApp>
    </CardGrid>
  )
}
export default institutionCreate
