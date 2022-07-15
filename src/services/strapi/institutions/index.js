import { strapiAxios } from '../../../configs/axios'
import { strapiApi } from '../../../constants/api/strapiApi'

export const strapiGetInstitutions = async ({valueSearch, pageNumber}) => await strapiAxios.get(strapiApi.institutions.institution({valueSearch, pageNumber}))

export const strapiGetInstitutionById = async (id) => await strapiAxios.get(strapiApi.institutions.institutionId(id))

export const strapiPutInstitutions = async (id, data) => await strapiAxios.put(`${strapiApi.institutions.institutionPost}/${id}`, data)

export const strapiPostInstitutions = async (data) => await strapiAxios.post(strapiApi.institutions.institutionPost, data)

export const strapiGetInstitutionsByIdService = async (id) => await strapiAxios.get(strapiApi.institutions.institutionByIdService(id))