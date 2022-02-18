import { territoriesAxios } from "../../../configs/axios";
import { territoriesApi } from "../../../constants/api/territoriesApi";

export const getSectionByIdMunicipalityByIdDistrict = async (idRegion, idProvince, idMunicipality, idDistrict) => 
    await territoriesAxios.get(territoriesApi.sectionByIdMunicipalityByIdDistrict(idRegion, idProvince, idMunicipality, idDistrict))