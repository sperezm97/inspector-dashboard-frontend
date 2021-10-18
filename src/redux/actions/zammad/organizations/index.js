import { zammadAxios } from '../../../../configs/axios'
import { zammadApi } from '../../../../constants/api/zammadApi'
import { ticketsTypes } from '../../../types/zammad/ticketsTypes'

export const getAllOrganizationsActions = () => (dispatch) =>
  zammadAxios.get(zammadApi.allOrganizations).then((response) => {
    dispatch({
      type: ticketsTypes.GET_ORGANIZATIONS,
      payload: response.data,
    })
  })
