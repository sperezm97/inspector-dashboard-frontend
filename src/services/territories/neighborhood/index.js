import { territoriesAxios } from "../../../configs/axios";
import { territoriesApi } from "../../../constants/api/territoriesApi";

export const getNeighborhoodByIdDistrictByIdSection = async (idRegion, idProvince, idMunicipality, idDistrict, idSection) => 
    await territoriesAxios.get(territoriesApi.neighborhoodByIdDistrictByIdSection(idRegion, idProvince, idMunicipality, idDistrict, idSection))