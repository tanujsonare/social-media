import React, { useEffect, useState } from 'react'
import axios from 'axios';

import backgroundImage from './images/social_media_back.jpg'
import NavbarForAuthenticated from './NavbarForAuthenticated'
import defaultProfileImage from './images/default_pr_img.webp'

export default function SearchBar(props) {
    var searchText;
    if (window.location.href.includes("user_name=")) {
        let text = window.location.href.split("user_name=");
        if (text) {
            searchText = text[1];
        }
    }
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        const getSearchUsers = async () => {
            await axios.get(`http://127.0.0.1/api/search_user?requested_user_id=${props.userId}&user_name=${searchText}`
            ).then(response => {
                setUsersData(response.data.user_profiles)
            })
                .catch(error => {
                    console.log(error.response.data);
                });
        }
        getSearchUsers();
    }, searchText)

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%', minHeight: '700px' }}>
            <NavbarForAuthenticated userName={props.userName} userToken={props.userToken} />
            <div className="row my-2">
                {usersData && usersData.map((element) => {
                    return <div className="col-md-11 mx-auto d-flex justify-content-center">
                        <div className="card my-2" style={{ minWidth: "700px", maxWidth:"700px" }}>
                            <div className='d-flex justify-content-start'>
                                <img className="card-i-mg-top" src={element.profile_image ? element.profile_image : defaultProfileImage} style={{ width: "30%", minHeight:"100px", maxHeight: "200px", backgroundSize: 'cover' }} />
                                <div className="row mx-5 me-0">
                                    <div className="col-sm-9">
                                        <h2 className="my-4">{element.username}</h2>
                                        <p className="mx-2 w-100 text-secondary" style={{ textAlign: "center" }}>{element.bio}</p>
                                        <div className="d-flex justify-content-start">
                                            <div className="mx-4">
                                                <h6 className="my-2">Followers</h6>
                                                <span >{element.followers_count}</span>
                                            </div>
                                            <div className="mx-4">
                                                <h6 className="my-2">Following</h6>
                                                <span >{element.following_count}</span>
                                            </div>
                                            <div className="mx-4">
                                                <h6 className="my-2">Posts</h6>
                                                <span>WIP</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })
                }
            </div>
        </div>
    )
}
