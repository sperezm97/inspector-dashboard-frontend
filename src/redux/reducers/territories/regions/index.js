import { regionsTypes } from "../../../types/territories/regionsTypes"

const initialState = {
    regions: []
}

const regionsReducer = (state = initialState, action) => {

    switch (action.type) {
        case regionsTypes.GET_REGIONS:
            return {
                ...state,
                regions: [...state.regions, action.payload]
            }

        default:
            return state
    }
}

export default regionsReducer