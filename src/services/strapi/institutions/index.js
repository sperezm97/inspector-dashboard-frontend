import { strapiAxios } from '../../../configs/axios'
import { strapiApi } from '../../../constants/api/strapiApi'

export const strapiGetInstitutions = async () => await strapiAxios.get(strapiApi.institutions.institution)

export const strapiPostInstitutions = async (data) => await strapiAxios.post(strapiApi.institutions.institution, data)

export const strapiGetInstitutionsByIdService = async (id) => await strapiAxios.get(strapiApi.institutions.institutionByIdService(id))