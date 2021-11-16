import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { blogReducer, selectedBlogReducer } from './blogReducer';


const reducers = combineReducers({
    allBlogs : blogReducer,
    blog: selectedBlogReducer,
    user: authReducer
});

export default reducers;