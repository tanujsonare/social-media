import React from 'react'
import { useNavigate } from 'react-router-dom'
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
            navigate("/");
            window.location.reload();
        })
        .catch(error => {
            alert(error.response.data.error);
        });
    }
    return (
        <>
            <NavbarForNotAuthenticated />
            <div>
                <form id="userLoginForm" onSubmit={userLogin}>
                    <div className="form-group mx-4">
                        <label htmlFor="userName" className="d-flex my-3">Username*</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter your username" />
                    </div>
                    <div className="form-group mx-4">
                        <label htmlFor="userPassword" className="d-flex my-3">Password*</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                    </div>
                    <button type="submit" className="btn btn-primary d-flex my-3 mx-4">Submit</button>
                </form>
            </div>
        </>
    )
}
