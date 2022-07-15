import Axios from 'axios'

export const getInfoCedula = async (cedulaId) => await Axios.get(`${process.env.REACT_APP_API_CEDULA}${cedulaId}/info/basic?api-key=${process.env.REACT_APP_API_CEDULA_KEY}`)