import React from 'react'

import NavbarForAuthenticated from './NavbarForAuthenticated'
import backgroundImage from './images/social_media_back.jpg'

export default function HomePageAuthenticated(props) {
  return (
    <div style={{backgroundImage:`url(${backgroundImage})`,backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%', height: '600px'}}>
        <NavbarForAuthenticated userName={props.userName} userToken={props.userToken}/>
        <div className='my-4 text-light'>
            You are loggend In.
        </div>
    </div>
  )
}
