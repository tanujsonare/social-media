import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

import { getCookie } from '../CsrfToken'
import NavbarForNotAuthenticated from './NavbarForNotAuthenticated'


export default function LoginUser() {
    const navigate = useNavigate();

    const userLogin = async (e) =>{
        e.preventDefault();
        const formData = document.getElementById("userLoginForm");
        const data = {};
        for (let i = 0; i < formData.length-1; i++) {
        data[formData[i].id] = formData[i].value;
        }

        const headers = {
            'X-CSRFToken': getCookie("csrftoken")
        };

        await axios.post('http://127.0.0.1/api/login',
            data,
            { headers }
        ).then(response => {
            console.log(response.data);
            localStorage.setItem("user_token", response.data.token);
            localStorage.setItem("user_name", response.data.username);
            localStorage.setItem("user_id", response.data.user_id);
            localStorage.setItem("profile_image", response.data.profile_image);
            navigate("/");
            window.location.reload();
        })
        .catch(error => {
            alert(error.response.data.error);
        });
    }
    return (
        <div className="custom-background" style={{backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%', height: '668px'}}>
            <NavbarForNotAuthenticated />
            <div className='my-5'>
                <form id="userLoginForm" onSubmit={userLogin}>
                    <div className="form-group mx-4">
                        <label htmlFor="userName" className="d-flex my-3 text-light">Username*</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter your username" />
                    </div>
                    <div className="form-group mx-4 my-4">
                        <label htmlFor="userPassword" className="d-flex my-3 text-light">Password*</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                    </div>
                    <div className='my-3 mx-4 flex-row d-flex'>
                        <button type="submit" className="btn btn-outline-light">Submit</button>
                        <Link className='text-light mx-4 mt-2' to="/register" >Click here to Register</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
