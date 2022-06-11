import { strapiAxios } from '../../../configs/axios'
import { strapiApi } from '../../../constants/api/strapiApi'

// export const strapiAuthLogin = async (data) => await strapiAxios.post(strapiApi.auth.login, data)
export const strapiAuthLogin = async (data) => await strapiAxios.post(strapiApi.auth.login, data)
