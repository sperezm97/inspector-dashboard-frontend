import { territoriesAxios } from "../../../configs/axios";
import { territoriesApi } from "../../../constants/api/territoriesApi";

export const getDistrictByIdProvinceByIdMunicipality = async (idRegion, idProvince, idMunicipality) => 
    await territoriesAxios.get(territoriesApi.districtByIdProvinceByIdMunicipality(idRegion, idProvince, idMunicipality))