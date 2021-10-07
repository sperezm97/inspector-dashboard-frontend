import { zammadAxios } from '../../../../configs/axios'
import { zammadApi } from '../../../../constants/api/zammadApi'
import { ticketsTypes } from '../../../types/zammad/ticketsTypes'

export const getAllUsersActions = () => (dispatch) =>
  zammadAxios.get(zammadApi.allUsers).then((response) => {
    dispatch({
      type: ticketsTypes.GET_USERS,
      payload: response.data,
    })
  })
