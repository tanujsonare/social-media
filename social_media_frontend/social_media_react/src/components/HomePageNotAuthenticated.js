import React from 'react'
import NavbarForNotAuthenticated from './NavbarForNotAuthenticated'
import backgroundImage from './images/social_media_back.jpg'


export default function HomePageNotAuthenticated() {
  return (
    <div className="custom-background" style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%', height: '668px',}}>
      <NavbarForNotAuthenticated />
      <div className='text-center my-4'>
        <h2 className='text-white my-4'>Please Login First to Use</h2>
      </div>
    </div>
  )
}
