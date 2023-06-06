import React from 'react'

import NavbarForAuthenticated from './NavbarForAuthenticated'

export default function HomePageAuthenticated(props) {
  return (
    <>
        <NavbarForAuthenticated userName={props.userName} userToken={props.userToken}/>
        <div>
            You are loggend In.
        </div>
    </>
  )
}
