import { ticketsTypes } from '../../../types/zammad/ticketsTypes'

const initialState = {
  rols: [],
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ticketsTypes.GET_ROLS:
      return {
        ...state,
        rols: action.payload,
      }

    default:
      return state
  }
}

export default usersReducer
