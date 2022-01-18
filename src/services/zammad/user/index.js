import { zammadAxios } from '../../../configs/axios'
import { zammadApi } from '../../../constants/api/zammadApi'

export const postUser = async (dataObj) => await zammadAxios.post(zammadApi.users, dataObj)

export const putUser = async (dataObj) => await zammadAxios.put(`${zammadApi.users}/${dataObj.id}`, dataObj)

export const getUserMe = async () => await zammadAxios.get(zammadApi.userMe)

export const getUserByCedula = async (id) => await zammadAxios.get(`${zammadApi.userByCedula}${id}`)
