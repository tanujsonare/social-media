import React, { useState } from 'react'
import axios from 'axios'

import NavbarForAuthenticated from './NavbarForAuthenticated'
import defaultProfileImage from './images/default_pr_img.webp'

export default function SearchUserForChat(props) {
    const [searchData, setSearchData] = useState(null)
    const searchUsersForChat = async (e) => {
        e.preventDefault();
        const searchText = document.getElementsByClassName("search_text");
        if (searchText) {
            await axios.get(`http://127.0.0.1/api/search_user?requested_user_id=${props.userId}&user_name=${searchText[0].value}&chat=True`
            ).then(response => {
                setSearchData(response.data.user_profiles)
            })
                .catch(error => {
                    console.log(error.response.error_message);
                });
        } else {
            alert("Please enter some text to search")
        }
    }
    return (
        <div className="custom-background" style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%', minHeight: '700px' }}>
            <NavbarForAuthenticated userName={props.userName} userToken={props.userToken} />
            <div className="container py-5">
                <div className="d-flex justify-content-center row">
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

                        <div className="card mask-custom my-4">
                            <div className="card-body">
                                <ul className="list-unstyled mb-0">
                                    {searchData && searchData.map((element) => {
                                        return element.is_following == true && <li className="p-2 border-bottom search_user" style={{ borderBottom: "1px solid rgba(255,255,255,.3) !important" }} key={element.id}>
                                            <a href="#!" className="d-flex justify-content-between link-light">
                                                <div className="d-flex flex-row">
                                                    <img src={element.profile_image ? element.profile_image : defaultProfileImage} alt="avatar"
                                                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" height="60" />
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
                                        !searchData &&
                                        <p className='text-light'>No search found !!</p>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}