import React, { useState } from 'react'
import axios from 'axios'

import NavbarForAuthenticated from './NavbarForAuthenticated'
import defaultProfileImage from './images/default_pr_img.webp'

export default function SearchUserForChat(props) {
    const [searchData, setSearchData] = useState([])
    const searchUsersForChat = async (e) => {
        e.preventDefault();
        const searchText = document.getElementsByClassName("search_text");
        if (searchText) {
            if (searchText[0].value != "" && searchText[0].value != null && searchText[0].value != undefined){
                await axios.get(`http://127.0.0.1/api/search_user?requested_user_id=${props.userId}&user_name=${searchText[0].value}&chat=True`
                ).then(response => {
                    setSearchData(response.data.user_profiles);
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status == 400) {
                            setSearchData(null);
                        }
                    }
                });
            }else{
                setSearchData(null);
            }
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
                                <input type="search" className="form-control rounded search_text" onChange={searchUsersForChat} placeholder="Search user by user name" aria-label="Search"
                                    aria-describedby="search-addon" />
                                <button className="input-group-text border-0" id="search-addon">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </form>

                        {searchData && searchData.length > 0 && <div className="card mask-custom my-4">
                            <div className="card-body">
                                <ul className="list-unstyled mb-0">
                                    {searchData.map((element) => {
                                        return element.is_following == true && <li className="p-2 border-bottom search_user" style={{ borderBottom: "1px solid rgba(255,255,255,.3) !important" }} key={element.id}>
                                            <div className="d-flex justify-content-between link-light">
                                                <div className="d-flex flex-row">
                                                    <img src={element.profile_image ? element.profile_image : defaultProfileImage} alt="avatar"
                                                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" height="60" />
                                                    <div className="pt-1">
                                                        <h5 className="fw-bold mb-0">{element.username}</h5>
                                                        <p className="small text-white my-2">{element.last_message_detail ? element.last_message_detail.content: "No conversation yet"}</p>
                                                    </div>
                                                </div>
                                                <div className="pt-1">
                                                    <p className="small text-white mb-1">{element.last_message_detail ? props.getTimeDifference(element.last_message_detail.created_at): ""}</p>
                                                    <span className="badge bg-success float-end">{element.last_message_detail ? element.last_message_detail.unseen_message_count : ""}</span>
                                                </div>
                                            </div>
                                        </li>
                                    })
                                    }
                                </ul>
                            </div>
                        </div>}
                        {searchData == null && <h2 className='text-light error_message my-5'>User not found !!</h2>}
                    </div>
                </div>
            </div>
        </div>
    )
}
