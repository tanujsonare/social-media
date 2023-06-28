import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import backgroundImage from './images/social_media_back.jpg'
import tweetBackgroundImage from './images/tweet_image.jpg'
import NavbarForAuthenticated from './NavbarForAuthenticated'
import defaultProfileImage from './images/default_profile_img.webp'

export default function UserProfile(props) {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    var userId;
    if (window.location.href.includes("user_id=")) {
        userId = window.location.href.split("user_id=")[1];
    } else {
        userId = props.userId;
    }
    // to call get_user_profile api 
    useEffect(() => {
        props.getUserProfile(userId);
        document.getElementById('followingModal').style.display = 'none';
        document.getElementById('followersModal').style.display = 'none';
    }, [userId]);

    // to get user profile data
    useEffect(() => {
        setUserData(props.userProfileData);
    }, [props.userProfileData]);

    const followUser = async (e) => {
        const followUserId = e.target.getAttribute("followuserid");
        const requestedUserId = props.userId;
        await props.followUser(requestedUserId, followUserId);
        props.getUserProfile(userId);
    }

    const followingModalShow = () => {
        document.getElementById('followingModal').style.display = 'block';
        document.getElementsByClassName('user_profile')[0].style.display = 'none';
    }

    const hideFollowingModal = () => {
        document.getElementById('followingModal').style.display = 'none';
        document.getElementsByClassName('user_profile')[0].style.display = 'block';
    }
    
    const followersModalShow = () => {
        document.getElementById('followersModal').style.display = 'block';
        document.getElementsByClassName('user_profile')[0].style.display = 'none';
    }

    const hideFollowersModal = () => {
        document.getElementById('followersModal').style.display = 'none';
        document.getElementsByClassName('user_profile')[0].style.display = 'block';
    }

    const showUserProfile = (e) =>{
        const userId = e.target.getAttribute("userid");
        hideFollowingModal();
        navigate(`/profile?user_id=${userId}`);
    }

    const unfollowUser = async (e) => {
        const unfollowUserId = e.target.getAttribute("unfollowuserid");
        await props.unFollowUser(unfollowUserId);
        props.getUserProfile(userId);
    }

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%', minHeight: '700px' }}>
            <NavbarForAuthenticated userName={props.userName} userToken={props.userToken} />

            {/* following modal  */}
            <div id="followingModal" className="w3-modal">
                <div className="s3-modal-content">
                    <div className="container mt-5">
                        <div className="d-flex justify-content-center row">
                            <div className="col-md-6 card">
                                <div className="p-3 bg-white text-center">
                                    <header className="card-header d-flex justify-content-between align-items-center">
                                        <h3 className="text-center flex-grow-1">User followed by {userData && userData.username}</h3>
                                        <span onClick={hideFollowingModal} className="text-end mb-5" role="button" style={{ fontSize: "30px" }}>
                                            &times;
                                        </span>
                                    </header>
                                    {userData && userData.following_user && userData.following_user.map((element) => {
                                    return <div className="d-flex flex-row justify-content-between align-items-center my-3">
                                            <div className="d-flex flex-row align-items-center"><img className="rounded-circle" src={element.profile_image ? element.profile_image.includes("media/") ? element.profile_image : "/media/" + element.profile_image : defaultProfileImage} width="30" height="30"  onClick={showUserProfile} userid={element.id} role='button'/>
                                                <div className="d-flex flex-column align-items-start ml-2"><span className="font-weight-bold mx-3">{element.username}</span></div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mt-2">
                                                {userData.username == props.userName && element.is_following && <button className="btn btn-dark btn-sm" type="button" onClick={unfollowUser} unfollowuserid={element.id} >Unfollow</button>}
                                                {userData.username !== props.userName && element.is_following && <button className="btn btn-dark btn-sm" type="button" disabled>Following</button>}
                                                {element.username !== props.userName && !element.is_following && <button className="btn btn-dark btn-sm" type="button" followuserid={element.id} onClick={followUser}>Follow</button>}
                                            </div>
                                        </div>
                                    })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* followers modal  */}
            <div id="followersModal" className="w3-modal">
                <div className="w3-modal-content">
                    <div className="container mt-5">
                        <div className="d-flex justify-content-center row">
                            <div className="col-md-6 card">
                                <div className="p-3 bg-white text-center">
                                    <header className="card-header d-flex justify-content-between align-items-center">
                                        <h3 className="text-center flex-grow-1">Followers of {userData && userData.username}</h3>
                                        <span onClick={hideFollowersModal} className="text-end mb-5" role="button" style={{ fontSize: "30px" }}>
                                            &times;
                                        </span>
                                    </header>
                                    {userData && userData.followers_user && userData.followers_user.map((element) => {
                                    return <div className="d-flex flex-row justify-content-between align-items-center my-3">
                                            <div className="d-flex flex-row align-items-center"><img className="rounded-circle" src={element.profile_image ? element.profile_image.includes("media/") ? element.profile_image : "/media/" + element.profile_image : defaultProfileImage} width="30" height="30"  onClick={showUserProfile} userid={element.id} role='button'/>
                                                <div className="d-flex flex-column align-items-start ml-2"><span className="font-weight-bold mx-3">{element.username}</span></div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mt-2">
                                                {userData.username == props.userName && element.is_following && <button className="btn btn-danger btn-sm" type="button">Remove</button>}
                                                {userData.username !== props.userName && element.is_following && <button className="btn btn-dark btn-sm" type="button" disabled>Following</button>}
                                                {element.username !== props.userName && !element.is_following && <button className="btn btn-dark btn-sm" type="button" followuserid={element.id} onClick={followUser}>Follow</button>}
                                            </div>
                                        </div>
                                    })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='my-5 user_profile'>
                <div className="container d-flex justify-content-center align-items-center my-4">
                    <div className="card" style={{ minHeight: "380px", minWidth: "400px" }}>
                        <div style={{ backgroundImage: `url(${tweetBackgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%', height: '220px' }}>
                            <div className='d-flex justify-content-end my-1'>
                                {userData && userData.username !== props.userName && !userData.is_following && <button className='btn btn-dark btn-sm mx-2 my-2 rounded-5' onClick={followUser} followuserid={userData.id}> Follow <i className="fa-solid fa-circle-plus" style={{ color: "#fff", }} followuserid={userData.id}></i></button>}
                            </div>
                            <div className="user text-center">
                                <div className="profile my-2">
                                    <img src={userData && userData.profile_image ? userData.profile_image : defaultProfileImage} className="rounded-circle" width="100" height="100" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-2 text-center">
                            <h4 className="mb-0">{userData && userData.username}</h4>
                            <h6 className="mb-2 mt-2">{userData && userData.bio}</h6>
                            <div className="d-flex justify-content-center align-items-center mt-4 mb-4 px-3">
                                <div className="stats mx-4">
                                    <h6 className="mb-0">Email</h6>
                                    <span>{userData && userData.email ? userData.email : "Email not available"}</span>
                                </div>
                                <div className="stats mx-4">
                                    <h6 className="mb-0">Following</h6>
                                    <span onClick={followingModalShow} role='button'>{userData && userData.following_count}</span>
                                </div>
                                <div className="stats mx-4">
                                    <h6 className="mb-0">Followers</h6>
                                    <span onClick={followersModalShow} role='button'>{userData && userData.followers_count}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
