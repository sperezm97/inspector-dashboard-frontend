// ** React Imports
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

// ** Third Party Components
import 'cleave.js/dist/addons/cleave-phone.us'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Col } from 'reactstrap'

import FormApp from '../../../../@core/components/form'
import InputApp from '../../../../@core/components/input'
import CardGrid from '../../../../@core/components/card-grid'
import { Layers } from 'react-feather'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Url from '../../../../constants/Url'
import ComponentSpinner from '../../../../@core/components/spinner/Loading-spinner'
import { getIncidentServiceId } from '../../../../services/incidents/service'

const schema = yup.object().shape({
  name: yup.string().required().trim(),
})

const serviceEdit = ({ match }) => {
  const idParams = match.params.id
  const history = useHistory()

  const [dataService, setDataService] = useState([])
  console.log(dataService)
  const [loadingState, setLoadingState] = useState(false)

  useEffect(() => {
    getIncidentServiceId(idParams).then(({data}) => setDataService(data))
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

  return Object.keys(dataService)[0] ? (
    <CardGrid cardHeaderTitle="Editar Servicio">
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
            label="Nombre de Servicio"
            name="name"
            register={register}
            placeholder="Escribe el Servicio"
            defaultValue={dataService.name}
            messageError={errors.name?.message && 'El Servicio es obligatorio'}
          />
        </FormApp>
      </CardGrid>
  ) : <ComponentSpinner />
}
export default serviceEdit
