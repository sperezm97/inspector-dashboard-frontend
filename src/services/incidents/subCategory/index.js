import { incidentsAxios } from '../../../configs/axios'
import { incidentsApi } from '../../../constants/api/incidentsApi'

export const getIncidentSubCategoryId = async (id) => {

    const { data } = await incidentsAxios.get(`${incidentsApi.subcategories}/${id}`)

    return data
}
