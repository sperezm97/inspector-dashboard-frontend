import { zammadAxios } from '../../../../configs/axios'
import { zammadApi } from '../../../../constants/api/zammadApi'
import { zammadTypes } from '../../../types/zammad'

export const getAllRolsActions = () => (dispatch) =>
  zammadAxios.get(zammadApi.allRols).then((response) => {
    dispatch({
      type: zammadTypes.GET_ROLS,
      payload: response.data,
    })
  })
