import { incidentsAxios } from '../../../configs/axios'
import { incidentsApi } from '../../../constants/api/incidentsApi'

export const getIncidentSubCategoryId = async (id) => {

    const { data } = await incidentsAxios.get(`${incidentsApi.subcategories}/${id}`)

    return data
}

export const getIncidentSubCategoryByIdServiceByIdCategory = async (hierarchies, id) => {

    const { data } = await incidentsAxios.get(`types/${hierarchies.category}/categories/${id}/subcategories`)

    return data
}

export const getSubCategories = async () => await incidentsAxios.get(incidentsApi.subcategories)

export const postSubCategory = async (data) => await incidentsAxios.post(incidentsApi.subcategories, data)
