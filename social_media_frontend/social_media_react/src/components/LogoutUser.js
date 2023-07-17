import React from 'react'
import { useNavigate, Link } from 'react-router-dom';

import NavbarForAuthenticated from './NavbarForAuthenticated'
import backgroundImage from './images/social_media_back.jpg'


export default function LogoutUser(props) {
    const navigate = useNavigate();
    
    const logoutUser = ()=>{
        localStorage.removeItem("user_token");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_id");
        navigate("/");
        window.location.reload();
    }

  return (
    <div className="custom-background" style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%', height: '668px'}}>
        <NavbarForAuthenticated userName={props.userName} userToken={props.userToken} />
        <div className="text-center my-4">
            <div className="card-body">
                <h3 className="card-title text-light">Hi, {props.userName}</h3>
                <p className="card-text my-2 text-light">Are you sure want to logout ?</p>
                <Link className="btn btn-success my-3 mx-3 btn-sm" to="/">Cancel</Link>
                <button className="btn btn-danger my-3 mx-3 btn-sm" onClick={logoutUser}>Logout</button>
            </div>
        </div>
    </div>
  )
}
