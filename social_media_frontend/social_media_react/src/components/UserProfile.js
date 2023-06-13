import React from 'react'

import backgroundImage from './images/social_media_back.jpg'
import NavbarForAuthenticated from './NavbarForAuthenticated'

export default function UserProfile(props) {
    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%', minHeight: '700px' }}>
            <NavbarForAuthenticated userName={props.userName} userToken={props.userToken} />
            <div className='my-4'>
                <div className="container d-flex justify-content-center align-items-center my-4">
                    <div className="card w-50 h-100">
                        <div className="user text-center">
                            <div className="profile my-3">
                                <img src={backgroundImage} className="rounded-circle" width="100" height="100" />
                            </div>
                        </div>

                        <div className="mt-5 text-center">
                            <h4 className="mb-0">Benjamin Tims</h4>
                            <span className="text-muted d-block mb-2">Los Angles</span>
                            <button className="btn btn-primary btn-sm follow">Follow</button>
                            <div className="d-flex justify-content-between align-items-center mt-4 px-4">
                                <div className="stats">
                                    <h6 className="mb-0">Followers</h6>
                                    <span>8,797</span>
                                </div>
                                <div className="stats">
                                    <h6 className="mb-0">Projects</h6>
                                    <span>142</span>
                                </div>

                                <div className="stats">
                                    <h6 className="mb-0">Ranks</h6>
                                    <span>129</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
