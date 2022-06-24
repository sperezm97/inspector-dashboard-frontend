import { strapiAxios } from '../../../configs/axios'
import { strapiApi } from '../../../constants/api/strapiApi'

export const strapiGetTickets = async () => await strapiAxios.get(strapiApi.tickets.ticket)

export const strapiPostTickets = async (data) => await strapiAxios.post(strapiApi.tickets.ticket, data)
