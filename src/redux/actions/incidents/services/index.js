import { incidentsAxios } from '../../../../configs/axios'
import { incidentsApi } from '../../../../constants/api/incidentsApi'
import { incidentsTypes } from '../../../types/incidents'

export const getAllServicesActions = () => (dispatch) =>
  incidentsAxios.get(incidentsApi.services).then((response) => {
    dispatch({
      type: incidentsTypes.GET_SERVICES,
      payload: response.data.data,
    })
  })
