import { territoriesAxios } from "../../../configs/axios";
import { territoriesApi } from "../../../constants/api/territoriesApi";

export const getRegionByIdentifier = async (id) => await territoriesAxios.get(territoriesApi.regionByIdentifier(id))

export const getProvinceByIdentifier = async (id) => await territoriesAxios.get(territoriesApi.provinceByIdentifier(id))

export const getMunicipalityByIdentifier = async (id) => await territoriesAxios.get(territoriesApi.municipalityByIdentifier(id))

export const getDistrictByIdentifier = async (id) => await territoriesAxios.get(territoriesApi.districtByIdentifier(id))

export const getSectionByIdentifier = async (id) => await territoriesAxios.get(territoriesApi.sectionByIdentifier(id))

export const getNeighborhoodByIdentifier = async (id) => await territoriesAxios.get(territoriesApi.neighborhoodByIdentifier(id))

export const getSubNeighborhoodByIdentifier = async (id) => await territoriesAxios.get(territoriesApi.subNeighborhoodByIdentifier(id))
