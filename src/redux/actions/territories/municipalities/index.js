import { territoriesAxios } from '../../../../configs/axios'
import { territoriesApi } from '../../../../constants/api/territoriesApi'
import { territoriesTypes } from '../../../types/territories'

export const getAllMunicipalitiesActions = () => (dispatch) =>
  territoriesAxios.get(territoriesApi.municipalities).then((response) => {
    dispatch({
      type: territoriesTypes.GET_MUNICIPALITIES,
      payload: response.data.data,
    })
  })

export const getMunicipalitiesByprovincesByRegionsActions = (idRegions = null, idProvinces = null) => (dispatch) => {

  if(idRegions && idProvinces) {
    return (
      territoriesAxios.get(territoriesApi.municipalitiesByprovincesByRegions(idRegions, idProvinces)).then((response) => {
        dispatch({
          type: territoriesTypes.GET_MUNICIPALITIES_BY_PROVINCES_BY_REGIONS,
          payload: response.data.data
        })
      })
    )
  }

  return dispatch(cleanSelectMunicipalities())
}

export const cleanSelectMunicipalities = () => ({type: territoriesTypes.CLEAN_SELECT_MUNICIPALITIES})
