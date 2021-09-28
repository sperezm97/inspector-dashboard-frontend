import { territoriesAxios } from "../../../../configs/axios";
import { territoriesApi } from "../../../../constants/api/territoriesApi";
import { territoriesTypes } from "../../../types/territories";

export const getMunicipalitiesByprovincesByRegions = (idRegions, idProvinces) => (dispatch) =>
  territoriesAxios.get(territoriesApi.municipalitiesByprovincesByRegions(idRegions, idProvinces)).then((response) => {
    dispatch({
      type: territoriesTypes.GET_MUNICIPALITIES_BY_PROVINCES_BY_REGIONS,
      payload: response.data.data
    })
  })