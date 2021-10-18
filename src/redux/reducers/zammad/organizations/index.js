import { ticketsTypes } from '../../../types/zammad/ticketsTypes'

const initialState = {
  organizations: [],
}

const organizationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ticketsTypes.GET_ORGANIZATIONS:
      return {
        ...state,
        organizations: action.payload,
      }

    default:
      return state
  }
}

export default organizationsReducer
