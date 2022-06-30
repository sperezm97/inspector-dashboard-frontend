import { strapiAxios } from '../../../configs/axios'
import { strapiApi } from '../../../constants/api/strapiApi'

export const strapiGetTicketsTotal = async () => await strapiAxios.get(strapiApi.dashboard.total)
export const strapiGetTicketsOpen = async () => await strapiAxios.get(strapiApi.dashboard.open)
export const strapiGetTicketsEnd = async () => await strapiAxios.get(strapiApi.dashboard.end)
export const strapiGetTicketsNotClose = async () => await strapiAxios.get(strapiApi.dashboard.notClose)
export const strapiGetTicketsPriorityLow = async () => await strapiAxios.get(strapiApi.dashboard.priorityLow)
export const strapiGetTicketsPriorityNormal = async () => await strapiAxios.get(strapiApi.dashboard.priorityNormal)
export const strapiGetTicketsPriorityHigh = async () => await strapiAxios.get(strapiApi.dashboard.priorityHigh)
export const strapiGetInstitutionWithTickets = async () => await strapiAxios.get(strapiApi.dashboard.institutionWithTickets)
export const strapiGetUsersActive = async () => await strapiAxios.get(strapiApi.dashboard.usersActive)
