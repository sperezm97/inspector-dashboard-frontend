import { zammadTypes } from '../../../types/zammad'

const initialState = {
  organizations: [],
}

const organizationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case zammadTypes.GET_ORGANIZATIONS:
      return {
        ...state,
        organizations: action.payload,
      }

    default:
      return state
  }
}

export default organizationsReducer
