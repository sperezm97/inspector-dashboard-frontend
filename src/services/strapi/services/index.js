import { strapiAxios } from '../../../configs/axios'
import { strapiApi } from '../../../constants/api/strapiApi'

export const strapiGetServices = async () => await strapiAxios.get(strapiApi.services.service)

export const strapiGetCategories = async () => await strapiAxios.get(strapiApi.services.category)

export const strapiGetSubCategories = async () => await strapiAxios.get(strapiApi.services.subCategory)

export const strapiGetServicesById = async (id) => await strapiAxios.get(strapiApi.services.serviceId(id))
export const strapiPostServices = async (data) => await strapiAxios.post(strapiApi.services.all, data)
export const strapiPutServices = async (id, data) => await strapiAxios.put(strapiApi.services.serviceId(id), data)

