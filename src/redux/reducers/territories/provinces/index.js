import { territoriesTypes } from '../../../types/territories'

const initialState = {
  allProvinces: [],
  provinces: [],
}

const provincesReducer = (state = initialState, action) => {
  switch (action.type) {
    case territoriesTypes.GET_PROVINCES:
      return {
        ...state,
        allProvinces: action.payload
      }

    case territoriesTypes.GET_PROVINCES_BY_REGION:
      return {
        ...state,
        provinces: action.payload
      }

    case territoriesTypes.CLEAN_SELECT_PROVINCES:
      return {
        ...state,
        provinces: []
      }

    default:
      return state
  }
}

export default provincesReducer
