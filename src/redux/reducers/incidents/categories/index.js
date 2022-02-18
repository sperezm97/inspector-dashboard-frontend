import { incidentsTypes } from '../../../types/incidents'

const initialState = {
  categories: [],
}

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case incidentsTypes.GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      }

    default:
      return state
  }
}

export default categoriesReducer
