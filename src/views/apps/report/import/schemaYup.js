import * as yup from 'yup'

export const schemaYup = yup.object().shape({
  prioridad: yup.string().required('La Prioridad es obligatoria'),
  estado: yup.string().required('El estado es obligatorio'),
  encargado: yup.string().required('El Encargado es obligatorio'),
})