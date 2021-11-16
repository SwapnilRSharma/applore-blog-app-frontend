import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function DataTable(props) {
    const [data, setData] = useState([{}])
    const [loading, setLoading] = useState(false)
    const [isDeleted , setDeleted] = useState(false)
    let navigate = useNavigate();
    const user = useSelector((state) => state.user)
    console.log(user)
    let users =[{}];
    // useEffect(()=>{
    //     !localStorage.getItem('user')  && navigate('/login')
    //   },[])
    useEffect(async () => {
        // if(localStorage.getItem('user') )
        //     navigate('/login')
        // else
        
        if(props.value == "users"){
            setLoading(true);
            const response = await axios
            .get(`http://localhost:5000/admin/users`, {
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
        }else if(props.value == "deletedUsers")
        {
            setDeleted(false)
            setLoading(true);
            const response = await axios
            .get(`http://localhost:5000/admin/users`, {
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
        }else if(props.value == "blogs")
        {

        }else if(props.value == "deletedBlogs")
        {

        }
        console.log('state data' , users);

    }, [props, isDeleted]);

    console.log(data.length)

    async function deleteUser(id)
    {
        const response = await axios
        .get(`http://localhost:5000/admin/delete-user/${id}`, {
            headers: {
                Authorization: 'Bearer ' + user.user.token//the token is a variable which holds the token
            }})
        .then((response) => {

            console.log(response)
            console.log(response.data )
            setDeleted(true)
           alert("User is deleted.")
            // users = response.data;
            // setData(response.data)
            // setLoading(false)
            // dispatch(selectedBlog(response.data));
           
        })
        .catch((err) => {
            console.log("Err: ", err);
        });
    }

    const renderList = data.map((item)=> {
        return (
            
                <tr>
                <td>{item.name}</td>
                <td>{item.email}</td>
                {props.value == "users" &&
                 <td>  <button className={"btn btn-primary"} onClick={()=>deleteUser(item._id)}>Delete</button></td>
                
                }
               
                </tr>
            
        )
    })
    
    return ( 
        <div>
            <h1>Users</h1>
            {!loading ? 
            (  
            <table class="table">
            <thead>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                {props.value == "users" &&  <th scope="col">Action</th> }
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

export default DataTable;