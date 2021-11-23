import axios from 'axios'

const { accessToken } = JSON.parse(localStorage.getItem('userData'))

export const zammadAxios = axios.create({
  baseURL: 'https://zammad.rgg.digital.gob.do/api/v1/',
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
