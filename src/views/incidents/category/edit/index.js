// ** React Imports
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

// ** Third Party Components
import 'cleave.js/dist/addons/cleave-phone.us'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Col } from 'reactstrap'

import { Layers } from 'react-feather'
import FormApp from '../../../../@core/components/form'
import InputApp from '../../../../@core/components/input'
import CardGrid from '../../../../@core/components/card-grid'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Url from '../../../../constants/Url'
import ComponentSpinner from '../../../../@core/components/spinner/Loading-spinner'
import { getIncidentCategoryId } from '../../../../services/incidents/category'

const schema = yup.object().shape({
  name: yup.string().required().trim(),
})

const categoryEdit = ({ match }) => {
  const idParams = match.params.id
  const history = useHistory()

  const [dataCategory, setDataCategory] = useState([])
  console.log(dataCategory)
  const [loadingState, setLoadingState] = useState(false)

  useEffect( () => {
    getIncidentCategoryId(idParams).then(({data}) => setDataCategory(data))
  }, [])

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    // try {
    //   setLoadingState(true)
    //   const response = await zammadAxios.put(
    //     `${zammadApi.organizations}/${idParams}`,
    //     data,
    //   )
    //   if (response.status === 200) {
    //     history.push(Url.institution)
    //   }
    //   console.log(response)
    // } catch (error) {
    //   console.log(error)
    //   alert('Se produjo un error al procesar la solicitud')
    //   setLoadingState(false)
    // }
  }

  return Object.keys(dataCategory)[0] ? (
    <CardGrid cardHeaderTitle="Editar Categoría">
        <FormApp
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          loading={loadingState}
          edit
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
            defaultValue={dataCategory.name}
            messageError={errors.name?.message && 'La Categoría es obligatoria'}
          />
        </FormApp>
      </CardGrid>
  ) : <ComponentSpinner />
}
export default categoryEdit
