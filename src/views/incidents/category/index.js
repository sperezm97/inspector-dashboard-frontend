import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { columns } from './columns'
import DataTableList from '../../apps/bandeja/list/table'
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner'
import { getAllCategoriesActions } from '../../../redux/actions/incidents/categories'
import Url from '../../../constants/Url'

const categoria = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCategoriesActions())
  }, [])

  const dataTableCategories = useSelector(
    (state) => state?.categories?.categories,
  )

  const searchTable = (data, queryLowered) =>
    data.filter((data) =>
      (data.name || '').toLowerCase().includes(queryLowered),
    )

  return dataTableCategories[0] ? (
    <DataTableList
      columnsTable={columns}
      dataTable={dataTableCategories}
      dataTableTitle="Categorias"
      searchTable={searchTable}
      showButton
      labelButton="Añadir Nueva Categoria"
      urlButton={Url.categoryCreate}
    />
  ) : (
    <ComponentSpinner />
  )
}

export default categoria
