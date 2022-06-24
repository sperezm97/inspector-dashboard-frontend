import { strapiAxios } from '../../../configs/axios'
import { strapiApi } from '../../../constants/api/strapiApi'

export const strapiGetUserMe = async () => await strapiAxios.get(strapiApi.users.userMe)

export const strapiGetUsers = async () => await strapiAxios.get(strapiApi.users.user)

export const strapiPostUsers = async (data) => await strapiAxios.post(strapiApi.users.user, data)
