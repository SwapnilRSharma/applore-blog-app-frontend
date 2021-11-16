import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {logoutUser} from '../redux/actions/authActions';

const Header = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    console.log(user.user);
    function handleLogout(){
        dispatch(logoutUser())
        localStorage.setItem("user" , "");
    }

    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                <a className="navbar-brand" href="/">
                    Blog Site
                </a>
                </div>
                {
                    localStorage.getItem('user') == "" ? <button className="login-button btn dark navbar-right" onClick={() => navigate('/login')}>Login</button>
                    : <button className="login-button btn dark navbar-right" onClick={() => handleLogout()}>Logout</button>
                } 
                 {
                    localStorage.getItem('user') != "" ? <button className="login-button btn dark navbar-right" 
                        onClick={() => localStorage.getItem("userType") == "ADMIN" ? navigate('/dashboard') : navigate('/userDashboard')}>
                            Go to Dashboard
                        </button> : <></>}
                
                
                
            </div>
        </nav>
    );
}

export default Header;