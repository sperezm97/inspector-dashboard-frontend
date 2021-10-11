import { zammadAxios } from '../../../../configs/axios'
import { zammadApi } from '../../../../constants/api/zammadApi'
import { ticketsTypes } from '../../../types/zammad/ticketsTypes'

export const getAllRolsActions = () => (dispatch) =>
  zammadAxios.get(zammadApi.allRols).then((response) => {
    dispatch({
      type: ticketsTypes.GET_ROLS,
      payload: response.data,
    })
  })
