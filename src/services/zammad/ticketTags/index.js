import { zammadAxios } from "../../../configs/axios";
import { zammadApi } from "../../../constants/api/zammadApi";

export const postTicketTags = async (dataArr) => await zammadAxios.post(zammadApi.postTicketTags, dataArr)

export const postTicketArrTags = async (dataArr) => await Promise.all(dataArr.map(async (arr) => await postTicketTags(arr)))

export const getTicketsTags = async (id) => await zammadAxios.get(zammadApi.ticketTags(id))
