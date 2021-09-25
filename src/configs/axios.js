import axios from 'axios'

export const zammadAxios = axios.create({
    baseURL: 'https://zammad.rgg.digital.gob.do/api/v1/',
    headers: {
        'authorization': 'Bearer 0CAPNDKVEUD22bu7nZI6B53NdnA1jukugqcLf3N-L-o'
    }
})

export const territoriesAxios = axios.create({
    baseURL: 'https://api.digital.gob.do/v1/territories/'
})