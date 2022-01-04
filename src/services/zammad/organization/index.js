import { zammadAxios } from '../../../configs/axios'
import { zammadApi } from '../../../constants/api/zammadApi'

export const postZammadOrganization = async (data) => {

    const response = await zammadAxios.post(zammadApi.organizations, data)

    return response
}
