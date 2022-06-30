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
import { sweetAlertError, sweetAlertGood } from '../../../../@core/components/sweetAlert'
import { strapiGetCategories, strapiPostServices } from '../../../../services/strapi/services'
import Url from '../../../../constants/Url'

const schema = yup.object().shape({
  name: yup.string().required().trim(),
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

  useEffect(() => {
    strapiGetCategories()
      .then(res => {
        const data = res.data.data.map(data => ({value: data.id, label: data.attributes.name}))
        setCategoryState(data)
      })
      .catch(err => console.log(err))
  },[])

  const { register, handleSubmit, errors, control, setValue } = useForm({
    resolver: yupResolver(schema),
  })

  // const handleSetService = (e) => {
  //   setValue("servicio", e)
  //   setIncidentValueState(e)
  //   setValue("categoria", "")
  //   setCategoryValueState(defaultValueState)
  //   setCategoryState([])
  //   getIncidentCategoryByIdService(e.value)
  //     .then(res => setCategoryState(res.data))
  //     .catch(err => console.log(err))
  // }

  const handleSetCategory = (e) => {
    setValue("categoria", e)
    setCategoryValueState(e)
  }

  const onSubmit = async (data) => {

    const obj = {
      data: {
        name: data.name,
        parent: parseInt(data.categoria.value),
        type: 'subcategory'
      }
    }

    setLoadingState(true)

    strapiPostServices(obj)
      .then(() => {
        sweetAlertGood()
        history.push(Url.subCategory)
      })
      .catch(() => sweetAlertError())
      .finally(() => setLoadingState(false))

    // console.log(data)
    // postTags(data)
    //   .then(res => {
    //     console.log(res)
    //     getTagsByName(data?.name)
    //       .then(res => {
    //         console.log(res?.data[0]?.id)
    //         postSubCategory({categoryId: categoryValueState.value, zammadId: res?.data[0]?.id})
    //           .then(res => {
    //             console.log(res)
    //           })
    //           .catch(err => {
    //             console.log(err)
    //           })
    //       })
    //       .catch(err => {
    //         console.log(err)
    //       })
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
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
            label="Categoría"
            control={control}
            name="categoria"
            onChange={e => handleSetCategory(e)}
            optionsRender={categoryState}
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
