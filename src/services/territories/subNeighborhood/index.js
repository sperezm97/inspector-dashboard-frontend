import { territoriesAxios } from "../../../configs/axios";
import { territoriesApi } from "../../../constants/api/territoriesApi";

export const getSubNeighborhoodByIdSectionByIdNeighborhood = async (idRegion, idProvince, idMunicipality, idDistrict, idSection, idNeighborhood) => 
    await territoriesAxios.get(territoriesApi.subNeighborhoodByIdSectionByIdNeighborhood(idRegion, idProvince, idMunicipality, idDistrict, idSection, idNeighborhood))