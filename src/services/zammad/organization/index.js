import { zammadAxios } from '../../../configs/axios'
import { zammadApi } from '../../../constants/api/zammadApi'

export const postOrganization = async (data) => await zammadAxios.post(zammadApi.organizations, data)

export const getOrganizations = async () => await zammadAxios.get(zammadApi.organizations)

export const getOrganizationByAcronym = async (acronym) => await zammadAxios.get(zammadApi.organizationsByAcronym(acronym))
