import React from 'react'
import { useNavigate } from 'react-router-dom';

import NavbarForAuthenticated from './NavbarForAuthenticated'


export default function LogoutUser(props) {
    const navigate = useNavigate();
    
    const logoutUser = ()=>{
        localStorage.removeItem("user_token");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_id");
        navigate("/");
        window.location.reload();
    }

    const cancelLogout = ()=>{
        navigate("/");
    }
  return (
    <>
        <NavbarForAuthenticated userName={props.userName} userToken={props.userToken} />
        <div className="text-center my-4">
            <div className="card-body">
                <h3 className="card-title">Hi, {props.userName}</h3>
                <p className="card-text my-2">Are you sure want to logout ?</p>
                <button className="btn btn-success my-3 mx-3 btn-sm" onClick={cancelLogout}>Cancel</button>
                <button className="btn btn-danger my-3 mx-3 btn-sm" onClick={logoutUser}>Logout</button>
            </div>
            {/* <div className="card-footer text-muted">
                2 days ago
            </div> */}
        </div>
    </>
  )
}
