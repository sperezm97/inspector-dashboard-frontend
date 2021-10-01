import { ticketNewObjectFiltered } from '../../../../utility/zammad/filterData'
import { ticketsTypes } from '../../../types/zammad/ticketsTypes'

const initialState = {
  tickets: [],
  listTickets: [],
}

const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ticketsTypes.GET_TICKETS:
      return {
        ...state,
        tickets: action.payload,
        listTickets: ticketNewObjectFiltered(
          Object.values(action.payload.Ticket),
          action.payload,
        ),
      }

    default:
      return state
  }
}

export default ticketsReducer
