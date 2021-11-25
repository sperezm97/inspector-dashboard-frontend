import { incidentsAxios } from '../../../../configs/axios'
import { incidentsApi } from '../../../../constants/api/incidentsApi'
import { incidentsTypes } from '../../../types/incidents'

export const getAllCategoriesActions = () => (dispatch) =>
  incidentsAxios.get(incidentsApi.categories).then((response) => {
    dispatch({
      type: incidentsTypes.GET_CATEGORIES,
      payload: response.data.data,
    })
  })
