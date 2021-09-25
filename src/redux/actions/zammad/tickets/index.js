import { zammadAxios } from "../../../../configs/axios";
import { zammadApi } from "../../../../constants/api/zammadApi";
import { ticketsTypes } from "../../../types/zammad/ticketsTypes";

export const getAllTicketsActions = () => (dispatch) =>
    zammadAxios.get(zammadApi.allTickets).then((response) => {
        dispatch({
          type: ticketsTypes.GET_TICKETS,
          payload: response.data.assets
        })
    })