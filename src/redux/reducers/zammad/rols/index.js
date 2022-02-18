import { zammadTypes } from '../../../types/zammad'

const initialState = {
  rols: [],
}

const rolsReducer = (state = initialState, action) => {
  switch (action.type) {
    case zammadTypes.GET_ROLS:
      return {
        ...state,
        rols: action.payload,
      }

    default:
      return state
  }
}

export default rolsReducer
