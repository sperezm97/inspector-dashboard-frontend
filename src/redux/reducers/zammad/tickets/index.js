import { ticketNewObjectFiltered } from '../../../../utility/zammad/filterData'
import { zammadTypes } from '../../../types/zammad'

const initialState = {
  tickets: [],
  listTickets: [],
  ticketsTwoDate: [],
}

const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case zammadTypes.GET_TICKETS:
      return {
        ...state,
        tickets: action.payload,
        listTickets: ticketNewObjectFiltered(
          action.payload.Ticket,
          action.payload,
        ),
      }

      case zammadTypes.GET_TICKETS_TWO_DATE:
        return {
          ...state,
          ticketsTwoDate: action.payload
        }

    default:
      return state
  }
}

export default ticketsReducer
