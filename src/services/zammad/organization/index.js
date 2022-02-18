import { zammadAxios } from '../../../configs/axios'
import { zammadApi } from '../../../constants/api/zammadApi'

export const postOrganization = async (data) => await zammadAxios.post(zammadApi.organizations, data)

export const putOrganization = async (id, data) => await zammadAxios.put(`${zammadApi.organizations}/${id}`, data)

export const getOrganizations = async () => await zammadAxios.get(zammadApi.organizations)

export const getOrganizationById = async (id) => await zammadAxios.get(`${zammadApi.organizations}/${id}`)

export const getOrganizationByAcronym = async (acronym) => await zammadAxios.get(zammadApi.organizationsByAcronym(acronym))
