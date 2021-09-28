export const territoriesApi = {
    regions: 'regions',
    provincesByRegion: (id) => `regions/${id}/provinces`,
    municipalitiesByprovincesByRegions: (idRegions, idProvinces) => `regions/${idRegions}/provinces/${idProvinces}/municipalities`,
}