import { strapiAxios } from '../../../configs/axios'
import { strapiApi } from '../../../constants/api/strapiApi'

export const strapiGetUsers = async () => await strapiAxios.get(strapiApi.users.user)

export const strapiPostUsers = async (data) => await strapiAxios.post(strapiApi.users.user, data)
