import React, {useEffect, useState} from 'react'

import backgroundImage from './images/social_media_back.jpg'
import NavbarForAuthenticated from './NavbarForAuthenticated'

export default function UserProfile(props) {
    const [userData, setUserData] = useState(null);
    var userId;
    if (window.location.href.includes("user_id=")){
        userId = window.location.href.split("user_id=")[1];
    }else{
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

    const followUser = async(e)=>{
        const followUserId = e.target.getAttribute("followuserid");
        const requestedUserId = props.userId;
        await props.followUser(requestedUserId, followUserId);
        props.getUserProfile(userId);
    }

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%', minHeight: '700px' }}>
            <NavbarForAuthenticated userName={props.userName} userToken={props.userToken} />
            <div className='my-5'>
                <div className="container d-flex justify-content-center align-items-center my-4">
                    <div className="card w-40">
                        <div className='d-flex justify-content-end'>
                            {userData && userData.username !== props.userName && !userData.is_following && <button className='btn btn-dark btn-sm mx-1 my-2 rounded-5' onClick={followUser} followuserid={userData.id}> Follow <i className="fa-solid fa-circle-plus" style={{color: "#fff",}}></i></button>}
                        </div>
                        <div className="user text-center">
                            <div className="profile my-3">
                                <img src={backgroundImage} className="rounded-circle" width="100" height="100" />
                            </div>
                        </div>

                        <div className="mt-2 text-center">
                            <h4 className="mb-0">{userData && userData.username}</h4>
                            <h6 className="mb-2 mt-2">{userData && userData.bio}</h6>
                            <div className="d-flex justify-content-center align-items-center mt-4 mb-4 px-3">
                                <div className="stats mx-4">
                                    <h6 className="mb-0">Email</h6>
                                    <span>{userData && userData.email ? userData.email: "Email not available"}</span>
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
