import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setUser } from '../redux/actions/authActions';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [userType, setUserType] = useState(null);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const options = [
        { value: 'ADMIN', label: 'Admin' },
        { value: 'CONTENT_WRITER', label: 'Content Writer' }
      ]
     
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(email == "" || password == "" || userType == null){
            setError("Please fill correct data!")
        }else{
            console.log(email)
            console.log(password)
            console.log(userType.value)
            setLoading(true);
            const response = await axios
            .post(`http://localhost:5000/user/login`, {
                email: email,
                password: password,
                user_type: userType.value
            })
            .then((res) => {
                dispatch(setUser(res.data.email, res.data.user_type, res.data.accessToken));
                localStorage.setItem("user" , res.data.accessToken)
                localStorage.setItem("userType" , userType.value)
                userType.value == "ADMIN" ? navigate('/dashboard') : navigate('/userDashboard')
            })
            .catch((err) => {
                console.log("Err: ", err);
                setError(true);
            });
        }
        
    }

    const handleUserChange = (userType) => {
        setUserType(userType)
        console.log(userType)
    }

    return (
        <div className="login">
            <form className="login_form">
                <h1>Login Here</h1>
                {error!== false ? <p>Please try again</p> : null}
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e)=> setEmail(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e)=> setPassword(e.target.value)}
                />
                <Select 
                    options={options} 
                    placeholder={"Select User Type"} 
                    onChange={handleUserChange} 
                    value={userType}
                />
                <button type="submit" className="submit_btn" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default LoginPage;