import { incidentsAxios } from '../../../configs/axios'
import { incidentsApi } from '../../../constants/api/incidentsApi'

export const getIncidentOrganizationByIdService = async (id) => {

    const { data } = await incidentsAxios.get(`${incidentsApi.services}/${id}/${incidentsApi.organizations}`)

    return data
}
