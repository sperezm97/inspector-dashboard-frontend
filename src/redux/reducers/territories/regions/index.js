import { territoriesTypes } from "../../../types/territories"

const initialState = {
    regions: []
}

const regionsReducer = (state = initialState, action) => {

    switch (action.type) {
        case territoriesTypes.GET_REGIONS:
            return {
                ...state,
                regions: [...state.regions, action.payload]
            }

        default:
            return state
    }
}

export default regionsReducer