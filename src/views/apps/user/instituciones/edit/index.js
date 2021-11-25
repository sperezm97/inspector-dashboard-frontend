// ** React Imports
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

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

const institutionCreate = ({ match }) => {
  const idParams = match.params.id
  const history = useHistory()

  const [dataInstitution, setDataInstitution] = useState(null)
  const [loadingState, setLoadingState] = useState(false)

  useEffect(() => {
    const request = async () => {
      try {
        const data = await zammadAxios.get(
          `${zammadApi.organizations}/${idParams}`,
        )
        setDataInstitution(data.data)
      } catch (error) {
        console.log(error)
      }
    }
    request()
  }, [])

  // const [img, setImg] = useState(null)

  // ** React hook form vars
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    try {
      setLoadingState(true)
      const response = await zammadAxios.put(
        `${zammadApi.organizations}/${idParams}`,
        data,
      )
      if (response.status === 200) {
        history.push(Url.institution)
      }
      console.log(response)
    } catch (error) {
      console.log(error)
      alert('Se produjo un error al procesar la solicitud')
      setLoadingState(false)
    }
  }

  return dataInstitution ? (
    <>
      <CardGrid cardHeaderTitle="Editar Institución">
        <FormApp
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          loading={loadingState}
          edit
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
            messageError={
              errors.name?.message && 'La Institución es obligatoria'
            }
            defaultValue={dataInstitution.name}
          />

          <InputApp
            label="Acrónimo"
            name="acronimo"
            register={register}
            placeholder="Escribe el Acrónimo"
            messageError={
              errors.acronimo?.message && 'El Acrónimo es obligatorio'
            }
            defaultValue={dataInstitution.acronimo}
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
            defaultValue={dataInstitution.phonenumber}
          />

          <InputApp
            label="Dirección"
            name="address"
            register={register}
            placeholder="Escribe la Dirección"
            messageError={
              errors.address?.message && 'La Dirección es obligatoria'
            }
            defaultValue={dataInstitution.address}
          />
        </FormApp>
      </CardGrid>
    </>
  ) : null
}
export default institutionCreate
