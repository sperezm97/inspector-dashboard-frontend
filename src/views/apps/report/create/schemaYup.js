import * as yup from 'yup'

export const schemaYup = yup.object().shape({
  incidente: yup.object({
    value: yup.string(),
    label: yup.string(),
  }).default(null).nullable().required('El Incidente es obligatorio'),
  categoria: yup.object({
    value: yup.string(),
    label: yup.string(),
  }).default(null).nullable().required('La Categoría es obligatoria'),
  subCategoria: yup.object({
    value: yup.string(),
    label: yup.string(),
  }).default(null).nullable().required('La Sub-Categoría es obligatoria'),
  institucion: yup.string().required('La Institución es obligatoria'),
  cedula: yup.string()
    .required('La Cédula es obligatoria')
    .length(11, 'Debe tener exactamente 11 dígitos'),
  telefono: yup.string()
    .required('El Teléfono es obligatorio')
    .length(10, 'Debe tener exactamente 10 dígitos'),
  region: yup.string().required('La Región es obligatoria'),
  provincia: yup.string().required('La Provincia es obligatoria'),
  municipio: yup.string().required('El Municipio es obligatorio'),
  distrito: yup.string().required('El Distrito es obligatorio'),
  seccion: yup.string().required('La Sección es obligatoria'),
  barrio: yup.object({
    value: yup.string(),
    label: yup.string(),
  }).default(null).nullable().required('El Barrio es obligatorio'),
  subBarrio: yup.object({
    value: yup.string(),
    label: yup.string(),
  }).default(null).nullable().required('El Sub-Barrio es obligatorio'),
  direccion: yup.string().trim()
    .required('La Dirección es obligatoria'),
  descripcion: yup.string().trim()
    .required('La Descripción es obligatoria'),
})