import { zammadAxios } from "../../../configs/axios";
import { zammadApi } from "../../../constants/api/zammadApi";

export const getTicketArticles = async (id) => await zammadAxios.get(`${zammadApi.ticketArticles}${id}`)

export const postTicketArticles = async (dataObj) => await zammadAxios.post(zammadApi.postTicketArticles, dataObj)