import { zammadAxios } from '../../../configs/axios'
import { zammadApi } from '../../../constants/api/zammadApi'

export const postOrganization = async (data) => await zammadAxios.post(zammadApi.organizations, data)
