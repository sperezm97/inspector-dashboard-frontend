import { strapiAxios } from '../../../configs/axios'
import { strapiApi } from '../../../constants/api/strapiApi'

export const strapiPostUploads = async (data) => await strapiAxios.post(strapiApi.uploads.upload, data)
