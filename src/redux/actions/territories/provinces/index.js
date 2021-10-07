import { territoriesAxios } from "../../../../configs/axios";
import { territoriesApi } from "../../../../constants/api/territoriesApi";
import { territoriesTypes } from "../../../types/territories";
import { cleanSelectMunicipalities } from "../municipalities";

export const getAllProvincesActions = () => (dispatch) =>
  territoriesAxios.get(territoriesApi.provinces).then((response) => {
    dispatch({
      type: territoriesTypes.GET_PROVINCES,
      payload: response.data.data,
    })
  })

export const getProvincesByRegionActions = (id = null) => (dispatch) => {

  if(id) {
    return (
      territoriesAxios.get(territoriesApi.provincesByRegion(id)).then((response) => {
        dispatch({
          type: territoriesTypes.GET_PROVINCES_BY_REGION,
          payload: response.data.data
        })
      })
    )
  }

  return (
    dispatch(cleanSelectProvinces()),
    dispatch(cleanSelectMunicipalities())
  )
}

export const cleanSelectProvinces = () => ({type: territoriesTypes.CLEAN_SELECT_PROVINCES})
