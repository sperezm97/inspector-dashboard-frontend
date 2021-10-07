export const territoriesApi = {
  regions: 'regions',
  provinces: 'provinces',
  municipalities: 'municipalities',
 
  provincesByRegion: (id) => `regions/${id}/provinces`,

  municipalitiesByprovincesByRegions: (idRegions, idProvinces) =>
    `regions/${idRegions}/provinces/${idProvinces}/municipalities`,

}
