import { territoriesTypes } from '../../../types/territories'

const initialState = {
  allMunicipalities: [],
  municipalities: [],
}

const municipalitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case territoriesTypes.GET_MUNICIPALITIES:
      return {
        ...state,
        allMunicipalities: action.payload,
      }

    case territoriesTypes.GET_MUNICIPALITIES_BY_PROVINCES_BY_REGIONS:
      return {
        ...state,
        municipalities: action.payload,
      }

    case territoriesTypes.CLEAN_SELECT_MUNICIPALITIES:
      return {
        ...state,
        municipalities: [],
      }

    default:
      return state
  }
}

export default municipalitiesReducer
