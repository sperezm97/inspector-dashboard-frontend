import { territoriesAxios } from "../../../configs/axios";
import { territoriesApi } from "../../../constants/api/territoriesApi";

export const getProvinceByIdRegion = async (id) => await territoriesAxios.get(territoriesApi.provincesByRegion(id))