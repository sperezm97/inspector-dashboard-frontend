import { territoriesAxios } from '../../../../configs/axios'
import { territoriesApi } from '../../../../constants/api/territoriesApi'
import { territoriesTypes } from '../../../types/territories'

export const getAllRegionsActions = () => (dispatch) =>
  territoriesAxios.get(territoriesApi.regions).then((response) => {
    dispatch({
      type: territoriesTypes.GET_REGIONS,
      payload: response.data.data,
    })
  })
