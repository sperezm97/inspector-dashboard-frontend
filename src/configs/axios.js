import axios from 'axios'

const { accessToken } = JSON.parse(localStorage.getItem('userData')) || []

export const zammadAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    authorization: `Basic ${accessToken}`,
  },
})

export const territoriesAxios = axios.create({
  baseURL: process.env.REACT_APP_API_TERRITORIES,
})

export const incidentsAxios = axios.create({
  baseURL: process.env.REACT_APP_API_INCIDENTS,
})

export const strapiAxios = axios.create({
  baseURL: `${process.env.REACT_APP_API_STRAPI}/api/`
})

strapiAxios.interceptors.request.use((config) => {
  const { token } = JSON.parse(localStorage.getItem('user')) || []
  let jwt = ""
  if (token) {
    jwt = token
  }
  config.headers.Authorization = `Bearer ${jwt}`
  return config;
}, (error) => console.log("error ============> ", error))

strapiAxios.interceptors.response.use(
  response => response,
  error => {
    console.log("error response ============> ", error)
    if(error?.response?.status === 401){
      localStorage.clear()
      window.location.href = '/';
    }
  }
)