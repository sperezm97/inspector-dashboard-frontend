import { ticketsTypes } from "../../../types/zammad/ticketsTypes"

const initialState = {
    tickets: []
}

const ticketsReducer = (state = initialState, action) => {

    switch (action.type) {
        case ticketsTypes.GET_TICKETS:
            return {
                ...state,
                tickets: [...state.tickets, action.payload]
            }

        default:
            return state
    }
}

export default ticketsReducer