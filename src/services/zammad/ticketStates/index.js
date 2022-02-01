import { zammadAxios } from "../../../configs/axios";
import { zammadApi } from "../../../constants/api/zammadApi";

export const getTicketStates = async () => await zammadAxios.get(zammadApi.ticketStates)
