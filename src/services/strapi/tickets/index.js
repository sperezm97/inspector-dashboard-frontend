import { strapiAxios } from '../../../configs/axios'
import { strapiApi } from '../../../constants/api/strapiApi'

export const strapiGetTickets = async ({valueSearch, valueZone}) => await strapiAxios.get(strapiApi.tickets.ticket({valueSearch, valueZone}))

export const strapiGetTicketsById = async (id) => await strapiAxios.get(strapiApi.tickets.ticketId(id))

export const strapiPostTickets = async (data) => await strapiAxios.post(strapiApi.tickets.ticketPost, data)

export const strapiPutStateTicket = async (id, data) => await strapiAxios.put(strapiApi.tickets.ticketId(id), data)

export const strapiImportTickets = async (data) => await strapiAxios.post(strapiApi.tickets.ticketImport, data)
