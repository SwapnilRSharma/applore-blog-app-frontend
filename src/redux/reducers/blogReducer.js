import { ActionTypes } from "../constants/action-types"

const initialState = {
    blogs: []
}

export const blogReducer = (state = initialState, { type, payload }) => {
    switch(type){
        case ActionTypes.SET_BLOGS:
            return {...state, blogs: payload};
        default:
            return state;
    }
}

export const selectedBlogReducer = (state = {}, { type, payload }) => {
    switch (type) {
      case ActionTypes.SELECTED_BLOG:
        return { ...state, ...payload };
      case ActionTypes.REMOVE_SELECTED_BLOG:
        return {};
      default:
        return state;
    }
  };