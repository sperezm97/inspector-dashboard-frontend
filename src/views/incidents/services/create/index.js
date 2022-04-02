// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import 'cleave.js/dist/addons/cleave-phone.us'
import { Layers } from 'react-feather'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Col } from 'reactstrap'

import FormApp from '../../../../@core/components/form'
import InputApp from '../../../../@core/components/input'
import CardGrid from '../../../../@core/components/card-grid'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { getTagsByName, postTags } from '../../../../services/zammad/tags'
import { postIncidents } from '../../../../services/incidents/service'

const schema = yup.object().shape({
  name: yup.string().required().trim(),
})

const servicesCreate = ({ history }) => {
  const [loadingState, setLoadingState] = useState(false)

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    
    console.log(data)
    postTags(data)
      .then(res => {
        console.log(res)
        getTagsByName(data?.name)
          .then(res => {
            console.log(res?.data[0]?.id)
            postIncidents({zammadId: res?.data[0]?.id})
              .then(res => {
                console.log(res)
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <CardGrid cardHeaderTitle="Añadir Nuevo Servicio">
      <FormApp
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        loading={loadingState}
      >
        <Col sm="12">
          <h4 className="mb-1">
            <Layers size={20} className="mr-50" />
            <span className="align-middle">Información</span>
          </h4>
        </Col>

        <InputApp
          label="Nombre del Servicio"
          name="name"
          register={register}
          placeholder="Escribe el Servicio"
          messageError={errors.name?.message && 'El Servicio es obligatorio'}
        />
      </FormApp>
    </CardGrid>
  )
}
export default servicesCreate
