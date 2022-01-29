import * as yup from 'yup'

export const schemaYup = yup.object().shape({
  incidente: yup.number().required('El Incidente es obligatorio'),
  categoria: yup.number().required('La Categoría es obligatoria'),
  subCategoria: yup.object({
    value: yup.number(),
    label: yup.string(),
  }).default(null).nullable().required('La Sub-Categoría es obligatoria'),
  institucion: yup.number().required('La Institución es obligatoria'),
  cedula: yup.string()
    .required('La Cédula es obligatoria')
    .length(11, 'Debe tener exactamente 11 dígitos'),
  telefono: yup.string()
    .required('El Teléfono es obligatorio')
    .length(10, 'Debe tener exactamente 10 dígitos'),
  zonaId: yup.string()
    .required('La Zona ID es obligatoria'),
  direccion: yup.string().trim()
    .required('La Dirección es obligatoria'),
  descripcion: yup.string().trim()
    .required('La Descripción es obligatoria'),
})