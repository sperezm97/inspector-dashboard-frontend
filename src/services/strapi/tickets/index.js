import { strapiAxios } from '../../../configs/axios'
import { strapiApi } from '../../../constants/api/strapiApi'

export const strapiGetTickets = async () => await strapiAxios.get(strapiApi.tickets.ticket)

export const strapiGetTicketsById = async (id) => await strapiAxios.get(strapiApi.tickets.ticketId(id))

export const strapiPostTickets = async (data) => await strapiAxios.post(strapiApi.tickets.ticket, data)

export const strapiPutStateTicket = async (id, data) => await strapiAxios.put(strapiApi.tickets.ticketId(id), data)
