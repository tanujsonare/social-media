import React, { useEffect, useState } from 'react'

import backgroundImage from './images/social_media_back.jpg'
import tweetBackgroundImage from './images/tweet_image.jpg'
import NavbarForAuthenticated from './NavbarForAuthenticated'
import defaultProfileImage from './images/default_profile_img.webp'

export default function UserProfile(props) {
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

    const modalShow = () => {
        document.getElementById('followingModal').style.display = 'block'
    }

    const hideModal = () => {
        document.getElementById('followingModal').style.display = 'none'
    }

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%', minHeight: '700px' }}>
            <NavbarForAuthenticated userName={props.userName} userToken={props.userToken} />

            <div className="w3-container">
                {/* <button  className="w3-button w3-black">Open Modal</button> */}

                <div id="followingModal" className="w3-modal">
                    <div className="w3-modal-content">
                        <div class="container mt-5">
                            <div class="d-flex justify-content-center row">
                                <div class="col-md-6">
                                    <div class="p-3 bg-white text-center">
                                    <header className="w3-container w3-teal">
                                        <span onClick={hideModal} className="w3-button w3-display-topright" role='button'>&times;</span>
                                        <h2>Users you follow</h2>
                                    </header>
                                        <div class="d-flex flex-row justify-content-between align-items-center">
                                            <div class="d-flex flex-row align-items-center"><img class="rounded-circle" src="https://i.imgur.com/KmT515u.jpg" width="55" />
                                                <div class="d-flex flex-column align-items-start ml-2"><span class="font-weight-bold">Bella Thorne</span><span class="followers">1450 Followers</span></div>
                                            </div>
                                            <div class="d-flex flex-row align-items-center mt-2"><button class="btn btn-outline-primary btn-sm" type="button">Follow</button></div>
                                        </div>
                                        <div class="d-flex flex-row justify-content-between align-items-center mt-2">
                                            <div class="d-flex flex-row align-items-center"><img class="rounded-circle" src="https://i.imgur.com/I6WnkOv.jpg" width="55" />
                                                <div class="d-flex flex-column align-items-start ml-2"><span class="font-weight-bold">Scarlet</span><span class="followers">18570 Followers</span></div>
                                            </div>
                                            <div class="d-flex flex-row align-items-center mt-2"><button class="btn btn-primary btn-sm" type="button">Following</button></div>
                                        </div>
                                        <div class="d-flex flex-row justify-content-between align-items-center mt-2">
                                            <div class="d-flex flex-row align-items-center"><img class="rounded-circle" src="https://i.imgur.com/eEo8asG.jpg" width="55" />
                                                <div class="d-flex flex-column align-items-start ml-2"><span class="font-weight-bold">Soffie Morne</span><span class="followers">12550 Followers</span></div>
                                            </div>
                                            <div class="d-flex flex-row align-items-center mt-2"><button class="btn btn-outline-primary btn-sm" type="button">Follow</button></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='my-5'>
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
                                    <span onClick={modalShow} role='button'>{userData && userData.following_count}</span>
                                </div>
                                <div className="stats mx-4">
                                    <h6 className="mb-0">Followers</h6>
                                    <span>{userData && userData.followers_count}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
