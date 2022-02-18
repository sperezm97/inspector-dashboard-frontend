export const territoriesApi = {
  regions: 'regions',
  provinces: 'provinces',
  municipalities: 'municipalities',

  provincesByRegion: (id) => `regions/${id}/provinces`,

  municipalitiesByprovincesByRegions: (idRegions, idProvinces) =>
    `regions/${idRegions}/provinces/${idProvinces}/municipalities`,

  districtByIdProvinceByIdMunicipality: (idRegions, idProvinces, idMunicipality) =>
    `regions/${idRegions}/provinces/${idProvinces}/municipalities/${idMunicipality}/districts`,

  sectionByIdMunicipalityByIdDistrict: (idRegions, idProvinces, idMunicipality, idDistrict) =>
    `regions/${idRegions}/provinces/${idProvinces}/municipalities/${idMunicipality}/districts/${idDistrict}/sections`,

  neighborhoodByIdDistrictByIdSection: (idRegions, idProvinces, idMunicipality, idDistrict, idSection) =>
    `regions/${idRegions}/provinces/${idProvinces}/municipalities/${idMunicipality}/districts/${idDistrict}/sections/${idSection}/neighborhoods`,

  subNeighborhoodByIdSectionByIdNeighborhood: (idRegions, idProvinces, idMunicipality, idDistrict, idSection, idNeighborhood) =>
    `regions/${idRegions}/provinces/${idProvinces}/municipalities/${idMunicipality}/districts/${idDistrict}/sections/${idSection}/neighborhoods/${idNeighborhood}/sub-neighborhoods`,

}
