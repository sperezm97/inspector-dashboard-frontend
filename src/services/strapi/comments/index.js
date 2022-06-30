import { strapiAxios } from '../../../configs/axios'
import { strapiApi } from '../../../constants/api/strapiApi'

export const strapiPostComments = async (data) => await strapiAxios.post(strapiApi.comments.comment, data)
