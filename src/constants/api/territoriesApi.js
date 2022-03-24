export const territoriesApi = {
  regions: 'regions',
  provinces: 'provinces',
  municipalities: 'municipalities',

  regionByIdentifier: (id) => `regions?identifier=${id}`,
  provinceByIdentifier: (id) => `provinces?identifier=${id}`,
  municipalityByIdentifier: (id) => `municipalities?identifier=${id}`,
  districtByIdentifier: (id) => `districts?identifier=${id}`,
  sectionByIdentifier: (id) => `sections?identifier=${id}`,
  neighborhoodByIdentifier: (id) => `neighborhoods?identifier=${id}`,
  subNeighborhoodByIdentifier: (id) => `sub-neighborhoods?identifier=${id}`,

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
