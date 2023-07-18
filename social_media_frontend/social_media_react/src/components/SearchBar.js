import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import NavbarForAuthenticated from './NavbarForAuthenticated'
import defaultProfileImage from './images/default_pr_img.webp'

export default function SearchBar(props) {
    const navigate = useNavigate();
    var searchText;
    if (window.location.href.includes("user_name=")) {
        let text = window.location.href.split("user_name=");
        if (text) {
            searchText = text[1];
        }
    }
    const [usersData, setUsersData] = useState(null);

    const getSearchUsers = async () => {
        await axios.get(`http://127.0.0.1/api/search_user?requested_user_id=${props.userId}&user_name=${searchText}`
        ).then(response => {
            setUsersData(response.data.user_profiles)
        })
        .catch(error => {
            console.log(error.response.data);
        });
    }

    useEffect(() => {
        getSearchUsers();
    }, searchText)

    const followUser = async (e) => {
        const followUserId = e.target.getAttribute("followuserid");
        const requestedUserId = props.userId;
        await props.followUser(requestedUserId, followUserId);
        getSearchUsers();
    }

    const unFollow = async (e) => {
        const unfollowUserId = e.target.getAttribute("unfollowuserid");
        await props.unFollowUser(unfollowUserId);
        await getSearchUsers();
    }

    const seeUserProfile = (e) =>{
        if (!(e.target && (e.target.classList.contains('btn') || e.target.classList.contains('fa-circle-plus')))){
            const userId = e.target.offsetParent.getAttribute("userid");
            if (userId){
                navigate(`/profile?user_id=${userId}`);
            }
        }
    } 

    return (
        <div className="custom-background" style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%', minHeight: '700px' }}>
            <NavbarForAuthenticated userName={props.userName} userToken={props.userToken} />
            <div className="row my-2">
                {usersData && usersData.map((element) => {
                    return <div className="col-md-11 mx-auto d-flex justify-content-center" key={element.id}>
                        <div className="search_card card my-2" style={{ minWidth: "700px", maxWidth: "700px" }} onClick={seeUserProfile} userid={element.id} role='button'>
                            <div className="card-body d-flex">
                                <img className="card-i-mg-top" src={element.profile_image ? element.profile_image : defaultProfileImage} style={{ width: "30%", minHeight: "100px", maxHeight: "200px", backgroundSize: 'cover' }} />
                                <div className="flex-grow-1 mx-3">
                                    <h2 className="my-4">{element.username}</h2>
                                    <p className="w-100 text-secondary" style={{ textAlign: "center" }}>{element.bio}</p>
                                    <div className="d-flex justify-content-start">
                                        <div className="mx-4">
                                            <h6 className="my-2">Followers</h6>
                                            <span>{element.followers_count}</span>
                                        </div>
                                        <div className="mx-4">
                                            <h6 className="my-2">Following</h6>
                                            <span>{element.following_count}</span>
                                        </div>
                                        <div className="mx-4">
                                            <h6 className="my-2">Posts</h6>
                                            <span>WIP</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-auto align-self-start mx-4">
                                    {element.id != props.userId && !element.is_following && <button className="btn btn-dark btn-sm follow_button rounded-5 d-flex align-items-center" onClick={followUser} followuserid={element.id} >Follow <i className="fa-solid fa-circle-plus d-flex align-items-center mx-1 follow_button" style={{ color: "#fff" }} followuserid={element.id}></i></button>}
                                    {element.id != props.userId && element.is_following && <button className="btn btn-secondary btn-sm unfollow_button rounded-5 d-flex align-items-center" onClick={unFollow} unfollowuserid={element.id} >unfollow </button>}
                                </div>
                            </div>
                        </div>
                    </div>
                })
                }
                {!usersData &&
                <div className='my-5'>
                    <h2 className='my-5 text-light'> No User Available with this name <u>{searchText}</u></h2>
                </div>
                }
            </div>
        </div>
    )
}
