import { territoriesAxios } from '../../../../configs/axios'
import { territoriesApi } from '../../../../constants/api/territoriesApi'
import { territoriesTypes } from '../../../types/territories'

export const getProvincesByRegion = (id) => (dispatch) =>
  territoriesAxios
    .get(territoriesApi.provincesByRegion(id))
    .then((response) => {
      dispatch({
        type: territoriesTypes.GET_PROVINCES_BY_REGION,
        payload: response.data.data,
      })
    })
