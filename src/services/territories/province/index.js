import { territoriesAxios } from "../../../configs/axios";
import { territoriesApi } from "../../../constants/api/territoriesApi";

export const getProvinceByIdRegion = async (id) => {

    return await territoriesAxios.get(territoriesApi.provincesByRegion(id))
}