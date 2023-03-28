import React from 'react'
import { Tables } from '../components/Tables'
import { EditProfile } from '../components/EditProfile'
import JwtValidator from '../components/JwtValidator'
function Home() {
  return (
    <div>
      {/* <JwtValidator/> */}
      <EditProfile />
      {/* <Tables param={'revenues'}/> */}
    </div>
  )
}

export default Home