import { incidentsAxios } from '../../../configs/axios'
import { incidentsApi } from '../../../constants/api/incidentsApi'

export const getIncidentServiceId = async (id) => {

    const { data } = await incidentsAxios.get(`${incidentsApi.services}/${id}`)

    return data
}
