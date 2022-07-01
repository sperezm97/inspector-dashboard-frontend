import { strapiAxios } from '../../../configs/axios'
import { strapiApi } from '../../../constants/api/strapiApi'

export const strapiGetServices = async ({valueSearch}) => await strapiAxios.get(strapiApi.services.service({valueSearch}))

export const strapiGetCategories = async ({valueSearch}) => await strapiAxios.get(strapiApi.services.category({valueSearch}))

export const strapiGetSubCategories = async ({valueSearch}) => await strapiAxios.get(strapiApi.services.subCategory({valueSearch}))

export const strapiGetServicesById = async (id) => await strapiAxios.get(strapiApi.services.serviceId(id))
export const strapiPostServices = async (data) => await strapiAxios.post(strapiApi.services.all, data)
export const strapiPutServices = async (id, data) => await strapiAxios.put(strapiApi.services.serviceId(id), data)

