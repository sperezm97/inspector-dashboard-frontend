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

const schema = yup.object().shape({
  name: yup.string().required().trim(),
})

const categoryCreate = ({ history }) => {

  const [loadingState, setLoadingState] = useState(false)

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    console.log(data)
  }


  return (
    <CardGrid cardHeaderTitle="Añadir Nueva Categoría">
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
          label="Nombre de la Categoría"
          name="name"
          register={register}
          placeholder="Escribe la Categoría"
          messageError={errors.name?.message && 'La Categoría es obligatoria'}
        />

      </FormApp>
    </CardGrid>
  )
}
export default categoryCreate