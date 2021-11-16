import { ActionTypes } from "../constants/action-types"

const initialState = {}

export const authReducer = (state = initialState, { type, payload }) => {
    switch(type){
        case ActionTypes.SET_USER:
            return {...state, user: payload};
        case ActionTypes.LOGOUT_USER:
            return {};
        default:
            return state;
    }
}