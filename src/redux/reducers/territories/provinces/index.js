import { territoriesTypes } from "../../../types/territories"

const initialState = {
    provinces: []
}

const provincesReducer = (state = initialState, action) => {

    switch (action.type) {
        case territoriesTypes.GET_PROVINCES_BY_REGION:
            return {
                provinces: action.payload
            }

        case territoriesTypes.CLEAN_SELECT_PROVINCES:
            return {
                provinces: []
            }

        default:
            return state
    }
}

export default provincesReducer