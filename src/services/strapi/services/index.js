import { strapiAxios } from '../../../configs/axios'
import { strapiApi } from '../../../constants/api/strapiApi'

export const strapiGetServices = async ({valueSearch, pageNumber}) => await strapiAxios.get(strapiApi.services.service({valueSearch, pageNumber}))

export const strapiGetCategories = async ({valueSearch, pageNumber}) => await strapiAxios.get(strapiApi.services.category({valueSearch, pageNumber}))

export const strapiGetSubCategories = async ({valueSearch, pageNumber}) => await strapiAxios.get(strapiApi.services.subCategory({valueSearch, pageNumber}))

export const strapiGetServicesById = async (id) => await strapiAxios.get(strapiApi.services.serviceId(id))
export const strapiPostServices = async (data) => await strapiAxios.post(strapiApi.services.all, data)
export const strapiPutServices = async (id, data) => await strapiAxios.put(strapiApi.services.serviceId(id), data)

