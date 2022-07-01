import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { columns } from './columns'
import DataTableList from '../../../apps/bandeja/list/table'
import ComponentSpinner from '../../../../@core/components/spinner/Loading-spinner'
import { getAllSubCategoriesActions } from '../../../../redux/actions/incidents/subCategories'
import Url from '../../../../constants/Url'
import { sweetAlertError } from '../../../../@core/components/sweetAlert'
import { getSubCategories } from '../../../../services/incidents/subCategory'
import { strapiGetSubCategories } from '../../../../services/strapi/services'

const subCategoria = () => {
  const dispatch = useDispatch()

  const [subCategoriesState, setSubCategoriesState] = useState([])
  const [loadingSubCategories, setLoadingSubCategories] = useState(true)
  const [valueSearch, setValueSearch] = useState("")

  useEffect(() => {
    // dispatch(getAllSubCategoriesActions())

    strapiGetSubCategories({valueSearch})
      .then(res => setSubCategoriesState(res.data.data))
      .catch(err => {
        console.log(err)
        sweetAlertError()
      })
      .finally(() => setLoadingSubCategories(false))

  }, [valueSearch])

  // const subCategoriesState = useSelector(
  //   (state) => state?.subCategories?.subCategories,
  // )

  // const searchTable = (data, queryLowered) =>
  //   data.filter((data) =>
  //     (data.name || '').toLowerCase().includes(queryLowered),
  //   )

  return (
    <DataTableList
      columnsTable={columns}
      setValueSearch={setValueSearch}
      dataTable={subCategoriesState}
      dataTableTitle="Sub-Categorías"
      showButton
      labelButton="Añadir Nueva Sub-Categoría"
      urlButton={Url.subCategoryCreate}
      loadingTable={loadingSubCategories}
    />
  )
}

export default subCategoria
