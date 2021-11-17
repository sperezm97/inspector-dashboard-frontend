import { zammadAxios } from '../../../../configs/axios'
import { zammadApi } from '../../../../constants/api/zammadApi'
import { zammadTypes } from '../../../types/zammad'

export const getAllTicketsActions = () => (dispatch) =>
  zammadAxios.get(zammadApi.allTickets).then((response) => {
    dispatch({
      type: zammadTypes.GET_TICKETS,
      payload: response.data.assets,
    })
  })

export const getTicketsByDateActions = (date) => (dispatch) =>
  zammadAxios.get(`${zammadApi.ticketsByDate}${date}`).then((response) => {
    dispatch({
      type: zammadTypes.GET_TICKETS_DATE,
      payload: response.data.assets,
    })
  })

export const getTicketsByTwoDateActions = (date1, date2) => (dispatch) =>
  zammadAxios
    .get(`${zammadApi.ticketsByDate}[${date1} TO ${date2}]`)
    .then((response) => {
      dispatch({
        type: zammadTypes.GET_TICKETS_TWO_DATE,
        payload: response.data.assets,
      })
    })

export const getTicketsByStateActions = (idState) => (dispatch) =>
  zammadAxios.get(`${zammadApi.ticketsByState}${idState}`).then((response) => {
    dispatch({
      type: zammadTypes.GET_TICKETS_STATE,
      payload: response.data.assets,
    })
  })

export const getTicketsByGroupActions = (idGroup) => (dispatch) =>
  zammadAxios.get(`${zammadApi.ticketsByGroup}${idGroup}`).then((response) => {
    dispatch({
      type: zammadTypes.GET_TICKETS_GROUP,
      payload: response.data.assets,
    })
  })
