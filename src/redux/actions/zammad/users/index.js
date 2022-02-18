import { zammadAxios } from '../../../../configs/axios'
import { zammadApi } from '../../../../constants/api/zammadApi'
import { zammadTypes } from '../../../types/zammad'

export const getAllUsersActions = () => (dispatch) =>
  zammadAxios.get(zammadApi.allUsers).then((response) => {
    dispatch({
      type: zammadTypes.GET_USERS,
      payload: response.data,
    })
  })

export const getUserMeActions = () => (dispatch) =>
  zammadAxios.get(zammadApi.userMe).then((response) => {
    dispatch({
      type: zammadTypes.GET_USER_ME,
      payload: response.data,
    })
  })
