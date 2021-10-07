import { ticketsTypes } from '../../../types/zammad/ticketsTypes'

const initialState = {
  users: [],
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ticketsTypes.GET_USERS:
      return {
        ...state,
        users: action.payload,
      }

    default:
      return state
  }
}

export default usersReducer
