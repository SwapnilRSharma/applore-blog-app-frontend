import { ActionTypes } from "../constants/action-types"

export const setUser = (email, user_type, token) => {
    return {
        type: ActionTypes.SET_USER,
        payload: {email, user_type, token}
    }
}

export const logoutUser = () => {
    return {
        type: ActionTypes.LOGOUT_USER
    }
}