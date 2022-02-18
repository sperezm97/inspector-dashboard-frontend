import { incidentsAxios } from '../../../../configs/axios'
import { incidentsApi } from '../../../../constants/api/incidentsApi'
import { incidentsTypes } from '../../../types/incidents'

export const getAllSubCategoriesActions = () => (dispatch) =>
  incidentsAxios.get(incidentsApi.subcategories).then((response) => {
    dispatch({
      type: incidentsTypes.GET_SUBCATEGORIES,
      payload: response.data.data,
    })
  })
