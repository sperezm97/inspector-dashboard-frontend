import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { columns } from './columns'
import DataTableList from '../../apps/bandeja/list/table'
import { getAllSubCategoriesActions } from '../../../redux/actions/incidents/subCategories'
import Url from '../../../constants/Url'

const subCategoria = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllSubCategoriesActions())
  }, [])

  const dataTableSubCategories = useSelector(
    (state) => state?.subCategories?.subCategories,
  )

  const searchTable = (data, queryLowered) =>
    data.filter((data) =>
      (data.name || '').toLowerCase().includes(queryLowered),
    )

  return (
    <DataTableList
      columnsTable={columns}
      dataTable={dataTableSubCategories}
      dataTableTitle="Sub-Categorias"
      searchTable={searchTable}
      showButton
      labelButton="Añadir Nueva Sub-Categoria"
      urlButton={Url.subCategoryCreate}
    />
  )
}

export default subCategoria
