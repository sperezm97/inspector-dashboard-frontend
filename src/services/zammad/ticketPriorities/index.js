import { zammadAxios } from "../../../configs/axios";
import { zammadApi } from "../../../constants/api/zammadApi";

export const getTicketPriorities = async () => await zammadAxios.get(zammadApi.ticketPriorities)
