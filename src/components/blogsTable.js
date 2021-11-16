import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';





function BlogsTable(props) {
    let navigate = useNavigate();
    const [data, setData] = useState([{}])
    const [loading, setLoading] = useState(false)
    const [isApproved , setApproved] = useState(false)
    const [isDeleted , setDeleted] = useState(false)
    const user = useSelector((state) => state.user)
    console.log(props.value)
    let users =[{}];
    useEffect(async () => {
        if(props.value == "blogs"){
            setLoading(true);
            const response = await axios
            .get(`https://applore-blog-app-api.herokuapp.com/`)
            .then((response) => {
                console.log(response)
                console.log(response.data )
                users = response.data;
                setData(response.data)
                setLoading(false)
                // dispatch(selectedBlog(response.data));
               
            })
            .catch((err) => {
                console.log("Err: ", err);
            });
        }else if(props.value == "deleted")
        {
            setDeleted(false);
            setLoading(true);
            setData([])
            const response = await axios
            .get(`https://applore-blog-app-api.herokuapp.com/admin/deleted-blogs`, {
                headers: {
                  Authorization: 'Bearer ' + user.user.token//the token is a variable which holds the token
                }})
            .then((response) => {
                console.log(response)
                console.log(response.data )
                users = response.data;
                setData(response.data)
                setLoading(false)
                // dispatch(selectedBlog(response.data));
               
            })
            .catch((err) => {
                console.log("Err: ", err);
            });
        }
        else if(props.value == "pending")
        {
            setApproved(false)
            setLoading(true);
            setData([])
            const response = await axios
            .get(`https://applore-blog-app-api.herokuapp.com/admin/pending-blogs`, {
                headers: {
                  Authorization: 'Bearer ' + user.user.token//the token is a variable which holds the token
                }})
            .then((response) => {
                console.log(response)
                console.log(response.data )
                users = response.data;
                setData(response.data)
                setLoading(false)
                // dispatch(selectedBlog(response.data));
               
            })
            .catch((err) => {
                console.log("Err: ", err);
            });
        }
        else if(props.value == "my")
        {
        
            setLoading(true);
            setData([])
            const response = await axios
            .get(`https://applore-blog-app-api.herokuapp.com/user/blogs`, {
                headers: {
                  Authorization: 'Bearer ' + user.user.token//the token is a variable which holds the token
                }})
            .then((response) => {
                console.log(response)
                console.log(response.data )
                users = response.data;
                setData(response.data)
                setLoading(false)
                
                // dispatch(selectedBlog(response.data));
               
            })
            .catch((err) => {
                console.log("Err: ", err);
            });
        }
        console.log('state data' , users);

    }, [props , isApproved, isDeleted]);

    async function approveBlog(id)
    {
        const response = await axios
        .get(`https://applore-blog-app-api.herokuapp.com/admin/approve-blog/${id}`, {
            headers: {
                Authorization: 'Bearer ' + user.user.token//the token is a variable which holds the token
            }})
        .then((response) => {

            console.log(response)
            console.log(response.data )
            setApproved(true)
           alert("Blog is approved")
            // users = response.data;
            // setData(response.data)
            // setLoading(false)
            // dispatch(selectedBlog(response.data));
           
        })
        .catch((err) => {
            console.log("Err: ", err);
        });
    }

    async function deleteBlog(id)
    {
        const response = await axios
        .get(`https://applore-blog-app-api.herokuapp.com/admin/delete-blog/${id}`, {
            headers: {
                Authorization: 'Bearer ' + user.user.token//the token is a variable which holds the token
            }})
        .then((response) => {

            console.log(response)
            console.log(response.data )
            setDeleted(true)
           alert("Blog is deleted")
            // users = response.data;
            // setData(response.data)
            // setLoading(false)
            // dispatch(selectedBlog(response.data));
           
        })
        .catch((err) => {
            console.log("Err: ", err);
        });
    }
    console.log(data.length)

    function handleView(id) {
        console.log(id)
        navigate(`/view/${id}`);
    }

    const renderList = data.map((item)=> {
        return (
            
                <tr>
                <td>{item.title}</td>
                <td className={"td"}>{item.description}</td>
                <td>
                    
                {props.value=='pending'? 
                    <button className={"btn btn-primary"} onClick={()=>approveBlog(item.id)}> Approve </button> 
                    
                    : props.value == "my" && <button className={"btn btn-primary"} onClick={(e)=> handleView(item.id)}> View</button>
                }

                {props.value=='pending'? 
                    <button className={"btn btn-primary"} onClick={(e)=> handleView(item.id)}>View </button> 
                    : props.value == "blogs" &&  <button className={"btn btn-primary"} onClick={()=> deleteBlog(item._id)}> Delete</button>}
                   </td>
                </tr>
            
        )
    })

    
    
    return ( 
        <div>
            <span style={{textTransform : "capitalize", fontSize : "30px"}}>
                {props.value}</span>{(props.value !="blogs" || props.value != "user-blogs")  ? 
                <span style={{textTransform : "capitalize", fontSize : "30px"}}> Blogs</span> : <></>}
            {!loading ? 
            (  
            <table class="table">
            <thead>
                <tr>
                <th scope="col">Title</th>
                <th className={"td"} scope="col">Description</th>
                {(props.value != "deleted" || props.value != "user-blogs" )  ?   <th scope="col">Action</th> :<></> } 
                </tr>
            </thead>
            <tbody>
                {renderList}
            </tbody>
            </table>
            ):
            (
        <div>...Loading</div>
        )}
            
        </div>
     );
}

export default BlogsTable;