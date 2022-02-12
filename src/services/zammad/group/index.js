import { zammadAxios } from '../../../configs/axios'
import { zammadApi } from '../../../constants/api/zammadApi'

export const postGroup = async (data) => await zammadAxios.post(zammadApi.groups, data)

export const putGroup = async (id, data) => await zammadAxios.put(`${zammadApi.groups}/${id}`, data)

export const getGroups = async () => await zammadAxios.get(zammadApi.groups)
