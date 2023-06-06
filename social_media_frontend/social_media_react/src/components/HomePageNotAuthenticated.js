import React from 'react'
import NavbarForNotAuthenticated from './NavbarForNotAuthenticated'


export default function HomePageNotAuthenticated() {
  return (
    <div>
      <NavbarForNotAuthenticated />
      <div className='text-center my-4'>
        <h3 className='text-danger'>Please Login First to Use</h3>
      </div>
    </div>
  )
}
