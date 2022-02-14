import * as yup from 'yup'

export const schemaYup = yup.object().shape({
  // cedula: yup.string()
  //   .required('La Cédula es obligatoria')
  //   .length(11, 'Debe tener exactamente 11 dígitos'),
  
  // nombreC: yup.string().required('El Nombre es obligatorio'),
  email: yup.string().trim()
    .required('El Correo Electrónico es obligatorio')
    .email('El Correo Electrónico no es válido'),
  phone: yup.string()
    .required('El Teléfono es obligatorio')
    .length(10, 'Debe tener exactamente 10 dígitos'),
  institucion: yup.string().required('La Institución es obligatoria'),
  permisos: yup.array()
    .min(1, 'Debes seleccionar al menos 1 Permiso')
    .required('El Permiso es obligatorio'),
  region: yup.string().required('La Región es obligatoria'),
  provincia: yup.string().required('La Provincia es obligatoria'),
  municipio: yup.string().required('El Municipio es obligatorio'),
  distrito: yup.string().required('El Distrito es obligatorio'),
  password: yup.string(),
    // .required('La Contraseña es obligatoria'),
  cPassword: yup.string()
    // .required('La Contraseña es obligatoria')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
})