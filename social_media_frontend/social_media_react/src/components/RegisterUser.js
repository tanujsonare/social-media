import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import { getCookie } from '../CsrfToken';
import NavbarForNotAuthenticated from './NavbarForNotAuthenticated'
import backgroundImage from './images/social_media_back.jpg'


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
        var data = new FormData();
        for (let i = 0; i < formData.length - 1; i++) {
            if (formData[i].id == "profile_image"){
                if (formData[i].files != null && formData[i].files != undefined){
                    const file = formData[i].files[0];
                    data.append(formData[i].id, file, file.name);
                }
            }else{
                data.append(formData[i].id, formData[i].value);
            }
        }

        const headers = {
            'X-CSRFToken': getCookie("csrftoken")
        };

        await axios.post('http://127.0.0.1/api/register',
            data,
            { headers }
        ).then(response => {
            console.log(response.data);
            if (response.status === 201) {
                navigate("/login");
            }
        })
            .catch(error => {
                alert(error.response.data.error_message);
            });
    };

    const checkUploadImage = (e)=>{
        const file = e.target.files[0]
        if (file != null && file!= undefined){
          let uploadTextBtn = document.getElementsByClassName("uploaded_profile_image")
          uploadTextBtn[0].textContent = e.target.files[0].name;
        }
    }

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%', minHeight: '700px' }}>
            <NavbarForNotAuthenticated />
            <div className='mx-4'>
                <form id="userRegistrationForm" onSubmit={submitUserRegistration}>
                    <div className="form-group upload_button">
                        <label htmlFor="profileimage" className='my-4 d-flex mx-4 text-light'>Upload Image (optional)</label>
                        <div className='d-flex justify-content-start'>
                            <div className='d-flex file btn btn-lg file form-control-file col-xl-12 mx-5 font-weight-bold'>
                                Choose file
                                <input type="file" className="profile_image" onChange={checkUploadImage} id="profile_image" accept="image/*" />
                            </div>
                            <label htmlFor="tweetimage" className='ms-0 my-2 uploaded_profile_image text-light'></label>
                        </div>
                    </div>
                    <div className="form-group mx-4">
                        <label htmlFor="userName" className="d-flex my-3 text-light">Username*</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter your username" />
                    </div>
                    <div className="form-group mx-4">
                        <label htmlFor="userEmail" className="d-flex my-3 text-light">Email address*</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter your email" />
                    </div>
                    <div className="form-group mx-4">
                        <label htmlFor="userBio" className="d-flex my-3 text-light">Bio (optional)</label>
                        <input type="text" className="form-control" id="bio" placeholder="Enter your bio" />
                    </div>
                    <div className="form-group mx-4">
                        <label htmlFor="userPassword" className="d-flex my-3 text-light">Password*</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                    </div>
                    <div className='mx-4 my-4 flex-row d-flex'>
                        <button type="submit" className="btn btn-outline-light">Submit</button>
                        <Link className="text-light mx-4 mt-2" to="/login">Click here to login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
