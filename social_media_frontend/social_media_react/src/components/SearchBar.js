import React from 'react'

import backgroundImage from './images/social_media_back.jpg'
import NavbarForAuthenticated from './NavbarForAuthenticated'

export default function SearchBar(props) {
    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%', minHeight: '700px' }}>
            <NavbarForAuthenticated userName={props.userName} userToken={props.userToken} />
            <div className="container">
                <div className="row ng-scope">
                    <div className="col-md-11 mx-auto my-5 d-flex justify-content-center">
                        <div className="card my-3" style={{maxWidth: "800px"}}>
                            <div className='d-flex justify-content-start'>
                                <img className="card-i-mg-top" src="https://bootdey.com/img/Content/avatar/avatar1.png" style={{ width: "30%", maxHeight: "250px", backgroundSize: 'cover' }} />
                                <div className="row mx-5 me-0">
                                    <div className="col-sm-9">
                                        <h2 className="my-4">Tanuj sonare</h2>
                                        <p className="mx-2 w-100" style={{textAlign: "justify"}}>Not just usual Metro. But something bigger. Not just usual widgets, but real widgets. Not just usual Metro. But something bigger. Not just usual widgets, but real widgets.</p>
                                        <div className="d-flex justify-content-start">
                                            <div className="mx-4">
                                                <h6 className="my-2">Followers</h6>
                                                <span >100</span>
                                            </div>
                                            <div className="mx-4">
                                                <h6 className="my-2">Following</h6>
                                                <span >100</span>
                                            </div>
                                            <div className="mx-4">
                                                <h6 className="my-2">Posts</h6>
                                                <span> 100 </span>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
