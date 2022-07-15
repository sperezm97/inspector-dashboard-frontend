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
  const [ pageNumber, setPageNumber ] = useState(1)

  useEffect(() => {
    // dispatch(getAllCategoriesActions())
    strapiGetCategories({valueSearch, pageNumber})
      .then(res => setCategoriesState(res.data))
      .catch(err => {
        console.log(err)
        sweetAlertError()
      })
      .finally(() => setLoadingCategories(false))
  }, [valueSearch, pageNumber])

  // const categoriesState = useSelector(
  //   (state) => state?.categories?.categories,
  // )

  return (
    <DataTableList
      columnsTable={columns}
      setValueSearch={setValueSearch}
      setPageNumber={setPageNumber}
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
