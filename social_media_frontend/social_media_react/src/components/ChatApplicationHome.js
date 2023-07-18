import React, { useState } from 'react'
import axios from 'axios';

import NavbarForAuthenticated from './NavbarForAuthenticated'

export default function ChatApplicationHome(props) {
    const [searchData, setSearchData] = useState(null)
    const searchUsersForChat = async (e) => {
        e.preventDefault();
        const searchText = document.getElementsByClassName("search_text");
        if (searchText) {
            await axios.get(`http://127.0.0.1/api/search_user?requested_user_id=${props.userId}&user_name=${searchText[0].value}`
            ).then(response => {
                setSearchData(response.data.user_profiles)
            })
                .catch(error => {
                    console.log(error.response.data);
                });
        } else {
            alert("Please enter some text to search")
        }
    }

    return (
        <div className="custom-background" style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%', minHeight: '700px' }}>
            <NavbarForAuthenticated userName={props.userName} userToken={props.userToken} />
            <section >
                <div className="container py-5">

                    <div className="row">

                        <div className="col-md-6 col-lg-5 col-xl-5 mb-4 mb-md-0">
                            <form className="search_form d-flex" role="search" onSubmit={searchUsersForChat}>
                                <div className="input-group rounded mb-3">
                                    <input type="search" className="form-control rounded search_text" placeholder="Search" aria-label="Search"
                                        aria-describedby="search-addon" />
                                    <button className="input-group-text border-0" id="search-addon">
                                        <i className="fas fa-search"></i>
                                    </button>
                                </div>
                            </form>

                            <h5 className="font-weight-bold mb-3 text-center text-white">Member</h5>

                            <div className="card mask-custom">
                                <div className="card-body">
                                    <ul className="list-unstyled mb-0">
                                        {searchData && searchData.map((element) => {
                                            return element.is_following == true && <li className="p-2 border-bottom search_user" style={{ borderBottom: "1px solid rgba(255,255,255,.3) !important" }} key={element.id}>
                                                <a href="#!" className="d-flex justify-content-between link-light">
                                                    <div className="d-flex flex-row">
                                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp" alt="avatar"
                                                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" />
                                                        <div className="pt-1">
                                                            <p className="fw-bold mb-0">{element.username}</p>
                                                            <p className="small text-white">Hello, Are you there?</p>
                                                        </div>
                                                    </div>
                                                    <div className="pt-1">
                                                        <p className="small text-white mb-1">Just now</p>
                                                        <span className="badge bg-danger float-end">1</span>
                                                    </div>
                                                </a>
                                            </li>
                                        })
                                        }
                                        {
                                            document.getElementsByClassName("search_user").length <= 0 && 
                                            <p className='text-light'>No search found !!</p>
                                        }
                                    </ul>

                                </div>
                            </div>

                        </div>

                        <div className="col-md-6 col-lg-7 col-xl-7">

                            <ul className="list-unstyled text-white">
                                <li className="d-flex justify-content-between mb-4">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" alt="avatar"
                                        className="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60" />
                                    <div className="card mask-custom">
                                        <div className="card-header d-flex justify-content-between p-3"
                                            style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}>
                                            <p className="fw-bold mb-0">Brad Pitt</p>
                                            <p className="text-light small mb-0"><i className="far fa-clock"></i> 12 mins ago</p>
                                        </div>
                                        <div className="card-body">
                                            <p className="mb-0">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                                labore et dolore magna aliqua.
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="d-flex justify-content-between mb-4">
                                    <div className="card mask-custom w-100">
                                        <div className="card-header d-flex justify-content-between p-3"
                                            style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}>
                                            <p className="fw-bold mb-0">Lara Croft</p>
                                            <p className="text-light small mb-0"><i className="far fa-clock"></i> 13 mins ago</p>
                                        </div>
                                        <div className="card-body">
                                            <p className="mb-0">
                                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                                laudantium.
                                            </p>
                                        </div>
                                    </div>
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp" alt="avatar"
                                        className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong" width="60" />
                                </li>
                                <li className="mb-3">
                                    <div className="form-outline form-white">
                                        <textarea className="form-control" id="textAreaExample3" rows="4"></textarea>
                                        <label className="form-label" htmlFor="textAreaExample3">Message</label>
                                    </div>
                                </li>
                                <button type="button" className="btn btn-light btn-lg btn-rounded float-end">Send</button>
                            </ul>

                        </div>

                    </div>

                </div>
            </section>
        </div>
    )
}
