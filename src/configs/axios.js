import axios from 'axios'

const { accessToken } = JSON.parse(localStorage.getItem('userData'))

export const zammadAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    authorization: `Basic ${accessToken}`,
  },
})

export const territoriesAxios = axios.create({
  baseURL: 'https://api.digital.gob.do/v1/territories/',
})

export const incidentsAxios = axios.create({
  baseURL: 'https://api.digital.gob.do/v2/incidents/',
})
