import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { columns } from './columns'
import DataTableList from '../../../apps/bandeja/list/table'
import ComponentSpinner from '../../../../@core/components/spinner/Loading-spinner'
import { getAllCategoriesActions } from '../../../../redux/actions/incidents/categories'
import Url from '../../../../constants/Url'
import { getCategories } from '../../../../services/incidents/category'
import { sweetAlertError } from '../../../../@core/components/sweetAlert'
import { strapiGetCategories } from '../../../../services/strapi/services'

const categoria = () => {
  const dispatch = useDispatch()

  const [categoriesState, setCategoriesState] = useState([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [valueSearch, setValueSearch] = useState("")

  useEffect(() => {
    // dispatch(getAllCategoriesActions())
    strapiGetCategories({valueSearch})
      .then(res => setCategoriesState(res.data.data))
      .catch(err => {
        console.log(err)
        sweetAlertError()
      })
      .finally(() => setLoadingCategories(false))
  }, [valueSearch])

  // const categoriesState = useSelector(
  //   (state) => state?.categories?.categories,
  // )

  return (
    <DataTableList
      columnsTable={columns}
      setValueSearch={setValueSearch}
      dataTable={categoriesState}
      dataTableTitle="Categorías"
      showButton
      labelButton="Añadir Nueva Categoría"
      urlButton={Url.categoryCreate}
      loadingTable={loadingCategories}
    />
  )
}

export default categoria
