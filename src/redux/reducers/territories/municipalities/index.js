import { territoriesTypes } from "../../../types/territories"

const initialState = {
    municipalities: []
}

const municipalitiesReducer = (state = initialState, action) => {

    switch (action.type) {
        case territoriesTypes.GET_MUNICIPALITIES_BY_PROVINCES_BY_REGIONS:
            return {
                municipalities: [action.payload]
            }

        default:
            return state
    }
}

export default municipalitiesReducer