import { incidentsTypes } from '../../../types/incidents'

const initialState = {
  services: [],
}

const servicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case incidentsTypes.GET_SERVICES:
      return {
        ...state,
        services: action.payload,
      }

    default:
      return state
  }
}

export default servicesReducer
