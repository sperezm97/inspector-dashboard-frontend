import { incidentsTypes } from '../../../types/incidents'

const initialState = {
  subCategories: [],
}

const subCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case incidentsTypes.GET_SUBCATEGORIES:
      return {
        ...state,
        subCategories: action.payload,
      }

    default:
      return state
  }
}

export default subCategoriesReducer
