import { incidentsAxios } from '../../../configs/axios'
import { incidentsApi } from '../../../constants/api/incidentsApi'

export const getIncidentServiceId = async (id) => await incidentsAxios.get(`${incidentsApi.services}/${id}`)

export const getIncidents = async () => await incidentsAxios.get(incidentsApi.services)

export const postIncidents = async (id) => await incidentsAxios.post(incidentsApi.services, id)
