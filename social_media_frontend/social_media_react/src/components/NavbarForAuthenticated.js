import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import tweetLogo from './images/tweet_log.png'

export default function NavbarForAuthenticated(props) {
  const navigate = useNavigate();
  const searchUserProfile = (e) =>{
    e.preventDefault();
    const searchText = e.target.firstChild.value;
    navigate(`/search?user_name=${searchText}`);
    window.location.reload();
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:"rgb(1 4 6 / 46%)"}}>
        <Link className="navbar-brand mx-2" to="/">
        <img src={tweetLogo} className="rounded-circle my-2 mx-2" width="40" height="40" role='button'/>
          TweetMe</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          </ul>
        </div>
        <div className="d-flex justify-content-end">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link className="nav-link active" to="/profile"> {props.userName} </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/logout">Logout</Link>
                </li>
            </ul>
            <form className="search_form d-flex mx-3" role="search" onSubmit={searchUserProfile}>
                <input className="form-control me-2 mx-4" type="search" placeholder="Enter username to search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <div className='mx-3 my-2 text-light' >
              <Link to="/chat" role='button'><i className="fa-regular fa-comment-dots fa-2xl mx-2" style={{ color: "#f1f2f3" }}></i></Link>
            </div>
          </div>
      </nav>
    </div>
  )
}
