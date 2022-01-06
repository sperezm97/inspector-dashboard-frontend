import { territoriesAxios } from "../../../configs/axios";
import { territoriesApi } from "../../../constants/api/territoriesApi";

export const getMunicipalityByIdRegionByIdProvince = async (idRegion, idProvince) => await territoriesAxios.get(territoriesApi.municipalitiesByprovincesByRegions(idRegion, idProvince))