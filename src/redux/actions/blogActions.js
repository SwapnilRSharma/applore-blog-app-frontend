import { ActionTypes } from "../constants/action-types"

export const setBlogs = (blogs) => {
    return {
        type: ActionTypes.SET_BLOGS,
        payload: blogs
    }
}

export const selectedBlog = (blog) => {
    return {
        type: ActionTypes.SELECTED_BLOG,
        payload: blog
    }
}

export const removeSelectedBlog = () => {
    return {
        type: ActionTypes.REMOVE_SELECTED_BLOG
    }
}