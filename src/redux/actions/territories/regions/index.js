import { territoriesAxios } from "../../../../configs/axios";
import { territoriesApi } from "../../../../constants/api/territoriesApi";
import { regionsTypes } from "../../../types/territories/regionsTypes";

export const getAllRegionsActions = () => (dispatch) =>
  territoriesAxios.get(territoriesApi.region).then((response) => {
    dispatch({
      type: regionsTypes.GET_REGIONS,
      payload: response.data.data
    })
  })