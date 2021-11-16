import Blog from './blog'
import React, { useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from '../redux/actions/blogActions';

const BlogListing = () => {
    const blogs = useSelector((state) => state.allBlogs.blogs)
    const dispatch = useDispatch();

    const fetchBlogs = async () => {
        const response = await axios
        .get("http://localhost:5000/")
        .then((res) => {
            console.log(res)
            dispatch(setBlogs(res.data));
        })
        .catch((err) => {
            console.log("Err: ", err);
        });
        // console.log(response.data)
        
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    console.log("Blogs :", blogs);
    return (
        <div className="container">
            <div className="row">
            <Blog/>
            </div>
        </div>
    );
}

export default BlogListing