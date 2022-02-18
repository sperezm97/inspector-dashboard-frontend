import { incidentsAxios } from '../../../configs/axios'
import { incidentsApi } from '../../../constants/api/incidentsApi'

export const getIncidentCategoryId = async (id) => {

    const { data } = await incidentsAxios.get(`${incidentsApi.categories}/${id}`)

    return data
}

export const getIncidentCategoryByIdService = async (id) => {

    const { data } = await incidentsAxios.get(`${incidentsApi.services}/${id}/${incidentsApi.categories}`)

    return data
}
