import { zammadAxios } from "../../../configs/axios";
import { zammadApi } from "../../../constants/api/zammadApi";

export const postTicketTags = async (dataArr) => await zammadAxios.post(zammadApi.postTicketTags, dataArr)

export const postTicketArrTags = async (idTicket, dataIncident) => {

    if(dataIncident[0]){
        const newArrtags = dataIncident.map(arr => ({
            item: arr,
            object: "Ticket",
            o_id: idTicket,
        }))
    
        return await Promise.all(newArrtags.map(async (arr) => await postTicketTags(arr)))
            .then(res => console.log('res tags: ', res))
            .catch(err => console.log('err tags: ', err))
    }else{
        return null
    }
}

export const getTicketsTags = async (id) => await zammadAxios.get(zammadApi.ticketTags(id))
