import { strapiAxios } from '../../../configs/axios'
import { strapiApi } from '../../../constants/api/strapiApi'

export const strapiGetServices = async () => await strapiAxios.get(strapiApi.services.service)
