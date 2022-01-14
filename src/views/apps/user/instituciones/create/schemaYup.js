import * as yup from 'yup'

export const schemaYup = yup.object().shape({
  name: yup.string().trim()
    .required('La Institución es obligatoria'),
  acronimo: yup.string().trim()
    .required('El Acrónimo es obligatorio'),
  servicio: yup.number()
    .required('El Servicio es obligatorio'),
  phonenumber: yup.string()
    .required('El Teléfono es obligatorio')
    .length(10, 'Debe tener exactamente 10 dígitos'),
  address: yup.string().trim()
    .required('La Dirección es obligatoria'),
  email: yup.string().trim()
    .required('El Correo Electrónico es obligatorio')
    .email('El Correo Electrónico no es válido'),
  website: yup.string().trim()
    .required('El Sitio Web es obligatorio'),
  encargado: yup.number()
    .required('El Encargado es obligatorio'),
})