export const authReducer = (state, action) => {

    switch (action.type) {
        case 'authUser':
            return {
                auth: action.payload
            }
    
        default:
            return state
    }
}