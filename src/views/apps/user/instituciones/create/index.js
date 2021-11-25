// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import 'cleave.js/dist/addons/cleave-phone.us'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Col } from 'reactstrap'

import FormApp from '../../../../../@core/components/form'
import InputApp from '../../../../../@core/components/input'
import Avatar from '../../../../../@core/components/avatar'
import CardGrid from '../../../../../@core/components/card-grid'
import { IconInstitution } from '../../../../../@core/components/icons'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { zammadAxios } from '../../../../../configs/axios'
import { zammadApi } from '../../../../../constants/api/zammadApi'
import Url from '../../../../../constants/Url'

const schema = yup.object().shape({
  name: yup.string().required().trim(),
  acronimo: yup.string().required().trim(),
  phonenumber: yup.number().positive().integer().required(),
  address: yup.string().required().trim(),
})

const institutionCreate = ({ history }) => {
  // ** State
  // const [img, setImg] = useState(null)
  const [loadingState, setLoadingState] = useState(false)

  // ** React hook form vars
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    try {
      setLoadingState(true)
      const response = await zammadAxios.post(zammadApi.organizations, data)
      if (response.status === 201) {
        history.push(Url.institution)
      }
      console.log(response)
    } catch (error) {
      console.log(error)
      alert('Se produjo un error al procesar la solicitud')
      setLoadingState(false)
    }
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
          label="Teléfono"
          type="number"
          name="phonenumber"
          register={register}
          placeholder="Escribe el Teléfono"
          messageError={
            errors.phonenumber?.message &&
            'El Teléfono es obligatorio y sólo números'
          }
        />

        <InputApp
          label="Dirección"
          name="address"
          register={register}
          placeholder="Escribe la Dirección"
          messageError={
            errors.address?.message && 'La Dirección es obligatoria'
          }
        />
      </FormApp>
    </CardGrid>
  )
}
export default institutionCreate
