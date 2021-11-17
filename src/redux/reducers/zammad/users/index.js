import { zammadTypes } from '../../../types/zammad'

const initialState = {
  users: [],
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case zammadTypes.GET_USERS:
      return {
        ...state,
        users: action.payload,
      }

    default:
      return state
  }
}

export default usersReducer
