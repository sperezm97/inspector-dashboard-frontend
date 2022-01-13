import * as yup from 'yup'

export const schemaYup = yup.object().shape({
    incidente: yup.number().required('El Incidente es obligatorio'),
    categoria: yup.number().required('La Categoría es obligatoria'),
    subCategoria: yup.number().required('La Sub-Categoría es obligatoria'),
    institucion: yup.number().required('La Institución es obligatoria'),
    cedula: yup.string()
      .required('La Cédula es obligatoria')
      .length(11, 'Debe tener exactamente 11 dígitos'),
    nombreC: yup.string().required('El Nombre es obligatorio'),
    telefono: yup.string()
      .required('El Teléfono es obligatorio')
      .length(10, 'Debe tener exactamente 10 dígitos')
    // acronimo: yup.string().required().trim(),
    // address: yup.string().required().trim(),
})