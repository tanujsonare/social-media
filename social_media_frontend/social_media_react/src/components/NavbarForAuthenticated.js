import React, {useState} from 'react'
import { Link } from 'react-router-dom'

export default function NavbarForAuthenticated(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:"rgb(1 4 6 / 46%)"}}>
        <Link className="navbar-brand mx-2" to="/">TweeMe</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {/* <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li> */}
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
            <form className="d-flex mx-3" role="search">
                <input className="form-control me-2 mx-4" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
      </nav>
    </div>
  )
}
