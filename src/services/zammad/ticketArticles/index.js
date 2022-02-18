import { zammadAxios } from "../../../configs/axios";
import { zammadApi } from "../../../constants/api/zammadApi";

export const getTicketArticles = async (id) => await zammadAxios.get(`${zammadApi.ticketArticles}${id}`)

export const postTicketArticles = async (dataObj) => await zammadAxios.post(zammadApi.postTicketArticles, dataObj)

export const getTicketArticleAttachment = async (idTicket, idTicketArticle, idTicketArticleAttachment) => await zammadAxios.get(`${zammadApi.ticketArticlesAttachment}${idTicket}/${idTicketArticle}/${idTicketArticleAttachment}`, {responseType: 'arraybuffer'})