// ** React Imports
import { useEffect, useState } from 'react'

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
import { getIncidents } from '../../../../services/incidents/service'
import { optionsIncidentsZammadIdValueSelect, optionsZammadIdValueSelect } from '../../../../utility/Utils'
import { getTagsByName, postTags } from '../../../../services/zammad/tags'
import { getIncidentCategoryByIdService } from '../../../../services/incidents/category'
import SelectApp from '../../../../@core/components/select'
import { postSubCategory } from '../../../../services/incidents/subCategory'

const schema = yup.object().shape({
  name: yup.string().required().trim(),
  servicio: yup.object({
    value: yup.string(),
    label: yup.string(),
  }).default(null).nullable().required('El Servicio es obligatorio'),
  categoria: yup.object({
    value: yup.string(),
    label: yup.string(),
  }).default(null).nullable().required('La Categoría es obligatoria'),
})

const subCategoryCreate = ({ history }) => {

  const [ incidentsState, setIncidentsState ] = useState([])
  const [ categoryState, setCategoryState ] = useState([])
  const [ loadingState, setLoadingState ] = useState(false)

  const defaultValueState = {value: '', label: 'Sin Seleccionar'}
  const [ incidentValueState, setIncidentValueState ] = useState(defaultValueState)
  const [ categoryValueState, setCategoryValueState ] = useState(defaultValueState)
  console.log(categoryValueState)

  useEffect(() => {
    getIncidents()
      .then(res => setIncidentsState(res.data.data))
      .catch(err => console.log(err))
  },[])

  const { register, handleSubmit, errors, control, setValue } = useForm({
    resolver: yupResolver(schema),
  })

  const handleSetService = (e) => {
    setValue("servicio", e)
    setIncidentValueState(e)
    setValue("categoria", "")
    setCategoryValueState(defaultValueState)
    setCategoryState([])
    getIncidentCategoryByIdService(e.value)
      .then(res => setCategoryState(res.data))
      .catch(err => console.log(err))
  }

  const handleSetCategory = (e) => {
    setValue("categoria", e)
    setCategoryValueState(e)
  }

  const onSubmit = async (data) => {
    console.log(data)
    postTags(data)
      .then(res => {
        console.log(res)
        getTagsByName(data?.name)
          .then(res => {
            console.log(res?.data[0]?.id)
            postSubCategory({categoryId: categoryValueState.value, zammadId: res?.data[0]?.id})
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
    <CardGrid cardHeaderTitle="Añadir Nueva Sub-Categoría">
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

        <Col lg="4" md="6" sm="12">
          <SelectApp 
            label="Servicio"
            control={control}
            name="servicio"
            onChange={e => handleSetService(e)}
            optionsRender={optionsZammadIdValueSelect(incidentsState)}
            value={incidentValueState}
            error={errors.servicio?.message}
          />
        </Col>

        <Col lg="4" md="6" sm="12">
          <SelectApp 
            label="Categoría"
            control={control}
            name="categoria"
            onChange={e => handleSetCategory(e)}
            optionsRender={optionsIncidentsZammadIdValueSelect(categoryState)}
            value={categoryValueState}
            error={errors.categoria?.message}
          />
        </Col>

        <InputApp
          required
          label="Nombre de la Sub-Categoría"
          name="name"
          register={register}
          placeholder="Escribe la Sub-Categoría"
          messageError={errors.name?.message && 'La Sub-Categoría es obligatoria'}
        />
      </FormApp>
    </CardGrid>
  )
}
export default subCategoryCreate
