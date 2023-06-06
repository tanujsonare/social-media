import React from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import { getCookie } from '../CsrfToken';
import NavbarForNotAuthenticated from './NavbarForNotAuthenticated'


export default function RegisterUser() {

    const navigate = useNavigate();
    const submitUserRegistration = async (e) => {
        e.preventDefault();

        // Using xmlRequest

        // const xmlRequest = new XMLHttpRequest();
        // const method = "POST";
        // const url = "http://127.0.0.1/api/register";
        // xmlRequest.open(method, url);
        // const csrftoken = getCookie("csrftoken");

        // xmlRequest.setRequestHeader("Content-type", "application/json");
        // xmlRequest.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        // xmlRequest.setRequestHeader("X-CSRFToken", csrftoken);
    
        // xmlRequest.onload = function () {
        //     debugger;
        //     if (xmlRequest.status === 201) {
        //         navigate("/login");
        //     }
        // };
    
        // const formData = document.getElementById("userRegistrationForm");
        // const data = {};
        // for (let i = 0; i < 4; i++) {
        // data[formData[i].id] = formData[i].value;
        // }

        // xmlRequest.onerror = function () {
        //     alert("Filled details are not valid!!!");
        // };
    
        // xmlRequest.send(JSON.stringify(data));


        const formData = document.getElementById("userRegistrationForm");
        const data = {};
        for (let i = 0; i < formData.length-1; i++) {
        data[formData[i].id] = formData[i].value;
        }

        const headers = {
            'X-CSRFToken': getCookie("csrftoken")
        };

        await axios.post('http://127.0.0.1/api/register',
            data,
            { headers }
        ).then(response => {
            console.log(response.data);
            if (response.status === 201){
                navigate("/login");
            }
        })
        .catch(error => {
            alert(error.response.data.error_message);
        });
    };

    return (
        <>
            <NavbarForNotAuthenticated />
            <div className='mx-4'>
                <form id="userRegistrationForm" onSubmit={submitUserRegistration}>
                    <div className="form-group mx-4">
                        <label htmlFor="userName" className="d-flex my-3">Username*</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter your username" />
                    </div>
                    <div className="form-group mx-4">
                        <label htmlFor="userEmail" className="d-flex my-3">Email address*</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter your email" />
                    </div>
                    <div className="form-group mx-4">
                        <label htmlFor="userBio" className="d-flex my-3">Bio (optional)</label>
                        <input type="text" className="form-control" id="bio" placeholder="Enter your bio" />
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
