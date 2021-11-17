import { zammadAxios } from '../../../../configs/axios'
import { zammadApi } from '../../../../constants/api/zammadApi'
import { zammadTypes } from '../../../types/zammad'

export const getAllOrganizationsActions = () => (dispatch) =>
  zammadAxios.get(zammadApi.allOrganizations).then((response) => {
    dispatch({
      type: zammadTypes.GET_ORGANIZATIONS,
      payload: response.data,
    })
  })
