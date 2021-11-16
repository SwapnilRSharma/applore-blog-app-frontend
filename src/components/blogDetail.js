import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import bg from '../assets/bg.png'
import { selectedBlog, removeSelectedBlog} from "../redux/actions/blogActions";

const BlogDetail = () => {
    const { blogId } = useParams();
    let blog = useSelector((state) => state.blog);
    const { title, description, category } = blog;
    const dispatch = useDispatch();

    const fetchBlogDetail = async (id) => {
        const response = await axios
          .get(`http://localhost:5000/${id}`)
          .then((response) => {
            console.log(response)
            dispatch(selectedBlog(response.data));
          })
          .catch((err) => {
            console.log("Err: ", err);
          });
        
      };

      useEffect(() => {
          if(blogId && blogId !== "") fetchBlogDetail(blogId);
          return () => {
            dispatch(removeSelectedBlog());
          };
      }, [blogId])

    return (
        <div className="container">
        {Object.keys(blog).length === 0 ? (
        <div>...Loading</div>
        ) : (
            <div style={{textAlign : "center"}}>
              <img src={bg} style={{width : '70vw '}}/>
            <h1>{title}</h1>
            <span>{category}</span>
            <p style={{marginTop : '30px' , fontSize : '18px' , marginBottom : '30px'}}>{description}</p>
            </div>
        )}
        </div>
    );
}

export default BlogDetail