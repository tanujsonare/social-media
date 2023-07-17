import React from 'react'
import { Link } from 'react-router-dom'

import tweetLogo from './images/tweet_log.png'

export default function NavbarForNotAuthenticated() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:"rgb(1 4 6 / 46%)"}}>
        <Link className="navbar-brand mx-3" to="/">
        <img src={tweetLogo} className="rounded-circle my-2 mx-2" width="40" height="40" role='button'/>
          TweetMe</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-end">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link mx-3" to="/register">Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mx-3" to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
