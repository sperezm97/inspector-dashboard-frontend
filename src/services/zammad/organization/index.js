import { zammadAxios } from '../../../configs/axios'
import { zammadApi } from '../../../constants/api/zammadApi'

export const postOrganization = async (data) => await zammadAxios.post(zammadApi.organizations, data)

export const getOrganizationByAcronym = async (acronym) => await zammadAxios.get(zammadApi.organizationsByAcronym(acronym))
