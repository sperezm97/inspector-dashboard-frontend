import { ticketsTypes } from '../../../types/zammad/ticketsTypes'

const initialState = {
  rols: [],
}

const rolsReducer = (state = initialState, action) => {
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

export default rolsReducer
